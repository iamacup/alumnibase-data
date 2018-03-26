import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';

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
        job: 'Accountant', salary: [14.352], male: [16], female: [14],
      },
      {
        job: 'Actuary', salary: [25.594], male: [27], female: [23],
      },
      {
        job: 'Advertising Managers and Promotion Managers', salary: [28], male: [30], female: [27],
      },
      {
        job: 'Advertising Sales Agent', salary: [14.806], male: [15], female: [12],
      },
      {
        job: 'Aircraft Mechanic', salary: [29.751], male: [29], female: [27],
      },
      {
        job: 'Airline Pilot', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Airport Security Screener', salary: [14.075], male: [14], female: [13],
      },
      {
        job: 'Animal Groomer', salary: [8], male: [8], female: [8],
      },
      {
        job: 'Architect', salary: [15.64], male: [17], female: [13],
      },
      {
        job: 'Auto Mechanic', salary: [12.753], male: [14], female: [13],
      },
      {
        job: 'Bank Teller', salary: [14.641], male: [15], female: [9],
      },
      {
        job: 'Bartender', salary: [15], male: [16], female: [13],
      },
      {
        job: 'Biomedical Engineer', salary: [23.416], male: [25], female: [22],
      },
      {
        job: 'Bookkeeping', salary: [12.166], male: [14], female: [10],
      },
      {
        job: 'Accounting and Auditing Clerks', salary: [13.637], male: [14], female: [13],
      },
      {
        job: 'Brick Mason', salary: [12.368], male: [13], female: [11],
      },
      {
        job: 'Budget Analyst', salary: [19.964], male: [21], female: [15],
      },
      {
        job: 'Cardiovascular Technologist', salary: [22.072], male: [23], female: [21],
      },
      {
        job: 'Cashier', salary: [16.824], male: [16], female: [14],
      },
      {
        job: 'Chef', salary: [15.523], male: [19], female: [13],
      },
      {
        job: 'Chemist', salary: [16.5], male: [16], female: [16],
      },
      {
        job: 'Claims Adjuster', salary: [20.245], male: [21], female: [18],
      },
      {
        job: 'Appraiser, Examiner, and Investigator', salary: [18.965], male: [19], female: [16],
      },
      {
        job: 'Computer Programmer', salary: [21.137], male: [23], female: [17],
      },
      {
        job: 'Computer System Analyst', salary: [24.695], male: [27], female: [18],
      },
      {
        job: 'Construction Laborer', salary: [15.801], male: [19], female: [12],
      },
      {
        job: 'Consultant', salary: [19.441], male: [20], female: [17],
      },
      {
        job: 'Correctional Officer', salary: [15.805], male: [17], female: [12],
      },
      {
        job: 'Court Reporter', salary: [18.301], male: [19], female: [15],
      },
      {
        job: 'Curator', salary: [13.280], male: [15], female: [7],
      },
      {
        job: 'Customer Service Representative', salary: [24.075], male: [28], female: [20],
      },
      {
        job: 'Database Administrator', salary: [15.589], male: [16], female: [13],
      },
      {
        job: 'Dental Hygienist', salary: [18.965], male: [19], female: [16],
      },
      {
        job: 'Dentist', salary: [20.761], male: [22], female: [18],
      },
      {
        job: 'Diagnostic Medical Sonographer', salary: [21.828], male: [23], female: [19],
      },
      {
        job: 'Dietitian/Nutritionist', salary: [14.914], male: [15], female: [14],
      },
      {
        job: 'Doctor', salary: [29.691], male: [32], female: [27],
      },
      {
        job: 'Editor', salary: [17.843], male: [19], female: [15],
      },
      {
        job: 'Electrician', salary: [15.765], male: [16], female: [13],
      },
      {
        job: 'EMTs and Paramedics', salary: [26.302], male: [30], female: [22],
      },
      {
        job: 'Environmental Engineer', salary: [25.814], male: [26], female: [22],
      },
      {
        job: 'Epidemiologist', salary: [19.846], male: [20], female: [17],
      },
      {
        job: 'Events/Meeting Planner', salary: [20.280], male: [21], female: [16],
      },
      {
        job: 'Fashion Designer', salary: [20.098], male: [23], female: [17],
      },
      {
        job: 'Financial Advisor', salary: [17.587], male: [19], female: [16],
      },
      {
        job: 'Firefighter', salary: [20.974], male: [22], female: [17],
      },
      {
        job: 'Fitness Trainer', salary: [13.346], male: [15], female: [10],
      },
      {
        job: 'Flight Attendant', salary: [16.732], male: [18], female: [14],
      },
      {
        job: 'Funeral Director', salary: [13.925], male: [13], female: [13],
      },
      {
        job: 'Fundraiser', salary: [14.895], male: [16], female: [12],
      },
      {
        job: 'Judge', salary: [30.080], male: [33], female: [23],
      },
      {
        job: 'Glazier', salary: [17.953], male: [18], female: [14],
      },
      {
        job: 'Graphic Designer', salary: [14.599], male: [16], female: [12],
      },
      {
        job: 'Guidance Counselor', salary: [17.921], male: [17], female: [17],
      },
      {
        job: 'Hairdressers, Hairstylists, and Cosmetologists', salary: [24.007], male: [24], female: [24],
      },
      {
        job: 'Health Educator', salary: [23.247], male: [23], female: [23],
      },
      {
        job: 'Human Resources Manager', salary: [15.813], male: [15], female: [15],
      },
      {
        job: 'Home Health Aide', salary: [9.434], male: [10], female: [8],
      },
      {
        job: 'Hydrologist', salary: [23.138], male: [23], female: [23],
      },
      {
        job: 'Insurance Underwriter', salary: [27.254], male: [29], female: [25],
      },
      {
        job: 'Interior Designer', salary: [23.785], male: [26], female: [19],
      },
      {
        job: 'Interpreter and Translator', salary: [16.623], male: [19], female: [14],
      },
      {
        job: 'Janitor', salary: [10.040], male: [10], female: [8],
      },
      {
        job: 'Lawyer', salary: [30.177], male: [36], female: [25],
      },
      {
        job: 'Librarian', salary: [13.816], male: [16], female: [12],
      },
      {
        job: 'Licensed Practical Nurse', salary: [26.737], male: [25], female: [26],
      },
      {
        job: 'Loan Officer', salary: [25.023], male: [26], female: [24],
      },
      {
        job: 'Manicurist', salary: [16.823], male: [16], female: [16],
      },
      {
        job: 'Market Research Ananlyst', salary: [21.690], male: [21], female: [18],
      },
      {
        job: 'Marriage and Family Therapist', salary: [17.780], male: [18], female: [16],
      },
      {
        job: 'Mechanical Engineer', salary: [25.552], male: [27], female: [22],
      },
      {
        job: 'Medical Assistant', salary: [16.995], male: [18], female: [13],
      },
      {
        job: 'Medical Laboratory Technician', salary: [23.198], male: [25], female: [22],
      },
      {
        job: 'Nursing Assistant', salary: [18.808], male: [22], female: [16],
      },
      {
        job: 'Occupational Therapist', salary: [24.462], male: [26], female: [22],
      },
      {
        job: 'Paralegal and Legal Assistant', salary: [14.103], male: [16], female: [12],
      },
      {
        job: 'Pharmacist', salary: [32.224], male: [33], female: [28],
      },
      {
        job: 'Pharmacy Technician', salary: [16.936], male: [18], female: [13],
      },
      {
        job: 'Physician Assistant', salary: [32.320], male: [35], female: [30],
      },
      {
        job: 'Photographer', salary: [14.099], male: [16], female: [12],
      },
      {
        job: 'Physical Therapist', salary: [26.624], male: [29], female: [20],
      },
      {
        job: 'Physical Therapy Assistant', salary: [22.348], male: [26], female: [18],
      },
      {
        job: 'Plumber', salary: [17.787], male: [18], female: [15],
      },
      {
        job: 'Police Officer', salary: [21.339], male: [23], female: [18],
      },
      {
        job: 'Postal Service Worker', salary: [17.391], male: [19], female: [14],
      },
      {
        job: 'Public Relations Specialist', salary: [27.067], male: [29], female: [23],
      },
      {
        job: 'Purchasing Manager', salary: [17.430], male: [18], female: [16],
      },
      {
        job: 'Receptionist', salary: [16.961], male: [18], female: [16],
      },
      {
        job: 'Registered Nurse', salary: [26.418], male: [28], female: [23],
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
        job: 'Security Guard', salary: [18.476], male: [19], female: [17],
      },
      {
        job: 'Social Media Manager', salary: [17.015], male: [19], female: [15],
      },
      {
        job: 'Social Worker', salary: [16.360], male: [17], female: [16],
      },
      {
        job: 'Software Developer', salary: [25.651], male: [28], female: [23],
      },
      {
        job: 'Special Education Teacher', salary: [25.934], male: [27], female: [22],
      },
      {
        job: 'Teacher', salary: [19.022], male: [23], female: [17],
      },
      {
        job: 'Teacher Assistant', salary: [11.022], male: [14], female: [8],
      },
      {
        job: 'Veterinarian', salary: [26.188], male: [27], female: [23],
      },
      {
        job: 'Waiter/Waitress', salary: [17.266], male: [17], female: [19],
      },
      {
        job: 'Web Developer', salary: [24.833], male: [28], female: [23],
      },
      {
        job: 'Writer and Editor', salary: [13.738], male: [16], female: [10],
      },
    ];

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
