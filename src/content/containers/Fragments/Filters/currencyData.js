const currencies = [
  {
    currency: 'AED', symbol: 'د.إ', country: ['UAE'], countryCurrency: '',
  },
  {
    currency: 'AFN', symbol: 'Af', country: ['Afghanistan'], countryCurrency: '',
  },
  {
    currency: 'ALL', symbol: 'L', country: ['Albania'], countryCurrency: '',
  },
  {
    currency: 'AMD', symbol: 'Դ', country: ['Armenia'], countryCurrency: '',
  },
  {
    currency: 'AOA', symbol: 'Kz', country: ['Angola'], countryCurrency: '',
  },
  {
    currency: 'ARS', symbol: '$', country: ['Argentina'], countryCurrency: '',
  },
  {
    currency: 'AUD', symbol: '$', country: ['Australia', 'Kiribati', 'Coconut Islands', 'Nauru', 'Tuvalu'], countryCurrency: 'Australian Dollar',
  },
  {
    currency: 'AWG', symbol: 'ƒ', country: ['Aruba'], countryCurrency: 'Aruban Guilder/Florin',
  },
  {
    currency: 'AZN', symbol: 'ман', country: ['Azerbaijan'], countryCurrency: 'Azerbaijanian Manat',
  },
  {
    currency: 'BAM', symbol: 'КМ', country: ['Bosnia and Herzegovina'], countryCurrency: 'Konvertibilna Marka',
  },
  {
    currency: 'BBD', symbol: '$', country: ['Barbados'], countryCurrency: 'Barbados Dollar',
  },
  {
    currency: 'BDT', symbol: '৳', country: ['Bangladesh'], countryCurrency: 'Taka',
  },
  {
    currency: 'BGN', symbol: 'лв', country: ['Bulgaria'], countryCurrency: 'Bulgarian Lev',
  },
  {
    currency: 'BHD', symbol: 'ب.د', country: ['Bahrain'], countryCurrency: 'Bahraini Dinar',
  },
  {
    currency: 'BIF', symbol: '₣', country: ['Burundi'], countryCurrency: 'Burundi Franc',
  },
  {
    currency: 'BMD', symbol: '$', country: ['Bermuda'], countryCurrency: 'Bermudian Dollar',
  },
  {
    currency: 'BND', symbol: '$', country: ['Brunei', 'Singapore'], countryCurrency: 'Brunei Dollar',
  },
  {
    currency: 'BOB', symbol: 'Bs.', country: ['Bolivia'], countryCurrency: 'Boliviano',
  },
  {
    currency: 'BRL', symbol: 'R$', country: ['Brazil'], countryCurrency: 'Brazilian Real',
  },
  {
    currency: 'BSD', symbol: '$', country: ['Bahamas'], countryCurrency: 'Bahamian Dollar',
  },
  {
    currency: 'BTN', symbol: 'Nu.', country: ['Ngultrum'], countryCurrency: 'Bhutan',
  },
  {
    currency: 'BWP', symbol: 'P', country: ['Botswana'], countryCurrency: 'Pula',
  },
  {
    currency: 'BYR', symbol: 'Br', country: ['Belarus'], countryCurrency: 'Belarussian Ruble',
  },
  {
    currency: 'BZD', symbol: '$', country: ['Belize'], countryCurrency: 'Belize Dollar',
  },
  {
    currency: 'CAD', symbol: '$', country: ['Canada'], countryCurrency: 'Canadian Dollar',
  },
  {
    currency: 'CDF', symbol: '₣', country: ['Congo (Kinshasa)'], countryCurrency: 'Congolese Franc',
  },
  {
    currency: 'CHF', symbol: '₣', country: ['Lichtenstein', 'Switzerland'], countryCurrency: 'Swiss Franc',
  },
  {
    currency: 'CLP', symbol: '$', country: ['Chile'], countryCurrency: 'Chilean Peso',
  },
  {
    currency: 'CNY', symbol: '¥', country: ['China'], countryCurrency: 'Yuan',
  },
  {
    currency: 'COP', symbol: '$', country: ['Colombia'], countryCurrency: 'Colombian Peso',
  },
  {
    currency: 'CRC', symbol: '₡', country: ['Costa Rica'], countryCurrency: 'Costa Rican Colon',
  },
  {
    currency: 'CUP', symbol: '$', country: ['Cuba'], countryCurrency: 'Cuban Peso',
  },
  {
    currency: 'CVE', symbol: '$', country: ['Cape Verde'], countryCurrency: 'Cape Verde Escudo',
  },
  {
    currency: 'CZK', symbol: 'Kč', country: ['Czech Republic'], countryCurrency: 'Czech Koruna',
  },
  {
    currency: 'DJF', symbol: '₣', country: ['Djibouti'], countryCurrency: 'Djibouti Franc',
  },
  {
    currency: 'DKK', symbol: 'kr', country: ['Denmark'], countryCurrency: 'Danish Krone',
  },
  {
    currency: 'DOP', symbol: '$', country: ['Dominican Republic'], countryCurrency: 'Dominican Peso',
  },
  {
    currency: 'DZD', symbol: 'د.ج', country: ['Algeria'], countryCurrency: 'Algerian Dinar',
  },
  {
    currency: 'EGP', symbol: '£', country: ['Egypt'], countryCurrency: 'Egyptian Pound',
  },
  {
    currency: 'ERN', symbol: 'Nfk', country: ['Eritrea'], countryCurrency: 'Nakfa',
  },
  {
    currency: 'ETB', symbol: 'ብር', country: ['Ethiopia'], countryCurrency: 'Ethiopian Birr',
  },
  {
    currency: 'EUR', symbol: '€', country: ['Akrotiri and Dhekelia', 'Andorra', 'Austria', 'Belgium', 'Cyprus', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Monaco', 'Montenegro', 'Netherlands', 'Portugal', 'San-Marino', 'Slovakia', 'Slovenia', 'Spain', 'Vatican'], countryCurrency: 'Euro',
  },
  {
    currency: 'FJD', symbol: '$', country: ['Fiji'], countryCurrency: 'Fiji Dollar',
  },
  {
    currency: 'FKP', symbol: '£', country: ['Falkland Islands'], countryCurrency: 'Falkland Islands Pound',
  },
  {
    currency: 'GBP', symbol: '£', country: ['Alderney', 'British Indian Ocean Territory', 'Great Britain', 'Isle of Maine'], countryCurrency: 'Pound Sterling',
  },
  {
    currency: 'GEL', symbol: 'ლ', country: ['Georgia', 'South Ossetia'], countryCurrency: 'Lari',
  },
  {
    currency: 'GHS', symbol: '₵', country: ['Ghana'], countryCurrency: 'Cedi',
  },
  {
    currency: 'GIP', symbol: '£', country: ['Gibraltar'], countryCurrency: 'Gibraltar Pound',
  },
  {
    currency: 'GMD', symbol: 'D', country: ['Gambia'], countryCurrency: 'Dalasi',
  },
  {
    currency: 'GNF', symbol: '₣', country: ['Guinea'], countryCurrency: 'Guinea Franc',
  },
  {
    currency: 'GTQ', symbol: 'Q', country: ['Guatemala'], countryCurrency: 'Quetzal',
  },
  {
    currency: 'GYD', symbol: 'Q', country: ['Guyana'], countryCurrency: 'Guyana Dollar',
  },
  {
    currency: 'HKD', symbol: '$', country: ['Hong Kong'], countryCurrency: 'Hong Kong Dollar',
  },
  {
    currency: 'HNL', symbol: 'L', country: ['Honduras'], countryCurrency: 'Lempira',
  },
  {
    currency: 'HRK', symbol: 'Kn', country: ['Croatia'], countryCurrency: 'Croatian Kuna',
  },
  {
    currency: 'HTG', symbol: 'G', country: ['Haiti'], countryCurrency: 'Gourde',
  },
  {
    currency: 'HUF', symbol: 'Ft', country: ['Hungary'], countryCurrency: 'Forint',
  },
  {
    currency: 'IDR', symbol: 'Rp', country: ['Indonesia'], countryCurrency: 'Rupiah',
  },
  {
    currency: 'ILS', symbol: '₪', country: ['Israel', 'Palestine'], countryCurrency: 'New Israeli Shekel',
  },
  {
    currency: 'INR', symbol: '₨', country: ['Bhutan', 'India'], countryCurrency: 'Indian Rupee',
  },
  {
    currency: 'IQD', symbol: 'ع.د', country: ['Iraq'], countryCurrency: 'Iraqi Dinar',
  },
  {
    currency: 'IRR', symbol: '﷼', country: ['Iran'], countryCurrency: 'Iranian Rial',
  },
  {
    currency: 'ISK', symbol: 'Kr', country: ['Iceland'], countryCurrency: 'Iceland Krona',
  },
  {
    currency: 'JMD', symbol: '$', country: ['Jamaica'], countryCurrency: 'Jamaican Dollar',
  },
  {
    currency: 'JOD', symbol: 'د.ا', country: ['Jordan'], countryCurrency: 'Jordanian Dinar',
  },
  {
    currency: 'JPY', symbol: '¥', country: ['Japan'], countryCurrency: 'Yen',
  },
  {
    currency: 'KES', symbol: 'Sh', country: ['Kenya'], countryCurrency: 'Kenyan Shilling',
  },
  {
    currency: 'KGS', symbol: 'Лв', country: ['Kyrgyzstan'], countryCurrency: 'Som',
  },
  {
    currency: 'KHR', symbol: '៛', country: ['Cambodia'], countryCurrency: 'Riel',
  },
  {
    currency: 'KPW', symbol: '₩', country: ['North Korea'], countryCurrency: 'North Korean Won',
  },
  {
    currency: 'KRW', symbol: '₩', country: ['South Korea'], countryCurrency: 'South Korean Won',
  },
  {
    currency: 'KWD', symbol: 'د.ك', country: ['Kuwait'], countryCurrency: 'Kuwaiti Dinar',
  },
  {
    currency: 'KYD', symbol: '$', country: ['Cayman Islands'], countryCurrency: 'Cayman Islands Dollar',
  },
  {
    currency: 'KZT', symbol: '〒', country: ['Kazakhstan'], countryCurrency: 'Tenge',
  },
  {
    currency: 'LAK', symbol: '₭', country: ['Laos'], countryCurrency: 'Kip',
  },
  {
    currency: 'LBP', symbol: 'ل.ل', country: ['Lebanon'], countryCurrency: 'Lebanese Pound',
  },
  {
    currency: 'LKR', symbol: 'Rs', country: ['Sri Lanka'], countryCurrency: 'Sri Lanka Rupee',
  },
  {
    currency: 'LRD', symbol: '$', country: ['Liberia'], countryCurrency: 'Liberian Dollar',
  },
  {
    currency: 'LSL', symbol: 'L', country: ['Lesotho'], countryCurrency: 'Loti',
  },
  {
    currency: 'LYD', symbol: 'ل.د', country: ['Libya'], countryCurrency: 'Libyan Dinar',
  },
  {
    currency: 'MAD', symbol: 'د.م.', country: ['Morocco'], countryCurrency: 'Moroccan Dirham',
  },
  {
    currency: 'MDL', symbol: 'L', country: ['Moldova'], countryCurrency: 'Moldavian Leu',
  },
  {
    currency: 'MGA', symbol: 'Ar', country: ['Madagascar'], countryCurrency: 'Malagasy Ariary',
  },
  {
    currency: 'MKD', symbol: 'ден', country: ['Macedonia'], countryCurrency: 'Denar',
  },
  {
    currency: 'MMK', symbol: 'K', country: ['Myanmar (Burma)'], countryCurrency: 'Kyat',
  },
  {
    currency: 'MNT', symbol: '₮', country: ['Mongolia'], countryCurrency: 'Tugrik',
  },
  {
    currency: 'MOP', symbol: 'P', country: ['Macao'], countryCurrency: 'Pataca',
  },
  {
    currency: 'MRO', symbol: 'UM', country: ['Mauritania'], countryCurrency: 'Ouguiya',
  },
  {
    currency: 'MUR', symbol: '₨', country: ['Mauritius'], countryCurrency: 'Mauritius Rupee',
  },
  {
    currency: 'MVR', symbol: 'ރ.', country: ['Maldives'], countryCurrency: 'Rufiyaa',
  },
  {
    currency: 'MWK', symbol: 'MK', country: ['Malawi'], countryCurrency: 'Kwacha',
  },
  {
    currency: 'MXN', symbol: '$', country: ['Mexico'], countryCurrency: 'Mexican Peso',
  },
  {
    currency: 'MYR', symbol: 'RM', country: ['Malaysia'], countryCurrency: 'Malaysian Ringgit',
  },
  {
    currency: 'MZN', symbol: 'MTn', country: ['Mozambique'], countryCurrency: 'Metical',
  },
  {
    currency: 'Oman', symbol: '$', country: ['Namibia'], countryCurrency: 'Namibia Dollar',
  },
  {
    currency: 'NGN', symbol: '₦', country: ['Nigeria'], countryCurrency: 'Naira',
  },
  {
    currency: 'NIO', symbol: 'C$', country: ['Nicaragua'], countryCurrency: 'Cordoba Oro',
  },
  {
    currency: 'NOK', symbol: 'kr', country: ['Norway'], countryCurrency: 'Norwegian Krone',
  },
  {
    currency: 'NPR', symbol: '₨', country: ['Nepal'], countryCurrency: 'Nepalese Rupee',
  },
  {
    currency: 'NZD', symbol: '$', country: ['Cook Islands', 'New Zealand', 'Niue', 'Pitcairn Island'], countryCurrency: 'New Zealand Dollar',
  },
  {
    currency: 'OMR', symbol: 'ر.ع.', country: ['Oman'], countryCurrency: 'Rial Omani',
  },
  {
    currency: 'PAB', symbol: 'B/.', country: ['Panama'], countryCurrency: 'Balboa',
  },
  {
    currency: 'PEN', symbol: 'S/.', country: ['Peru'], countryCurrency: 'Nuevo Sol',
  },
  {
    currency: 'PGK', symbol: 'K', country: ['Papua New Guinea'], countryCurrency: 'Kina',
  },
  {
    currency: 'PHP', symbol: '₱', country: ['Philippines'], countryCurrency: 'Philippine Peso',
  },
  {
    currency: 'PKR', symbol: '₨', country: ['Pakistan'], countryCurrency: 'Pakistan Rupee',
  },
  {
    currency: 'PLN', symbol: 'zł', country: ['Poland'], countryCurrency: 'PZloty',
  },
  {
    currency: 'PYG', symbol: '₲', country: ['Paraguay'], countryCurrency: 'Guarani',
  },
  {
    currency: 'QAR', symbol: 'ر.ق', country: ['Qatar'], countryCurrency: 'Qatari Rial',
  },
  {
    currency: 'RON', symbol: 'L', country: ['Romania'], countryCurrency: 'Leu',
  },
  {
    currency: 'RSD', symbol: 'din', country: ['Kosovo', 'Serbia'], countryCurrency: 'Serbian Dinar',
  },
  {
    currency: 'RUB', symbol: 'р.', country: ['Russia', 'South Ossetia'], countryCurrency: 'Russian Ruble',
  },
  {
    currency: 'RWF', symbol: '₣', country: ['Rwanda'], countryCurrency: 'Rwanda Franc',
  },
  {
    currency: 'SAR', symbol: 'ر.س', country: ['Saudi Arabia'], countryCurrency: 'Saudi Riyal',
  },
  {
    currency: 'SBD', symbol: '$', country: ['Solomon Islands'], countryCurrency: 'Solomon Islands Dollar',
  },
  {
    currency: 'SCR', symbol: '₨', country: ['Seychelles'], countryCurrency: 'Seychelles Rupee',
  },
  {
    currency: 'SDG', symbol: '£', country: ['Sudan'], countryCurrency: 'Sudanese Pound',
  },
  {
    currency: 'SEK', symbol: 'kr', country: ['Sweden'], countryCurrency: 'Swedish Krona',
  },
  {
    currency: 'SGD', symbol: '$', country: ['Brunei', 'Singapore'], countryCurrency: 'Singapore Dollar',
  },
  {
    currency: 'SHP', symbol: '£', country: ['Ascension Island', 'Saint Helena', 'Tristan da Cunha'], countryCurrency: 'Saint Helena Pound',
  },
  {
    currency: 'SLL', symbol: 'Le', country: ['Sierra Leone'], countryCurrency: 'Leone',
  },
  {
    currency: 'SOS', symbol: 'Sh', country: ['Somalia'], countryCurrency: 'Somali Shilling',
  },
  {
    currency: 'SRD', symbol: '$', country: ['Suriname'], countryCurrency: 'Suriname Dollar',
  },
  {
    currency: 'STD', symbol: 'Db', country: ['Sao Tome and Principe'], countryCurrency: 'Dobra',
  },
  {
    currency: 'SYP', symbol: 'ل.س', country: ['Syria'], countryCurrency: 'Syrian Pound',
  },
  {
    currency: 'SZL', symbol: 'L', country: ['Swaziland'], countryCurrency: 'Lilangeni',
  },
  {
    currency: 'THB', symbol: '฿', country: ['Thailand'], countryCurrency: 'Baht',
  },
  {
    currency: 'TJS', symbol: 'ЅМ', country: ['Tajikistan'], countryCurrency: 'Somoni',
  },
  {
    currency: 'TMT', symbol: 'm', country: ['Turkmenistan'], countryCurrency: 'Manat',
  },
  {
    currency: 'TND', symbol: 'د.ت', country: ['Tunisia'], countryCurrency: 'Tunisian Dinar',
  },
  {
    currency: 'TOP', symbol: 'T$', country: ['Tonga'], countryCurrency: 'Pa’anga',
  },
  {
    currency: 'TRY', symbol: '₤', country: ['North Cyprus', 'Turkey'], countryCurrency: 'Turkish Lira',
  },
  {
    currency: 'TTD', symbol: '$', country: ['Trinidad and Tobago'], countryCurrency: 'Trinidad and Tobago Dollar',
  },
  {
    currency: 'TWD', symbol: '$', country: ['Taiwan'], countryCurrency: 'Taiwan Dollar',
  },
  {
    currency: 'TZS', symbol: 'Sh', country: ['Tanzania'], countryCurrency: 'Tanzanian Shilling',
  },
  {
    currency: 'UAH', symbol: '₴', country: ['Ukraine'], countryCurrency: 'Hryvnia',
  },
  {
    currency: 'UGX', symbol: 'Sh', country: ['Uganda'], countryCurrency: 'Uganda Shilling',
  },
  {
    currency: 'USD', symbol: '$', country: ['American Samoa', 'British Indian Ocean Territory', 'British Virgin Islands', 'Guam', 'Haiti', 'Marshall Islands', 'Micronesia', 'Northern Mariana Islands', 'Pacific Remote islands', 'Palau', 'Panama', 'Puerto Rico', 'Turks and Caicos Islands', 'United States of America', 'US Virgin Islands'], countryCurrency: 'US Dollar',
  },
  {
    currency: 'UYU', symbol: '$', country: ['Uruguay'], countryCurrency: 'Peso Uruguayo',
  },
  {
    currency: 'UZS', symbol: 'so\'m', country: ['Uzbekistan'], countryCurrency: 'Uzbekistan Som',
  },
  {
    currency: 'VEF', symbol: 'Bs F', country: ['Venezuela'], countryCurrency: 'Bolivar Fuerte',
  },
  {
    currency: 'VND', symbol: '₫', country: ['Vietnam'], countryCurrency: 'Dong',
  },
  {
    currency: 'VUV', symbol: 'Vt', country: ['Vanuatu'], countryCurrency: 'Vatu',
  },
  {
    currency: 'WST', symbol: 'T', country: ['Samoa'], countryCurrency: 'Tala',
  },
  {
    currency: 'XAF', symbol: '₣', country: ['Benin', 'Burkina Faso', 'Cameroon', 'Central African Republic', 'Chad', 'Congo (Brazzaville)', 'Côte d\'Ivoire', 'Equatorial Guinea', 'Gabon', 'Guinea-Bissau', 'Mali', 'Niger', 'Senegal', 'Togo'], countryCurrency: 'CFA Franc BCEAO',
  },
  {
    currency: 'XCD', symbol: '$', country: ['Anguilla', 'Antigua and Barbuda', 'Dominica', 'Grenada', 'Montserrat', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and Grenadine'], countryCurrency: 'East Caribbean Dollar',
  },
  {
    currency: 'XPF', symbol: '₣', country: ['French Polynesia', 'New Caledonia', 'Wallis and Futuna'], countryCurrency: 'CFP Franc',
  },
  {
    currency: 'YER', symbol: '﷼', country: ['Yemen'], countryCurrency: 'Yemeni Rial',
  },
  {
    currency: 'ZAR', symbol: 'R', country: ['Lesotho', 'Namibia', 'South Africa'], countryCurrency: 'Rand',
  },
  {
    currency: 'ZMW', symbol: 'ZK', country: ['Zambia'], countryCurrency: 'Zambian Kwacha',
  },
  {
    currency: 'ZWL', symbol: '$', country: ['Zimbabwe'], countryCurrency: 'Zimbabwe Dollar',
  },
];

export default currencies;
