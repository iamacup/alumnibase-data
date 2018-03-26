import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import BarChart from '../../../../../../content/containers/Fragments/Graphs/groupedBarChart';
// import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';


class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showNationalAverage: false,
    };
  }

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

  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
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

            <BarChart
              smallText=""
              title="Percentage of People who Believe their Course Offered Value for Money"
              value=""
              titles={['Education', 'Anthropology & Development Studies', 'Communication, Cultural and Media Studies, Library and Information Management', 'Politics and International Studies', 'English Language and Literature', 'Business and Management Studies', 'Geography, Environmental Studies and Archaeology', 'General Engineering', 'Area Studies', 'Electrical and Electronic Engineering, Metallurgy and Materials', 'Aeronautical, Mechanical, Chemical and Manufacturing Engineering', 'Mathematical Sciences', 'Physics', 'Earth Systems and Environmental Sciences', 'Biological Sciences', 'Psychology, Psychiatry and Neuroscience', 'Allied Health Professions, Dentistry, Nursing and Pharmacy', 'Clinical Medicine']}
              direction="horizontal"
              data={[{ data: [4, 8, 15, 20, 24, 28, 36, 44, 45, 52, 56, 64, 68, 76, 84, 88, 92, 100] }]}
              globalID="VFM-1"
            />

            <BarChart
              smallText=""
              title="Top 3 vs Bottom 3: Percentage of people who believe their course offers value for money"
              value=""
              titles={['Sport and Excercise Sciences, Leisure and Tourism', 'Education', 'Theology and Religious Studies', 'Public Health, Health Services and Primary Care', 'Architecture, Built Environment and Planning', 'Clinical Medicine']}
              direction="horizontal"
              data={[{ data: [0, 4, 8, 97, 99, 100], colours: ['#1c6cab', '#d02224'] }]}
              globalID="VFM-1"
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
