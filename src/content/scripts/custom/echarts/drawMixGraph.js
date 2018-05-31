const drawMixGraph = (rawData, names, titles, percentChange) => {
  let max = 80000;

  rawData.forEach((element) => {
    element.data.forEach((elem) => {
      if (elem > max) max = elem;
    });
  });

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
    data: percentChange,
  });
  const textstyle = { fontSize: 12 };

  const option = {
    title: [
      {
        text: '% Change',
        x: '7%',
        y: '6%',
        textStyle: textstyle,
      }, {
        text: 'Salary',
        x: '88%',
        y: '6%',
        textStyle: textstyle,
      },
    ],

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
        max,
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
