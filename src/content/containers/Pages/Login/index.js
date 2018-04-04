import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

import { dNc } from '../../../../content/scripts/custom/utilities';

class Login extends React.PureComponent {

  componentDidMount() {
    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

});
  }

  handleSubmit(e) {
    e.preventDefault()
    const username = this.username.value;
    const password = this.password.value;

    if (dNc(password) && username === "patrick@alumnibase.com") {
      this.context.router.history.push('/campaign/overview');
    } else {
      $(this.errorDiv).addClass('error');
    }
  }

  render() {
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
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" ref={(element) => { this.username = element; }} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" ref={(element) => { this.password = element; }} />
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={(e) => { this.handleSubmit(e); }}>Sign In</button>
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
    </div>)
  }
}


Login.contextTypes = {
  router: PropTypes.object,
};

export default Login;