const drawScatterGraph = (data, options) => {
  // const color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
  const textstyle = { fontSize: 12 };
  const option = {
    title: [{
      text: 'Salary',
      x: '47%',
      y: '93%',
    }, {
      text: 'University',
      x: '0%',
      y: '41%',
    },
    {
      text: 'Impact',
      x: '0%',
      y: '47%',
    },
    {
      text: 'on Life',
      x: '0%',
      y: '53%',
    },
    {
      text: 'Positive',
      x: '91%',
      y: '10%',
      textStyle: textstyle,
    },
    {
      text: 'Negative',
      x: '3%',
      y: '80%',
      textStyle: textstyle,
    },
    {
      text: 'Low',
      x: '10%',
      y: '90%',
      textStyle: textstyle,
    },
    {
      text: 'High',
      x: '85%',
      y: '7%',
      textStyle: textstyle,
    }],
    xAxis: {
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      max: options.max + 10000,
      min: -(options.max + 10000), // options.min - 10000,
    },
    yAxis: {
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      max: 10,
      min: -10,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: '{c0}',
    },
    visualMap: {
      show: false,
      min: -10,
      max: 10,
      dimension: 1,
      orient: 'vertical',
      right: 10,
      top: 'center',
      text: ['HIGH', 'LOW'],
      calculable: true,
      inRange: {
        color: ['#f74a4a', '#337a28'],
      },
    },
    series: [{
      symbolSize: 20,
      data,
      type: 'scatter',
      // markLine: {
      //   // 'x = 0.97 * y - 37.16'
      //   lineStyle: {
      //     normal: {
      //       type: 'dashed',
      //     },
      //   },
      //   data: [
      //     [{
      //       coord: [0, 0],
      //       symbol: 'none',
      //     }, {
      //       coord: [1, 2],
      //       symbol: 'none',
      //     }],
      //   ],
      // },
    }],

  };

  return option;
};

export default drawScatterGraph;
