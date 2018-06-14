import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getSalaryRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'jobs-first-year';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  // constructor(props) {
  //   super(props)

  //   this.state = ({
  //     highest: false,
  //   })
  // }

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

      $(this.highestButton).click(() => {
        // // change the data
        // this.setState({
        //   highest: true,
        // })
        $(this.highestButton).toggle();
        $(this.lowestButton).removeClass('hidden');
      });

      $(this.lowestButton).click(() => {
        // // change the data
        // this.setState({
        //   highest: false,
        // })
        $(this.highestButton).toggle();
        $(this.lowestButton).addClass('hidden');
      });
    });
  }

  getGraphs() {
    // const filter = (
    //   <div className="row text-right">
    //     <button type="button" className="btn btn-default" ref={(element) => { this.highestButton = element; }} style={{ marginRight: '10px' }}>See Highest to Lowest Salary</button>
    //     <button type="button" className="btn btn-default hidden" ref={(element) => { this.lowestButton = element; }}>See Lowest to Highest Salary</button>
    //     <br />
    //     <br />
    //   </div>
    // );

    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].averageSalaryFirstYear.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].averageSalaryFirstYearGenderSplit.length > 0) {
        panel = (<TabbedGraphPanel
          title="High level job salaries"
          globalID="jobs-first-year-1"
          content={[
          {
            title: 'Average Salary',
            active: true,
            // preContent: filter,
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
                reactData: this.getData('averageSalaryFirstYear'),
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
                reactData: this.getData('averageSalaryFirstYearGenderSplit'),
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


  getData(type) {
    let reactData = {};

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      const data = this.props.reduxState_fetchDataTransaction.default.payload[0][type];

      if (Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0])[0] === type) {
        reactData = data.map(elem => getSalaryRow(elem.jobTitle, elem.average));
      } else if (Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0])[1] === type) {
        this.getAllUniqueNames(data);


        reactData = data.map(element => (
          <div key={element.jobTitle}>
            <div className="row">
              <div className="col-md-4 col-md-push-2">
                <p>{element.jobTitle}</p>
              </div>
            </div>
            <div>
              {element.split.map(elem => (
                    getSalaryRow(elem.gender, elem.average)
                  ))}
            </div>
          </div>
        ));
      }
    }

    return reactData;
  }

  getAllUniqueNames(dataArr) {
    let uniqueKeys = ['Other'];

    dataArr.forEach((element) => {
      element.split.forEach((elem) => {
        if (!uniqueKeys.includes(elem.gender)) uniqueKeys.push(elem.gender);
      });
    });

// this makes sure that if other filters are on, and the backend is only sending back data for male and other, it will include female too.
    if (!uniqueKeys.includes('Male')) uniqueKeys.push('Male')
    if (!uniqueKeys.includes('Female')) uniqueKeys.push('Female')
    if (!uniqueKeys.includes('Other')) uniqueKeys.push('Other')

    dataArr.forEach((element) => {
      if (element.split.length < uniqueKeys.length) {
        const keysInBreakdown = element.split.map(elem => elem.gender);

        uniqueKeys.forEach((key) => {
          if (!keysInBreakdown.includes(key)) {
            if (key === 'Male') element.split.splice(0, 0, { gender: key, average: 0 });
            if (key === 'Female') element.split.splice(1, 0, { gender: key, average: 0 });
            if (key === 'Other') element.split.splice(2, 0, { gender: key, average: 0 });
          }
        });
      }
    });

    return dataArr;
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
    console.log()
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
        sendData[key] = _.assign({}, this.props.filterData[key]) 
      }
    });
    // sendData.rand = Math.random();
    const dataTransaction = (
      <div className="container" key="transaction-jobs-year">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/jobs/first-year"
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
