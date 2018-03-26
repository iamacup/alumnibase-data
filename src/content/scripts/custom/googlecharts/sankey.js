
export default function drawSankeyChart(columns, rows) {
  const colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
    '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

  const options = {
    height: '100%',
    sankey: {
      node: {
        colors,
      },
      link: {
        colorMode: 'gradient',
        colors,
      },
    },
  };

  return {
    load: [
      'current',
      { packages: ['sankey'] },
    ],
    drawCallback: (targetDiv) => {
      $(() => {
        const { google } = window;

        const data = new google.visualization.DataTable();
        columns.map(column => data.addColumn(column[0], column[1]));
        data.addRows(rows);

        const chart = new google.visualization.Sankey(targetDiv);
        chart.draw(data, options);
      });
    },
  };
}
