
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'polar';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Campaign Overview',
      breadcrumbs: [
        {
          name: 'Campaign',
          link: `/${uni}/campaign`,
        },
        {
          name: 'Overview',
          link: `/${uni}/campaign/overview`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getData() {
    const columns = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];
    const rows = [];

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0].polarSubjectSalarySankey[0]).forEach((key) => {
        if (key === 'stage1') {
          this.props.reduxState_fetchDataTransaction.default.payload[0].polarSubjectSalarySankey[0][key].forEach((element) => {
            rows.push([element.col1, element.col2, element.weight]);
          });
        } else if (key === 'stage2') {
          this.props.reduxState_fetchDataTransaction.default.payload[0].polarSubjectSalarySankey[0][key].sort((a, b) => a.rangeStart - b.rangeStart).forEach((element) => {
            const label = element.rangeStart.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }) + ' - ' + element.rangeEnd.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 });
            // sort columns
            rows.push([element.col1, label, element.weight]);
          });
        }
      });
    }

    return drawSankeyChart(columns, rows);
  }

  getGraph() {
    let panel = null;
    let length = false;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0].polarSubjectSalarySankey[0]).forEach(key => {
        if (this.props.reduxState_fetchDataTransaction.default.payload[0].polarSubjectSalarySankey[0][key].length > 0) length = true;
      })

      if (length) {
        panel = (<TabbedGraphPanel
        title="Subject Areas and Salary of Current Graduates, Based on the their pre-university location"
        globalID="polar-overview-1"
        content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'googlecharts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '4500px',
                data: this.getData(),
              },
            },
          ]}
        seperator
      />);
      } else panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />);
    }

    return panel;
  }

  getContent() {
    const content = (
      <div id="page-content" key="polar-overview">

        <StandardFilters />

        <div className="row" style={{ paddingBottom: '50px' }}>

          <div className="col-lg-12">

            <h3 className="text-main text-normal text-2x mar-no">POLAR3 Outcomes</h3>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-md-12">
                {this.getGraph()}
              </div>
            </div>

          </div>
        </div>
      </div>
    );

    return content;
  }

  render() {
    let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished === true && this.props.reduxState_fetchDataTransaction.default.generalStatus === 'success') {
      content = this.getContent();
    } else if (this.props.reduxState_fetchDataTransaction.default.generalStatus === 'error' || this.props.reduxState_fetchDataTransaction.default.generalStatus === 'fatal') {
      console.log(this.props.reduxState_fetchDataTransaction.default.generalStatus.toUpperCase(), this.props.reduxState_fetchDataTransaction.default.payload);
      content = (
        <div>
          <StandardFilters />
          <div className="row" style={{ marginTop: '200px' }}>
            <div className="col-md-10 col-md-push-1 text-center">
              <BasicPanel
                content={
                  <div>
                    <h3><strong>There has been a problem on the backend.</strong></h3>
                    <h4>Try refreshing the page, or changing the filters.</h4>
                    <br />
                  </div>
                      }
              />
            </div>
          </div>
        </div>
      );
    }

    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
      }
    });

    const dataTransaction = (
      <div className="container" key="transaction-polar">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/polar"
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
