
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';

import CollapsablePanel from '../../../../content/components/CollapsablePanel';
import TabbedPanel from '../../../../content/components/TabbedPanel';
import BasicPanel from '../../../../content/components/BasicPanel';

import TabbedGraphPanel from '../../../../content/components/TabbedGraphPanel';

import drawAreaChart from '../../../../content/scripts/custom/echarts/drawAreaChart';
import drawNewPieChart from '../../../../content/scripts/custom/echarts/drawPieChart';
import drawSankeyChart from '../../../../content/scripts/custom/googlecharts/sankey';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Tests',
      breadcrumbs: [
        {
          name: 'Tests',
          link: `/${uni}/tests`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getTabbedGraphPanel() {
    // area chart stuff
    const axis1 = [1, 2, 3, 4, 5, 6, 7];
    const data1 = [{ name: 'Average Salary', data: [15000, 20000, 30000, 40000, 50000, 60000, 70000] }];
    const options1 = drawAreaChart(data1, axis1);

    // pie chart stuff
    const data2 = [
      { name: 'Male', value: 55 },
      { name: 'Female', value: 40 },
      { name: 'Other', value: 5 },
    ];
    const options2 = drawNewPieChart(data2, true, 'doughnut', true);

    // sankey chart stuff
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
        title="This is a tabbed panel"
        globalID="CHANGE-ME-AND-MAKE-SURE-I-AM-GLOBALLY-UNIQUE-1"
        content={[
            {
              title: 'This is tab 1',
              preContent: <p>This is the OPTIONAL pre content</p>,
              postContent: <p>This is the OPTIONAL post content</p>,
              active: true,
              clickCallback: () => { console.log('tab 1 is clicked on - this callback is optional'); },
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: {
                  options: options1,
                },
              },
            },
            {
              title: 'This is tab 2',
              active: false,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: {
                  options: options2,
                },
              },
            },
            {
              title: <span>Icon and text <i className="fas fa-bullhorn" /></span>,
              preContent: <p>This is the OPTIONAL pre content</p>,
              postContent: <p>This is the OPTIONAL post content</p>,
              active: false,
              clickCallback: () => { console.log('tab 3 is clicked on - this callback is optional'); },
              graphData: {
                type: 'googlecharts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: googleData,
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getSingleGraphPanel() {
    // area chart stuff
    const axis1 = [1, 2, 3, 4, 5, 6, 7];
    const data1 = [{ name: 'Average Salary', data: [15000, 20000, 30000, 40000, 50000, 60000, 70000] }];
    const options1 = drawAreaChart(data1, axis1);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="This is a non tabbed pannel"
        globalID="CHANGE-ME-AND-MAKE-SURE-I-AM-GLOBALLY-UNIQUE-2"
        content={[
            {
              title: '',
              preContent: <p>This is the OPTIONAL pre content</p>,
              postContent: <p>This is the OPTIONAL post content</p>,
              active: true,
              clickCallback: () => { console.log('tab 1 is clicked on - this callback is optional'); },
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: {
                  options: options1,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  getTabbedGraphPanelWithNonGraphContent() {
    // pie chart stuff
    const data2 = [
      { name: 'Male', value: 55 },
      { name: 'Female', value: 40 },
      { name: 'Other', value: 5 },
    ];
    const options2 = drawNewPieChart(data2, true, 'doughnut', true);

    const reactData = (
      <div>
        <h3>This could be any react element</h3>
        <p>Just pass it through as you would any other JSX</p>
      </div>
    );

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="This is a tabbed panel with non graph based content"
        globalID="CHANGE-ME-AND-MAKE-SURE-I-AM-GLOBALLY-UNIQUE-3"
        content={[
            {
              title: 'Graph',
              active: true,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: {
                  options: options2,
                },
              },
            },
            {
              title: 'Non Graph',
              active: false,
              graphData: {
                type: 'react',
                width: '100%',
                height: '100%',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                data: {
                  reactData,
                },
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
        <div className="row" style={{ paddingTop: '50px', paddingBottom: '500px' }}>
          <div className="col-lg-12">


            <div className="text-center">
              <h3>Description</h3>

              <h5><strong>Panels</strong> - Almost all content should be in a panel of some sort</h5>

              <h3>Generic content panels</h3>
            </div>

            <div className="row">

              <div className="col-sm-6">
                <BasicPanel
                  content={<p>This is a basic panel</p>}
                />
              </div>

              <div className="col-sm-6">
                <BasicPanel
                  content={<p>This is a basic panel with a title</p>}
                  title="This is the title"
                />
              </div>

              <div className="col-sm-6">
                <CollapsablePanel
                  title="Collapsable Panel - Expanded"
                  content={<p>This is the content for the collapsable panel</p>}
                  expanded
                />
              </div>

              <div className="col-sm-6">
                <CollapsablePanel
                  title="Collapsable Panel - Not Expanded"
                  content={<p>This is the content for the collapsable panel</p>}
                  expanded={false}
                />
              </div>

              <div className="col-sm-6">
                <TabbedPanel
                  title="This is a tabbed panel"
                  content={[
                    {
                      title: 'This is tab 1',
                      content: <p>This is tab 1 content - remember, there is an optional callback in case you need to handle clicked buttons (like redrawing the graph content or something)</p>,
                      active: false,
                      clickCallback: () => { console.log('tab 1 is clicked on'); },
                    },
                    {
                      title: <i className="fas fa-thumbtack" />,
                      content: <p>This is tab 2 content - remember you can use icons for the tab titles as well! And remember you can set which tab is active by default!</p>,
                      active: true,
                    },
                    {
                      title: 'This is tab 3',
                      content: <p>This is tab 3 content - you can add as many as you want (or can fit!!!)</p>,
                      active: false,
                    },
                  ]}
                  seperator
                />
              </div>

            </div>

            <div className="text-center">
              <h3>Graph content panels</h3>
            </div>

            <div className="row">

              <div className="col-sm-10 col-sm-push-1">
                {this.getTabbedGraphPanel()}
              </div>

            </div>

            <div className="row">

              <div className="col-sm-10 col-sm-push-1">
                {this.getSingleGraphPanel()}
              </div>

            </div>

            <div className="row">

              <div className="col-sm-10 col-sm-push-1">
                {this.getTabbedGraphPanelWithNonGraphContent()}
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
