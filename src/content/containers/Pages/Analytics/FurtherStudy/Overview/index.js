
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import drawPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'further-study';
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
    const obj = {
      direction: 'vertical',
      value: '',
    };
    const titles = { 1: ['Stayed at the same Uni', 'Moved to a Different Uni'], 2: ['Related', 'Not Related'] };
    const data = { 1: [{ name: '', data: [45, 55] }], 2: [{ name: '', data: [75, 25] }] };
    const options = drawGroupedBarChart(titles[1], data[1], obj);
    const options2 = drawGroupedBarChart(titles[2], data[2], obj);

    const progressBarData = [
      { name: 'King\'s College London (KCL)', percentage: [62] },
      { name: 'University of Manchester', percentage: [58] },
      { name: 'University College London (UCL)', percentage: [53] },
      { name: 'University of Bristol', percentage: [47] },
      { name: 'University of Warwick', percentage: [41] },
      { name: 'University od Durham', percentage: [39] },
      { name: 'University of Edinburgh', percentage: [36] },
      { name: 'University of York', percentage: [27] },
      { name: 'University of Leeds', percentage: [25] },
      { name: 'Lancaster University', percentage: [21] },
    ];
    const progressBarOption = progressBarData.map(element => drawPercentRow(element.name, element.percentage, true));

    const uniName = this.props.location.pathname.split('/')[1];

    const content = (
      <div id="page-content" key="fs-overview">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Further Study Trends</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <div className="row">
              <div className="col-md-8 col-md-push-2">

                <TabbedGraphPanel
                  title={`Further Study Among Graduates from ${uniName}`}
                  globalID="further-study-overview-1"
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
                      options: this.getData('thisUniPGSplit'),
                    },
                  },
                },
              ]}
                  seperator
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TabbedGraphPanel
                  title={<div><p>Further Study University Destination</p><h4 style={{ color: 'red' }}>NO DATA</h4></div>}
                  globalID="further-study-overview-2"
                  content={[
            {
              title: 'stay/go',
              preContent: <p>Percentage of Graduates who Stayed at their Original<br />University to Further Study.</p>,
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
                  options,
                },
              },
            },
          ]}
                  seperator
                />
              </div>
              <div className="col-md-6">
                <TabbedGraphPanel
                  title={<div><p>Further Study Relevance to Undergraduate</p><h4 style={{ color: 'red' }}>NO DATA</h4></div>}
                  globalID="further-study-overview-2"
                  content={[
            {
              title: 'stay/go',
              preContent: <p>Percentage of Graduates who went on to Study<br />Something Related to their Undergraduate.</p>,
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
                  options: options2,
                },
              },
            },
          ]}
                  seperator
                />
              </div>
            </div>
            <TabbedGraphPanel
              title={<div><p>Top 10 Destinations for Further Study to an Alternate University</p><h4 style={{ color: 'red' }}>NO DATA</h4></div>}
              globalID="subject-first-job-1"
              content={[
          {
            title: 'Average Salary',
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
                reactData: progressBarOption,
              },
            },
          },
          ]}
            />
          </div>
        </div>
      </div>
    );

    return content;
  }

  getData(name) {
    let options = {};
    const data = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === name && key === 'thisUniPGSplit') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            data.push({ value: element.type, percent: element.percent });
          });
          options = drawPieChart(data, false, 'pie', false);
        }
      });
    }
    return options;
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
      <div className="container" key="transaction-further-study">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/further-study/overview"
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
