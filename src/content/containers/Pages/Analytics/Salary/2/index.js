import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import UKSalaryMap from '../../../../../../content/containers/Fragments/Graphs/ukSalaryMap';

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

    // this is a hack to make echarts available to the uk map - need to replace this with the expose loader!!!
    window.echarts = echarts;

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
    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                By default, the data shown below is for the <strong>entire survey data set.</strong> Use the filters above to narrow your analytics to specific <strong>year groups, subjects, or other areas</strong>.

                <br /><br />
                Show national average on graphs: <input id="switchery-switch" type="checkbox" />

              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">

            <UKSalaryMap
              title="UK Salary By Region"
              data={{}}
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
