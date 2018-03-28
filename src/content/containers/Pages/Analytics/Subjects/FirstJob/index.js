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
    const data = [
      {
        name: 'Clinical Medicine', salary: [18], male: [18], female: [18],
      },
      {
        name: 'Public Health, Health Services and Primary Care', salary: [9], male: [9], female: [9],
      },
      {
        name: 'Allied Health Professions, Dentistry, Nursing and Pharmacy', salary: [9], male: [9], female: [9],
      },
      {
        name: 'Psychology, Psychiatry and Neuroscience', salary: [16], male: [16], female: [16],
      },
      {
        name: 'Biological Sciences', salary: [16], male: [16], female: [16],
      },
      {
        name: 'Agriculture, Veterinary and Food Science', salary: [12], male: [12], female: [12],
      },
      {
        name: 'Earth Systems and Environmental Sciences', salary: [12], male: [12], female: [12],
      },
      {
        name: 'Chemistry', salary: [9], male: [9], female: [9],
      },
      {
        name: 'Physics', salary: [9], male: [9], female: [9],
      },
      {
        name: 'Mathematical Sciences', salary: [9], male: [9], female: [9],
      },
      {
        name: 'Computer Science and Informatics', salary: [6], male: [6], female: [6],
      },
      {
        name: 'Aeronautical, Mechanical, Chemical and Manufacturing Engineering', salary: [12], male: [12], female: [12],
      },
      {
        name: 'Electrical and Electronic Engineereing, Metallurgy and Materials', salary: [6], male: [6], female: [6],
      },
      {
        name: 'Civil and Construction Engineereing', salary: [6], male: [6], female: [6],
      },
      {
        name: 'General Engineering', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Architecture, Built Environmental Studies and Archaeology', salary: [6], male: [6], female: [6],
      },
      {
        name: 'Economics and Econometrics', salary: [9], male: [9], female: [9],
      },
      {
        name: 'Business and Management Studies', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Law', salary: [6], male: [6], female: [6],
      },
      {
        name: 'Politics and International Studies', salary: [6], male: [6], female: [6],
      },
      {
        name: 'Social Work and Social Policy', salary: [4], male: [4], female: [4],
      },
      {
        name: 'Sociology', salary: [4], male: [4], female: [4],
      },
      {
        name: 'Anthropology and Development Studies', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Education', salary: [4], male: [4], female: [4],
      },
      {
        name: 'Sport and Exercise Sciences, Leisure and Tourism', salary: [1], male: [1], female: [1],
      },
      {
        name: 'Area Studies', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Modern Languages and Linguistics', salary: [3], male: [3], female: [3],
      },
      {
        name: 'English Language and Literature', salary: [3], male: [3], female: [3],
      },
      {
        name: 'History', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Classics', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Philosophy', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Theology and Religious Studies', salary: [6], male: [6], female: [6],
      },
      {
        name: 'Art and Design: History, Practice and Theory', salary: [3], male: [3], female: [3],
      },
      {
        name: 'Music, Drama, Dance and Performing Arts', salary: [4], male: [4], female: [4],
      },
      {
        name: 'Communication, Cultural and Media Studies, Library and Information Management', salary: [1], male: [1], female: [1],
      },
    ];

    const react1 = data.map(element => getPercentRow(element.name, element.salary, true, true));

    const react2 = data.map(element => (
      <div key={element.name}>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{element.name}</p>
          </div>
        </div>
        {getPercentRow('Male', element.male)}
        {getPercentRow('Female', element.female)}
      </div>
    ));

    const panel = (
      <TabbedGraphPanel
        title="High level subject salaries"
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
