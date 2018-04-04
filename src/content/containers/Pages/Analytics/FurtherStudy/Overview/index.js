
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import drawPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';

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
      { name: 'No Further Study', value: 60 },
      { name: 'Masters', value: 30 },
      { name: 'PhD', value: 7 },
      { name: 'Post Doc', value: 2 },
      { name: 'Professor', value: 1 },
    ];

    const echartsData1 = drawPieChart(pieData1, false, 'pie', false);

    const obj = {
      direction: 'vertical',
      value: '',
    };
  const titles = {1:['Stayed at the same Uni', 'Moved to a Different Uni'], 2: ['Related', 'Not Related']}
  const data = {1:[{ name: '', data: [45, 55] }], 2:[{ name: '', data: [65, 35] }]};
    const options = drawGroupedBarChart(titles[1], data[1], obj);
    const options2 = drawGroupedBarChart(titles[2], data[2], obj);

  const progressBarData = [
  {name: 'King\'s College London (KCL)', percentage: [62]},
  {name: 'University of Manchester', percentage: [58]},
  {name: 'University College London (UCL)', percentage: [53]},
  {name: 'University of Bristol', percentage: [47]},
  {name: 'University of Warwick', percentage: [41]},
  {name: 'University od Durham', percentage: [39]},
  {name: 'University of Edinburgh', percentage: [36]},
  {name: 'University of York', percentage: [27]},
  {name: 'University of Leeds', percentage: [25]},
  {name: 'Lancaster University', percentage: [21]},
  ]
    const progressBarOption = progressBarData.map(element => drawPercentRow(element.name, element.percentage, true));


    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Further Study Trends</h3>
            <h5 className="text-muted text-normal">Data taken from graduates after they entered their 'first job'</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <TabbedGraphPanel
              title="Further Study Among Graduates"
              globalID="further-study-overview-1"
              content={[
                {
                  title: '',
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
            <div className="row">
          <div className="col-md-6">
<TabbedGraphPanel
      title='Further Study University Destination'
      globalID="further-study-overview-2"
      content={[
            {
              title: 'stay/go',
              preContent: <p>Percentage of Graduates who Stayed at their Original<br />University to Further Study.</p>,
              active: true,
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
                  options,
                },
              },
            },
          ]}
      seperator
    />
          </div>
    <div className="col-md-6">
    <TabbedGraphPanel
      title='Further Study Relevance to Undergraduate'
      globalID="further-study-overview-2"
      content={[
            {
              title: 'stay/go',
              preContent: <p>Percentage of Graduates who went on to Study<br />Something Related to their Undergraduate.</p>,
              active: true,
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
          ]}
      seperator
    />
        </div>
      </div>
      <TabbedGraphPanel
        title="Top 10 Destinations for Further Study to an Alternate University"
        globalID="subject-first-job-1"
        content={[
          {
            title: 'Average Salary',
            active: true,
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
                reactData: progressBarOption,
              },
            },
          },
          ]}
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
