import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import AreaChart from '../../../../../../content/containers/Fragments/Graphs/areaChart';
import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 4 - Full Time Graduate Destinations',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'DHLE-Like',
          link: '/analytics/dlhe-like',
        },
        {
          name: 'RQ 4 - Full Time Graduate Destinations',
          link: '/analytics/dlhe-like/4',
        }],
    });
          
    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        redrawCharts();
      });

      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">


            <AreaChart
              globalID="area-chart-1"
              data={[
                      { name: 'Full Time Work', data: [11000, 12000, 13000, 14000, 15755, 21625, 23787.5, 26166.25, 28782.875, 31661.1625, 34827.27875, 38310.00662, 42141.00729, 42983.82743, 43843.50398, 44720.37406, 45614.78154, 46527.07717, 47457.61872, 48406.77109, 49374.90651, 50362.40464, 51369.65274, 52397.04579, 53444.98671, 54513.88644, 55604.16417, 56716.24745, 57850.5724, 59007.58385, 60187.73553] },
                      { name: 'Part Time Work', data: [8000, 19500, 20000, 2100, 2115, 3310, 3476, 3649, 3832, 4138.27785, 4469.340078, 4826.887284, 5213.038267, 5630.081328, 6080.487835, 5472.439051, 4925.195146, 4432.675631, 3989.408068, 3590.467261, 3231.420535, 1615.710268, 807.8551338, 403.9275669, 201.9637835, 100.9818917, 50.49094586, 25.24547293, 12.62273647, 6.311368233, 3.155684117] },
                      { name: 'Work and Further Study', data: [714.6980944, 693.881645, 673.6715, 654.05, 635, 870, 878.7, 887.487, 896.36187, 905.3254887, 914.3787436, 923.522531, 932.7577563, 942.0853339, 951.5061872, 961.0212491, 932.1906116, 904.2248933, 877.0981465, 850.7852021, 825.261646, 800.5037966, 776.4886827, 753.1940223, 37.65970111, 30, 29, 20, 18, 10, 11] },
                      { name: 'Further Study', data: [1930, 1930, 1930, 1930, 1930, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                      { name: 'Unemployed', data: [930, 930, 930, 930, 930, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450] },
                      { name: 'Retired', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 110, 121, 133.1, 159.72, 191.664, 229.9968, 275.99616, 358.795008] },
                      { name: 'Other', data: [169.2705, 241.815, 345.45, 493.5, 705, 1100, 1210, 1331, 1464.1, 1610.51, 1771.561, 1948.7171, 2143.58881, 2165.024698, 2186.674945, 2208.541695, 2230.627111, 2252.933383, 2275.462716, 1820.370173, 1456.296139, 1165.036911, 932.0295286, 745.6236229, 596.4988983, 477.1991187, 381.7592949, 305.4074359, 244.3259488, 195.460759, 156.3686072] },
                     ]}
              title="Destinations of Graduates from Full Time Study per age"
            />


          </div>

        </div>

      </div>
    );

    const { location } = this.props;

    return (
      <Wrapper content={content} theLocation={location} />
    );
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
