import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawAreaChart from '../../../../../../content/scripts/custom/echarts/drawAreaChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-4';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 4 - Full Time Graduate Destinations',
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
          name: 'RQ 4 - Full Time Graduate Destinations',
          link: `/${uni}/analytics/dlhe-like/4`,
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

  getGraph() {
    const panel = (<TabbedGraphPanel
      title="Destinations of Graduates from Full Time Study per age"
      globalID="DHLE-4-1"
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
                  options: this.getData('destinations'),
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
      <div id="page-content" key="DHLE-4">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Destinations</h3>
            <h5 className="text-muted text-normal">Destinations of graduates after leaving university.</h5>
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

  getData(type) {
    // x-axis labels.
    let options;
    const titles = [];
    const data = [
      { name: 'Doing something else', data: [] },
      { name: 'Due to start a job in the next month', data: [] },
      { name: 'Engaged in full-time further study', data: [] },
      { name: 'Engaged in part-time further study', data: [] },
      { name: 'Taking time out in order to travel', data: [] },
      { name: 'Unemployed', data: [] },
      { name: 'Working full-time', data: [] },
      { name: 'Working part-time', data: [] },
    ];


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === type && key === 'destinations') {
          this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            titles.push(element.yearGroupStart + '-' + element.yearGroupEnd.toString().slice(2));
            let total = 0;
            element.data.forEach((value) => { total += value.length; });
            element.data.forEach((value) => {
              data.forEach((elem) => {
                if (value.graduateDestinationMostImportant.startsWith(elem.name)) elem.data.push((value.length / total) * 100);
              });
            });
          });
          options = drawAreaChart(data, titles);
        }
      });
    }
    return options;
  }

  getAllUniqueName(dataArr) {
    const uniqueKeys = [];

    dataArr.forEach((element) => {
      element.data.forEach((elem) => {
        if (!uniqueKeys.includes(elem.graduateDestinationMostImportant)) uniqueKeys.push(elem.graduateDestinationMostImportant);
      });
    });

    dataArr.forEach((element) => {
      if (element.data.length < uniqueKeys.length) {
        const keysInBreakdown = element.data.map(elem => elem.graduateDestinationMostImportant);

        uniqueKeys.forEach((key) => {
          if (!keysInBreakdown.includes(key)) {
            uniqueKeys.forEach((uniqueKey, i) => {
              if (key === uniqueKey) element.data.splice(i, 0, { graduateDestinationMostImportant: key, length: 0 });
            });
          }
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
      <div className="container" key="transaction-dhle-4">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/dlhe-like/4"
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
