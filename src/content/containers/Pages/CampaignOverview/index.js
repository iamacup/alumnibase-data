
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';

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

      const dwData = [[1, 24], [2, 34], [3, 33], [4, 22], [5, 28], [6, 60], [7, 60], [8, 70], [9, 67], [10, 86], [11, 86], [12, 113], [13, 130], [14, 114], [15, 80], [16, 109], [17, 100], [18, 105], [19, 110], [20, 102], [21, 107], [22, 60], [23, 67], [24, 76], [25, 73], [26, 94], [27, 135], [28, 154], [29, 120], [30, 100], [31, 130], [32, 100], [33, 60], [34, 70], [35, 67], [36, 86], [37, 86], [38, 113], [39, 130], [40, 114], [41, 80], [42, 109], [43, 100], [44, 105], [45, 110], [46, 102], [47, 107], [48, 60], [49, 67], [50, 76], [51, 73], [52, 94], [53, 79]];
      const upData = [[1, 2], [2, 22], [3, 7], [4, 6], [5, 17], [6, 15], [7, 17], [8, 7], [9, 18], [10, 18], [11, 18], [12, 29], [13, 23], [14, 10], [15, 22], [16, 7], [17, 6], [18, 17], [19, 15], [20, 17], [21, 7], [22, 18], [23, 18], [24, 18], [25, 29], [26, 13], [27, 2], [28, 22], [29, 7], [30, 6], [31, 17], [32, 15], [33, 17], [34, 7], [35, 18], [36, 18], [37, 18], [38, 29], [39, 23], [40, 10], [41, 22], [42, 7], [43, 6], [44, 17], [45, 15], [46, 17], [47, 7], [48, 18], [49, 18], [50, 18], [51, 29], [52, 13], [53, 24]];

      const plot = $.plot('#demo-chart-network', [
        {
          label: 'Email Opens',
          data: dwData,
          lines: {
            show: true,
            lineWidth: 0,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.2,
              }, {
                opacity: 0.2,
              }],
            },
          },
          points: {
            show: false,
          },
        },
        {
          label: 'Completed Responses',
          data: upData,
          lines: {
            show: true,
            lineWidth: 0,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.9,
              }, {
                opacity: 0.9,
              }],
            },
          },
          points: {
            show: false,
          },
        },
      ], {
        series: {
          lines: {
            show: true,
          },
          points: {
            show: true,
          },
          shadowSize: 0, // Drawing is faster without shadows
        },
        colors: ['#b5bfc5', '#25476a'],
        legend: {
          show: true,
          position: 'nw',
          margin: [0, 0],
        },
        grid: {
          borderWidth: 0,
          hoverable: true,
          clickable: true,
        },
        yaxis: {
          show: false,
          ticks: 5,
          tickColor: 'rgba(0,0,0,.1)',
        },
        xaxis: {
          show: true,
          ticks: 10,
          tickColor: 'transparent',
        },
        tooltip: {
          show: true,
          content: "<div class='flot-tooltip text-center'><h5 class='text-main'>%s</h5>%y.0</div>",
        },
      });

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

        <div className="row">
          <div className="col-lg-7">

            {/* <!--Network Line Chart--> */}
            {/* <!--===================================================--> */}
            <div id="demo-panel-network" className="panel">
              <div className="panel-heading">
                <div className="panel-control">
                  <button id="demo-panel-network-refresh" className="btn btn-default btn-active-primary" data-toggle="panel-overlay" data-target="#demo-panel-network"><i className="far fa-sync-alt" /></button>
                </div>
                <h3 className="panel-title">Reach since campaign start</h3>
              </div>


              {/* <!--chart placeholder--> */}
              <div className="pad-all">
                <div id="demo-chart-network" style={{ height: '255px' }} />
              </div>


              {/* <!--Chart information--> */}
              <div className="panel-body">

                <div className="row">
                  <div className="col-lg-8">
                    <p className="text-semibold text-uppercase text-main">Campaign Completion</p>
                    <div className="row">
                      <div className="col-xs-5">
                        <div className="media">
                          <div className="media-left">
                            <span className="text-3x text-thin text-main">50%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-7 text-sm">
                        <p>
                          <span>Open Rate</span>
                          <span className="pad-lft text-semibold">
                            <span className="text-lg">81%</span>
                          </span>
                        </p>
                        <p>
                          <span>Response Rate</span>
                          <span className="pad-lft text-semibold">
                            <span className="text-lg">37%</span>
                          </span>
                        </p>
                      </div>
                    </div>


                  </div>


                  <div className="col-lg-4">
                    <p className="text-uppercase text-semibold text-main">Total Resposnes</p>
                    <ul className="list-unstyled">
                      <li>
                        <div className="media pad-btm">
                          <div className="media-left">
                            <span className="text-2x text-thin text-main">45,683</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


            </div>
            {/* <!--===================================================--> */}
            {/* <!--End network line chart--> */}

          </div>
          <div className="col-lg-5">
            <div className="row">
              <div className="col-sm-6 col-lg-6">

                {/* <!--Sparkline Area Chart--> */}
                <div className="panel panel-success panel-colorful text-center">
                  <div className="pad-all">
                    <p className="text-lg text-semibold"> DLHE-Like</p>
                  </div>
                  <div className="pad-top text-center">
                    {/* <!--Placeholder--> */}
                    <div id="demo-sparkline-area" className="sparklines-full-content" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-6">

                {/* <!--Sparkline Line Chart--> */}
                <div className="panel panel-info panel-colorful text-center">
                  <div className="pad-all">
                    <p className="text-lg text-semibold">Further Study</p>
                  </div>
                  <div className="pad-top text-center">

                    {/* <!--Placeholder--> */}
                    <div id="demo-sparkline-line" className="sparklines-full-content" style={{ marginTop: '-5px', paddingBottom: '5px' }} />

                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-lg-6">

                {/* <!--Sparkline bar chart --> */}
                <div className="panel panel-purple panel-colorful text-center">
                  <div className="pad-all">
                    <p className="text-lg text-semibold"> Widening Participation</p>
                  </div>
                  <div className="text-center">

                    {/* <!--Placeholder--> */}
                    <div id="demo-sparkline-bar" className="box-inline" />

                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-6">


                {/* <!--Sparkline bar chart --> */}
                <div className="panel panel-warning panel-colorful text-center">
                  <div className="pad-all">
                    <p className="text-lg text-semibold">Advanced Analytics</p>
                  </div>
                  <div className="text-center">

                    {/* <!--Placeholder--> */}
                    <div id="my-advanced-chart" className="box-inline" />

                  </div>
                </div>


              </div>
            </div>


            {/* <!--Extra Small Weather Widget--> */}
            {/* <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
            <div className="panel">
              <div className="panel-body text-left clearfix">

                <p className="text-semibold text-uppercase text-main">Current Phase</p>
                <p className="text-muted mar-top">Emaill all graduates (5 - 10 years)</p>

                <hr />

                <p className="text-semibold text-uppercase text-main">Next Phase</p>
                <p className="text-muted mar-top">Email all recent graduates (5 years) - <strong>Monday</strong></p>

              </div>
            </div>

            {/* <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
            {/* <!--End Extra Small Weather Widget--> */}


          </div>
        </div>


        <div className="row">
          <div className="col-md-3">
            <div className="panel panel-warning panel-colorful media middle pad-all">
              <div className="media-left">
                <div className="pad-hor">
                  <i className="far fa-address-card fa-2x" />
                </div>
              </div>
              <div className="media-body">
                <p className="text-2x mar-no text-semibold">345,127</p>
                <p className="mar-no">Contacts</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-info panel-colorful media middle pad-all">
              <div className="media-left">
                <div className="pad-hor">
                  <i className="far fa-users fa-2x" />
                </div>
              </div>
              <div className="media-body">
                <p className="text-2x mar-no text-semibold">120,000</p>
                <p className="mar-no">Contacted</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-mint panel-colorful media middle pad-all">
              <div className="media-left">
                <div className="pad-hor">
                  <i className="far fa-envelope fa-2x" />
                </div>
              </div>
              <div className="media-body">
                <p className="text-2x mar-no text-semibold">240,000</p>
                <p className="mar-no">Emails Sent</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-danger panel-colorful media middle pad-all">
              <div className="media-left">
                <div className="pad-hor">
                  <i className="far fa-cogs fa-2x" />
                </div>
              </div>
              <div className="media-body">
                <p className="text-2x mar-no text-semibold">30</p>
                <p className="mar-no">Segments</p>
              </div>
            </div>
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
