
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../../../content/containers/Fragments/Template/footer';
import NavBar from '../../../../content/containers/Fragments/Template/navbar';
import SideBar from '../../../../content/containers/Fragments/Template/sidebar';
import Aside from '../../../../content/containers/Fragments/Template/aside';

class Wrapper extends React.PureComponent {
  componentDidUpdate() {
    // console.log('logged in: ', this.props.authenticationData.loggedIn);

    // if (this.props.authenticationData.loggedIn === false) {
    //   this.context.router.history.push('/login');
    // }
  }

  getBreadcrumbs() {
    const { breadcrumbs } = this.props.pageData;
    const crumbs = [];

    breadcrumbs.forEach((value, index) => {
      let className = '';

      if (index === breadcrumbs.length - 1) {
        className = 'active';
      }

      crumbs.push(<li key={value.link}><Link href={value.link} to={value.link} className={className}>{value.name}</Link></li>);
    });

    const result = (
      <ol key="static" className="breadcrumb">
        <li><Link href="/" to="/"><i className="far fa-home" /></Link></li>
        {crumbs}
      </ol>
    );

    return result;
  }


  render() {
    const name = this.context.router.route.location.pathname.split('/')[1].toLowerCase();
    let uniName = 'Aristotle University';

    if (name === 'aristotle') uniName = 'Aristotle University';
    else if (name === 'cranfield') uniName = 'Cranfield University';
    else if (name === 'kings') uniName = 'King\'s College London';
    else if (name === 'loughborough') uniName = 'Loughborough University';
    else if (name === 'oxford-brookes') uniName = 'Oxford Brookes University';
    else if (name === 'sheffield') uniName = 'University of Sheffield';
    else if (name === 'sheffield-hallam') uniName = 'Sheffield Hallam University';
    else if (name === 'ucl') uniName = 'University College London';
    else if (name === 'uwe') uniName = 'University of the West of England';
    else if (name === 'durham') uniName = 'Durham University';
    else if (name === 'mmu') uniName = 'Manchester Metropolitan University';
    else if (name === 'liverpool-hope') uniName = 'Liverpool Hope University';
    else if (name === 'chester') uniName = 'University of Chester';
    else this.context.router.history.push('/broken/page');

    return (
      <div id="container" className="effect aside-float aside-fixed aside-bright mainnav-lg">
        <NavBar />
        <div className="boxed">
          {/*  <!--CONTENT CONTAINER--> */}
          <div id="content-container">
            <div id="page-head">
              <div className="pad-all text-center" style={{ paddingBottom: '0' }}>
                <h3 style={{ marginTop: '0' }}>{uniName}</h3>
                <p>{this.props.pageData.pageTitle}</p>
              </div>

              {/*  <!--Page Title--> */}
              {/* <div id="page-title">
                <h1 className="page-header text-overflow">Expanded Navigation</h1>
              </div> */}
              {/*  <!--End page title--> */}

              {/*  <!--Breadcrumb--> */}
              {this.getBreadcrumbs()}
              {/*  <!--End breadcrumb--> */}
            </div>

            {this.props.content}
          </div>
          {/*  <!--END CONTENT CONTAINER--> */}

          <SideBar theLocation={this.props.theLocation} />
          <Aside />
        </div>

        <Footer />
      </div>
    );
  }
}

Wrapper.contextTypes = {
  router: PropTypes.object,
};

Wrapper.propTypes = {
  theLocation: PropTypes.object.isRequired,
  pageData: PropTypes.object,
  content: PropTypes.any.isRequired,
  // authenticationData: PropTypes.object,
};

Wrapper.defaultProps = {
  pageData: {
    pageTitle: 'Welcome to the dashboard',
    breadcrumbs: [
      {
        name: 'Campaign',
        link: '/campaign',
      },
      {
        name: 'Overview',
        link: '/campaign/overview',
      }],
  },
  // authenticationData: {
  //   loggedIn: false,
  // },
};

// we have to bind the location to the state of this component so navigation updates work properly (i.e. so it detects a change in the location props and thus re renderds the app)
const mapStateToProps = state => ({
  location: state.router.location,
  pageData: state.dataStoreSingle.pageData,
  // authenticationData: state.dataStoreSingle.authenticationData,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
