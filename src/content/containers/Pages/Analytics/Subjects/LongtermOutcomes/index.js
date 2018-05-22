
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';
import drawMixGraph from '../../../../../../content/scripts/custom/echarts/drawMixGraph';


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
    const lineData = {
      name: ['Social Studies', 'Mathematical Sciences', 'Arts & Humanities'],
      age: ['1 Year', '5 Years', '10 Years', '20 Years'],
      plotted: [
        [79, 85, 84, 87],
        [56, 65, 76, 87],
        [90, 76, 54, 32],
      ],
    };

    const lineOptions = {
      value: false,
    };

    const lineTitles = { x: ['Years After Graduating'], y: ['% of Graduates in Highly Skilled', 'professions (SOC1 - 3)'] };
    const rawData = [{ data: [25000, 26000, 27000, 28000], name: '1 Year' }, { data: [50000, 55000, 60000, 70000], name: '10 Years' }];
    const names = rawData.map(element => element.name);
    const titles = ['Mathematical Sciences', 'Arts & Humanities', 'Law', 'Engineering & Technology'];

    const lineChartData = drawLineChart(lineData, lineOptions, lineTitles);
    const mixGraphData = drawMixGraph(rawData, names, titles);

    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Subjects - Longterm Outcomes</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <TabbedGraphPanel
              title=""
              globalID="stem-overview-2"
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
                             options: lineChartData,
                           },
                         },
                       },
                     ]}
              seperator
            />

            <TabbedGraphPanel
              title="Change in Salary over 10 Years from Graduation"
              globalID="tuesday-graphs-2"
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
                      options: mixGraphData,
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
