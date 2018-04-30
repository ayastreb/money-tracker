export const getForm = state => state.ui.form.account
export const getModal = state => ({
  isOpen: state.ui.form.account.isModalOpen,
  isDeleteRequest: state.ui.form.account.isDeleteRequest,
  isDeleteRunning: state.ui.form.account.isDeleteRunning,
  itemsToProcess: state.ui.form.account.itemsToProcess,
  itemsProcessed: state.ui.form.account.itemsProcessed
})
