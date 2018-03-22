const colourScheme = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'];

const drawNewBarChart = (axisData, dataArray) => {
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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
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
};

export default drawNewBarChart;
