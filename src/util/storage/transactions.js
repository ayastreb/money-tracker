import { transactionsDB } from './pouchdb'

export async function retrieveRecentTransactions(limit) {
  return transactionsDB()
    .allDocs({
      include_docs: true,
      descending: true,
      limit
    })
    .then(response =>
      response.rows.map(row => {
        const [timestamp, accountId, currency] = row.doc._id.split('/')
        return {
          id: row.doc._id,
          timestamp: parseInt(timestamp, 10),
          accountId,
          currency,
          amount: row.doc.amount,
          tags: row.doc.tags,
          note: row.doc.note
        }
      })
    )
}

/**
 * Build document ID based on transaction date, account and currency for easier sorting and filtering.
 * @see https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html
 *
 * @returns {object} newly created transaction
 */
export async function persistTransaction({
  date,
  accountId,
  currency,
  amount,
  tags,
  note
}) {
  const incrementId = await nextIncrementId(date)
  const id = `${incrementId}/${accountId}/${currency}`
  await transactionsDB()
    .get(id)
    .then(() => {
      throw new Error(`Document "${id}" already exist!`)
    })
    .catch(err => {
      if (err.status !== 404) throw err

      return transactionsDB().put({
        _id: id,
        amount,
        tags,
        note
      })
    })

  return { id, timestamp: incrementId, accountId, currency, amount, tags, note }
}

/**
 * Next increment ID is timestamp of last transaction on given date + 1.
 *
 * @param {string} date in "yyyy-mm-dd" format
 * @returns {number}
 */
async function nextIncrementId(date) {
  const from = new Date(`${date} 00:00:00`).getTime()
  const till = new Date(`${date} 23:59:00`).getTime()
  const response = await transactionsDB().allDocs({
    include_docs: true,
    end_key: `${from}\uffff`,
    start_key: `${till}\uffff`,
    descending: true,
    limit: 1
  })
  const lastTimestamp = response.rows.length > 0
    ? parseInt(response.rows[0].id.split('/')[0], 10)
    : from

  return lastTimestamp + 1
}
