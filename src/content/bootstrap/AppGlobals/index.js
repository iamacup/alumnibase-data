import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import echarts from 'echarts';

import { dNc, fireDebouncedResizeEvents, getAuthenticationCookie } from '../../../content/scripts/custom/utilities';

import * as storeAction from '../../../foundation/redux/globals/DataStoreSingle/actions';

// nifty core stylesheet - required
import '../../../../src/includes/nifty-v2.9/css-preprocessors/scss/nifty.scss';

import '../../../content/theme/custom/scss/template-theme-override.scss';

// premium icons - options -- TODO should migrate to FA exlusively?
import '../../../../src/includes/nifty-v2.9/premium/icon-sets/icons/line-icons/premium-line-icons.min.css';
import '../../../../src/includes/nifty-v2.9/premium/icon-sets/icons/solid-icons/premium-solid-icons.min.css';

// FontAwesome
import '../../../../src/includes/fontawesome-pro-5.0.4/web-fonts-with-css/css/fontawesome-all.css';

// our custom styles
import '../../../content/theme/custom/scss/application.scss';

// form validation for email login.
import '../../../content/theme/vendor/formValidation-0.7.1.min.css';

import fetchDataBuilder from '../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'global-state-fetcher';
const FetchData = fetchDataBuilder(dataStoreID);

const listenersList = {};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchSessionData: false,
    };
  }

  componentDidMount() {
    // include the bootstrap javascript
    require('../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');

    // this is a hack to make echarts available to the uk map - need to replace this with the expose loader!!!
    window.echarts = echarts;
    window.ourGraphResizeEventList = listenersList;

    $(() => {
      // we force SSL
      if (!window.location.href.includes('localhost:3000')) {
        if (window.location.protocol !== 'https:') {
          window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
      }

      // we do this to make sure that when start things, the nifty things execute
      // i thought we would need to do this but apparently not - calling htis actually seems to break things...
      // $(document).trigger('nifty.ready');
      $(document).trigger('nifty.ready');

      // fire resize events
      fireDebouncedResizeEvents();

      // listen for them here
      $(document).on('debouncedResizeEvent', () => {
        // we resize the current graph on screen
        this.handleResizeGraphs();
      });

      // here we need to do something for the case that there is no user session data but there is an authentication cookie
      // we do this here to make sure that the cookies and all the cookie libraries are all loaded (otherwise we could run this login in render)
      if (this.props.authenticationData.loggedIn === false && dNc(getAuthenticationCookie()) === true) {
        this.setState({ fetchSessionData: true });
      }

      // here we check to see if we need to redirect to the login page
      if (this.props.authenticationData.loggedIn === false && !dNc(getAuthenticationCookie()) === true) {
        this.context.router.history.push('/');
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      let paths = [];

      if (dNc(this.props.reduxState_historyData) && dNc(this.props.reduxState_historyData.paths)) {
        ({ paths } = this.props.reduxState_historyData);
      }

      paths.push(this.props.location.pathname);
    }
  }

  handleResizeGraphs() {
    const arr = Object.values(window.ourGraphResizeEventList);

    arr.forEach((value) => {
      if (dNc(value)) {
        value();
      }
    });
  }

  successHandler(payload) {
    const loggedIn = true;
    const {
      fullName, profileImage, institution, username,
    } = payload;

    this.props.reduxAction_doUpdate('authentication', {
      loggedIn,
      username,
      fullName,
      profileImage,
      institution,
    });
  }

  errorHandler(message) {
    // todo
    console.log('we do not handle an error in the session fetch data at this time!');
    console.log(message);
  }

  render() {
    let fetchData = null;

    if (this.state.fetchSessionData === true) {
      fetchData = (
        <FetchData
          key="fetch"
          active
          fetchURL="api/authentication/ABdata/sessionData"
          sendData={{}}
          successCallback={(payload) => { this.successHandler(payload); }}
          errorCallback={(payLoad) => { this.errorHandler(payLoad); }}
          fatalCallback={() => { this.errorHandler('The backend did not respond properly.'); }}
        />
      );
    }

    let path = 'https://data.alumnibaseapp.com/';

    // todo this won't work because this component does not have access to the path at server render time, only things instantiated within the route <i.e. components that are made by the router> have access at render time
    if (dNc(this.props.location) && dNc(this.props.location.pathname)) {
      path = 'https://data.alumnibaseapp.com' + this.props.location.pathname;
    }

    return [
      <Helmet
        key="helmet"
        meta={[
              {
                property: 'og:url',
                content: path,
              },
            ]}
      />,
      fetchData,
    ];
  }
}

App.contextTypes = {
  router: PropTypes.object,
};

App.propTypes = {
  location: PropTypes.object,
  reduxState_historyData: PropTypes.object,
  authenticationData: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
};

App.defaultProps = {
  location: {},
  reduxState_historyData: {},
  authenticationData: {
    loggedIn: false,
  },
  reduxAction_doUpdate: () => {},
};

// we have to bind the location to the state of this component so navigation updates work properly (i.e. so it detects a change in the location props and thus re renderds the app)
const mapStateToProps = state => ({
  location: state.router.location,
  reduxState_historyData: state.dataStoreSingle.historyData,
  authenticationData: state.dataStoreSingle.authentication,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
