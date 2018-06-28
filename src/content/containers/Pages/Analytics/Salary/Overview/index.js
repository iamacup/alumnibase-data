
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getSalaryRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
// import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

import drawBellcurveChart from '../../../../../../content/scripts/custom/googlecharts/bellcurve';
import drawBoxplotChart from '../../../../../../content/scripts/custom/echarts/drawBoxPlotChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'salary';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
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
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getBellCurve(data, quartiles) {
    const googleData = drawBellcurveChart();

    const postContent = (
      <div className="row text-center">
        <div className="col-lg-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrow-down icon-3x" />
            </div>
            <div className="media-body pad-all bg-on-white">
              <p className="text-2x mar-no text-semibold text-main">£{quartiles.lowerQuartile}</p>
              <p className="text-muted mar-no">The lower quartile for all applied filters</p>
            </div>
          </div>

        </div>
        <div className="col-lg-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrows-alt-h icon-3x" />
            </div>
            <div className="media-body pad-all bg-on-white">
              <p className="text-2x mar-no text-semibold text-main">£{quartiles.median}</p>
              <p className="text-muted mar-no">The median salary for all applied filters</p>
            </div>
          </div>

        </div>
        <div className="col-lg-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrow-up icon-3x" />
            </div>
            <div className="media-body pad-all bg-on-white">
              <p className="text-2x mar-no text-semibold text-main">£{quartiles.upperQuartile}</p>
              <p className="text-muted mar-no">The upper quartile for all applied filters</p>
            </div>
          </div>

        </div>
      </div>
    );

    const panel = (
      <TabbedGraphPanel
        title="Salary Distribution"
        globalID="salary-overview-1"
        content={[
            {
              title: '',
              active: true,
              postContent,
              graphData: {
                type: 'googlecharts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: googleData,
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getSalaryBoxPlots() {
    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].salaryRangesOverTime[0].data.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].salaryRangesOverTime[1].data.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].salaryRangesOverTime[2].data.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].salaryRangesOverTime[3].data.length > 0) {
        panel = (<TabbedGraphPanel
          title="Gender salary splits for graduates over a 15 year span"
          globalID="salary-overview-2"
          content={[
            {
              title: 'First Year',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData('salaryRangesOverTime')[1],
                },
              },
            },
            {
              title: '5 Years',
              active: false,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData('salaryRangesOverTime')[2],
                },
              },
            },
            {
              title: '10 Years',
              active: false,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData('salaryRangesOverTime')[3],
                },
              },
            },
            {
              title: '15 Years',
              active: false,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData('salaryRangesOverTime')[4],
                },
              },
            },
          ]}
          seperator
        />);
      } else {
        panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />);
      }
    }

    return panel;
  }

  getSubjectSalaries(name) {
    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0][name].length > 0) {
        panel = (<TabbedGraphPanel
          title="High level subject salaries"
          globalID="salary-overview-4"
          content={[
            {
              title: 'Non Graph',
              active: true,
              preContent: <p>Data taken from average graduate salaries</p>,
              graphData: {
                type: 'react',
                width: '100%',
                height: '100%',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                data: {
                  reactData: this.getData(name),
                },
              },
            },
          ]}
          seperator
        />);
      } else {
        panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />);
      }
    }

    return panel;
  }

  getLineChart(title, id, name) {
    let panel = null;
    const length = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTime.forEach((element) => {
        if (element.data !== null) length.push(true);
      });
      this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTimeGenderSplit.forEach((element) => {
        if (element.data.length > 0) length.push(true);
      });
      if (length[0] === true && length[1] === true) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={id}
          content={[
            {
              title: 'All Data',
              active: true,
              preContent: <p>{this.getData(name).preContent}</p>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData(name)[1],
                },
              },
            },
            {
              title: 'Gender Split',
              active: false,
              preContent: <p>{this.getData(name).preContent}</p>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData(name)[2],
                },
              },
            },
          ]}
          seperator
        />);
      } else {
        panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />);
      }
    }

    return panel;
  }


  getData(type) {
    let results = {};


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === 'salaryRangesOverTime' && key === type) {
          const data = {};
          this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0][type], true);

          this.props.reduxState_fetchDataTransaction.default.payload[0][type].forEach((element, i) => {
            const categories = [];
            const values = [];
            let smallest = 0;
            let largest = 0;

            element.data.forEach((elem) => {
              categories.push(elem.gender);

              elem.data.forEach((value) => {
                if (value.salary > largest) {
                  largest = value.salary;
                }
              });

              elem.data.forEach((value) => {
                if (value.Salary < largest) smallest = value.salary;
              });
              values.push([smallest, largest]);
            });
            data[i + 1] = { categories, values };
          });

          const colours = [['#ff7311', '#ffbb7d', '#ff8d8b'], ['#d02224', '#ff8d8b', '#a4c0e5'], ['#11293b', '#0b6623', '#1c6cab'], ['#1c6cab', '#a4c0e5', '#11293b']];
          const final = {
            1: drawBoxplotChart(data[1].values, data[1].categories, 10000, colours[0]), 2: drawBoxplotChart(data[2].values, data[2].categories, 10000, colours[1]), 3: drawBoxplotChart(data[3].values, data[3].categories, 10000, colours[2]), 4: drawBoxplotChart(data[4].values, data[4].categories, 10000, colours[3]),
          };

          results = final;
        } else if (type === 'quartiles') {
          const quartiles = this.props.reduxState_fetchDataTransaction.default.payload[0].quartiles[0];
          results = this.getBellCurve('data', quartiles);
        } else if (type === 'nationalAverage' && (key === 'salaryTrendsOverTime' || key === 'salaryTrendsOverTimeGenderSplit')) { // NEEDS GENDER SPLIT!!!
          const data = { name: ['Average Salary'], age: [], plotted: [[]] };
          const data2 = { name: ['Male', 'Female', 'Other'], plotted: [[], [], []], age: [] };
          const options = { x: 'Time After Graduating (years)', y: 'Salary' };
          const optionsB = { x: 'Time After Graduating (years)', y: 'Salary', value: false };
          const preContent = 'The average salary of graduates in work';

          this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTime.forEach((element) => {
            data.age.push(element.name.split(' ')[0]);
            data.plotted[0].push(element.data);
          });

          // setting the gender graph
          this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTimeGenderSplit, false);

          this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTimeGenderSplit.forEach((element) => {
            data2.age.push(element.name.split(' ')[0]);

            element.data.forEach((elem) => {
              if (elem.gender === 'Male') data2.plotted[0].push(elem.data);
              if (elem.gender === 'Female') data2.plotted[1].push(elem.data);
              if (elem.gender === 'Other') data2.plotted[2].push(elem.data);
            });
          });

          const finalOptions = {
            1: drawLineChart(data, options), 2: drawLineChart(data2, optionsB), preContent,
          };
          results = finalOptions;
        } else if (type === 'salaryTrendsOverTime' && (key === type || key === 'salaryTrendsOverTimeGenderSplit')) {
          const data = { name: ['Average Salary', 'National Average'], age: [], plotted: [[], []] };
          const data2 = { name: ['Male', 'Female', 'Other', 'National Average'], plotted: [[], [], [], []], age: [] };
          const options = { trendline: true };
          const options2 = { value: false, trendline: true };

          // setting the first graph
          this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTime.forEach((element) => {
            data.age.push(element.name.split(' ')[0]);
            data.plotted[0].push(element.data);
          });

          // setting the gender graph
          this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTimeGenderSplit, false);

          this.props.reduxState_fetchDataTransaction.default.payload[0].salaryTrendsOverTimeGenderSplit.forEach((element) => {
            data2.age.push(element.name.split(' ')[0]);

            element.data.forEach((elem) => {
              if (elem.gender === 'Male') data2.plotted[0].push(elem.data);
              if (elem.gender === 'Female') data2.plotted[1].push(elem.data);
              if (elem.gender === 'Other') data2.plotted[2].push(elem.data);
            });
          });

          // setting national average for both graphs
          this.props.reduxState_fetchDataTransaction.default.payload[0].nationalAverage.forEach((element) => {
            data.plotted[1].push(element.salary);
            data2.plotted[3].push(element.salary);
          });

          const finalOptions = {
            1: drawLineChart(data, options), 2: drawLineChart(data2, options2), preContent: '',
          };

          results = finalOptions;
        } else if (type === 'subjectBreakdown') {
          const uniName = this.props.location.pathname.split('/')[1];

          const reactData = (
            <div key="subject-salaries">
              <div className="pad-all">
                {this.props.reduxState_fetchDataTransaction.default.payload[0][type].map((element, i) => {
                  const index = i;
                return (
                  <div key={index}>
                    <div className="row">
                      <div className="col-md-4 col-md-push-2">
                        <p>{element.subjectGroup}</p>
                      </div>
                    </div>
                    {element.data.map(elem => getSalaryRow(elem.gender, [elem.averageSalary]))}
                  </div>
                );
                })}
              </div>
              <div className="text-center">
                <Link href="#" to="/analytics/subjects/first-year" className="btn btn-primary">Detailed Breakdown</Link>
              </div>
            </div>
          );

          results = reactData;
        }
      });
    }

    return results;
  }

  getContent() {
    const content = (
      <div id="page-content" key="salary-overview">
        <StandardFilters />

        { // <div className="row">
        //   <div className="col-md-8 col-md-push-2">
        //     <h3 className="text-main text-normal text-2x mar-no">High level stats</h3>
        //     <hr className="new-section-xs" />
        //   </div>
        // </div>

        // <div className="row">
        //   <div className="col-md-8 col-md-push-2">
        //     {this.getData('quartiles')}
        //   </div>
        // </div>
      }

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Salary over time</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getSalaryBoxPlots('salaryRangesOverTime')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getLineChart('Salary over time', 'salary-overview-5', 'nationalAverage')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getLineChart('Salary vs National Average over time', 'salary-overview-3', 'salaryTrendsOverTime')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Subject breakdown</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getSubjectSalaries('subjectBreakdown')}
          </div>
        </div>

      </div>
    );
    return content;
  }

  getAllUniqueNames(dataArr, array) {
    const uniqueKeys = [];

    dataArr.forEach((element) => {
      element.data.forEach((elem) => {
        if (!uniqueKeys.includes(elem.gender)) uniqueKeys.push(elem.gender);
      });
    });

    dataArr.forEach((element) => {
      if (element.data.length < uniqueKeys.length) {
        const keysInBreakdown = element.data.map(elem => elem.gender);

        if (array === true) {
          uniqueKeys.forEach((key) => {
            if (!keysInBreakdown.includes(key)) {
              element.data.push({ gender: key, data: [] });
            }
          });
        } else {
          uniqueKeys.forEach((key) => {
            if (!keysInBreakdown.includes(key)) {
              element.data.push({ gender: key, data: 0 });
            }
          });
        }
      }
    });

    return dataArr;
  }


  render() {
    let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished === true && this.props.reduxState_fetchDataTransaction.default.generalStatus === 'success') {
      content = this.getContent();
    } else if (this.props.reduxState_fetchDataTransaction.default.generalStatus === 'error' || this.props.reduxState_fetchDataTransaction.default.generalStatus === 'fatal') {
      console.log(this.props.reduxState_fetchDataTransaction.default.generalStatus.toUpperCase(), this.props.reduxState_fetchDataTransaction.default.payload);
      content = (
        <div>
          <StandardFilters />
          <div className="row" style={{ marginTop: '200px' }}>
            <div className="col-md-10 col-md-push-1 text-center">
              <BasicPanel
                content={
                  <div>
                    <h3><strong>There has been a problem on the backend.</strong></h3>
                    <h4>Try refreshing the page, or changing the filters.</h4>
                    <br />
                  </div>
                      }
              />
            </div>
          </div>
        </div>
      );
    }

    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
      }
    });

    const dataTransaction = (
      <div className="container" key="transaction-salary">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/salary/overview"
                  sendData={{ filterData: sendData }}
                />
              }
            />
          </div>
        </div>
      </div>
    );

    const output = [
      content,
      dataTransaction,
    ];

    const { location } = this.props;

    return (
      <Wrapper content={output} theLocation={location} />
    );
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
  reduxState_fetchDataTransaction: PropTypes.object,
  filterData: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
  reduxState_fetchDataTransaction: { default: {} },
  filterData: {},
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
  filterData: state.dataStoreSingle.filterData,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
