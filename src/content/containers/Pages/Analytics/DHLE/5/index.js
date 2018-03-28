import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import GroupedBarChart from '../../../../../../content/containers/Fragments/Graphs/groupedBarChart';
import StackedBarChart from '../../../../../../content/containers/Fragments/Graphs/stackedBarChart';
import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 5 - Destination, Employment and Earnings',
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
          name: 'RQ 5 - Destination, Employment and Earnings',
          link: '/analytics/dlhe-like/5',
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
                <strong>Destinations</strong> of first time graduates, subject specific.<br />
                <strong>Average Earnings</strong> for a full time degree <br />
                <strong>Gender split</strong> on the average full time earnings for a specified degree.<br /><br />
                <strong>Remember</strong> to use the filters above to get a more personalised view of data for you.
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <StackedBarChart
              title="Sciences High Level Destinations entered by First Time Graduates"
              titles={['Medicine & dentistry', 'Subjects allied to medicine', 'Biological sciences', 'Veterinary science', 'Agriculture & related subjects', 'Physical sciences', 'Mathmatical sciences', 'Computer science', 'Engineering & technology', 'Architecture, building & planning', 'Total - Science subject areas']}
              globalID="stacked-bar-1"
              data={[
                    { name: 'Full-time work', data: [91.9, 77.9, 41.4, 92.4, 58.1, 43.7, 49.9, 63.7, 62, 70.1, 60.7] },
                    { name: 'Part-time work', data: [0.8, 7.1, 15, 1.9, 12.1, 9.8, 7.8, 10.1, 8, 7.2, 9.5] },
                    { name: 'Work and further study', data: [1.6, 3.2, 7.6, 1, 5.2, 4.8, 5.8, 2.5, 2.8, 4.7, 4.5] },
                    { name: 'Further study', data: [4.8, 7.4, 26.1, 1.3, 12.8, 29.9, 23.6, 10.4, 15.4, 8.5, 16.6] },
                    { name: 'Unemployed', data: [0.3, 2.1, 5.1, 1.7, 4.8, 6.8, 7.4, 9.7, 7.5, 5.8, 5] },
                    { name: 'Other', data: [0.6, 2.2, 4.8, 1.7, 7, 5.1, 5.4, 3.5, 4.4, 3.8, 3.8] },
                    ]}
            />
          </div>
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="Average Full Time Earnings"
              smallText="Salary values when all responses are aggregated"
              value="£"
              direction="horizontal"
              globalID="grouperdBar-1"
              titles={['Medicine & dentistry', 'Subjects allied to medicine', 'Biological sciences', 'Vetenary science', 'Agriculture & related subjects', 'Physical sciences', 'Mathmatical sciences', 'Computer science', 'Engineering & technology', 'Architecture, building & planning']}
              data={[
                { data: [42000, 40000, 34000, 41000, 34000, 36000, 43000, 40000, 39000, 35000] },
                ]}
            />

          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="Male /Female Full Time Earnings by First Degree Graduates - Science"
              smallText="Salary values when all responses are aggregated"
              value="£"
              titles={['Medicine & dentistry', 'Subjects allied to medicine', 'Biological sciences', 'Vetenary science', 'Agriculture & related subjects', 'Physical sciences', 'Mathmatical sciences', 'Computer science', 'Engineering & technology', 'Architecture, building & planning']}
              data={[
                  { name: 'Male', data: [46200, 44000, 37400, 45100, 37400, 39600, 47300, 44000, 42900, 38500] },
                  { name: 'Female', data: [37800, 36000, 30600, 36900, 30600, 32400, 38700, 36000, 35100, 31500] },
                    ]}
              direction="horizontal"
              globalID="grouperdBar-2"
            />
          </div>
          <div className="col-md-8 col-md-push-2">
            <StackedBarChart
              title="Non-Science High Level Destinations by First Time Graduates"
              titles={['Social studies', 'Law', 'Business & administrative studies', 'Mass communications & documentation', 'Languages', 'Historical & philosophical studies', 'Creative arts & design', 'Education', 'Combined']}
              globalID="stacked-bar-2"
              data={[
                    { name: 'Full-time work', data: [51.7, 40.0, 63.8, 54.7, 44.9, 40.9, 50.4, 61.3, 46.7] },
                    { name: 'Part-time work', data: [12.7, 8.6, 10.3, 20.4, 13.3, 12.7, 25.1, 12.7, 11.4] },
                    { name: 'Work and further study', data: [6.1, 10.5, 5.6, 3.6, 6.7, 7.0, 4.0, 4.1, 6.8] },
                    { name: 'Further study', data: [17.6, 31.7, 9, 8.7, 23.9, 27.1, 10, 15.9, 21.6] },
                    { name: 'Unemployed', data: [6.2, 4.8, 6.1, 7.8, 6, 6.3, 6.2, 2.6, 4.3] },
                    { name: 'Other', data: [5.8, 4.5, 5.2, 4.7, 5.2, 6.1, 4.3, 3.4, 9.1] },
                    ]}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="Average Full Time Earnings"
              smallText="Salary values when all responses are aggregated"
              direction="horizontal"
              value="£"
              globalID="grouperdBar-3"
              titles={['Social studies', 'Law', 'Business & administrative studies', 'Mass communications & documentation', 'Languages', 'Historical & philosophical studies', 'Creative arts & design', 'Education', 'Combined']}
              data={[
                    { data: [27000, 39000, 30000, 29000, 21000, 25000, 19000, 21000, 29000] },
                ]}
            />
          </div>
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="Male /Female Full Time Earnings by First Degree Graduates - Non-Science"
              smallText="Salary values when all responses are aggregated"
              titles={['Social studies', 'Law', 'Business & administrative studies', 'Mass communications & documentation', 'Languages', 'Historical & philosophical studies', 'Creative arts & design', 'Education', 'Combined']}
              value="£"
              data={[
                  { name: 'Male', data: [29700, 42900, 33000, 31900, 23100, 27500, 20900, 23100, 31900] },
                  { name: 'Female', data: [24300, 35100, 27000, 26100, 18900, 22500, 17100, 18900, 26100] },
                    ]}
              direction="horizontal"
              globalID="grouperdBar-4"
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
