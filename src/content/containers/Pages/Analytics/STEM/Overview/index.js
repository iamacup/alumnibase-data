
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
    let options = null;
    const data1 = [
      {
        job: 'Science', salary: [21.352], male: [23], female: [21],
      },
      {
        job: 'Advanced Science', salary: [25.594], male: [27], female: [23],
      },
      {
        job: 'Physics', salary: [28], male: [30], female: [27],
      },
      {
        job: 'Chemistry', salary: [24.806], male: [25], female: [21],
      },
      {
        job: 'Biology', salary: [29.751], male: [29], female: [27],
      },
      {
        job: 'Maths', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'IT', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'ICT', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Computing', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Further Maths', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Applied ICT', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Design and Technology(Product Design)', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Applied Science', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Computer Science', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Electronics', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Human Biology', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Pure Maths', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Statistics', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Construction and Built Environmnet', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Electrical Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Electronic Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Mechanical Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Manufacturing Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Operations and Maintenance Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Pharmaceutical Science', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Vechicle Technology', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Psychology', salary: [32.879], male: [37], female: [28],
      },
    ];

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

            this.getAllUniqueNames(this.props.reduxState_fetchDataTransaction.default.payload[0].STEMSalarySplitGender);
            this.props.reduxState_fetchDataTransaction.default.payload[0].STEMSalarySplitGender.forEach((element) => {
              element.data.forEach((elem) => {
                if (elem.gender === 'Male') lineData.plotted[1].push(elem.averageSalary);
                if (elem.gender === 'Female') lineData.plotted[2].push(elem.averageSalary);
                if (elem.gender === 'Other') lineData.plotted[3].push(elem.averageSalary);
              });
            });

            this.props.reduxState_fetchDataTransaction.default.payload[0].nationalAverage.forEach((element) => {
              lineData.age.forEach((value) => {
                if (value === element.name) lineData.plotted[4].push(element.salary);
              });
            });

            options = drawLineChart(lineData, 'Years');
          } else if (key === 'STEMSubjectSalaries') {
            options = data1.map(data => getPercentRow(data.job, data.salary));
          } else if (key === 'STEMSubjectSalariesGender') {
            options = data1.map(data => (
              <div key={data.job}>
                <div className="row">
                  <div className="col-md-4 col-md-push-2">
                    <p>{data.job}</p>
                  </div>
                </div>
                <div>
                  {getPercentRow('Male', data.male)}
                  {getPercentRow('Female', data.female)}
                </div>
              </div>
            ));
          }
        }
      });
    }
    return options;
  }

  getContent() {
    const tabbedPanelData = [
      {
        title: '% of respondants working in STEM jobs',
        globalID: 'stem-overview-1',
        type: 'echarts',
        drawData: { options: this.getData('STEMJobsSplit') },
      },
    ];

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
            {tabbedPanelData.map(data => (
              <TabbedGraphPanel
                title={data.title}
                globalID={data.globalID}
                key={data.globalID}
                content={[
            {
              title: '',
              active: true,
              graphData: {
                type: data.type,
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: data.drawData,
              },
            },
          ]}
                seperator
              />
  ))}

            <TabbedGraphPanel
              title="Average Salary of respondants working in STEM jobs"
              globalID="stem-overview-2"
              content={[
                       {
                         title: '',
                         // preContent: <p>This is the OPTIONAL pre content</p>,
                         // postContent: <p>This is the OPTIONAL post content</p>,
                         active: true,
                         graphData: {
                           type: 'echarts',
                           tools: {
                             allowDownload: true,
                             seeData: false,
                             pinGraph: true,
                           },
                           width: '100%',
                           height: '400px',
                           data: {
                             options: this.getData('STEMSalarySplit'),
                           },
                         },
                       },
                     ]}
              seperator
            />

            <h3 className="text-main text-normal text-2x mar-no">STEM Salaries</h3>
            <h5 className="text-muted text-normal">Breakdown of STEM subjects and their associated salary outcomes for students in their <strong>First Job</strong>, with optional Gender Split</h5>
            <hr className="new-section-xs" />

            <TabbedGraphPanel
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
            />

          </div>
        </div>
      </div>
    );

    return content;
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
            if (key === 'Male') element.data.splice(0, 0, { STEM: 'Unknown', averageSalary: 0, gender: key });
            if (key === 'Female') element.data.splice(1, 0, { STEM: 'Unknown', averageSalary: 0, gender: key });
            if (key === 'Other') element.data.splice(2, 0, { STEM: 'Unknown', averageSalary: 0, gender: key });
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
      <div className="container" key="transaction-stem">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/stem/overview"
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
