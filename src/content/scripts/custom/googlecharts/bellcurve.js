
export default function drawBellcurveChart() {
  const options = {
    curveType: 'function',
    lineWidth: 4,
    legend: 'none',
    tooltip: { trigger: 'focus' },
  };

  const string = 'opacity: 1; + color: #a6cee3; + stroke-color: #1c6cab;';

  return {
    load: [
      'current',
      { packages: ['corechart'] },
    ],
    drawCallback: (targetDiv) => {
      const { google } = window;

      const data = new google.visualization.DataTable();
      data.addColumn('number', 'Salary');
      data.addColumn('number', 'People');
      data.addColumn({ type: 'boolean', role: 'scope' });
      data.addColumn({ type: 'string', role: 'style' });
      data.addRows([
        [10000, 130, false, string],
        [20000, 329, false, string],
        [30000, 931, true, string],
        [40000, 300, false, string],
        [50000, 100, false, string],
      ]);

      function createLine(x1, y1, x2, y2, color, w) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', w);
        return line;
      }

      function drawVAxisLine(chart, value) {
        const layout = chart.getChartLayoutInterface();
        const chartArea = layout.getChartAreaBoundingBox();

        const svg = chart.getContainer().getElementsByTagName('svg')[0];
        const xLoc = layout.getXLocation(value);
        svg.appendChild(createLine(xLoc, chartArea.top + chartArea.height, xLoc, chartArea.top, '#a4c0e5', 4)); // axis line
      }

      const chart = new google.visualization.LineChart(targetDiv);
      chart.draw(data, options);
      drawVAxisLine(chart, 30000);
    },
  };
}
