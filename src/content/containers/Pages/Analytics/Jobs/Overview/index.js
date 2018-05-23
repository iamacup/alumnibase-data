
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
import drawStackedBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';


class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Further Study Overview',
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
          name: 'Overview',
          link: '/analytics/further-study/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    const pieData1 = [
      { name: 'Public', value: 16.67 },
      { name: 'Private', value: 83.33 },
    ];

    const pieData2 = [
      { name: 'Primary', value: 4 },
      { name: 'Secondary', value: 35 },
      { name: 'Tertiary', value: 53 },
      { name: 'Quaternary', value: 8 },
    ];

    const axisData = { y: ['Social Studies', 'Mathematical Sciences', 'Arts & Humanities'], x: '' };
    const data = {
      1: [{ name: 'Employment', data: [60, 55, 70] }, { name: 'Further Study', data: [15, 20, 9] }, { name: 'Other', data: [20, 20, 15] }, { name: 'unemployed', data: [5, 5, 6] }],
      2: [{ name: 'Employment', data: [75, 73, 77] }, { name: 'Further Study', data: [11, 12, 4] }, { name: 'Other', data: [10, 11, 13] }, { name: 'unemployed', data: [4, 4, 5] }],
      3: [{ name: 'Employment', data: [85, 80, 89] }, { name: 'Further Study', data: [4, 7, 0] }, { name: 'Other', data: [8, 10, 7] }, { name: 'unemployed', data: [3, 3, 4] }],
    };
    const echartsData1 = drawPieChart(pieData1, true, 'doughnut', false);
    const echartsData2 = drawPieChart(pieData2, true, 'pie', false);
    const barChartsData1 = drawStackedBarChart(axisData, data[1]);
    const barChartsData2 = drawStackedBarChart(axisData, data[2]);
    const barChartsData3 = drawStackedBarChart(axisData, data[3]);

    const content = (
      <div id="page-content">

        <StandardFilters />


        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Job and Careers Overview</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            {/* <div className="row">
              <div className="col-md-6">
                             <TabbedGraphPanel
                               title="Public vs Private Sector"
                               globalID="tuesday-graphs-1"
                               content={[
                             {
                               title: '',
                               preContent: <p>The percentage of graduates who, straight out of education find jobs in either public or private sectors of work.</p>,
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
              <div className="col-md-6">
                <TabbedGraphPanel
                  title="Sector Employment"
                  globalID="tuesday-graphs-2"
                  content={[
                {
                  title: '',
                  preContent: <p>Percentage of graduates straight out of education, split into different sectors of work.</p>,
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
                      options: echartsData2,
                    },
                  },
                },
              ]}
                  seperator
                />
              </div>
            </div> */}
            <TabbedGraphPanel
              title="Status of graduates according to subject area over time "
              globalID="tuesday-graphs-3"
              content={[
                {
                  title: 'Within the First Year of Graduating',
                  preContent: <p>% of Graduates, withing the first year after Graduating</p>,
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
                      options: barChartsData1,
                    },
                  },
                },
                {
                  title: 'Second Year',
                  preContent: <p>% of Graduates, within the second year after Graduating</p>,
                  active: false,
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
                      options: barChartsData2,
                    },
                  },
                },
                {
                  title: 'Third Year',
                  preContent: <p>% of Graduates, withing the third year after Graduating</p>,
                  active: false,
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
                      options: barChartsData3,
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
