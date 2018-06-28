import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'dhle-like-23';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 2 - Graduates and What they Are Doing',
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
          name: 'RQ 2/3 - Graduates and What they Are Doing',
          link: '/analytics/dlhe-like/2-3',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGraph(title, id, percentageName, absoluteName) {
    let panel = null;
    const percentage = percentageName;
    const absolute = absoluteName;


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0][percentageName].length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0][absoluteName].length > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={id}
          collapsed={false}
          content={[
                  {
                    title: <i className="far fa-percent" />,
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
                        options: this.getData(percentage),
                      },
                    },
                  },
                  {
                    title: <i className="far fa-hashtag" />,
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
                        options: this.getData(absolute),
                      },
                    },
                  },
                ]}
          seperator
        />);
      } else if (this.props.reduxState_fetchDataTransaction.default.payload[0][percentageName].length > 0 || this.props.reduxState_fetchDataTransaction.default.payload[0][absoluteName].length > 0) {
        let name = percentageName;
        if (this.props.reduxState_fetchDataTransaction.default.payload[0][absoluteName].length > 0) name = absoluteName;

        panel = (<TabbedGraphPanel
          title={title}
          globalID={id}
          collapsed={false}
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
      <div id="page-content" key="DHLE-23">

        <StandardFilters />

        <h3 className="text-main text-normal text-2x mar-no">Post University Activity</h3>
        <h5 className="text-muted text-normal">Each graph displays the employment status of past Alumni, for both Post Graduate courses and Undergraduate degrees. Click through the tabs to see the data displayed as percentages or raw numbers.</h5>
        <hr className="new-section-xs" />

        <div className="row">
          <div className="col-md-6">
            {this.getGraph('Employment Activity of Post Gradutes',
              'dlhe-like-23-1',
              'PGActivityPercentageSplit',
              'PGActivityAbsoluteSplit')}
          </div>

          <div className="col-md-6">
            {this.getGraph('Employment Activity of Undergraduates',
              'dlhe-like-23-2',
              'UGActivityPercentageSplit',
              'UGActivityAbsoluteSplit')
            }
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {this.getGraph('Most Important Activity Post-Graduate FT / PT',
              'dlhe-like-23-3',
              'PGMostImportantActivityPercentageSplit',
              'PGMostImportantActivityAbsoluteSplit',
              )}
          </div>

          <div className="col-md-6">
            {this.getGraph('Most Important Activity Undergraduate FT / PT',
              'dlhe-like-23-4',
              'UGMostImportantActivityPercentageSplit',
              'UGMostImportantActivityAbsoluteSplit',
              )
          }
          </div>
        </div>

      </div>
    );

    return content;
  }

  getData(name) {
    let options = {};
    const data = { axisData: { y: [], x: '' }, dataSeries: [{ name: 'Full Time', data: [] }, { name: 'Part Time', data: [] }] };

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key.includes('PercentageSplit')) {
          this.dividePercentOverElements(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
        }

        if (key.startsWith('PG') && key === name) {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            let destination = element.graduateDestination;
            if (destination.length > 36) {
              if (destination.startsWith('Working')) destination = destination.slice(0, 17);
              if (destination.startsWith('Engaged')) destination = destination.slice(0, 34);
              if (destination.startsWith('Doing')) destination = destination.slice(0, 20);
            }
            data.axisData.y.push(destination);
            element.data.forEach((elem) => {
              data.dataSeries.forEach((value) => {
                if (value.name === elem.courseFTPT) value.data.push(elem.value);
              });
            });
          });
          options = drawNewBarChart(data.axisData, data.dataSeries);
        } else if (key.startsWith('UG') && key === name) {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            let destination = element.graduateDestination;
            if (destination.length > 36) {
              if (destination.startsWith('Working')) destination = destination.slice(0, 17);
              if (destination.startsWith('Engaged')) destination = destination.slice(0, 34);
              if (destination.startsWith('Doing')) destination = destination.slice(0, 20);
            }
            data.axisData.y.push(destination);
            element.data.forEach((elem) => {
              data.dataSeries.forEach((value) => {
                if (value.name === elem.courseFTPT) value.data.push(elem.value);
              });
            });
          });
          options = drawNewBarChart(data.axisData, data.dataSeries);
        }
      });
    }
    return options;
  }

  dividePercentOverElements(dataArr) {
    let remainder;
    dataArr.forEach((element) => {
      let count = 0;
      element.data.forEach((elem) => {
        count += elem.value;
      });

      if (count > 100) {
        remainder = count - 100;
        element.data.forEach((elem) => {
          elem.value -= (elem.value / 100) * remainder; // eslint-disable-line no-param-reassign
        });
      } else if (count < 100) {
        remainder = 100 - count;
        element.data.forEach((elem) => {
          elem.value += (elem.value / 100) * remainder; // eslint-disable-line no-param-reassign
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
      <div className="container" key="transaction-dhle-23">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/dlhe-like/2-3"
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
