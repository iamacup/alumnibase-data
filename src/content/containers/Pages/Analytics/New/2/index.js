import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import Section5Graph from '../../../../../../content/containers/Fragments/Graphs/section5Graph';
import Section5Graph2 from '../../../../../../content/containers/Fragments/Graphs/section5Graph2';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Views on Overall Happiness',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'New',
          link: '/analytics/new',
        },
        {
          name: 'Views on Overall Happiness',
          link: '/analytics/new/2',
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
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here. <strong>Overall Life</strong> is not directly related to the university degree, but indicates the general state of the survey respondents
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="My current work fits with my future plans"
              globalID="new-1-5"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="My current work is meaningful and important to me"
              globalID="new-1-6"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph2
              title="Overall, how satisfied are you with your life now"
              globalID="new-1-7"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph2
              title="Overall, to what extent do you feel the things you do in your life are worthwhile"
              globalID="new-1-8"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph2
              title="Overall, how happy did you feel yesterday"
              globalID="new-1-9"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph2
              title="Overall, how anxious did you feel yesterday"
              globalID="new-1-10"
            />
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
