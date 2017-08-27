import settings from '../util/storage/settings'
import {
  completeSetup,
  changeSettingsCurrency,
  updateExchangeRateSuccess,
  toggleSectionCollapse
} from '../actions/settings'

export default store => next => action => {
  const result = next(action)
  switch (action.type) {
    case `${completeSetup}`:
    case `${changeSettingsCurrency}`:
    case `${updateExchangeRateSuccess}`:
      const {
        isSetupComplete,
        currency,
        exchangeRate
      } = store.getState().settings
      settings.save({ isSetupComplete, currency, exchangeRate })

      return result
    case `${toggleSectionCollapse}`:
      const { collapsedSections } = store.getState().settings
      settings.saveLocal({ collapsedSections })

      return result
    default:
      return result
  }
}
