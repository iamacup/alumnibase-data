import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import drawPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';

import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';

import SubNav from './subNav';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Views on Education Impact',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Views',
          link: '/analytics/views',
        },
        {
          name: 'Views on Education Impact',
          link: '/analytics/views/1',
        },
        {
          name: 'Views on Education',
          link: '/analytics/views/1/views-on-education',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getOptions1(colours) {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'Strongly agree', data: [20, 16, 14, 12, 10] },
      { name: 'Agree', data: [20, 16, 14, 12, 10] },
      { name: 'Neither agree or disagree', data: [40, 44, 44, 44, 40] },
      { name: 'Disagree', data: [10, 12, 14, 16, 20] },
      { name: 'Strongly disagree', data: [10, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries, colours);

    return options;
  }

  getTabbed(title, id, options, arr, collapsed, data) {
    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={collapsed}
      content={[
            {
              title: 'Overall',
              preContent: <p>To what extent do you believe undertaking professional qualifications will advance your career?</p>,
              postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
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
                  reactData: data.map((element, i) => drawPercentRow(arr[i], element, true)),
                },
              },
            },
            {
              title: 'Trends',
              active: false,
              preContent: <p>To what extent do you believe undertaking professional qualifications will advance your career?</p>,
              postContent: <div className="pull-right"><p>Data shown for all respondants</p></div>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: false,
                  seeData: false,
                  pinGraph: false,
                },
                width: '100%',
                height: '300px',
                data: {
                  options,
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

        <SubNav
          active="2"
        />

        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <BasicPanel
              content={
                <p>
                  Data from section 5 of the respondent survey is collated here. For ease of access this data is split into three areas: <br /><br />
                  <strong>Direct University Impact</strong> are those data points that relate to the university degree and its impact on the respondents life, <br />
                  <strong>Views on Education</strong> explain the broader views of the respondent relating to education that are not directly linked to your institution.
                </p>
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Belief undertaking professional qualifications will advance your career',
              'view-2-1',
              this.getOptions1(['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false, [28, 43, 15, 9, 5])}
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