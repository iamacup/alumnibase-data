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

  getOptions1() {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'Strongly agree', data: [25, 16, 14, 12, 10] },
      { name: 'Agree', data: [30, 16, 14, 12, 10] },
      { name: 'Neither agree or disagree', data: [15, 44, 44, 44, 40] },
      { name: 'Disagree', data: [10, 12, 14, 16, 20] },
      { name: 'Strongly disagree', data: [20, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries);

    return options;
  }

  getOptions2() {
    const optionsA = {
      x: 'Age',
      y: 'Average Response',
    };

    const age = [];
    const first = [];
    const plotted = [];

    const start = 9.1;
    const end = 5.6;

    const firstAge = 21;
    const lastAge = 61;

    let current = start;
    const increment = (start - end) / (lastAge - firstAge);
    for (let a = firstAge; a < lastAge; a++) {
      age.push(a);
      first.push(Number(current.toPrecision(2)));
      current -= increment;
    }

    plotted.push(first);

    const data = {
      age,
      name: ['test'],
      plotted,
    };

    const options = drawLineChart(data, optionsA);

    return options;
  }


  getOptions3(colours) {
    const axisData = { y: ['1970+', '1980-89', '1990-99', '2000-09', '2010-18'].reverse(), x: '%' };
    const dataSeries = [
      { name: 'Very Likely', data: [20, 16, 14, 12, 10] },
      { name: 'Likely', data: [20, 16, 14, 12, 10] },
      { name: 'Not very likely', data: [40, 44, 44, 44, 40] },
      { name: 'Not likely at all', data: [10, 12, 14, 16, 20] },
      { name: 'Don\'t know', data: [10, 12, 14, 16, 20] },
    ];

    const options = drawNewBarChart(axisData, dataSeries, colours);

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

  getTabbed(title, id, options, dataObj) {
    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={dataObj.collapsed}
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
                  reactData: dataObj.data.map((element, i) => drawPercentRow(dataObj.titles[i], element, true)), // this.getPercentageBlock(arr), //map over data and use i for arr[i] -- see how it's done on another page!
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

  getData(item, collapsed) {
    const titles = [];
    const data = [];

    // console.log(item);

    if (dNc(this.props.reduxState_fetchDataTransaction) && dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.allData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.allData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach((value) => {
            titles.push(value.value);
            data.push(value.percentage);
          });
        }
      });
    }

    return { titles, collapsed, data };
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
              this.getOptions1(),
              this.getData('applyDegreeToWork', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the skills, methods or techniques I learnt from undertaking my degree to my work often',
              'view-1-2',
              this.getOptions1(),
             this.getData('applySkillsToWork', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('I apply the things I learnt from extra-curricular activities to my work often',
              'view-1-3',
              this.getOptions1(),
              this.getData('applyExtraCurricularToWork', false))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Overall, all the things I did or learnt have contributed meaningfully to my life today',
              'view-1-4',
              this.getOptions1(),
              this.getData('contributeMeaningfullyToLife', false))}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('How likely are you to recommend your HE provider to a friend or a colleague',
              'view-1-5',
              this.getOptions2(),
              this.getData('recommendToFriendOrColleague', false))}
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
              this.getOptions3(),
              this.getData('viewsOnCourseDifferentSubject', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Study at a different institution',
              'view-1-7',
              this.getOptions3(),
              this.getData('viewsOnCourseDifferentInstitution', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Work towards a different type of qualification',
              'view-1-8',
              this.getOptions3(['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']),
              this.getData('viewsOnCourseDifferentQualification', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Decide to do something completely different',
              'view-1-9',
              this.getOptions3(['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']),
              this.getData('viewsOnCourseTotallyDifferent', true))}
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
              this.getOptions4(),
              this.getData('viewsOnHEInnovative', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Make a difference in the workplace',
              'view-1-11',
              this.getOptions4(),
              this.getData('viewsOnHEDifferenceInWorkplace', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Change organisational culture and/or working practices',
              'view-1-12',
              this.getOptions4(),
              this.getData('viewsOnHEChangeOrganisation', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Influence the work of others in the workplace',
              'view-1-13',
              this.getOptions4(),
              this.getData('viewsOnHEInfluenceWork', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Access immediate or short-term job opportunities in your chosen career',
              'view-1-14',
              this.getOptions4(),
              this.getData('viewsOnHEAccessJobOppts', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance your credibility or standing in the workplace',
              'view-1-15',
              this.getOptions4(),
              this.getData('viewsOnHEEnhanceCredibility', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Progress towards your long term career aspirations',
              'view-1-16',
              this.getOptions4(),
              this.getData('viewsOnHEProgressLongTerm', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance your social and intellectual capabilities beyond employment',
              'view-1-17',
              this.getOptions4(),
              this.getData('viewsOnHEEnhanceSocialCapeabilities', true))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getTabbed('Enhance the quality of your life generally',
              'view-1-18',
              this.getOptions4(),
              this.getData('viewsOnHEEnhanceQualityOfLife', true))}
          </div>
        </div>


      </div>
    );

    return content;
  }

  render() {
    let content = null;

    if (this.props.reduxState_fetchDataTransaction.default.finished === true) {
      content = this.getContent();
    }


    const sendData = { data: [] };


    Object.keys(this.props.filterData).forEach((key) => {
      if (dNc(this.props.filterData[key])) {
        sendData.data.push({ [key]: this.props.filterData[key] });
      }
    });

    const dataTransaction = (
      // put the fetch in a different pane/panel.
      <FetchData
        key="transaction-1a"
        active
        fetchURL="/api/analytics/views"
        sendData={sendData}
      />
    );

    const output = [
      dataTransaction,
      content,
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
  reduxState_fetchDataTransaction: { default: {}, },
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
