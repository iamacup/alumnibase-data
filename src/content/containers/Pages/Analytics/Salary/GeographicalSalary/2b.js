
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import drawUKMap from '../../../../../../content/scripts/custom/echarts/drawUkMap';
import ukData from '../../../../../../content/scripts/custom/echarts/ukData';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'regional';
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
          name: 'Alumni Destinations',
          link: `/${uni}/analytics/destinations/2`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getMap() {
    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Graduate Destinations"
        globalID="salary-geo-2b-1"
        content={[
            {
              title: 'Constituency Origin',
              active: true,
              preContent: <p><strong>Use the mouse wheel to scroll, click and drag to move the map. You can also filter the results by clicking on them in the legend.</strong></p>,
              postContent: this.getData('constituencyOfOrigin').table,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '650px',
                data: {
                  options: this.getData('constituencyOfOrigin').options,
                },
              },
            },
            {
              title: 'Constituency of Residence',
              active: false,
              preContent: <p><strong>Use the mouse wheel to scroll, click and drag to move the map. You can also filter the results by clicking on them in the legend.</strong></p>,
              postContent: this.getData('constituencyOfResidence').table,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '650px',
                data: {
                  options: this.getData('constituencyOfResidence').options,
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
    let table = null;
    const data = [];
    const tableData = [];
    let max = 0;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (key === type && key === 'constituencyOfOrigin') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            // table data is the data that comes from the backend that isn't supported in coordinates in the backend.
            // It will be displayed in the postContent of the tab.

            if (Object.values(ukData).includes(element.constituencyName)) data.push({ name: element.constituencyName, value: element.length });
            else tableData.push(`${element.constituencyName} - ${element.length} People`);

            // setting the largest number in the data to the max, so that each legend can be set to the right percentage of people.
            if (element.length > max) max = element.length;
          });

          // setting the legends.
          // max is calculated by finding the percentage needed, ie the first legend will be 1/6th and the last will be 100%, so using the length of the array. Then the normal percent of the max number is found.
          // min is calculated the same way, but instead when finding the initial percentage of each item in the array, the index is used to find the percentage before. so if i = 0 i * 10 will be 0, but (i+1)*10 = 10, the first being the min calculations, and the second is the max calculations.
          const pieces1 = ['0%', '2%', '4%', '6%', '8%', '10% of Grads'].map((element, i) => ({ max: +(((((100 / 6) * (i + 1)) / 100) * max).toFixed()), label: element, min: +(((((100 / 6) * i) / 100) * max).toFixed()) }));
          options = drawUKMap(data, pieces1);
        } else if (key === type && key === 'constituencyOfResidence') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            if (Object.values(ukData).includes(element.constituencyName)) data.push({ name: element.constituencyName, value: element.length });
            else tableData.push(`${element.constituencyName} - ${element.length} People`);

            max += element.length;
          });
          const pieces2 = ['0%', '2%', '4%', '6%', '8%', '10% of Grads'].map((element, i) => ({ max: +(((((100 / 6) * (i + 1)) / 100) * max).toFixed()), label: element, min: +(((((100 / 6) * i) / 100) * max).toFixed()) }));
          options = drawUKMap(data, pieces2);
        }
      });
    }

    if (tableData.length > 0) {
      table = (
        <div style={{ marginTop: '10px' }}>
          <p>Constituencies that are too small to display on the map:</p>
          {tableData.map(element => (
            <p>{element}</p>
                ))}
        </div>
      );
    }

    return { options, table };
  }

  getContent() {
    const content = (
      <div id="page-content" key="geo-local">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Breakdown of Alumni by location</h3>
            <h5 className="text-muted text-normal">Both past and present - this only includes alumni that were born in the uk, or are currently in the UK respectively.</h5>
            <hr className="new-section-xs" />
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
      <div className="container" key="transaction-geo-local">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/destination/regional"
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
