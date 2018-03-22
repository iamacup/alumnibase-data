
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { drawAreaChart } from '../../../../content/scripts/custom/echarts/drawAreaChart';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
    $(() => {
      const google = window.google;

      google.charts.load('current', { packages: ['corechart'] });

      const drawChart = () => {
        const data = google.visualization.DataTable();
        data.addColumn('number', this.props.label[0]);
        data.addColumn('number', this.props.label[1]);
        data.addRows(this.props.data);
        // ['under £20,000', 100],
        // ['£20-29,000', 320],
        // ['£30-39,000', 560],
        // ['£40-49,000', 980],
        // ['£50-59,000', 1120],
        // ['£60-69,000', 980],
        // ['£70-79,000', 560],
        // ['£80-89,000', 320],
        // ['£90,000+', 100]


        const options = {
          curveType: 'function',
          legend: { position: 'bottom' },
          trendlines: { 0: {} },
        };

        const chart = new google.visualization.LineChart(this.graphTarget1);

        chart.draw(data, options);
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
          <a href="#" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
        </div>
      </div>
    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Graph.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
