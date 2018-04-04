const drawMixGraph = (rawData, names, titles) => {
  const colors = ['#1c6cab', '#a4c0e5', '#ff7311', '#ffbb7d', '#d02224', '#ff8d8b', '#11293b'];
  names.push('% Change');
  const data = rawData.map((element, i) => (
    {
      name: element.name,
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: element.data,
      itemStyle: {
        normal: {
          color: colors[i],
        },
      },
    }
  ));
  data.push({
    name: names[names.length - 1],
    type: 'line',
    data: [100, 112, 122, 150],
  });
  const textstyle = { fontSize: 12 };

  const option = {
    title: [
      {
        text: 'Salary',
        x: '7%',
        y: '5%',
        textStyle: textstyle,
      }, {
        text: '% Change in Salary',
        x: '80%',
        y: '4%',
        textStyle: textstyle,
      },
      {
        text: 'between 1 Year After Graduating',
        x: '75%',
        y: '8%',
        textStyle: textstyle,
      }],

    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: names,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: titles,
      },
      {
        type: 'category',
        boundaryGap: true,
        data: titles,
        show: false,
      },
    ],
    yAxis: [
      {
        type: 'value',
        max: 150,
        min: 0,
        splitLine: {
          show: true,
        },
      },
      {
        type: 'value',
        max: 80000,
        min: 0,
        location: 'center',
        splitLine: {
          show: false,
        },
      },
    ],
    series: data,
  };
  return option;
};

export default drawMixGraph;
