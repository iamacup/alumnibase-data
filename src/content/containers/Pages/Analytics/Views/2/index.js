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

  getOptions1() {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'Strongly agree', data: [20, 16, 14, 12, 10] },
      { name: 'Agree', data: [20, 16, 14, 12, 10] },
      { name: 'Neither agree or disagree', data: [40, 44, 44, 44, 40] },
      { name: 'Disagree', data: [10, 12, 14, 16, 20] },
      { name: 'Strongly disagree', data: [10, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries);

    return options;
  }

  getOptions2() {
    const option = {
      x: 'Age',
      y: 'Average Response',
    };

    const age = [];
    const first = [];
    const plotted = [];

    const start = 9.1;
    const end = 5.6;

    const firstAge = 21;
    const lastAge = 61;

    let current = start;
    const increment = (start - end) / (lastAge - firstAge);

    for (let a = firstAge; a < lastAge; a++) {
      age.push(a);
      first.push(Number(current.toPrecision(2)));

      current -= increment;
    }

    plotted.push(first);

    const data = {
      age,
      plotted,
      name: ['test'],
    };

    const options = drawLineChart(data, option);

    return options;
  }

  getTabbed(title, id, options, dataObj) {
    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={dataObj.collapsed}
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
                  reactData: dataObj.data.map((element, i) => drawPercentRow(dataObj.titles[i], element, true)),
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
                  options,
                },
              },
            },
          ]}
      seperator
    />);

    return panel;
  }

  getData(item, collapsed) {
    const titles = [];
    const data = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload)  && dNc(this.props.reduxState_fetchDataTransaction.default.payload.allData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.allData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach((value) => {
            titles.push(value.value);
            data.push(value.percentage);
          });
        }
      });
    }

    return { titles, collapsed, data };
  }

  getTrends(item, chart) { 
        let options = null;

  if (chart === 'bar') {

  const axisData = {y: [], x: '%'};
  let dataSeries = [{name: 'Strongly agree', data: []}, {name: 'Agree', data: []}, {name: 'Neither agree or disagree', data: []}, {name: 'Disagree', data: []}, {name: 'Strongly disagree', data: []}];

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach((elem) => {
            const str = elem.yearGroupEnd + '';
            axisData['y'].push(elem.yearGroupStart +'-'+ str.slice(2));

            elem.data.data.forEach((value, i) => {
 
            dataSeries.forEach((val) => {
              if (value.value === val.name) {
                val.data.push(value.percentage.toFixed(2))
                }
              })
            })
          })
        }
      })
    }
    options = drawNewBarChart(axisData, dataSeries);

  } else if (chart === 'line') {

    const optionsObj = { x: 'Scale', y: 'Average Response'}
    const data = {
      age: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      name: [],
      plotted: [],
    };

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach(elem => {
          const str = elem.yearGroupEnd + '';
          data.name.push(elem.yearGroupStart + '-' + str.slice(2))

        const arr = [];
        elem.data.data.forEach((value, i) => {
              arr[+value.value] = value.percentage;
          })
          data.plotted.push(arr);
          })
        }
      })
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
              this.getTrends('currentWorkFitsWithFuturePlans', 'bar'),
              this.getData('currentWorkFitsWithFuturePlans', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('My current work is meaningful and important to me',
              'view-3-2',
              this.getTrends('currentWorkMeaningfulAndImportant', 'bar'),
              this.getData('currentWorkMeaningfulAndImportant', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how satisfied are you with your life now',
              'view-3-3',
              this.getTrends('lifeSatisfaction', 'line'),
              this.getData('lifeSatisfaction', false))}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, to what extent do you feel the things you do in your life are worthwhile',
              'view-3-4',
              this.getTrends('lifeWorthwhile', 'line'),
              this.getData('lifeWorthwhile', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how happy did you feel yesterday',
              'view-3-5',
              this.getTrends('lifeHappy', 'line'),
              this.getData('lifeHappy', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how anxious did you feel yesterday',
              'view-1-5',
              this.getTrends('lifeAnxious', 'line'),
              this.getData('lifeAnxious', false))}
          </div>
        </div>


      </div>
    );


    return content;
  }

  render() {
    let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished) {
      content = this.getContent();
    }

    const sendData = { data: [] };


    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData.data.push({ [key]: this.props.filterData[key] });
      }
    });

    const dataTransaction = (
      <FetchData
        active
        key="transaction-2"
        fetchURL="/api/analytics/views"
        sendData={sendData}
      />
    );

    const output = [dataTransaction, content];

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
