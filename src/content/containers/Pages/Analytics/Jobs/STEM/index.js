
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';
import drawPieChart from '../../../../../../content/scripts/custom/echarts/drawPieChart';
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
    const columns1 = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];
    const options1 = {
      STEM: 10, 'Non-STEM': 20, 'High Skilled': 19, 'Not High Skilled': 11,
    };
    const rows1 = [
      ['STEM', 'High Skilled', 6],
      ['STEM', 'Not High Skilled', 4],
      ['Non-STEM', 'High Skilled', 13],
      ['Non-STEM', 'Not High Skilled', 7],
      ['High Skilled', 'Alligned to Industrial Strategy', 10],
      ['High Skilled', 'Not Alligned to Industrial Strategy', 9],
      ['Not High Skilled', 'Not Alligned to Industrial Strategy', 8],
      ['Not High Skilled', 'Alligned to Industrial Strategy', 3],
    ];

    const rows2 = [
      ['White', 'Non-STEM', 9],
      ['White', 'STEM', 7],
      ['Mixed', 'Non-STEM', 3],
      ['Mixed', 'STEM', 1],
      ['Asian', 'Non-STEM', 5],
      ['Asian', 'STEM', 3],
      ['Black / African / Caribbean', 'Non-STEM', 5],
      ['Black / African / Caribbean', 'STEM', 2],
      ['Other', 'Non-STEM', 3],
      ['Other', 'STEM', 1],
      ['STEM', 'High Skilled', 8],
      ['STEM', 'Not High Skilled', 6],
      ['Non-STEM', 'High Skilled', 15],
      ['Non-STEM', 'Not High Skilled', 10],
      ['High Skilled', 'Alligned to Industrial Strategy', 15],
      ['High Skilled', 'Not Alligned to Industrial Strategy', 8],
      ['Not High Skilled', 'Not Alligned to Industrial Strategy', 8],
      ['Not High Skilled', 'Alligned to Industrial Strategy', 8],
    ];
    const options2 = {
      White: 16, Mixed: 4, Asian: 8, 'Black / African / Caribbean': 7, Other: 4, STEM: 14, 'Non-STEM': 25, 'High Skilled': 23, 'Not High Skilled': 16,
    };
    const rows3 = [
      ['Female', 'STEM', 2],
      ['Female', 'Non-STEM', 3],
      ['Male', 'STEM', 8],
      ['Male', 'Non-STEM', 7],
      ['STEM', 'High Skilled', 4],
      ['STEM', 'Not High Skilled', 6],
      ['Non-STEM', 'High Skilled', 7],
      ['Non-STEM', 'Not High Skilled', 3],
      ['High Skilled', 'Alligned to Industrial Strategy', 8],
      ['High Skilled', 'Not Alligned to Industrial Strategy', 3],
      ['Not High Skilled', 'Alligned to Industrial Strategy', 3],
      ['Not High Skilled', 'Not Alligned to Industrial Strategy', 6],
    ];
    const options3 = {
      Female: 5, Male: 15, STEM: 10, 'Non-STEM': 10, 'High Skilled': 11, 'Not High Skilled': 9,
    };

    const pieData1 = [
      { name: 'STEM Subjects', value: 36 },
      { name: 'Non-STEM Subjects', value: 6 },
    ];

    const googleData1 = drawSankeyChart(columns1, rows1, options1);
    const googleData2 = drawSankeyChart(columns1, rows2, options2);
    const googleData3 = drawSankeyChart(columns1, rows3, options3);
    const echartsData1 = drawPieChart(pieData1, false, 'pie', false);

    const data1 = [
      {
        job: 'Science', salary: [14.352], male: [16], female: [14],
      },
      {
        job: 'Advanced Science', salary: [25.594], male: [27], female: [23],
      },
      {
        job: 'Physics', salary: [28], male: [30], female: [27],
      },
      {
        job: 'Chemistry', salary: [14.806], male: [15], female: [12],
      },
      {
        job: 'Biology', salary: [29.751], male: [29], female: [27],
      },
      {
        job: 'Maths', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'IT', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'ICT', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Computing', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Further Maths', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Applied ICT', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Design and Technology(Product Design)', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Applied Science', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Computer Science', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Electronics', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Human Biology', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Pure Maths', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Statistics', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Construction and Built Environmnet', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Electrical Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Electronic Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Mechanical Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Manufacturing Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Operations and Maintenance Engineering', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Pharmaceutical Science', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Vechicle Technology', salary: [32.879], male: [37], female: [28],
      },
      {
        job: 'Psychology', salary: [32.879], male: [37], female: [28],
      },
    ];

    const subjectsData = data1.map(data => getPercentRow(data.job, data.salary));

    const genderSubjectsData = data1.map(data => (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{data.job}</p>
          </div>
        </div>
        <div>
          {getPercentRow('Male', data.male)}
          {getPercentRow('Female', data.female)}
        </div>
      </div>
    ));

    const lineData = { name: ['Average STEM', 'National Average', 'University Average'], age: ['First Job', 'Year 1', '5 Years', '10 Years', '10+'], plotted: [/* STEM */[26000, 46000, 65000, 90000, 110000], /* National */[21000, 35000, 50000, 70000, 90000], /* UNI */[18000, 30000, 40000, 60000, 80000]] };
    const lineChartData = drawLineChart(lineData, 'Years', 'Salary');

    const tabbedPanelData = [
      {
        title: 'Stem Destinations of Graduates',
        globalID: 'stem-sankey-1',
        type: 'googlecharts',
        drawData: { ...googleData1 },
      },
      {
        title: 'Ethnicity split of graduates going into soc.1-3 jobs',
        globalID: 'stem-sankey-2',
        type: 'googlecharts',
        drawData: { ...googleData2 },
      },
      {
        title: 'Gender split of graduates going into soc.1-3 jobs',
        globalID: 'stem-sankey-3',
        type: 'googlecharts',
        drawData: { ...googleData3 },
      },
      {
        title: 'STEM vs Non-STEM subjects',
        globalID: 'stem-pie-1',
        type: 'echarts',
        drawData: { options: echartsData1 },
      },
    ];
    const content = (
      <div id="page-content">
        <StandardFilters />
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here.<br /><br />
                This data represents the average salary statistics.<br /><br />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {tabbedPanelData.map(data => (
              <TabbedGraphPanel
                title={data.title}
                globalID={data.globalID}
                content={[
            {
              title: '',
              // preContent: <p>This is the OPTIONAL pre content</p>,
              // postContent: <p>This is the OPTIONAL post content</p>,
              active: true,
              graphData: {
                type: data.type,
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '250px',
                data: data.drawData,
              },
            },
          ]}
                seperator
              />
  ))}

            <TabbedGraphPanel
              title="Average Salary per STEM Subject"
              globalID="stem-line-1"
              content={[
                       {
                         title: '',
                         // preContent: <p>This is the OPTIONAL pre content</p>,
                         // postContent: <p>This is the OPTIONAL post content</p>,
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
                             options: lineChartData,
                           },
                         },
                       },
                     ]}
              seperator
            />


            <TabbedGraphPanel
              title="List of all STEM subjects average salaries"
              globalID="stem-vxy"
              content={[
                {
                  title: 'STEM subjects',
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
                      reactData: subjectsData,
                    },
                  },
                },
                {
                  title: 'Gender Split',
                  active: false,
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
                      reactData: genderSubjectsData,
                    },
                  },
                },
              ]}
              seperator
            />

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
