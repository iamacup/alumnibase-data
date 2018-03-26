import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';

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
          name: 'Direct University Impact',
          link: '/analytics/views/1/direct-university-impact',
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

        <SubNav
          active="1"
        />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data relating directly to your institution from section 5 of the respondent survey is collated here. For clarity this data is split into two areas: <br /><br />
                <strong>Direct University Impact</strong> are those data points that relate to the university degree and its impact on the respondents life and; <br />
                <strong>Views on Education</strong> explain the broader views of the respondent relating to education that are not directly linked to your institution.
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the knowledge from my degree(s) to my work often',
              'view-1-1',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the skills, methods or techniques I learnt from undertaking my degree to my work often',
              'view-1-2',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the things I learnt from extra-curricular activities to my work often',
              'view-1-3',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, all the things I did or learnt have contributed meaningfully to my life today',
              'view-1-4',
              this.getOptions1(),
              ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'],
              false)}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('How likely are you to recommend your HE provider to a friend or a colleague',
              'view-1-5',
              this.getOptions2(),
              ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
              false)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">If you were now to choose whether or not to do your course, how likely or unlikely is it that you would...</h3>
            <h5 className="text-uppercase text-muted text-normal">Multi part question</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Do a different subject',
              'view-1-6',
              this.getOptions3(),
              ['Very Likely', 'Likely', 'Not very likely', 'Not likely at all', 'Don\'t know'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Study at a different institution',
              'view-1-7',
              this.getOptions3(),
              ['Very Likely', 'Likely', 'Not very likely', 'Not likely at all', 'Don\'t know'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Work towards a different type of qualification',
              'view-1-8',
              this.getOptions3(),
              ['Very Likely', 'Likely', 'Not very likely', 'Not likely at all', 'Don\'t know'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Decide to do something completely different',
              'view-1-9',
              this.getOptions3(),
              ['Very Likely', 'Likely', 'Not very likely', 'Not likely at all', 'Don\'t know'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">To what extent has your HE experience enabled you to...</h3>
            <h5 className="text-uppercase text-muted text-normal">Multi part question</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Be innovative in the workplace',
              'view-1-10',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Make a difference in the workplace',
              'view-1-11',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Change organisational culture and/or working practices',
              'view-1-12',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Influence the work of others in the workplace',
              'view-1-13',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Access immediate or short-term job opportunities in your chosen career',
              'view-1-14',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance your credibility or standing in the workplace',
              'view-1-15',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Progress towards your long term career aspirations',
              'view-1-16',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance your social and intellectual capabilities beyond employment',
              'view-1-17',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance the quality of your life generally',
              'view-1-18',
              this.getOptions4(),
              ['A great extent', 'Some extent', 'Not at all', 'Don\'t know', 'Have not worked since finishing course'],
              true)}
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
