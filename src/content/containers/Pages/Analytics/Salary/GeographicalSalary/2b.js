
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import drawUKMap from '../../../../../../content/scripts/custom/echarts/drawUkMap';
import { gradsComeFromData, gradsGoToData } from './UKGradData';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'geo-local';
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
          name: 'Alumni Destinations',
          link: '/analytics/destinations/2',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getMap() {
    const pieces1 = ['0%', '2%', '4%', '6%', '8%', '10% of Grads'].map((element, i) => ({ max: i + 0.1, label: element, min: i }));
    const pieces2 = ['0%', '2%', '4%', '6%', '8%', '10% of Grads'].map((element, i) => ({ max: i + 0.1, label: element, min: i }));

    const options1 = drawUKMap(gradsComeFromData, pieces1);
    const options2 = drawUKMap(gradsGoToData, pieces2);

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
                  options: options1,
                },
              },
            },
            {
              title: 'Constituency of Residence',
              active: false,
              preContent: <p><strong>Use the mouse wheel to scroll, click and drag to move the map. You can also filter the results by clicking on them in the legend.</strong></p>,
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
        <div className="row" style={{ marginTop: '200px'}}>
          <div className="col-1">
              <BasicPanel
                content={
                <FetchData
                  active
                  fetchURL="/api/analytics/destination/2"
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
