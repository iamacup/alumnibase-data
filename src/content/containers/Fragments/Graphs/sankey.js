import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
  //  columns must be in the format [['string', 'From']]
  //  rows must be in the format [[ 'Brazil', 'Portugal', 5 ], [ 'Brazil', 'France', 1 ],]

    $(() => {
      const google = window.google;

      const colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
        '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

      const options = {
        height: 400,
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
      google.charts.load('current', { packages: ['sankey'] });

      const drawChart = () => {
        const data = new google.visualization.DataTable();
        this.props.columns.map(column => data.addColumn(column[0], column[1]));
        data.addRows(this.props.rows);


        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.Sankey(this.graphTarget1);
        chart.draw(data, options);

        //   // listen for resize events
        fireDebouncedResizeEvents();

        //   // then listen for the events here
        $(document).on('debouncedResizeEvent', () => {
          //     // and redraw the charts
          chart.draw(data, options);
        });
      };

      google.charts.setOnLoadCallback(drawChart);
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
                style={{ width: '100%', height: '400px' }}
                ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
              />
            </div>
          </div>
          <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Chart.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
