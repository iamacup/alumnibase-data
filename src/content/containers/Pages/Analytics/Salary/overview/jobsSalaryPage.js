import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showNationalAverage: false,
      panel1ID: '1',
      panel2ID: '2',
    };
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
  }

  getImageDataForActiveGraph() {
    let $parent = $('#' + this.state.panel1ID);

    if (!$parent.hasClass('active')) {
      $parent = $('#' + this.state.panel2ID);
    }

    const $canvas = $parent.find('canvas');

    if ($canvas.length === 1) {
      return $canvas[0].toDataURL('image/png');
    }

    console.log('handle error TODO');
    return null;
  }
  clickGraph() {
    setTimeout(() => { redrawCharts(); }, 200);
  }


  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
    const jobs = [
      {
        job: 'Accountant', salary: [28.352], male: [32], female: [26],
      },
      {
        job: 'Actuary', salary: [51.594], male: [54], female: [47],
      },
      {
        job: 'Advertising Managers and Promotion Managers', salary: [56], male: [60], female: [54],
      },
      {
        job: 'Advertising Sales Agent', salary: [27.806], male: [30], female: [24],
      },
      {
        job: 'Aircraft Mechanic', salary: [58.751], male: [58], female: [58],
      },
      {
        job: 'Airline Pilot', salary: [85.879], male: [87], female: [84],
      },
      {
        job: 'Airport Security Screener', salary: [27.075], male: [28], female: [27],
      },
      {
        job: 'Animal Groomer', salary: [17], male: [17], female: [17],
      },
      {
        job: 'Architect', salary: [33.64], male: [35], female: [31],
      },
      {
        job: 'Auto Mechanic', salary: [26.753], male: [27], female: [26],
      },
      {
        job: 'Bank Teller', salary: [17.641], male: [20], female: [15],
      },
      {
        job: 'Bartender', salary: [16], male: [20], female: [14],
      },
      {
        job: 'Biomedical Engineer', salary: [46.416], male: [50], female: [44],
      },
      {
        job: 'Bookkeeping', salary: [29.166], male: [30], female: [29],
      },
      {
        job: 'Accounting and Auditing Clerks', salary: [26.637], male: [28], female: [26],
      },
      {
        job: 'Brick Mason', salary: [35.368], male: [35], female: [35],
      },
      {
        job: 'Budget Analyst', salary: [38.964], male: [42], female: [36],
      },
      {
        job: 'Cardiovascular Technologist', salary: [45.072], male: [46], female: [45],
      },
      {
        job: 'Cashier', salary: [16.824], male: [16], female: [16],
      },
      {
        job: 'Chef', salary: [39.523], male: [45], female: [37],
      },
      {
        job: 'Chemist', salary: [32.5], male: [32], female: [32],
      },
      {
        job: 'Claims Adjuster', salary: [41.245], male: [42], female: [41],
      },
      {
        job: 'Appraiser, Examiner, and Investigator', salary: [38.965], male: [38], female: [38],
      },
      {
        job: 'Compensation and Benefits Manager', salary: [69.071], male: [73], female: [66],
      },
      {
        job: 'Computer Programmer', salary: [42.137], male: [47], female: [34],
      },
      {
        job: 'Computer System Analyst', salary: [61.695], male: [62], female: [58],
      },
      {
        job: 'Construction Laborer', salary: [26.801], male: [32], female: [20],
      },
      {
        job: 'Consultant', salary: [42.441], male: [49], female: [36],
      },
      {
        job: 'Correctional Officer', salary: [30.805], male: [33], female: [27],
      },
      {
        job: 'Court Reporter', salary: [36.301], male: [37], female: [36],
      },
      {
        job: 'Curator', salary: [27.280], male: [35], female: [21],
      },
      {
        job: 'Customer Service Representative', salary: [24.075], male: [28], female: [20],
      },
      {
        job: 'Database Administrator', salary: [30.589], male: [34], female: [28],
      },
      {
        job: 'Dental Hygienist', salary: [58.965], male: [63], female: [56],
      },
      {
        job: 'Dentist', salary: [76.761], male: [84], female: [70],
      },
      {
        job: 'Diagnostic Medical Sonographer', salary: [43.828], male: [49], female: [35],
      },
      {
        job: 'Dietitian/Nutritionist', salary: [37.914], male: [37], female: [37],
      },
      {
        job: 'Doctor', salary: [113.691], male: [120], female: [100],
      },
      {
        job: 'Editor', salary: [37.843], male: [45], female: [32],
      },
      {
        job: 'Electrician', salary: [30.765], male: [36], female: [26],
      },
      {
        job: 'EMTs and Paramedics', salary: [26.302], male: [30], female: [22],
      },
      {
        job: 'Environmental Engineer', salary: [59.814], male: [59], female: [59],
      },
      {
        job: 'Epidemiologist', salary: [44.846], male: [44], female: [44],
      },
      {
        job: 'Events/Meeting Planner', salary: [44.280], male: [46], female: [42],
      },
      {
        job: 'Fashion Designer', salary: [46.098], male: [50], female: [40],
      },
      {
        job: 'Financial Advisor', salary: [37.587], male: [43], female: [34],
      },
      {
        job: 'Firefighter', salary: [33.974], male: [39], female: [29],
      },
      {
        job: 'Fitness Trainer', salary: [19.346], male: [24], female: [18],
      },
      {
        job: 'Flight Attendant', salary: [31.732], male: [31], female: [33],
      },
      {
        job: 'Funeral Director', salary: [26.925], male: [26], female: [26],
      },
      {
        job: 'Fundraiser', salary: [31.895], male: [31], female: [31],
      },
      {
        job: 'Judge', salary: [102.080], male: [114], female: [93],
      },
      {
        job: 'Glazier', salary: [33.953], male: [33], female: [33],
      },
      {
        job: 'Graphic Designer', salary: [21.599], male: [28], female: [18],
      },
      {
        job: 'Guidance Counselor', salary: [37.921], male: [37], female: [37],
      },
      {
        job: 'Hairdressers, Hairstylists, and Cosmetologists', salary: [34.007], male: [34], female: [34],
      },
      {
        job: 'Health Educator', salary: [43.247], male: [43], female: [43],
      },
      {
        job: 'Human Resources Manager', salary: [35.813], male: [40], female: [32],
      },
      {
        job: 'Home Health Aide', salary: [16.434], male: [16], female: [16],
      },
      {
        job: 'Hydrologist', salary: [93.138], male: [93], female: [93],
      },
      {
        job: 'Insurance Underwriter', salary: [54.254], male: [58], female: [50],
      },
      {
        job: 'Interior Designer', salary: [43.785], male: [45], female: [42],
      },
      {
        job: 'Interpreter and Translator', salary: [32.623], male: [38], female: [28],
      },
      {
        job: 'Janitor', salary: [20.040], male: [20], female: [19],
      },
      {
        job: 'Lawyer', salary: [113.177], male: [120], female: [100],
      },
      {
        job: 'Librarian', salary: [43.816], male: [45], female: [40],
      },
      {
        job: 'Licensed Practical Nurse', salary: [29.737], male: [10], female: [29],
      },
      {
        job: 'Loan Officer', salary: [45.023], male: [46], female: [44],
      },
      {
        job: 'Manicurist', salary: [23.823], male: [23], female: [24],
      },
      {
        job: 'Market Research Ananlyst', salary: [40.690], male: [41], female: [39],
      },
      {
        job: 'Marriage and Family Therapist', salary: [34.780], male: [36], female: [32],
      },
      {
        job: 'Mechanical Engineer', salary: [59.552], male: [65], female: [54],
      },
      {
        job: 'Medical Assistant', salary: [23.995], male: [28], female: [19],
      },
      {
        job: 'Medical Laboratory Technician', salary: [43.198], male: [45], female: [42],
      },
      {
        job: 'Nursing Assistant', salary: [18.808], male: [22], female: [16],
      },
      {
        job: 'Occupational Therapist', salary: [59.462], male: [63], female: [54],
      },
      {
        job: 'Paralegal and Legal Assistant', salary: [18.103], male: [26], female: [16],
      },
      {
        job: 'Pharmacist', salary: [79.224], male: [86], female: [73],
      },
      {
        job: 'Pharmacy Technician', salary: [26.936], male: [30], female: [22],
      },
      {
        job: 'Physician Assistant', salary: [64.320], male: [70], female: [60],
      },
      {
        job: 'Photographer', salary: [24.099], male: [30], female: [20],
      },
      {
        job: 'Physical Therapist', salary: [58.624], male: [63], female: [53],
      },
      {
        job: 'Physical Therapy Assistant', salary: [45.348], male: [47], female: [44],
      },
      {
        job: 'Plumber', salary: [31.787], male: [38], female: [27],
      },
      {
        job: 'Police Officer', salary: [43.339], male: [45], female: [41],
      },
      {
        job: 'Postal Service Worker', salary: [37.391], male: [37], female: [37],
      },
      {
        job: 'Public Relations Specialist', salary: [47.067], male: [50], female: [44],
      },
      {
        job: 'Purchasing Manager', salary: [34.430], male: [38], female: [31],
      },
      {
        job: 'Receptionist', salary: [16.961], male: [18], female: [16],
      },
      {
        job: 'Registered Nurse', salary: [48.418], male: [50], female: [46],
      },
      {
        job: 'Retail Salesperson', salary: [19.027], male: [22], female: [16],
      },
      {
        job: 'Retail Supervisor', salary: [23.982], male: [27], female: [19],
      },
      {
        job: 'Secretary/ Administrative Assitant', salary: [24.403], male: [28], female: [20],
      },
      {
        job: 'Security Guard', salary: [24.476], male: [19], female: [18],
      },
      {
        job: 'Social Media Manager', salary: [32.015], male: [37], female: [28],
      },
      {
        job: 'Social Worker', salary: [27.360], male: [27], female: [27],
      },
      {
        job: 'Software Developer', salary: [30.651], male: [37], female: [29],
      },
      {
        job: 'Special Education Teacher', salary: [40.934], male: [48], female: [35],
      },
      {
        job: 'Teacher', salary: [39.022], male: [46], female: [32],
      },
      {
        job: 'Teacher Assistant', salary: [12.022], male: [18], female: [12],
      },
      {
        job: 'Veterinarian', salary: [44.188], male: [49], female: [39],
      },
      {
        job: 'Waiter/Waitress', salary: [17.266], male: [17], female: [19],
      },
      {
        job: 'Web Developer', salary: [24.833], male: [28], female: [23],
      },
      {
        job: 'Writer and Editor', salary: [50.738], male: [56], female: [44],
      },
    ];

    const salary = [{ average: 80, male: 80, female: 20 }];
    const content = (
      <div id="page-content">
        <StandardFilters />
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here.<br /><br />
                This data represents the average salary statistics.<br /><br />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-heading">
                <div className="panel-control">
                  <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
                </div>
                <h3 className="panel-title">Average Job Salaries</h3>
              </div>


              <div className="collapse in">
                <div className="panel-body" >
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-control">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#demo-tabs-box-1" data-toggle="tab">Average Salary</a></li>
                          <li><a href="#demo-tabs-box-2" data-toggle="tab">Gender Split</a></li>
                        </ul>
                      </div>
                      <h3 className="panel-title"><strong />Jobs A-Z</h3>
                    </div>

                    <div className="panel-body">
                      <div className="tab-content">
                        <div className="tab-pane fade in active" id="demo-tabs-box-1">
                          {jobs.map(element => getPercentRow(element.job, element.salary, '£'))}
                        </div>
                        <div className="tab-pane fade" id="demo-tabs-box-2">
                          {jobs.map(element => (
                            <div>
                              <div className="row">
                                <div className="col-md-4 col-md-push-2">
                                  <p>{element.job}</p>
                                </div>
                              </div>
                              <div>
                                {getPercentRow('Male', element.male)}
                                {getPercentRow('Female', element.female)}
                              </div>
                            </div>
                                ))}
                        </div>
                      </div>

                      <div className="text-right" style={{ marginTop: '26px' }}>
                        <h5>
                          <small>
                                 Percentage values when all responses are aggregated
                          </small>
                        </h5>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const { location } = this.props;

    return (
      <Wrapper content={content} theLocation={location} />
    );
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
