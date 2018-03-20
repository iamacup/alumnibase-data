// import { currencyFormatter } from './utilities';

import { isNumeric, nFormatter } from '../../../../content/scripts/custom/utilities';

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
