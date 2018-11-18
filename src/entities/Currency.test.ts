import Currency from './Currency';

it('has default base currency', () => {
  expect(Currency.defaultBase).toEqual('USD');
});

it('returns list of options', () => {
  const options = Currency.options();

  expect(Array.isArray(options)).toBeTruthy();
  expect(options.length).toBeGreaterThanOrEqual(1);
  expect(options[0]).toHaveProperty('key');
  expect(options[0]).toHaveProperty('value');
  expect(options[0]).toHaveProperty('flag');
  expect(options[0]).toHaveProperty('text');

  const usdOption = options.find(option => option.key === 'USD');
  expect(usdOption).toBeTruthy();
  if (usdOption) {
    expect(usdOption.text).toEqual('USD, US Dollar');
    expect(usdOption.flag).toEqual('us');
  }
});

it('returns currency name', () => {
  expect(Currency.name('USD')).toEqual('US Dollar');
});

it('returns currency minimal amount', () => {
  expect(Currency.minAmount('USD')).toEqual(0.01);
  expect(Currency.minAmount('JPY')).toEqual(1);
  expect(Currency.minAmount('KWD')).toEqual(0.001);
});

it('converts to currency subunit (cents)', () => {
  expect(Currency.numberToCents(10.99, 'USD')).toEqual(1099); // $10.99 => 1099 cents
  expect(Currency.numberToCents('9.50', 'USD')).toEqual(950); // $9.50 => 950 cents
  expect(Currency.numberToCents(199, 'JPY')).toEqual(199); // 199 yen has no subunit, 1 yen is the minimum unit
  expect(Currency.numberToCents(1.5, 'KWD')).toEqual(1500); // 1.5 Kuwaiti dinar => 1500 fils
});

it('converts from currency subunit (cents) back to float', () => {
  expect(Currency.centsToNumber(1099, 'USD')).toEqual(10.99);
  expect(Currency.centsToNumber(950, 'USD')).toEqual(9.5);
  expect(Currency.centsToNumber(100099, 'USD')).toEqual(1000.99);
  expect(Currency.centsToNumber(199, 'JPY')).toEqual(199);
  expect(Currency.centsToNumber(1550, 'KWD')).toEqual(1.55);
});

it('converts from currency subunit (cents) to human readable string', () => {
  expect(Currency.centsToString(1099, 'USD')).toEqual('10.99');
  expect(Currency.centsToString(950, 'USD')).toEqual('9.50');
  expect(Currency.centsToString(100099, 'USD')).toEqual('1,000.99');
  expect(Currency.centsToString(100099, 'USD', false)).toEqual('1000.99');
  expect(Currency.centsToString(199, 'JPY')).toEqual('199');
  expect(Currency.centsToString(1550, 'KWD')).toEqual('1.550');
});
