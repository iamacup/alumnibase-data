
/* eslint-disable jsx-a11y/anchor-is-valid, no-undef */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { renderChartToTarget, redrawCharts, updateChartOptions } from '../../../../content/scripts/custom/echarts/utilities';
import { drawBoxplotChart } from '../../../../content/scripts/custom/echarts/generators';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
    $(() => {
      const option = {
        series_id: 4242979,
        backgroundColor: '#c5d6e7',
        color: [
          '#c23531',
          '#2f4554',
          '#61a0a8',
          '#d48265',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3',
          '#f05b72',
          '#ef5b9c',
          '#f47920',
          '#905a3d',
          '#fab27b',
          '#2a5caa',
          '#444693',
          '#726930',
          '#b2d235',
          '#6d8346',
          '#ac6767',
          '#1d953f',
          '#6950a1',
          '#918597',
          '#f6f5ec',
        ],
        series: [
          {
            itemStyle: {
              emphasis: {
                borderColor: 'black',
              },
              normal: {
                borderColor: 'white',
              },
            },
            symbol: 'circle',
            data: [
              {
                name: 'Aldershot',
                value: 0,
              },
              {
                name: 'Aldridge-Brownhills',
                value: 0,
              },
              {
                name: 'Altrincham and Sale West',
                value: 0,
              },
              {
                name: 'Amber Valley',
                value: 0,
              },
              {
                name: 'Arundel and South Downs',
                value: 0,
              },
              {
                name: 'Ashfield',
                value: 3,
              },
              {
                name: 'Ashford',
                value: 0,
              },
              {
                name: 'Ashton-under-Lyne',
                value: 3,
              },
              {
                name: 'Aylesbury',
                value: 0,
              },
              {
                name: 'Banbury',
                value: 0,
              },
              {
                name: 'Barking',
                value: 3,
              },
              {
                name: 'Barnsley Central',
                value: 3,
              },
              {
                name: 'Barnsley East',
                value: 3,
              },
              {
                name: 'Barrow and Furness',
                value: 3,
              },
              {
                name: 'Basildon and Billericay',
                value: 0,
              },
              {
                name: 'Basingstoke',
                value: 0,
              },
              {
                name: 'Bassetlaw',
                value: 3,
              },
              {
                name: 'Bath',
                value: 2,
              },
              {
                name: 'Batley and Spen',
                value: 3,
              },
              {
                name: 'Battersea',
                value: 3,
              },
              {
                name: 'Beaconsfield',
                value: 0,
              },
              {
                name: 'Beckenham',
                value: 0,
              },
              {
                name: 'Bedford',
                value: 3,
              },
              {
                name: 'Bermondsey and Old Southwark',
                value: 3,
              },
              {
                name: 'Berwick-upon-Tweed',
                value: 0,
              },
              {
                name: 'Bethnal Green and Bow',
                value: 3,
              },
              {
                name: 'Beverley and Holderness',
                value: 0,
              },
              {
                name: 'Bexhill and Battle',
                value: 0,
              },
              {
                name: 'Bexleyheath and Crayford',
                value: 0,
              },
              {
                name: 'Birkenhead',
                value: 3,
              },
              {
                name: 'Birmingham, Edgbaston',
                value: 3,
              },
              {
                name: 'Birmingham, Erdington',
                value: 3,
              },
              {
                name: 'Birmingham, Hall Green',
                value: 3,
              },
              {
                name: 'Birmingham, Hodge Hill',
                value: 3,
              },
              {
                name: 'Birmingham, Ladywood',
                value: 3,
              },
              {
                name: 'Birmingham, Northfield',
                value: 3,
              },
              {
                name: 'Birmingham, Perry Barr',
                value: 3,
              },
              {
                name: 'Birmingham, Selly Oak',
                value: 3,
              },
              {
                name: 'Birmingham, Yardley',
                value: 3,
              },
              {
                name: 'Bishop Auckland',
                value: 3,
              },
              {
                name: 'Blackburn',
                value: 3,
              },
              {
                name: 'Blackley and Broughton',
                value: 3,
              },
              {
                name: 'Blackpool North and Cleveleys',
                value: 0,
              },
              {
                name: 'Blackpool South',
                value: 3,
              },
              {
                name: 'Blaydon',
                value: 3,
              },
              {
                name: 'Blyth Valley',
                value: 3,
              },
              {
                name: 'Bognor Regis and Littlehampton',
                value: 0,
              },
              {
                name: 'Bolsover',
                value: 3,
              },
              {
                name: 'Bolton North East',
                value: 3,
              },
              {
                name: 'Bolton South East',
                value: 3,
              },
              {
                name: 'Bolton West',
                value: 0,
              },
              {
                name: 'Bootle',
                value: 3,
              },
              {
                name: 'Boston and Skegness',
                value: 0,
              },
              {
                name: 'Bosworth',
                value: 0,
              },
              {
                name: 'Bournemouth East',
                value: 0,
              },
              {
                name: 'Bournemouth West',
                value: 0,
              },
              {
                name: 'Bracknell',
                value: 0,
              },
              {
                name: 'Bradford East',
                value: 3,
              },
              {
                name: 'Bradford South',
                value: 3,
              },
              {
                name: 'Bradford West',
                value: 3,
              },
              {
                name: 'Braintree',
                value: 0,
              },
              {
                name: 'Brent Central',
                value: 3,
              },
              {
                name: 'Brent North',
                value: 3,
              },
              {
                name: 'Brentford and Isleworth',
                value: 3,
              },
              {
                name: 'Brentwood and Ongar',
                value: 0,
              },
              {
                name: 'Bridgwater and West Somerset',
                value: 0,
              },
              {
                name: 'Brigg and Goole',
                value: 0,
              },
              {
                name: 'Brighton, Kemptown',
                value: 3,
              },
              {
                name: 'Brighton, Pavilion',
                value: 5,
              },
              {
                name: 'Bristol East',
                value: 3,
              },
              {
                name: 'Bristol North West',
                value: 3,
              },
              {
                name: 'Bristol South',
                value: 3,
              },
              {
                name: 'Bristol West',
                value: 3,
              },
              {
                name: 'Broadland',
                value: 0,
              },
              {
                name: 'Bromley and Chislehurst',
                value: 0,
              },
              {
                name: 'Bromsgrove',
                value: 0,
              },
              {
                name: 'Broxbourne',
                value: 0,
              },
              {
                name: 'Broxtowe',
                value: 0,
              },
              {
                name: 'Buckingham',
                value: 7,
              },
              {
                name: 'Burnley',
                value: 3,
              },
              {
                name: 'Burton',
                value: 0,
              },
              {
                name: 'Bury North',
                value: 3,
              },
              {
                name: 'Bury South',
                value: 3,
              },
              {
                name: 'Bury St Edmunds',
                value: 0,
              },
              {
                name: 'Calder Valley',
                value: 0,
              },
              {
                name: 'Camberwell and Peckham',
                value: 3,
              },
              {
                name: 'Camborne and Redruth',
                value: 0,
              },
              {
                name: 'Cambridge',
                value: 3,
              },
              {
                name: 'Cannock Chase',
                value: 0,
              },
              {
                name: 'Canterbury',
                value: 3,
              },
              {
                name: 'Carlisle',
                value: 0,
              },
              {
                name: 'Carshalton and Wallington',
                value: 2,
              },
              {
                name: 'Castle Point',
                value: 0,
              },
              {
                name: 'Central Devon',
                value: 0,
              },
              {
                name: 'Central Suffolk and North Ipswich',
                value: 0,
              },
              {
                name: 'Charnwood',
                value: 0,
              },
              {
                name: 'Chatham and Aylesford',
                value: 0,
              },
              {
                name: 'Cheadle',
                value: 0,
              },
              {
                name: 'Chelmsford',
                value: 0,
              },
              {
                name: 'Chelsea and Fulham',
                value: 0,
              },
              {
                name: 'Cheltenham',
                value: 0,
              },
              {
                name: 'Chesham and Amersham',
                value: 0,
              },
              {
                name: 'Chesterfield',
                value: 3,
              },
              {
                name: 'Chichester',
                value: 0,
              },
              {
                name: 'Chingford and Woodford Green',
                value: 0,
              },
              {
                name: 'Chippenham',
                value: 0,
              },
              {
                name: 'Chipping Barnet',
                value: 0,
              },
              {
                name: 'Chorley',
                value: 3,
              },
              {
                name: 'Christchurch',
                value: 0,
              },
              {
                name: 'Cities of London and Westminster',
                value: 0,
              },
              {
                name: 'City of Chester',
                value: 3,
              },
              {
                name: 'City of Durham',
                value: 3,
              },
              {
                name: 'Clacton',
                value: 0,
              },
              {
                name: 'Cleethorpes',
                value: 0,
              },
              {
                name: 'Colchester',
                value: 0,
              },
              {
                name: 'Colne Valley',
                value: 3,
              },
              {
                name: 'Congleton',
                value: 0,
              },
              {
                name: 'Copeland',
                value: 0,
              },
              {
                name: 'Corby',
                value: 0,
              },
              {
                name: 'Coventry North East',
                value: 3,
              },
              {
                name: 'Coventry North West',
                value: 3,
              },
              {
                name: 'Coventry South',
                value: 3,
              },
              {
                name: 'Crawley',
                value: 0,
              },
              {
                name: 'Crewe and Nantwich',
                value: 3,
              },
              {
                name: 'Croydon Central',
                value: 3,
              },
              {
                name: 'Croydon North',
                value: 3,
              },
              {
                name: 'Croydon South',
                value: 0,
              },
              {
                name: 'Dagenham and Rainham',
                value: 3,
              },
              {
                name: 'Darlington',
                value: 3,
              },
              {
                name: 'Dartford',
                value: 0,
              },
              {
                name: 'Daventry',
                value: 0,
              },
              {
                name: 'Denton and Reddish',
                value: 3,
              },
              {
                name: 'Derby North',
                value: 3,
              },
              {
                name: 'Derby South',
                value: 3,
              },
              {
                name: 'Derbyshire Dales',
                value: 0,
              },
              {
                name: 'Devizes',
                value: 0,
              },
              {
                name: 'Dewsbury',
                value: 3,
              },
              {
                name: 'Don Valley',
                value: 3,
              },
              {
                name: 'Doncaster Central',
                value: 3,
              },
              {
                name: 'Doncaster North',
                value: 3,
              },
              {
                name: 'Dover',
                value: 0,
              },
              {
                name: 'Dudley North',
                value: 3,
              },
              {
                name: 'Dudley South',
                value: 0,
              },
              {
                name: 'Dulwich and West Norwood',
                value: 3,
              },
              {
                name: 'Ealing Central and Acton',
                value: 3,
              },
              {
                name: 'Ealing North',
                value: 3,
              },
              {
                name: 'Ealing, Southall',
                value: 3,
              },
              {
                name: 'Easington',
                value: 3,
              },
              {
                name: 'East Devon',
                value: 0,
              },
              {
                name: 'East Ham',
                value: 3,
              },
              {
                name: 'East Hampshire',
                value: 0,
              },
              {
                name: 'East Surrey',
                value: 0,
              },
              {
                name: 'East Worthing and Shoreham',
                value: 0,
              },
              {
                name: 'East Yorkshire',
                value: 0,
              },
              {
                name: 'Eastbourne',
                value: 2,
              },
              {
                name: 'Eastleigh',
                value: 0,
              },
              {
                name: 'Eddisbury',
                value: 0,
              },
              {
                name: 'Edmonton',
                value: 3,
              },
              {
                name: 'Ellesmere Port and Neston',
                value: 3,
              },
              {
                name: 'Elmet and Rothwell',
                value: 0,
              },
              {
                name: 'Eltham',
                value: 3,
              },
              {
                name: 'Enfield North',
                value: 3,
              },
              {
                name: 'Enfield, Southgate',
                value: 3,
              },
              {
                name: 'Epping Forest',
                value: 0,
              },
              {
                name: 'Epsom and Ewell',
                value: 0,
              },
              {
                name: 'Erewash',
                value: 0,
              },
              {
                name: 'Erith and Thamesmead',
                value: 3,
              },
              {
                name: 'Esher and Walton',
                value: 0,
              },
              {
                name: 'Exeter',
                value: 3,
              },
              {
                name: 'Fareham',
                value: 0,
              },
              {
                name: 'Faversham and Mid Kent',
                value: 0,
              },
              {
                name: 'Feltham and Heston',
                value: 3,
              },
              {
                name: 'Filton and Bradley Stoke',
                value: 0,
              },
              {
                name: 'Finchley and Golders Green',
                value: 0,
              },
              {
                name: 'Folkestone and Hythe',
                value: 0,
              },
              {
                name: 'Forest of Dean',
                value: 0,
              },
              {
                name: 'Fylde',
                value: 0,
              },
              {
                name: 'Gainsborough',
                value: 0,
              },
              {
                name: 'Garston and Halewood',
                value: 3,
              },
              {
                name: 'Gateshead',
                value: 3,
              },
              {
                name: 'Gedling',
                value: 3,
              },
              {
                name: 'Gillingham and Rainham',
                value: 0,
              },
              {
                name: 'Gloucester',
                value: 0,
              },
              {
                name: 'Gosport',
                value: 0,
              },
              {
                name: 'Grantham and Stamford',
                value: 0,
              },
              {
                name: 'Gravesham',
                value: 0,
              },
              {
                name: 'Great Grimsby',
                value: 3,
              },
              {
                name: 'Great Yarmouth',
                value: 0,
              },
              {
                name: 'Greenwich and Woolwich',
                value: 3,
              },
              {
                name: 'Guildford',
                value: 0,
              },
              {
                name: 'Hackney North and Stoke Newington',
                value: 3,
              },
              {
                name: 'Hackney South and Shoreditch',
                value: 3,
              },
              {
                name: 'Halesowen and Rowley Regis',
                value: 0,
              },
              {
                name: 'Halifax',
                value: 3,
              },
              {
                name: 'Haltemprice and Howden',
                value: 0,
              },
              {
                name: 'Halton',
                value: 3,
              },
              {
                name: 'Hammersmith',
                value: 3,
              },
              {
                name: 'Hampstead and Kilburn',
                value: 3,
              },
              {
                name: 'Harborough',
                value: 0,
              },
              {
                name: 'Harlow',
                value: 0,
              },
              {
                name: 'Harrogate and Knaresborough',
                value: 0,
              },
              {
                name: 'Harrow East',
                value: 0,
              },
              {
                name: 'Harrow West',
                value: 3,
              },
              {
                name: 'Hartlepool',
                value: 3,
              },
              {
                name: 'Harwich and North Essex',
                value: 0,
              },
              {
                name: 'Hastings and Rye',
                value: 0,
              },
              {
                name: 'Havant',
                value: 0,
              },
              {
                name: 'Hayes and Harlington',
                value: 3,
              },
              {
                name: 'Hazel Grove',
                value: 0,
              },
              {
                name: 'Hemel Hempstead',
                value: 0,
              },
              {
                name: 'Hemsworth',
                value: 3,
              },
              {
                name: 'Hendon',
                value: 0,
              },
              {
                name: 'Henley',
                value: 0,
              },
              {
                name: 'Hereford and South Herefordshire',
                value: 0,
              },
              {
                name: 'Hertford and Stortford',
                value: 0,
              },
              {
                name: 'Hertsmere',
                value: 0,
              },
              {
                name: 'Hexham',
                value: 0,
              },
              {
                name: 'Heywood and Middleton',
                value: 3,
              },
              {
                name: 'High Peak',
                value: 3,
              },
              {
                name: 'Hitchin and Harpenden',
                value: 0,
              },
              {
                name: 'Holborn and St Pancras',
                value: 3,
              },
              {
                name: 'Hornchurch and Upminster',
                value: 0,
              },
              {
                name: 'Hornsey and Wood Green',
                value: 3,
              },
              {
                name: 'Horsham',
                value: 0,
              },
              {
                name: 'Houghton and Sunderland South',
                value: 3,
              },
              {
                name: 'Hove',
                value: 3,
              },
              {
                name: 'Huddersfield',
                value: 3,
              },
              {
                name: 'Huntingdon',
                value: 0,
              },
              {
                name: 'Hyndburn',
                value: 3,
              },
              {
                name: 'Ilford North',
                value: 3,
              },
              {
                name: 'Ilford South',
                value: 3,
              },
              {
                name: 'Ipswich',
                value: 3,
              },
              {
                name: 'Isle of Wight',
                value: 0,
              },
              {
                name: 'Islington North',
                value: 3,
              },
              {
                name: 'Islington South and Finsbury',
                value: 3,
              },
              {
                name: 'Jarrow',
                value: 3,
              },
              {
                name: 'Keighley',
                value: 3,
              },
              {
                name: 'Kenilworth and Southam',
                value: 0,
              },
              {
                name: 'Kensington',
                value: 3,
              },
              {
                name: 'Kettering',
                value: 0,
              },
              {
                name: 'Kingston and Surbiton',
                value: 2,
              },
              {
                name: 'Kingston upon Hull East',
                value: 3,
              },
              {
                name: 'Kingston upon Hull North',
                value: 3,
              },
              {
                name: 'Kingston upon Hull West and Hessle',
                value: 3,
              },
              {
                name: 'Kingswood',
                value: 0,
              },
              {
                name: 'Knowsley',
                value: 3,
              },
              {
                name: 'Lancaster and Fleetwood',
                value: 3,
              },
              {
                name: 'Leeds Central',
                value: 3,
              },
              {
                name: 'Leeds East',
                value: 3,
              },
              {
                name: 'Leeds North East',
                value: 3,
              },
              {
                name: 'Leeds North West',
                value: 3,
              },
              {
                name: 'Leeds West',
                value: 3,
              },
              {
                name: 'Leicester East',
                value: 3,
              },
              {
                name: 'Leicester South',
                value: 3,
              },
              {
                name: 'Leicester West',
                value: 3,
              },
              {
                name: 'Leigh',
                value: 3,
              },
              {
                name: 'Lewes',
                value: 0,
              },
              {
                name: 'Lewisham East',
                value: 3,
              },
              {
                name: 'Lewisham West and Penge',
                value: 3,
              },
              {
                name: 'Lewisham, Deptford',
                value: 3,
              },
              {
                name: 'Leyton and Wanstead',
                value: 3,
              },
              {
                name: 'Lichfield',
                value: 0,
              },
              {
                name: 'Lincoln',
                value: 3,
              },
              {
                name: 'Liverpool, Riverside',
                value: 3,
              },
              {
                name: 'Liverpool, Walton',
                value: 3,
              },
              {
                name: 'Liverpool, Wavertree',
                value: 3,
              },
              {
                name: 'Liverpool, West Derby',
                value: 3,
              },
              {
                name: 'Loughborough',
                value: 0,
              },
              {
                name: 'Louth and Horncastle',
                value: 0,
              },
              {
                name: 'Ludlow',
                value: 0,
              },
              {
                name: 'Luton North',
                value: 3,
              },
              {
                name: 'Luton South',
                value: 3,
              },
              {
                name: 'Macclesfield',
                value: 0,
              },
              {
                name: 'Maidenhead',
                value: 0,
              },
              {
                name: 'Maidstone and The Weald',
                value: 0,
              },
              {
                name: 'Makerfield',
                value: 3,
              },
              {
                name: 'Maldon',
                value: 0,
              },
              {
                name: 'Manchester Central',
                value: 3,
              },
              {
                name: 'Manchester, Gorton',
                value: 3,
              },
              {
                name: 'Manchester, Withington',
                value: 3,
              },
              {
                name: 'Mansfield',
                value: 0,
              },
              {
                name: 'Meon Valley',
                value: 0,
              },
              {
                name: 'Meriden',
                value: 0,
              },
              {
                name: 'Mid Bedfordshire',
                value: 0,
              },
              {
                name: 'Mid Derbyshire',
                value: 0,
              },
              {
                name: 'Mid Dorset and North Poole',
                value: 0,
              },
              {
                name: 'Mid Norfolk',
                value: 0,
              },
              {
                name: 'Mid Sussex',
                value: 0,
              },
              {
                name: 'Mid Worcestershire',
                value: 0,
              },
              {
                name: 'Middlesbrough',
                value: 3,
              },
              {
                name: 'Middlesbrough South and East Cleveland',
                value: 0,
              },
              {
                name: 'Milton Keynes North',
                value: 0,
              },
              {
                name: 'Milton Keynes South',
                value: 0,
              },
              {
                name: 'Mitcham and Morden',
                value: 3,
              },
              {
                name: 'Mole Valley',
                value: 0,
              },
              {
                name: 'Morecambe and Lunesdale',
                value: 0,
              },
              {
                name: 'Morley and Outwood',
                value: 0,
              },
              {
                name: 'New Forest East',
                value: 0,
              },
              {
                name: 'New Forest West',
                value: 0,
              },
              {
                name: 'Newark',
                value: 0,
              },
              {
                name: 'Newbury',
                value: 0,
              },
              {
                name: 'Newcastle upon Tyne Central',
                value: 3,
              },
              {
                name: 'Newcastle upon Tyne East',
                value: 3,
              },
              {
                name: 'Newcastle upon Tyne North',
                value: 3,
              },
              {
                name: 'Newcastle-under-Lyme',
                value: 3,
              },
              {
                name: 'Newton Abbot',
                value: 0,
              },
              {
                name: 'Normanton, Pontefract and Castleford',
                value: 3,
              },
              {
                name: 'North Cornwall',
                value: 0,
              },
              {
                name: 'North Devon',
                value: 0,
              },
              {
                name: 'North Dorset',
                value: 0,
              },
              {
                name: 'North Durham',
                value: 3,
              },
              {
                name: 'North East Bedfordshire',
                value: 0,
              },
              {
                name: 'North East Cambridgeshire',
                value: 0,
              },
              {
                name: 'North East Derbyshire',
                value: 0,
              },
              {
                name: 'North East Hampshire',
                value: 0,
              },
              {
                name: 'North East Hertfordshire',
                value: 0,
              },
              {
                name: 'North East Somerset',
                value: 0,
              },
              {
                name: 'North Herefordshire',
                value: 0,
              },
              {
                name: 'North Norfolk',
                value: 2,
              },
              {
                name: 'North Shropshire',
                value: 0,
              },
              {
                name: 'North Somerset',
                value: 0,
              },
              {
                name: 'North Swindon',
                value: 0,
              },
              {
                name: 'North Thanet',
                value: 0,
              },
              {
                name: 'North Tyneside',
                value: 3,
              },
              {
                name: 'North Warwickshire',
                value: 0,
              },
              {
                name: 'North West Cambridgeshire',
                value: 0,
              },
              {
                name: 'North West Durham',
                value: 3,
              },
              {
                name: 'North West Hampshire',
                value: 0,
              },
              {
                name: 'North West Leicestershire',
                value: 0,
              },
              {
                name: 'North West Norfolk',
                value: 0,
              },
              {
                name: 'North Wiltshire',
                value: 0,
              },
              {
                name: 'Northampton North',
                value: 0,
              },
              {
                name: 'Northampton South',
                value: 0,
              },
              {
                name: 'Norwich North',
                value: 0,
              },
              {
                name: 'Norwich South',
                value: 3,
              },
              {
                name: 'Nottingham East',
                value: 3,
              },
              {
                name: 'Nottingham North',
                value: 3,
              },
              {
                name: 'Nottingham South',
                value: 3,
              },
              {
                name: 'Nuneaton',
                value: 0,
              },
              {
                name: 'Old Bexley and Sidcup',
                value: 0,
              },
              {
                name: 'Oldham East and Saddleworth',
                value: 3,
              },
              {
                name: 'Oldham West and Royton',
                value: 3,
              },
              {
                name: 'Orpington',
                value: 0,
              },
              {
                name: 'Oxford East',
                value: 3,
              },
              {
                name: 'Oxford West and Abingdon',
                value: 2,
              },
              {
                name: 'Pendle',
                value: 0,
              },
              {
                name: 'Penistone and Stocksbridge',
                value: 3,
              },
              {
                name: 'Penrith and The Border',
                value: 0,
              },
              {
                name: 'Peterborough',
                value: 3,
              },
              {
                name: 'Plymouth, Moor View',
                value: 0,
              },
              {
                name: 'Plymouth, Sutton and Devonport',
                value: 3,
              },
              {
                name: 'Poole',
                value: 0,
              },
              {
                name: 'Poplar and Limehouse',
                value: 3,
              },
              {
                name: 'Portsmouth North',
                value: 0,
              },
              {
                name: 'Portsmouth South',
                value: 3,
              },
              {
                name: 'Preston',
                value: 3,
              },
              {
                name: 'Pudsey',
                value: 0,
              },
              {
                name: 'Putney',
                value: 0,
              },
              {
                name: 'Rayleigh and Wickford',
                value: 0,
              },
              {
                name: 'Reading East',
                value: 3,
              },
              {
                name: 'Reading West',
                value: 0,
              },
              {
                name: 'Redcar',
                value: 3,
              },
              {
                name: 'Redditch',
                value: 0,
              },
              {
                name: 'Reigate',
                value: 0,
              },
              {
                name: 'Ribble Valley',
                value: 0,
              },
              {
                name: 'Richmond (Yorks)',
                value: 0,
              },
              {
                name: 'Richmond Park',
                value: 0,
              },
              {
                name: 'Rochdale',
                value: 3,
              },
              {
                name: 'Rochester and Strood',
                value: 0,
              },
              {
                name: 'Rochford and Southend East',
                value: 0,
              },
              {
                name: 'Romford',
                value: 0,
              },
              {
                name: 'Romsey and Southampton North',
                value: 0,
              },
              {
                name: 'Rossendale and Darwen',
                value: 0,
              },
              {
                name: 'Rother Valley',
                value: 3,
              },
              {
                name: 'Rotherham',
                value: 3,
              },
              {
                name: 'Rugby',
                value: 0,
              },
              {
                name: 'Ruislip, Northwood and Pinner',
                value: 0,
              },
              {
                name: 'Runnymede and Weybridge',
                value: 0,
              },
              {
                name: 'Rushcliffe',
                value: 0,
              },
              {
                name: 'Rutland and Melton',
                value: 0,
              },
              {
                name: 'Saffron Walden',
                value: 0,
              },
              {
                name: 'Salford and Eccles',
                value: 3,
              },
              {
                name: 'Salisbury',
                value: 0,
              },
              {
                name: 'Scarborough and Whitby',
                value: 0,
              },
              {
                name: 'Scunthorpe',
                value: 3,
              },
              {
                name: 'Sedgefield',
                value: 3,
              },
              {
                name: 'Sefton Central',
                value: 3,
              },
              {
                name: 'Selby and Ainsty',
                value: 0,
              },
              {
                name: 'Sevenoaks',
                value: 0,
              },
              {
                name: 'Sheffield Central',
                value: 3,
              },
              {
                name: 'Sheffield South East',
                value: 3,
              },
              {
                name: 'Sheffield, Brightside and Hillsborough',
                value: 3,
              },
              {
                name: 'Sheffield, Hallam',
                value: 3,
              },
              {
                name: 'Sheffield, Heeley',
                value: 3,
              },
              {
                name: 'Sherwood',
                value: 0,
              },
              {
                name: 'Shipley',
                value: 0,
              },
              {
                name: 'Shrewsbury and Atcham',
                value: 0,
              },
              {
                name: 'Sittingbourne and Sheppey',
                value: 0,
              },
              {
                name: 'Skipton and Ripon',
                value: 0,
              },
              {
                name: 'Sleaford and North Hykeham',
                value: 0,
              },
              {
                name: 'Slough',
                value: 3,
              },
              {
                name: 'Solihull',
                value: 0,
              },
              {
                name: 'Somerton and Frome',
                value: 0,
              },
              {
                name: 'South Basildon and East Thurrock',
                value: 0,
              },
              {
                name: 'South Cambridgeshire',
                value: 0,
              },
              {
                name: 'South Derbyshire',
                value: 0,
              },
              {
                name: 'South Dorset',
                value: 0,
              },
              {
                name: 'South East Cambridgeshire',
                value: 0,
              },
              {
                name: 'South East Cornwall',
                value: 0,
              },
              {
                name: 'South Holland and The Deepings',
                value: 0,
              },
              {
                name: 'South Leicestershire',
                value: 0,
              },
              {
                name: 'South Norfolk',
                value: 0,
              },
              {
                name: 'South Northamptonshire',
                value: 0,
              },
              {
                name: 'South Ribble',
                value: 0,
              },
              {
                name: 'South Shields',
                value: 3,
              },
              {
                name: 'South Staffordshire',
                value: 0,
              },
              {
                name: 'South Suffolk',
                value: 0,
              },
              {
                name: 'South Swindon',
                value: 0,
              },
              {
                name: 'South Thanet',
                value: 0,
              },
              {
                name: 'South West Bedfordshire',
                value: 0,
              },
              {
                name: 'South West Devon',
                value: 0,
              },
              {
                name: 'South West Hertfordshire',
                value: 0,
              },
              {
                name: 'South West Norfolk',
                value: 0,
              },
              {
                name: 'South West Surrey',
                value: 0,
              },
              {
                name: 'South West Wiltshire',
                value: 0,
              },
              {
                name: 'Southampton, Itchen',
                value: 0,
              },
              {
                name: 'Southampton, Test',
                value: 3,
              },
              {
                name: 'Southend West',
                value: 0,
              },
              {
                name: 'Southport',
                value: 0,
              },
              {
                name: 'Spelthorne',
                value: 0,
              },
              {
                name: 'St Albans',
                value: 0,
              },
              {
                name: 'St Austell and Newquay',
                value: 0,
              },
              {
                name: 'St Helens North',
                value: 3,
              },
              {
                name: 'St Helens South and Whiston',
                value: 3,
              },
              {
                name: 'St Ives',
                value: 0,
              },
              {
                name: 'Stafford',
                value: 0,
              },
              {
                name: 'Staffordshire Moorlands',
                value: 0,
              },
              {
                name: 'Stalybridge and Hyde',
                value: 3,
              },
              {
                name: 'Stevenage',
                value: 0,
              },
              {
                name: 'Stockport',
                value: 3,
              },
              {
                name: 'Stockton North',
                value: 3,
              },
              {
                name: 'Stockton South',
                value: 3,
              },
              {
                name: 'Stoke-on-Trent Central',
                value: 3,
              },
              {
                name: 'Stoke-on-Trent North',
                value: 3,
              },
              {
                name: 'Stoke-on-Trent South',
                value: 0,
              },
              {
                name: 'Stone',
                value: 0,
              },
              {
                name: 'Stourbridge',
                value: 0,
              },
              {
                name: 'Stratford-on-Avon',
                value: 0,
              },
              {
                name: 'Streatham',
                value: 3,
              },
              {
                name: 'Stretford and Urmston',
                value: 3,
              },
              {
                name: 'Stroud',
                value: 3,
              },
              {
                name: 'Suffolk Coastal',
                value: 0,
              },
              {
                name: 'Sunderland Central',
                value: 3,
              },
              {
                name: 'Surrey Heath',
                value: 0,
              },
              {
                name: 'Sutton and Cheam',
                value: 0,
              },
              {
                name: 'Sutton Coldfield',
                value: 0,
              },
              {
                name: 'Tamworth',
                value: 0,
              },
              {
                name: 'Tatton',
                value: 0,
              },
              {
                name: 'Taunton Deane',
                value: 0,
              },
              {
                name: 'Telford',
                value: 0,
              },
              {
                name: 'Tewkesbury',
                value: 0,
              },
              {
                name: 'The Cotswolds',
                value: 0,
              },
              {
                name: 'The Wrekin',
                value: 0,
              },
              {
                name: 'Thirsk and Malton',
                value: 0,
              },
              {
                name: 'Thornbury and Yate',
                value: 0,
              },
              {
                name: 'Thurrock',
                value: 0,
              },
              {
                name: 'Tiverton and Honiton',
                value: 0,
              },
              {
                name: 'Tonbridge and Malling',
                value: 0,
              },
              {
                name: 'Tooting',
                value: 3,
              },
              {
                name: 'Torbay',
                value: 0,
              },
              {
                name: 'Torridge and West Devon',
                value: 0,
              },
              {
                name: 'Totnes',
                value: 0,
              },
              {
                name: 'Tottenham',
                value: 3,
              },
              {
                name: 'Truro and Falmouth',
                value: 0,
              },
              {
                name: 'Tunbridge Wells',
                value: 0,
              },
              {
                name: 'Twickenham',
                value: 2,
              },
              {
                name: 'Tynemouth',
                value: 3,
              },
              {
                name: 'Uxbridge and South Ruislip',
                value: 0,
              },
              {
                name: 'Vauxhall',
                value: 3,
              },
              {
                name: 'Wakefield',
                value: 3,
              },
              {
                name: 'Wallasey',
                value: 3,
              },
              {
                name: 'Walsall North',
                value: 0,
              },
              {
                name: 'Walsall South',
                value: 3,
              },
              {
                name: 'Walthamstow',
                value: 3,
              },
              {
                name: 'Wansbeck',
                value: 3,
              },
              {
                name: 'Wantage',
                value: 0,
              },
              {
                name: 'Warley',
                value: 3,
              },
              {
                name: 'Warrington North',
                value: 3,
              },
              {
                name: 'Warrington South',
                value: 3,
              },
              {
                name: 'Warwick and Leamington',
                value: 3,
              },
              {
                name: 'Washington and Sunderland West',
                value: 3,
              },
              {
                name: 'Watford',
                value: 0,
              },
              {
                name: 'Waveney',
                value: 0,
              },
              {
                name: 'Wealden',
                value: 0,
              },
              {
                name: 'Weaver Vale',
                value: 3,
              },
              {
                name: 'Wellingborough',
                value: 0,
              },
              {
                name: 'Wells',
                value: 0,
              },
              {
                name: 'Welwyn Hatfield',
                value: 0,
              },
              {
                name: 'Wentworth and Dearne',
                value: 3,
              },
              {
                name: 'West Bromwich East',
                value: 3,
              },
              {
                name: 'West Bromwich West',
                value: 3,
              },
              {
                name: 'West Dorset',
                value: 0,
              },
              {
                name: 'West Ham',
                value: 3,
              },
              {
                name: 'West Lancashire',
                value: 3,
              },
              {
                name: 'West Suffolk',
                value: 0,
              },
              {
                name: 'West Worcestershire',
                value: 0,
              },
              {
                name: 'Westminster North',
                value: 3,
              },
              {
                name: 'Westmorland and Lonsdale',
                value: 2,
              },
              {
                name: 'Weston-Super-Mare',
                value: 0,
              },
              {
                name: 'Wigan',
                value: 3,
              },
              {
                name: 'Wimbledon',
                value: 0,
              },
              {
                name: 'Winchester',
                value: 0,
              },
              {
                name: 'Windsor',
                value: 0,
              },
              {
                name: 'Wirral South',
                value: 3,
              },
              {
                name: 'Wirral West',
                value: 3,
              },
              {
                name: 'Witham',
                value: 0,
              },
              {
                name: 'Witney',
                value: 0,
              },
              {
                name: 'Woking',
                value: 0,
              },
              {
                name: 'Wokingham',
                value: 0,
              },
              {
                name: 'Wolverhampton North East',
                value: 3,
              },
              {
                name: 'Wolverhampton South East',
                value: 3,
              },
              {
                name: 'Wolverhampton South West',
                value: 3,
              },
              {
                name: 'Worcester',
                value: 0,
              },
              {
                name: 'Workington',
                value: 3,
              },
              {
                name: 'Worsley and Eccles South',
                value: 3,
              },
              {
                name: 'Worthing West',
                value: 0,
              },
              {
                name: 'Wycombe',
                value: 0,
              },
              {
                name: 'Wyre and Preston North',
                value: 0,
              },
              {
                name: 'Wyre Forest',
                value: 0,
              },
              {
                name: 'Wythenshawe and Sale East',
                value: 3,
              },
              {
                name: 'Yeovil',
                value: 0,
              },
              {
                name: 'York Central',
                value: 3,
              },
              {
                name: 'York Outer',
                value: 0,
              },
              {
                name: 'Belfast East',
                value: 4,
              },
              {
                name: 'Belfast North',
                value: 4,
              },
              {
                name: 'Belfast South',
                value: 4,
              },
              {
                name: 'Belfast West',
                value: 8,
              },
              {
                name: 'East Antrim',
                value: 4,
              },
              {
                name: 'East Londonderry',
                value: 4,
              },
              {
                name: 'Fermanagh and South Tyrone',
                value: 8,
              },
              {
                name: 'Foyle',
                value: 8,
              },
              {
                name: 'Lagan Valley',
                value: 4,
              },
              {
                name: 'Mid Ulster',
                value: 8,
              },
              {
                name: 'Newry and Armagh',
                value: 8,
              },
              {
                name: 'North Antrim',
                value: 4,
              },
              {
                name: 'North Down',
                value: 7,
              },
              {
                name: 'South Antrim',
                value: 4,
              },
              {
                name: 'South Down',
                value: 8,
              },
              {
                name: 'Strangford',
                value: 4,
              },
              {
                name: 'Upper Bann',
                value: 4,
              },
              {
                name: 'West Tyrone',
                value: 8,
              },
              {
                name: 'Aberdeen North',
                value: 6,
              },
              {
                name: 'Aberdeen South',
                value: 0,
              },
              {
                name: 'Airdrie and Shotts',
                value: 6,
              },
              {
                name: 'Angus',
                value: 0,
              },
              {
                name: 'Argyll and Bute',
                value: 6,
              },
              {
                name: 'Ayr, Carrick and Cumnock',
                value: 0,
              },
              {
                name: 'Banff and Buchan',
                value: 0,
              },
              {
                name: 'Berwickshire, Roxburgh and Selkirk',
                value: 0,
              },
              {
                name: 'Caithness, Sutherland and Easter Ross',
                value: 2,
              },
              {
                name: 'Central Ayrshire',
                value: 6,
              },
              {
                name: 'Coatbridge, Chryston and Bellshill',
                value: 3,
              },
              {
                name: 'Cumbernauld, Kilsyth and Kirkintilloch East',
                value: 6,
              },
              {
                name: 'Dumfries and Galloway',
                value: 0,
              },
              {
                name: 'Dumfriesshire, Clydesdale and Tweeddale',
                value: 0,
              },
              {
                name: 'Dundee East',
                value: 6,
              },
              {
                name: 'Dundee West',
                value: 6,
              },
              {
                name: 'Dunfermline and West Fife',
                value: 6,
              },
              {
                name: 'East Dunbartonshire',
                value: 2,
              },
              {
                name: 'East Kilbride, Strathaven and Lesmahagow',
                value: 6,
              },
              {
                name: 'East Lothian',
                value: 3,
              },
              {
                name: 'East Renfrewshire',
                value: 0,
              },
              {
                name: 'Edinburgh East',
                value: 6,
              },
              {
                name: 'Edinburgh North and Leith',
                value: 6,
              },
              {
                name: 'Edinburgh South',
                value: 3,
              },
              {
                name: 'Edinburgh South West',
                value: 6,
              },
              {
                name: 'Edinburgh West',
                value: 2,
              },
              {
                name: 'Na h-Eileanan an Iar',
                value: 6,
              },
              {
                name: 'Falkirk',
                value: 6,
              },
              {
                name: 'Glasgow Central',
                value: 6,
              },
              {
                name: 'Glasgow East',
                value: 6,
              },
              {
                name: 'Glasgow North',
                value: 6,
              },
              {
                name: 'Glasgow North East',
                value: 3,
              },
              {
                name: 'Glasgow North West',
                value: 6,
              },
              {
                name: 'Glasgow South',
                value: 6,
              },
              {
                name: 'Glasgow South West',
                value: 6,
              },
              {
                name: 'Glenrothes',
                value: 6,
              },
              {
                name: 'Gordon',
                value: 0,
              },
              {
                name: 'Inverclyde',
                value: 6,
              },
              {
                name: 'Inverness, Nairn, Badenoch and Strathspey',
                value: 6,
              },
              {
                name: 'Kilmarnock and Loudoun',
                value: 6,
              },
              {
                name: 'Kirkcaldy and Cowdenbeath',
                value: 3,
              },
              {
                name: 'Lanark and Hamilton East',
                value: 6,
              },
              {
                name: 'Linlithgow and East Falkirk',
                value: 6,
              },
              {
                name: 'Livingston',
                value: 6,
              },
              {
                name: 'Midlothian',
                value: 3,
              },
              {
                name: 'Moray',
                value: 0,
              },
              {
                name: 'Motherwell and Wishaw',
                value: 6,
              },
              {
                name: 'North Ayrshire and Arran',
                value: 6,
              },
              {
                name: 'North East Fife',
                value: 6,
              },
              {
                name: 'Ochil and South Perthshire',
                value: 0,
              },
              {
                name: 'Orkney and Shetland',
                value: 2,
              },
              {
                name: 'Paisley and Renfrewshire North',
                value: 6,
              },
              {
                name: 'Paisley and Renfrewshire South',
                value: 6,
              },
              {
                name: 'Perth and North Perthshire',
                value: 6,
              },
              {
                name: 'Ross, Skye and Lochaber',
                value: 6,
              },
              {
                name: 'Rutherglen and Hamilton West',
                value: 3,
              },
              {
                name: 'Stirling',
                value: 0,
              },
              {
                name: 'West Aberdeenshire and Kincardine',
                value: 0,
              },
              {
                name: 'West Dunbartonshire',
                value: 6,
              },
              {
                name: 'Ynys Mon',
                value: 3,
              },
              {
                name: 'Delyn',
                value: 3,
              },
              {
                name: 'Alyn and Deeside',
                value: 3,
              },
              {
                name: 'Wrexham',
                value: 3,
              },
              {
                name: 'Llanelli',
                value: 3,
              },
              {
                name: 'Gower',
                value: 3,
              },
              {
                name: 'Swansea West',
                value: 3,
              },
              {
                name: 'Swansea East',
                value: 3,
              },
              {
                name: 'Aberavon',
                value: 3,
              },
              {
                name: 'Cardiff Central',
                value: 3,
              },
              {
                name: 'Cardiff North',
                value: 3,
              },
              {
                name: 'Rhondda',
                value: 3,
              },
              {
                name: 'Torfaen',
                value: 3,
              },
              {
                name: 'Monmouth',
                value: 0,
              },
              {
                name: 'Newport East',
                value: 3,
              },
              {
                name: 'Newport West',
                value: 3,
              },
              {
                name: 'Arfon',
                value: 1,
              },
              {
                name: 'Aberconwy',
                value: 0,
              },
              {
                name: 'Clwyd West',
                value: 0,
              },
              {
                name: 'Vale of Clwyd',
                value: 3,
              },
              {
                name: 'Dwyfor Meirionnydd',
                value: 1,
              },
              {
                name: 'Clwyd South',
                value: 3,
              },
              {
                name: 'Montgomeryshire',
                value: 0,
              },
              {
                name: 'Ceredigion',
                value: 1,
              },
              {
                name: 'Preseli Pembrokeshire',
                value: 0,
              },
              {
                name: 'Carmarthen West and South Pembrokeshire',
                value: 0,
              },
              {
                name: 'Carmarthen East and Dinefwr',
                value: 1,
              },
              {
                name: 'Brecon and Radnorshire',
                value: 0,
              },
              {
                name: 'Neath',
                value: 3,
              },
              {
                name: 'Cynon Valley',
                value: 3,
              },
              {
                name: 'Merthyr Tydfil and Rhymney',
                value: 3,
              },
              {
                name: 'Blaenau Gwent',
                value: 3,
              },
              {
                name: 'Bridgend',
                value: 3,
              },
              {
                name: 'Ogmore',
                value: 3,
              },
              {
                name: 'Pontypridd',
                value: 3,
              },
              {
                name: 'Caerphilly',
                value: 3,
              },
              {
                name: 'Islwyn',
                value: 3,
              },
              {
                name: 'Vale of Glamorgan',
                value: 0,
              },
              {
                name: 'Cardiff West',
                value: 3,
              },
              {
                name: 'Cardiff South and Penarth',
                value: 3,
              },
            ],
            showLegendSymbol: false,
            name: '',
            tooltip: {
              formatter: '{b}',
            },
            label: {
              emphasis: {
                show: false,
              },
            },
            mapType: 'UK_electoral_2016',
            nameMap: {
              N06000012: 'North Antrim',
              N06000013: 'North Down',
              E14001002: 'Tottenham',
              E14000656: 'Croydon South',
              W07000058: 'Aberconwy',
              E14000657: 'Dagenham and Rainham',
              W07000056: 'Newport West',
              W07000057: 'Arfon',
              W07000054: 'Monmouth',
              E14000932: 'Somerton and Frome',
              W07000052: 'Rhondda',
              E14000654: 'Croydon Central',
              W07000050: 'Cardiff Central',
              S14000015: 'Dundee East',
              E14000601: 'Bristol South',
              E14000600: 'Bristol North West',
              E14000603: 'Broadland',
              E14000602: 'Bristol West',
              E14000605: 'Bromsgrove',
              E14000604: 'Bromley and Chislehurst',
              E14000539: 'Banbury',
              E14000538: 'Aylesbury',
              E14000537: 'Ashton-under-Lyne',
              E14000536: 'Ashford',
              E14000535: 'Ashfield',
              E14000534: 'Arundel and South Downs',
              E14000533: 'Amber Valley',
              E14000532: 'Altrincham and Sale West',
              E14000531: 'Aldridge-Brownhills',
              E14000530: 'Aldershot',
              E14000650: 'Coventry North West',
              E14000960: 'St Albans',
              E14000651: 'Coventry South',
              S14000047: 'Motherwell and Wishaw',
              E14000903: 'Rother Valley',
              S14000016: 'Dundee West',
              S14000017: 'Dunfermline and West Fife',
              E14000971: 'Stockton South',
              S14000028: 'Falkirk',
              S14000014: 'Dumfriesshire, Clydesdale and Tweeddale',
              E14000753: 'Horsham',
              E14000752: 'Hornsey and Wood Green',
              E14000751: 'Hornchurch and Upminster',
              E14000750: 'Holborn and St Pancras',
              E14000757: 'Huntingdon',
              E14000756: 'Huddersfield',
              E14000755: 'Hove',
              E14000754: 'Houghton and Sunderland South',
              S14000042: 'Lanark and Hamilton East',
              S14000012: 'Cumbernauld, Kilsyth and Kirkintilloch East',
              E14000759: 'Ilford North',
              E14000758: 'Hyndburn',
              E14001020: 'Washington and Sunderland West',
              S14000013: 'Dumfries and Galloway',
              E14001035: 'West Worcestershire',
              E14000700: 'Faversham and Mid Kent',
              E14001021: 'Watford',
              E14000858: 'North West Leicestershire',
              E14000859: 'North West Norfolk',
              E14000854: 'North Warwickshire',
              E14000855: 'North West Cambridgeshire',
              E14000856: 'North West Durham',
              E14000857: 'North West Hampshire',
              E14000850: 'North Somerset',
              E14000851: 'North Swindon',
              E14000852: 'North Thanet',
              E14000853: 'North Tyneside',
              E14000915: 'Sedgefield',
              E14000914: 'Scunthorpe',
              E14000698: 'Exeter',
              E14000699: 'Fareham',
              E14000911: 'Salford and Eccles',
              E14000910: 'Saffron Walden',
              E14000913: 'Scarborough and Whitby',
              E14000912: 'Salisbury',
              E14000692: 'Enfield, Southgate',
              E14000693: 'Epping Forest',
              E14000690: 'Eltham',
              E14000691: 'Enfield North',
              E14000696: 'Erith and Thamesmead',
              E14000697: 'Esher and Walton',
              E14000694: 'Epsom and Ewell',
              E14000695: 'Erewash',
              E14000701: 'Feltham and Heston',
              W07000068: 'Brecon and Radnorshire',
              E14000674: 'Ealing Central and Acton',
              W07000059: 'Clwyd West',
              E14000950: 'South West Devon',
              W07000074: 'Ogmore',
              W07000075: 'Pontypridd',
              W07000076: 'Caerphilly',
              W07000077: 'Islwyn',
              W07000070: 'Cynon Valley',
              S14000018: 'East Dunbartonshire',
              E14000988: 'Taunton Deane',
              E14000989: 'Telford',
              E14000986: 'Tamworth',
              E14000987: 'Tatton',
              E14000984: 'Sutton and Cheam',
              E14000985: 'Sutton Coldfield',
              E14000982: 'Sunderland Central',
              E14000983: 'Surrey Heath',
              E14000980: 'Stroud',
              E14000981: 'Suffolk Coastal',
              E14000555: 'Bethnal Green and Bow',
              E14000554: 'Berwick-upon-Tweed',
              E14000557: 'Bexhill and Battle',
              E14000556: 'Beverley and Holderness',
              E14000551: 'Beckenham',
              E14000550: 'Beaconsfield',
              E14000553: 'Bermondsey and Old Southwark',
              E14000552: 'Bedford',
              E14000559: 'Birkenhead',
              E14000558: 'Bexleyheath and Crayford',
              E14000629: 'Chelsea and Fulham',
              E14000628: 'Chelmsford',
              E14000829: 'Newark',
              E14000828: 'New Forest West',
              E14001028: 'Wentworth and Dearne',
              E14001029: 'West Bromwich East',
              S14000021: 'East Renfrewshire',
              E14000821: 'Milton Keynes North',
              E14000820: 'Middlesbrough South and East Cleveland',
              E14000823: 'Mitcham and Morden',
              E14000822: 'Milton Keynes South',
              E14000825: 'Morecambe and Lunesdale',
              E14000824: 'Mole Valley',
              E14000827: 'New Forest East',
              E14000826: 'Morley and Outwood',
              S14000020: 'East Lothian',
              S14000049: 'North East Fife',
              W07000069: 'Neath',
              N06000007: 'Fermanagh and South Tyrone',
              W07000079: 'Cardiff West',
              S14000048: 'North Ayrshire and Arran',
              S14000045: 'Midlothian',
              N06000016: 'Strangford',
              E14000797: 'Loughborough',
              S14000046: 'Moray',
              E14000796: 'Liverpool, West Derby',
              W07000044: 'Wrexham',
              S14000025: 'Edinburgh South West',
              E14000891: 'Redcar',
              S14000058: 'West Aberdeenshire and Kincardine',
              E14000939: 'South Holland and The Deepings',
              E14000938: 'South East Cornwall',
              E14000607: 'Broxtowe',
              E14000933: 'South Basildon and East Thurrock',
              E14000793: 'Liverpool, Riverside',
              E14000931: 'Solihull',
              E14000606: 'Broxbourne',
              E14000937: 'South East Cambridgeshire',
              E14000936: 'South Dorset',
              E14000653: 'Crewe and Nantwich',
              E14000934: 'South Cambridgeshire',
              E14000609: 'Burnley',
              S14000010: 'Central Ayrshire',
              E14000608: 'Buckingham',
              E14000790: 'Leyton and Wanstead',
              E14001046: 'Witney',
              S14000022: 'Edinburgh East',
              E14001047: 'Woking',
              W07000045: 'Llanelli',
              E14001044: 'Wirral West',
              E14001040: 'Wimbledon',
              S14000001: 'Aberdeen North',
              N06000009: 'Lagan Valley',
              E14001041: 'Winchester',
              E14000579: 'Bolton South East',
              E14000578: 'Bolton North East',
              E14000649: 'Coventry North East',
              E14000648: 'Corby',
              E14000928: 'Skipton and Ripon',
              E14000573: 'Blackpool South',
              E14000572: 'Blackpool North and Cleveleys',
              E14000571: 'Blackley and Broughton',
              E14000570: 'Blackburn',
              E14000577: 'Bolsover',
              E14000576: 'Bognor Regis and Littlehampton',
              E14000575: 'Blyth Valley',
              E14000574: 'Blaydon',
              E14000722: 'Halesowen and Rowley Regis',
              E14000723: 'Halifax',
              E14000720: 'Hackney North and Stoke Newington',
              E14000721: 'Hackney South and Shoreditch',
              E14000726: 'Hammersmith',
              E14000727: 'Hampstead and Kilburn',
              E14000724: 'Haltemprice and Howden',
              E14000725: 'Halton',
              E14000728: 'Harborough',
              E14000729: 'Harlow',
              S14000009: 'Caithness, Sutherland and Easter Ross',
              N06000010: 'Mid Ulster',
              E14001000: 'Torridge and West Devon',
              E14001001: 'Totnes',
              E14000961: 'St Austell and Newquay',
              E14000963: 'St Helens South and Whiston',
              E14001004: 'Tunbridge Wells',
              E14000929: 'Sleaford and North Hykeham',
              E14000809: 'Manchester, Withington',
              E14000808: 'Manchester, Gorton',
              E14000807: 'Manchester Central',
              E14000806: 'Maldon',
              E14000805: 'Makerfield',
              E14000675: 'Ealing North',
              E14000803: 'Maidenhead',
              E14000802: 'Macclesfield',
              E14000801: 'Luton South',
              E14000800: 'Luton North',
              E14000731: 'Harrow East',
              N06000014: 'South Antrim',
              E14000730: 'Harrogate and Knaresborough',
              N06000015: 'South Down',
              E14000733: 'Hartlepool',
              E14000948: 'South Thanet',
              E14000898: 'Rochester and Strood',
              E14000899: 'Rochford and Southend East',
              E14000732: 'Harrow West',
              E14000969: 'Stockport',
              E14000890: 'Reading West',
              E14000735: 'Hastings and Rye',
              E14000892: 'Redditch',
              E14000893: 'Reigate',
              E14000894: 'Ribble Valley',
              E14000895: 'Richmond (Yorks)',
              E14000896: 'Richmond Park',
              E14000734: 'Harwich and North Essex',
              W07000071: 'Merthyr Tydfil and Rhymney',
              E14000663: 'Derby South',
              E14000737: 'Hayes and Harlington',
              E14000662: 'Derby North',
              S14000043: 'Linlithgow and East Falkirk',
              E14000736: 'Havant',
              E14000661: 'Denton and Reddish',
              E14000660: 'Daventry',
              E14001027: 'Welwyn Hatfield',
              E14000799: 'Ludlow',
              E14000798: 'Louth and Horncastle',
              E14000624: 'Central Suffolk and North Ipswich',
              E14000667: 'Don Valley',
              E14000795: 'Liverpool, Wavertree',
              E14000794: 'Liverpool, Walton',
              E14000779: 'Leeds North East',
              E14000792: 'Lincoln',
              E14000791: 'Lichfield',
              E14000666: 'Dewsbury',
              E14000930: 'Slough',
              E14000665: 'Devizes',
              E14000664: 'Derbyshire Dales',
              S14000050: 'Ochil and South Perthshire',
              E14000591: 'Brent Central',
              E14000590: 'Braintree',
              E14000593: 'Brentford and Isleworth',
              E14000592: 'Brent North',
              E14000595: 'Bridgwater and West Somerset',
              E14000594: 'Brentwood and Ongar',
              E14000597: 'Brighton, Kemptown',
              E14000596: 'Brigg and Goole',
              E14000599: 'Bristol East',
              E14000598: 'Brighton, Pavilion',
              E14000669: 'Doncaster North',
              E14000668: 'Doncaster Central',
              E14000704: 'Folkestone and Hythe',
              E14000702: 'Filton and Bradley Stoke',
              E14000706: 'Fylde',
              E14000707: 'Gainsborough',
              E14000703: 'Finchley and Golders Green',
              N06000008: 'Foyle',
              S14000027: 'Na h-Eileanan an Iar',
              E14000778: 'Leeds East',
              E14000705: 'Forest of Dean',
              E14000865: 'Nottingham East',
              E14000864: 'Norwich South',
              E14000867: 'Nottingham South',
              E14000839: 'North Dorset',
              E14000861: 'Northampton North',
              E14000860: 'North Wiltshire',
              E14000863: 'Norwich North',
              E14000862: 'Northampton South',
              E14000942: 'South Northamptonshire',
              E14000943: 'South Ribble',
              E14000940: 'South Leicestershire',
              E14000941: 'South Norfolk',
              E14000869: 'Old Bexley and Sidcup',
              E14000868: 'Nuneaton',
              E14000944: 'South Shields',
              E14000945: 'South Staffordshire',
              E14001018: 'Warrington South',
              S14000029: 'Glasgow Central',
              E14001017: 'Warrington North',
              W07000049: 'Aberavon',
              W07000048: 'Swansea East',
              E14000833: 'Newcastle upon Tyne North',
              E14000745: 'Hertsmere',
              E14001043: 'Wirral South',
              W07000047: 'Swansea West',
              W07000046: 'Gower',
              W07000041: 'Ynys Mon',
              E14001015: 'Wantage',
              W07000043: 'Alyn and Deeside',
              W07000042: 'Delyn',
              S14000007: 'Banff and Buchan',
              E14001014: 'Wansbeck',
              N06000018: 'West Tyrone',
              E14001013: 'Walthamstow',
              N06000011: 'Newry and Armagh',
              S14000026: 'Edinburgh West',
              E14001012: 'Walsall South',
              E14001026: 'Wells',
              E14001011: 'Walsall North',
              W07000067: 'Carmarthen East and Dinefwr',
              E14001062: 'York Outer',
              E14000835: 'Newton Abbot',
              S14000038: 'Inverclyde',
              W07000066: 'Carmarthen West and South Pembrokeshire',
              S14000019: 'East Kilbride, Strathaven and Lesmahagow',
              W07000053: 'Torfaen',
              E14001024: 'Weaver Vale',
              E14000995: 'Thurrock',
              E14000916: 'Sefton Central',
              E14000768: 'Kensington',
              E14000769: 'Kettering',
              E14000766: 'Keighley',
              E14000767: 'Kenilworth and Southam',
              E14000764: 'Islington South and Finsbury',
              E14000765: 'Jarrow',
              E14000762: 'Isle of Wight',
              E14000763: 'Islington North',
              E14000760: 'Ilford South',
              E14000761: 'Ipswich',
              E14000849: 'North Shropshire',
              E14000848: 'North Norfolk',
              E14001048: 'Wokingham',
              E14001049: 'Wolverhampton North East',
              E14000843: 'North East Derbyshire',
              E14000842: 'North East Cambridgeshire',
              E14000841: 'North East Bedfordshire',
              E14000840: 'North Durham',
              E14000847: 'North Herefordshire',
              E14000846: 'North East Somerset',
              E14000845: 'North East Hertfordshire',
              E14000844: 'North East Hampshire',
              E14000689: 'Elmet and Rothwell',
              E14000688: 'Ellesmere Port and Neston',
              E14000962: 'St Helens North',
              E14000866: 'Nottingham North',
              E14000964: 'St Ives',
              E14000965: 'Stafford',
              E14000966: 'Staffordshire Moorlands',
              E14000967: 'Stalybridge and Hyde',
              E14000681: 'East Surrey',
              E14000680: 'East Hampshire',
              E14000683: 'East Yorkshire',
              E14000682: 'East Worthing and Shoreham',
              E14000685: 'Eastleigh',
              E14000684: 'Eastbourne',
              E14000687: 'Edmonton',
              E14000686: 'Eddisbury',
              S14000035: 'Glasgow South West',
              E14001042: 'Windsor',
              E14001060: 'Yeovil',
              E14001010: 'Wallasey',
              E14001025: 'Wellingborough',
              E14000968: 'Stevenage',
              W07000063: 'Montgomeryshire',
              W07000062: 'Clwyd South',
              W07000061: 'Dwyfor Meirionnydd',
              S14000059: 'West Dunbartonshire',
              E14000999: 'Torbay',
              E14000998: 'Tooting',
              W07000065: 'Preseli Pembrokeshire',
              W07000064: 'Ceredigion',
              E14000951: 'South West Hertfordshire',
              E14000994: 'Thornbury and Yate',
              E14000997: 'Tonbridge and Malling',
              E14000996: 'Tiverton and Honiton',
              E14000991: 'The Cotswolds',
              E14000990: 'Tewkesbury',
              E14000993: 'Thirsk and Malton',
              E14000992: 'The Wrekin',
              E14000612: 'Bury South',
              E14000613: 'Bury St Edmunds',
              E14000610: 'Burton',
              E14000611: 'Bury North',
              E14000616: 'Camborne and Redruth',
              E14000617: 'Cambridge',
              E14000614: 'Calder Valley',
              E14000615: 'Camberwell and Peckham',
              S14000052: 'Paisley and Renfrewshire North',
              E14000946: 'South Suffolk',
              E14000618: 'Cannock Chase',
              E14000619: 'Canterbury',
              S14000056: 'Rutherglen and Hamilton West',
              S14000057: 'Stirling',
              S14000054: 'Perth and North Perthshire',
              E14000947: 'South Swindon',
              E14001039: 'Wigan',
              E14001038: 'Weston-Super-Mare',
              E14001009: 'Wakefield',
              S14000011: 'Coatbridge, Chryston and Bellshill',
              E14001031: 'West Dorset',
              E14001030: 'West Bromwich West',
              E14001033: 'West Lancashire',
              E14001032: 'West Ham',
              E14000935: 'South Derbyshire',
              E14001034: 'West Suffolk',
              E14001037: 'Westmorland and Lonsdale',
              E14001036: 'Westminster North',
              S14000051: 'Orkney and Shetland',
              E14001022: 'Waveney',
              E14000744: 'Hertford and Stortford',
              E14000645: 'Colne Valley',
              E14000746: 'Hexham',
              E14000747: 'Heywood and Middleton',
              E14000740: 'Hemsworth',
              E14000741: 'Hendon',
              E14000742: 'Henley',
              E14000644: 'Colchester',
              S14000055: 'Ross, Skye and Lochaber',
              E14000748: 'High Peak',
              E14000647: 'Copeland',
              E14000646: 'Congleton',
              E14000641: 'City of Durham',
              E14000655: 'Croydon North',
              W07000073: 'Bridgend',
              E14000917: 'Selby and Ainsty',
              E14000640: 'City of Chester',
              E14000906: 'Ruislip, Northwood and Pinner',
              E14000907: 'Runnymede and Weybridge',
              E14000904: 'Rotherham',
              E14000905: 'Rugby',
              E14000902: 'Rossendale and Darwen',
              E14000643: 'Cleethorpes',
              E14000900: 'Romford',
              E14000901: 'Romsey and Southampton North',
              E14000804: 'Maidstone and The Weald',
              E14000642: 'Clacton',
              E14000923: 'Sheffield, Heeley',
              E14000908: 'Rushcliffe',
              E14000909: 'Rutland and Melton',
              S14000005: 'Argyll and Bute',
              E14001016: 'Warley',
              E14000652: 'Crawley',
              S14000004: 'Angus',
              S14000037: 'Gordon',
              E14000638: 'Christchurch',
              E14000639: 'Cities of London and Westminster',
              E14000884: 'Portsmouth South',
              E14000630: 'Cheltenham',
              E14000631: 'Chesham and Amersham',
              E14000632: 'Chesterfield',
              E14000633: 'Chichester',
              E14000634: 'Chingford and Woodford Green',
              E14000635: 'Chippenham',
              E14000636: 'Chipping Barnet',
              E14000637: 'Chorley',
              E14000546: 'Bassetlaw',
              E14000547: 'Bath',
              E14000544: 'Basildon and Billericay',
              E14000545: 'Basingstoke',
              E14000542: 'Barnsley East',
              E14000543: 'Barrow and Furness',
              E14000540: 'Barking',
              E14000541: 'Barnsley Central',
              E14000739: 'Hemel Hempstead',
              E14000738: 'Hazel Grove',
              S14000002: 'Aberdeen South',
              S14000030: 'Glasgow East',
              E14000676: 'Ealing, Southall',
              E14000548: 'Batley and Spen',
              E14000549: 'Battersea',
              W07000055: 'Newport East',
              E14000838: 'North Devon',
              E14000677: 'Easington',
              E14001019: 'Warwick and Leamington',
              E14000925: 'Shipley',
              E14000832: 'Newcastle upon Tyne East',
              E14000670: 'Dover',
              E14000830: 'Newbury',
              E14000831: 'Newcastle upon Tyne Central',
              E14000836: 'Normanton, Pontefract and Castleford',
              E14000837: 'North Cornwall',
              E14000834: 'Newcastle-under-Lyme',
              E14000671: 'Dudley North',
              E14000672: 'Dudley South',
              S14000053: 'Paisley and Renfrewshire South',
              S14000006: 'Ayr, Carrick and Cumnock',
              S14000031: 'Glasgow North',
              E14000673: 'Dulwich and West Norwood',
              S14000008: 'Berwickshire, Roxburgh and Selkirk',
              S14000034: 'Glasgow South',
              E14000922: 'Sheffield, Hallam',
              N06000005: 'East Antrim',
              E14000774: 'Kingswood',
              E14000888: 'Rayleigh and Wickford',
              E14000777: 'Leeds Central',
              N06000002: 'Belfast North',
              E14000887: 'Putney',
              E14000886: 'Pudsey',
              E14000885: 'Preston',
              E14000776: 'Lancaster and Fleetwood',
              E14000883: 'Portsmouth North',
              E14000882: 'Poplar and Limehouse',
              E14000881: 'Poole',
              E14000880: 'Plymouth, Sutton and Devonport',
              E14000924: 'Sherwood',
              E14000771: 'Kingston upon Hull East',
              E14000926: 'Shrewsbury and Atcham',
              E14000927: 'Sittingbourne and Sheppey',
              E14000920: 'Sheffield South East',
              E14000921: 'Sheffield, Brightside and Hillsborough',
              E14000889: 'Reading East',
              E14000770: 'Kingston and Surbiton',
              E14000919: 'Sheffield Central',
              E14001003: 'Truro and Falmouth',
              S14000032: 'Glasgow North East',
              S14000024: 'Edinburgh South',
              E14000772: 'Kingston upon Hull North',
              E14000812: 'Meriden',
              E14001005: 'Twickenham',
              E14001006: 'Tynemouth',
              S14000033: 'Glasgow North West',
              S14000023: 'Edinburgh North and Leith',
              E14001007: 'Uxbridge and South Ruislip',
              E14000918: 'Sevenoaks',
              E14001008: 'Vauxhall',
              E14001058: 'Wyre Forest',
              E14000568: 'Birmingham, Yardley',
              E14000569: 'Bishop Auckland',
              E14000658: 'Darlington',
              E14000659: 'Dartford',
              E14000564: 'Birmingham, Ladywood',
              E14000565: 'Birmingham, Northfield',
              E14000566: 'Birmingham, Perry Barr',
              E14000567: 'Birmingham, Selly Oak',
              E14000560: 'Birmingham, Edgbaston',
              E14000561: 'Birmingham, Erdington',
              E14000562: 'Birmingham, Hall Green',
              E14000563: 'Birmingham, Hodge Hill',
              E14000717: 'Great Yarmouth',
              E14000716: 'Great Grimsby',
              E14000715: 'Gravesham',
              E14000714: 'Grantham and Stamford',
              E14000713: 'Gosport',
              E14000712: 'Gloucester',
              E14000711: 'Gillingham and Rainham',
              E14000710: 'Gedling',
              W07000051: 'Cardiff North',
              S14000040: 'Kilmarnock and Loudoun',
              E14000719: 'Guildford',
              E14000718: 'Greenwich and Woolwich',
              E14000810: 'Mansfield',
              E14000811: 'Meon Valley',
              E14000708: 'Garston and Halewood',
              E14000813: 'Mid Bedfordshire',
              E14000814: 'Mid Derbyshire',
              E14000815: 'Mid Dorset and North Poole',
              E14000816: 'Mid Norfolk',
              E14000817: 'Mid Sussex',
              E14000818: 'Mid Worcestershire',
              E14000819: 'Middlesbrough',
              E14000953: 'South West Surrey',
              E14000952: 'South West Norfolk',
              E14000955: 'Southampton, Itchen',
              E14000954: 'South West Wiltshire',
              E14000957: 'Southend West',
              E14000956: 'Southampton, Test',
              E14000959: 'Spelthorne',
              E14001050: 'Wolverhampton South East',
              W07000072: 'Blaenau Gwent',
              E14000743: 'Hereford and South Herefordshire',
              S14000041: 'Kirkcaldy and Cowdenbeath',
              E14000709: 'Gateshead',
              W07000060: 'Vale of Clwyd',
              S14000036: 'Glenrothes',
              E14001051: 'Wolverhampton South West',
              N06000006: 'East Londonderry',
              S14000003: 'Airdrie and Shotts',
              W07000080: 'Cardiff South and Penarth',
              E14000958: 'Southport',
              N06000001: 'Belfast East',
              E14001061: 'York Central',
              S14000044: 'Livingston',
              S14000039: 'Inverness, Nairn, Badenoch and Strathspey',
              W07000078: 'Vale of Glamorgan',
              E14001023: 'Wealden',
              N06000003: 'Belfast South',
              E14000749: 'Hitchin and Harpenden',
              E14000780: 'Leeds North West',
              E14000781: 'Leeds West',
              E14000782: 'Leicester East',
              E14000783: 'Leicester South',
              E14000784: 'Leicester West',
              E14000785: 'Leigh',
              E14000786: 'Lewes',
              E14000787: 'Lewisham East',
              E14000788: 'Lewisham West and Penge',
              E14000789: 'Lewisham, Deptford',
              E14001045: 'Witham',
              N06000004: 'Belfast West',
              E14000627: 'Cheadle',
              E14000979: 'Stretford and Urmston',
              N06000017: 'Upper Bann',
              E14000626: 'Chatham and Aylesford',
              E14000949: 'South West Bedfordshire',
              E14000978: 'Streatham',
              E14000625: 'Charnwood',
              E14000582: 'Boston and Skegness',
              E14000583: 'Bosworth',
              E14000580: 'Bolton West',
              E14000581: 'Bootle',
              E14000586: 'Bracknell',
              E14000587: 'Bradford East',
              E14000584: 'Bournemouth East',
              E14000585: 'Bournemouth West',
              E14000775: 'Knowsley',
              E14000623: 'Central Devon',
              E14000588: 'Bradford South',
              E14000589: 'Bradford West',
              E14000678: 'East Devon',
              E14000679: 'East Ham',
              E14000773: 'Kingston upon Hull West and Hessle',
              E14000622: 'Castle Point',
              E14001059: 'Wythenshawe and Sale East',
              E14000974: 'Stoke-on-Trent South',
              E14000621: 'Carshalton and Wallington',
              E14001053: 'Workington',
              E14001052: 'Worcester',
              E14000897: 'Rochdale',
              E14000620: 'Carlisle',
              E14001057: 'Wyre and Preston North',
              E14001056: 'Wycombe',
              E14001055: 'Worthing West',
              E14001054: 'Worsley and Eccles South',
              E14000876: 'Penistone and Stocksbridge',
              E14000877: 'Penrith and The Border',
              E14000874: 'Oxford West and Abingdon',
              E14000875: 'Pendle',
              E14000872: 'Orpington',
              E14000873: 'Oxford East',
              E14000870: 'Oldham East and Saddleworth',
              E14000871: 'Oldham West and Royton',
              E14000977: 'Stratford-on-Avon',
              E14000976: 'Stourbridge',
              E14000975: 'Stone',
              E14000970: 'Stockton North',
              E14000973: 'Stoke-on-Trent North',
              E14000972: 'Stoke-on-Trent Central',
              E14000878: 'Peterborough',
              E14000879: 'Plymouth, Moor View',
            },
            roam: true,
            type: 'map',
          },
        ],
        toolbox: {
          show: false,
        },
        legend: [
          {
            textStyle: {
              color: '#333',
              fontSize: 12,
            },
            show: true,
            top: 'top',
            data: [
              '',
            ],
            orient: 'horizontal',
            selectedMode: 'multiple',
            left: 'center',
          },
        ],
        tooltip: {
          borderColor: 'black',
          axisPointer: {
            type: 'line',
          },
          textStyle: {
            color: '#000000',
            fontSize: 14,
          },
          trigger: 'item',
          borderWidth: 1,
          backgroundColor: 'white',
          formatter: null,
          triggerOn: 'mousemove|click',
        },
        visualMap: {
          text: [
            'Legend',
          ],
          pieces: [
            {
              max: 0.1,
              label: 'Less than £10,000',
              min: 0,
            },
            {
              max: 1.1,
              label: '£10,000-£14,999',
              min: 1,
            },
            {
              max: 2.1,
              label: '£15,000-£19,999',
              min: 2,
            },
            {
              max: 3.1,
              label: '£20,000-£24,999',
              min: 3,
            },
            {
              max: 4.1,
              label: '£25,000-£29,999',
              min: 4,
            },
            {
              max: 5.1,
              label: '£30,000-£34,999',
              min: 5,
            },
            {
              max: 6.1,
              label: '£35,000-£39,999',
              min: 6,
            },
            {
              max: 7.1,
              label: '£40,000+',
              min: 7,
            },
            {
              max: 8.1,
              label: 'Other delete it later!',
              min: 8,
            },
          ],
          splitNumber: 5,
          calculable: true,
          orient: 'vertical',
          textStyle: {
            color: [
              'black',
            ],
          },
          min: 0,
          top: 'bottom',
          showLabel: true,
          max: 1,
          inRange: {
            color: [
              '#0E5EBD',
              '#45a86d',
              '#dc5006',
              '#e5000e',
              '#b0002f',
              '#136326',
              '#f4d614',
              'gray',
              '#094428',
            ],
          },
          type: 'piecewise',
          dimension: null,
          left: 'left',
        },
      };

      renderChartToTarget(this.graphTarget1, option);
    });
  }

  getImageDataForActiveGraph() {
    let $parent = $('#' + this.state.panel1ID);

    if (!$parent.hasClass('active')) {
      $parent = $('#' + this.state.panel2ID);
    }

    const $canvas = $parent.find('canvas');

    if ($canvas.length === 1) {
      return $canvas[0].toDataURL('image/png');
    }

    console.log('handle error TODO');
    return null;
  }

  clickGraph() {
    setTimeout(() => { redrawCharts(); }, 200);
  }

  download(e) {
    e.preventDefault();

    const image = this.getImageDataForActiveGraph().replace('image/png', 'image/octet-stream');

    const cleanTitle = this.props.title.replace(/\W+/g, '_');

    this.downloadLink.setAttribute('download', cleanTitle + '.png');
    this.downloadLink.setAttribute('href', image);
    this.downloadLink.click();
  }

  pin(e) {
    e.preventDefault();

    this.props.reduxAction_doUpdate('pins', this.props.globalID, {
      title: this.props.title,
      imageData: this.getImageDataForActiveGraph(),
    });
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-control">
            <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
          </div>
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="collapse in">
          <div className="panel-body" id={this.state.panel1ID}>
            <div className="pad-all">
              <div
                className="echarts-graph"
                style={{ width: '100%', height: '1000px' }}
                ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
              />
            </div>
          </div>

          <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
        </div>
      </div>
    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Graph.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

