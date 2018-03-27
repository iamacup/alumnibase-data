import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import echarts from 'echarts';

import { dNc, fireDebouncedResizeEvents } from '../../../content/scripts/custom/utilities';

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

// TODO used?
import '../../../content/theme/vendor/formValidation-0.7.1.min.css';

class App extends React.Component {
  componentDidMount() {
    // include the bootstrap javascript
    require('../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');

    // this is a hack to make echarts available to the uk map - need to replace this with the expose loader!!!
    window.echarts = echarts;

    $(() => {
      // we do this to make sure that when start things, the nifty things execute
      // i thought we would need to do this but apparently not - calling htis actually seems to break things...
      // $(document).trigger('nifty.ready');
      $(document).trigger('nifty.ready');

      // fire resize events
      fireDebouncedResizeEvents();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      let paths = [];

      if (dNc(this.props.reduxState_historyData) && dNc(this.props.reduxState_historyData.paths)) {
        ({ paths } = this.props.reduxState_historyData);
      }

      paths.push(this.props.location.pathname);

      // this breaks navigation when enabled - need to work out why!!!
      // this.props.reduxAction_doUpdate('historyData', { paths });
    }
  }

  render() {
    let path = 'https://data.alumnibaseapp.com/';

    // todo this won't work because this component does not have access to the path at server render time, only things instantiated within the route <i.e. components that are made by the router> have access at render time
    if (dNc(this.props.location) && dNc(this.props.location.pathname)) {
      path = 'https://data.alumnibaseapp.com' + this.props.location.pathname;
    }

    return (
      <Helmet
        meta={[
              {
                property: 'og:url',
                content: path,
              },
            ]}
      />
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  reduxState_historyData: PropTypes.object,
};

App.defaultProps = {
  location: {},
  reduxState_historyData: {},
};

// we have to bind the location to the state of this component so navigation updates work properly (i.e. so it detects a change in the location props and thus re renderds the app)
const mapStateToProps = state => ({
  location: state.router.location,
  reduxState_historyData: state.dataStoreSingle.historyData,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
