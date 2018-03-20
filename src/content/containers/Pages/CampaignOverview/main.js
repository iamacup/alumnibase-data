
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';
import PieChart from '../../../../content/containers/Fragments/Graphs/pieChart';
import BarChart from '../../../../content/containers/Fragments/Graphs/groupedBarChart';
import WorldMap from '../../../../content/containers/Fragments/Graphs/section5WorldMap';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

class Page extends React.PureComponent {
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

  render() {
    const content = (
      <div id="page-content">

        <div className="row" style={{ paddingBottom: '50px' }}>

          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm-4 col-lg-4">

                {/* <!--Sparkline Area Chart--> */}
                <Link href="" to="/analytics/views/1">
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

              <div className="col-sm-4 col-lg-4">
                {/* <!--Sparkline bar chart --> */}
                <Link href="" to="/analytics/dlhe-like/2-3">
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
              <div className="col-sm-4 col-lg-4">


                {/* <!--Sparkline bar chart --> */}
                <Link href="" to="/analytics/employment-outcomes/employment-destinations">
                  <div className="panel panel-warning panel-colorful text-center">
                    <div className="pad-all">
                      <p className="text-lg text-semibold">Advanced Analytics</p>
                    </div>
                    <div className="text-center">
                      {/* <!--Placeholder--> */}
                      <div id="my-advanced-chart" className="box-inline" />

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

            <div className="row">
              <div className="col-md-4">

                {/* <!-- Donut Chart --> */}
                {/* <!----------------------------------> */}
                <div className="panel">
                  <div className="panel-body">
                    <PieChart
                      title="Gender Split"
                      label
                      alignment
                      chart="doughnut"
                      data={[
                      { name: 'Male', value: 55 },
                      { name: 'Female', value: 40 },
                      { name: 'Other', value: 5 },
                    ]}
                      globalID="overview-pie-2"
                    />
                  </div>
                </div>
                {/* <!----------------------------------> */}

              </div>
              <div className="col-md-4">

                {/* <!-- Donut Chart --> */}
                {/* <!----------------------------------> */}

              <div className="panel" style={{ height: '430px' }} >
                <div className="panel-heading">
                  <div className="panel-control">
                    <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
                  </div>
                  <h3 className="panel-title">Responses</h3>
                </div>
                <div className="collapse in">
                  <div className="panel-body">
                    <div className="pad-all">
                      <div className="text-center p-5">
                        <h1>45,683</h1>
                        <h2>Total Responses</h2>
                        <h1>37% </h1>
                        <h2>Response Rate</h2>
                    </div>
                  </div>
                </div>
                <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
              </div>
            </div>
                {/* <!----------------------------------> */}

              </div>
              <div className="col-md-4">
                {/* <!-- Donut Chart --> */}
                {/* <!----------------------------------> */}
                <div className="panel">
                  <div className="panel-body">
                    <PieChart
                      title="Ethnicity Split"
                      label={false}
                      alignment
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
                  </div>
                </div>
              </div>
            </div>
            {/* <!----------------------------------> */}

            <div className="row">
              <div className="col-md-6">


                {/* <!-- Area Chart --> */}
                {/* <!----------------------------------> */}
                <div className="panel">
                  <div className="pad-all">
                    <BarChart
                      title="Total Responses per Year Group"
                      value=""
                      titles={['2012', '2013', '2014', '2015', '2016', '2017']}
                      direction="horizontal"
                      data={[
                      { data: [980, 800, 975, 678, 708, 1020] },
                      ]}
                      globalID="overview-bar-1"
                    />
                  </div>
                </div>
                {/* <!----------------------------------> */}


              </div>
              <div className="col-md-6">

                {/* <!-- Line Chart --> */}
                {/* <!----------------------------------> */}
                <div className="panel">
                  <div className="pad-all">
                    <BarChart
                      title="Age distribution of respondants"
                      value=""
                      titles={['under 25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56+']}
                      direction="vertical"
                      data={[
                      { data: [456, 1000, 793, 578, 654, 543, 308, 123] },
                      ]}
                      globalID="overview-bar-2"
                    />
                  </div>
                </div>
                {/* <!----------------------------------> */}


              </div>
            </div>


            {/* <!-- Morris JS Full Content --> */}
            {/* <!----------------------------------> */}
            <div className="panel">
              <div className="panel-body">
                <div id="demo-morris-area-legend-full" className="text-center" />
                <div id="demo-morris-area-full" className="morris-full-content" style={{ height: '300px' }} />
                <div className="">
                  <h4>Subject Breackdown Split</h4>
                  <p>dots**</p>
                </div>
              </div>
            </div>
            {/*  <!----------------------------------> */}


            <div className="row">
              <div className="col-md-7">


                {/* <!-- Bar Chart --> */}
                {/* <!----------------------------------> */}
                <div className="panel">
                  <div className="panel-heading">
                    <h3 className="panel-title">Religion Split</h3>
                  </div>
                  <div className="panel-body">
                    <div id="demo-morris-bar" style={{ height: '250px' }} />
                  </div>
                </div>
                {/* <!----------------------------------> */}


              </div>
              <div className="col-md-5">


                {/* <!-- Donut Chart --> */}
                {/* <!----------------------------------> */}
                <div className="panel">
                  <div className="panel-body">
                    <PieChart
                      title="Disability Split"
                      label
                      alignment
                      chart="doughnut"
                      data={[
                      { name: 'Searching Engine', value: 400 },
                      { name: 'Direct', value: 335 },
                      { name: 'Email', value: 310 },
                      { name: 'Alliance Advertisement', value: 274 },
                      { name: 'Video Advertisement', value: 235 },
                    ]}
                      globalID="overview-pie-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <!----------------------------------> */}


            {/* <!-- Morris JS Full Content --> */}
            {/* <!----------------------------------> */}
            <div className="panel">
              <div className="panel-body">
                <WorldMap
                  title1="Alumni Country of Origin"
                  title2="Alumni Destinations"
                  globalID="world-chart"
                />
              </div>
            </div>
            {/*  <!----------------------------------> */}


            {/* <!--===================================================--> */}
            {/* <!--End page content--> */}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="panel">

              <div className="panel">
                <div className="panel-heading">
                  <h3 className="panel-title">Top 10 Subject Respondant List</h3>
                </div>

                {/* <!--Bordered Table--> */}
                {/* <!--===================================================--> */}
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th>Course</th>
                          <th>Respondants</th>
                          <th>Subject</th>
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
                </div>
                {/* <!--===================================================--> */}
                {/* <!--End Bordered Table--> */}

              </div>
            </div>

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
