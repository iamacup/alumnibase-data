const currencies = [
  { currency: 'AED', symbol: 'د.إ', country: 'UAE' },
  { currency: 'AFN', symbol: 'Af', country: 'Afghanistan' },


// ALL,L,Lek,Albania
// AMD,Դ,Armenian Dram,Armenia
// AOA,Kz,Kwanza,Angola
// ARS,$,Argentine Peso,Argentina
// AUD,$,Australian Dollar,"Australia
// Kiribati
// Coconut Islands
// Nauru
// Tuvalu"
// AWG,ƒ,Aruban Guilder/Florin,Aruba
// AZN,ман,Azerbaijanian Manat,Azerbaijan
// BAM,КМ,Konvertibilna Marka,Bosnia and Herzegovina
// BBD,$,Barbados Dollar,Barbados
// BDT,৳,Taka,Bangladesh
// BGN,лв,Bulgarian Lev,Bulgaria
// BHD,ب.د,Bahraini Dinar,Bahrain
// BIF,₣,Burundi Franc,Burundi
// BMD,$,Bermudian Dollar,Bermuda
// BND,$,Brunei Dollar,"Brunei
// Singapore"
// BOB,Bs.,Boliviano,Bolivia
// BRL,R$,Brazilian Real,Brazil
// BSD,$,Bahamian Dollar,Bahamas
// BTN,,Ngultrum,Bhutan
// BWP,P,Pula,Botswana
// BYR,Br,Belarussian Ruble,Belarus
// BZD,$,Belize Dollar,Belize
// CAD,$,Canadian Dollar,Canada
// CDF,₣,Congolese Franc,Congo (Kinshasa)
// CHF,₣,Swiss Franc,"Lichtenstein
// Switzerland"
// CLP,$,Chilean Peso,Chile
// CNY,¥,Yuan,China
// COP,$,Colombian Peso,Colombia
// CRC,₡,Costa Rican Colon,Costa Rica
// CUP,$,Cuban Peso,Cuba
// CVE,$,Cape Verde Escudo,Cape Verde
// CZK,Kč,Czech Koruna,Czech Republic
// DJF,₣,Djibouti Franc,Djibouti
// DKK,kr,Danish Krone,Denmark
// DOP,$,Dominican Peso,Dominican Republic
// DZD,د.ج,Algerian Dinar,Algeria
// EGP,£,Egyptian Pound,Egypt
// ERN,Nfk,Nakfa,Eritrea
// ETB,,Ethiopian Birr,Ethiopia
// EUR,€,Euro,"Akrotiri and Dhekelia
// Andorra
// Austria
// Belgium
// Cyprus
// Estonia
// Finland
// France
// Germany
// Greece
// Ireland
// Italy
// Kosovo
// Latvia
// Lithuania
// Luxembourg
// Malta
// Monaco
// Montenegro
// Netherlands
// Portugal
// San-Marino
// Slovakia
// Slovenia
// Spain
// Vatican"
// FJD,$,Fiji Dollar,Fiji
// FKP,£,Falkland Islands Pound,Falkland Islands
// GBP,£,Pound Sterling,"Alderney
// British Indian Ocean Territory
// Great Britain
// Isle of Maine"
// GEL,ლ,Lari,"Georgia
// South Ossetia"
// GHS,₵,Cedi,Ghana
// GIP,£,Gibraltar Pound,Gibraltar
// GMD,D,Dalasi,Gambia
// GNF,₣,Guinea Franc,Guinea
// GTQ,Q,Quetzal,Guatemala
// GYD,$,Guyana Dollar,Guyana
// HKD,$,Hong Kong Dollar,Hong Kong
// HNL,L,Lempira,Honduras
// HRK,Kn,Croatian Kuna,Croatia
// HTG,G,Gourde,Haiti
// HUF,Ft,Forint,Hungary
// IDR,Rp,Rupiah,Indonesia
// ILS,₪,New Israeli Shekel,"Israel
// Palestine"
// INR,₨,Indian Rupee,"Bhutan
// India"
// IQD,ع.د,Iraqi Dinar,Iraq
// IRR,﷼,Iranian Rial,Iran
// ISK,Kr,Iceland Krona,Iceland
// JMD,$,Jamaican Dollar,Jamaica
// JOD,د.ا,Jordanian Dinar,Jordan
// JPY,¥,Yen,Japan
// KES,Sh,Kenyan Shilling,Kenya
// KGS,,Som,Kyrgyzstan
// KHR,៛,Riel,Cambodia
// KPW,₩,North Korean Won,North Korea
// KRW,₩,South Korean Won,South Korea
// KWD,د.ك,Kuwaiti Dinar,Kuwait
// KYD,$,Cayman Islands Dollar,Cayman Islands
// KZT,〒,Tenge,Kazakhstan
// LAK,₭,Kip,Laos
// LBP,ل.ل,Lebanese Pound,Lebanon
// LKR,Rs,Sri Lanka Rupee,Sri Lanka
// LRD,$,Liberian Dollar,Liberia
// LSL,L,Loti,Lesotho
// LYD,ل.د,Libyan Dinar,Libya
// MAD,د.م.,Moroccan Dirham,Morocco
// MDL,L,Moldavian Leu,Moldova
// MGA,,Malagasy Ariary,Madagascar
// MKD,ден,Denar,Macedonia
// MMK,K,Kyat,Myanmar (Burma)
// MNT,₮,Tugrik,Mongolia
// MOP,P,Pataca,Macao
// MRO,UM,Ouguiya,Mauritania
// MUR,₨,Mauritius Rupee,Mauritius
// MVR,ރ.,Rufiyaa,Maldives
// MWK,MK,Kwacha,Malawi
// MXN,$,Mexican Peso,Mexico
// MYR,RM,Malaysian Ringgit,Malaysia
// MZN,MTn,Metical,Mozambique
// NAD,$,Namibia Dollar,Namibia
// NGN,₦,Naira,Nigeria
// NIO,C$,Cordoba Oro,Nicaragua
// NOK,kr,Norwegian Krone,Norway
// NPR,₨,Nepalese Rupee,Nepal
// NZD,$,New Zealand Dollar,"Cook Islands
// New Zealand
// Niue
// Pitcairn Island"
// OMR,ر.ع.,Rial Omani,Oman
// PAB,B/.,Balboa,Panama
// PEN,S/.,Nuevo Sol,Peru
// PGK,K,Kina,Papua New Guinea
// PHP,₱,Philippine Peso,Philippines
// PKR,₨,Pakistan Rupee,Pakistan
// PLN,zł,PZloty,Poland
// PYG,₲,Guarani,Paraguay
// QAR,ر.ق,Qatari Rial,Qatar
// RON,L,Leu,Romania
// RSD,din,Serbian Dinar,"Kosovo
// Serbia"
// RUB,р.,Russian Ruble,"Russia
// South Ossetia"
// RWF,₣,Rwanda Franc,Rwanda
// SAR,ر.س,Saudi Riyal,Saudi Arabia
// SBD,$,Solomon Islands Dollar,Solomon Islands
// SCR,₨,Seychelles Rupee,Seychelles
// SDG,£,Sudanese Pound,Sudan
// SEK,kr,Swedish Krona,Sweden
// SGD,$,Singapore Dollar,"Brunei
// Singapore"
// SHP,£,Saint Helena Pound,"Ascension Island
// Saint Helena
// Tristan da Cunha"
// SLL,Le,Leone,Sierra Leone
// SOS,Sh,Somali Shilling,Somalia
// SRD,$,Suriname Dollar,Suriname
// STD,Db,Dobra,Sao Tome and Principe
// SYP,ل.س,Syrian Pound,Syria
// SZL,L,Lilangeni,Swaziland
// THB,฿,Baht,Thailand
// TJS,ЅМ,Somoni,Tajikistan
// TMT,m,Manat,Turkmenistan
// TND,د.ت,Tunisian Dinar,Tunisia
// TOP,T$,Pa’anga,Tonga
// TRY,₤,Turkish Lira,"North Cyprus
// Turkey"
// TTD,$,Trinidad and Tobago Dollar,Trinidad and Tobago
// TWD,$,Taiwan Dollar,Taiwan
// TZS,Sh,Tanzanian Shilling,Tanzania
// UAH,₴,Hryvnia,Ukraine
// UGX,Sh,Uganda Shilling,Uganda
// USD,$,US Dollar,"American Samoa
// British Indian Ocean Territory
// British Virgin Islands
// Guam
// Haiti
// Marshall Islands
// Micronesia
// Northern Mariana Islands
// Pacific Remote islands
// Palau
// Panama
// Puerto Rico
// Turks and Caicos Islands
// United States of America
// US Virgin Islands"
// UYU,$,Peso Uruguayo,Uruguay
// UZS,,Uzbekistan Sum,Uzbekistan
// VEF,Bs F,Bolivar Fuerte,Venezuela
// VND,₫,Dong,Vietnam
// VUV,Vt,Vatu,Vanuatu
// WST,T,Tala,Samoa
// XAF,₣,CFA Franc BCEAO,"Benin
// Burkina Faso
// Cameroon
// Central African Republic
// Chad
// Congo (Brazzaville)
// Côte d'Ivoire
// Equatorial Guinea
// Gabon
// Guinea-Bissau
// Mali
// Niger
// Senegal
// Togo"
// XCD,$,East Caribbean Dollar,"Anguilla
// Antigua and Barbuda
// Dominica
// Grenada
// Montserrat
// Saint Kitts and Nevis
// Saint Lucia
// Saint Vincent and Grenadine"
// XPF,₣,CFP Franc,"French Polynesia
// New Caledonia
// Wallis and Futuna"
// YER,﷼,Yemeni Rial,Yemen
// ZAR,R,Rand,"Lesotho
// Namibia
// South Africa"
// ZMW,ZK,Zambian Kwacha,Zambia
// ZWL,$,Zimbabwe Dollar,Zimbabwe

];

export default currencies;
