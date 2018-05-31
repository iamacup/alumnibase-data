
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import CollapsablePanel from '../../../../../../content/components/CollapsablePanel';
import drawScatterGraph from '../../../../../../content/scripts/custom/echarts/drawScatterGraph';
import drawBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'subjects-vfm';
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

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((key) => {
        if (type === 'salarySentimentPlot' && key === type) {
          // setting the max and min values for the x-axis.
          const optionObj = {
            max: 0,
            min: 0,
          };

          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            if (element.salary > optionObj.max) {
              optionObj.max = element.salary;
              optionObj.min = element.salary;
            }
          });

          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            if (element.salary < optionObj.min) optionObj.min = element.salary;
          });

          console.log(optionObj);

          const scatterData = this.props.reduxState_fetchDataTransaction.default.payload[0][key].map(element => [element.salary, element.score]);
          options = drawScatterGraph(scatterData, optionObj);
        }
      });
    }
    return options;
  }

  getContent() {
    // * Allied Health Professions, Dentistry, Nursing and Pharmacy
    // ** Aeronautical, Mechanical, Chemical and Manufacturing Engineering
    // *** Electrical and Electronic Engineering, Metallurgy and Materials
    // **** Communication, Cultural and Media Studies, Library and Information Management
    const barData = {
      titles1: ['Sport and Excercise Sciences, Leisure and Tourism', 'Education', 'Anthropology & Development Studies', '****', 'Politics and International Studies', 'English Language and Literature', 'Business and Management Studies', 'Geography, Environmental Studies and Archaeology', 'General Engineering', 'Physics', 'Area Studies', '***', 'Mathematical Sciences', 'Earth Systems and Environmental Sciences', 'Biological Sciences', 'Psychology, Psychiatry and Neuroscience', '**', 'Architecture, Built Environment and Planning', 'Clinical Medicine', '*'],
      titles2: ['Sport and Excercise Sciences, Leisure and Tourism', 'Education', 'Anthropology & Development Studies', 'Architecture, Built Environment and Planning', 'Clinical Medicine', 'Aeronautical, Mechanical, Chemical and Manufacturing Engineering'],
      data2: [{ data: [27, 34, 38, 92, 97, 100] }],
      data1: [{ data: [27, 34, 38, 45, 50, 54, 58, 62, 64, 65, 72, 76, 78, 80, 82, 84, 88, 92, 97, 100] }],
      options1: { direction: 'horizontal', value: '' },
      options2: { direction: 'horizontal', value: '', colours: ['#1c6cab', '#d02224'] },
    };


    const bar1 = drawBarChart(barData.titles1, barData.data1, barData.options1);
    const bar2 = drawBarChart(barData.titles2, barData.data2, barData.options2);

    const postContent = [['* Aeronautical, Mechanical, Chemical and Manufacturing Engineering'], ['** Allied Health Professions, Dentistry, Nursing and Pharmacy'], ['*** Electrical and Electronic Engineering, Metallurgy and Materials'], ['**** Communication, Cultural and Media Studies, Library and Information Management']];
    const text1 = <p>{postContent[0]}<br />{postContent[1]}<br />{postContent[2]}<br />{postContent[3]}</p>;

    const optionsA = {
      x: 'Years',
      y: '# of  People Over the Threshold',
      yLabel: 'horizontal',
    };

    const data1 = {
      name: ['Plan 2', 'Plan 3'],
      plotted: [[20000, 25000, 43000],
        [10000, 12000, 16000, 23000, 37000]],
      age: ['New Graduate - 2 Yrs', '2 - 5 Yrs', '5 - 10 Yrs', '10 - 15 Yrs', '15 - 20 Yrs', '20 - 30 Yrs'],
    };
    const lineData = drawLineChart(data1, optionsA);

    const tabData1 = [
      {
        title: (<div><p>Percentage of People who Believe their Course Offered Value for Money</p><h4 style={{ color: 'red' }}>NO QUESTION DATA</h4></div>),
        globalID: 'subjects-vfm-1',
        options: bar1,
        text: text1,
      },
      {
        title: (<div><p>Top 3 vs Bottom 3: Percentage of people who believe their course offers value for money</p><h4 style={{ color: 'red' }}>NO QUESTION DATA</h4></div>),
        globalID: 'subjects-vfm-2',
        options: bar2,
        text: '',
      },
    ];

    const tabData2 = [ // loan repayment graph
      {
        title: 'Average Time Taken for Graduates to Pay Back Student Loans',
        globalID: 'subjects-vfm-3',
        options: lineData,
        text: <div className="pull-right"><p>* Plan 3 inflation is calcuated as 6% today flat over the period</p></div>,
      },
    ];

    const year3Data = { plan2: { amountBorrowed: 0, loanPaidBack: 0 }, plan3: { amountBorrowed: 0, loanPaidBack: 0 } };
    const year4Data = { plan2: { amountBorrowed: 0, loanPaidBack: 0 }, plan3: { amountBorrowed: 0, loanPaidBack: 0 } };
    // let convertedNumber = salary.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 });
    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((name) => {
        if (name === 'loanRepayment') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][name].forEach((element) => {
            if (element.courseLengthYears === 3) {
              // 3yr course data
              element.plan2.forEach((elem, i) => {
                if (i === 0) year3Data.plan2.amountBorrowed = elem.remainingLoan;
                year3Data.plan2.loanPaidBack += elem.ammountPaid;
              });
              element.plan3.forEach((elem, i) => {
                if (i === 0) year3Data.plan3.amountBorrowed = elem.remainingLoan;
                year3Data.plan3.loanPaidBack += elem.ammountPaid;
              });
            } else if (element.courseLengthYears === 4) {
              // 4yr course data
              element.plan2.forEach((elem, i) => {
                if (i === 0) year4Data.plan2.amountBorrowed = elem.remainingLoan;
                year4Data.plan2.loanPaidBack += elem.ammountPaid;
              });
              element.plan3.forEach((elem, i) => {
                if (i === 0) year4Data.plan3.amountBorrowed = elem.remainingLoan;
                year4Data.plan3.loanPaidBack += elem.ammountPaid;
              });
            }
          });
        }
      });
    }

    const table = (
      <div className="row justify-content-center">
        <div style={{ margin: '10%' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" />
                <th scope="col" />
                <th scope="col" style={{ textAlign: 'center' }}>Amount Borrowed</th>
                <th scope="col" style={{ textAlign: 'center' }}>Amount Paid Back</th>
                <th scope="col" style={{ textAlign: 'center' }}>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Plan 2</th>
                <td colSpan="5" />
              </tr>
              <tr>
                <th scope="row" />
                <td />
                <td>3 Year Course</td>
                <td style={{ textAlign: 'center' }}>{year3Data.plan2.amountBorrowed.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{year3Data.plan2.loanPaidBack.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{(year3Data.plan2.loanPaidBack - year3Data.plan2.amountBorrowed).toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td />
                <td>4 Year Course</td>
                <td style={{ textAlign: 'center' }}>{year4Data.plan2.amountBorrowed.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{year4Data.plan2.loanPaidBack.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{(year4Data.plan2.loanPaidBack - year4Data.plan2.amountBorrowed).toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
              </tr>
              <tr>
                <th scope="row">Plan 3</th>
                <td colSpan="5" />
              </tr>
              <tr>
                <th scope="row" />
                <td />
                <td>3 Year Course</td>
                <td style={{ textAlign: 'center' }}>{year3Data.plan3.amountBorrowed.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{year3Data.plan3.loanPaidBack.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{(year3Data.plan3.loanPaidBack - year3Data.plan3.amountBorrowed).toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td />
                <td>4 Year Course</td>
                <td style={{ textAlign: 'center' }}>{year4Data.plan3.amountBorrowed.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{year4Data.plan3.loanPaidBack.toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
                <td style={{ textAlign: 'center' }}>{(year4Data.plan3.loanPaidBack - year4Data.plan3.amountBorrowed).toLocaleString('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    const explainerText = (
      <div style={{ margin: '5%' }}>
        <p>Given the average salaries for each year, and the average loan borrowed for each plan and course length, we are able to calculate the average time it will take to pay back your student loan.</p>
        <p>Starting the repayment calculations when the salary is at the minimum repayment level, we can determine the amount payable for that year. </p>
        <p>Adding interest to the loan each year and deducting the repayments, calculates the average amount of years before the loan will be fully repaid. </p>
        <p>In addition to this, we can then measure the average total interest paid and display the differences for each loan.</p>
      </div>
    );

    const content = (
      <div id="page-content" key="subjects-vfm">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Percieved Value</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {tabData1.map(element => (
              <TabbedGraphPanel
                title={element.title}
                globalID={element.globalID}
                key={element.globalID}
                content={[
                    {
                      title: '',
                      postContent: element.text,
                      active: true,
                      graphData: {
                        type: 'echarts',
                        tools: {
                          allowDownload: true,
                          seeData: false,
                          pinGraph: true,
                        },
                        width: '100%',
                        height: '450px',
                        data: {
                          options: element.options,
                        },
                      },
                    },
                  ]}
                seperator
              />
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Loan Repayment</h3>
            <h5 className="text-muted text-normal">Predictions based on total average salary for data per year group, inflation of loans and assumed full loan value with repayments made at standard PAYE tax rate.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {tabData2.map(element => (
              <TabbedGraphPanel
                title={element.title}
                globalID={element.globalID}
                key={element.globalID}
                content={[
                    {
                      title: '',
                      postContent: element.text,
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
                          options: element.options,
                        },
                      },
                    },
                  ]}
                seperator
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2" >
            <CollapsablePanel
              title="Total Ammount Taken Out vs Total Ammount Paid Back for Plan 2 / 3"
              content={table}
              expanded
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2" >
            <CollapsablePanel
              title="Calculations Explained"
              content={explainerText}
              expanded={false}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Monetary and Derived Value</h3>
            <h5 className="text-muted text-normal">We take various metrics from the survey that indicate positive impact of the university on the respondents life that are not related to salary and map them against salary.</h5>
            <h5 style={{ color: 'red' }}>Explain what questions are used to gather the data in this graph.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <TabbedGraphPanel
              title="University and Salary Impacts"
              globalID="subjects-vfm-4"
              key="subjects-vfm-4"
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
                        height: '400px',
                        data: {
                          options: this.getData('salarySentimentPlot'),
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
      <div className="container" key="transaction-subjects-vfm">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/subjects/vfm"
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
