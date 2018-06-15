
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
import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';

import { dNc } from '../../../../content/scripts/custom/utilities';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'overview';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Campaign Overview',
      breadcrumbs: [
        {
          name: 'Campaign',
          link: `/${uni}/campaign`,
        },
        {
          name: 'Overview',
          link: `/${uni}/campaign/overview`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      // HDD USAGE - SPARKLINE LINE AREA CHART
      // =================================================================
      // Require sparkline
      // -----------------------------------------------------------------
      // http://omnipotent.net/jquery.sparkline/#s-about
      // =================================================================
      const hddSparkline = () => {
        $('#demo-sparkline-area').sparkline([57, 69, 70, 62, 73, 79, 76, 77, 73, 52, 57, 50, 60, 55, 70, 68, 57, 62, 53, 69, 59, 67, 69, 58, 50, 47], {
          type: 'line',
          width: '98%',
          height: '60',
          lineWidth: 2,
          lineColor: 'rgba(255,255,255,.85)',
          fillColor: 'rgba(0,0,0,0.1)',
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false,
          highlightLineColor: false,
          highlightSpotColor: false,
          disableTooltips: true,
        });
      };


      // SALES - SPARKLINE BAR CHART
      // =================================================================
      // Require sparkline
      // -----------------------------------------------------------------
      // http://omnipotent.net/jquery.sparkline/#s-about
      // =================================================================

      const barEl = $('#demo-sparkline-bar');
      const barValues = [40, 32, 65, 53, 62, 55, 24, 67, 45, 70, 45, 56, 34, 67, 76, 32, 65, 53, 62, 55, 24, 67, 45, 70, 45, 56, 70, 45, 56, 34, 67, 76, 32];
      const barValueCount = barValues.length;
      const barSpacing = 1;
      const salesSparkline = () => {
        barEl.sparkline(barValues, {
          type: 'bar',
          height: 78,
          barWidth: Math.round((barEl.parent().width() - ((barValueCount - 1) * barSpacing)) / barValueCount),
          barSpacing,
          disableTooltips: true,
          zeroAxis: false,
          barColor: 'rgba(0,0,0,.15)',
        });
      };

      $(window).on('resizeEnd', () => {
        hddSparkline();
        salesSparkline();
      });

      hddSparkline();
      salesSparkline();
    });
  }

  getTotalResponsesPerYearGroup() {
    const names = [];
    const dataArr = [];
    const titles2 = [];
    const data2 = [{ data: [] }];

    const option = {
      direction: 'horizontal',
      value: '',
    };

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].forEach((element) => {
        if (element.splitItem === 'graduationYear') {
          element.split.forEach((elem) => {
            elem.forEach((e) => {
              data2[0].data.push(e.percent);
              dataArr.push(e.percent);
              titles2.push(e.value.yearGroupStart + '-' + e.value.yearGroupEnd);
              names.push(e.value.yearGroupStart + '-' + e.value.yearGroupEnd);
            });
          });
        }
      });
    }
    const options1 = drawGroupedBarChart(titles2, data2, option);

    const titles = names.splice(names.length - 5);
    const data = [{ data: dataArr.splice(dataArr.length - 5) }];
    const options = drawGroupedBarChart(titles, data, option);

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
    const titles = [];
    const data = [
      { data: [], rotation: '90' },
    ];
    const option = { direction: 'vertical', value: '', rotate: -45 };


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].forEach((element) => {
        if (element.splitItem === 'ages') {
          element.split.forEach((elem) => {
            elem.forEach((e) => {
              data[0].data.push(e.length);
              titles.push(e.value.ageGroupStart + '-' + e.value.ageGroupEnd);
            });
          });
        }
      });
    }

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
    const data = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].forEach((element) => {
        if (element.splitItem === 'topSubjects') {
          element.split[0].forEach((elem, i) => {
            data.push({ num: i + 1, course: elem.value, respondants: elem.length });
          });
        }
      });
    }

    const reactData = (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Course</th>
              <th>Respondants</th>
              {/* <th>Subject Area</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map(element => (
              <tr key={element.num}>
                <td className="text-center">{element.num}</td>
                <td><a href="#" className="btn-link">{element.course}</a></td>
                <td><span className="text-muted">{element.respondants}</span></td>
                {/* <td><span className="label label-purple">Social Sciences</span></td> */}
              </tr>
            ))}
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
    const propsDataOne = [];
    const propsDataTwo = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].forEach((element) => {
        if (element.splitItem === 'countryBornIn') {
          element.split[0].forEach((elem) => {
            propsDataOne.push({ code: elem.countryCodes[0].code2, value: elem.percent });
          });
        } else if (element.splitItem === 'countryLiveIn') {
          element.split[0].forEach((elem) => {
            if (dNc(elem.countryCodes[0])) {
              propsDataTwo.push({ code: elem.countryCodes[0].code2, value: elem.percent });
            }
          });
        }
      });
    }

    const data1 = [];
    const data2 = [];
    const keys = Object.keys(worldMapData);

    propsDataOne.forEach((element) => {
      keys.forEach((country) => {
        if (element.code === worldMapData[country].code) {
          data1.push({
            code: element.code, name: country, value: element.value, color: worldMapData[country].color,
          });
        }
      });
    });

    propsDataTwo.forEach((element) => {
      keys.forEach((country) => {
        if (element.code === worldMapData[country].code) {
          data2.push({
            code: element.code, name: country, value: element.value, color: worldMapData[country].color,
          });
        }
      });
    });

    const options1 = drawWorldMap(data1, 'map', '% of People');
    const options2 = drawWorldMap(data2, 'map', '% of People');

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
    let percentage = '37%';
    let response = '45,683';

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].forEach((element) => {
        if (element.splitItem === 'responsePercentage') percentage = (element.value * 100) + '%';
        if (element.splitItem === 'totalresponses') response = element.value;
      });
    }

    const panelContent = (
      <div className="pad-all">
        <div className="text-center">
          <div className="row">
            <div className="col-sm-6">
              <div className="text-lg"><p className="text-5x text-thin text-main mar-no">{response}</p></div>
              <p className="text-sm">Total responses</p>
            </div>
            <div className="col-sm-6">
              <div className="text-lg"><p className="text-5x text-thin text-main mar-no">{percentage}</p></div>
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

  getPieCharts(type) {
    let data = [];
    let label = true;
    let chart = 'doughnut';
    let alignment = true;
    let title = 'Gender split';

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      this.props.reduxState_fetchDataTransaction.default.payload.forEach((element) => {
        element.forEach((value) => {
          if (value.splitItem === type && type === 'gender') {
            [data] = value.split;
          } else if (value.splitItem === type && type === 'ethnicity') {
            data = value.split[0].reverse();
            chart = 'pie';
            title = 'Ethnicity split';
          } else if (value.splitItem === type && type === 'disability') {
            let count = 0;
            value.split[0].forEach((elem) => {
              if (elem.value === 'No known disability') data.push(elem);
              else count += elem.percent;
            });
            data.push({ value: 'Disability declared', percent: count });
            label = true;
            alignment = false;
            title = 'Disability split';
          } else if (value.splitItem === type && type === 'religion') {
            data = value.split[0].reverse().map((elem) => {
              if (elem.value.includes('Christian')) elem.value = 'Christian'; // eslint-disable-line no-param-reassign
              return elem;
            });
            chart = 'pie';
            title = 'Religion split';
          } else if (value.splitItem === type && type === 'courseType') {
            [data] = value.split;
            chart = 'pie';
            title = 'Course Type split';
          }
        });
      });
    }

    const options = drawNewPieChart(data, label, chart, alignment);

    const panel = (
      <TabbedGraphPanel
        title={title}
        globalID={'overview-' + title}
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

  render() {
    const content = (
      <div id="page-content" key="overview-content">

        <div className="row" style={{ paddingBottom: '50px' }}>

          <div className="col-lg-12">
            <div className="row">
              <div className="col-sm-push-2 col-sm-4 col-lg-push-2 col-lg-4">

                {/* <!--Sparkline Area Chart--> */}
                <Link href="/analytics/salary/overview" to="/splash/analytics">
                  <div className="panel panel-success panel-colorful text-center" style={{ height: '140px' }}>
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
                <Link href="/analytics/dlhe-like/2-3" to="/splash/regulatory">
                  <div className="panel panel-purple panel-colorful text-center" style={{ height: '140px' }}>
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
                {this.getPieCharts('gender')}
              </div>

              <div className="col-md-6">
                {this.getPieCharts('disability')}
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-push-2">
                {this.getPieCharts('ethnicity')}
              </div>
            </div>
              
            <div className="row">
              <div className="col-md-8 col-md-push-2">
                {this.getPieCharts('religion')}
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-push-2">
                {this.getPieCharts('courseType')}
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


    const dataTransaction = (
      <div className="container" key="transaction-overview">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/overview"
                  sendData={{ filterData: {} }}
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
  reduxAction_doUpdate: PropTypes.func,
  location: PropTypes.object.isRequired,
  reduxState_fetchDataTransaction: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
  reduxState_fetchDataTransaction: { default: {} },
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
