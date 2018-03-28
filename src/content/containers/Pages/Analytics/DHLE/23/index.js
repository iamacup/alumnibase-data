import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';
import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';

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
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGraph(title, id, set1Name, set2Name, set1, set2, titles, postContent = null) {
    const axisData = { y: titles, x: '' };
    const dataSeries = [
      { name: set1Name, data: set1 },
      { name: set2Name, data: set2 },
    ];

    const preFinalSet1 = [];
    const preFinalSet2 = [];

    for (let a = 0; a < set1.length; a++) {
      const total = set1[a] + set2[a];

      preFinalSet1.push(Math.round((set1[a] / total) * 100));
      preFinalSet2.push(Math.round((set2[a] / total) * 100));
    }

    const axisDataPercentage = { y: titles, x: '%' };
    const dataSeriesPercentage = [
      { name: set1Name, data: preFinalSet1 },
      { name: set2Name, data: preFinalSet2 },
    ];

    // this is the absolute numbers
    const options1 = drawNewBarChart(axisData, dataSeries);

    // this is the percentage numbers
    const options2 = drawNewBarChart(axisDataPercentage, dataSeriesPercentage);


    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={false}
      content={[
            {
              title: <i className="far fa-percent" />,
              active: true,
              postContent,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: options2,
                },
              },
            },
            {
              title: <i className="far fa-hashtag" />,
              active: false,
              postContent,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '350px',
                data: {
                  options: options1,
                },
              },
            },
          ]}
      seperator
    />);

    return panel;
  }

  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />

        <h3 className="text-main text-normal text-2x mar-no">Post University Activity</h3>
        <h5 className="text-muted text-normal">Each graph displays the employment status of past Alumni, for both Post Graduate courses and first time degrees. Click through the tabs to see the data displayed as percentages or raw numbers.</h5>
        <hr className="new-section-xs" />

        <div className="row">
          <div className="col-md-6">
            {this.getGraph('Employment Activity of Post Gradutes',
              'dlhe-like-23-1',
              'PG Full Time',
              'PG Part Time',
              [44990, 6435, 1890, 5120, 3355, 2285],
              [25195, 4160, 1915, 1425, 680, 1490],
              ['Other', 'Unemployed', 'Further Study', 'Work and further study', 'Part-time work', 'Full-time work'])}
          </div>

          <div className="col-md-6">
            {this.getGraph('Employment Activity of First Degree',
              'dlhe-like-23-2',
              'FD Full Time',
              'FD Part Time',
              [133470, 29245, 12550, 41775, 13095, 10590],
              [11230, 2675, 1270, 1395, 830, 1575],
              ['Other', 'Unemployed', 'Further Study', 'Work and further study', 'Part-time work', 'Full-time work'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {this.getGraph('Most Important Activity Post-Graduate FT / PT',
              'dlhe-like-23-3',
              'PG Full Time',
              'PG Part Time',
              [45855, 6545, 2530, 1030, 5305, 530, 930, 1360],
              [26425, 4385, 535, 190, 1020, 825, 210, 1280],
              ['Working full-time', 'Working part-time', 'Unemployed', 'Due to start a job', '*', '**', 'Taking time out in order to travel', 'Doing something else'],
              <div>
                <h6>* full-time further study, training or research</h6>
                <h6>** part-time further study, training or research</h6>
              </div>)}
          </div>

          <div className="col-md-6">
            {this.getGraph('Most Important Activity First Degree FT / PT',
              'dlhe-like-23-4',
              'FD Full Time',
              'FD Part Time',
              [137075, 29975, 10545, 3275, 45505, 3765, 6815, 3770],
              [11845, 2810, 700, 165, 1185, 695, 170, 1405],
              ['Working full-time', 'Working part-time', 'Unemployed', 'Due to start a job', '*', '**', 'Taking time out in order to travel', 'Doing something else'],
              <div>
                <h6>* full-time further study, training or research</h6>
                <h6>** part-time further study, training or research</h6>
              </div>)}
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
