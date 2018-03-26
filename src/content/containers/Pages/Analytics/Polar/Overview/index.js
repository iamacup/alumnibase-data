/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import PieChart from '../../../../../../content/containers/Fragments/Graphs/pieChart';
import BarChart from '../../../../../../content/containers/Fragments/Graphs/groupedBarChart';
import WorldMap from '../../../../../../content/containers/Fragments/Graphs/section5WorldMap';
import Sankey from '../../../../../../content/containers/Fragments/Graphs/sankey';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import drawNewPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';
import drawWorldMap from '../../../../../../content/scripts/custom/echarts/drawWorldMap';
import worldMapData from '../../../../../../content/containers/Fragments/Graphs/worldMapData';

import { renderChartToTarget } from '../../../../../../content/scripts/custom/echarts/utilities';

import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Campaign Overview',
      breadcrumbs: [
        {
          name: 'Campaign',
          link: '/campaign',
        },
        {
          name: 'Overview',
          link: '/campaign/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getPOLAROutcomes() {
    const columns = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];
    const rows = [
      ['POLAR3 area', 'Engineering', 1],
      ['POLAR3 area', 'Business and Legal', 1],
      ['POLAR3 area', 'Computer science', 1],
      ['POLAR3 area', 'English', 1],
      ['POLAR3 area', 'Medicine', 1],
      ['POLAR3 area', 'Politics, philosophy & theology', 1],
      ['POLAR3 area', 'Psychology and sociology', 2],
      ['POLAR3 area', 'Sciences', 1],
      ['non-POLAR3 area', 'Architecture', 11],
      ['non-POLAR3 area', 'Engineering', 8],
      ['non-POLAR3 area', 'Business and Legal', 9],
      ['non-POLAR3 area', 'Computer science', 5],
      ['non-POLAR3 area', 'Creative arts', 5],
      ['non-POLAR3 area', 'English', 4],
      ['non-POLAR3 area', 'History', 5],
      ['non-POLAR3 area', 'Medicine', 7],
      ['non-POLAR3 area', 'Politics, philosophy & theology', 8],
      ['non-POLAR3 area', 'Psychology and sociology', 6],
      ['non-POLAR3 area', 'Sciences', 9],
      ['non-POLAR3 area', 'Agriculture', 8],
      ['Creative arts', 'under £20,000', 2],
      ['Creative arts', '£20-30,000', 3],
      ['Architecture', '£20-30,000', 3],
      ['Architecture', '£30-40,000', 3],
      ['Architecture', '£40-50,000', 3],
      ['Architecture', '£50+', 2],
      ['Engineering', '£20-30,000', 3],
      ['Engineering', '£30-40,000', 4],
      ['Engineering', '£40-50,000', 1],
      ['Engineering', '£50+', 1],
      ['Business and Legal', '£20-30,000', 4],
      ['Business and Legal', '£30-40,000', 4],
      ['Business and Legal', '£40-50,000', 1],
      ['Business and Legal', '£50+', 1],
      ['Computer science', '£20-30,000', 3],
      ['Computer science', '£30-40,000', 3],
      ['English', 'under £20,000', 2],
      ['English', '£20-30,000', 2],
      ['English', '£30-40,000', 1],
      ['History', 'under £20,000', 2],
      ['History', '£20-30,000', 2],
      ['History', '£30-40,000', 1],
      ['Medicine', '£20-30,000', 2],
      ['Medicine', '£30-40,000', 3],
      ['Medicine', '£40-50,000', 2],
      ['Medicine', '£50+', 1],
      ['Politics, philosophy & theology', 'under £20,000', 2],
      ['Politics, philosophy & theology', '£20-30,000', 4],
      ['Politics, philosophy & theology', '£30-40,000', 3],
      ['Psychology and sociology', 'under £20,000', 1],
      ['Psychology and sociology', '£20-30,000', 4],
      ['Psychology and sociology', '£30-40,000', 2],
      ['Psychology and sociology', '£40-50,000', 1],
      ['Sciences', '£20-30,000', 3],
      ['Sciences', '£30-40,000', 3],
      ['Sciences', '£40-50,000', 2],
      ['Sciences', '£50+', 1],
      ['Agriculture', 'under £20,000', 1],
      ['Agriculture', '£20-30,000', 3],
      ['Agriculture', '£30-40,000', 3],
      ['Agriculture', '£40-50,000', 1],
    ];

    const googleData = drawSankeyChart(columns, rows);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Top 10 responses per subject"
        globalID="overview-6"
        content={[
            {
              title: '',
              postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
              active: true,
              graphData: {
                type: 'googlecharts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '450px',
                data: googleData,
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row" style={{ paddingBottom: '50px' }}>

          <div className="col-lg-12">
  
            <h3 className="text-main text-normal text-2x mar-no">POLAR3 Outcomes</h3>
            <h5 className="text-uppercase text-muted text-normal">Data shown for all respondants</h5>
            <hr className="new-section-xs" />

            <div className="row">
              <div className="col-md-12">
                {this.getPOLAROutcomes()}
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
  reduxAction_doUpdate: PropTypes.func,
  location: PropTypes.object.isRequired,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
