
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Page extends React.PureComponent {
  render() {
    return (
      <footer id="footer">

        {/*  <!-- Visible when footer positions are fixed --> */}
        {/*  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --> */}
        {/* <div className="show-fixed pad-rgt pull-right">
                  You have <a href="#" className="text-main"><span className="badge badge-danger">3</span> pending action.</a>
          </div> */}

        {/*  <!-- Visible when footer positions are static --> */}
        {/*  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --> */}
        <div className="hide-fixed pull-right pad-rgt">
                  Your campaign is currently <strong>ACTIVE</strong>.
        </div>

        {/*  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --> */}
        {/*  <!-- Remove the class "show-fixed" and "hide-fixed" to make the content always appears. --> */}
        {/*  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --> */}
        <p className="pad-lft">&#0169; 2018 AlumniBase</p>

      </footer>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
