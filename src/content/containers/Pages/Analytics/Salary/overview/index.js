import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import CurvedLineChart from '../../../../../../content/containers/Fragments/Graphs/curvedLineChart';
import BellCurve from '../../../../../../content/containers/Fragments/Graphs/bellCurve';
import BoxPlot from '../../../../../../content/containers/Fragments/Graphs/simpleBoxplot';
import AreaChart from '../../../../../../content/containers/Fragments/Graphs/areaChart';
import LineChart from '../../../../../../content/containers/Fragments/Graphs/lineChart';
import PieChart from '../../../../../../content/containers/Fragments/Graphs/pieChart';

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

  getPercentRow(title, percentage, bottomMargin) {
    const barStyle = { height: '4px' };

    if (bottomMargin === false) {
      barStyle.marginBottom = '0';
    }

    const obj = (
      <div className="row">
        <div className="col-sm-4">
          <div className="text-left visible-xs-block">
            <h6 style={{ marginTop: '0' }}>{title}</h6>
          </div>
          <div className="text-right hidden-xs">
            <h6 style={{ marginTop: '0' }}>{title}</h6>
          </div>
        </div>
        <div className="col-sm-8">
          <h6 style={{ marginTop: '0', marginBottom: '4px' }}>{percentage}%</h6>
          <div className="progress" style={barStyle}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentage + '%' }}
            >
              <span className="sr-only">{percentage}% Complete</span>
            </div>
          </div>
        </div>
      </div>
    );

    return obj;
  }

  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
    const salaryBoxData = {
      categories: ['1', '2', '3', '4', '5'],
      values: [
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
      ],
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

            <BoxPlot
              globalID="overview-chart-2"
              title="Box Plots"
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
                <h3 className="panel-title">Percentage bars</h3>
              </div>
              <div className="collapse in">
                <div className="panel-body" >
                  <div className="pad-all">
                    <div>
                      {this.getPercentRow('a', [20])}
                      {this.getPercentRow('b', [20])}
                      {this.getPercentRow('c', [20])}
                      {this.getPercentRow('d', [20])}
                      {this.getPercentRow('e', [20])}
                    </div>
                  </div>
                  <div className="text-right" style={{ marginTop: '26px' }}>
                    <h5>
                      <small>
                      Percentage values when all responses are aggregated
                      </small>
                    </h5>
                  </div>
                </div>
                <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
              </div>
            </div>

            {/* <CurvedLineChart
               globalID="overview-chart-1"
               title="Line Chart"
               label ={['xAxis', 'yAxis']}
               data = {[[21, 3], [22, 5], [23, 4], [24, 8], [25, 10], [26, 7]]}
               /> */}

            <LineChart
              globalID="overview-chart-1"
              title="Line Chart"
              label={['xAxis', 'yAxis']}
              data={{
              age: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
              plotted: [[3, 5, 4, 8, 10, 7, 1, 3, 5, 6, 2, 4, 6, 9, 5, 2, 4, 8, 5, 1]],
            }}
            />

            <LineChart
              globalID="overview-chart-6"
              label={[1, 2]}
              data={{ age: [1, 2, 3], plotted: [[4, 5, 6], [3, 4, 5]] }}
              title="Line Chart Gender Split - Percentages"
            />

            <LineChart
              globalID="overview-chart-7"
              label={[1, 2]}
              data={{ age: [1, 2, 3], plotted: [[4, 5, 6]] }}
              title="Line Chart Gender Split"
            />


            {/*           <PieChart
                            title="Ethnicity Split"
                            label={false}
                            alignment={true}
                            chart="pie"
                            data={[
                            { name: 'White', value: 40 },
                            { name: 'Chinese', value: 20 },
                            { name: 'Mixed/ Other', value: 10 },
                            { name: 'Asian', value: 20 },
                            { name: 'Black', value: 10 },
                          ]}
                            globalID="overview-pie-3"
                          />
                        */}


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
