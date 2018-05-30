
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Page Under Construction',
      breadcrumbs: [
      ],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    const { location } = this.props;
    let direct;

    const uniName = location.pathname.split('/')[1].toLowerCase();

    if (uniName === 'aristotle' || uniName === 'durham' || uniName === 'uwe' || uniName === 'ucl' || uniName === 'sheffield-hallam' || uniName === 'sheffield' || uniName === 'oxford-brookes' || uniName === 'loughborough' || uniName === 'kings' || uniName === 'cranfield') {
      direct = '/' + uniName + '/campaign/overview';
    } else direct = 'http://www.alumnibaseapp.com/';

    return (
      <div id="container" className="cls-container">
        <div className="cls-content">
          <h1 className="error-code text-info">404</h1>
          <p className="h4 text-uppercase text-bold">Page Not Found!</p>
          <div className="pad-btm">
                Sorry, but the page you are looking for has not been found on our server.
          </div>
          <hr className="new-section-sm bord-no" />
          <div className="pad-top"><a className="btn btn-primary" href={direct}>Return</a></div>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);

