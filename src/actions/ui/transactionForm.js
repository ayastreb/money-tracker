export const CHANGE_TRANSACTION_KIND = 'CHANGE_TRANSACTION_KIND'
export function changeTransactionKind(kind) {
  return {
    type: CHANGE_TRANSACTION_KIND,
    kind
  }
}
