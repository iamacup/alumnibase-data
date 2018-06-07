import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import drawPercentRow from '../../../../../../content/scripts/custom/echarts/drawPercentRow';
import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';

import SubNav from './subNav';

import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'views-1b';
const FetchData = fetchDataBuilder(dataStoreID);

class Page1b extends React.PureComponent {
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
          name: 'Views on Education',
          link: `/${uni}/analytics/views/1/views-on-education`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getTabbed(title, id, options, dataObj) {
    const panel = (<TabbedGraphPanel
      title={title}
      globalID={id}
      collapsed={dataObj.collapsed}
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
                  reactData: dataObj.data.map((element, i) => drawPercentRow(dataObj.titles[i], element, true)),
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

  getData(item, collapsed) {
    const titles = [];
    const data = [];
    const agree = ['Strongly agree', 'Agree', 'Neither agree or disagree', 'Disagree', 'Strongly disagree'];

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.allData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.allData.forEach((element) => {
        if (item === element.item) {
          element.data.forEach((value) => {
            const index = agree.indexOf(value.value);

            titles[index] = (value.value);
            data[index] = (value.percentage);
          });
        }
      });
    }

    return { titles, collapsed, data };
  }

  getTrends(name, colours) {
    const axisData = { y: [], x: '%' };
    const dataSeries = [
      { name: 'Strongly agree', data: [] },
      { name: 'Agree', data: [] },
      { name: 'Neither agree or disagree', data: [] },
      { name: 'Disagree', data: [] },
      { name: 'Strongly disagree', data: [] },
    ];

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData)) {
      this.props.reduxState_fetchDataTransaction.default.payload.timeSeriesData.forEach((element) => {
        if (name === element.item) {
          this.dividePercentOverElements(element.data);
          element.data.forEach((elem) => {
            const str = elem.yearGroupEnd + '';
            axisData.y.push(elem.yearGroupStart + '-' + str.slice(2));

            elem.data.data.forEach((value) => {
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

    const options = drawNewBarChart(axisData, dataSeries, colours);
    return options;
  }

  getContent() {
    const content = (
      <div id="page-content" key="content-1b">

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
                    this.getTrends('furtherStudyAdvancesCareer', ['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']),
                    this.getData('furtherStudyAdvancesCareer', false))}
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
      <div className="container" key="transaction-1b">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/views"
                  sendData={sendData}
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

Page1b.propTypes = {
  location: PropTypes.object.isRequired,
  reduxAction_doUpdate: PropTypes.func,
  filterData: PropTypes.object,
  reduxState_fetchDataTransaction: PropTypes.object,
};

Page1b.defaultProps = {
  reduxAction_doUpdate: () => {},
  filterData: {},
  reduxState_fetchDataTransaction: { default: {} },
};

const mapStateToProps = state => ({
  filterData: state.dataStoreSingle.filterData,
  reduxState_fetchDataTransaction: state.dataTransactions[dataStoreID],
});

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page1b);
