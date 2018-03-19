// import { currencyFormatter } from './utilities';

import { isNumeric, nFormatter } from '../../../../content/scripts/custom/utilities';
import prepareBoxplotData from './dataTool';
import ukData from '../../../../content/containers/Fragments/Graphs/ukData';

function getColourScheme() {
  return [
    '#1c6cab',
    '#a4c0e5',
    '#ff7311',
    '#ffbb7d',
    '#d02224',
    '#ff8d8b',
    '#11293b',
  ];
}

const colourScheme = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'];

const worldColours = {
  northAmerica: '#a7a737', southAmerica: '#86a965', africa: '#de4c4f', europe: '#d8854f', asia: '#eea638', oceania: '#8aabb0',
};


export function drawUKMap(data, pieces) {
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
        data,
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
        nameMap: ukData,
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
      pieces,
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
        color: ['#1c6cab', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'],
      },
      type: 'piecewise',
      dimension: null,
      left: 'left',
    },
  };
  return option;
}

export function drawGroupedBarChart(titles, data, direction, value) {
  const colors = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'];
  let axis = {
    x: [{ type: 'value', axisLabel: { formatter: value + '{value}' } }],
    y: [{ type: 'category', data: titles }],
  };

  if (direction !== 'horizontal') {
    axis = {
      x: [{ type: 'category', data: titles }],
      y: [{ type: 'value', axisLabel: { formatter: value + '{value}' } }],
    };
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: data.map(element => element.name),
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: axis.x,
    yAxis: axis.y,
    series: data.map((element, i) => ({
      name: element.name,
      type: 'bar',
      itemStyle: {
        normal: {
          color: colors[i],
        },
      },
      data: element.data,
    })),
  };

  return option;
}


export function drawBoxplotChart(inData, cats, valueGapMaxMin) {
  // example data for the inputs - note that indata can contain arrays of any length, the boxplot calculation is performed on the data
  /* const inData = [
    [20, 300, 300, 200, 100],
    [30, 400],
    [40, 500],
    [900, 1000],
  ];

  const cats = ['female', 'male', 'other', 'other']; */

  // the valueGapMaxMin is a value that will be added to the maximum and minimum values to provide spacing above and below the box plots

  if (inData.length !== cats.length) {
    console.log('warning - number of categories is not the same as number of data items in drawBoxplotChart');
  }

  let max = 0;
  let min = -1;
  // get the 'max' and 'min' values of the input data

  for (let a = 0; a < inData.length; a++) {
    const maybeMax = Math.max(...inData[a]);
    const maybeMin = Math.min(...inData[a]);

    max = maybeMax > max ? maybeMax : max;
    min = maybeMin < min ? maybeMin : min;

    if (min < 0) {
      min = maybeMin;
    }
  }

  max += valueGapMaxMin;
  min -= valueGapMaxMin;

  // make the formatted data
  const data = [];

  for (let a = 0; a < inData.length; a++) {
    data.push(prepareBoxplotData([inData[a]]));
  }

  // make the series data
  const series = [];

  for (let a = 0; a < cats.length; a++) {
    const formatter = param =>
      [cats[a] + ': ',
        'upper: ' + param.data[5],
        'Q3: ' + param.data[4],
        'median: ' + param.data[3],
        'Q1: ' + param.data[2],
        'lower: ' + param.data[1],
      ].join('<br/>');


    series.push(
      {
        name: cats[a],
        type: 'boxplot',
        data: data[a].boxData,
        tooltip: { formatter },
        itemStyle: {
          normal: {
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: colourScheme[a],
              }],
              globalCoord: false,
            },
            borderWidth: 2,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: colourScheme[a],
              }],
              globalCoord: false,
            },
          },
        },
      },
    );
  }

  const option = {
    legend: {
      y: '10%',
      data: cats,
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '10%',
      top: '20%',
      right: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      data: data[0].axisData,
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: true,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min,
      max,
      splitArea: {
        show: false,
      },
    },
    series,
  };

  return option;
}

export function drawAreaChart(areaData) {
  const xlabel = [];
  for (let i = 20; i < 51; i++) {
    xlabel.push(i);
  }

  const areaColours = ['#2b577e', '#d7d4c5', '#e8912c', '#6f6b51', '#6ca7da', '#e7b93a', '#0e1422'];

  function getSeries(data) {
    const seriesData = [];
    data.forEach((element, i) => {
      const color = areaColours[i];
      const seriesSingle = {
        name: element.name,
        type: 'line',
        stack: 'Stack',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 3,
          },
        },
        itemStyle: {
          normal: {
            color,
          },
        },
        areaStyle: {
          normal: {
            opacity: 1,
          },
        },
        data: element.data,
      };
      seriesData.push(seriesSingle);
    });
    return seriesData;
  }


  const option = {
    legend: {
      data: areaData.map(obj => obj.name),
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xlabel,
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#999',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#999',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#ddd',
        },
      },
    },

    series: getSeries(areaData),
  };
  return option;
}

export function drawNewPieChart(data, label, chart, toggle) {
  let dataToggle = data.map(obj => obj.name);
  let radius = '55%';
  let alignment = ['vertical', 'right', 'center'];

  if (!toggle) alignment = ['horizontal', 'center', 'top'];
  if (label) dataToggle = [];
  if (chart !== 'pie') radius = ['42%', '55%'];

  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
    },
    legend: { // clickable icons at the top
      data: dataToggle,
      orient: alignment[0],
      x: alignment[1],
      y: alignment[2],
    },
    series: [
      {
        type: 'pie',
        radius,
        labelLine: {
          normal: {
            show: label,
          },
        },
        label: {
          normal: {
            show: label,
          },
        },
        itemStyle: {
          normal: { // lines between each item
            borderWidth: 4,
            borderColor: '#ffffff',
          },
        },
        data: data.map(obj => ({
          value: obj.value,
          name: obj.name,
          itemStyle: {
            normal: {
              color: obj.color,
            },
          },
        })),
      },
    ],
  };

  return options;
}

export function drawWorldChart(mapData, type, value) {
  // mapData = the spots on the map.
  // mapData should be in the form  [{code: 'AF', name: 'Afghanistan', value: 32358260, color: 'asia'}]
  let max = -Infinity;
  let min = Infinity;

  // the coordinates to place the spots
  const latlong = {};
  latlong.AD = { latitude: 42.5, longitude: 1.5 };
  latlong.AE = { latitude: 24, longitude: 54 };
  latlong.AF = { latitude: 33, longitude: 65 };
  latlong.AG = { latitude: 17.05, longitude: -61.8 };
  latlong.AI = { latitude: 18.25, longitude: -63.1667 };
  latlong.AL = { latitude: 41, longitude: 20 };
  latlong.AM = { latitude: 40, longitude: 45 };
  latlong.AN = { latitude: 12.25, longitude: -68.75 };
  latlong.AO = { latitude: -12.5, longitude: 18.5 };
  latlong.AP = { latitude: 35, longitude: 105 };
  latlong.AQ = { latitude: -90, longitude: 0 };
  latlong.AR = { latitude: -34, longitude: -64 };
  latlong.AS = { latitude: -14.3333, longitude: -170 };
  latlong.AT = { latitude: 47.3333, longitude: 13.3333 };
  latlong.AU = { latitude: -27, longitude: 133 };
  latlong.AW = { latitude: 12.5, longitude: -69.9667 };
  latlong.AZ = { latitude: 40.5, longitude: 47.5 };
  latlong.BA = { latitude: 44, longitude: 18 };
  latlong.BB = { latitude: 13.1667, longitude: -59.5333 };
  latlong.BD = { latitude: 24, longitude: 90 };
  latlong.BE = { latitude: 50.8333, longitude: 4 };
  latlong.BF = { latitude: 13, longitude: -2 };
  latlong.BG = { latitude: 43, longitude: 25 };
  latlong.BH = { latitude: 26, longitude: 50.55 };
  latlong.BI = { latitude: -3.5, longitude: 30 };
  latlong.BJ = { latitude: 9.5, longitude: 2.25 };
  latlong.BM = { latitude: 32.3333, longitude: -64.75 };
  latlong.BN = { latitude: 4.5, longitude: 114.6667 };
  latlong.BO = { latitude: -17, longitude: -65 };
  latlong.BR = { latitude: -10, longitude: -55 };
  latlong.BS = { latitude: 24.25, longitude: -76 };
  latlong.BT = { latitude: 27.5, longitude: 90.5 };
  latlong.BV = { latitude: -54.4333, longitude: 3.4 };
  latlong.BW = { latitude: -22, longitude: 24 };
  latlong.BY = { latitude: 53, longitude: 28 };
  latlong.BZ = { latitude: 17.25, longitude: -88.75 };
  latlong.CA = { latitude: 54, longitude: -100 };
  latlong.CC = { latitude: -12.5, longitude: 96.8333 };
  latlong.CD = { latitude: 0, longitude: 25 };
  latlong.CF = { latitude: 7, longitude: 21 };
  latlong.CG = { latitude: -1, longitude: 15 };
  latlong.CH = { latitude: 47, longitude: 8 };
  latlong.CI = { latitude: 8, longitude: -5 };
  latlong.CK = { latitude: -21.2333, longitude: -159.7667 };
  latlong.CL = { latitude: -30, longitude: -71 };
  latlong.CM = { latitude: 6, longitude: 12 };
  latlong.CN = { latitude: 35, longitude: 105 };
  latlong.CO = { latitude: 4, longitude: -72 };
  latlong.CR = { latitude: 10, longitude: -84 };
  latlong.CU = { latitude: 21.5, longitude: -80 };
  latlong.CV = { latitude: 16, longitude: -24 };
  latlong.CX = { latitude: -10.5, longitude: 105.6667 };
  latlong.CY = { latitude: 35, longitude: 33 };
  latlong.CZ = { latitude: 49.75, longitude: 15.5 };
  latlong.DE = { latitude: 51, longitude: 9 };
  latlong.DJ = { latitude: 11.5, longitude: 43 };
  latlong.DK = { latitude: 56, longitude: 10 };
  latlong.DM = { latitude: 15.4167, longitude: -61.3333 };
  latlong.DO = { latitude: 19, longitude: -70.6667 };
  latlong.DZ = { latitude: 28, longitude: 3 };
  latlong.EC = { latitude: -2, longitude: -77.5 };
  latlong.EE = { latitude: 59, longitude: 26 };
  latlong.EG = { latitude: 27, longitude: 30 };
  latlong.EH = { latitude: 24.5, longitude: -13 };
  latlong.ER = { latitude: 15, longitude: 39 };
  latlong.ES = { latitude: 40, longitude: -4 };
  latlong.ET = { latitude: 8, longitude: 38 };
  latlong.EU = { latitude: 47, longitude: 8 };
  latlong.FI = { latitude: 62, longitude: 26 };
  latlong.FJ = { latitude: -18, longitude: 175 };
  latlong.FK = { latitude: -51.75, longitude: -59 };
  latlong.FM = { latitude: 6.9167, longitude: 158.25 };
  latlong.FO = { latitude: 62, longitude: -7 };
  latlong.FR = { latitude: 46, longitude: 2 };
  latlong.GA = { latitude: -1, longitude: 11.75 };
  latlong.GB = { latitude: 54, longitude: -2 };
  latlong.GD = { latitude: 12.1167, longitude: -61.6667 };
  latlong.GE = { latitude: 42, longitude: 43.5 };
  latlong.GF = { latitude: 4, longitude: -53 };
  latlong.GH = { latitude: 8, longitude: -2 };
  latlong.GI = { latitude: 36.1833, longitude: -5.3667 };
  latlong.GL = { latitude: 72, longitude: -40 };
  latlong.GM = { latitude: 13.4667, longitude: -16.5667 };
  latlong.GN = { latitude: 11, longitude: -10 };
  latlong.GP = { latitude: 16.25, longitude: -61.5833 };
  latlong.GQ = { latitude: 2, longitude: 10 };
  latlong.GR = { latitude: 39, longitude: 22 };
  latlong.GS = { latitude: -54.5, longitude: -37 };
  latlong.GT = { latitude: 15.5, longitude: -90.25 };
  latlong.GU = { latitude: 13.4667, longitude: 144.7833 };
  latlong.GW = { latitude: 12, longitude: -15 };
  latlong.GY = { latitude: 5, longitude: -59 };
  latlong.HK = { latitude: 22.25, longitude: 114.1667 };
  latlong.HM = { latitude: -53.1, longitude: 72.5167 };
  latlong.HN = { latitude: 15, longitude: -86.5 };
  latlong.HR = { latitude: 45.1667, longitude: 15.5 };
  latlong.HT = { latitude: 19, longitude: -72.4167 };
  latlong.HU = { latitude: 47, longitude: 20 };
  latlong.ID = { latitude: -5, longitude: 120 };
  latlong.IE = { latitude: 53, longitude: -8 };
  latlong.IL = { latitude: 31.5, longitude: 34.75 };
  latlong.IN = { latitude: 20, longitude: 77 };
  latlong.IO = { latitude: -6, longitude: 71.5 };
  latlong.IQ = { latitude: 33, longitude: 44 };
  latlong.IR = { latitude: 32, longitude: 53 };
  latlong.IS = { latitude: 65, longitude: -18 };
  latlong.IT = { latitude: 42.8333, longitude: 12.8333 };
  latlong.JM = { latitude: 18.25, longitude: -77.5 };
  latlong.JO = { latitude: 31, longitude: 36 };
  latlong.JP = { latitude: 36, longitude: 138 };
  latlong.KE = { latitude: 1, longitude: 38 };
  latlong.KG = { latitude: 41, longitude: 75 };
  latlong.KH = { latitude: 13, longitude: 105 };
  latlong.KI = { latitude: 1.4167, longitude: 173 };
  latlong.KM = { latitude: -12.1667, longitude: 44.25 };
  latlong.KN = { latitude: 17.3333, longitude: -62.75 };
  latlong.KP = { latitude: 40, longitude: 127 };
  latlong.KR = { latitude: 37, longitude: 127.5 };
  latlong.KW = { latitude: 29.3375, longitude: 47.6581 };
  latlong.KY = { latitude: 19.5, longitude: -80.5 };
  latlong.KZ = { latitude: 48, longitude: 68 };
  latlong.LA = { latitude: 18, longitude: 105 };
  latlong.LB = { latitude: 33.8333, longitude: 35.8333 };
  latlong.LC = { latitude: 13.8833, longitude: -61.1333 };
  latlong.LI = { latitude: 47.1667, longitude: 9.5333 };
  latlong.LK = { latitude: 7, longitude: 81 };
  latlong.LR = { latitude: 6.5, longitude: -9.5 };
  latlong.LS = { latitude: -29.5, longitude: 28.5 };
  latlong.LT = { latitude: 55, longitude: 24 };
  latlong.LU = { latitude: 49.75, longitude: 6 };
  latlong.LV = { latitude: 57, longitude: 25 };
  latlong.LY = { latitude: 25, longitude: 17 };
  latlong.MA = { latitude: 32, longitude: -5 };
  latlong.MC = { latitude: 43.7333, longitude: 7.4 };
  latlong.MD = { latitude: 47, longitude: 29 };
  latlong.ME = { latitude: 42.5, longitude: 19.4 };
  latlong.MG = { latitude: -20, longitude: 47 };
  latlong.MH = { latitude: 9, longitude: 168 };
  latlong.MK = { latitude: 41.8333, longitude: 22 };
  latlong.ML = { latitude: 17, longitude: -4 };
  latlong.MM = { latitude: 22, longitude: 98 };
  latlong.MN = { latitude: 46, longitude: 105 };
  latlong.MO = { latitude: 22.1667, longitude: 113.55 };
  latlong.MP = { latitude: 15.2, longitude: 145.75 };
  latlong.MQ = { latitude: 14.6667, longitude: -61 };
  latlong.MR = { latitude: 20, longitude: -12 };
  latlong.MS = { latitude: 16.75, longitude: -62.2 };
  latlong.MT = { latitude: 35.8333, longitude: 14.5833 };
  latlong.MU = { latitude: -20.2833, longitude: 57.55 };
  latlong.MV = { latitude: 3.25, longitude: 73 };
  latlong.MW = { latitude: -13.5, longitude: 34 };
  latlong.MX = { latitude: 23, longitude: -102 };
  latlong.MY = { latitude: 2.5, longitude: 112.5 };
  latlong.MZ = { latitude: -18.25, longitude: 35 };
  latlong.NA = { latitude: -22, longitude: 17 };
  latlong.NC = { latitude: -21.5, longitude: 165.5 };
  latlong.NE = { latitude: 16, longitude: 8 };
  latlong.NF = { latitude: -29.0333, longitude: 167.95 };
  latlong.NG = { latitude: 10, longitude: 8 };
  latlong.NI = { latitude: 13, longitude: -85 };
  latlong.NL = { latitude: 52.5, longitude: 5.75 };
  latlong.NO = { latitude: 62, longitude: 10 };
  latlong.NP = { latitude: 28, longitude: 84 };
  latlong.NR = { latitude: -0.5333, longitude: 166.9167 };
  latlong.NU = { latitude: -19.0333, longitude: -169.8667 };
  latlong.NZ = { latitude: -41, longitude: 174 };
  latlong.OM = { latitude: 21, longitude: 57 };
  latlong.PA = { latitude: 9, longitude: -80 };
  latlong.PE = { latitude: -10, longitude: -76 };
  latlong.PF = { latitude: -15, longitude: -140 };
  latlong.PG = { latitude: -6, longitude: 147 };
  latlong.PH = { latitude: 13, longitude: 122 };
  latlong.PK = { latitude: 30, longitude: 70 };
  latlong.PL = { latitude: 52, longitude: 20 };
  latlong.PM = { latitude: 46.8333, longitude: -56.3333 };
  latlong.PR = { latitude: 18.25, longitude: -66.5 };
  latlong.PS = { latitude: 32, longitude: 35.25 };
  latlong.PT = { latitude: 39.5, longitude: -8 };
  latlong.PW = { latitude: 7.5, longitude: 134.5 };
  latlong.PY = { latitude: -23, longitude: -58 };
  latlong.QA = { latitude: 25.5, longitude: 51.25 };
  latlong.RE = { latitude: -21.1, longitude: 55.6 };
  latlong.RO = { latitude: 46, longitude: 25 };
  latlong.RS = { latitude: 44, longitude: 21 };
  latlong.RU = { latitude: 60, longitude: 100 };
  latlong.RW = { latitude: -2, longitude: 30 };
  latlong.SA = { latitude: 25, longitude: 45 };
  latlong.SB = { latitude: -8, longitude: 159 };
  latlong.SC = { latitude: -4.5833, longitude: 55.6667 };
  latlong.SD = { latitude: 15, longitude: 30 };
  latlong.SE = { latitude: 62, longitude: 15 };
  latlong.SG = { latitude: 1.3667, longitude: 103.8 };
  latlong.SH = { latitude: -15.9333, longitude: -5.7 };
  latlong.SI = { latitude: 46, longitude: 15 };
  latlong.SJ = { latitude: 78, longitude: 20 };
  latlong.SK = { latitude: 48.6667, longitude: 19.5 };
  latlong.SL = { latitude: 8.5, longitude: -11.5 };
  latlong.SM = { latitude: 43.7667, longitude: 12.4167 };
  latlong.SN = { latitude: 14, longitude: -14 };
  latlong.SO = { latitude: 10, longitude: 49 };
  latlong.SR = { latitude: 4, longitude: -56 };
  latlong.ST = { latitude: 1, longitude: 7 };
  latlong.SV = { latitude: 13.8333, longitude: -88.9167 };
  latlong.SY = { latitude: 35, longitude: 38 };
  latlong.SZ = { latitude: -26.5, longitude: 31.5 };
  latlong.TC = { latitude: 21.75, longitude: -71.5833 };
  latlong.TD = { latitude: 15, longitude: 19 };
  latlong.TF = { latitude: -43, longitude: 67 };
  latlong.TG = { latitude: 8, longitude: 1.1667 };
  latlong.TH = { latitude: 15, longitude: 100 };
  latlong.TJ = { latitude: 39, longitude: 71 };
  latlong.TK = { latitude: -9, longitude: -172 };
  latlong.TM = { latitude: 40, longitude: 60 };
  latlong.TN = { latitude: 34, longitude: 9 };
  latlong.TO = { latitude: -20, longitude: -175 };
  latlong.TR = { latitude: 39, longitude: 35 };
  latlong.TT = { latitude: 11, longitude: -61 };
  latlong.TV = { latitude: -8, longitude: 178 };
  latlong.TW = { latitude: 23.5, longitude: 121 };
  latlong.TZ = { latitude: -6, longitude: 35 };
  latlong.UA = { latitude: 49, longitude: 32 };
  latlong.UG = { latitude: 1, longitude: 32 };
  latlong.UM = { latitude: 19.2833, longitude: 166.6 };
  latlong.US = { latitude: 38, longitude: -97 };
  latlong.UY = { latitude: -33, longitude: -56 };
  latlong.UZ = { latitude: 41, longitude: 64 };
  latlong.VA = { latitude: 41.9, longitude: 12.45 };
  latlong.VC = { latitude: 13.25, longitude: -61.2 };
  latlong.VE = { latitude: 8, longitude: -66 };
  latlong.VG = { latitude: 18.5, longitude: -64.5 };
  latlong.VI = { latitude: 18.3333, longitude: -64.8333 };
  latlong.VN = { latitude: 16, longitude: 106 };
  latlong.VU = { latitude: -16, longitude: 167 };
  latlong.WF = { latitude: -13.3, longitude: -176.2 };
  latlong.WS = { latitude: -13.5833, longitude: -172.3333 };
  latlong.YE = { latitude: 15, longitude: 48 };
  latlong.YT = { latitude: -12.8333, longitude: 45.1667 };
  latlong.ZA = { latitude: -29, longitude: 24 };
  latlong.ZM = { latitude: -15, longitude: 30 };
  latlong.ZW = { latitude: -20, longitude: 30 };


  const option2 = {
    title: {
      text: 'Where grads come from',
      left: 'center',
      top: 'top',
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        const { name } = params;
        const population = params.data.value[2];
        return name + '<br />' + population + ' ' + value;
      },
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      min: 0,
      max: 1000000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      color: ['orangered', 'yellow', 'lightskyblue'],
    },
    series: [
      {
        name: 'World Population (2010)',
        type: 'map',
        mapType: 'world',
        roam: true,
        itemStyle: {
          emphasis: { label: { show: true } },
        },
        data: mapData.map(itemOpt => ({
          name: itemOpt.name,
          value: [
            latlong[itemOpt.code].longitude,
            latlong[itemOpt.code].latitude,
            itemOpt.value,
          ],
        })),
      }],
  };


  mapData.forEach((itemOpt) => {
    if (itemOpt.value > max) {
      max = itemOpt.value;
    }
    if (itemOpt.value < min) {
      min = itemOpt.value;
    }
  });

  let visualType = {
    show: true, min: 0, max: 10000, calculable: true, color: ['#11293b', '#1c6cab', '#a4c0e5'], text: ['High', 'Low'],
  };

  if (type === 'scatter') {
    visualType = {
      show: false, min: 0, max, inRange: { symbolSize: [6, 60] },
    };
  }

  const options = {
    tooltip: {
      trigger: 'item',
      formatter(params) {
        const { name } = params;
        if (!params.data.value) return name;

        const population = params.data.value[2];
        return name + '<br />' + population + ' ' + value;
      },
    },
    visualMap: visualType,
    geo: {
      type: 'map',
      map: 'world',
      roam: true, // this is the zoom!
      label: {
        emphasis: {
          show: false, // the label of the country
        },
      },
      itemStyle: {
        normal: {
          areaColor: '#d3d3d3', // country colour
          borderColor: '#111',
        },
        emphasis: {
          areaColor: '#d3d3d3',
        },
      },
    },
    series: [
      {
        type,
        mapType: 'world',
        coordinateSystem: 'geo',
        data: mapData.map(itemOpt => ({
          name: itemOpt.name,
          value: [
            latlong[itemOpt.code].longitude,
            latlong[itemOpt.code].latitude,
            itemOpt.value,
          ],
          label: {
            emphasis: {
              position: 'right',
              show: false, // the long number label
            },
          },
          itemStyle: {
            normal: {
              color: worldColours[itemOpt.color],
            },
          },
        })),
      },
    ],
  };
  return options;
}

export function drawLineChart(data, xLabel, yLabel) {
  const colours = [{ gt: 0, lte: 2, color: '#88b7dc' }, { gt: 2, lte: 4, color: '#62a0d0' }, { gt: 4, lte: 6, color: '#3a88c4' }, { gt: 6, lte: 8, color: '#2f6d9d' }, { gt: 8, lte: 10, color: '#235175' }];
  const options = {
    visualMap: [{
      show: false,
      type: 'piecewise',
      seriesIndex: 0,
      pieces: colours,
    }],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
        textStyle: {
          color: '#fff',
        },
      },
    },
    grid: {
      top: 110,
      bottom: 95,
    },
    xAxis: [{
      name: xLabel,
      nameLocation: 'center',
      nameGap: 50,
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#90979c',
        },
      },
      data: data.age,
    }],
    yAxis: [{
      name: yLabel,
      nameLocation: 'center',
      nameGap: 50,
      nameRotate: 90,
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#90979c',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      splitArea: {
        show: false,
      },
    }],
    series: [{
      type: 'line',
      symbolSize: 10,
      symbol: 'circle',
      itemStyle: {
        normal: {
          color: '#235175',
          barBorderRadius: 0,
          label: {
            show: true,
            position: 'top',
            formatter(p) {
              return p.value > 0 ? (p.value) : '';
            },
          },
        },
      },
      data: data.plotted,
    },
    ],
  };
  return options;
}

export function drawNewBarChart(axisData, dataArray) {
  // axisData sould be in the form {x: [1, 2, 3], y: '%'}
  // dataArray sould be in the form [{name: 'string', data: []}]
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: dataArray.map(data => data.name),
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}' + axisData.x,
      },
    },
    yAxis: {
      data: axisData.y,
    },
    series: dataArray.map((data, i) => ({
      name: data.name,
      type: 'bar',
      itemStyle: {
        normal: {
          color: colourScheme[i],
        },
      },
      stack: 'the amount',
      data: data.data,
    })),
  };
  return options;
}

// -------------------------------------------------------------------------------------------------

export function drawComparisonChart(titles, set1Name, set2Name, set1, set2, percentages) {
  let finalSet1 = [];
  let finalSet2 = [];

  if (percentages === true) {
    const preFinalSet1 = [];
    const preFinalSet2 = [];

    for (let a = 0; a < set1.length; a++) {
      const total = set1[a] + set2[a];

      preFinalSet1.push(Math.round((set1[a] / total) * 100));
      preFinalSet2.push(Math.round((set2[a] / total) * 100));
    }

    finalSet1 = {
      1: preFinalSet1,
    };

    finalSet2 = {
      1: preFinalSet2,
    };
  } else {
    finalSet1 = {
      1: set1,
    };

    finalSet2 = {
      1: set2,
    };
  }

  const timeLineData = [1];

  const max1 = finalSet2[1];
  const max2 = finalSet1[1];

  const maxVal = Math.max(Math.max(...max1), Math.max(...max2));

  if (percentages === true) {
    //
  }

  const option = {
    baseOption: {
      backgroundColor: '#fff',
      timeline: {
        show: false,
        axisType: 'category',
        autoPlay: false,
        currentIndex: 0,
        playInterval: 1000,
        label: {
          normal: {
            show: true,
            interval: 'auto',
            formatter: '{value}',
          },
        },
        data: [],
      },
      legend: {
        data: [set1Name, set2Name],
        top: 4,
        left: 4,
        textStyle: {
          color: '#4d627b',
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: '{b}<br/>{a}: {c}',
        axisPointer: {
          type: 'shadow',
        },
      },
      toolbox: {
        right: 20,
        feature: {
          // saveAsImage: {},
          // restore: {},
          // dataView: {},
          /* magicType: {
            type: ['line', 'bar'],
          }, */
        },
      },
      grid: [{
        show: false,
        left: '8%',
        top: 60,
        bottom: 0,
        containLabel: true,
        width: '50%',
      }, {
        show: false,
        left: '51.5%',
        top: 80,
        bottom: 0,
        width: '0%',
      }, {
        show: false,
        right: '8%',
        top: 60,
        bottom: 0,
        containLabel: true,
        width: '50%',
      }],
      xAxis: [
        {
          max: maxVal,
          type: 'value',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'top',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#4d627b',
              fontSize: 12,
            },
            formatter: (value) => {
              if (percentages === true) {
                return value + '%';
              }

              return nFormatter(value, 1);
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#d9e3f0',
              width: 1,
              type: 'solid',
            },
          },
        }, {
          gridIndex: 1,
          show: false,
        }, {
          max: maxVal,
          gridIndex: 2,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'top',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#4d627b',
              fontSize: 12,
            },
            formatter: (value) => {
              if (percentages === true) {
                return value + '%';
              }

              return nFormatter(value, 1);
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#d9e3f0',
              width: 1,
              type: 'solid',
            },
          },
        }],
      yAxis: [{
        // max: 400,
        type: 'category',
        inverse: true,
        position: 'right',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          margin: 8,
          textStyle: {
            color: '#4d627b',
            fontSize: 12,
          },
        },
        data: titles,
      }, {
        gridIndex: 1,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#4d627b',
            fontSize: 12,
          },
        },
        data: titles.map(value => ({
          value,
          textStyle: {
            align: 'center',
          },
        })),
      }, {
        gridIndex: 2,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#4d627b',
            fontSize: 12,
          },
        },
        data: titles,
      }],
      series: [],
    },
    options: [],
  };

  for (let i = 0; i < timeLineData.length; i++) {
    option.baseOption.timeline.data.push(timeLineData[i]);
    option.options.push({
      series: [{
        name: set1Name,
        type: 'bar',
        barGap: 20,
        barWidth: 20,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true,
            position: 'left',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
        },
        itemStyle: {
          normal: {
            color: getColourScheme()[2],
          },
          emphasis: {
            color: '#71586c',
          },
        },
        data: finalSet1[timeLineData[i]],
      },
      {
        name: set2Name,
        type: 'bar',
        barGap: 20,
        barWidth: 20,
        xAxisIndex: 2,
        yAxisIndex: 2,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true,
            position: 'right',
            offset: [0, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
        },
        itemStyle: {
          normal: {
            color: getColourScheme()[1],
          },
          emphasis: {
            color: '#76718e',
          },
        },
        data: finalSet2[timeLineData[i]],
      },
      ],
    });
  }

  return option;
}

// data array should be in the form
/*
  [
    {item: 'string', percent: 23}
  ]
*/
export function drawOptionsResultChart(dataArray) {
  const percentages = [];
  const labels = [];

  dataArray.forEach((value) => {
    percentages.push(value.percent);
    labels.push(value.item);
  });

  percentages.reverse();
  labels.reverse();

  const max = Math.max.apply(null, percentages) / 0.85;

  // for the full labels
  const maxPercentages = [];

  dataArray.forEach(() => {
    maxPercentages.push(max);
  });

  const option = {
    color: ['#944a9c', '#392939'],
    xAxis: {
      type: 'value',
      max,
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: labels,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: -10,
        align: 'left',
        verticalAlign: 'bottom',
        padding: [0, 0, 15, 0],
      },
    },
    series: [
      {
        type: 'bar',
        data: percentages,
        barWidth: 10,
        z: 30,
        label: {
          normal: {
            show: true,
            position: 'left',
            formatter: '{c}%',
          },
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
          },
        },
      },
      {
        type: 'bar',
        data: maxPercentages,
        barWidth: 4,
        barGap: '-70%',
        label: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
          },
        },
      },
    ],
  };

  return option;
}

export function drawSemiCircleChart(
  size,
  bigText,
  smallText,
  lineColor,
  bigTextColor,
  smallTextColor,
  animationDelayOffset,
  fontSize = 35,
) {
  // this is non hidden stuff
  const dataStyle = {
    normal: {
      label: { show: false },
      labelLine: { show: false },
    },
  };

  // this is hidden stuff
  const invisibleSeriesStyle = {
    normal: {
      color: 'rgba(0,0,0,0)',
      label: { show: false },
      labelLine: { show: false },
    },
    emphasis: {
      color: 'rgba(0,0,0,0)',
    },
  };

  const options = {
    title: {
      text: bigText,
      subtext: smallText,
      x: 'center',
      y: 'center',
      itemGap: 0,
      textStyle: {
        color: bigTextColor,
        fontFamily: '"Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif',
        fontSize,
        fontWeight: 'bolder',
      },
      subtextStyle: {
        color: smallTextColor,
        fontFamily: '"Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif',
      },
    },
    color: [lineColor],
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: '1',
        type: 'pie',
        clockWise: false,
        radius: ['90%', '94%'],
        itemStyle: dataStyle,
        data: [
          {
            value: size,
            name: 'data',
          },
          {
            value: 100 - size,
            name: 'invisible',
            itemStyle: invisibleSeriesStyle,
          },
        ],
        animationDelay(idx) {
          return (idx * 50) + animationDelayOffset;
        },
      },
    ],
  };

  return options;
}

export function drawWordCloud(data) {
  require('echarts-wordcloud');

  const options = {
    tooltip: {},
    series: [
      {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: 'pentagon',
        width: '80%',
        height: '70%',
        textStyle: {
          normal: {
            color() {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: data.data,
      },
    ],
  };

  return options;
}

export function drawSalaryNumber(data) {
  return drawSemiCircleChart(
    100,
    '£' + data.number.toLocaleString(),
    '',
    '#9979ad',
    '#9979ad',
    '#777',
    1000,
  );
}

export function drawGroupChart(data) {
  let formatter = new Intl.NumberFormat('en-GB', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (data.useCurrenctFormatter === true) {
    // specify chart configuration item and data
    formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const seriesData = [];

  for (let a = 0; a < data.series.length; a++) {
    const item = {
      name: data.series[a].name,
      type: data.type,
      smooth: true,
      symbolSize: 10,
      data: data.series[a].data,
      animationDelay(idx) {
        // delay for later data is larger
        return (idx * 50) + (500 * (a + 1));
      },
      lineStyle: {
        normal: {
          width: 2.5,
        },
      },
    };

    seriesData.push(item);
  }

  const options = {
    toolbox: {
      show: true,
      top: 'top',
      left: 'right',
      feature: {
        magicType: {
          show: true,
          type: ['line', 'bar'],
          title: {
            line: 'Line Chart',
            bar: 'Bar Chart',
          },
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      align: 'left',
      formatter(params /* , ticket , callback */) {
        if (params.length > 0) {
          let string = '<strong>' + params[0].name + '</strong>';

          for (let i = 0; i < params.length + 1; i++) {
            if (i < params.length) {
              if (isNumeric(params[i].value)) {
                string +=
                  '</br>' +
                  params[i].seriesName +
                  ': ' +
                  formatter.format(params[i].value);
              } else {
                string += '</br>' + params[i].seriesName + ': Unknown';
              }
            } else {
              return string;
            }
          }
        } else {
          return 'No Data Selected';
        }

        return null;
      },
    },
    legend: {
      left: 'center',
      top: 'top',
      padding: [36, 5],
      data: data.labels,
      textStyle: {
        fontSize: 14,
        fontWeight: 'bolder',
      },
    },
    calculable: true,
    xAxis: {
      type: 'category',
      name: data.xAxis.name,
      position: 'bottom',
      nameLocation: 'middle',
      nameGap: 20,
      boundaryGap: true,
      data: data.ranges,
    },
    yAxis: {
      max: null,
      min: null,
      type: 'value',
      axisLabel: {
        formatter: data.yAxisFormatMask,
      },
    },
    color: getColourScheme(),
    series: seriesData,
  };

  return options;
}

/*
@param data
[
  { value: 20, name: 'Male' },
  { value: 80, name: 'Female' },
]
*/
export function drawPieChart(data, showLabels = true) {
  const drawData = data;

  if (showLabels === false) {
    drawData.forEach((item, index) => {
      drawData[index].label = { normal: { show: false } };
      drawData[index].labelLine = {
        normal: { show: false },
        emphasis: { show: false },
      };
    });
  }

  const options = {
    color: ['#735a8b', '#c5bdee'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: 'Gender',
        type: 'pie',
        radius: '75%',
        selectedMode: 'single',
        data: drawData,
      },
    ],
  };

  return options;
}

export function drawBarChart(data) {
  // specify chart configuration item and data
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const options = {
    color: getColourScheme(),
    tooltip: {
      trigger: 'axis',
      align: 'left',
      formatter(params /* , ticket, callback */) {
        if (params.length > 0) {
          let string = '<strong>' + params[0].name + '</strong>';
          for (let i = 0; i < params.length + 1; i++) {
            if (i < params.length) {
              string +=
                '</br>' +
                params[i].seriesName +
                ': ' +
                formatter.format(params[i].value);
            } else return string;
          }
        } else return 'No Data Selected';

        return null;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        interval: 0,
        type: 'category',
        data: data.labels,
        axisTick: {
          alignWithLabel: true,
          interval: 0,
        },
        axisLabel: {
          // rotate: 45,
          // interval: 0
          show: data.xAxis.show,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '£{value}',
        },
      },
    ],
    series: [
      {
        name: data.subject,
        type: 'bar',
        barWidth: '40%',
        data: data.items,
      },
    ],
  };

  return options;
}
