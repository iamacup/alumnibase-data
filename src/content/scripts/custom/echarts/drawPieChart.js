export function drawNewPieChart(data, label, chart, toggle) {
  let dataToggle = data.map(obj => obj.name);
  let radius = '55%';
  let alignment = ['vertical', 'right', 'center'];

  if (!toggle) alignment = ['horizontal', 'center', 'top'];
  if (label) dataToggle = [];
  if (chart !== 'pie') radius = ['30%', '55%'];

  const colors = ['#11293b', '#235175', '#2f6d9d', '#3a88c4', '#62a0d0'];
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
}
