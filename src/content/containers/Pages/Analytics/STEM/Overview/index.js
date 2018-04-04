
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
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
    const pieData1 = [
      { name: 'STEM Subjects', value: 36 },
      { name: 'Non-STEM Subjects', value: 6 },
    ];

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
    const lineChartData = drawLineChart(lineData, 'Years');

    const tabbedPanelData = [
      {
        title: 'STEM vs Non-STEM subjects',
        globalID: 'stem-overview-1',
        type: 'echarts',
        drawData: { options: echartsData1 },
      },
    ];

    const content = (
      <div id="page-content">
        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Overview of STEM Students</h3>
            <hr className="new-section-xs" />
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
              globalID="stem-overview-2"
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

            <h3 className="text-main text-normal text-2x mar-no">STEM Salaries</h3>
            <h5 className="text-muted text-normal">Breakdown of STEM subjects and their associated salary outcomes for students in their <strong>First Job</strong>, with optional Gender Split</h5>
            <hr className="new-section-xs" />

            <TabbedGraphPanel
              title="List of all STEM subjects average salaries"
              globalID="stem-overview-3"
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
