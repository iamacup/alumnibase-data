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
      pageTitle: 'DLHE Requirement 11 - First Time Graduates in full time work',
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
          name: 'RQ 11 - First Time Graduates in full time work',
          link: '/analytics/dlhe-like/11',
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
                These graphs display the gender split in earning by salary band.<br /><br />
                <strong>Remember</strong> to use the filters above to get a more personalised view of data for you.
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="Male /Female Earning by Salary Band"
              smallText="Salary values when all responses are aggregated"
              direction="vertical"
              value=""
              globalID="grouperdBar-7"
              titles={['Less than £15,000', '£15,000-£19,999', '£20,000-£24,999', '£25,000-£29,999', '£30,000-£34,999', '£35,000-£39,999', '£40,000+', 'Unkown']}
              data={[
                    { name: 'Other', data: [0, 0, 0, 0, 0, 0, 0, 5] },
                    { name: 'Male', data: [3590, 9885, 10975, 7725, 3640, 1060, 1100, 14920] },
                    { name: 'Female', data: [6390, 16445, 21145, 7000, 2910, 580, 480, 21425] },
                ]}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <div className="row">
              <div className="col-md-6">

                <div className="panel">
                  <div className="panel-heading">
                    <h3 className="panel-title"> - </h3>
                  </div>
                  <div className="pad-all">
                    <img alt="Graph" className="img-responsive center-block" src={require('./2.png')} />
                  </div>
                </div>

              </div>
              <div className="col-md-6">

                <div className="panel">
                  <div className="panel-heading">
                    <h3 className="panel-title"> - </h3>
                  </div>
                  <div className="pad-all">
                    <img alt="Graph" className="img-responsive center-block" src={require('./3.png')} />
                  </div>

                </div>
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
