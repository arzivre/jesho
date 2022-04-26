//@ts-nocheck
import { db } from 'libs/firebase-admin'

//* Usage
// const { results } = await adminCollection(
//   'orders',
//   ['external_id', '==', order],
//   null,
//   1
// )

//* This is not hooks
export const adminCollection = async (collection, _query, _orderBy, _limit) => {
  if (_query) {
    const snapshot = await db
      .collection(collection)
      .where(..._query)
      .limit(_limit)
      .get()

    let results = []

    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() })
    })

    return { results }
  }

  if (_orderBy) {
    const snapshot = await db
      .collection(collection)
      .orderBy(..._orderBy)
      .limit(_limit)
      .get()

    let results = []

    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() })
    })

    return { results }
  }
  const snapshot = await db.collection(collection).limit(_limit).get()

  let results = []

  snapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() })
  })

  return { results }
}
