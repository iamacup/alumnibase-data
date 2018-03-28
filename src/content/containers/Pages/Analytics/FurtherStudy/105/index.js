import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';


class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Requirement 105 - Trends for Further Study',
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
          name: 'RQ 105 - Trends for Further Study',
          link: '/analytics/further-study/105',
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
    const pieData1 = [
      { name: 'No Further Study', value: 60 },
      { name: 'Masters', value: 30 },
      { name: 'PhD', value: 7 },
      { name: 'Post Doc', value: 2 },
      { name: 'Professor', value: 1 },
    ];

    const echartsData1 = drawPieChart(pieData1, false, 'pie', false);

    const content = (
      <div id="page-content">

        <StandardFilters />


        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <TabbedGraphPanel
              title="Further Study Among Durham Graduates"
              globalID="RQ-105-pie-1"
              content={[
            {
              title: '',
              // preContent: <p>This is the OPTIONAL pre content</p>,
              // postContent: <p>This is the OPTIONAL post content</p>,
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '400px',
                data: {
                  options: echartsData1,
                },
              },
            },
          ]}
              seperator
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
