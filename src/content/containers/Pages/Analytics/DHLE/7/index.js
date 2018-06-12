import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-7';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 7 - UK Domicilied Graduates',
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
          name: 'RQ 7 - UK Domicilied Graduates',
          link: `/${uni}/analytics/dlhe-like/7`,
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

  getGraph(title, id, keyName) {
    const panel = (<TabbedGraphPanel
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
                  options: this.getData(keyName, 'percentages'),
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
                  options: this.getData(keyName, 'absolutes'),
                },
              },
            },
          ]}
      seperator
    />);

    return panel;
  }

  getContent() {
    const content = (
      <div id="page-content" key="DHLE-7">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">UK Graduates</h3>
            <h5 className="text-muted text-normal">graduates that applied whilst living in the UK.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGraph('Undergraduate Location by gender',
              'dlhe-like-7-1',
              'UGUKLocationsGender',
              )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGraph('Postgraduate Location by gender',
              'dlhe-like-7-2',
              'MastersUKLocationsGender',
              )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGraph('Doctorate Location by gender',
              'dlhe-like-7-3',
              'DoctorateUKLocationsGender',
              )}
          </div>
        </div>
      </div>
    );
    return content;
  }

  getData(keyName, type) {
    let options = {};
    const data = [{ name: 'Male', data: [] }, { name: 'Female', data: [] }, { name: 'Other', data: [] }];
    const axisData = { y: [], x: '' };

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === keyName) {
          if (type === 'percentages') {
            this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][type], 'percentage');
            this.dividePercentOverElements(this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][type]);
          } else this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][type], 'length');

          this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][type].forEach((element) => {
            axisData.y.push(element.location);
            element.data.forEach((value) => {
              data.forEach((elem) => {
                if (value.gender === elem.name) {
                  if (type === 'percentages') elem.data.push(value.percentage);
                  else elem.data.push(value.length);
                }
              });
            });
          });
          options = drawNewBarChart(axisData, data);
        }
      });
    }

    return options;
  }

  getAllUniqueName(dataArr, type) {
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
              if (key === uniqueKey) element.data.splice(i, 0, { gender: key, [type]: 0 });
            });
          }
        });
      }
    });

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
      <div className="container" key="transaction-dhle-7">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/dlhe-like/7"
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
