
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

  getContent() {
    const lineData = {
      name: ['Social Studies', 'Mathematical Sciences', 'Arts & Humanities'],
      age: ['1 Year', '5 Years', '10 Years', '20 Years'],
      plotted: [
        [79, 85, 84, 87],
        [56, 65, 76, 87],
        [90, 76, 54, 32],
      ],
    };

    const lineOptions = {
      value: false,
    };

    const lineTitles = { x: ['Years After Graduating'], y: ['% of Graduates in Highly Skilled', 'professions (SOC1 - 3)'] };
    const rawData = [{ data: [25000, 26000, 27000, 28000], name: '1 Year' }, { data: [50000, 55000, 60000, 70000], name: '10 Years' }];
    const names = rawData.map(element => element.name);
    const titles = ['Mathematical Sciences', 'Arts & Humanities', 'Law', 'Engineering & Technology'];

    const lineChartData = drawLineChart(lineData, lineOptions, lineTitles);
    const mixGraphData = drawMixGraph(rawData, names, titles);

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
              title=""
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
                             options: lineChartData,
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
                      options: mixGraphData,
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


    const sendData = { data: [] };


    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData.data.push({ [key]: this.props.filterData[key] });
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
                  fetchURL="/api/analytics/subjects/3"
                  sendData={sendData}
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
