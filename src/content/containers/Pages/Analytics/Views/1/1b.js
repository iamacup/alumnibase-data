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

const dataStoreID = 'views';
const FetchData = fetchDataBuilder(dataStoreID);

class Page1b extends React.PureComponent {
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

    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      this.props.reduxState_fetchDataTransaction.default.payload.forEach((element) => {
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
                    this.getOptions1(['#d02224', '#ffbb7d', '#ff7311', '#a4c0e5', '#1c6cab', '#ff8d8b', '#11293b']),
                    this.getData('furtherStudyAdvancesCareer', false))}
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
      <FetchData
        key="transaction-1b"
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
