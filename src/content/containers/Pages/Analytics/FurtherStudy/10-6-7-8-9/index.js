import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Requirements 106 to 109 - Further Study Details',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Further Study',
          link: '/analytics/further-study',
        },
        {
          name: 'RQ 106-109 - Further Study Details',
          link: '/analytics/further-study/106-109',
        }],
    });

    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        redrawCharts();
      });

      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />


        <div className="row">
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./1.png')} />
              </div>
            </div>

          </div>
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./2.png')} />
              </div>

            </div>

          </div>

        </div>

        <div className="row">
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./3.png')} />
              </div>
            </div>

          </div>
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./4.png')} />
              </div>

            </div>

          </div>

        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./5.png')} />
              </div>
            </div>

          </div>

        </div>
      </div>
    );

    const { location } = this.props;

    return (
      <Wrapper content={content} theLocation={location} />
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
