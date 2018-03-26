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
        name: 'Clinical Medicine', salary: [53.535], male: [55.98], female: [48],
      },
      {
        name: 'Public Health, Health Services and Primary Care', salary: [33.08], male: [37.98], female: [27],
      },
      {
        name: 'Allied Health Professions, Dentistry, Nursing and Pharmacy', salary: [69.4], male: [73.87], female: [62],
      },
      {
        name: 'Psychology, Psychiatry and Neuroscience', salary: [62.386], male: [65.72], female: [57],
      },
      {
        name: 'Biological Sciences', salary: [47.987], male: [55.85], female: [40],
      },
      {
        name: 'Agriculture, Veterinary and Food Science', salary: [38.735], male: [42.54], female: [32],
      },
      {
        name: 'Earth Systems and Environmental Sciences', salary: [51.26], male: [53.21], female: [48],
      },
      {
        name: 'Chemistry', salary: [44.5], male: [50.37], female: [39],
      },
      {
        name: 'Physics', salary: [47.928], male: [55], female: [40],
      },
      {
        name: 'Mathematical Sciences', salary: [52.42], male: [58], female: [35],
      },
      {
        name: 'Computer Science and Informatics', salary: [38.36], male: [45], female: [30],
      },
      {
        name: 'Aeronautical, Mechanical, Chemical and Manufacturing Engineering', salary: [61.0], male: [68], female: [48],
      },
      {
        name: 'Electrical and Electronic Engineereing, Metallurgy and Materials', salary: [41.653], male: [49], female: [35],
      },
      {
        name: 'Civil and Construction Engineereing', salary: [41.8], male: [50], female: [32],
      },
      {
        name: 'General Engineering', salary: [32.5], male: [40], female: [27],
      },
      {
        name: 'Architecture, Built Environmental Studies and Archaeology', salary: [47.5], male: [64], female: [35],
      },
      {
        name: 'Economics and Econometrics', salary: [33.5], male: [38], female: [27],
      },
      {
        name: 'Business and Management Studies', salary: [33.418], male: [39], female: [27],
      },
      {
        name: 'Law', salary: [67.616], male: [72], female: [61],
      },
      {
        name: 'Politics and International Studies', salary: [47.2], male: [52], female: [41],
      },
      {
        name: 'Social Work and Social Policy', salary: [33.5], male: [36], female: [29],
      },
      {
        name: 'Sociology', salary: [28.7], male: [32.2], female: [27],
      },
      {
        name: 'Anthropology and Development Studies', salary: [27.4], male: [28], female: [26],
      },
      {
        name: 'Education', salary: [31.5], male: [40], female: [28],
      },
      {
        name: 'Sport and Exercise Sciences, Leisure and Tourism', salary: [26.2], male: [34], female: [25],
      },
      {
        name: 'Area Studies', salary: [28.4], male: [29], female: [27],
      },
      {
        name: 'Modern Languages and Linguistics', salary: [32], male: [39], female: [28],
      },
      {
        name: 'English Language and Literature', salary: [27.4], male: [36], female: [25],
      },
      {
        name: 'History', salary: [27.98], male: [28], female: [27],
      },
      {
        name: 'Classics', salary: [27.17], male: [27.9], female: [27],
      },
      {
        name: 'Philosophy', salary: [26.8], male: [35], female: [25],
      },
      {
        name: 'Theology and Religious Studies', salary: [26.417], male: [32], female: [25],
      },
      {
        name: 'Art and Design: History, Practice and Theory', salary: [25.02], male: [28], female: [22],
      },
      {
        name: 'Music, Drama, Dance and Performing Arts', salary: [25.01], male: [28], female: [22],
      },
      {
        name: 'Communication, Cultural and Media Studies, Library and Information Management', salary: [26], male: [27], female: [25],
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
                <h3 className="panel-title">Average Subject Salaries</h3>
              </div>

              <div className="collapse in">
                <div className="panel-body" >
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-control">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#demo-tabs-box-1" data-toggle="tab">First Tab</a></li>
                          <li><a href="#demo-tabs-box-2" data-toggle="tab">Second Tab</a></li>
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
