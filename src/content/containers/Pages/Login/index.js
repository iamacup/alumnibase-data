import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import LoadingArea from '../../../../content/components/Loading';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../content/scripts/custom/utilities';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

const dataStoreID = 'login';
const FetchData = fetchDataBuilder('login');

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
    let {username, password} = this;

    if (dNc(this.username)) {
      username = this.username.value;
      password = this.password.value;
    }

    this.setState({
      username,
      password,
    });
  }


  render() {
    // let generalStatus = null;
    let payload = null;

    if (dNc(this.props.reduxState_fetchDataTransaction.default)) {
      ({ payload } = this.props.reduxState_fetchDataTransaction.default);
    }

    const { username, password } = this.state;
    const sendData = { username, password };

    let active = false;
    if (dNc(username) && dNc(password)) active = true;

    const errorHandler = () => {
      $(this.errorText).toggleClass('d-block');
    };

    const successHandler = () => {
      const loggedIn = true;
      const fullName = 'Patrick McConnell';
      const profileImage = 'data:image/png;base64,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';

      this.props.reduxAction_doUpdate('authenticationData', {
        loggedIn,
        username,
        fullName,
        profileImage,
      });

      this.context.router.history.push('/campaign/overview');
    };

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
                    <div className="d-none" ref={(element) => { this.errorText = element; }} style={{ color: 'red', fontSize: '13px', marginBottom: '10px' }}>{payload}</div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Sign In</button>
                    <FetchData
                      active={active}
                      fetchURL="api/AB/data/login"
                      sendData={sendData}
                      noRender
                      errorCallback={payLoad => errorHandler(payLoad)}
                      fatalCallback={() => errorHandler('The backend was broken')}
                      successCallback={() => successHandler()}
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
