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

import SubNav from './subNav';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Section 5 Agregation',
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
          name: 'Section 5 Agregation',
          link: '/analytics/new/1',
        },
        {
          name: 'Direct University Impact',
          link: '/analytics/new/1/direct-university-impact',
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

        <SubNav
          active="1"
        />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="I apply the knowledge from my degree(s) to my work often"
              globalID="new-1-1"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="I apply the skills, methods or techniques I learnt from undertaking my degree to my work often"
              globalID="new-1-2"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="I apply the things I learnt from extra-curricular activities to my work often"
              globalID="new-1-3"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="Overall, all the things I did or learnt have contributed meaningfully to my life today"
              globalID="new-1-4"
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
