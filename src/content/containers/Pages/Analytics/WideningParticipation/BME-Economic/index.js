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
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'BME Economic Achievement',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'Widening Participation',
          link: `/${uni}/analytics/widening-participation`,
        },
        {
          name: 'BME Economic Achievement',
          link: `/${uni}/analytics/widening-participation/bme-economic-achievement`,
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
