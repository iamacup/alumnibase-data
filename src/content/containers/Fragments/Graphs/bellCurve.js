
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class BellCurve extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }
  componentDidMount() {
    $(() => {
      const { google } = window;
      google.charts.load('current', { packages: ['corechart'] });

      const string = 'opacity: 1; + color: #a6cee3; + stroke-color: #1c6cab;';

      const drawChart = () => {
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


        const options = {
          curveType: 'function',
          lineWidth: 4,
          legend: 'none',
          tooltip: { trigger: 'focus' },
        };
        const chart = new google.visualization.LineChart(this.graphTarget1);
        chart.draw(data, options);
        drawVAxisLine(chart, 30000);
      };
      google.charts.setOnLoadCallback(drawChart);
    });
  }

  getImageDataForActiveGraph() {
    let $parent = $('#' + this.state.panel1ID);

    if (!$parent.hasClass('active')) {
      $parent = $('#' + this.state.panel2ID);
    }

    const $canvas = $parent.find('canvas');

    if ($canvas.length === 1) {
      return $canvas[0].toDataURL('image/png');
    }

    console.log('handle error TODO');
    return null;
  }

  clickGraph() {
    setTimeout(() => { redrawCharts(); }, 200);
  }

  download(e) {
    e.preventDefault();

    const image = this.getImageDataForActiveGraph().replace('image/png', 'image/octet-stream');

    const cleanTitle = this.props.title.replace(/\W+/g, '_');

    this.downloadLink.setAttribute('download', cleanTitle + '.png');
    this.downloadLink.setAttribute('href', image);
    this.downloadLink.click();
  }

  pin(e) {
    e.preventDefault();

    this.props.reduxAction_doUpdate('pins', this.props.globalID, {
      title: this.props.title,
      imageData: this.getImageDataForActiveGraph(),
    });
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-control">
            <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
          </div>
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="collapse in">
          <div className="panel-body" id={this.state.panel1ID}>
            <div className="pad-all">
              <div
                className="echarts-graph"
                style={{ width: '100%', height: '360px' }}
                ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
              />
            </div>
            <div className="text-right" style={{ marginTop: '26px' }}>
              <h5>
                <small>
                      Salary values when all responses are aggregated
                </small>
              </h5>
            </div>
          </div>
          <a href="£" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
        </div>
      </div>
    );
  }
}

BellCurve.propTypes = {
  title: PropTypes.string.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

BellCurve.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BellCurve);
