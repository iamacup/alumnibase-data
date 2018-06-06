
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import drawWorldMap from '../../../../../../content/scripts/custom/echarts/drawWorldMap';
import drawNewPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
import latlong from '../../../../../../content/scripts/custom/echarts/latitudes';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'global';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Graduate Salaries',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'Salary',
          link: `/${uni}/analytics/salary`,
        },
        {
          name: 'Graduate Salaries',
          link: `/${uni}/analytics/salary/2`,
        },
        {
          name: 'Geographical Views',
          link: `/${uni}/analytics/destinations/1`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }
  getOriginGraph() {
    const panel = (
      <TabbedGraphPanel
        title="Domicile of Origin"
        globalID="overview-2"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options: this.getData('countriesOfOriginSplit').options,
                },
              },
            },
          ]}
        seperator
      />
    );
    return panel;
  }

  getResidenceGraph() {
    const panel = (
      <TabbedGraphPanel
        title="Current Domicile"
        globalID="overview-2"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '250px',
                data: {
                  options: this.getData('countriesOfResidenceSplit').options,
                },
              },
            },
          ]}
        seperator
      />
    );
    return panel;
  }

  getData(type) {
    let options = null;
    const data = [];
    const tableData = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === type && key === 'countriesOfOrigin') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            if (dNc(latlong[element.data.metaData.code2])) {
              data.push({ code: element.data.metaData.code2, name: element.data.name, value: element.data.metaData.numeric });
            } else tableData.push(`${element.data.name} - ${element.data.metaData.numeric} People`);
            //setting tableData so that the backend data that the frontEnd doesn't have coordinates for gets collected.
          });
          options = drawWorldMap(data, 'map', 'People');
        } else if (key === type && key === 'countriesOfResidence') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            if (dNc(latlong[element.data.metaData.code2])) {
              data.push({ code: element.data.metaData.code2, name: element.data.name, value: element.data.metaData.numeric });
            } else tableData.push(`${element.data.name} - ${element.data.metaData.numeric} People`);
          });
          options = drawWorldMap(data, 'map', 'People');
        } else if (key === type && key === 'countriesOfOriginSplit') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            data.push({ value: element.uLocation, percent: element.length });
          });
          options = drawNewPieChart(data, false, 'pie', false);
        } else if (key === type && key === 'countriesOfResidenceSplit') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            data.push({ value: element.uLocation, percent: element.length });
          });
          options = drawNewPieChart(data, true, 'doughnut', true);
        }
      });
    }

    let table = null
    if(tableData.length > 0) {
      table = (
        <div style={{ marginTop: '10px' }}>
        <p>Places that are too small to display on the map:</p>
            {tableData.map(element => {
              return (
                <p>{element}</p>
                )
            })}
        </div>
        )
    }

    return { options, table };
  }

  getMap() {
    const panel = (
      <TabbedGraphPanel
        title="Detailed Country Breakdown for Graduate Origins and Destinations"
        globalID="salary-geo-2a-1"
        content={[
            {
              title: 'Country of Origin',
              active: true,
              postContent: this.getData('countriesOfOrigin').table,
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
                  options: this.getData('countriesOfOrigin').options,
                },
              },
            },
            {
              title: 'Current Country of Residence',
              active: false,
              postContent: this.getData('countriesOfResidence').table,
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
                  options: this.getData('countriesOfResidence').options,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getContent() {
    const content = (
      <div id="page-content" key="geo-global">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Breakdown of Alumni by location</h3>
            <h5 className="text-muted text-normal">Both past and present.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-md-push-2">
            {this.getOriginGraph()}
          </div>

          <div className="col-md-4 col-md-push-2">
            {this.getResidenceGraph()}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getMap()}
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
      <div className="container" key="transaction-geo-global">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/destination/global"
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
