const drawLineChart = (data, xLabel, yLabel) => {
  // data sould be in the form [{age: [], plotted: []}]
  const colours = ['#235175', '#62a0d0', '#2f6d9d', '#3a88c4', '#88b7dc'];
  const options = {
    legend: {
      data: data.name,
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
        textStyle: {
          color: '#000',
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
    series: data.plotted.map((element, i) => ({
      name: data.name[i],
      type: 'line',
      itemStyle: {
        normal: {
          color: colours[i],
          label: {
            show: true,
            position: 'top',
            formatter(p) {
              return p.value > 0 ? (p.value) : '';
            }
          }
        }
      },
      smooth: true,
      data: element,
    }))
  };
  return options;
};

export default drawLineChart;
