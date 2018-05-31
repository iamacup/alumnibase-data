import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import { data1, data2 } from './data';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'subjects-first-year';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = ({
      jobs: data1,
    });
  }

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

      $(this.highest).click(() => {
        this.setState({
          jobs: data2,
        });
        $(this.highest).toggle();
        $(this.lowest).removeClass('hidden');
      });

      $(this.lowest).click(() => {
        this.setState({
          jobs: data1,
        });
        $(this.highest).toggle();
        $(this.lowest).addClass('hidden');
      });
    });
  }

  getGraphs() {
    const { jobs } = this.state;

    const react1 = jobs.map(element => getPercentRow(element.name, element.salary));

    const react2 = jobs.map(element => (
      <div key={element.name}>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{element.name}</p>
          </div>
        </div>
        {getPercentRow('Male', element.male)}
        {getPercentRow('Female', element.female)}
      </div>
    ));

    const filters = (
      <div className="row text-right">
        <button type="button" className="btn btn-default" ref={(element) => { this.highest = element; }} style={{ marginRight: '10px' }}>See Highest to Lowest</button>
        <button type="button" className="btn btn-default hidden" ref={(element) => { this.lowest = element; }}>See Lowest to Highest</button>
        <br />
        <br />
      </div>
    );

    const panel = (
      <TabbedGraphPanel
        title="High level subject salaries"
        globalID="subjects-first-year-1"
        content={[
          {
            title: 'Average Salary',
            active: true,
            preContent: filters,
            graphData: {
              type: 'react',
              width: '100%',
              height: '100%',
              tools: {
                allowDownload: false,
                seeData: false,
                pinGraph: false,
              },
              data: {
                reactData: react1,
              },
            },
          },
          {
            title: 'Gender Split',
            active: false,
            graphData: {
              type: 'react',
              width: '100%',
              height: '100%',
              tools: {
                allowDownload: false,
                seeData: false,
                pinGraph: false,
              },
              data: {
                reactData: react2,
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
      <div id="page-content" key="subjects-first-year">
        <StandardFilters />
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">First Year Salary</h3>
            <h5 className="text-muted text-normal">Below we explore the average salary for all respondants within their first year of graduation, optionally split by gender.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getGraphs()}
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
      <div className="container" key="transaction-subjects-first-year">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/subjects/first-year"
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
