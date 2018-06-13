
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
// import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';
import fetchDataBuilder from '../../../../../../foundation/redux/Factories/FetchData';
import BasicPanel from '../../../../../../content/components/BasicPanel';
import { dNc } from '../../../../../../content/scripts/custom/utilities';

const dataStoreID = 'jobs-employers';
const FetchData = fetchDataBuilder(dataStoreID);

class Page extends React.PureComponent {
  componentDidMount() {
    const uni = this.props.location.pathname.split('/')[1];

    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Further Study Overview',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: `/${uni}/analytics`,
        },
        {
          name: 'Further Study',
          link: `/${uni}/analytics/further-study`,
        },
        {
          name: 'Overview',
          link: `/${uni}/analytics/further-study/overview`,
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGroupedBarchart(title, globalID, dataName, label) {
    let panel = null;
    let labels = '';
    let topLabel = '';
    if (label) {
      labels = <p>Small and medium-sized enterprises (SMEs) employ fewer than 250 people.<br />SMEs are further subdivided into <strong>Micro enterprises</strong> (fewer than 10 employees).<br /><strong>Small enterprises</strong> (10 to 49 employees).<br /><strong>Medium-sized enterprises</strong> (50 to 249 employees).<br /><strong>Large enterprises</strong> employ 250 or more people.</p>;
    } else {
      topLabel = <p>Percentage of graduates in employment after completing a sandwich course.</p>;
    }

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      const length = [];
      if (dataName === 'companySizes') length.push(this.props.reduxState_fetchDataTransaction.default.payload[0][dataName][0].length, 1);
      else if (dataName === 'employmentRate') {
        Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0][dataName][0]).forEach((element) => {
          if (this.props.reduxState_fetchDataTransaction.default.payload[0][dataName][0][element].length > 0) length.push(this.props.reduxState_fetchDataTransaction.default.payload[0][dataName][0][element].length);
        });
      }

      console.log(length);

      if (length[0] > 0 && length[1] > 0) {
        panel = (<TabbedGraphPanel
          title={title}
          globalID={globalID}
          content={[
            {
              title: '',
              preContent: topLabel,
              postContent: labels,
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
                  options: this.getData(dataName),
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


  // getSankeyGraph() {
  //   const columns1 = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];

  //   const rows1 = [
  //     ['Graduates', 'Public', 100],
  //     ['Public', 'NHS', 34],
  //     ['Public', 'Defence', 23],
  //     ['Public', 'Social Care', 11],
  //     ['Public', 'Other', 32],
  //   ];

  //   const googleData1 = drawSankeyChart(columns1, rows1);

  //   const data = {
  //     title: 'Destinations of Graduates Working in the Public Sector',
  //     globalID: 'stem-destinations-1',
  //     type: 'googlecharts',
  //     drawData: { ...googleData1 },
  //   };

  //   const panel = (<TabbedGraphPanel
  //     title={data.title}
  //     globalID={data.globalID}
  //     content={[
  //                 {
  //                   title: '',
  //                   active: true,
  //                   graphData: {
  //                     type: data.type,
  //                     tools: {
  //                       allowDownload: true,
  //                       seeData: false,
  //                       pinGraph: true,
  //                     },
  //                     width: '100%',
  //                     height: '250px',
  //                     data: data.drawData,
  //                   },
  //                 },
  //               ]}
  //     seperator
  //   />);
  //   return panel;
  // }

  getData(type) {
    let titles = ['Micro', 'Small', 'Medium', 'Large'];
    let data = [];
    const obj = { direction: 'vertical', value: '' };

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload) && dNc(this.props.reduxState_fetchDataTransaction.default.payload[0])) {
      Object.keys(this.props.reduxState_fetchDataTransaction.default.payload[0]).forEach((element) => {
        console.log(element);
        if (element === type && element === 'companySizes') {
          this.props.reduxState_fetchDataTransaction.default.payload[0][element].forEach((value) => {
            value.forEach((elem) => {
              const yearData = [];
              let name = '';

              elem.values.forEach((val) => {
                yearData.splice(titles.indexOf(val.value), 0, val.percent);
              });
              if (elem.graduationYear === 2017) name = '1 Year';
              if (elem.graduationYear === 2014) name = '5 Years';
              if (elem.graduationYear === 2009) name = '10 Years';

              data.push({ name, data: yearData });
            });
          });
        } else if (element === type && element === 'employmentRate') {
          titles = [];
          data = [{ name: '', data: [] }];

          this.props.reduxState_fetchDataTransaction.default.payload[0][element].forEach((elem) => {
            Object.keys(elem).forEach((name) => {
              let title;
              if (name === 'firstYearEmployment') title = 'Non-Sandwich\nCourse Average';
              else title = 'Sandwich Course\nAverage';
              titles.push(title);

              elem[name].forEach((val) => {
                if (val.value === 'Employment') data[0].data.push(val.percent);
              });
            });
          });
        }
      });
    }

    const options = drawGroupedBarChart(titles, data, obj);
    return options;
  }

  getContent() {
    const content = (
      <div id="page-content" key="jobs-employers">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Job and Careers Employers Page</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Graduate Employer Destinations Split by Time After Graduating',
                  'tuesday-graphs-3',
                  'companySizes', true)}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            {this.getGroupedBarchart('Employment rate of graduates in the First Year.',
                            'tuesday-graphs-3',
                            'employmentRate')}

          </div>
        </div>
        {/*     <div className="row">
             <div className="col-md-8 col-md-push-2">
               {this.getSankeyGraph()}
             </div>
           </div> */}
      </div>
    );

    return content;
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
      <div className="container" key="transaction-jobs-employers">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/jobs/employers"
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
