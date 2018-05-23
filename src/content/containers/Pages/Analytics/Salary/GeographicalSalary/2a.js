
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import drawWorldMap from '../../../../../../content/scripts/custom/echarts/drawWorldMap';
import worldMapData from '../../../../../../content/scripts/custom/echarts/worldMapData';
import drawNewPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'geo-global';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Graduate Salaries',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Salary',
          link: '/analytics/salary',
        },
        {
          name: 'Graduate Salaries',
          link: '/analytics/salary/2',
        },
        {
          name: 'Geographical Views',
          link: '/analytics/destinations/1',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }
  getOriginGraph() {
    const data = [
      { value: 'EU', percent: 40 },
      { value: 'Non-EU', percent: 30 },
      { value: 'UK', percent: 30 },
    ];

    const options = drawNewPieChart(data, false, 'pie', false);

    // the actual panel stuff
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
                  options,
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
    const data = [
      { value: 'EU', percent: 20 },
      { value: 'Non-EU', percent: 30 },
      { value: 'UK', percent: 50 },
    ];

    const options = drawNewPieChart(data, true, 'doughnut', true);

    // the actual panel stuff
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
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );
    return panel;
  }

  getMap() {
    // area chart stuff
    const propsDataOne = [{ name: 'United States of America', value: 60000 }, { name: 'United Kingdom', value: 60000 }, { name: 'Zimbabwe', value: 20 }, { name: 'South Africa', value: 50 }, { name: 'India', value: 8000 }, { name: 'Italy', value: 109550 }, { name: 'Germany', value: 900 }, { name: 'Canada', value: 679 }, { name: 'France', value: 67468 }, { name: 'Spain', value: 674 }, { name: 'China', value: 67468 }, { name: 'Australia', value: 679 }];
    const propsDataTwo = [{ name: 'United States of America', value: 10 }, { name: 'United Kingdom', value: 60000 }, { name: 'India', value: 4000 }, { name: 'Italy', value: 2000 }, { name: 'Germany', value: 3000 }, { name: 'Canada', value: 8000 }, { name: 'France', value: 7000 }, { name: 'Spain', value: 3050 }, { name: 'China', value: 3000 }, { name: 'Australia', value: 6000 }];

    const data1 = propsDataOne.map(element => ({
      code: worldMapData[element.name].code, name: element.name, value: element.value, color: worldMapData[element.name].color,
    }));

    const data2 = propsDataTwo.map(element => ({
      code: worldMapData[element.name].code, name: element.name, value: element.value, color: worldMapData[element.name].color,
    }));

    const options1 = drawWorldMap(data1, 'map', 'People');
    const options2 = drawWorldMap(data2, 'map', 'People');

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Detailed Country Breakdown for Graduate Origins and Destinations"
        globalID="salary-geo-2a-1"
        content={[
            {
              title: 'Country of Origin',
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
                  options: options1,
                },
              },
            },
            {
              title: 'Current Country of Residence',
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
                  options: options2,
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
      <div id="page-content">

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

    // const dataTransaction = (
    //   <FetchData
    //     key="transaction-geo-global"
    //     active
    //     fetchURL="/api/analytics/destination/1"
    //     sendData={sendData}
    //   />
    // );

    const output = [
    // dataTransaction, 
    content
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
