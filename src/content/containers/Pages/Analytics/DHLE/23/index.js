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
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 2 - Graduates and What they Are Doing',
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
          name: 'RQ 2/3 - Graduates and What they Are Doing',
          link: `/${uni}/analytics/dlhe-like/2-3`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGraph(title, id, percentageName, absoluteName, postContent = null) {
    // const axisData = { y: titles, x: '' };
    // const dataSeries = [
    //   { name: set1Name, data: set1 },
    //   { name: set2Name, data: set2 },
    // ];

    // const preFinalSet1 = [];
    // const preFinalSet2 = [];

    // for (let a = 0; a < set1.length; a++) {
    //   const total = set1[a] + set2[a];

    //   preFinalSet1.push(Math.round((set1[a] / total) * 100));
    //   preFinalSet2.push(Math.round((set2[a] / total) * 100));
    // }

    // const axisDataPercentage = { y: titles, x: '%' };
    // const dataSeriesPercentage = [
    //   { name: set1Name, data: preFinalSet1 },
    //   { name: set2Name, data: preFinalSet2 },
    // ];

    // // this is the absolute numbers
    // const options1 = drawNewBarChart(axisData, dataSeries);

    // // this is the percentage numbers
    // const options2 = drawNewBarChart(axisDataPercentage, dataSeriesPercentage);

    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={false}
      content={[
            {
              title: <i className="far fa-percent" />,
              active: true,
              postContent,
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
                  options: this.getData(percentageName),
                },
              },
            },
            {
              title: <i className="far fa-hashtag" />,
              active: false,
              postContent,
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
                  options: this.getData(absoluteName),
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
      <div id="page-content" key="DHLE-23">

        <StandardFilters />

        <h3 className="text-main text-normal text-2x mar-no">Post University Activity</h3>
        <h5 className="text-muted text-normal">Each graph displays the employment status of past Alumni, for both Post Graduate courses and first time degrees. Click through the tabs to see the data displayed as percentages or raw numbers.</h5>
        <hr className="new-section-xs" />

        <div className="row">
          <div className="col-md-6">
            {this.getGraph('Employment Activity of Post Gradutes',
              'dlhe-like-23-1',
              'PGActivityPercentageSplit',
              'PGActivityAbsoluteSplit')}
          </div>

          <div className="col-md-6">
            {this.getGraph('Employment Activity of First Degree',
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
          // {    <div>
          //                 <h6>* full-time further study, training or research</h6>
          //                 <h6>** part-time further study, training or research</h6>
          //                </div>}
              )}
          </div>

          <div className="col-md-6">
            {this.getGraph('Most Important Activity First Degree FT / PT',
              'dlhe-like-23-4',
              'UGMostImportantActivityPercentageSplit',
              'UGMostImportantActivityAbsoluteSplit',
              // / <div>
              //   <h6>* full-time further study, training or research</h6>
              //   <h6>** part-time further study, training or research</h6>
              // </div>
              )
          }
          </div>
        </div>

      </div>
    );

    return content;
  }

  getData(name) {
    let options = null;
    const data = { axisData: { y: [], x: '' }, dataSeries: [{ name: 'Full Time', data: [] }, { name: 'Part Time', data: [] }] };


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key.startsWith('PG') && key === name) {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            console.log(element.graduateDestination);
            data.axisData.y.push('1'); // should be pushing element.graduateDestination, but there needs to be something in place for long titles.
            element.data.forEach((elem) => {
              data.dataSeries.forEach((value) => {
                if (value.name === elem.courseFTPT) value.data.push(elem.value);
              });
            });
          });
          options = drawNewBarChart(data.axisData, data.dataSeries);
        } else if (key.startsWith('UG') && key === name) {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            data.axisData.y.push('1');
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
      <div className="container" key="transaction-dhle-23">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/dlhe-like/2-3"
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
