import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents, dNc } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawNewBarChart from '../../../../../../content/scripts/custom/echarts/drawStackedBarChart';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

const dataStoreID = 'dhle-like-5';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'DLHE Requirement 5 - Destination, Employment and Earnings',
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
          name: 'RQ 5 - Destination, Employment and Earnings',
          link: `/${uni}/analytics/dlhe-like/5`,
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

  getStackedBarchart(title, titles, globalID, data) {
    const axisData = { y: titles, x: '%' };

    const options = drawNewBarChart(axisData, data);

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
      <div id="page-content" key="DHLE-5">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Destinations Employment and Earnings</h3>
            <h5 className="text-muted text-normal">Destinations of graduates 6 months after leaving university.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getStackedBarchart('Sciences High Level Destinations entered by First Time Graduates',
              ['Medicine & dentistry', 'Subjects allied to medicine', 'Biological sciences', 'Veterinary science', 'Agriculture & related subjects', 'Physical sciences', 'Mathmatical sciences', 'Computer science', 'Engineering & technology', 'Architecture, building & planning', 'Total - Science subject areas'],
              'DHLE-5-1',
              [
                { name: 'Full-time work', data: [91.9, 77.9, 41.4, 92.4, 58.1, 43.7, 49.9, 63.7, 62, 70.1, 60.7] },
                { name: 'Part-time work', data: [0.8, 7.1, 15, 1.9, 12.1, 9.8, 7.8, 10.1, 8, 7.2, 9.5] },
                { name: 'Work and further study', data: [1.6, 3.2, 7.6, 1, 5.2, 4.8, 5.8, 2.5, 2.8, 4.7, 4.5] },
                { name: 'Further study', data: [4.8, 7.4, 26.1, 1.3, 12.8, 29.9, 23.6, 10.4, 15.4, 8.5, 16.6] },
                { name: 'Unemployed', data: [0.3, 2.1, 5.1, 1.7, 4.8, 6.8, 7.4, 9.7, 7.5, 5.8, 5] },
                { name: 'Other', data: [0.6, 2.2, 4.8, 1.7, 7, 5.1, 5.4, 3.5, 4.4, 3.8, 3.8] },
              ])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Average Full Time Earnings',
              '£',
              'horizontal',
              'DHLE-5-2',
              ['Medicine & dentistry', 'Subjects allied to medicine', 'Biological sciences', 'Vetenary science', 'Agriculture & related subjects', 'Physical sciences', 'Mathmatical sciences', 'Computer science', 'Engineering & technology', 'Architecture, building & planning'],
              [
                { data: [42000, 40000, 34000, 41000, 34000, 36000, 43000, 40000, 39000, 35000] },
              ])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Male /Female Full Time Earnings by First Degree Graduates - Science',
              '£',
              'horizontal',
              'DHLE-5-3',
              ['Medicine & dentistry', 'Subjects allied to medicine', 'Biological sciences', 'Vetenary science', 'Agriculture & related subjects', 'Physical sciences', 'Mathmatical sciences', 'Computer science', 'Engineering & technology', 'Architecture, building & planning'],
              [
                { name: 'Male', data: [46200, 44000, 37400, 45100, 37400, 39600, 47300, 44000, 42900, 38500] },
                { name: 'Female', data: [37800, 36000, 30600, 36900, 30600, 32400, 38700, 36000, 35100, 31500] },
              ])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getStackedBarchart('Non-Science High Level Destinations by First Time Graduates',
              ['Social studies', 'Law', 'Business & administrative studies', 'Mass communications & documentation', 'Languages', 'Historical & philosophical studies', 'Creative arts & design', 'Education', 'Combined'],
              'DHLE-5-4',
              [
                { name: 'Full-time work', data: [51.7, 40.0, 63.8, 54.7, 44.9, 40.9, 50.4, 61.3, 46.7] },
                { name: 'Part-time work', data: [12.7, 8.6, 10.3, 20.4, 13.3, 12.7, 25.1, 12.7, 11.4] },
                { name: 'Work and further study', data: [6.1, 10.5, 5.6, 3.6, 6.7, 7.0, 4.0, 4.1, 6.8] },
                { name: 'Further study', data: [17.6, 31.7, 9, 8.7, 23.9, 27.1, 10, 15.9, 21.6] },
                { name: 'Unemployed', data: [6.2, 4.8, 6.1, 7.8, 6, 6.3, 6.2, 2.6, 4.3] },
                { name: 'Other', data: [5.8, 4.5, 5.2, 4.7, 5.2, 6.1, 4.3, 3.4, 9.1] },
              ])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Average Full Time Earnings',
              '£',
              'horizontal',
              'DHLE-5-5',
              ['Social studies', 'Law', 'Business & administrative studies', 'Mass communications & documentation', 'Languages', 'Historical & philosophical studies', 'Creative arts & design', 'Education', 'Combined'],
              [
                { data: [27000, 39000, 30000, 29000, 21000, 25000, 19000, 21000, 29000] },
              ])}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Male /Female Full Time Earnings by First Degree Graduates - Non-Science',
              '£',
              'horizontal',
              'DHLE-5-6',
              ['Social studies', 'Law', 'Business & administrative studies', 'Mass communications & documentation', 'Languages', 'Historical & philosophical studies', 'Creative arts & design', 'Education', 'Combined'],
              [
                { name: 'Male', data: [29700, 42900, 33000, 31900, 23100, 27500, 20900, 23100, 31900] },
                { name: 'Female', data: [24300, 35100, 27000, 26100, 18900, 22500, 17100, 18900, 26100] },
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
      <div className="container" key="transaction-dhle-5">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/dhle-like/5"
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
