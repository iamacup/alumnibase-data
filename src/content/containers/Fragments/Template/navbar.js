
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { dNc } from '../../../../content/scripts/custom/utilities';

class Page extends React.PureComponent {
  getHistory() {
    if (dNc(this.props.reduxState_historyData) && dNc(this.props.reduxState_historyData.paths)) {
      const { paths } = this.props.reduxState_historyData;
      const history = [];
      let count = 0;

      for (let a = paths.length - 5; a < paths.length; a++) {
        history.push(<li key={paths[a] + count}><Link href={paths[a]} to={paths[a]}>{paths[a]}</Link></li>);
        count++;
      }

      const full = (
        <ul className="list-unstyled">
          <li className="dropdown-header"><i className="far fa-history fa-2x" /> Recently Viewed</li>
          {history}
        </ul>
      );

      return full;
    }

    const empty = (
      <ul className="list-unstyled">
        <li className="dropdown-header"><i className="far fa-history fa-2x" /> Recently Viewed</li>
        <li><a href="#">No history yet!</a></li>
      </ul>
    );

    return empty;
  }

  render() {
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">

          {/*  <!--Brand logo & name--> */}
          {/*  <!--================================--> */}
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <img src={require('../../../../content/theme/custom/images/top-left-logo.png')} alt="Global Logo" className="brand-icon" />
              <div className="brand-title">
                <span className="brand-text">AlumniBase</span>
              </div>
            </a>
          </div>
          {/*  <!--================================--> */}
          {/*  <!--End brand logo & name--> */}


          {/*  <!--Navbar Dropdown--> */}
          {/*  <!--================================--> */}
          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links">

              {/*  <!--Navigation toogle button--> */}
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              <li className="tgl-menu-btn">
                <a className="mainnav-toggle" href="#">
                  <i className="far fa-bars" />
                </a>
              </li>
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              {/*  <!--End Navigation toogle button--> */}


              {/*  <!--Search--> */}
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              {/* <li>
                  <div className="custom-search-form">
                    <label className="btn btn-trans" htmlFor="search-input" data-toggle="collapse" data-target="#nav-searchbox">
                      <i className="pli-magnifi-glass" />
                    </label>
                    <form>
                      <div className="search-container collapse" id="nav-searchbox">
                        <input id="search-input" type="text" className="form-control" placeholder="Type for search..." />
                      </div>
                    </form>
                  </div>
                </li> */}
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              {/*  <!--End Search--> */}


            </ul>
            <ul className="nav navbar-top-links">


              {/*  <!--Mega dropdown--> */}
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              <li className="mega-dropdown">
                <a href="#" className="mega-dropdown-toggle">
                  <i className="far fa-chart-bar" />
                </a>
                <div className="dropdown-menu mega-dropdown-menu">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">

                      {/*  <!--Mega menu list--> */}
                      <ul className="list-unstyled">
                        <li className="dropdown-header"><i className="far fa-list-alt fa-2x" /> Your Favorites</li>
                        <li><a href="#">You do not have any favorites yet.</a></li>
                      </ul>

                    </div>
                    <div className="col-sm-6 col-md-4">

                      {/*  <!--Mega menu list--> */}
                      {this.getHistory()}
                    </div>
                    <div className="col-sm-12 col-md-4">
                      {/*  <!--Mega menu list--> */}
                      <ul className="list-unstyled">
                        <li>
                          <a href="#" className="media mar-btm">
                            <div className="media-left">
                              <i className="far fa-edit fa-2x" />
                            </div>
                            <div className="media-body">
                              <p className="text-semibold text-main mar-no">Edit</p>
                              <small className="text-muted">Change your favorites</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="media mar-btm">
                            <div className="media-left">
                              <i className="far fa-history fa-2x" />
                            </div>
                            <div className="media-body">
                              <p className="text-semibold text-main mar-no">Your History</p>
                              <small className="text-muted">See everything you have looked at</small>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              {/*  <!--End mega dropdown--> */}


              {/*  <!--User dropdown--> */}
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              <li id="dropdown-user" className="dropdown">
                <a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
                  <span className="ic-user pull-right">
                    {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                    {/*  <!--You can use an image instead of an icon.--> */}
                    {/*  <!--<img class="img-circle img-user media-object" src="img/profile-photos/1.png" alt="Profile Picture">--> */}
                    {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                    <i className="far fa-user" />
                  </span>
                  {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                  {/*  <!--You can also display a user name in the navbar.--> */}
                  {/*  <!--<div class="username hidden-xs">Aaron Chavez</div>--> */}
                  {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                </a>

                <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
                  <ul className="head-list">
                    <li>
                      <Link href="/profile/settings" to="/profile/settings" className="list-group-item"><i className="far fa-cog" style={{ marginRight: '8px' }} />  Settings</Link>
                    </li>
                    <li>
                      <Link href="/help" to="/help" className="list-group-item"><i className="far fa-question" style={{ marginRight: '8px' }} /> Help</Link>
                    </li>
                    <li>
                      <a href="#" className="list-group-item"> <i className="far fa-sign-out" style={{ marginRight: '8px' }} /> Logout</a>
                    </li>
                  </ul>
                </div>
              </li>
              {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
              {/*  <!--End user dropdown--> */}

              <li className="hidden-xs">
                <a href="#" className="aside-toggle">
                  <i className="far fa-thumbtack" />
                </a>
              </li>
            </ul>
          </div>
          {/*  <!--================================--> */}
          {/*  <!--End Navbar Dropdown--> */}

        </div>
      </header>
    );
  }
}

Page.propTypes = {
  reduxState_historyData: PropTypes.object,
};

Page.defaultProps = {
  reduxState_historyData: {},
};

const mapStateToProps = state => ({
  reduxState_historyData: state.dataStoreSingle.historyData,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
