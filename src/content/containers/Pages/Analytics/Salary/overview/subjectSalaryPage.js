import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showNationalAverage: false,
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


  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
    const data = [
      {
        name: 'Clinical Medicine', salary: [26.535], male: [27], female: [24],
      },
      {
        name: 'Public Health, Health Services and Primary Care', salary: [17.08], male: [19], female: [14],
      },
      {
        name: 'Allied Health Professions, Dentistry, Nursing and Pharmacy', salary: [34.4], male: [36], female: [31],
      },
      {
        name: 'Psychology, Psychiatry and Neuroscience', salary: [31.386], male: [33], female: [38],
      },
      {
        name: 'Biological Sciences', salary: [24.987], male: [27], female: [22],
      },
      {
        name: 'Agriculture, Veterinary and Food Science', salary: [15.735], male: [17], female: [15],
      },
      {
        name: 'Earth Systems and Environmental Sciences', salary: [26.26], male: [27.21], female: [24],
      },
      {
        name: 'Chemistry', salary: [22.5], male: [25.37], female: [19],
      },
      {
        name: 'Physics', salary: [23.928], male: [27], female: [20],
      },
      {
        name: 'Mathematical Sciences', salary: [26.42], male: [29], female: [18],
      },
      {
        name: 'Computer Science and Informatics', salary: [19.36], male: [22], female: [15],
      },
      {
        name: 'Aeronautical, Mechanical, Chemical and Manufacturing Engineering', salary: [30.0], male: [34], female: [24],
      },
      {
        name: 'Electrical and Electronic Engineereing, Metallurgy and Materials', salary: [21.653], male: [24], female: [17],
      },
      {
        name: 'Civil and Construction Engineereing', salary: [21.8], male: [25], female: [16],
      },
      {
        name: 'General Engineering', salary: [17.5], male: [20], female: [15],
      },
      {
        name: 'Architecture, Built Environmental Studies and Archaeology', salary: [24.5], male: [30], female: [18],
      },
      {
        name: 'Economics and Econometrics', salary: [18.5], male: [20], female: [16],
      },
      {
        name: 'Business and Management Studies', salary: [19.418], male: [20], female: [16],
      },
      {
        name: 'Law', salary: [33.616], male: [35], female: [28],
      },
      {
        name: 'Politics and International Studies', salary: [25.2], male: [26], female: [20],
      },
      {
        name: 'Social Work and Social Policy', salary: [16.5], male: [18], female: [15],
      },
      {
        name: 'Sociology', salary: [15.7], male: [16.2], female: [14],
      },
      {
        name: 'Anthropology and Development Studies', salary: [14.4], male: [15], female: [14],
      },
      {
        name: 'Education', salary: [16.5], male: [17], female: [14],
      },
      {
        name: 'Sport and Exercise Sciences, Leisure and Tourism', salary: [14.2], male: [17], female: [13],
      },
      {
        name: 'Area Studies', salary: [14.4], male: [15], female: [13],
      },
      {
        name: 'Modern Languages and Linguistics', salary: [16], male: [19], female: [14],
      },
      {
        name: 'English Language and Literature', salary: [13.4], male: [16], female: [12],
      },
      {
        name: 'History', salary: [13.98], male: [14], female: [12],
      },
      {
        name: 'Classics', salary: [12.17], male: [15.9], female: [11],
      },
      {
        name: 'Philosophy', salary: [12.8], male: [14], female: [10],
      },
      {
        name: 'Theology and Religious Studies', salary: [13.417], male: [16], female: [11],
      },
      {
        name: 'Art and Design: History, Practice and Theory', salary: [11.02], male: [13], female: [8],
      },
      {
        name: 'Music, Drama, Dance and Performing Arts', salary: [10.01], male: [11], female: [8],
      },
      {
        name: 'Communication, Cultural and Media Studies, Library and Information Management', salary: [11], male: [12], female: [9],
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


            {/*    <!--Panel with Tabs-->
                    <!--===================================================--> */}
            <div className="panel">

              {/*   <!--Panel heading--> */}
              <div className="panel-heading">
                <div className="panel-control">
                  <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
                </div>
                <h3 className="panel-title">Early Outcome Average Subject Salaries</h3>
              </div>

              <div className="collapse in">
                <div className="panel-body" >
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-control">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#demo-tabs-box-1" data-toggle="tab">Average Salary</a></li>
                          <li><a href="#demo-tabs-box-2" data-toggle="tab">Average Salary by Gender</a></li>
                        </ul>
                      </div>
                    </div>

                    {/*  <!--Panel body--> */}
                    <div className="panel-body">
                      <div className="tab-content">
                        <div className="tab-pane fade in active" id="demo-tabs-box-1">
                          {data.map(element => getPercentRow(element.name, element.salary))}
                        </div>
                        <div className="tab-pane fade" id="demo-tabs-box-2">
                          {data.map(element => (
                            <div>
                              <div className="row">
                                <div className="col-md-4 col-md-push-2">
                                  <p>{element.name}</p>
                                </div>
                              </div>
                              {getPercentRow('Male', element.male)}
                              {getPercentRow('Female', element.female)}
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
                    {/*    <!--===================================================-->
                                <!--End Panel with Tabs--> */}
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