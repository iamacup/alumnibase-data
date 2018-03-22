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
      pageTitle: 'DLHE Requirement 6 - Employment Outcomes',
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
          name: 'RQ 6 - Employment Outcomes',
          link: '/analytics/dlhe-like/6',
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
                These graphs display the gender split in graduates for certain employment destinations. <br />
                For both <strong> Post Graduate</strong> and <strong> First Degree</strong> graduates. <br /><br />
                <strong>Remember</strong> to use the filters above to get a more personalised view of data for you.
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="Post Graduate Graduates by Type of Employment & Gender"
              smallText="Employment values when all responses are aggregated"
              direction="horizontal"
              value=""
              globalID="grouperdBar-5"
              titles={['Managers, directors and senior officials', 'Professional occupations', 'Associate professional and techniacl occupations', 'Total professional', 'Administrative and secretarial occupations', 'skilled trades occupations', 'Caring, leisure and other service occupations', 'Sales and customer service occupations', 'Process, plant and machine operatives', 'Elementary occupations', 'Total non-professional']}
              data={[
                    { name: 'Other', data: [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0] },
                    { name: 'Male', data: [640, 11560, 3680, 15885, 465, 120, 245, 460, 55, 305, 1650] },
                    { name: 'Female', data: [435, 19605, 4230, 24275, 890, 55, 635, 585, 15, 285, 2465] },
                ]}
            />
          </div>
          <div className="col-md-8 col-md-push-2">
            <GroupedBarChart
              title="First Degree Graduates by Type of Employment & Gender"
              smallText="Employment values when all responses are aggregated"
              direction="horizontal"
              value=""
              globalID="grouperdBar-6"
              titles={['Managers, directors and senior officials', 'Professional occupations', 'Associate professional and techniacl occupations', 'Total professional', 'Administrative and secretarial occupations', 'skilled trades occupations', 'Caring, leisure and other service occupations', 'Sales and customer service occupations', 'Process, plant and machine operatives', 'Elementary occupations', 'Total non-professional']}
              data={[
                    { name: 'Other', data: [0, 10, 5, 15, 0, 0, 0, 0, 0, 0, 5] },
                    { name: 'Male', data: [3150, 25280, 21785, 50220, 3170, 1210, 2090, 6715, 660, 4700, 18545] },
                    { name: 'Female', data: [2705, 40365, 26920, 69990, 7015, 755, 7480, 10165, 200, 4875, 30495] },
                ]}
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
