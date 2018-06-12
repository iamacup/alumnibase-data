
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

  getContent() {
    const tabbedPanelData = [
      {
        title: 'Stem Destinations of Graduates',
        globalID: 'stem-destinations-1',
        type: 'googlecharts',
        drawData: { ...this.getData('STEMDestinationsOfGraduates') },
      },
      {
        title: 'Ethnicity split of graduates going into soc.1-3 jobs',
        globalID: 'stem-destinations-2',
        type: 'googlecharts',
        drawData: { ...this.getData('STEMDestinationsOfGraduatesEthnicity') },
      },
      {
        title: 'Gender split of graduates going into soc.1-3 jobs',
        globalID: 'stem-destinations-3',
        type: 'googlecharts',
        drawData: { ...this.getData('STEMDestinationsOfGraduatesGender') },
      },
    ];

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
            {tabbedPanelData.map(data => (
              <TabbedGraphPanel
                title={data.title}
                globalID={data.globalID}
                key={data.globalID}
                content={[
                  {
                    title: '',
                    active: true,
                    postContent: data.drawData.postContent,
                    graphData: {
                      type: data.type,
                      tools: {
                        allowDownload: true,
                        seeData: false,
                        pinGraph: true,
                      },
                      width: '100%',
                      height: '250px',
                      data: data.drawData.options,
                    },
                  },
                ]}
                seperator
              />
            ))}
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
                  sendData={{ filterData: sendData}}
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
