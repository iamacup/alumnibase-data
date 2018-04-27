const drawNewPieChart = (data, label, chart, toggle) => {
  // data sould be in the form [{name: 'string', data: []}]
  // label is a boolean, true is for arrow labels and false is for coloured boxes
  // chart is a string, "pie" or "doughnut"
  // toggle is a boolean, only valid when !label, alignment set to true true is for horizontal labels

  let dataToggle = data.map(obj => obj.name);
  let radius = '55%';
  let alignment = ['vertical', 'right', 'center'];

  if (!toggle) alignment = ['horizontal', 'center', 'top'];
  if (label) dataToggle = [];
  if (chart !== 'pie') radius = ['30%', '55%'];

  const colors = ['#1d2951', '#0e4d92', '#3c516d', '#7285a5', '#4682b4', '#588bae', '#89cff0', '#6593f5'];
  // const colors = ['#11293b', '#235175', '#2f6d9d', '#3a88c4', '#62a0d0'];

  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
    },
    legend: { // clickable icons at the top
      data: dataToggle,
      orient: alignment[0],
      x: alignment[1],
      y: alignment[2],
    },
    series: [
      {
        type: 'pie',
        radius,
        labelLine: {
          normal: {
            show: label,
          },
        },
        label: {
          normal: {
            show: label,
          },
        },
        itemStyle: {
          normal: { // lines between each item
            borderWidth: 4,
            borderColor: '#ffffff',
          },
        },
        data: data.map((obj, i) => ({
          value: obj.value,
          name: obj.name,
          itemStyle: {
            normal: {
              color: colors[i],
            },
          },
        })),
      },
    ],
  };

  return options;
};

export default drawNewPieChart;
