
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

  getGroupedBarchart(title, value, direction, globalID, dataObj, label) {
    const obj = {
      direction,
      value,
    };

    let labels = '';
    let topLabel = '';
    if (label) {
      labels = <p>Small and medium-sized enterprises (SMEs) employ fewer than 250 people.<br />SMEs are further subdivided into <strong>Micro enterprises</strong> (fewer than 10 employees).<br /><strong>Small enterprises</strong> (10 to 49 employees).<br /><strong>Medium-sized enterprises</strong> (50 to 249 employees).<br /><strong>Large enterprises</strong> employ 250 or more people.</p>;
    } else {
      topLabel = <p>Percentage of graduates in employment after completing a sandwich course.</p>;
    }
    const options = drawGroupedBarChart(dataObj.titles, dataObj.data, obj);

    const panel = (<TabbedGraphPanel
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
                  options,
                },
              },
            },
          ]}
      seperator
    />);

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

    if (dNc(this.props.reduxState_fetchDataTransaction.default.payload)) {
      this.props.reduxState_fetchDataTransaction.default.payload.forEach((element) => {
        if (Object.keys(element)[0] === type) {
          element[type].forEach((value) => {
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
        } else if (Object.keys(element)[1] === type) {
          titles = [];
          data = [{ name: '', data: [] }];

          element[type].forEach((elem) => {
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

    return { titles, data };
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
                  '',
                  'vertical',
                  'tuesday-graphs-3',
                  this.getData('companySizes'), true)}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            {this.getGroupedBarchart('Employment rate of graduates in the First Year.',
                            '',
                            'vertical',
                            'tuesday-graphs-3',
                            this.getData('employmentRate'))}

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
      <div className="container" key="transaction-jobs-employers">
        <div className="row" style={{ marginTop: '200px' }}>
          <div className="col-1">
            <BasicPanel
              content={
                <FetchData
                  active
                  fetchURL="/api/analytics/jobs/employers"
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
