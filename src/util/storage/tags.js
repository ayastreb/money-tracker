import { tagsDB, remoteTagsDB } from './pouchdb'

export async function syncTags() {
  let hasChanges = false
  if (!remoteTagsDB()) return hasChanges

  await tagsDB().replicate.to(remoteTagsDB())
  const from = await tagsDB().replicate.from(remoteTagsDB())
  if (from.docs_written > 0) hasChanges = true

  return hasChanges
}

export async function retrieveTags(kind) {
  return tagsDB()
    .allDocs({
      include_docs: true,
      start_key: kind,
      end_key: `${kind}\uffff`
    })
    .then(response =>
      response.rows.map(row => ({
        tag: row.doc._id.split('/')[1],
        usage: row.doc.usage
      }))
    )
    .then(docs => docs.sort((a, b) => b.usage - a.usage))
    .then(docs => docs.map(doc => doc.tag))
}

export async function increaseTagUsage(kind, tag) {
  const id = `${kind}/${tag}`
  return tagsDB()
    .get(id)
    .then(doc => tagsDB().put({ ...doc, usage: parseInt(doc.usage, 10) + 1 }))
    .catch(err => {
      if (err.status !== 404) throw err

      return tagsDB().put({ _id: id, usage: 1 })
    })
}
