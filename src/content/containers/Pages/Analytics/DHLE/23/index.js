import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import Graph from '../../../../../../content/containers/Fragments/Graphs/graph';
import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 2 - Graduates and What they Are Doing',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'DHLE-Like',
          link: '/analytics/dlhe-like',
        },
        {
          name: 'RQ 2/3 - Graduates and What they Are Doing',
          link: '/analytics/dlhe-like/2-3',
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
            <Graph
              titles={['Other', 'Unemployed', 'Further Study', 'Work and further study', 'Part-time work', 'Full-time work']}
              set1={[44990, 6435, 1890, 5120, 3355, 2285]}
              set2={[25195, 4160, 1915, 1425, 680, 1490]}
              set1Name="PG Full Time"
              set2Name="PG Part Time"
              title="Employment Activity of Post Gradutes"
              globalID="dlhe-like-23-1"
            />

          </div>
          <div className="col-md-6">

            <Graph
              titles={['Other', 'Unemployed', 'Further Study', 'Work and further study', 'Part-time work', 'Full-time work']}
              set1={[133470, 29245, 12550, 41775, 13095, 10590]}
              set2={[11230, 2675, 1270, 1395, 830, 1575]}
              set1Name="FD Full Time"
              set2Name="FD Part Time"
              title="Employment Activity of First Degree"
              globalID="dlhe-like-23-2"
            />

          </div>
        </div>


        <div className="row">
          <div className="col-md-6">

            <Graph
              titles={['Working full-time', 'Working part-time', 'Unemployed', 'Due to start a job', '*', '**', 'Taking time out in order to travel', 'Doing something else']}
              set1={[45855, 6545, 2530, 1030, 5305, 530, 930, 1360]}
              set2={[26425, 4385, 535, 190, 1020, 825, 210, 1280]}
              set1Name="PG Full Time"
              set2Name="PG Part Time"
              title="Most Important Activity Post-Graduate FT / PT"
              globalID="dlhe-like-23-3"
              postContent={
                <div>
                  <h6>* full-time further study, training or research</h6>
                  <h6>** part-time further study, training or research</h6>
                </div>
              }
            />

          </div>
          <div className="col-md-6">

            <Graph
              titles={['Working full-time', 'Working part-time', 'Unemployed', 'Due to start a job', '*', '**', 'Taking time out in order to travel', 'Doing something else']}
              set1={[137075, 29975, 10545, 3275, 45505, 3765, 6815, 3770]}
              set2={[11845, 2810, 700, 165, 1185, 695, 170, 1405]}
              set1Name="FD Full Time"
              set2Name="FD Part Time"
              title="Most Important Activity First Degree FT / PT"
              globalID="dlhe-like-23-4"
              postContent={
                <div>
                  <h6>* full-time further study, training or research</h6>
                  <h6>** part-time further study, training or research</h6>
                </div>
              }
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
