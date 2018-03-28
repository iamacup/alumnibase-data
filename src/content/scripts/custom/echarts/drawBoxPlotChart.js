import prepareBoxplotData from './dataTool';


const drawBoxplotChart = (inData, cats, valueGapMaxMin, colours) => {
  // example data for the inputs - note that indata can contain arrays of any length, the boxplot calculation is performed on the data
  /* const inData = [
    [20, 300, 300, 200, 100],
    [30, 400],
    [40, 500],
    [900, 1000],
  ];

  const cats = ['female', 'male', 'other', 'other']; */

  // the valueGapMaxMin is a value that will be added to the maximum and minimum values to provide spacing above and below the box plots

  let colourScheme = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b', '#0b6623', '#000'];
  if (colours) colourScheme = colours;

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
      y: '90%',
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
      top: '10%',
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
};

export default drawBoxplotChart;
