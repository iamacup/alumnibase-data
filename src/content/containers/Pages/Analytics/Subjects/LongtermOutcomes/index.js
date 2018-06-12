
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';
import drawMixGraph from '../../../../../../content/scripts/custom/echarts/drawMixGraph';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'subjects-longterm';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Further Study Overview',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'Further Study',
          link: `/${uni}/analytics/further-study`,
        },
        {
          name: 'Overview',
          link: `/${uni}/analytics/further-study/overview`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getData(type) {
    let options = null;

    const line = {
      lineOptions: { value: false },
      lineTitles: { x: ['Years After Graduating'], y: ['% of Graduates in Highly Skilled', 'professions (SOC1 - 3)'] },
      lineData: {
        name: ['Social Studies', 'Mathematical Sciences', 'Arts & Humanities'],
        age: ['1 Year', '5 Years', '10 Years', '20 Years'],
        plotted: [[79, 85, 84, 87], [56, 65, 76, 87], [90, 76, 54, 32],
        ],
      },
    };

    const mix = {
      rawData: [],
      names: [],
      titles: [],
    };

    const percentChange = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === 'line') {
          options = drawLineChart(line.lineData, line.lineOptions, line.lineTitles); // top graph data needs to be done!
        } else if (type === 'salaryChangeTime' && key === type) {
          this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((elem) => {
            mix.names.push(elem.name);
            mix.titles = elem.data.map(value => value.subjectType);
            const data = { data: [], name: elem.name };
            elem.data.forEach((value) => {
              data.data.push(value.averageSalary);
            });
            mix.rawData.push(data);
          });
          const changeSalary = mix.rawData[0].data;

          mix.rawData[1].data.forEach((elem, i) => {
            if (elem > changeSalary[i]) {
              const increase = elem - changeSalary[i];
              percentChange[i] = ((increase / changeSalary[i]) * 100).toFixed();
            }
            if (elem < changeSalary[i]) {
              const decrease = changeSalary[i] - elem;
              percentChange[i] = ((decrease / changeSalary[i]) * 100).toFixed();
            }
          });
          options = drawMixGraph(mix.rawData, mix.names, mix.titles, percentChange);
        }
      });
    }

    return options;
  }

  getAllUniqueNames(dataArr) {
    const uniqueKeys = [];

    dataArr.forEach((element) => {
      element.data.forEach((elem) => {
        if (!uniqueKeys.includes(elem.subjectType)) uniqueKeys.push(elem.subjectType);
      });
    });

    dataArr.forEach((element) => {
      if (element.data.length < uniqueKeys.length) {
        const keysInBreakdown = element.data.map(elem => elem.subjectType);

        uniqueKeys.forEach((key) => {
          if (!keysInBreakdown.includes(key)) {
            if (key === 'Arts, Humanities & Social Sciences') element.data.splice(0, 0, { subjectType: key, averageSalary: 0 });
            if (key === 'Law') element.data.splice(1, 0, { subjectType: key, averageSalary: 0 });
            if (key === 'Mathematical Sciences') element.data.splice(2, 0, { subjectType: key, averageSalary: 0 });
            if (key === 'Medicine & Vetinary Medicine') element.data.splice(3, 0, { subjectType: key, averageSalary: 0 });
            if (key === 'Other (PG / Research)') element.data.splice(4, 0, { subjectType: key, averageSalary: 0 });
          }
        });
      }
    });
    return dataArr;
  }

  getContent() {
    const content = (
      <div id="page-content" key="subjects-longterm">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Subjects - Longterm Outcomes</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <TabbedGraphPanel
              title={<p style={{ color: 'red' }}>NEED TO INFER</p>}
              globalID="stem-overview-2"
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
                           height: '400px',
                           data: {
                             options: this.getData('line'),
                           },
                         },
                       },
                     ]}
              seperator
            />

            <TabbedGraphPanel
              title="Change in Salary between 1 Year After Graduating"
              globalID="tuesday-graphs-2"
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
                    height: '400px',
                    data: {
                      options: this.getData('salaryChangeTime'),
                    },
                  },
                },
              ]}
              seperator
            />
          </div>
        </div>
      </div>
    );
    return content;
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
      <div className="container" key="transaction-subjects-longterm">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/subjects/long-term-outcomes"
                  sendData={{ filterData: sendData}}
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
