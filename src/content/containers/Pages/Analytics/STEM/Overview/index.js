
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import drawPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'stem-overview';
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
          name: 'Salary Overview',
          link: '/analytics/salary/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getData(type) {
    let options = {};

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === key) {
          if (key === 'STEMJobsSplit') {
            const pieData = [{ value: 'STEM Subjects', percent: 0 }, { value: 'Non-STEM Subjects', percent: 0 }];
            this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
              pieData[0].percent = element[0].length;
              pieData[1].percent = 1000 - element[0].length;
            });
            options = drawPieChart(pieData, false, 'pie', false);
          } else if (key === 'STEMSalarySplit') {
            const lineData = {
              name: ['Average', 'Male', 'Female', 'Other', 'National Average'],
              age: [],
              plotted: [[], /* Male */[], /* Female */ [], /* Other */ [], /* National */[]],
            };

            this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
              lineData.age.push(element.name);
              lineData.plotted[0].push(element.data[0].averageSalary);
            });

            const dataArr = this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0].STEMSalarySplitGender);

            dataArr.forEach((element) => {
              element.data.forEach((elem) => {
                // if (elem.STEM === 'STEM') {
                if (elem.gender === 'Male') lineData.plotted[1].push(elem.averageSalary);
                if (elem.gender === 'Female') lineData.plotted[2].push(elem.averageSalary);
                if (elem.gender === 'Other') lineData.plotted[3].push(elem.averageSalary);
              // }
              });
            });

            this.props.reduxState_fetchDataTransaction.default.payload[0].nationalAverage.forEach((element) => {
              lineData.age.forEach((value) => {
                if (value === element.name) lineData.plotted[4].push(element.salary);
              });
            });

            options = drawLineChart(lineData, 'Years');
          } else if (key === 'STEMSubjectSalaries') {
            options = this.props.reduxState_fetchDataTransaction.default.payload[0][key].map(data => getPercentRow(data.subject, data.averageSalary));
          } else if (key === 'STEMSubjectSalariesGender') {
            options = this.props.reduxState_fetchDataTransaction.default.payload[0][key].map(data => (
              <div key={data.subject}>
                <div className="row">
                  <div className="col-md-4 col-md-push-2">
                    <p>{data.subject}</p>
                  </div>
                </div>
                <div>
                  {data.group.map(elem => (
                  getPercentRow(elem.gender, elem.averageSalary)
                  ))}
                </div>
              </div>
            ));
          }
        }
      });
    }
    return options;
  }

  getGraph(title, id, height, name) {
    let panel = null;
    let length = false;

    let year1 = false;
    let year5 = false;
    let year10 = false;
    let year15 = false;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].STEMSalarySplit.forEach((elem) => {
        if (elem.name === '1 Year' && elem.data.length > 0) year1 = true;
        if (elem.name === '5 Years' && elem.data.length > 0) year5 = true;
        if (elem.name === '10 Years' && elem.data.length > 0) year10 = true;
        if (elem.name === '15 Years' && elem.data.length > 0) year15 = true;
      });


      if (name === 'STEMJobsSplit') length = this.props.reduxState_fetchDataTransaction.default.payload[0].STEMJobsSplit[0].length > 0;
      if (name === 'STEMSalarySplit') length = (year1 && year5 && year10 && year15);

      if (length) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={id}
          key={id}
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
                height,
                data: {
                  options: this.getData(name),
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

  getSalaryGraph() {
    let panel = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (this.props.reduxState_fetchDataTransaction.default.payload[0].STEMSubjectSalaries.length > 0 && this.props.reduxState_fetchDataTransaction.default.payload[0].STEMSubjectSalariesGender.length > 0) {
        panel = (<TabbedGraphPanel
          title="List of all STEM subjects average salaries"
          globalID="stem-overview-3"
          content={[
                {
                  title: 'STEM subjects',
                  active: true,
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
                      reactData: this.getData('STEMSubjectSalaries'),
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
                      reactData: this.getData('STEMSubjectSalariesGender'),
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

  getContent() {
    const content = (
      <div id="page-content" key="stem-overview">
        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Overview of STEM Students</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGraph('% of respondants working in STEM jobs', 'stem-overview-1', '250px', 'STEMJobsSplit')}
            {this.getGraph('Average Salary of respondants working in STEM jobs', 'stem-overview-2', '400px', 'STEMSalarySplit')}
            <h3 className="text-main text-normal text-2x mar-no">STEM Salaries</h3>
            <h5 className="text-muted text-normal">Breakdown of STEM subjects and their associated salary outcomes for students in their <strong>First Job</strong>, with optional Gender Split</h5>
            <hr className="new-section-xs" />

            {this.getSalaryGraph()}

          </div>
        </div>
      </div>
    );

    return content;
  }

  getAllUniqueNames(dataArr) {
    const uniqueKeys = [];
    const newDataArr = [
      { name: '1 Year', data: [] },
      { name: '5 Years', data: [] },
      { name: '10 Years', data: [] },
      { name: '15 Years', data: [] },
    ];

    dataArr.forEach((arr) => {
      if (arr.name === '1 Year') {
        newDataArr[0].data = arr.data.filter(elem => elem.STEM === 'STEM');
      } else if (arr.name === '5 Years') {
        newDataArr[1].data = arr.data.filter(elem => elem.STEM === 'STEM');
      } else if (arr.name === '10 Years') {
        newDataArr[2].data = arr.data.filter(elem => elem.STEM === 'STEM');
      } else if (arr.name === '15 Years') {
        newDataArr[3].data = arr.data.filter(elem => elem.STEM === 'STEM');
      }
    });

    dataArr.forEach((element) => {
      element.data.forEach((elem) => {
        if (!uniqueKeys.includes(elem.gender)) uniqueKeys.push(elem.gender);
      });
    });

    newDataArr.forEach((element) => {
      if (element.data.length < uniqueKeys.length) {
        const keysInBreakdown = element.data.map(elem => elem.gender);

        uniqueKeys.forEach((key) => {
          if (!keysInBreakdown.includes(key)) {
            if (key === 'Male') element.data.splice(0, 0, { STEM: 'STEM', averageSalary: null, gender: key });
            if (key === 'Female') element.data.splice(1, 0, { STEM: 'STEM', averageSalary: null, gender: key });
            if (key === 'Other') element.data.splice(2, 0, { STEM: 'STEM', averageSalary: null, gender: key });
          }
        });
      }
    });

    return newDataArr;
  }

  render() {
    let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished === true && this.props.reduxState_fetchDataTransaction.default.generalStatus === 'success') {
      content = this.getContent();
    } else if (this.props.reduxState_fetchDataTransaction.default.generalStatus === 'error' || this.props.reduxState_fetchDataTransaction.default.generalStatus === 'fatal') {
      console.log(this.props.reduxState_fetchDataTransaction.default.generalStatus.toUpperCase(), this.props.reduxState_fetchDataTransaction.default.payload);
    }


    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
      }
    });

    const dataTransaction = (
      <div className="container" key="transaction-stem">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="api/analytics/stem/overview"
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
