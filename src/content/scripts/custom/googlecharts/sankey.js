import { dNc } from '../../../../content/scripts/custom/utilities';

export default function drawSankeyChart(columns, rows, totals) {
  const colors = ['#2f6d9d', '#54aece', '#66cbf0', '#9fb743', '#62a0d0'];

  const options = {
    height: '100%',
    allowHtml: 'true',
    tooltip: { isHtml: true },
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

  const finalRow = rows.map((row) => {
    let percentage = 0;
    if (dNc(totals)) {
      percentage = (row[2] / totals[row[0]]) * 100;
      row.push(`${row[0]} to ${row[1]} Jobs <br /> <strong>%${percentage.toFixed(2)}</strong><br /> <strong>#${row[2]}</strong>`);
    } else row.push(`${row[0]} -> ${row[1]} <br /> <strong>${row[2]}</strong>`);

    return row;
  });

  return {
    load: [
      'current',
      { packages: ['sankey'] },
    ],
    drawCallback: (targetDiv) => {
      const { google } = window;

      const data = new google.visualization.DataTable();
      columns.map(column => data.addColumn(column[0], column[1]));
      data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
      data.addRows(finalRow);

      const chart = new google.visualization.Sankey(targetDiv);
      chart.draw(data, options);
    },
  };
}
