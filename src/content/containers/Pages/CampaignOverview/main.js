
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';

import TabbedGraphPanel from '../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../content/components/BasicPanel';

import drawNewPieChart from '../../../../content/scripts/custom/echarts/drawPieChart';
import drawGroupedBarChart from '../../../../content/scripts/custom/echarts/drawBarChart';
import drawWorldMap from '../../../../content/scripts/custom/echarts/drawWorldMap';
import worldMapData from '../../../../content/scripts/custom/echarts/worldMapData';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Campaign Overview',
      breadcrumbs: [
        {
          name: 'Campaign',
          link: '/campaign',
        },
        {
          name: 'Overview',
          link: '/campaign/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      // NETWORK CHART
      // =================================================================
      // Require Flot Charts
      // -----------------------------------------------------------------
      // http://www.flotcharts.org/
      // =================================================================

      // const dwData = [[1, 24], [2, 34], [3, 33], [4, 22], [5, 28], [6, 60], [7, 60], [8, 70], [9, 67], [10, 86], [11, 86], [12, 113], [13, 130], [14, 114], [15, 80], [16, 109], [17, 100], [18, 105], [19, 110], [20, 102], [21, 107], [22, 60], [23, 67], [24, 76], [25, 73], [26, 94], [27, 135], [28, 154], [29, 120], [30, 100], [31, 130], [32, 100], [33, 60], [34, 70], [35, 67], [36, 86], [37, 86], [38, 113], [39, 130], [40, 114], [41, 80], [42, 109], [43, 100], [44, 105], [45, 110], [46, 102], [47, 107], [48, 60], [49, 67], [50, 76], [51, 73], [52, 94], [53, 79]];
      // const upData = [[1, 2], [2, 22], [3, 7], [4, 6], [5, 17], [6, 15], [7, 17], [8, 7], [9, 18], [10, 18], [11, 18], [12, 29], [13, 23], [14, 10], [15, 22], [16, 7], [17, 6], [18, 17], [19, 15], [20, 17], [21, 7], [22, 18], [23, 18], [24, 18], [25, 29], [26, 13], [27, 2], [28, 22], [29, 7], [30, 6], [31, 17], [32, 15], [33, 17], [34, 7], [35, 18], [36, 18], [37, 18], [38, 29], [39, 23], [40, 10], [41, 22], [42, 7], [43, 6], [44, 17], [45, 15], [46, 17], [47, 7], [48, 18], [49, 18], [50, 18], [51, 29], [52, 13], [53, 24]];

      // const plot = $.plot('#demo-chart-network', [
      //   {
      //     label: 'Email Opens',
      //     data: dwData,
      //     lines: {
      //       show: true,
      //       lineWidth: 0,
      //       fill: true,
      //       fillColor: {
      //         colors: [{
      //           opacity: 0.2,
      //         }, {
      //           opacity: 0.2,
      //         }],
      //       },
      //     },
      //     points: {
      //       show: false,
      //     },
      //   },
      //   {
      //     label: 'Completed Responses',
      //     data: upData,
      //     lines: {
      //       show: true,
      //       lineWidth: 0,
      //       fill: true,
      //       fillColor: {
      //         colors: [{
      //           opacity: 0.9,
      //         }, {
      //           opacity: 0.9,
      //         }],
      //       },
      //     },
      //     points: {
      //       show: false,
      //     },
      //   },
      // ], {
      //   series: {
      //     lines: {
      //       show: true,
      //     },
      //     points: {
      //       show: true,
      //     },
      //     shadowSize: 0, // Drawing is faster without shadows
      //   },
      //   colors: ['#b5bfc5', '#25476a'],
      //   legend: {
      //     show: true,
      //     position: 'nw',
      //     margin: [0, 0],
      //   },
      //   grid: {
      //     borderWidth: 0,
      //     hoverable: true,
      //     clickable: true,
      //   },
      //   yaxis: {
      //     show: false,
      //     ticks: 5,
      //     tickColor: 'rgba(0,0,0,.1)',
      //   },
      //   xaxis: {
      //     show: true,
      //     ticks: 10,
      //     tickColor: 'transparent',
      //   },
      //   tooltip: {
      //     show: true,
      //     content: "<div class='flot-tooltip text-center'><h5 class='text-main'>%s</h5>%y.0</div>",
      //   },
      // });

      // HDD USAGE - SPARKLINE LINE AREA CHART
      // =================================================================
      // Require sparkline
      // -----------------------------------------------------------------
      // http://omnipotent.net/jquery.sparkline/#s-about
      // =================================================================
      const hddSparkline = () => {
        $('#demo-sparkline-area').sparkline([57, 69, 70, 62, 73, 79, 76, 77, 73, 52, 57, 50, 60, 55, 70, 68, 57, 62, 53, 69, 59, 67, 69, 58, 50, 47, 65], {
          type: 'line',
          width: '100%',
          height: '60',
          spotRadius: 4,
          lineWidth: 2,
          lineColor: 'rgba(255,255,255,.85)',
          fillColor: 'rgba(0,0,0,0.1)',
          spotColor: 'rgba(255,255,255,.5)',
          minSpotColor: 'rgba(255,255,255,.5)',
          maxSpotColor: 'rgba(255,255,255,.5)',
          highlightLineColor: '#ffffff',
          highlightSpotColor: '#ffffff',
        });
      };


      // EARNING - SPARKLINE LINE CHART
      // =================================================================
      // Require sparkline
      // -----------------------------------------------------------------
      // http://omnipotent.net/jquery.sparkline/#s-about
      // =================================================================
      const earningSparkline = () => {
        $('#demo-sparkline-line').sparkline([2, 2, 3, 9, 7, 10, 12, 24, 19, 22, 28], {
          type: 'line',
          width: '95%',
          height: '60',
          spotRadius: 0,
          lineWidth: 2,
          lineColor: '#ffffff',
          fillColor: false,
          minSpotColor: false,
          maxSpotColor: false,
          highlightLineColor: '#ffffff',
          highlightSpotColor: '#ffffff',
          // tooltipChartTitle: 'Earning',
          // tooltipPrefix: '$ ',
          spotColor: '#ffffff',
          valueSpots: {
            '0:': '#ffffff',
          },
        });
      };


      // SALES - SPARKLINE BAR CHART
      // =================================================================
      // Require sparkline
      // -----------------------------------------------------------------
      // http://omnipotent.net/jquery.sparkline/#s-about
      // =================================================================

      const barEl = $('#demo-sparkline-bar');
      const barValues = [40, 32, 65, 53, 62, 55, 24, 67, 45, 70, 45, 56, 34, 67, 76, 32, 65, 53, 62, 55, 24, 67, 45, 70, 45, 56, 70, 45, 56, 34, 67, 76, 32, 65];
      const barValueCount = barValues.length;
      const barSpacing = 1;
      const salesSparkline = () => {
        barEl.sparkline(barValues, {
          type: 'bar',
          height: 78,
          barWidth: Math.round((barEl.parent().width() - ((barValueCount - 1) * barSpacing)) / barValueCount),
          barSpacing,
          zeroAxis: false,
          barColor: 'rgba(0,0,0,.15)',
        });
      };

      const barEl2 = $('#my-advanced-chart');
      const barValues2 = [40, -32, -65, -53, -62, 55, 24, 67, 45, -70, -45, -56, -34, 67, 76, 32, -65, -53, 62, 55, 24, 67, 45, 70, -45, -56, -70, -45, 56, 34, 67, 76, 32, -65];
      const barValueCount2 = barValues2.length;
      const barSpacing2 = 1;
      const salesSparkline2 = () => {
        barEl2.sparkline(barValues2, {
          type: 'bar',
          height: 78,
          barWidth: Math.round((barEl2.parent().width() - ((barValueCount2 - 1) * barSpacing2)) / barValueCount2),
          barSpacing2,
          zeroAxis: true,
          barColor: 'rgba(0,0,0,.15)',
          negBarColor: 'rgba(0,0,0,.45)',
        });
      };

      $(window).on('resizeEnd', () => {
        hddSparkline();
        earningSparkline();
        salesSparkline();
        salesSparkline2();
      });

      hddSparkline();
      earningSparkline();
      salesSparkline();
      salesSparkline2();
    });
  }

  getEthnicitySplitGraph() {
    const data = [
      { name: 'White', value: 40 },
      { name: 'Chinese', value: 20 },
      { name: 'Mixed/ Other', value: 10 },
      { name: 'Asian', value: 20 },
      { name: 'Black', value: 10 },
    ];
    const label = false;
    const chart = 'pie';
    const alignment = true;

    const options = drawNewPieChart(data, label, chart, alignment);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Ethnicity split"
        globalID="overview-1"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getGenderSplitGraph() {
    const data = [
      { name: 'Male', value: 55 },
      { name: 'Female', value: 40 },
      { name: 'Other', value: 5 },
    ];
    const label = true;
    const chart = 'doughnut';
    const alignment = true;

    const options = drawNewPieChart(data, label, chart, alignment);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Gender split"
        globalID="overview-2"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getReligionSplitGraph() {
    const data = [
      { name: 'No Religion', value: 1000 },
      { name: 'Christian', value: 700 },
      { name: 'Buddhist', value: 200 },
      { name: 'Hindu', value: 400 },
      { name: 'Jewish', value: 600 },
      { name: 'Muslim', value: 600 },
      { name: 'Sikh', value: 400 },

    ];
    const label = true;
    const chart = 'pie';
    const alignment = true;

    const options = drawNewPieChart(data, label, chart, alignment);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Religion split"
        globalID="overview-8"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getDisabilitySplitGraph() {
    const data = [
      { name: 'No disability specified', value: 900 },
      { name: 'Disability declared', value: 100 },
    ];
    const label = false;
    const chart = 'doughnut';
    const alignment = false;

    const options = drawNewPieChart(data, label, chart, alignment);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Disability split"
        globalID="overview-5"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getCourseTypeGraph() {
    const data = [
      { name: 'Undergraduate degree', value: 75 },
      { name: 'Postgraduate taught degree', value: 18 },
      { name: 'Postgraduate research degree', value: 5 },
      { name: 'Foundation degree', value: 2 },
    ];

    const options = drawNewPieChart(data, true, 'pie', false);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Course Type Split"
        globalID="overview-9"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getTotalResponsesPerYearGroup() {
    const titles = ['2012', '2013', '2014', '2015', '2016', '2017'];
    const titles2 = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
    const data = [
      { data: [980, 800, 975, 678, 708, 1020] },
    ];
    const data2 = [
      { data: [500, 600, 746, 774, 842, 874, 899, 900, 875, 778, 808, 920, 980, 800, 975, 678, 708, 1020] },
    ];

    const option = {
      direction: 'horizontal',
      value: '',
    };

    const options = drawGroupedBarChart(titles, data, option);
    const options1 = drawGroupedBarChart(titles2, data2, option);

    const postContentShowMore = (
      <div className="text-center" style={{ marginTop: '12px' }}>
        <button className="btn btn-primary" onClick={() => { this.setState({ activeTab: 1 }); }}>Show All</button>
      </div>
    );

    const postContentHideMore = (
      <div className="text-center" style={{ marginTop: '12px' }}>
        <button className="btn btn-primary" onClick={() => { this.setState({ activeTab: 0 }); }}>Hide All</button>
      </div>
    );

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Total Responses per Graduation Year"
        globalID="overview-3"
        showTabs={false}
        content={[
            {
              title: 'Tab 1',
              active: this.state.activeTab === 0,
              postContent: postContentShowMore,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '280px',
                data: {
                  options,
                },
              },
            },
            {
              title: 'Tab 2',
              active: this.state.activeTab !== 0,
              postContent: postContentHideMore,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '580px',
                data: {
                  options: options1,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getAgeDistribution() {
    const titles = ['under 25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56+'];
    const data = [
      { data: [456, 1000, 793, 578, 654, 543, 308, 123], rotation: '90' },
    ];
    const option = { direction: 'vertical', value: '', rotate: -45 };


    const options = drawGroupedBarChart(titles, data, option);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Total Responses per Age"
        globalID="overview-4"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '320px',
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getSubjectResponseRates() {
    const reactData = (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Course</th>
              <th>Respondants</th>
              <th>Subject Area</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td><a href="#" className="btn-link">Criminology and Law</a></td>
              <td><span className="text-muted">500</span></td>
              <td><span className="label label-purple">Social Sciences</span></td>
            </tr>
            <tr>
              <td className="text-center">2</td>
              <td><a href="#" className="btn-link">Politics, Philosophy and Economics</a></td>
              <td><span className="text-muted">467</span></td>
              <td><span className="label label-purple">Social Sciences</span></td>
            </tr>
            <tr>
              <td className="text-center">3</td>
              <td><a href="#" className="btn-link">Environmental Science</a></td>
              <td><span className="text-muted">421</span></td>
              <td><span className="label label-success">Environment & Development</span></td>
            </tr>
            <tr>
              <td className="text-center">4</td>
              <td><a href="#" className="btn-link">Economics</a></td>
              <td><span className="text-muted">398</span></td>
              <td><span className="label label-info">Mathematics</span></td>
            </tr>
            <tr>
              <td className="text-center">5</td>
              <td><a href="#" className="btn-link">Computing & IT</a></td>
              <td><span className="text-muted">340</span></td>
              <td><span className="label label-info">Mathematics</span></td>
            </tr>
            <tr>
              <td className="text-center">6</td>
              <td><a href="#" className="btn-link">Medicine & Surgery</a></td>
              <td><span className="text-muted">278</span></td>
              <td><span className="label label-danger">Medical Sciences</span></td>
            </tr>
            <tr>
              <td className="text-center">7</td>
              <td><a href="#" className="btn-link">Classical Studies</a></td>
              <td><span className="text-muted">265</span></td>
              <td><span className="label label-warning">Arts & Humanities</span></td>
            </tr>
            <tr>
              <td className="text-center">8</td>
              <td><a href="#" className="btn-link">History</a></td>
              <td><span className="text-muted">254</span></td>
              <td><span className="label label-warning">Arts & Humanities</span></td>
            </tr>
            <tr>
              <td className="text-center">9</td>
              <td><a href="#" className="btn-link">English Literature</a></td>
              <td><span className="text-muted">242</span></td>
              <td><span className="label label-warning">Arts & Humanities</span></td>
            </tr>
            <tr>
              <td className="text-center">10</td>
              <td><a href="#" className="btn-link">Art History</a></td>
              <td><span className="text-muted">238</span></td>
              <td><span className="label label-warning">Arts & Humanities</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );


    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Top 10 responses per subject"
        globalID="overview-6"
        content={[
            {
              title: '',
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

  getResponseLocations() {
    const propsDataOne = [{ name: 'United States of America', value: 60000 }, { name: 'United Kingdom', value: 60000 }, { name: 'Zimbabwe', value: 20 }, { name: 'South Africa', value: 50 }, { name: 'India', value: 8000 }, { name: 'Italy', value: 109550 }, { name: 'Germany', value: 900 }, { name: 'Canada', value: 679 }, { name: 'France', value: 67468 }, { name: 'Spain', value: 674 }, { name: 'China', value: 67468 }, { name: 'Australia', value: 679 }];
    const propsDataTwo = [{ name: 'United States of America', value: 10 }, { name: 'United Kingdom', value: 60000 }, { name: 'India', value: 4000 }, { name: 'Italy', value: 2000 }, { name: 'Germany', value: 3000 }, { name: 'Canada', value: 8000 }, { name: 'France', value: 7000 }, { name: 'Spain', value: 3050 }, { name: 'China', value: 3000 }, { name: 'Australia', value: 6000 }];

    const data1 = propsDataOne.map(element => ({
      code: worldMapData[element.name].code, name: element.name, value: element.value, color: worldMapData[element.name].color,
    }));

    const data2 = propsDataTwo.map(element => ({
      code: worldMapData[element.name].code, name: element.name, value: element.value, color: worldMapData[element.name].color,
    }));

    const options1 = drawWorldMap(data1, 'map', 'People');
    const options2 = drawWorldMap(data2, 'map', 'People');

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Responses mapped to location"
        globalID="overview-7"
        content={[
            {
              title: 'Responses based on country of birth',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '450px',
                data: {
                  options: options1,
                },
              },
            },
            {
              title: 'Responses based on current country',
              active: false,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '450px',
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

  getTotalResponsesPanel() {
    const panelContent = (
      <div className="pad-all">
        <div className="text-center">
          <div className="row">
            <div className="col-sm-6">
              <div className="text-lg"><p className="text-5x text-thin text-main mar-no">45,683</p></div>
              <p className="text-sm">Total responses</p>
            </div>
            <div className="col-sm-6">
              <div className="text-lg"><p className="text-5x text-thin text-main mar-no">37%</p></div>
              <p className="text-sm">Response rate</p>
            </div>
          </div>
        </div>
      </div>
    );

    const panel = (
      <BasicPanel
        content={panelContent}
      />
    );

    return panel;
  }

  render() {
    const content = (
      <div id="page-content">

        <div className="row" style={{ paddingBottom: '50px' }}>

          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm-push-2 col-sm-4 col-lg-push-2 col-lg-4">

                {/* <!--Sparkline Area Chart--> */}
                <Link href="/splash/analytics" to="/splash/analytics">
                  <div className="panel panel-success panel-colorful text-center">
                    <div className="pad-all">
                      <p className="text-lg text-semibold">Analytics</p>
                    </div>
                    <div className="pad-top text-center">
                      {/* <!--Placeholder--> */}
                      <div id="demo-sparkline-area" className="sparklines-full-content" />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-sm-push-2 col-sm-4 col-lg-push-2 col-lg-4">
                {/* <!--Sparkline bar chart --> */}
                <Link href="/splash/regulatory" to="/splash/regulatory">
                  <div className="panel panel-purple panel-colorful text-center">
                    <div className="pad-all">
                      <p className="text-lg text-semibold">Regulatory Outputs</p>
                    </div>
                    <div className="text-center">

                      {/* <!--Placeholder--> */}
                      <div id="demo-sparkline-bar" className="box-inline" />

                    </div>
                  </div>
                </Link>
              </div>


            </div>


          </div>
        </div>


        {/* <!---------------Graphs---------------> */}
        {/* <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
        <div className="row">
          <div className="col-md-10 col-md-push-1">

            {/* <!--Page content--> */}
            {/* <!--===================================================--> */}

            <h3 className="text-main text-normal text-2x mar-no">Response demographics</h3>
            <h5 className="text-muted text-normal">Data shown for all respondants</h5>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-md-6">
                {this.getGenderSplitGraph()}
              </div>

              <div className="col-md-6">
                {this.getEthnicitySplitGraph()}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {this.getDisabilitySplitGraph()}
              </div>
              <div className="col-md-6">
                {this.getReligionSplitGraph()}
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-push-2">
                {this.getCourseTypeGraph()}
              </div>
            </div>

            <h3 className="text-main text-normal text-2x mar-no">Response age and year groupings</h3>
            <h5 className="text-muted text-normal">Data shown for all respondants</h5>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-md-6">
                {this.getTotalResponsesPerYearGroup()}
              </div>

              <div className="col-md-6">
                {this.getAgeDistribution()}
              </div>
            </div>

            <h3 className="text-main text-normal text-2x mar-no">Subject response rates</h3>
            <h5 className="text-muted text-normal">Data shown for all respondants</h5>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-md-12">
                {this.getSubjectResponseRates()}
              </div>
            </div>

            <h3 className="text-main text-normal text-2x mar-no">Location data</h3>
            <h5 className="text-muted text-normal">Data shown for all respondants</h5>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-md-12">
                {this.getResponseLocations()}
              </div>
            </div>

            <h3 className="text-main text-normal text-2x mar-no">Total Response Numbers</h3>
            <h5 className="text-muted text-normal">Data shown for all respondants</h5>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-sm-10 col-sm-push-1">
                {this.getTotalResponsesPanel()}
              </div>
            </div>


            {/* <!--===================================================--> */}
            {/* <!--End page content--> */}
          </div>
        </div>
        {/* <!-----------End of Graphs------------> */}
        {/* <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}

      </div>
    );

    const { location } = this.props;

    return (
      <Wrapper content={content} theLocation={location} />
    );
  }
}

Page.propTypes = {
  reduxAction_doUpdate: PropTypes.func,
  location: PropTypes.object.isRequired,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
