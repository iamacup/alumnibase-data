const drawGroupedBarChart = (titles, data, direction, value, colours) => {
  // data sould be in the form {x: [1, 2, 3], y: '%'}
  // direction is which way the axis should be: horizontal or vertical;
  // value is the axis value, ie "%" || "£";
  let colors = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'];
  if (colours) colors = colours;

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
          color: (params) => {
            if (colors.length === 2 && params.dataIndex < 3) return colors[1];
            return colors[i];
          },
        },
      },
      data: element.data,
    })),
  };

  return option;
};

export default drawGroupedBarChart;
