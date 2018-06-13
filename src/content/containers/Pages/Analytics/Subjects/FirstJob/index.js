import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'subject-first-job';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  // constructor(props) {
  //   super(props);

  //   this.state = ({
  //     jobs: highest,
  //   });
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

      $(this.highest).click(() => {
        // this.setState({
        //   jobs: highest,
        // });
        $(this.highest).addClass('hidden');
        $(this.lowest).toggle();
      });

      $(this.lowest).click(() => {
        // this.setState({
        //   jobs: lowest,
        // });
        $(this.highest).removeClass('hidden');
        $(this.lowest).toggle();
      });
    });
  }

  getGraphs() {
    // const filters = (
    //   <div className="row text-right">
    //     <button type="button" className="btn btn-default hidden" ref={(element) => { this.highest = element; }} style={{ marginRight: '10px' }}>See Highest to Lowest</button>
    //     <button type="button" className="btn btn-default" ref={(element) => { this.lowest = element; }}>See Lowest to Highest</button>
    //     <br />
    //     <br />
    //   </div>
    // );
    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].timeToFirstJob.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].timeToFirstJobGenderSplit.length > 0) {
        panel = (<TabbedGraphPanel
          title="High level time taken for employment by subject"
          globalID="subject-first-job-1"
          content={[
          {
            title: 'Average Salary',
            active: true,
            // preContent: filters,
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
                reactData: this.getData('timeToFirstJob'),
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
                reactData: this.getData('timeToFirstJobGenderSplit'),
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
    let options = {};

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === 'timeToFirstJob' && key === type) {
          options = this.props.reduxState_fetchDataTransaction.default.payload[0][key].map(element => getPercentRow(element.subject, element.averageTimeMonths, true, true));
        } else if (type === 'timeToFirstJobGenderSplit' && key === type) {
          this.getAllUniqueName(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          options = this.props.reduxState_fetchDataTransaction.default.payload[0][key].map(elem => (
            <div key={elem.subject}>
              <div className="row">
                <div className="col-md-4 col-md-push-2">
                  <p>{elem.subject}</p>
                </div>
              </div>
              {elem.data.map(value => (
              getPercentRow(value.gender, value.averageTimeMonths, true, true)
              ))}
            </div>
          ));
        }
      });
    }

    return options;
  }

  getContent() {
    const content = (
      <div id="page-content" key="subject-first-job">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">First Job</h3>
            <h5 className="text-muted text-normal">Below we explore the average time it takes to get a first job based on the subject studied, optionally split by gender.</h5>
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

  getAllUniqueName(dataArr) {
    const uniqueKeys = [];

    dataArr.forEach((element) => {
      element.data.forEach((elem) => {
        if (!uniqueKeys.includes(elem.gender)) uniqueKeys.push(elem.gender);
      });
    });

    dataArr.forEach((element) => {
      if (element.data.length < uniqueKeys.length) {
        const keysInBreakdown = element.data.map(elem => elem.gender);

        uniqueKeys.forEach((key) => {
          if (!keysInBreakdown.includes(key)) {
            if (key === 'Male') element.data.splice(0, 0, { averageTimeMonths: 0, gender: key });
            if (key === 'Female') element.data.splice(1, 0, { averageTimeMonths: 0, gender: key });
            if (key === 'Other') element.data.splice(2, 0, { averageTimeMonths: 0, gender: key });
          }
        });
      }
    });

    return dataArr;
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
      <div className="container" key="transaction-subjects-first-job">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/subjects/first-job"
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
