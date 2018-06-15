import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import LoadingArea from '../../../../content/components/Loading';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import { dNc, setAuthenticationCookie } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'login';
const FetchData = fetchDataBuilder(dataStoreID);

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    require('formvalidation');
    require('../../../../../node_modules/formvalidation/dist/js/framework/bootstrap.js');

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      $(this.form).formValidation({
        framework: 'bootstrap',
        icon: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh',
        },
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'The username is required',
              },
              emailAddress: {
                onError() {
                },
                onSuccess() {
                },
              },
            },
          },
          password: {
            validators: {
              notEmpty: {
                message: 'The password is required',
              },
            },
          },
        },
      }).on('success.form.fv', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    });
  }

  handleSubmit() {
    let { username, password } = this;

    if (dNc(this.username)) {
      username = this.username.value;
      password = this.password.value;
    }

    this.setState({
      username,
      password,
    });
  }

  errorHandler(message) {
    let payload = 'An error has occured.';

    if (dNc(message)) {
      payload = message;
    } else if (dNc(this.props.reduxState_fetchDataTransaction.default)) {
      ({ payload } = this.props.reduxState_fetchDataTransaction.default);
    }

    $(this.errorText).removeClass('d-none').addClass('d-block').text(payload);
  }

  successHandler(payload) {
    // payload contains a .token prop that is a JWT (JSON Web Token) which we need to store in a cookie
    setAuthenticationCookie(payload.token);

    const { username } = this.state;
    const loggedIn = true;
    const { fullName, profileImage } = payload;

    this.props.reduxAction_doUpdate('authenticationData', {
      loggedIn,
      username,
      fullName,
      profileImage,
    });

    this.context.router.history.push('/' + payload.siteURL + '/campaign/overview');
  }

  render() {
    const { username, password } = this.state;
    const sendData = { username, password };

    let active = false;

    if (dNc(username) && dNc(password)) {
      active = true;
    }

    return (
      <div id="container" className="cls-container">
        <div classNameName="row">
          <div className="col-md-8 col-md-push-2">
            <div className="cls-content" ref={(element) => { this.errorDiv = element; }}>
              <div className="cls-content-sm panel">
                <div className="panel-body">

                  <div className="mar-ver pad-btm">
                    <h1 className="h3">AlumniBase Login</h1>
                    <p>Sign In to your account</p>
                  </div>

                  <form ref={(element) => { this.form = element; }}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        id="username"
                        ref={(element) => { this.username = element; }}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        id="password"
                        ref={(element) => { this.password = element; }}
                      />
                    </div>

                    <div
                      className="d-none"
                      ref={(element) => { this.errorText = element; }}
                      style={{ color: 'red', fontSize: '13px', marginBottom: '10px' }}
                    />

                    <button className="btn btn-primary btn-lg btn-block" type="submit">Sign In</button>

                    <FetchData
                      active={active}
                      fetchURL="api/authentication/ABdata/login"
                      sendData={sendData}
                      noRender
                      errorCallback={(payLoad) => { this.errorHandler(payLoad); }}
                      fatalCallback={() => { this.errorHandler('The backend did not respond properly.'); }}
                      successCallback={(payload) => { this.successHandler(payload); }}
                    />
                  </form>
                </div>

                <div className="pad-all">
                  <a href="pages-password-reminder.html" className="btn-link mar-rgt">Forgot password ?</a>
                  <a href="pages-register.html" className="btn-link mar-lft">Create a new account</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Login.contextTypes = {
  router: PropTypes.object,
};

Login.propTypes = {
  reduxState_fetchDataTransaction: PropTypes.object,
  reduxAction_doUpdate: PropTypes.func,
};

Login.defaultProps = {
  reduxState_fetchDataTransaction: {},
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
