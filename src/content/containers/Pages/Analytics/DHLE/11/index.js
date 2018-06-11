import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-11';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 11 - Undergraduates in full time work',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'DHLE-Like',
          link: `/${uni}/analytics/dlhe-like`,
        },
        {
          name: 'RQ 11 - Undergraduates in full time work',
          link: `/${uni}/analytics/dlhe-like/11`,
        }],
    });

    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        redrawCharts();
      });

      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGroupedBarchart(title, globalID, keyName) {
    const panel = (<TabbedGraphPanel
      title={title}
      globalID={globalID}
      content={[
            {
              title: '',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: this.getData(keyName),
                },
              },
            },
          ]}
      seperator
    />);

    return panel;
  }

  getContent() {
    const content = (
      <div id="page-content" key="DHLE-11">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Undergraduates in full time work</h3>
            <h5 className="text-muted text-normal">Data for graduates after leaving university.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Male /Female Earning by Salary Band',
              'DHLE-11-1',
              'firstJobGraduatesInFullTimeWorkSalaryBrackets',
             )}
          </div>
        </div>

      </div>
    );
    return content;
  }

  getData(type) {
    let options = {};
    const obj = { direction: 'horizontal', value: '' };
    const titles = [];
    const data = [{ name: 'Male', data: [] }, { name: 'Female', data: [] }, { name: 'Other', data: [] }];
    const lastElement = [];
    // this is because the greater than element is not last in order to go in.

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === key && key === 'firstJobGraduatesInFullTimeWorkSalaryBrackets') {
          this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0][key]);
          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            // changing < symbol to 'Less than' and making sure < doesn't go in till the end.
            if (element.salaryGroup.includes('<')) titles.push('Less than £' + element.salaryGroup.slice(2));
            else if (!element.salaryGroup.includes('>')) titles.push('£' + element.salaryGroup);
            else lastElement.push(element);


            if (!element.salaryGroup.includes('>')) {
              element.data.forEach((value) => {
                data.forEach((elem) => {
                  if (value.gender === elem.name) elem.data.push(value.length);
                });
              });
            }
          });
          // pushing the greater than data into the correct arrays.
          titles.push('Greater than £' + lastElement[0].salaryGroup.slice(2));
          lastElement[0].data.forEach((value) => {
            data.forEach((elem) => { if (value.gender === elem.name) elem.data.push(value.length); });
          });
          options = drawGroupedBarChart(titles, data, obj);
        }
      });
    }
    return options;
  }

  getAllUniqueNames(dataArr) {
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
            uniqueKeys.forEach((uniqueKey, i) => {
              if (key === uniqueKey) element.data.splice(i, 0, { gender: key, length: 0 });
            });
          }
        });
      }
    });

    return dataArr;
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
      <div className="container" key="transaction-dhle-11">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/dlhe-like/11"
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
