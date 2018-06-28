import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-8';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 8 - Graduates in Employment',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'DHLE-Like',
          link: '/analytics/dlhe-like',
        },
        {
          name: 'RQ 8 - Graduates in Employment',
          link: '/analytics/dlhe-like/8',
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

  getGroupedBarchart(title, globalID) {
    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].PGFirstJobTypeOfWorkGenderSplit.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].UGFirstJobTypeOfWorkGenderSplit.length > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          content={[
                {
                  title: 'Undergraduate',
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
                      options: this.getData('UGFirstJobTypeOfWorkGenderSplit'),
                    },
                  },
                },
                {
                  title: 'Postgraduate',
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
                      options: this.getData('PGFirstJobTypeOfWorkGenderSplit'),
                    },
                  },
                },
              ]}
          seperator
        />);
      } else if (this.props.reduxState_fetchDataTransaction.default.payload[0].PGFirstJobTypeOfWorkGenderSplit.length > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          content={[
                        {
                          title: '',
                          active: true,
                          preContent: 'Postgraduate',
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
                              options: this.getData('PGFirstJobTypeOfWorkGenderSplit'),
                            },
                          },
                        },
                      ]}
          seperator
        />);
      } else if (this.props.reduxState_fetchDataTransaction.default.payload[0].UGFirstJobTypeOfWorkGenderSplit.length > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          content={[
                        {
                          title: '',
                          active: true,
                          preContent: 'Undergraduate',
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
                              options: this.getData('UGFirstJobTypeOfWorkGenderSplit'),
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

  getContent() {
    const content = (
      <div id="page-content" key="DHLE-8">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Graduates in Employment</h3>
            <h5 className="text-muted text-normal">Employment for graduates after leaving university.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('First Job, by type of work and gender', 'DHLE-8-1')}
          </div>
        </div>

      </div>
    );
    return content;
  }

  getData(type) {
    let options = {};
    const obj = { direction: 'horizontal', value: '' };
    const titles = [];
    const data = [{ name: 'Other', data: [] }, { name: 'Male', data: [] }, { name: 'Female', data: [] }];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === key) {
          this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            titles.push(element.employmentType);
            element.data.forEach((value) => {
              data.forEach((elem) => {
                if (value.gender === elem.name) elem.data.push(value.averageSalary);
              });
            });
          });
          options = drawGroupedBarChart(titles, data, obj);
        }
      });
    }
    return options;
  }

  getAllUniqueName(dataArr) {
    const uniqueKeys = [];
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
              if (key === uniqueKey) element.data.splice(i, 0, { averageSalary: 0, gender: key });
            });
          }
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
    }

    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
      }
    });

    const dataTransaction = (
      <div className="container" key="transaction-dhle-8">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/dlhe-like/8"
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
