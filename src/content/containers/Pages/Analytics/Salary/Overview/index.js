
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getSalaryRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';

import drawBellcurveChart from '../../../../../../content/scripts/custom/googlecharts/bellcurve';
import drawBoxplotChart from '../../../../../../content/scripts/custom/echarts/drawBoxPlotChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

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
        <div className="col-sm-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrow-down icon-3x" />
            </div>
            <div className="media-body pad-all" style={{ backgroundColor: '#ecf0f5' }}>
              <p className="text-2x mar-no text-semibold text-main">£20,000</p>
              <p className="text-muted mar-no">The lower quartile for all applied filters</p>
            </div>
          </div>

        </div>
        <div className="col-sm-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrows-alt-h icon-3x" />
            </div>
            <div className="media-body pad-all" style={{ backgroundColor: '#ecf0f5' }}>
              <p className="text-2x mar-no text-semibold text-main">£30,000</p>
              <p className="text-muted mar-no">The median salary for all applied filters</p>
            </div>
          </div>

        </div>
        <div className="col-sm-4" style={{ color: 'red' }}>

          <div className="panel media middle">
            <div className="media-left bg-mint pad-all">
              <i className="fas fa-arrow-up icon-3x" />
            </div>
            <div className="media-body pad-all" style={{ backgroundColor: '#ecf0f5' }}>
              <p className="text-2x mar-no text-semibold text-main">£40,000</p>
              <p className="text-muted mar-no">The upper quartile for all applied filters</p>
            </div>
          </div>

        </div>
      </div>
    );

    const panel = (
      <TabbedGraphPanel
        title="Salary Distribution"
        globalID="salary-1-1"
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
          [18000, 25000],
          [17000, 24000],
          [17500, 24500],
        ],
      },
      2: {
        categories: ['Male', 'Female', 'Other'],
        values: [
          [26000, 35000],
          [24000, 33000],
          [25000, 34000],
        ],
      },
      3: {
        categories: ['Male', 'Female', 'Other'],
        values: [
          [38000, 48000],
          [34000, 44000],
          [36000, 46000],
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
        globalID="salary-1-2"
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

  getLineCharts() {
    const optionsA = {
      trendline: true,
    };

    const data1 = {
      name: ['Average Salary', 'National Average'],
      plotted: [[15000, 20000, 30000, 40000, 50000, 60000, 70000], [10000, 15000, 20000, 25000, 30000, 35000, 40000]],
      age: [1, 2, 3, 4, 5, 6, 7],
    };
    const options1 = drawLineChart(data1, optionsA);

    const optionsB = {
      value: false,
      trendline: true,
    };

    const data2 = {
      name: ['Male', 'Female', 'Other', 'National Average'],
      plotted: [[15000, 20000, 30000, 40000, 50000, 60000, 70000], [14000, 19000, 28000, 36000, 45000, 52000, 68000], [0, 0, 0, 0, 0, 0, 5], [10000, 15000, 20000, 25000, 30000, 35000, 40000]],
      age: [1, 2, 3, 4, 5, 6, 7],
    };

    const options2 = drawLineChart(data2, optionsB);

    const panel = (
      <TabbedGraphPanel
        title="Salary vs National Average over time"
        globalID="salary-1-3"
        content={[
            {
              title: 'All Data',
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
              title: 'Gender Split',
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
            {getSalaryRow('Male', [26.420])}
            {getSalaryRow('Female', [25.420])}
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>Medical Sciences</p>
              </div>
            </div>
            {getSalaryRow('Male', [26.535])}
            {getSalaryRow('Female', [25.535])}

            <h4 className="panel-title">Art Degrees</h4>
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>Fine Arts / Art History</p>
              </div>
            </div>
            {getSalaryRow('Male', [11.020])}
            {getSalaryRow('Female', [13.020])}
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>Design</p>
              </div>
            </div>
            {getSalaryRow('Male', [11.420])}
            {getSalaryRow('Female', [12.420])}
          </div>
        </div>
        <div className="text-center">
          <Link href="#" to="/analytics/subjects/early" className="btn btn-primary">Detailed Breakdown</Link>
        </div>
      </div>
    );

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="High level subject salaries"
        globalID="salary-1-6"
        content={[
            {
              title: 'Non Graph',
              active: true,
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

  getSalaryLineChart() {
    const data1 = {
      age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      name: ['Average'],
      plotted: [[17000, 19000, 25000, 30000, 35000, 38000, 40000, 45000, 50000, 60000]],
    };

    const optionsA = {
      x: 'Time After Graduating (years)',
      y: 'Salary',
    };
    const optionsB = {
      x: 'Time After Graduating (years)',
      y: 'Salary',
      value: false,
    };

    const options1 = drawLineChart(data1, optionsA);

    const label2 = ['Time After Graduating (years)', 'Salary'];
    const data2 = {
      age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      name: ['Female', 'Male'],
      plotted: [[17000, 19000, 25000, 30000, 35000, 38000, 40000, 45000, 50000, 60000], [17000, 20000, 27000, 33000, 39000, 43000, 46000, 52000, 58000, 69000]],
    };

    const options2 = drawLineChart(data2, optionsB);

    const panel = (
      <TabbedGraphPanel
        title="Salary over time"
        globalID="salary-1-7"
        content={[
            {
              title: 'All Data',
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
              title: 'Gender Split',
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
          ]}
        seperator
      />
    );

    return panel;
  }

  render() {
    const content = (
      <div id="page-content">
        <StandardFilters />
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <BasicPanel
              content={
                <p>
                  This data represents the average salary statistics for the selected filters.
                </p>
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">High level stats</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getBellCurve()}
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
            {this.getSalaryBoxPlots()}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getSalaryLineChart()}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getLineCharts()}
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
            {this.getSubjectSalaries()}
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