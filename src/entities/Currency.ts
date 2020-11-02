type CurrencyT = {
  name: string;
  symbol: string;
  exp: number;
  flag?: string;
};

type AvailableCurrencyT = {
  [code: string]: CurrencyT;
};

const CURRENCY: AvailableCurrencyT = {
  AED: { name: 'Emirati Dirham', symbol: '.د.ب', exp: 2, flag: 'ae' },
  AFN: { name: 'Afghan Afghani', symbol: '؋', exp: 2, flag: 'af' },
  ALL: { name: 'Albanian lek', symbol: 'lek', exp: 2, flag: 'al' },
  AMD: { name: 'Armenian dram', symbol: 'AMD', exp: 2, flag: 'am' },
  ANG: { name: 'Dutch Guilder', symbol: 'ƒ', exp: 2, flag: 'an' },
  AOA: { name: 'Angolan Kwanza', symbol: 'Kz', exp: 2, flag: 'ao' },
  ARS: { name: 'Argentine peso', symbol: '$', exp: 2, flag: 'ar' },
  AUD: { name: 'Australian Dollar', symbol: '$', exp: 2, flag: 'au' },
  AWG: { name: 'Arubin florin', symbol: 'ƒ', exp: 2, flag: 'aw' },
  AZN: { name: 'Azerbaijani manat', symbol: 'ман', exp: 2, flag: 'az' },
  BAM: { name: 'Bosnian Convertible Marka', symbol: 'KM', exp: 2, flag: 'ba' },
  BBD: { name: 'Barbadian dollar', symbol: '$', exp: 2, flag: 'bb' },
  BDT: { name: 'Bangladeshi Taka', symbol: 'Tk', exp: 2, flag: 'bd' },
  BGN: { name: 'Bulgarian lev', symbol: 'лв', exp: 2, flag: 'bg' },
  BHD: { name: 'Bahraini Dinar', symbol: '.د.ب or BD', exp: 3, flag: 'bh' },
  BIF: { name: 'Burundian Franc', symbol: 'FBu', exp: 0, flag: 'bi' },
  BMD: { name: 'Bermudian dollar', symbol: '$', exp: 2, flag: 'bm' },
  BND: { name: 'Bruneian Dollar', symbol: '$', exp: 2, flag: 'bn' },
  BOB: { name: 'Bolivian Boliviano', symbol: '$b', exp: 2, flag: 'bo' },
  BRL: { name: 'Brazilian real', symbol: 'R$', exp: 2, flag: 'br' },
  BSD: { name: 'Bahamian dollar', symbol: 'B$', exp: 2, flag: 'bs' },
  BTN: { name: 'Bhutanese Ngultrum', symbol: 'Nu.', exp: 2, flag: 'bt' },
  BWP: { name: 'Botswana Pula', symbol: 'P', exp: 2, flag: 'bw' },
  BYR: { name: 'Belarusian ruble', symbol: 'р', exp: 2, flag: 'by' },
  BZD: { name: 'Belize dollar', symbol: 'BZ$', exp: 2, flag: 'bz' },
  CAD: { name: 'Canadian Dollar', symbol: '$', exp: 2, flag: 'ca' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF', exp: 2, flag: 'ch' },
  CLP: { name: 'Chilean Peso', symbol: '$', exp: 0, flag: 'cl' },
  CNY: { name: 'Yuan or chinese renminbi', symbol: '¥', exp: 2, flag: 'cn' },
  COP: { name: 'Colombian peso', symbol: '$', exp: 2, flag: 'co' },
  CRC: { name: 'Costa Rican colón', symbol: '₡', exp: 2, flag: 'cr' },
  CUC: { name: 'Cuban convertible peso', symbol: '$', exp: 2, flag: 'cu' },
  CUP: { name: 'Cuban peso', symbol: '₱', exp: 2, flag: 'cu' },
  CVE: { name: 'Cape Verdean Escudo', symbol: '$', exp: 0, flag: 'cv' },
  CZK: { name: 'Czech koruna', symbol: 'Kč', exp: 2, flag: 'cz' },
  DJF: { name: 'Djiboutian Franc', symbol: 'fdj', exp: 0, flag: 'dj' },
  DKK: { name: 'Danish krone', symbol: 'kr', exp: 2, flag: 'dk' },
  DOP: { name: 'Dominican peso', symbol: '$', exp: 2, flag: 'do' },
  DZD: { name: 'Algerian Dinar', symbol: 'جد', exp: 2, flag: 'dz' },
  EGP: { name: 'Egyptian Pound', symbol: '£ ', exp: 2, flag: 'eg' },
  ERN: { name: 'Eritrean nakfa', symbol: 'ናቕፋ', exp: 2, flag: 'er' },
  ETB: { name: 'Ethiopian Birr', symbol: 'Br', exp: 2, flag: 'et' },
  EUR: { name: 'Euro', symbol: '€', exp: 2, flag: 'eu' },
  FJD: { name: 'Fijian dollar', symbol: '$', exp: 2, flag: 'fj' },
  FKP: { name: 'Falkland Island Pound', symbol: '£', exp: 2, flag: 'fk' },
  GBP: { name: 'British Pound', symbol: '£', exp: 2, flag: 'gb' },
  GEL: { name: 'Georgian lari', symbol: 'ლ', exp: 2, flag: 'ge' },
  GHS: { name: 'Ghanaian Cedi', symbol: 'GH¢', exp: 2, flag: 'gh' },
  GIP: { name: 'Gibraltar pound', symbol: '£', exp: 2, flag: 'gi' },
  GMD: { name: 'Gambian dalasi', symbol: 'D', exp: 2, flag: 'gm' },
  GNF: { name: 'Guinean Franc', symbol: 'GNF', exp: 0, flag: 'gn' },
  GTQ: { name: 'Guatemalan Quetzal', symbol: 'Q', exp: 2, flag: 'gt' },
  GYD: { name: 'Guyanese dollar', symbol: '$', exp: 2, flag: 'gy' },
  HKD: { name: 'Hong Kong dollar', symbol: 'HK$', exp: 2, flag: 'hk' },
  HNL: { name: 'Honduran lempira', symbol: 'L', exp: 2, flag: 'hn' },
  HRK: { name: 'Croatian kuna', symbol: 'kn', exp: 2, flag: 'hr' },
  HTG: { name: 'Haitian gourde', symbol: 'G', exp: 2, flag: 'ht' },
  HUF: { name: 'Hungarian forint', symbol: 'Ft', exp: 2, flag: 'hu' },
  IDR: { name: 'Indonesian Rupiah', symbol: 'Rp', exp: 2, flag: 'id' },
  ILS: { name: 'Israeli Shekel', symbol: '₪', exp: 2, flag: 'il' },
  INR: { name: 'Indian Rupee', symbol: '₹', exp: 2, flag: 'in' },
  IQD: { name: 'Iraqi Dinar', symbol: 'ع.د', exp: 3, flag: 'iq' },
  IRR: { name: 'Iranian Rial', symbol: '﷼', exp: 2, flag: 'ir' },
  ISK: { name: 'Icelandic Krona', symbol: 'kr', exp: 0, flag: 'is' },
  JMD: { name: 'Jamaican dollar', symbol: 'J$', exp: 2, flag: 'jm' },
  JOD: { name: 'Jordanian Dinar', symbol: 'JOD', exp: 3, flag: 'jo' },
  JPY: { name: 'Japanese yen', symbol: '¥', exp: 0, flag: 'jp' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh', exp: 2, flag: 'ke' },
  KGS: { name: 'Kyrgyzstani som', symbol: 'лв', exp: 2, flag: 'kg' },
  KHR: { name: 'Cambodian Riel', symbol: '៛', exp: 2, flag: 'kh' },
  KMF: { name: 'Comoro Franc', symbol: 'KMF', exp: 0, flag: 'km' },
  KPW: { name: 'North Korean won', symbol: '₩', exp: 2, flag: 'kp' },
  KRW: { name: 'South Korean won', symbol: '₩', exp: 0, flag: 'kr' },
  KWD: { name: 'Kuwaiti Dinar', symbol: 'ك', exp: 3, flag: 'kw' },
  KYD: { name: 'Caymanian Dollar', symbol: '$', exp: 2, flag: 'ky' },
  KZT: { name: 'Kazakhstani tenge', symbol: '₸', exp: 2, flag: 'kz' },
  LAK: { name: 'Lao or Laotian Kip', symbol: '₭', exp: 2, flag: 'la' },
  LBP: { name: 'Lebanese Pound', symbol: 'ل.ل', exp: 2, flag: 'lb' },
  LKR: { name: 'Sri Lankan Rupee', symbol: 'Rs', exp: 2, flag: 'lk' },
  LRD: { name: 'Liberian Dollar', symbol: '$', exp: 2, flag: 'lr' },
  LSL: { name: 'Lesotho loti', symbol: 'L or M', exp: 2, flag: 'ls' },
  LTL: { name: 'Lithuanian litas', symbol: 'Lt', exp: 2, flag: 'lt' },
  LYD: { name: 'Libyan Dinar', symbol: ' د.ل', exp: 3, flag: 'ly' },
  MAD: { name: 'Moroccan Dirham', symbol: 'م.د.', exp: 2, flag: 'ma' },
  MDL: { name: 'Moldovan Leu', symbol: 'L', exp: 2, flag: 'md' },
  MGA: { name: 'Malagasy Ariary', symbol: 'Ar', exp: 2, flag: 'mg' },
  MKD: { name: 'Macedonian Denar', symbol: 'ден', exp: 2, flag: 'mk' },
  MMK: { name: 'Burmese Kyat', symbol: 'K', exp: 2, flag: 'mm' },
  MNT: { name: 'Mongolian Tughrik', symbol: '₮', exp: 2, flag: 'mn' },
  MOP: { name: 'Macau Pataca', symbol: 'MOP$', exp: 2, flag: 'mo' },
  MRO: { name: 'Mauritanian Ouguiya', symbol: 'UM', exp: 2, flag: 'mr' },
  MUR: { name: 'Mauritian rupee', symbol: 'Rs', exp: 2, flag: 'mu' },
  MVR: { name: 'Maldivian Rufiyaa', symbol: 'rf', exp: 2, flag: 'mv' },
  MWK: { name: 'Malawian Kwacha', symbol: 'MK', exp: 2, flag: 'mw' },
  MXN: { name: 'Mexico Peso', symbol: '$', exp: 2, flag: 'mx' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM', exp: 2, flag: 'my' },
  MZN: { name: 'Mozambican Metical', symbol: 'MT', exp: 2, flag: 'mz' },
  NAD: { name: 'Namibian Dollar', symbol: '$', exp: 2, flag: 'na' },
  NGN: { name: 'Nigerian Naira', symbol: '₦', exp: 2, flag: 'ng' },
  NIO: { name: 'Nicaraguan córdoba', symbol: 'C$', exp: 2, flag: 'ni' },
  NOK: { name: 'Norwegian krone', symbol: 'kr', exp: 2, flag: 'no' },
  NPR: { name: 'Nepalese Rupee', symbol: 'Rs', exp: 2, flag: 'np' },
  NZD: { name: 'New Zealand Dollar', symbol: '$', exp: 2, flag: 'nz' },
  OMR: { name: 'Omani Rial', symbol: 'ع.ر.', exp: 3, flag: 'om' },
  PAB: { name: 'Balboa panamérn', symbol: 'B/', exp: 2, flag: 'pa' },
  PEN: { name: 'Peruvian nuevo sol', symbol: 'S/', exp: 2, flag: 'pe' },
  PGK: { name: 'Papua New Guinean Kina', symbol: 'K', exp: 2, flag: 'pg' },
  PHP: { name: 'Philippine Peso', symbol: '₱', exp: 2, flag: 'ph' },
  PKR: { name: 'Pakistani Rupee', symbol: 'Rs', exp: 2, flag: 'pk' },
  PLN: { name: 'Polish złoty', symbol: 'zł', exp: 2, flag: 'pl' },
  PYG: { name: 'Paraguayan guarani', symbol: '₲', exp: 0, flag: 'py' },
  QAR: { name: 'Qatari Riyal', symbol: 'ق.ر ', exp: 2, flag: 'qa' },
  RON: { name: 'Romanian leu', symbol: 'lei', exp: 2, flag: 'ro' },
  RSD: { name: 'Serbian Dinar', symbol: 'РСД', exp: 2, flag: 'rs' },
  RUB: { name: 'Russian Rouble', symbol: '₽', exp: 2, flag: 'ru' },
  RWF: { name: 'Rwandan franc', symbol: 'FRw, RF, R₣', exp: 0, flag: 'rw' },
  SAR: { name: 'Saudi Arabian Riyal', symbol: 'ر.س', exp: 2, flag: 'sa' },
  SBD: { name: 'Solomon Islander Dollar', symbol: 'SI$', exp: 2, flag: 'sb' },
  SCR: { name: 'Seychellois Rupee', symbol: 'Rs', exp: 2, flag: 'sc' },
  SDG: { name: 'Sudanese Pound', symbol: 'SDG', exp: 2, flag: 'sd' },
  SEK: { name: 'Swedish krona', symbol: 'kr', exp: 2, flag: 'se' },
  SGD: { name: 'Singapore Dollar', symbol: '$', exp: 2, flag: 'sg' },
  SLL: { name: 'Sierra Leonean Leone', symbol: 'Le', exp: 2, flag: 'sl' },
  SOS: { name: 'Somali Shilling', symbol: 'S', exp: 2, flag: 'so' },
  SRD: { name: 'Surinamese dollar', symbol: '$', exp: 2, flag: 'sr' },
  SYP: { name: 'Syrian Pound', symbol: '£', exp: 2, flag: 'sy' },
  SZL: { name: 'Swazi Lilangeni', symbol: 'L or E', exp: 2, flag: 'sz' },
  THB: { name: 'Thai Baht', symbol: '฿', exp: 2, flag: 'th' },
  TJS: { name: 'Tajikistani somoni', symbol: 'TJS', exp: 2, flag: 'tj' },
  TMT: { name: 'Turkmenistan manat', symbol: 'T', exp: 2, flag: 'tm' },
  TND: { name: 'Tunisian Dinar', symbol: 'TND', exp: 3, flag: 'tn' },
  TOP: { name: "Tongan Pa'anga", symbol: 'T$', exp: 2, flag: 'to' },
  TRY: { name: 'Turkish Lira', symbol: '₺', exp: 2, flag: 'tr' },
  TTD: { name: 'Trinidadian dollar', symbol: 'TT$', exp: 2, flag: 'tt' },
  TWD: { name: 'Taiwan New Dollar', symbol: 'NT$', exp: 2, flag: 'tw' },
  TZS: { name: 'Tanzanian Shilling', symbol: 'Sh', exp: 2, flag: 'tz' },
  UAH: { name: 'Ukrainian Hryvnia', symbol: '₴', exp: 2, flag: 'ua' },
  UGX: { name: 'Ugandan Shilling', symbol: 'USh', exp: 0, flag: 'ug' },
  USD: { name: 'US Dollar', symbol: '$', exp: 2, flag: 'us' },
  UYU: { name: 'Uruguayan peso', symbol: '$U', exp: 2, flag: 'uy' },
  UZS: { name: 'Uzbekistani som', symbol: 'лв', exp: 2, flag: 'uz' },
  VEF: { name: 'Venezuelan bolivar', symbol: 'Bs', exp: 2, flag: 've' },
  VND: { name: 'Vietnamese Dong', symbol: '₫', exp: 0, flag: 'vn' },
  VUV: { name: 'Vanuatu Vatu', symbol: 'VT', exp: 0, flag: 'vu' },
  WST: { name: 'Samoan Tālā', symbol: '$', exp: 2, flag: 'ws' },
  YER: { name: 'Yemeni Rial', symbol: 'YER', exp: 2, flag: 'ye' },
  ZAR: { name: 'South African Rand', symbol: 'R', exp: 2, flag: 'za' },
  ZMW: { name: 'Zambian Kwacha', symbol: 'ZMK', exp: 2, flag: 'zm' },
  ZWD: { name: 'Zimbabwean Dollar', symbol: 'Z$', exp: 2, flag: 'zw' },
  XAU: { name: 'Gold, troy ounce', symbol: 'XAU', exp: 2 }
};

export interface ExchangeRateT {
  [code: string]: number;
}

type CurrencyOptionT = {
  key: string;
  value: string;
  text: string;
  flag?: string;
};

const Currency = {
  defaultBase: 'USD',
  options(): CurrencyOptionT[] {
    return Object.keys(CURRENCY).map(code => ({
      key: code,
      value: code,
      flag: CURRENCY[code].flag,
      text: `${code}, ${CURRENCY[code].name}`
    }));
  },
  name(code: string) {
    return CURRENCY[code].name;
  },
  symbol(code: string) {
    return CURRENCY[code].symbol;
  },
  minAmount(code: string) {
    return Number(`1e-${CURRENCY[code].exp}`);
  },
  /**
   * Convert value to currency's subunit (e.g. cents for USD).
   * Subunit is the minimal currency unit and it is always whole integer.
   */
  numberToCents(value: string | number, code: string) {
    return Math.round(parseFloat(`${value}e${CURRENCY[code].exp}`));
  },
  /**
   * Convert value from subunit back to float representation with formatting.
   * For example 199001 USD becomes 1,990.01 USD
   */
  centsToNumber(value: number, code: string): number {
    const exp = CURRENCY[code].exp;
    const num = Number(`${value}e-${exp}`);

    return num;
  },
  centsToString(value: number, code: string, format: boolean = true): string {
    const exp = CURRENCY[code].exp;
    const num = Number(`${value}e-${exp}`);

    return format
      ? num.toLocaleString(undefined, {
          minimumFractionDigits: exp,
          maximumFractionDigits: exp
        })
      : num.toString();
  },
  centsToDollar(value: number, code: string): string {
    const exp = CURRENCY[code].exp;
    const num = Number(`${value}e-${exp}`);

    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  },
  convert(value: number, rate: number, from: string, to: string) {
    return (value / rate) * Math.pow(10, CURRENCY[from].exp - CURRENCY[to].exp);
  }
};

export default Currency;
