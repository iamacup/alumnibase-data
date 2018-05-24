import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getSalaryRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import { lowest, highest } from './jobData';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'jobs-first-year';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = ({
      jobs: lowest,
    });
  }

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
          name: 'Salary Overview',
          link: '/analytics/salary/overview',
        }],
    });

    $(() => {
    // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      $(this.highestButton).click(() => {
        this.setState({
          jobs: highest,
        });
        $(this.highestButton).toggle();
        $(this.lowestButton).removeClass('hidden');
      });

      $(this.lowestButton).click(() => {
        this.setState({
          jobs: lowest,
        });
        $(this.highestButton).toggle();
        $(this.lowestButton).addClass('hidden');
      });
    });
  }

  getGraphs() {
    const { jobs } = this.state;

    const react1 = jobs.map(element => getSalaryRow(element.job, element.salary));

    const react2 = jobs.map(element => (
      <div key={element.job}>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{element.job}</p>
          </div>
        </div>
        <div>
          {getSalaryRow('Male', element.male)}
          {getSalaryRow('Female', element.female)}
        </div>
      </div>
    ));

    const filter = (
      <div className="row text-right">
        <button type="button" className="btn btn-default" ref={(element) => { this.highestButton = element; }} style={{ marginRight: '10px' }}>See Highest to Lowest Salary</button>
        <button type="button" className="btn btn-default hidden" ref={(element) => { this.lowestButton = element; }}>See Lowest to Highest Salary</button>
        <br />
        <br />
      </div>
    );

    const panel = (
      <TabbedGraphPanel
        title="High level job salaries"
        globalID="jobs-first-year-1"
        content={[
          {
            title: 'Average Salary',
            active: true,
            preContent: filter,
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
      <div id="page-content" key="jobs-first-year">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">First Year Salary</h3>
            <h5 className="text-muted text-normal">Below we explore the average salary for all respondants within their first year of graduation, optionally split by gender.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row" ref={(element) => { this.lowest = element; }}>
          <div className="col-md-10 col-md-push-1">
            <div className="graph-lowest">
              {this.getGraphs()}
            </div>
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
      <div className="container">
        <div className="row" style={{ marginTop: '200px'}}>
          <div className="col-1">
              <BasicPanel
                content={
                <FetchData
                  key="transaction-jobs-year"
                  active
                  fetchURL="/api/analytics/jobs/first-year"
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
