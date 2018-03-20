import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { drawNewPieChart } from '../../../scripts/custom/echarts/drawPieChart';
import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, whenLoaded } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Chart extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const label = false;
    const chart = 'pie';

    const data = [
      { name: 'Searching Engine', value: 400, color: '#11293b' },
      { name: 'Direct', value: 335, color: '#235175' },
      { name: 'Email', value: 310, color: '#2f6d9d' },
      { name: 'Alliance Advertisement', value: 274, color: '#3a88c4' },
      { name: 'Video Advertisement', value: 235, color: '#62a0d0' },
    ];


    $(() => {
      // draw out the graphs
      renderChartToTarget(this.graphTarget1, drawNewPieChart(data, label, chart, 'alignment'));

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
      <div>
        <div
          className="echarts-graph"
          style={{ width: '500px', height: '200px' }}
          ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
        />
      </div>
    );
  }
}

// Chart.propTypes = {
//   globalID: PropTypes.string.isRequired,
//   reduxAction_doUpdate: PropTypes.func,
// };

// Chart.defaultProps = {
//   reduxAction_doUpdate: () => {},
// };

// const mapStateToProps = null;

// const mapDispatchToProps = dispatch => ({
//   reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Chart);
export default Chart;
