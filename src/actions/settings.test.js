import {
  loadSettingsSuccess,
  changeSettingsCurrency,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} from './settings';

it('creates load success action', () => {
  expect(loadSettingsSuccess('foo')).toEqual({
    type: 'LOAD_SETTINGS_SUCCESS',
    payload: 'foo'
  });
});

it('creates change currency action', () => {
  expect(
    changeSettingsCurrency({ base: 'EUR', secondary: ['USD', 'JPY'] })
  ).toEqual({
    type: 'CHANGE_SETTINGS_CURRENCY',
    payload: {
      base: 'EUR',
      secondary: ['USD', 'JPY']
    }
  });
});

it('creates update exchange rate success action', () => {
  expect(updateExchangeRateSuccess('foo')).toEqual({
    type: 'UPDATE_EXCHANGE_RATE_SUCCESS',
    payload: 'foo'
  });
});

it('creates toggle section action', () => {
  expect(toggleSectionCollapse('foo')).toEqual({
    type: 'TOGGLE_SECTION_COLLAPSE',
    payload: 'foo'
  });
});

it('creates complete setup action', () => {
  expect(completeSetup()).toEqual({
    type: 'COMPLETE_SETUP'
  });
});
