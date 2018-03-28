import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

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

  getGraphs() {
    const jobs = [
      {
        job: 'Accountant', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Actuary', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Advertising Managers and Promotion Managers', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Advertising Sales Agent', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Aircraft Mechanic', salary: [13], male: [13], female: [13],
      },
      {
        job: 'Airline Pilot', salary: [15], male: [15], female: [15],
      },
      {
        job: 'Airport Security Screener', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Animal Groomer', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Architect', salary: [4], male: [4], female: [4],
      },
      {
        job: 'Auto Mechanic', salary: [2], male: [2], female: [2],
      },
      {
        job: 'Bank Teller', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Bartender', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Biomedical Engineer', salary: [13], male: [13], female: [13],
      },
      {
        job: 'Bookkeeping', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Accounting and Auditing Clerks', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Brick Mason', salary: [14], male: [14], female: [14],
      },
      {
        job: 'Budget Analyst', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Cardiovascular Technologist', salary: [20], male: [20], female: [20],
      },
      {
        job: 'Cashier', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Chef', salary: [2], male: [2], female: [2],
      },
      {
        job: 'Chemist', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Claims Adjuster', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Appraiser, Examiner, and Investigator', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Computer Programmer', salary: [4], male: [4], female: [4],
      },
      {
        job: 'Computer System Analyst', salary: [8], male: [8], female: [8],
      },
      {
        job: 'Construction Laborer', salary: [2], male: [2], female: [2],
      },
      {
        job: 'Consultant', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Correctional Officer', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Court Reporter', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Curator', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Customer Service Representative', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Database Administrator', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Dental Hygienist', salary: [4], male: [4], female: [4],
      },
      {
        job: 'Dentist', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Diagnostic Medical Sonographer', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Dietitian/Nutritionist', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Doctor', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Editor', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Electrician', salary: [9], male: [9], female: [9],
      },
      {
        job: 'EMTs and Paramedics', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Environmental Engineer', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Epidemiologist', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Events/Meeting Planner', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Fashion Designer', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Financial Advisor', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Firefighter', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Fitness Trainer', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Flight Attendant', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Funeral Director', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Fundraiser', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Judge', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Glazier', salary: [8], male: [8], female: [8],
      },
      {
        job: 'Graphic Designer', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Guidance Counselor', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Hairdressers, Hairstylists, and Cosmetologists', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Health Educator', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Human Resources Manager', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Home Health Aide', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Hydrologist', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Insurance Underwriter', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Interior Designer', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Interpreter and Translator', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Janitor', salary: [2], male: [2], female: [2],
      },
      {
        job: 'Lawyer', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Librarian', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Licensed Practical Nurse', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Loan Officer', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Manicurist', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Market Research Ananlyst', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Marriage and Family Therapist', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Mechanical Engineer', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Medical Assistant', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Medical Laboratory Technician', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Nursing Assistant', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Occupational Therapist', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Paralegal and Legal Assistant', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Pharmacist', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Pharmacy Technician', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Physician Assistant', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Photographer', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Physical Therapist', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Physical Therapy Assistant', salary: [4], male: [4], female: [4],
      },
      {
        job: 'Plumber', salary: [7], male: [7], female: [7],
      },
      {
        job: 'Police Officer', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Postal Service Worker', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Public Relations Specialist', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Purchasing Manager', salary: [18], male: [18], female: [18],
      },
      {
        job: 'Receptionist', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Registered Nurse', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Retail Salesperson', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Retail Supervisor', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Secretary/ Administrative Assitant', salary: [2], male: [2], female: [2],
      },
      {
        job: 'Security Guard', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Social Media Manager', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Social Worker', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Software Developer', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Special Education Teacher', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Teacher', salary: [9], male: [9], female: [9],
      },
      {
        job: 'Teacher Assistant', salary: [6], male: [6], female: [6],
      },
      {
        job: 'Veterinarian', salary: [12], male: [12], female: [12],
      },
      {
        job: 'Waiter/Waitress', salary: [1], male: [1], female: [1],
      },
      {
        job: 'Web Developer', salary: [3], male: [3], female: [3],
      },
      {
        job: 'Writer and Editor', salary: [12], male: [12], female: [12],
      },
    ];

    const react1 = jobs.map(element => getPercentRow(element.job, element.salary, true, true));

    const react2 = jobs.map(element => (
      <div key={element.job}>
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
    ));

    const panel = (
      <TabbedGraphPanel
        title="Average time to first job"
        globalID="salary-1-6"
        content={[
          {
            title: 'Average Salary',
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

  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">First Job</h3>
            <h5 className="text-muted text-normal">Below we explore the average time it takes to get a first job based on the job title, optionally split by gender.</h5>
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
