const drawScatterGraph = (data) => {
  // const color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];

  const option = {
    xAxis: {},
    yAxis: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: '{b0}: {c0}<br />{b1}: {c1}',
    },
    series: [{
      symbolSize: 20,
      data,
      type: 'scatter',
    }],
  };

  return option;
};

export default drawScatterGraph;
