import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-6';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 6 - Employment Outcomes',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'DHLE-Like',
          link: `/${uni}/analytics/dlhe-like`,
        },
        {
          name: 'RQ 6 - Employment Outcomes',
          link: `/${uni}/analytics/dlhe-like/6`,
        }],
    });

    $(() => {
      // listen for resize events
      fireDebouncedResizeEvents();

      // then listen for the events here
      $(document).on('debouncedResizeEvent', () => {
        redrawCharts();
      });

      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGroupedBarchart(title, value, direction, globalID, titles, data) {
    const obj = {
      direction,
      value,
      // colours: this.props.data[0].colours,
    };

    const options = drawGroupedBarChart(titles, data, obj);

    const panel = (<TabbedGraphPanel
      title={title}
      globalID={globalID}
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
                height: '350px',
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

  getContent() {
    const content = (
      <div id="page-content" key="DHLE-6">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Employment Outcomes</h3>
            <h5 className="text-muted text-normal">Outcomes for graduates 6 months after leaving university.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Post Graduate Graduates by Type of Employment & Gender',
              '',
              'horizontal',
              'DHLE-6-1',
              ['Managers, directors and senior officials', 'Professional occupations', 'Associate professional and techniacl occupations', 'Total professional', 'Administrative and secretarial occupations', 'skilled trades occupations', 'Caring, leisure and other service occupations', 'Sales and customer service occupations', 'Process, plant and machine operatives', 'Elementary occupations', 'Total non-professional'],
              [
                { name: 'Other', data: [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0] },
                { name: 'Male', data: [640, 11560, 3680, 15885, 465, 120, 245, 460, 55, 305, 1650] },
                { name: 'Female', data: [435, 19605, 4230, 24275, 890, 55, 635, 585, 15, 285, 2465] },
              ])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('First Degree Graduates by Type of Employment & Gender',
              '',
              'horizontal',
              'DHLE-6-2',
              ['Managers, directors and senior officials', 'Professional occupations', 'Associate professional and techniacl occupations', 'Total professional', 'Administrative and secretarial occupations', 'skilled trades occupations', 'Caring, leisure and other service occupations', 'Sales and customer service occupations', 'Process, plant and machine operatives', 'Elementary occupations', 'Total non-professional'],
              [
                { name: 'Other', data: [0, 10, 5, 15, 0, 0, 0, 0, 0, 0, 5] },
                { name: 'Male', data: [3150, 25280, 21785, 50220, 3170, 1210, 2090, 6715, 660, 4700, 18545] },
                { name: 'Female', data: [2705, 40365, 26920, 69990, 7015, 755, 7480, 10165, 200, 4875, 30495] },
              ])}
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
      <div className="container" key="transaction-dhle-6">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/dhle-like/6"
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
      <Wrapper content={output} theLocation={location} />
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
