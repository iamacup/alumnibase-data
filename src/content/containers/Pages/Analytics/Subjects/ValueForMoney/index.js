
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawScatterGraph from '../../../../../../content/scripts/custom/echarts/drawScatterGraph';
import drawBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import drawLineChart from '../../../../../../content/scripts/custom/echarts/drawLineChart';


class Page extends React.PureComponent {
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
          name: 'Salary Overview',
          link: '/analytics/salary/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    // * Allied Health Professions, Dentistry, Nursing and Pharmacy
    // ** Aeronautical, Mechanical, Chemical and Manufacturing Engineering
    // *** Electrical and Electronic Engineering, Metallurgy and Materials
    // **** Communication, Cultural and Media Studies, Library and Information Management
    const barData = {
      titles1: ['Education', 'Anthropology & Development Studies', '****', 'Politics and International Studies', 'English Language and Literature', 'Business and Management Studies', 'Geography, Environmental Studies and Archaeology', 'General Engineering', 'Area Studies', '***', '**', 'Mathematical Sciences', 'Physics', 'Earth Systems and Environmental Sciences', 'Biological Sciences', 'Psychology, Psychiatry and Neuroscience', '*', 'Clinical Medicine'],
      titles2: ['Sport and Excercise Sciences, Leisure and Tourism', 'Education', 'Theology and Religious Studies', 'Public Health, Health Services and Primary Care', 'Architecture, Built Environment and Planning', 'Clinical Medicine'],
      data2: [{ data: [27, 34, 48, 97, 99, 100] }],
      data1: [{ data: [34, 38, 45, 50, 54, 58, 62, 64, 65, 72, 76, 78, 80, 82, 84, 88, 92, 100] }],
      options1: { direction: 'horizontal', value: '' },
      options2: { direction: 'horizontal', value: '', colours: ['#1c6cab', '#d02224'] },
    };

    const data = [
    // Negative-Low
      [-3000, -2.5],
      [-2000, -1],
      [-2500, -0.7],
      [-4700, -1.5],
      [-4600, -0],
      [-45000, -1],
      [-0, -2],
      [-100, -0.05],
      [-700, -1.2],
      [-600, -0.6],
      // Positive-Low
      [-5000, 3],
      [-6000, 2],
      [-2500, 1.57],
      [-700, 2.43],
      [-750, 0.71],
      [-3500, 1.21],
      [-3300, 2.93],
      [-1800, 1.79],
      [-1500, 3.43],
      [-100, 4.21],
      // Positive-High
      [5000, 3],
      [100, 3.93],
      [200, 2.79],
      [300, 1.64],
      [800, 0.64],
      [900, 1.57],
      [1000, 3.21],
      [1000, 4.71],
      [1500, 2.36],
      [1800, 0.71],
      [2000, 3.57],
      [2500, 1.86],
      [2600, 5.21],
      [2700, 4.64],
      [2800, 0.93],
      [2900, 2.93],
      [3000, 0],
      [3100, 1.71],
      [3200, 4],
      [3800, 4.86],
      [3900, 2.93],
      [4000, 3.57],
      [4100, 0.71],
      [4200],
      [4300],
      [4400],
      [4500],
      [4600],
      [4700],
      [4800],
      [4900],
      [5000],
      [5100],

      // Negative-High
      [5000, -3],
      [10000, -3.5],
    ];

    const bar1 = drawBarChart(barData.titles1, barData.data1, barData.options1);
    const bar2 = drawBarChart(barData.titles2, barData.data2, barData.options2);
    const scatterData = drawScatterGraph(data);

    const postContent = [['* Allied Health Professions, Dentistry, Nursing and Pharmacy'], ['** Aeronautical, Mechanical, Chemical and Manufacturing Engineering'], ['*** Electrical and Electronic Engineering, Metallurgy and Materials'], ['**** Communication, Cultural and Media Studies, Library and Information Management']];
    const text1 = <p>{postContent[0]}<br />{postContent[1]}<br />{postContent[2]}<br />{postContent[3]}</p>;

    const optionsA = {
      x: 'Years',
      y: 'Number of People Over the Threshold',
      yLabel: 'horizontal',
    };

    const data1 = {
      name: ['Plan 2', 'Plan 3'],
      plotted: [[20000, 25000, 43000],
        [10000, 12000, 16000, 23000, 43000]],
      age: ['New Graduate - 2 Years', '2 - 5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years'],
    };
    const lineData = drawLineChart(data1, optionsA);

    const tabData1 = [
      {
        title: 'Percentage of People who Believe their Course Offered Value for Money',
        globalID: 'VFM-1',
        options: bar1,
        text: text1,
      },
      {
        title: 'Top 3 vs Bottom 3: Percentage of people who believe their course offers value for money',
        globalID: 'VFM-2',
        options: bar2,
        text: '',
      },
    ];

    const tabData2 = [
      {
        title: 'Average Time Taken for Graduates to Pay Back Student Loans',
        globalID: 'VFM-4',
        options: lineData,
        text: <div className="pull-right"><p>* Plan 3 inflation is calcuated as 6% today flat over the period</p></div>,
      },
    ];


    const tabData3 = [
      {
        title: 'University Impact vs Life Salary',
        globalID: 'VFM-3',
        options: scatterData,
        text: '',
      },
    ];

    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Percieved Value</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {tabData1.map(element => (
                      // {if {element.globalID !== "VFM-1") text = ""}
              <TabbedGraphPanel
                title={element.title}
                globalID={element.globalID}
                content={[
                    {
                      title: '',
                      postContent: element.text,
                      active: true,
                      graphData: {
                        type: 'echarts',
                        tools: {
                          allowDownload: true,
                          seeData: false,
                          pinGraph: true,
                        },
                        width: '100%',
                        height: '400px',
                        data: {
                          options: element.options,
                        },
                      },
                    },
                  ]}
                seperator
              />
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Loan Repayment</h3>
            <h5 className="text-muted text-normal">Predictions based on total average salary for data per year group, inflation of loans and assumed full loan value with repayments made at standard PAYE tax rate.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {tabData2.map(element => (
                      // {if {element.globalID !== "VFM-1") text = ""}
              <TabbedGraphPanel
                title={element.title}
                globalID={element.globalID}
                content={[
                    {
                      title: '',
                      postContent: element.text,
                      active: true,
                      graphData: {
                        type: 'echarts',
                        tools: {
                          allowDownload: true,
                          seeData: false,
                          pinGraph: true,
                        },
                        width: '100%',
                        height: '400px',
                        data: {
                          options: element.options,
                        },
                      },
                    },
                  ]}
                seperator
              />
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Monetary and Derived Value</h3>
            <h5 className="text-muted text-normal">We take various metrics from the survey that indicate positive impact of the university on the respondents life that are not related to salary and map them against salary.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {tabData3.map(element => (
                      // {if {element.globalID !== "VFM-1") text = ""}
              <TabbedGraphPanel
                title={element.title}
                globalID={element.globalID}
                content={[
                    {
                      title: '',
                      postContent: element.text,
                      active: true,
                      graphData: {
                        type: 'echarts',
                        tools: {
                          allowDownload: true,
                          seeData: false,
                          pinGraph: true,
                        },
                        width: '100%',
                        height: '400px',
                        data: {
                          options: element.options,
                        },
                      },
                    },
                  ]}
                seperator
              />
            ))}
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
