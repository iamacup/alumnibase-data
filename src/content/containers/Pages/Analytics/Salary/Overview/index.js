
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

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'salary-overview';
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

  getBellCurve() {
    const googleData = drawBellcurveChart();

    const postContent = (
      <div className="row text-center">
        <div className="col-lg-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrow-down icon-3x" />
            </div>
            <div className="media-body pad-all bg-on-white">
              <p className="text-2x mar-no text-semibold text-main">£30,000</p>
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
              <p className="text-2x mar-no text-semibold text-main">£40,000</p>
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
              <p className="text-2x mar-no text-semibold text-main">£75,000</p>
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
    const data = {
      1: {
        categories: ['Male', 'Female', 'Other'],
        values: [
          [18000, 30000],
          [17280, 28800],
          [17640, 29400],
        ],
      },
      2: {
        categories: ['Male', 'Female', 'Other'],
        values: [
          [26000, 40000],
          [24960, 38400],
          [25480, 39200],
        ],
      },
      3: {
        categories: ['Male', 'Female', 'Other'],
        values: [
          [38000, 60000],
          [36480, 57600],
          [37240, 58800],
        ],
      },
      4: {
        categories: ['Male', 'Female', 'Other'],
        values: [[50000, 80000], [46000, 72000], [48000, 76000]],
      },
    };

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
    const reactData = (
      <div>
        <div className="pad-all">
          <h4 className="panel-title">Science Degrees</h4>
          <div className="row">
            <div className="col-md-4 col-md-push-2">
              <p>Mathmatical Sciences</p>
            </div>
          </div>
          <div>
            {getSalaryRow('Male', [49.420])}
            {getSalaryRow('Female', [47.720])}
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>Medical Sciences</p>
              </div>
            </div>
            {getSalaryRow('Male', [52.535])}
            {getSalaryRow('Female', [50.065])}

            <h4 className="panel-title">Art Degrees</h4>
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>Fine Arts / Art History</p>
              </div>
            </div>
            {getSalaryRow('Male', [32.220])}
            {getSalaryRow('Female', [31.720])}
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>Design</p>
              </div>
            </div>
            {getSalaryRow('Male', [38.420])}
            {getSalaryRow('Female', [37.620])}
          </div>
        </div>
        <div className="text-center">
          <Link href="#" to="/analytics/subjects/first-year" className="btn btn-primary">Detailed Breakdown</Link>
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


  getData(type, salary) {
    let results = null;

    // let lineCharts = {
    //   data: {name: '', plotted: [], age: []},
    //   optionsObj: {value: null, trendline: null}
    // }

    if (type === 'bell') {
      results = this.getBellCurve();
    } else if (type === 'boxplot') {
      results = this.getSalaryBoxPlots();
    } else if (type === 'line') {
      if (salary === true) {
        const data1 = { age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], name: ['Average'], plotted: [[23000, 26000, 30000, 32000, 35000, 38000, 40000, 45000, 50000, 60000]] };
        const optionsA = { x: 'Time After Graduating (years)', y: 'Salary' };
        const optionsB = { x: 'Time After Graduating (years)', y: 'Salary', value: false };
        const data2 = { age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], name: ['Female', 'Male'], plotted: [[22500, 25500, 29000, 31000, 34000, 37000, 39000, 44000, 49000, 59000], [23000, 26000, 30000, 32000, 35000, 38000, 40000, 45000, 50000, 60000]] };
        const preContent = 'The national average salary of graduates in work';

        const options = {
          1: drawLineChart(data1, optionsA), 2: drawLineChart(data2, optionsB), title: 'Salary over time', id: 'salary-overview-5',
        };
        results = this.getLineChart(options, preContent);
      } else {
        const optionsA = {
          trendline: true,
        };

        const data1 = {
          name: ['Average Salary', 'National Average'],
          plotted: [[23000, 26000, 32000, 40000, 50000, 60000, 70000], [19000, 23000, 27000, 31000, 35000, 39000, 43000]],
          age: [1, 2, 3, 4, 5, 6, 7],
        };

        const optionsB = {
          value: false,
          trendline: true,
        };

        const data2 = {
          name: ['Male', 'Female', 'Other', 'National Average'],
          plotted: [[23000, 26000, 32000, 40000, 50000, 60000, 70000], [22000, 25000, 31000, 39000, 49000, 59000, 69000], [0, 0, 0, 0, 0, 0, 5], [19000, 23000, 27000, 31000, 35000, 39000, 43000]],
          age: [1, 2, 3, 4, 5, 6, 7],
        };

        const options = {
          1: drawLineChart(data1, optionsA), 2: drawLineChart(data2, optionsB), title: 'Salary vs National Average over time', id: 'salary-overview-3',
        };
        results = this.getLineChart(options);
      }
    } else if (type === 'bars') {
      results = this.getSubjectSalaries();
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
            {this.getData('bell')}
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
            {this.getData('boxplot')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getData('line', true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getData('line')}
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
            {this.getData('bars')}
          </div>
        </div>

      </div>
    );
    return content;
  }


  render() {
      let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished === true) {
      content = this.getContent();
    }

    const sendData = { data: [] };


    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData.data.push({ [key]: this.props.filterData[key] });
      }
    });

    // const dataTransaction = (
    //   <FetchData
    //     key="transaction-salary"
    //     active
    //     fetchURL="/api/analytics/salary/overview"
    //     sendData={sendData}
    //   />
    // )

    const output = [
    // dataTransaction, 
    content
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
