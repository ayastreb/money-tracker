const isPromise = val => val && typeof val.then === 'function'

export default store => next => action => {
  if (!action.payload || !isPromise(action.payload)) return next(action)

  const type = action.type
  const meta = action.meta || {}
  store.dispatch({ type, meta, pending: true })

  return action.payload
    .then(result => store.dispatch({ type, payload: result, complete: true }))
    .catch(error => store.dispatch({ type, error, meta }))
}
