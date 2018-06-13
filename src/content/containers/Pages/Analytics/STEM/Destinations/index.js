
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'stem-destinations';
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
          name: 'Salary Overview',
          link: `/${uni}/analytics/salary/overview`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getData(type) {
    let options = {};
    const columns = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];
    const rows = [];
    let postContent = '';

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === key && key === 'STEMDestinationsOfGraduates') {
          Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0][key][0]).forEach((name) => {
            this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][name].forEach((element, i) => {
              if (element.col1 === 'Unknown' || element.col2 === 'Unknown') postContent = 'An Unknown value occurs when the data input is tailored to an individual.';
              if (element.col1 === 'Unknown') element.col1 = 'Unknown-' + i; // eslint-disable-line no-param-reassign
              rows.push([element.col1, element.col2, element.weight]);
            });
          });
          options = drawSankeyChart(columns, rows);
        } else if (type === key && key === 'STEMDestinationsOfGraduatesEthnicity') {
          Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0][key][0]).forEach((name) => {
            this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][name].forEach((element, i) => {
              if (element.col1 === 'Unknown' || element.col2 === 'Unknown') postContent = 'An Unknown value occurs when the data input is tailored to an individual.';
              if (element.col1 === 'Unknown') element.col1 = 'Unknown-' + i; // eslint-disable-line no-param-reassign
              rows.push([element.col1, element.col2, element.weight]);
            });
          });
          options = drawSankeyChart(columns, rows);
        } else if (type === key && key === 'STEMDestinationsOfGraduatesGender') {
          Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0][key][0]).forEach((name) => {
            this.props.reduxState_fetchDataTransaction.default.payload[0][key][0][name].forEach((element, i) => {
              if (element.col1 === 'Unknown' || element.col2 === 'Unknown') postContent = 'An Unknown value occurs when the data input is tailored to an individual.';
              if (element.col1 === 'Unknown') element.col1 = 'Unknown-' + i; // eslint-disable-line no-param-reassign
              rows.push([element.col1, element.col2, element.weight]);
            });
          });
          options = drawSankeyChart(columns, rows);
        }
      });
    }
    return { options, postContent };
  }

  getGraph(title, globalID, name) {
    let panel = null;
    let length = false;
    // let working = true;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0][name][0]).forEach(key => {
        if (this.props.reduxState_fetchDataTransaction.default.payload[0][name][0][key].length > 0) length = true;
      })

      if (length) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          key={globalID}
          content={[
            {
              title: '',
              active: true,
              postContent: ({ ...this.getData(name) }).postContent,
              graphData: {
                type: 'googlecharts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: ({ ...this.getData(name) }).options,
                //drawData.options,
              },
            },
          ]}
          seperator
        />
        )
      } else panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />)
    }

        return panel;
  }

  getContent() {
    const content = (
      <div id="page-content" key="stem-destinations">
        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">STEM Destinations</h3>
            <h5 className="text-muted text-normal">All data has been collected from graduates within thier first year of leaving university</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGraph('Stem Destinations of Graduates', 'stem-destinations-1', 'STEMDestinationsOfGraduates')}
            {this.getGraph('Ethnicity split of graduates going into soc.1-3 jobs', 'stem-destinations-2', 'STEMDestinationsOfGraduatesEthnicity')}
            {this.getGraph('Gender split of graduates going into soc.1-3 jobs', 'stem-destinations-3', 'STEMDestinationsOfGraduatesGender')}
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
      <div className="container" key="transaction-stem-destinations">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/stem/destinations"
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
