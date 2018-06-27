import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-5';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 5 - Destination, Employment and Earnings',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'DHLE-Like',
          link: `/${uni}/analytics/dlhe-like`,
        },
        {
          name: 'RQ 5 - Destination, Employment and Earnings',
          link: `/${uni}/analytics/dlhe-like/5`,
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

  getGroupedBarchart(title, globalID, title1, title2) {
    let panel = null;
    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0][title1].length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0][title2].length > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          content={[
            {
              title: 'Science',
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
                  options: this.getData(title1),
                },
              },
            },
            {
              title: 'Non-Science',
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
                  options: this.getData(title2),
                },
              },
            },
          ]}
          seperator
        />);
      } else if (this.props.reduxState_fetchDataTransaction.default.payload[0][title1].length > 0 || this.props.reduxState_fetchDataTransaction.default.payload[0][title2].length > 0) {
        let name = title1;
        if (this.props.reduxState_fetchDataTransaction.default.payload[0][title2].length > 0) name = title2;

        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          content={[
            {
              title: '',
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
                  options: this.getData(name),
                },
              },
            },
          ]}
          seperator
        />
        );
      } else {
        panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />
        );
      }
    }

    return panel;
  }

  getContent() {
    const content = (
      <div id="page-content" key="DHLE-5">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Destinations Employment and Earnings</h3>
            <h5 className="text-muted text-normal">Destinations of graduates after leaving university.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('High Level Destinations entered by Undergraduates', 'DHLE-5-1', 'UGScienceHighLevelDestinations', 'UGEverythingElseHighLevelDestinations')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Average Full Time Earnings by Undergraduates', 'DHLE-5-2', 'UGScienceEarnings', 'UGEverythingElseEarnings')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Male /Female Full Time Earnings by Undergraduates', 'DHLE-5-3', 'UGScienceEarningsGenderSplit', 'UGEverythingElseEarningsGenderSplit')}
          </div>
        </div>

      </div>
    );
    return content;
  }

  getData(type) {
    let options = {};
    const axisData = { y: [], x: '%' };
    const obj = { direction: 'horizontal', value: '£' };
    const data = [{ name: 'Working full-time', data: [] }, { name: 'Working part-time', data: [] }, { name: 'Unemployed', data: [] }, { name: 'Taking time out in order to travel', data: [] }, { name: 'Engaged in part-time further study', data: [] }, { name: 'Engaged in full-time further study', data: [] }, { name: 'Due to start a job in the next month', data: [] }, { name: 'Doing something else', data: [] }];
    const titles = [];
    const data2 = [{ data: [] }];
    const data3 = [{ name: 'Male', data: [] }, { name: 'Female', data: [] }, { name: 'Other', data: [] }];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === type && key.includes('HighLevelDestinations')) {
          this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          this.dividePercentOverElements(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            axisData.y.push(element.subject);
            element.data.forEach((value) => {
              data.forEach((elem) => {
                if (value.graduateDestinationMostImportant.includes(elem.name)) elem.data.push(value.percentage);
              });
            });
          });
          options = drawNewBarChart(axisData, data);
        } else if (key === type) {
          if (key.includes('Gender')) {
            this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key], true);
            this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
              titles.push(element.subject);
              element.data.forEach((value) => {
                data3.forEach((elem) => {
                  if (value.gender === elem.name) elem.data.push(value.salary);
                });
              });
            });
            options = drawGroupedBarChart(titles, data3, obj);
          } else {
            this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
              titles.push(element.subject);
              data2[0].data.push(element.averageSalary);
            });
            options = drawGroupedBarChart(titles, data2, obj);
          }
        }
      });
    }
    return options;
  }

  getAllUniqueName(dataArr, genderArr) {
    const uniqueKeys = [];

    if (genderArr === true) {
      dataArr.forEach((element) => {
        element.data.forEach((elem) => {
          if (!uniqueKeys.includes(elem.gender)) uniqueKeys.push(elem.gender);
        });
      });

      dataArr.forEach((element) => {
        if (element.data.length < uniqueKeys.length) {
          const keysInBreakdown = element.data.map(elem => elem.gender);

          uniqueKeys.forEach((key) => {
            if (!keysInBreakdown.includes(key)) {
              uniqueKeys.forEach((uniqueKey, i) => {
                if (key === uniqueKey) element.data.splice(i, 0, { gender: key, salary: 0 });
              });
            }
          });
        }
      });
    } else {
      dataArr.forEach((element) => {
        element.data.forEach((elem) => {
          if (!uniqueKeys.includes(elem.graduateDestinationMostImportant)) uniqueKeys.push(elem.graduateDestinationMostImportant);
        });
      });

      dataArr.forEach((element) => {
        if (element.data.length < uniqueKeys.length) {
          const keysInBreakdown = element.data.map(elem => elem.graduateDestinationMostImportant);

          uniqueKeys.forEach((key) => {
            if (!keysInBreakdown.includes(key)) {
              uniqueKeys.forEach((uniqueKey, i) => {
                if (key === uniqueKey) element.data.splice(i, 0, { graduateDestinationMostImportant: key, percentage: 0 });
              });
            }
          });
        }
      });
    }
    return dataArr;
  }

  dividePercentOverElements(dataArr) {
    let remainder;

    dataArr.forEach((element) => {
      let count = 0;
      element.data.forEach((elem) => {
        count += elem.percentage;
      });

      if (count > 100) {
        remainder = count - 100;
        element.data.forEach((elem) => {
          elem.percentage -= (elem.percentage / 100) * remainder; // eslint-disable-line no-param-reassign
        });
      } else if (count < 100) {
        remainder = 100 - count;
        element.data.forEach((elem) => {
          elem.percentage += (elem.percentage / 100) * remainder; // eslint-disable-line no-param-reassign
        });
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
      <div className="container" key="transaction-dhle-5">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/dlhe-like/5"
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
