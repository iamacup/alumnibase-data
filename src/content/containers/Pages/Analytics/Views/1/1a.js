import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';
import drawPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';
import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import SubNav from './subNav';

import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'views';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Views on Education Impact',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'Views',
          link: `/${uni}/analytics/views`,
        },
        {
          name: 'Views on Education Impact',
          link: `/${uni}/analytics/views/1`,
        },
        {
          name: 'Direct University Impact',
          link: `/${uni}/analytics/views/1/direct-university-impact`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getTabbed(title, id, collapse, trends, data) {
    let panel = null;
    let allData = false;
    let timeSeriesData = false;

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      if (this.props.reduxState_fetchDataTransaction.default.payload.allData.length > 0) allData = true;
      if (this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.length > 0) timeSeriesData = true;

      if (allData && timeSeriesData) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={id}
          collapsed={collapse}
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
                  reactData: this.getData(data[0], data[1], data[2]), // this.getPercentageBlock(arr), //map over data and use i for arr[i] -- see how it's done on another page!
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
                height: '350px',
                data: {
                  options: this.getTrends(trends[0], trends[1], trends[2], trends[3]),
                },
              },
            },
          ]}
          seperator
        />);
      } else {
        panel = (<BasicPanel
          content={
            <div className="text-center">
              <h5>There is no data for this graph<br />Please adjust the filters.</h5>
            </div>
          }
        />);
      }
    }

    return panel;
  }

  getData(item, collapsed, type) {
    const titles = [];
    const data = [];
    const agree = ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'];
    const extent = ['A great extent', 'Some extent', "Don't know", 'Not at all', 'Have not worked since finishing course'];
    const likely = ['Very likely', 'Likely', "Don't know", 'Not very likely', 'Not likely at all'];

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.allData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.allData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach((value) => {
            let index = null;
            if (type === 'agree') index = agree.indexOf(value.value);
            if (type === 'extent') index = extent.indexOf(value.value);
            if (type === 'likely') index = likely.indexOf(value.value);
            if (type === 'number') index = +value.value;

            titles[index] = value.value;
            data[index] = value.percentage;
          });
        }
      });
    }

    return data.map((element, i) => drawPercentRow(titles[i], element, true));
  }

  getTrends(item, chart, type, colours) {
    let options = null;

    if (chart === 'bar') {
      const axisData = { y: [], x: '%' };
      let dataSeries = [{ name: 'Strongly agree', data: [] }, { name: 'Agree', data: [] }, { name: 'Neither agree or disagree', data: [] }, { name: 'Disagree', data: [] }, { name: 'Strongly disagree', data: [] }];
      if (type === 'extent') dataSeries = [{ name: 'A great extent', data: [] }, { name: 'Some extent', data: [] }, { name: "Don't know", data: [] }, { name: 'Not at all', data: [] }, { name: 'Have not worked since finishing course', data: [] }];
      if (type === 'likely') dataSeries = [{ name: 'Very likely', data: [] }, { name: 'Likely', data: [] }, { name: 'Not very likely', data: [] }, { name: 'Not likely at all', data: [] }, { name: "Don't know", data: [] }];

      if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
        this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
          if (item === element.item) {
            this.dividePercentOverElements(element.data);
            element.data.forEach((elem) => {
              // setting axis data;
              const str = elem.yearGroupEnd + '';
              axisData.y.push(elem.yearGroupStart + '-' + str.slice(2));

              elem.data.data.forEach((value) => {
                // setting the dataSeries data with all the correct numbers for it's name.
                dataSeries.forEach((val) => {
                  if (value.value === val.name) {
                    val.data.push(value.percentage);
                  }
                });
              });
            });
          }
        });
      }
      options = drawNewBarChart(axisData, dataSeries, colours);
    } else if (chart === 'line') {
      const optionsObj = { x: 'Scale', y: 'Average Response' };
      const data = {
        age: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        name: [],
        plotted: [],
      };

      if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
        this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
          if (item === element.item) {
            element.data.forEach((elem) => {
              const str = elem.yearGroupEnd + '';
              data.name.push(elem.yearGroupStart + '-' + str.slice(2));

              const arr = [];
              elem.data.data.forEach((value) => {
                arr[+value.value] = value.percentage;
              });
              data.plotted.push(arr);
            });
          }
        });
      }
      options = drawLineChart(data, optionsObj);
    }

    return options;
  }

  getContent() {
    const content = (
      <div id="page-content" key="content">
        <StandardFilters />
        <SubNav
          active="1"
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
            {this.getTabbed('I apply the knowledge from my degree(s) to my work often',
              'view-1-1',
              false,
              ['applyDegreeToWork', 'bar'],
              ['applyDegreeToWork', false, 'agree'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the skills, methods or techniques I learnt from undertaking my degree to my work often',
              'view-1-2',
              false,
              ['applySkillsToWork', 'bar'],
             ['applySkillsToWork', false, 'agree'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the things I learnt from extra-curricular activities to my work often',
               'view-1-3',
               false,
              ['applyExtraCurricularToWork', 'bar'],
              ['applyExtraCurricularToWork', false, 'agree'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, all the things I did or learnt have contributed meaningfully to my life today',
              'view-1-4',
              false,
              ['contributeMeaningfullyToLife', 'bar'],
              ['contributeMeaningfullyToLife', false, 'agree'])}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('How likely are you to recommend your HE provider to a friend or a colleague',
              'view-1-5',
              false,
              ['recommendToFriendOrColleague', 'line'],
              ['recommendToFriendOrColleague', false, 'number'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">If you were now to choose whether or not to do your course, how likely or unlikely is it that you would...</h3>
            <h5 className="text-muted text-normal">Multi part question</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Do a different subject',
              'view-1-6',
              true,
              ['viewsOnCourseDifferentSubject', 'bar', 'likely'],
              ['viewsOnCourseDifferentSubject', true, 'likely'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Study at a different institution',
              'view-1-7',
              true,
              ['viewsOnCourseDifferentInstitution', 'bar', 'likely'],
              ['viewsOnCourseDifferentInstitution', true, 'likely'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Work towards a different type of qualification',
              'view-1-8',
              true,
              ['viewsOnCourseDifferentQualification', 'bar', 'likely', ['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']],
              ['viewsOnCourseDifferentQualification', true, 'likely'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Decide to do something completely different',
              'view-1-9',
              true,
              ['viewsOnCourseTotallyDifferent', 'bar', 'likely', ['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']],
              ['viewsOnCourseTotallyDifferent', true, 'likely'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">To what extent has your HE experience enabled you to...</h3>
            <h5 className="text-muted text-normal">Multi part question</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Be innovative in the workplace',
              'view-1-10',
              true,
              ['viewsOnHEInnovative', 'bar', 'extent'],
              ['viewsOnHEInnovative', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Make a difference in the workplace',
              'view-1-11',
              true,
              ['viewsOnHEDifferenceInWorkplace', 'bar', 'extent'],
              ['viewsOnHEDifferenceInWorkplace', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Change organisational culture and/or working practices',
              'view-1-12',
              true,
              ['viewsOnHEChangeOrganisation', 'bar', 'extent'],
              ['viewsOnHEChangeOrganisation', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Influence the work of others in the workplace',
              'view-1-13',
              true,
              ['viewsOnHEInfluenceWork', 'bar', 'extent'],
              ['viewsOnHEInfluenceWork', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Access immediate or short-term job opportunities in your chosen career',
              'view-1-14',
              true,
              ['viewsOnHEAccessJobOppts', 'bar', 'extent'],
              ['viewsOnHEAccessJobOppts', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance your credibility or standing in the workplace',
              'view-1-15',
              true,
              ['viewsOnHEEnhanceCredibility', 'bar', 'extent'],
              ['viewsOnHEEnhanceCredibility', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Progress towards your long term career aspirations',
              'view-1-16',
              true,
              ['viewsOnHEProgressLongTerm', 'bar', 'extent'],
              ['viewsOnHEProgressLongTerm', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance your social and intellectual capabilities beyond employment',
              'view-1-17',
              true,
              ['viewsOnHEEnhanceSocialCapeabilities', 'bar', 'extent'],
              ['viewsOnHEEnhanceSocialCapeabilities', true, 'extent'])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance the quality of your life generally',
              'view-1-18',
              true,
              ['viewsOnHEEnhanceQualityOfLife', 'bar', 'extent'],
              ['viewsOnHEEnhanceQualityOfLife', true, 'extent'])}
          </div>
        </div>
      </div>
    );

    return content;
  }

  dividePercentOverElements(dataArr) {
    let remainder;

    dataArr.forEach((element) => {
      let count = 0;
      element.data.data.forEach((elem) => {
        count += elem.percentage;
      });

      if (count > 100) {
        remainder = count - 100;
        element.data.data.forEach((elem) => {
          elem.percentage -= (elem.percentage / 100) * remainder; // eslint-disable-line no-param-reassign
        });
      } else if (count < 100) {
        remainder = 100 - count;
        element.data.data.forEach((elem) => {
          elem.percentage += (elem.percentage / 100) * remainder; // eslint-disable-line no-param-reassign
        });
      }
    });

    return dataArr;
  }

  render() {
    let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished === true && this.props.reduxState_fetchDataTransaction.default.generalStatus === 'success') {
      content = this.getContent();
    } else if (this.props.reduxState_fetchDataTransaction.default.generalStatus === 'error' || this.props.reduxState_fetchDataTransaction.default.generalStatus === 'fatal') {
      console.log(this.props.reduxState_fetchDataTransaction.default.generalStatus.toUpperCase(), this.props.reduxState_fetchDataTransaction.default.payload);
      content = (
        <div>
          <StandardFilters />
          <div className="row" style={{ marginTop: '200px' }}>
            <div className="col-md-10 col-md-push-1 text-center">
              <BasicPanel
                content={
                  <div>
                    <h3><strong>There has been a problem on the backend.</strong></h3>
                    <h4>Try refreshing the page, or changing the filters.</h4>
                    <br />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      );
    }

    const sendData = {};
    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData[key] = this.props.filterData[key];
      }
    });

    const dataTransaction = (
      <div className="container" key="transaction-1a">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/views"
                  sendData={{ filterData: sendData }}
                />
                }
            />
          </div>
        </div>
      </div>
    );

    const output = [
      content,
      dataTransaction,
    ];

    const { location } = this.props;
    return (
      <div>
        <Wrapper content={output} theLocation={location} />
      </div>
    );
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
  reduxState_fetchDataTransaction: PropTypes.object,
  filterData: PropTypes.object,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
  reduxState_fetchDataTransaction: { default: {} },
  filterData: {},
};

const mapStateToProps = state => ({
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
  filterData: state.dataStoreSingle.filterData,
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
