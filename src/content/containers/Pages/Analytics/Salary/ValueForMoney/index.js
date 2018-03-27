
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawScatterGraph from '../../../../../../content/scripts/custom/echarts/drawScatterGraph';
import drawBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';


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
<<<<<<< HEAD

const barData = {
  titles1: ['Education', 'Anthropology & Development Studies', 'Communication, Cultural and Media Studies, Library and Information Management', 'Politics and International Studies', 'English Language and Literature', 'Business and Management Studies', 'Geography, Environmental Studies and Archaeology', 'General Engineering', 'Area Studies', 'Electrical and Electronic Engineering, Metallurgy and Materials', 'Aeronautical, Mechanical, Chemical and Manufacturing Engineering', 'Mathematical Sciences', 'Physics', 'Earth Systems and Environmental Sciences', 'Biological Sciences', 'Psychology, Psychiatry and Neuroscience', 'Allied Health Professions, Dentistry, Nursing and Pharmacy', 'Clinical Medicine'], 
  titles2: ['Sport and Excercise Sciences, Leisure and Tourism', 'Education', 'Theology and Religious Studies', 'Public Health, Health Services and Primary Care', 'Architecture, Built Environment and Planning', 'Clinical Medicine'],
  data2: [{ data: [0, 4, 8, 97, 99, 100] }],
  data1: [{data: [4, 8, 15, 20, 24, 28, 36, 44, 45, 52, 56, 64, 68, 76, 84, 88, 92, 100]}], 
  options1: {direction: "horizontal", value: ''},
  options2: {direction: "horizontal", value: '', colours2: ['#1c6cab', '#d02224'],},
}

const data = [
  [3.275154, 3.957587],
  [-3.344465, 2.603513],
  [0.355083, -3.376585],
];

const bar1 = drawBarChart(barData.titles1, barData.data1, barData.options1)
const bar2 = drawBarChart(barData.titles2, barData.data2, barData.options2)
const scatterData = drawScatterGraph(data);

const tabData = [
  {title: "Percentage of People who Believe their Course Offered Value for Money", globalID: "VFM-1", options: bar1},
  {title: "Top 3 vs Bottom 3: Percentage of people who believe their course offers value for money", globalID: "VFM-2", options: bar2},
  {title: "Quadrant", globalID: "VFM-3", options: scatterData},
]

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
            {tabData.map(element => (
              <TabbedGraphPanel
                title={element.title}
                globalID={element.globalID}
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
