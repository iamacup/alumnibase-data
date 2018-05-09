import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingArea from '../../../../content/components/Loading';

import fetchDataBuilder from '../../../../foundation/redux/Factories/FetchData';
import { dNc } from '../../../../content/scripts/custom/utilities';

import * as fetchActions from '../../../../foundation/redux/globals/DataTransactions/actions';

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
      // this.handleValidation()''

      $(this.form).formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    },
                    emailAddress: {
                            onError: function(e, data) {
                                console.log('error')
                            },
                            onSuccess: function(e, data) {
                                console.log('success')
                            },
                        },
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    }
                }
            }
        }
    }).on('success.form.fv', (e) => {
      e.preventDefault();
       this.handleSubmit();
    });
  });
}


handleSubmit() {
  let username = this.username;
  let password = this.password;

  if (dNc(this.username)) {
    username = this.username.value;
    password = this.password.value;
  }

  let generalStatus = null;
  let payload = null;

  let content='';

  if (dNc(this.props.reduxState_fetchDataTransaction.default)) {
    ({ generalStatus, payload } = this.props.reduxState_fetchDataTransaction.default);
  }

  if (dNc(password) && dNc(username)) {
    this.setState({
      username,
      password,
    });
  } else if (generalStatus === 'error' || generalStatus === 'fatal') {
    content = (<div><h3 style={{ color: 'red', fontSize: '15px' }}>*{payload}</h3></div>)
  }

  return content
}


render() {
  let generalStatus = null;
  let payload = null;
  let started = null;
  let finished = null;

  if (dNc(this.props.reduxState_fetchDataTransaction.default)) {
    ({ generalStatus, payload, started, finished } = this.props.reduxState_fetchDataTransaction.default);
  }

    const { username, password } = this.state;
    const sendData = { username, password };

    let active = false;
    if (dNc(username) && dNc(password)) active = true;

    if (started === true && finished === false) {
      return (
        <LoadingArea />
      );
    }

    if (generalStatus === 'success') {
      this.context.router.history.push('/campaign/overview');
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
                        {this.handleSubmit()}
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Sign In</button>
                    <FetchData
                      active={active}
                      fetchURL="api/AB/data/login"
                      sendData={sendData}
                      noRender
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
};

Login.defaultProps = {
  reduxState_fetchDataTransaction: {},
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
