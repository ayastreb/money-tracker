import { tagsDB } from './pouchdb'

export async function retrieveMostUsedTags(limit) {
  return tagsDB()
    .createIndex({
      index: { fields: ['usage'] }
    })
    .then(() =>
      tagsDB()
        .find({
          selector: { usage: { $gt: 0 } },
          sort: ['usage']
        })
        .then(response => response.docs.map(doc => doc._id))
        .then(docs => docs.reverse())
    )
}

export async function increaseTagUsage(tag) {
  return tagsDB()
    .get(tag)
    .then(doc => tagsDB().put({ ...doc, usage: parseInt(doc.usage, 10) + 1 }))
    .catch(err => {
      if (err.status !== 404) throw err

      return tagsDB().put({ _id: tag, usage: 1 })
    })
}
