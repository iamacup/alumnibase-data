import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';
import drawHeatMap from '../../../../../../content/scripts/custom/echarts/drawHeatMap';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-9';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 9 - Geographical Destinations of Employment',
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
          name: 'RQ 9 - Geographical Destinations of Employment',
          link: '/analytics/dlhe-like/9',
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

  getHeatMap(title, globalID) {
    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].UKMovement[0].schoolLocation.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].UKMovement[0].currentLocation.length > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
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
                    height: '600px',
                    data: {
                      options: this.getData('UKMovement'),
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
      <div id="page-content" key="DHLE-9">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Destination of Employment</h3>
            <h5 className="text-muted text-normal">Destination for graduates after leaving university.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">

            {this.getHeatMap('Graduate Destinations after University', 'DHLE-9-1')}

          </div>
        </div>
      </div>
    );

    return content;
  }

  getData(type) {
    let options = {};
    const axisData = {
      yAxis: ['Channel\nIslands', 'East\nEngland', 'East\nMidlands', 'East\nof\nEngland', 'Greater\nLondon', 'Isle\nof\nMan', 'Non-geographic', 'North\nEast', 'North\nWest', 'Northern\nIreland', 'Scotland', 'South\nEast', 'South\nWest', 'Wales', 'West\nMidlands', 'Other'],
      xAxis: ['Channel\nIslands', 'East\nEngland', 'East\nMidlands', 'East\nof\nEngland', 'Greater\nLondon', 'Isle\nof\nMan', 'Non-geographic', 'North\nEast', 'North\nWest', 'Northern\nIreland', 'Scotland', 'South\nEast', 'South\nWest', 'Wales', 'West\nMidlands', 'Other'],
    };
    const data = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === type && key === 'UKMovement') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key][0].schoolLocation.forEach((element) => {
            const index = axisData.yAxis.indexOf(element.region.split(' ').join('\n'));
            axisData.yAxis.push(element.region.split(' ').join('\n'));
            data.push([index, 0, element.length]);
          });
          this.props.reduxState_fetchDataTransaction.default.payload[0][key][0].currentLocation.forEach((element, i) => {
            axisData.xAxis.push(element.region);
            data[i][1] = axisData.xAxis.indexOf(element.region.split(' ').join('\n'));
            data[i][2] += element.length;
          });

          options = drawHeatMap(axisData, data);
        }
      });
    }

    return options;
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
      <div className="container" key="transaction-dhle-8">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/dlhe-like/9"
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
