
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

  getData(type, num) {
    let options = {};

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

          const scatterData = this.props.reduxState_fetchDataTransaction.default.payload[0][key].map(element => [element.salary, element.score]);
          options = drawScatterGraph(scatterData, optionObj);
        } else if (type === 'loanRepayment' && key === type) {
          const optionsObj = {
            x: 'Years Since Graduation', y: 'Salary', yLabel: 'horizontal', value: false,
          };
          const data = { name: ['Plan 2 - Remaining Loan', 'Plan 2 - Amount Paid', 'Plan 3 - Remaining Loan', 'Plan 3 - Amount Paid'], plotted: [[], [], [], []], age: [] };

          this.props.reduxState_fetchDataTransaction.default.payload[0][key].forEach((element) => {
            if (element.courseLengthYears === num) {
              let end = 0;

              element.plan2.forEach((elem) => {
                // stopping the Plan 2 graph at 0.
                if (elem.ammountPaid !== 0) {
                  data.plotted[0].push(elem.remainingLoan);
                  data.plotted[1].push(elem.ammountPaid);
                }
              });

              element.plan3.forEach((elem) => {
                // stopping the Plan 3 graph at 0.
                if (elem.ammountPaid !== 0) {
                  end = elem.yearsSinceGraduation;
                  data.age.push(elem.yearsSinceGraduation);
                  data.plotted[2].push(elem.remainingLoan);
                  data.plotted[3].push(elem.ammountPaid);
                }
              });

              // adding extra to the end of the graph
              data.age.push(end + 1, end + 2);
            }
          });

          options = drawLineChart(data, optionsObj);
        }
      });
    }
    return options;
  }

  getGraph(name) {
    let panel = null;
    let plan2 = false;
    let plan3 = false;

    const scatterText = (
      <div>
        <p>To what extent has your HE experience enabled you to:</p><br />
        <h5>Be innovative in the workplace?</h5>
        <p>Make a difference in the workplace?</p>
        <p>Change organisational culture and/or working practices?</p>
        <p>Influence the work of others in the workplace?</p>
        <p>Access immediate or short-term job opportunities in your chosen career?</p>
        <p>Enhance your credibility or standing in the workplace?</p>
        <p>Progress towards your long term career aspirations?</p>
        <p>Enhance your social and intellectual capabilities beyond employment?</p>
        <p>Enhance the quality of your life generally?</p><br />
        <h5>Where the possible answers are:</h5>
        <p>A great extent</p>
        <p>Some extent</p>
        <p>Not at all</p>
        <p>Don't know</p>
        <p>Have not worked since finishing course</p><br />
      </div>
    );


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      if (name === 'loanRepayment') {
        this.props.reduxState_fetchDataTransaction.default.payload[0].loanRepayment.forEach((elem) => {
          if (elem.plan2.length > 0) plan2 = true;
          if (elem.plan3.length > 0) plan3 = true;
        });

        if (plan2 && plan3) {
          panel = (<TabbedGraphPanel
            title="Average Time Taken for Graduates to Pay Back Student Loans"
            globalID="subjects-vfm-3"
            collapsed={false}
            key="subjects-vfm-3"
            content={[
                          {
                            title: '3 Year Course',
                            postContent: (<div className="pull-right"><p>* Plan 3 inflation is calcuated as 6% today flat over the period</p></div>),
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
                                options: this.getData('loanRepayment', 3),
                              },
                            },
                          },
                           {
                            title: '4 Year Course',
                            postContent: (<div className="pull-right"><p>* Plan 3 inflation is calcuated as 6% today flat over the period</p></div>),
                            active: false,
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
                                options: this.getData('loanRepayment', 4),
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
      } else if (name === 'salarySentimentPlot') {
        if (this.props.reduxState_fetchDataTransaction.default.payload[0][name].length > 0) {
          panel = (
            <div>
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
              <div className="row">
                <div className="col-md-8 col-md-push-2">
                  <CollapsablePanel
                    title="The questions used to gather the data in this graph."
                    content={scatterText}
                    expanded={false}
                  />
                </div>
              </div>
            </div>
          );
        } else {
          panel = (
            <div className="row">
              <div className="col-md-8 col-md-push-2">
                <BasicPanel
                  content={
                    <div className="text-center">
                      <h5>There is no data for this graph<br />Please adjust the filters.</h5>
                    </div>
                    }
                />
              </div>
            </div>
          );
        }
      }
    }
    return panel;
  }

  getTableData() {
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
    return table;
  }

  getTable() {
    let panel = null;
    let plan2 = false;
    let plan3 = false;


    const explainerText = (
      <div style={{ margin: '5%' }}>
        <p>Given the average salaries for each year, and the average loan borrowed for each plan and course length, we are able to calculate the average time it will take to pay back your student loan.</p>
        <p>Starting the repayment when the salary is at the minimum repayment level for that plan, we can determine the amount payable for that year. </p>
        <p>Adding interest to the loan each year and deducting the repayments, calculates the average amount of years before the loan will be fully repaid. </p>
        <p>In addition to this, we can then measure the average total interest paid and display the differences for each loan.</p>
      </div>
    );


    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      this.props.reduxState_fetchDataTransaction.default.payload[0].loanRepayment.forEach((elem) => {
        if (elem.plan2.length > 0) plan2 = true;
        if (elem.plan3.length > 0) plan3 = true;
      });

      if (plan2 && plan3) {
        panel = (
          <div>
            <div className="row">
              <div className="col-md-8 col-md-push-2" >
                <CollapsablePanel
                  title="Total Ammount Taken Out vs Total Ammount Paid Back for Plan 2 / 3"
                  content={this.getTableData()}
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
          </div>
        );
      } else {
        panel = (
          <div className="row">
            <div className="col-md-8 col-md-push-2" >
              <BasicPanel
                content={
                  <div className="text-center">
                    <h5>There is no data for this graph<br />Please adjust the filters.</h5>
                  </div>
            }
              />
            </div>
          </div>
        );
      }
    }

    return panel;
  }

  getContent() {
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

    const content = (
      <div id="page-content" key="subjects-vfm">

        <StandardFilters />

        { // <div className="row">
        //   <div className="col-md-8 col-md-push-2">
        //     <h3 className="text-main text-normal text-2x mar-no">Percieved Value</h3>
        //     <hr className="new-section-xs" />
        //   </div>
        // </div>
      }

        { // <div className="row">
        //   <div className="col-md-8 col-md-push-2">
        //     {tabData1.map(element => (
        //       <TabbedGraphPanel
        //         title={element.title}
        //         globalID={element.globalID}
        //         key={element.globalID}
        //         content={[
        //             {
        //               title: '',
        //               postContent: element.text,
        //               active: true,
        //               graphData: {
        //                 type: 'echarts',
        //                 tools: {
        //                   allowDownload: true,
        //                   seeData: false,
        //                   pinGraph: true,
        //                 },
        //                 width: '100%',
        //                 height: '450px',
        //                 data: {
        //                   options: element.options,
        //                 },
        //               },
        //             },
        //           ]}
        //         seperator
        //       />
        //     ))}
        //   </div>
        // </div>
      }

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Loan Repayment</h3>
            <h5 className="text-muted text-normal">Predictions based on total average salary for data per year group, inflation of loans and assumed full loan value with repayments made at standard PAYE tax rate.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {
//               const panel = (<TabbedGraphPanel
//       title={title}
//       globalID={id}
//       collapsed={dataObj.collapsed}
//       content={[
//             {
//               title: 'Overall',
//               postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
//               active: true,
//               graphData: {
//                 type: 'react',
//                 width: '100%',
//                 height: '100%',
//                 tools: {
//                   allowDownload: false,
//                   seeData: false,
//                   pinGraph: false,
//                 },
//                 data: {
//                   reactData: dataObj.data.map((element, i) => drawPercentRow(dataObj.titles[i], element, true)), // this.getPercentageBlock(arr), //map over data and use i for arr[i] -- see how it's done on another page!
//                 },
//               },
//             },
//             {
//               title: 'Trends',
//               active: false,
//               postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
//               graphData: {
//                 type: 'echarts',
//                 tools: {
//                   allowDownload: false,
//                   seeData: false,
//                   pinGraph: false,
//                 },
//                 width: '100%',
//                 height: '350px',
//                 data: {
//                   options,
//                 },
//               },
//             },
//           ]}
//       seperator
//     />);
}


            {this.getGraph('loanRepayment')}
          </div>
        </div>

        {this.getTable()}


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Monetary and Derived Value</h3>
            <h5 className="text-muted text-normal">We take various metrics from the survey that indicate positive impact of the university on the respondents life that are not related to salary and map them against salary.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>


        {this.getGraph('salarySentimentPlot')}


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
    }

    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
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
                  fetchURL="api/analytics/subjects/vfm"
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
