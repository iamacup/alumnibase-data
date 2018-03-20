import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { drawNewPieChart } from '../../../scripts/custom/echarts/drawPieChart';
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
    $(() => {
      // draw out the graphs
      renderChartToTarget(this.graphTarget1, drawNewPieChart(this.props.data, this.props.label, this.props.chart, this.props.alignment));

      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        // and redraw the charts
        redrawCharts();
      });
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
                style={{ width: '500px', height: '250px' }}
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
  label: PropTypes.bool.isRequired,
  alignment: PropTypes.bool.isRequired,
  chart: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
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
