
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawStackedBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'jobs';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Further Study Overview',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Further Study',
          link: '/analytics/further-study',
        },
        {
          name: 'Overview',
          link: '/analytics/further-study/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getData(yearGroup) {
    const axisData = { y: [], x: '' };
    const data = [{ name: 'Employment', data: [] }, { name: 'Further Study', data: [] }, { name: 'Other', data: [] }, { name: 'Unemployed', data: [] }];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].overview.forEach((element) => {
        if (element.yearGroup === yearGroup) {
          element.data.forEach((value) => {
            this.getAllUniqueNames(element.data);

            axisData.y.push(value.subject);

            let count = 0;
            value.breakdown.forEach((elem) => {
              count += elem.percent;
            });

            if (count !== 100) this.dividePercentOverElements(value.breakdown, count);

            value.breakdown.forEach((elem) => {
              data.forEach((name) => {
                if (elem.value === name.name) {
                  name.data.splice(axisData.y.indexOf(value.subject), 0, elem.percent);
                }
              });
            });
          });
        }
      });
    }

    const options = drawStackedBarChart(axisData, data);
    return options;
  }

  getGraph() {
    let panel = null;
    let firstYear = false;
    let secondYear = false;
    let thirdYear = false;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].overview.length > 0) {
        this.props.reduxState_fetchDataTransaction.default.payload[0].overview.forEach((elem) => {
          if (elem.yearGroup === 2015) thirdYear = true;
          if (elem.yearGroup === 2016) secondYear = true;
          if (elem.yearGroup === 2017) firstYear = true;
        });
      }

      if (firstYear && secondYear && thirdYear) {
        panel = (<TabbedGraphPanel
          title="Status of graduates according to subject area over time "
          globalID="tuesday-graphs-3"
          content={[
                {
                  title: 'First Year',
                  preContent: <p>% of Graduates, withing the first year after Graduating</p>,
                  active: true,
                  graphData: {
                    type: 'echarts',
                    tools: {
                      allowDownload: true,
                      seeData: false,
                      pinGraph: true,
                    },
                    width: '100%',
                    height: '400px',
                    data: {
                      options: this.getData(2017),
                    },
                  },
                },
                {
                  title: 'Second Year',
                  preContent: <p>% of Graduates, withing the second year after Graduating</p>,
                  active: false,
                  graphData: {
                    type: 'echarts',
                    tools: {
                      allowDownload: true,
                      seeData: false,
                      pinGraph: true,
                    },
                    width: '100%',
                    height: '400px',
                    data: {
                      options: this.getData(2016),
                    },
                  },
                },
                {
                  title: 'Third Year',
                  preContent: <p>% of Graduates, withing the third year after Graduating</p>,
                  active: false,
                  graphData: {
                    type: 'echarts',
                    tools: {
                      allowDownload: true,
                      seeData: false,
                      pinGraph: true,
                    },
                    width: '100%',
                    height: '400px',
                    data: {
                      options: this.getData(2015),
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
      <div id="page-content" key="jobs-overview">

        <StandardFilters />


        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Job and Careers Overview</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGraph()}
          </div>
        </div>
      </div>
    );

    return content;
  }

  getAllUniqueNames(dataArr) {
    const uniqueKeys = [];

    dataArr.forEach((element) => {
      element.breakdown.forEach((elem) => {
        if (!uniqueKeys.includes(elem.value)) uniqueKeys.push(elem.value);
      });
    });

    dataArr.forEach((element) => {
      if (element.breakdown.length < uniqueKeys.length) {
        const keysInBreakdown = element.breakdown.map(elem => elem.value);

        uniqueKeys.forEach((key) => {
          if (!keysInBreakdown.includes(key)) {
            element.breakdown.push({ value: key, percent: 0 });
          }
        });
      }
    });
    return dataArr;
  }

  dividePercentOverElements(array, count) {
    let remainder = 100 - count;
    if (count > 100) remainder = count - 100;

    const percentages = [];

    array.forEach((element, i) => {
      percentages.push({ percentage: (element.percent / 100) * remainder, index: i });
    });

    percentages.forEach((elem) => {
      if (count < 100) {
        array[elem.index].percent += elem.percentage; // eslint-disable-line no-param-reassign
      } else {
        array[elem.index].percent -= elem.percentage; // eslint-disable-line no-param-reassign
      }
    });
    return array;
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

    // sendData.rend = Math.random();

    const dataTransaction = (
      <div className="container" key="transaction-jobs">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/jobs/overview"
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
