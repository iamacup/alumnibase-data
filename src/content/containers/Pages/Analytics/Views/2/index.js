import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Views on Overall Happiness',
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
          name: 'Views on Overall Happiness',
          link: '/analytics/views/2',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getPercentageBlock(arr) {
    const randombetween = (min, max) => Math.floor(Math.random() * ((max - (min + 1)) + min));

    const generate = (max, thecount) => {
      const r = [];
      let currsum = 0;
      for (let i = 0; i < thecount - 1; i++) {
        r[i] = randombetween(1, max - (thecount - i - 1) - currsum);
        currsum += r[i];
      }
      r[thecount - 1] = max - currsum;
      return r;
    };

    const rands = generate(100, arr.length);

    const rowArr = [];

    for (let a = 0; a < arr.length; a++) {
      rowArr.push(this.getPercentRow(arr[a], rands[a]));
    }

    return rowArr;
  }

  getPercentRow(title, percentage, bottomMargin) {
    const barStyle = { height: '4px' };

    if (bottomMargin === false) {
      barStyle.marginBottom = '0';
    }

    const obj = (
      <div key={title} className="row">
        <div className="col-sm-4">
          <div className="text-left visible-xs-block">
            <h6 style={{ marginTop: '0' }}>{title}</h6>
          </div>
          <div className="text-right hidden-xs">
            <h6 style={{ marginTop: '0' }}>{title}</h6>
          </div>
        </div>
        <div className="col-sm-8">
          <h6 style={{ marginTop: '0', marginBottom: '4px' }}>{percentage}%</h6>
          <div className="progress" style={barStyle}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentage + '%' }}
            >
              <span className="sr-only">{percentage}% Complete</span>
            </div>
          </div>
        </div>
      </div>
    );

    return obj;
  }

  getOptions1() {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'Strongly agree', data: [20, 16, 14, 12, 10] },
      { name: 'Agree', data: [20, 16, 14, 12, 10] },
      { name: 'Neither agree or disagree', data: [40, 44, 44, 44, 40] },
      { name: 'Disagree', data: [10, 12, 14, 16, 20] },
      { name: 'Strongly disagree', data: [10, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries);

    return options;
  }

  getOptions2() {
    const age = [];
    const plotted = [];

    const start = 9.1;
    const end = 5.6;

    const firstAge = 21;
    const lastAge = 61;

    let current = start;
    const increment = (start - end) / (lastAge - firstAge);

    for (let a = firstAge; a < lastAge; a++) {
      age.push(a);
      plotted.push(Number(current.toPrecision(2)));

      current -= increment;

      console.log(increment);
    }

    const data = {
      age,
      plotted,
      name: ['test'],
    };

    const options = drawLineChart(data, 'Age', 'Average Response');

    return options;
  }


  getOptions3() {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'Very Likely', data: [20, 16, 14, 12, 10] },
      { name: 'Likely', data: [20, 16, 14, 12, 10] },
      { name: 'Not very likely', data: [40, 44, 44, 44, 40] },
      { name: 'Not likely at all', data: [10, 12, 14, 16, 20] },
      { name: 'Don\'t know', data: [10, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries);

    return options;
  }

  getOptions4() {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'A great extent', data: [20, 16, 14, 12, 10] },
      { name: 'Some extent', data: [20, 16, 14, 12, 10] },
      { name: 'Not at all', data: [40, 44, 44, 44, 40] },
      { name: 'Don\'t know', data: [10, 12, 14, 16, 20] },
      { name: 'Have not worked since finishing course', data: [10, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries);

    return options;
  }

  getTabbed(title, id, options, arr, collapsed) {
    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={collapsed}
      content={[
            {
              title: 'Overall',
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
                  reactData: this.getPercentageBlock(arr),
                },
              },
            },
            {
              title: 'Trends',
              active: false,
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

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here. <strong>Overall Life</strong> is not directly related to the university degree, but indicates the general state of the survey respondents
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('My current work fits with my future plans',
              'view-3-1',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('My current work is meaningful and important to me',
              'view-3-1',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how satisfied are you with your life now',
              'view-3-1',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, to what extent do you feel the things you do in your life are worthwhile',
              'view-1-5',
              this.getOptions2(),
              ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how happy did you feel yesterday',
              'view-1-5',
              this.getOptions2(),
              ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, how anxious did you feel yesterday',
              'view-1-5',
              this.getOptions2(),
              ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
              false)}
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
