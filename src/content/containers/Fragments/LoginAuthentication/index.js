import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import {
  dNc,
  defaultError,
  setAuthenticationCookie,
} from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';
// import * as authenticationAction from '../../../../content/containers/Fragments/Authentication/action';

const dataStoreID = 'registration'; //this might change!!
// const RegistrationContainer = fetchDataBuilder('registeration');


class EmailAuthentication extends React.Component {
  componentDidMount() {
    require('formvalidation');
    require('../../../../../node_modules/formvalidation/dist/js/framework/bootstrap.js');
    
    console.log('Email Authenticating')
  }

  render() {
    return (
      <div>
      </div>
      )
  }
}

EmailAuthentication.propTypes = {
  reduxAction_doUpdate: PropTypes.func,
  // reduxAction_doSetLoginWithCookieDataDiscrete: PropTypes.func,
  reduxState_this: PropTypes.object,
  formID: PropTypes.string.isRequired,
  registerCallback: PropTypes.func,
};

EmailAuthentication.defaultProps = {
  reduxAction_doUpdate: () => {},
  // reduxAction_doSetLoginWithCookieDataDiscrete: () => {},
  reduxState_this: {},
  registerCallback: () => {},
};

const mapStateToProps = state => ({
  reduxState_this: state.dataStoreSingle[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: data => dispatch(storeAction.doUpdate(dataStoreID, data)),
  // reduxAction_doSetLoginWithCookieDataDiscrete: cookieData => dispatch(authenticationAction.setLoginWithCookieDataDiscrete(cookieData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuthentication);
