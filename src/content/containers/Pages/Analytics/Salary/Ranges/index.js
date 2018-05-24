import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';

import drawBoxplotChart from '../../../../../../content/scripts/custom/echarts/drawBoxPlotChart';
import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import { dNc } from '../../../../../../content/scripts/custom/utilities';


const dataStoreID = 'salary-ranges';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     showNationalAverage: false,
  //   };
  // }

  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Graduate Salaries',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Salary',
          link: '/analytics/salary',
        },
        {
          name: 'Graduate Salaries',
          link: '/analytics/salary/1',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      // make the checkbox look nice with switchery
      // const elem = document.querySelector('#switchery-switch');

      // eslint-disable-next-line no-undef, no-unused-vars
      // const init = new Switchery(elem);

      // elem.onchange = () => {
      //   this.clickShowNationalAverage();
      // };
    });
  }

  getBoxPlot(input, title, id, height) {
    const options = drawBoxplotChart(input.values, input.categories, 40000);
    const panel = (
      <TabbedGraphPanel
        title={title}
        globalID={id}
        content={[
            {
              title: '',
              active: true,
              postContent: <div className="pull-right"><p>Data is shown for all survery data with any filters applied.</p></div>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height,
                data: {
                  options,
                },
              },
            },
          ]}
        seperator
      />
    );
    return panel;
  }

  getData(name) {
    const data = { categories: [], values: [] };
    if (dNc(this.props.reduxState_fetchDataTransaction.default) && dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      this.props.reduxState_fetchDataTransaction.default.payload.forEach((element) => {
        if (name === element.splitItem) {
          element.split.forEach((value) => {
            data.categories.push(value.gender);
            data.values.push(value.salaries);
          });
        }
      });
    }
    // get national average to work.

    // if (this.state.showNationalAverage === true) {
    //   const nationalAverageSalaryData = [23000, 240000];

    //   genderData.categories.push('National Average');
    //   genderData.values.push(nationalAverageSalaryData);

    //   ethnicityData.categories.push('National Average');
    //   ethnicityData.values.push(nationalAverageSalaryData);

    //   religionData.categories.push('National Average');
    //   religionData.values.push(nationalAverageSalaryData);
    // }

    return data;
  }

  getContent() {
    const content = (
      <div className="ranges" id="page-content" key="ranges-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <BasicPanel
              content={

                <div>
                  <p>
                    This data displays the average pay gaps between <strong>gender, ethnicity and religion</strong>.<br /><br />
                    <strong>Remember</strong> to use the filters above to narrow your analytics to specific <strong>year groups, subjects, or other areas</strong>.<br /><br />
                  </p>

                  {/*           <div className="row">
                           <div className="col-sm-4 col-sm-push-4">
                             <div className="panel media middle">
                               <div className="media-left bg-primary pad-all">
                                 <input id="switchery-switch" type="checkbox" />
                               </div>
                               <div className="media-body pad-lft bg-on-white">
                                 <p className="text-muted mar-no">Show national average on graphs - <strong style={{ color: 'red' }}>NEED TO DISCUSS IF WE KEEP THIS</strong></p>
                               </div>
                             </div>
                           </div>
                         </div> */}

                </div>

                }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getBoxPlot(this.getData('gender'), 'Average pay, split by gender', 'salary-ranges-1', '350px')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1" id="ranges-ethnicity">
            {this.getBoxPlot(this.getData('ethnicity'), 'Average pay, split by ethnicity', 'salary-ranges-2', '500px')}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getBoxPlot(this.getData('religion'), 'Average pay, split by religion', 'salary-ranges-3', '700px')}
          </div>
        </div>

      </div>
    );


    return content;
  }

  // clickShowNationalAverage() {
  //   this.setState({ showNationalAverage: !this.state.showNationalAverage });
  // }

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
      <div className="container">
        <div className="row" style={{ marginTop: '200px'}}>
          <div className="col-1">
              <BasicPanel
                content={
                <FetchData
                  key="transaction-ranges"
                  active
                  fetchURL="/api/analytics/salary/ranges"
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
