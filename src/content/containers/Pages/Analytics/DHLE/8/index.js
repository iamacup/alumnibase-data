import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import GroupedBarChart from '../../../../../../content/containers/Fragments/Graphs/groupedBarChart';
import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 8 - Graduates in Employment',
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
          name: 'RQ 8 - Graduates in Employment',
          link: '/analytics/dlhe-like/8',
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
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here. <br /><br />
                These graphs display the gender split in graduates from the UK, for varied employment sectors, split by qualification.<br /><br />
                <strong>Remember</strong> to use the filters above to get a more personalised view of data for you.
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <GroupedBarChart
              title="First Degree Graduates from the UK in work, by type of work and gender"
              smallText="Employment values when all responses are aggregated"
              direction="horizontal"
              value=""
              globalID="grouperdBar-6"
              titles={['Self-employed', 'Starting up own business', 'On a permanent or open-ended contract', 'On a fixed-term contract lasting 12 months or longer', 'On a fixed-term contract lasting less than 12 months', 'Voluntary work', 'On an internship', 'Developing a professional portfolio', 'Temping (including supply teaching', 'On a zero hours contract', 'Other', 'Unknown']}
              data={[
                    { name: 'Other', data: [0, 0, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { name: 'Male', data: [3990, 580, 39450, 10460, 5255, 725, 1980, 460, 1460, 2785, 1135, 540] },
                    { name: 'Female', data: [3530, 415, 59720, 15675, 7985, 1165, 2915, 500, 2520, 3665, 1575, 890] },
                ]}
            />
          </div>
          <div className="col-md-8 col-md-push-2">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./2.png')} />
              </div>

            </div>

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
