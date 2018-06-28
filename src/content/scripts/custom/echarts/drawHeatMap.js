const drawHeatMap = (axisData, graphData) => {
// axisData should be an object { xAxis: [titles], yAxis: [titles]}
// data should be in the format [[how many on the y-axis, how many on the x-axis, the number to fill]]
// let data = [[1, 2, 3], [4, 5, 6], [0, 0, 1], [0, 1, 0], [0, 2, 1]]
  const data = graphData.map(item => [item[1], item[0], item[2] || '-']);

  let max = 10;

  graphData.forEach((arr) => {
    // eslint-disable-next-line prefer-destructuring
    if (arr[2] > max) max = arr[2];
  });


  const option = {
    title: [{
      text: 'Destination',
      x: '80%',
      y: '65%',
    }, {
      text: 'Origin of University',
      x: '0%',
      y: '3%',
    },
    {
      text: 'of Graduates',
      x: '79%',
      y: '70%',
    }],
    tooltip: {
      position: 'top',
      formatter(params) {
        console.log(params);
        return params.name + ' - ' + params.data[2];
      },
    },
    animation: false,
    grid: {
      height: '50%',
      y: '10%',
    },
    xAxis: {
      type: 'category',
      data: axisData.xAxis,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: axisData.yAxis,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [{
      name: 'Punch Card',
      type: 'heatmap',
      data,
      label: {
        normal: {
          show: true,
        },
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }],
  };

  return option;
};

export default drawHeatMap;
