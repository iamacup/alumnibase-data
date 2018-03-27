const drawLineChart = (data, options) => {
  // data sould be in the form [{age: [], plotted: []}]
  // options can have value (bool) and trendline (bool)
  let value = false;
  if (options.value !== false) value = true;
  // lineStyle: { normal: { color: '#8e1600', width: 2, type: 'dotted' }}

  const colours = ['#235175', '#62a0d0', '#2f6d9d', '#3a88c4', '#88b7dc'];


  const option = {
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
    xAxis: [{
      name: options.x,
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
      name: options.y,
      nameLocation: 'center',
      nameGap: 50,
      nameRotate: 90,
      type: 'value',
      splitLine: {
        show: true,
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
      // let color = colours[i];
      // if (data.name[i] === "National Average") {
      //   color = '#8e1600'
      // }
      name: data.name[i],
      type: 'line',
      label: { formatter: '{b}: {d}' },
      symbolSize: 15,
      itemStyle: {
        normal: {
          color: colours[i],
          label: {
            show: value,
            position: 'top',
            formatter(p) {
              return p.value > 0 ? (p.value) : '';
            },
          },
        },
      },
      smooth: true,
      data: element,
    })),
  };
  return option;
};

export default drawLineChart;
