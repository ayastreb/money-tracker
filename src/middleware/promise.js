const isPromise = val => val && typeof val.then === 'function'

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export default store => next => action => {
  if (!action.payload || !isPromise(action.payload)) return next(action)

  const dispatch = store.dispatch
  const type = action.type
  const meta = action.meta || {}

  dispatch({ type: `${type}_${REQUEST}`, meta })

  return action.payload
    .then(payload => dispatch({ type: `${type}_${SUCCESS}`, meta, payload }))
    .catch(error => dispatch({ type: `${type}_${FAILURE}`, meta, error }))
}
