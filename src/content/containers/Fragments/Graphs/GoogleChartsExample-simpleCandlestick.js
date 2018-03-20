
/* eslint-disable jsx-a11y/anchor-is-valid, no-undef */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { drawCandlestickChart } from '../../../../content/scripts/custom/echarts/generators';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
    // DO SOMETHING WITH this.props.data which should contain the draw data as an object for the graph to be drawn!!!

    /* const option1 = drawCandlestickChart();

    renderChartToTarget(this.graphTarget1, option1); */

    $(() => {
      google.charts.load('current', { packages: ['corechart'] });

      const drawChart = () => {
        // TODO this should come from props as below
        // const data = google.visualization.arrayToDataTable(this.props.data, true);

        // but for example this is used:

        const inputData = [
          ['Male', 20000, 28000, 38000, 45000],
          ['Female', 31000, 38000, 55000, 66000],
        ];

        const data = google.visualization.arrayToDataTable(inputData, true);

        const options = {
          legend: 'none',
        };

        const chart = new google.visualization.CandlestickChart(this.graphTarget1);

        // draw the chart
        chart.draw(data, options);

        // draw the chart when the window resizes
        $(document).on('debouncedResizeEvent', () => {
          chart.draw(data, options);
        });
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
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body" id={this.state.panel1ID}>
          <div className="pad-all">
            <div
              className="echarts-graph"
              style={{ width: '100%', height: '360px' }}
              ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
            />
          </div>
        </div>

        <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
      </div>


    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
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
