const drawGroupedBarChart = (titles, data, options) => {
  // data sould be in the form {x: [1, 2, 3], y: '%'}
  // direction is which way the axis should be: horizontal or vertical;
  // value is the axis value, ie "%" || "£";
  let colors = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'];

  if (options.colours) colors = options.colours;

  let axis = {
    x: [{ type: 'value', axisLabel: { formatter: options.value + '{value}' } }],
    y: [{ type: 'category', data: titles }],
  };
  let rotation = 0;
  if (options.rotate) rotation = options.rotate;

  if (options.direction !== 'horizontal') {
    axis = {
      x: [{
        type: 'category', data: titles, nameRotate: 180, axisLabel: { rotate: rotation },
      }],
      y: [{ type: 'value', axisLabel: { formatter: options.value + '{value}' } }],
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
