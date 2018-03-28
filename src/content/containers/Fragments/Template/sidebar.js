
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { dNc } from '../../../../content/scripts/custom/utilities';

class Page extends React.PureComponent {
  classNameBasedOnLocation(startsWith, className) {
    if (dNc(this.props.theLocation) && dNc(this.props.theLocation.pathname) && this.props.theLocation.pathname.startsWith(startsWith)) {
      return className;
    }

    return '';
  }

  render() {
    return (
      <nav id="mainnav-container">
        <div id="mainnav">


          {/*  <!--OPTIONAL : ADD YOUR LOGO TO THE NAVIGATION--> */}
          {/*  <!--It will only appear on small screen devices.--> */}
          {/*  <!--================================
                      <div class="mainnav-brand">
                          <a href="index.html" class="brand">
                              <img src="img/logo.png" alt="Nifty Logo" class="brand-icon">
                              <span class="brand-text">Nifty</span>
                          </a>
                          <a href="#" class="mainnav-toggle"><i class="pci-cross pci-circle icon-lg"></i></a>
                      </div>
                      --> */}


          {/*  <!--Menu--> */}
          {/*  <!--================================--> */}
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content">

                {/*  <!--Profile Widget--> */}
                {/*  <!--================================--> */}
                <div id="mainnav-profile" className="mainnav-profile">
                  <div className="profile-wrap text-center">
                    <div className="pad-btm">
                      <img className="img-circle img-md" src={require('../../../../../src/includes/nifty-v2.9/img/profile-photos/1.png')} alt="Profile" />


                    </div>
                    <a href="#profile-nav" className="box-block" data-toggle="collapse" aria-expanded="false">
                      <span className="pull-right dropdown-toggle">
                        <i className="dropdown-caret" />
                      </span>
                      <p className="mnp-name">Patrick McConnell</p>
                      <span className="mnp-desc">patrick@alumnibaseapp.com</span>
                    </a>
                  </div>
                  <div id="profile-nav" className="collapse list-group bg-trans">
                    <Link href="/profile/settings" to="/profile/settings" className="list-group-item">
                      <i className="far fa-cog" style={{ marginLeft: '5px', marginRight: '5px', fontSize: '1.333em' }} /> Settings
                    </Link>
                    <Link href="/help" to="/help" className="list-group-item">
                      <i className="far fa-question" style={{ marginLeft: '5px', marginRight: '5px', fontSize: '1.333em' }} /> Help
                    </Link>
                    <a href="#" className="list-group-item">
                      <i className="far fa-sign-out" style={{ marginLeft: '5px', marginRight: '5px', fontSize: '1.333em' }} /> Logout
                    </a>
                  </div>
                </div>


                <ul id="mainnav-menu" className="list-group">

                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Campaign</li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/campaign/overview', 'active-link')}>
                    <Link href="/campaign/overview" to="/campaign/overview">
                      <i className="far fa-binoculars" />
                      <span className="menu-title">Overview</span>
                    </Link>
                  </li>

                  {/*
                  <li className={this.classNameBasedOnLocation('/campaign/contacts', 'active-link')}>
                    <Link href="/campaign/contacts" to="/campaign/contacts">
                      <i className="far fa-address-card" />
                      <span className="menu-title">Contacts</span>
                    </Link>
                  </li>

                  <li className={this.classNameBasedOnLocation('/campaign/segmentation-and-phases', 'active-link')}>
                    <Link href="/campaign/segmentation-and-phases" to="/campaign/segmentation-and-phases">
                      <i className="far fa-cogs" />
                      <span className="menu-title">Segmentation & Phases</span>
                    </Link>
                  </li>
                  */}

                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Analytics</li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/salary', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Salary Data</span>
                      <i className="arrow" />
                    </a>
                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/salary', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/salary/overview', 'active-link')}>
                        <Link href="/analytics/salary/overview" to="/analytics/salary/overview">Overview</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/salary/1', 'active-link')}>
                        <Link href="/analytics/salary/1" to="/analytics/salary/1">Ranges</Link>
                      </li>
                    </ul>
                  </li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/jobs', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Jobs and Careers</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/jobs', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/1', 'active-link')}>
                        <Link href="/analytics/jobs/1" to="/analytics/jobs/1">Overview</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/employers', 'active-link')}>
                        <Link href="/analytics/jobs/1" to="/analytics/jobs/employers">Employers</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/2', 'active-link')}>
                        <Link href="/analytics/jobs/2" to="/analytics/jobs/2">First Year Salary</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/jobs/4', 'active-link')}>
                        <Link href="/analytics/jobs/4" to="/analytics/jobs/4">Time to First Job</Link>
                      </li>
                    </ul>
                  </li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/subjects', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Subjects</span>
                      <i className="arrow" />
                    </a>
                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/subjects', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/1', 'active-link')}>
                        <Link href="/analytics/subjects/1" to="/analytics/subjects/1">First Year Salary</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/4', 'active-link')}>
                        <Link href="/analytics/subjects/4" to="/analytics/subjects/4">Time to First Job</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/vfm', 'active-link')}>
                        <Link href="/analytics/subjects/vfm" to="/analytics/subjects/vfm">Value For Money</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/subjects/3', 'active-link')}>
                        <Link href="/analytics/subjects/3" to="/analytics/subjects/3">Longterm Outcomes</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/stem', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">STEM</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/stem', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/stem/overview', 'active-link')}>
                        <Link href="/analytics/stem/overview" to="/analytics/stem/overview">Overview</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/polar', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">POLAR</span>
                      <i className="arrow" />
                    </a>
                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/polar', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/polar', 'active-link')}>
                        <Link href="/analytics/polar" to="/analytics/polar">Outcomes</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/further-study', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Further Study</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/stem', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/further-study/overview', 'active-link')}>
                        <Link href="/analytics/further-study/overview" to="/analytics/further-study/overview">Overview</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/views', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Respondant Views</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/views', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/views/1', 'active-link')}>
                        <Link href="/analytics/views/1" to="/analytics/views/1">Views on Education Impact</Link>
                      </li>
                    </ul>
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/views', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/views/2', 'active-link')}>
                        <Link href="/analytics/views/2" to="/analytics/views/2">Views on Overall Happiness</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/destination', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">Geographic Data</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/destination', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/destination/1', 'active-link')}>
                        <Link href="/analytics/destination/1" to="/analytics/destination/1">Global</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/destination/2', 'active-link')}>
                        <Link href="/analytics/destination/2" to="/analytics/destination/2">Local</Link>
                      </li>
                    </ul>
                  </li>


                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Regulatory Outputs</li>


                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/dlhe-like', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#8bc34a' }} />
                      <span className="menu-title">DLHE-Like</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/dlhe-like', 'in')} >
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/2-3', 'active-link')}>
                        <Link href="/analytics/dlhe-like/2-3" to="/analytics/dlhe-like/2-3">RQ 2/3 - Graduates and What they Are Doing</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/4', 'active-link')}>
                        <Link href="/analytics/dlhe-like/4" to="/analytics/dlhe-like/4">RQ 4 - Full Time Graduate Destinations</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/5', 'active-link')}>
                        <Link href="/analytics/dlhe-like/5" to="/analytics/dlhe-like/5">RQ 5 - Destination, Employment and Earnings</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/6', 'active-link')}>
                        <Link href="/analytics/dlhe-like/6" to="/analytics/dlhe-like/6">RQ 6 - Employment Outcomes</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/7', 'active-link')}>
                        <Link href="/analytics/dlhe-like/7" to="/analytics/dlhe-like/7">RQ 7 - UK Domicilied Graduates</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/8', 'active-link')}>
                        <Link href="/analytics/dlhe-like/7" to="/analytics/dlhe-like/8">RQ 8 - Graduates in Employment</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/9', 'active-link')}>
                        <Link href="/analytics/dlhe-like/9" to="/analytics/dlhe-like/9">RQ 9 - Geographical Destinations of Employment</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/dlhe-like/11', 'active-link')}>
                        <Link href="/analytics/dlhe-like/11" to="/analytics/dlhe-like/11">RQ 11 - First Time Graduates in full time work</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/further-study', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#03a9f4' }} />
                      <span className="menu-title">Further Study</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/further-study', 'in')}>
                      <li className={this.classNameBasedOnLocation('/analytics/further-study/105', 'active-link')}>
                        <Link href="/analytics/further-study/trends" to="/analytics/further-study/105">RQ 105 - Trends for Further Study</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/further-study/106-109', 'active-link')}>
                        <Link href="/analytics/further-study/trends" to="/analytics/further-study/106-109">RQ 106-109 - Further Study Details</Link>
                      </li>
                    </ul>
                  </li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/analytics/widening-participation', 'active-sub')}>
                    <a href="#">
                      <i className="far fa-adjust" style={{ color: '#ab47bc' }} />
                      <span className="menu-title">Widening Participation</span>
                      <i className="arrow" />
                    </a>

                    {/*  <!--Submenu--> */}
                    <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/widening-participation', 'in')}>
                      <li className={this.classNameBasedOnLocation('/analytics/widening-participation/bme-economic-achievement', 'active-link')}>
                        <Link href="/analytics/widening-participation/bme-economic-achievement" to="/analytics/widening-participation/bme-economic-achievement">BME Economic Achievement</Link>
                      </li>
                      <li className={this.classNameBasedOnLocation('/analytics/widening-participation/improving-technical-pathways', 'active-link')}>
                        <Link href="/analytics/widening-participation/improving-technical-pathways" to="/analytics/widening-participation/improving-technical-pathways">Improving Technical Pathways of BME and POLAR3</Link>
                      </li>
                    </ul>
                  </li>


                  <li className="list-divider" />

                  {/*  <!--Category name--> */}
                  <li className="list-header">Data Control</li>

                  {/*  <!--Menu list item--> */}
                  <li className={this.classNameBasedOnLocation('/data-control/export', 'active-link')}>
                    <Link href="/data-control/export" to="/data-control/export">
                      <i className="far fa-upload" />
                      <span className="menu-title">Export</span>
                    </Link>
                  </li>


                </ul>


              </div>
            </div>
          </div>
          {/*  <!--================================--> */}
          {/*  <!--End menu--> */}

        </div>
      </nav>
    );
  }
}

/*

old advanced analytics

<li className="list-divider" />


<li className="list-header">Advanced Analytics</li>


<li className={this.classNameBasedOnLocation('/analytics/employment-outcomes', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">Employment Outcomes</span>
    <i className="arrow" />
  </a>


  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/employment-outcomes', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/employment-destinations', 'active-link')}>
      <Link href="/analytics/employment-outcomes/employment-destinations" to="/analytics/employment-outcomes/employment-destinations">Employment Destinations</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/earning-trends', 'active-link')}>
      <Link href="/analytics/employment-outcomes/earning-trends" to="/analytics/employment-outcomes/earning-trends">Earning Trends</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/impact-on-career', 'active-link')}>
      <Link href="/analytics/employment-outcomes/impact-on-career" to="/analytics/employment-outcomes/impact-on-career">Impact on Career</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/student-voice', 'active-link')}>
      <Link href="/analytics/employment-outcomes/student-voice" to="/analytics/employment-outcomes/student-voice">Student Voice</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/employment-outcomes/carrer-advice', 'active-link')}>
      <Link href="/analytics/employment-outcomes/carrer-advice" to="/analytics/employment-outcomes/carrer-advice">Career Advice</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/higher-education-trends', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">HE Trends</span>
    <i className="arrow" />
  </a>


  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/higher-education-trends', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/further-study-outcomes', 'active-link')}>
      <Link href="/analytics/higher-education-trends/further-study-outcomes" to="/analytics/higher-education-trends/further-study-outcomes">Further Study Outcomes</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/full-time-part-time-trends', 'active-link')}>
      <Link href="/analytics/higher-education-trends/full-time-part-time-trends" to="/analytics/higher-education-trends/full-time-part-time-trends">Full Time / Part Time Trends</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/uk-eu-non-eu', 'active-link')}>
      <Link href="/analytics/higher-education-trends/uk-eu-non-eu" to="/analytics/higher-education-trends/uk-eu-non-eu">UK / EU / Non-EU</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/higher-education-trends/mature-students', 'active-link')}>
      <Link href="/analytics/higher-education-trends/mature-students" to="/analytics/higher-education-trends/mature-students">Mature Students</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/dlhe-plus', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">DLHE+</span>
    <i className="arrow" />
  </a>

  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/dlhe-plus', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/dlhe-plus/soon', 'active-link')}>
      <Link href="/analytics/dlhe-plus/soon" to="/analytics/dlhe-plus/soon">Coming Soon</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/widening-participation-2', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">Widening Pariticpation</span>
    <i className="arrow" />
  </a>

  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/widening-participation-2', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/students-with-disabilities', 'active-link')}>
      <Link href="/analytics/widening-participation-2/students-with-disabilities" to="/analytics/widening-participation-2/students-with-disabilities">Students with Disabilities</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/ethnicity-and-socio-economic-background', 'active-link')}>
      <Link href="/analytics/widening-participation-2/ethnicity-and-socio-economic-background" to="/analytics/widening-participation-2/ethnicity-and-socio-economic-background">Ethnicity & Socio-economic background</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/part-time-and-mature-students', 'active-link')}>
      <Link href="/analytics/widening-participation-2/part-time-and-mature-students" to="/analytics/widening-participation-2/part-time-and-mature-students">Part Time & Mature Students </Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/government-opportunity-areas', 'active-link')}>
      <Link href="/analytics/widening-participation-2/government-opportunity-areas" to="/analytics/widening-participation-2/government-opportunity-areas">Government Opportunity Areas</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/widening-participation-2/ncop', 'active-link')}>
      <Link href="/analytics/widening-participation-2/ncop" to="/analytics/widening-participation-2/ncop">NCOP</Link>
    </li>
  </ul>
</li>


<li className={this.classNameBasedOnLocation('/analytics/student-satisfaction', 'active-sub')}>
  <a href="#">
    <i className="far fa-adjust" style={{ color: '#ffb300' }} />
    <span className="menu-title">Student Satisfaction</span>
    <i className="arrow" />
  </a>

  <ul className={'collapse ' + this.classNameBasedOnLocation('/analytics/student-satisfaction', 'in')} >
    <li className={this.classNameBasedOnLocation('/analytics/student-satisfaction/recent-graduates-teaching-satisfaction', 'active-link')}>
      <Link href="/analytics/student-satisfaction/recent-graduates-teaching-satisfaction" to="/analytics/student-satisfaction/recent-graduates-teaching-satisfaction">Recent Graduates Teaching Satisfaction</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/student-satisfaction/welfare-provision', 'active-link')}>
      <Link href="/analytics/student-satisfaction/welfare-provision" to="/analytics/student-satisfaction/welfare-provision">Welfare Provision</Link>
    </li>
    <li className={this.classNameBasedOnLocation('/analytics/student-satisfaction/degree-worth-it', 'active-link')}>
      <Link href="/analytics/student-satisfaction/degree-worth-it" to="/analytics/student-satisfaction/degree-worth-it">Degree worth it?</Link>
    </li>
  </ul>
</li>

*/


Page.propTypes = {
  theLocation: PropTypes.object.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
