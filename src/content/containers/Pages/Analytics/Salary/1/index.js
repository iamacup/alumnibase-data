import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import Boxplot from '../../../../../../content/containers/Fragments/Graphs/simpleBoxplot';

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
          name: 'Graduate Salaries',
          link: '/analytics/salary/1',
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

      // make the checkbox look nice with switchery
      const elem = document.querySelector('#switchery-switch');
      // eslint-disable-next-line no-undef

      elem.onchange = () => {
        this.clickShowNationalAverage();
      };
    });
  }

  clickShowNationalAverage() {
    this.setState({ showNationalAverage: !this.state.showNationalAverage });
  }

  render() {
    const genderData = {
      categories: ['Female', 'Male'],
      values: [
        [20000, 30000],
        [30000, 40000],
      ],
    };

    const ethnicityData = {
      categories: ['White', 'Mixed', 'Asian', 'Black / African / Caribbean', 'Other'],
      values: [
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
      ],
    };

    const religionData = {
      categories: ['No Religion', 'Chrstian', 'Buddhist', 'Hindu', 'Jewish', 'Muslim', 'Sikh', 'Other'],
      values: [
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
        [20000, 30000],
        [30000, 40000],
        [20000, 30000],
      ],
    };

    if (this.state.showNationalAverage === true) {
      const nationalAverageSalaryData = [10000, 20000];

      genderData.categories.push('National Average');
      genderData.values.push(nationalAverageSalaryData);

      ethnicityData.categories.push('National Average');
      ethnicityData.values.push(nationalAverageSalaryData);

      religionData.categories.push('National Average');
      religionData.values.push(nationalAverageSalaryData);
    }

    const content = (
      <div id="page-content">

        <StandardFilters />

     <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data from section 5 of the respondent survey is collated here.<br /><br />
                This data displays the average pay gaps between <strong>gender, ethnicity and religion</strong>.<br /><br />
              <strong>Remember</strong> to use the filters above to narrow your analytics to specific <strong>year groups, subjects, or other areas</strong>.
                Show national average on graphs: <input id="switchery-switch" type="checkbox" />
              </div>
            </div>
          </div>
        </div>

     <div className="row">
          <div className="col-md-8 col-md-push-2">

        <div className="row">
            <Boxplot
              data={genderData}
              title="Average pay, split by gender"
            />
          </div>


        <div className="row">
            <Boxplot
              data={ethnicityData}
              title="Average pay, split by ethnicity"
            />
        </div>

        <div className="row">
            <Boxplot
              data={religionData}
              title="Average pay, split by religion"
            />
          </div>


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
