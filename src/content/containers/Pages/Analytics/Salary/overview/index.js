import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';
import BellCurve from '../../../../../../content/containers/Fragments/Graphs/bellCurve';
import SalaryBoxPlot from '../../../../../../content/containers/Fragments/Graphs/salaryBoxPlot';
import AreaChart from '../../../../../../content/containers/Fragments/Graphs/areaChart';
import SalaryLineGraph from '../../../../../../content/containers/Fragments/Graphs/salaryLineGraph';
import LineChart from '../../../../../../content/containers/Fragments/Graphs/lineChart';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showNationalAverage: false,
    };
  }

  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Graduate Salaries',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Salary',
          link: '/analytics/salary',
        },
        {
          name: 'Salary Overview',
          link: '/analytics/salary/overview',
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

  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
    // year groupsav salary 5/10/15/20
    // male female
    const salaryBoxData = {
      1: {
        categories: ['Male', 'Female'],
        values: [
          [18000, 25000],
          [17000, 24000],
        ],
      },
      2: {
        categories: ['Male', 'Female'],
        values: [
          [26000, 35000],
          [24000, 33000],
        ],
      },
      3: {
        categories: ['Male', 'Female'],
        values: [
          [38000, 48000],
          [34000, 44000],
        ],
      },
      4: {
        categories: ['Male', 'Female'],
        values: [[50000, 80000], [46000, 72000]],
      },
    };

    const content = (
      <div id="page-content">
        <StandardFilters />
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here.<br /><br />
                This data represents the average salary statistics.<br /><br />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <BellCurve
              globalID="overview-chart-1"
              title="Average Salary Distribution"
            />
            <SalaryBoxPlot
              globalID="overview-chart-2"
              title="Gender Salary Splits for graduates over a 15 year span"
              data={salaryBoxData}
            />
            <AreaChart
              globalID="overview-chart-3"
              title="Area Chart"
              axis={[1, 2, 3, 4, 5, 6, 7]}
              data={[
                         { name: 'Average Salary', data: [15000, 20000, 30000, 40000, 50000, 60000, 70000] },
                         ]}
            />
            <AreaChart
              globalID="overview-chart-4"
              title="Gender Split Area Chart"
              axis={[1, 2, 3, 4, 5, 6, 7]}
              data={[
                         { name: 'Male', data: [15000, 20000, 30000, 40000, 50000, 60000, 70000] },
                         { name: 'Female', data: [14000, 19000, 28000, 36000, 45000, 52000, 68000] },
                         { name: 'Other', data: [0, 0, 0, 0, 0, 0, 5] },
                         ]}
            />
            <div className="panel">
              <div className="panel-heading">
                <div className="panel-control">
                  <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
                </div>
                <h3 className="panel-title">Subject Salaries</h3>
              </div>
              <div className="collapse in">
                <div className="panel-body" >
                  <div className="pad-all">
                    <h4 className="panel-title">Science Degrees</h4>
                    <div className="row">
                      <div className="col-md-4 col-md-push-2">
                        <p>Mathmatical Sciences</p>
                      </div>
                    </div>
                    <div>
                      {getPercentRow('Male', [80])}
                      {getPercentRow('Female', [65])}
                      <div className="row">
                        <div className="col-md-4 col-md-push-2">
                          <p>Medical Sciences</p>
                        </div>
                      </div>
                      {getPercentRow('Male', [90])}
                      {getPercentRow('Female', [70])}

                      <h4 className="panel-title">Art Degrees</h4>
                      <div className="row">
                        <div className="col-md-4 col-md-push-2">
                          <p>Fine Arts / Art History</p>
                        </div>
                      </div>
                      {getPercentRow('Male', [60])}
                      {getPercentRow('Female', [55])}
                      <div className="row">
                        <div className="col-md-4 col-md-push-2">
                          <p>Design</p>
                        </div>
                      </div>
                      {getPercentRow('Male', [70])}
                      {getPercentRow('Female', [60])}
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href="#" to="">Click Here For Some More Statistics</Link>
                  </div>
                  <div className="text-right" style={{ marginTop: '26px' }}>
                    <h5>
                      <small>
                                 Percentage values when all responses are aggregated
                      </small>
                    </h5>
                  </div>
                </div>
                <a href="#" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
              </div>
            </div>
            <LineChart
              globalID="overview-chart-1"
              title="Average Salary of Graduates"
              label={['Time After Graduating (years)', 'Salary']}
              data={{
                         age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                         name: ['University Average', 'National Average'],
                         plotted: [[17000, 19000, 25000, 30000, 35000, 38000, 40000, 45000, 50000, 60000], [16000, 18000, 23000, 27000, 32000, 34000, 36000, 40000, 45000, 50000]],
                       }}
            />
            <SalaryLineGraph
              globalID="overview-chart-6"
              label={['Time After Graduating (years)', 'Salary']}
              data={{
                           age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                           name: ['Female', 'Male'],
                           plotted: [[17000, 19000, 25000, 30000, 35000, 38000, 40000, 45000, 50000, 60000], [17000, 20000, 27000, 33000, 39000, 43000, 46000, 52000, 58000, 69000]],
}}
              title="Gender Average Salary Gaps"
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
