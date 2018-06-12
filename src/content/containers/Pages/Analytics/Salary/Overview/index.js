
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
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Graduate Salaries',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'Salary',
          link: `/${uni}/analytics/salary`,
        },
        {
          name: 'Salary Overview',
          link: `/${uni}/analytics/salary/overview`,
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

  getSalaryBoxPlots(data) {
    const colours = [['#ff7311', '#ffbb7d', '#ff8d8b'], ['#d02224', '#ff8d8b', '#a4c0e5'], ['#11293b', '#0b6623', '#1c6cab'], ['#1c6cab', '#a4c0e5', '#11293b']];

    const options1 = drawBoxplotChart(data[1].values, data[1].categories, 10000, colours[0]);
    const options2 = drawBoxplotChart(data[2].values, data[2].categories, 10000, colours[1]);
    const options3 = drawBoxplotChart(data[3].values, data[3].categories, 10000, colours[2]);
    const options4 = drawBoxplotChart(data[4].values, data[4].categories, 10000, colours[3]);

    const panel = (
      <TabbedGraphPanel
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
                  options: options1,
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
                  options: options2,
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
                  options: options3,
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
                  options: options4,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getSubjectSalaries() {
    const uniName = this.props.location.pathname.split('/')[1];

    const reactData = (
      <div key="subject-salaries">
        <div className="pad-all">
          {this.props.reduxState_fetchDataTransaction.default.payload[0].subjectBreakdown.map((element, i) => {
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
          <Link href="#" to={`/${uniName}/analytics/subjects/first-year`} className="btn btn-primary">Detailed Breakdown</Link>
        </div>
      </div>
    );

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
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
                  reactData,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getLineChart(options, preContent) {
    const panel = (
      <TabbedGraphPanel
        title={options.title}
        globalID={options.id}
        content={[
            {
              title: 'All Data',
              active: true,
              preContent: <p>{preContent}</p>,
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
                  options: options[1],
                },
              },
            },
            {
              title: 'Gender Split',
              active: false,
              preContent: <p>{preContent}</p>,
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
                  options: options[2],
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }


  getData(type) {
    let results = null;


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
          results = this.getSalaryBoxPlots(data);
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
            1: drawLineChart(data, options), 2: drawLineChart(data2, optionsB), title: 'Salary over time', id: 'salary-overview-5',
          };

          results = this.getLineChart(finalOptions, preContent);
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
            1: drawLineChart(data, options), 2: drawLineChart(data2, options2), title: 'Salary vs National Average over time', id: 'salary-overview-3',
          };

          results = this.getLineChart(finalOptions);
        } else if (type === 'subjectBreakdown') {
          results = this.getSubjectSalaries();
        }
      });
    }

    return results;
  }

  getContent() {
    const content = (
      <div id="page-content" key="salary-overview">
        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">High level stats</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getData('quartiles')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Salary over time</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getData('salaryRangesOverTime')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getData('nationalAverage')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getData('salaryTrendsOverTime')}
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
            {this.getData('subjectBreakdown')}
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

    if (this.props.reduxState_fetchDataTransaction.default.finished === true) {
      content = this.getContent();
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
                  fetchURL="/api/analytics/salary/overview"
                  sendData={{ filterData: sendData}}
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
