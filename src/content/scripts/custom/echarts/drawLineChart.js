export function drawLineChart(data, xLabel, yLabel) {
  // data sould be in the form [{age: [], plotted: []}]

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
