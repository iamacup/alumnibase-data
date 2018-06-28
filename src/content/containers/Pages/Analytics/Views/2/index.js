import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';
import drawPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';
import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'views';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Views on Overall Happiness',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Views',
          link: '/analytics/views',
        },
        {
          name: 'Views on Overall Happiness',
          link: '/analytics/views/2',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getTabbed(title, id, collapse, trends, data) {
    let panel = null;
    let allData = false;
    let timeSeriesData = false;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      if (this.props.reduxState_fetchDataTransaction.default.payload.allData.length > 0) allData = true;
      if (this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.length > 0) timeSeriesData = true;

      if (allData && timeSeriesData) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={id}
          collapsed={collapse}
          content={[
            {
              title: 'Overall',
              postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
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
                  reactData: this.getData(data[0], data[1]),
                },
              },
            },
            {
              title: 'Trends',
              active: false,
              postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '300px',
                data: {
                  options: this.getTrends(trends[0], trends[1]),
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

  getData(item, type) {
    const titles = [];
    const data = [];
    const agree = ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'];

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.allData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.allData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach((value) => {
            let index = null;
            if (type === 'agree') index = agree.indexOf(value.value);
            else index = +value.value;

            titles[index] = (value.value);
            data[index] = (value.percentage);
          });
        }
      });
    }

    return data.map((element, i) => drawPercentRow(titles[i], element, true));
  }

  getTrends(item, chart) {
    let options = null;

    if (chart === 'bar') {
      const axisData = { y: [], x: '%' };
      const dataSeries = [{ name: 'Strongly agree', data: [] }, { name: 'Agree', data: [] }, { name: 'Neither agree or disagree', data: [] }, { name: 'Disagree', data: [] }, { name: 'Strongly disagree', data: [] }];

      if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
        this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
          if (item === element.item) {
            this.dividePercentOverElements(element.data);
            element.data.forEach((elem) => {
              const str = elem.yearGroupEnd + '';
              axisData.y.push(elem.yearGroupStart + '-' + str.slice(2));

              elem.data.data.forEach((value) => {
                dataSeries.forEach((val) => {
                  if (value.value === val.name) {
                    val.data.push(value.percentage);
                  }
                });
              });
            });
          }
        });
      }
      options = drawNewBarChart(axisData, dataSeries);
    } else if (chart === 'line') {
      const optionsObj = { x: 'Scale', y: 'Average Response' };
      const data = {
        age: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        name: [],
        plotted: [],
      };

      if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
        this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
          if (item === element.item) {
            element.data.forEach((elem) => {
              const str = elem.yearGroupEnd + '';
              data.name.push(elem.yearGroupStart + '-' + str.slice(2));

              const arr = [];
              elem.data.data.forEach((value) => {
                arr[+value.value] = value.percentage;
              });
              data.plotted.push(arr);
            });
          }
        });
      }
      options = drawLineChart(data, optionsObj);
    }

    return options;
  }

  getContent() {
    const content = (
      <div id="page-content" key="content-2">

        <StandardFilters />

        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <BasicPanel
              content={
                <p>
                  Data from section 5 of the respondent survey is collated here. <strong>Overall Life</strong> is not directly related to the university degree, but indicates the general state of the survey respondents.
                </p>
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('My current work fits with my future plans',
              'view-3-1',
              false,
              ['currentWorkFitsWithFuturePlans', 'bar'],
              ['currentWorkFitsWithFuturePlans', 'agree'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('My current work is meaningful and important to me',
              'view-3-2',
              false,
              ['currentWorkMeaningfulAndImportant', 'bar'],
              ['currentWorkMeaningfulAndImportant', 'agree'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how satisfied are you with your life now',
              'view-3-3',
              false,
              ['lifeSatisfaction', 'line'],
              ['lifeSatisfaction'])}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, to what extent do you feel the things you do in your life are worthwhile',
              'view-3-4',
              false,
              ['lifeWorthwhile', 'line'],
              ['lifeWorthwhile'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how happy did you feel yesterday',
              'view-3-5',
              false,
              ['lifeHappy', 'line'],
              ['lifeHappy'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how anxious did you feel yesterday',
              'view-1-5',
              false,
              ['lifeAnxious', 'line'],
              ['lifeAnxious'])}
          </div>
        </div>


      </div>
    );


    return content;
  }

  dividePercentOverElements(dataArr) {
    let remainder;

    dataArr.forEach((element) => {
      let count = 0;
      element.data.data.forEach((elem) => {
        count += elem.percentage;
      });

      if (count > 100) {
        remainder = count - 100;
        element.data.data.forEach((elem) => {
          elem.percentage -= (elem.percentage / 100) * remainder; // eslint-disable-line no-param-reassign
        });
      } else if (count < 100) {
        remainder = 100 - count;
        element.data.data.forEach((elem) => {
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
    }

    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
      }
    });

    const dataTransaction = (
      <div className="container" key="transaction-2">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/views"
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
