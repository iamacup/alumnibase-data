const drawGroupedBarChart = (titles, data, direction, value) => {
    // data sould be in the form {x: [1, 2, 3], y: '%'}
  // direction is which way the axis should be: horizontal or vertical;
  // value is the axis value, ie "%" || "£";
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

export default drawGroupedBarChart;