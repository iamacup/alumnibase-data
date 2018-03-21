import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import UKMap from '../../../../../../content/containers/Fragments/Graphs/section5UkMap';
import { gradsComeFromData, gradsGoToData } from '../../../../../../content/containers/Fragments/Graphs/UKGradData';

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
          link: '/analytics/salary/2',
        },
        {
          name: 'Alumni Destinations',
          link: '/analytics/salary/2/uk',
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

  getImageDataForActiveGraph() {
    let $parent = $('#' + this.state.panel1ID);

    if (!$parent.hasClass('active')) {
      $parent = $('#' + this.state.panel2ID);
    }

    const $canvas = $parent.find('canvas');

    if ($canvas.length === 1) {
      return $canvas[0].toDataURL('image/png');
    }

    console.log('handle error TODO');
    return null;
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

            <UKMap
              title1="Where Grads Come From in the UK"
              data1={gradsComeFromData}
              pieces1={['less than 100', '100-300 grads', '300-500 grads', '500-1000 grads', '1000+']}
              globalID="uk-chart"
              title2="Where Grads Go To in the UK"
              data2={gradsGoToData}
              pieces2={['less than 100', '100-300 grads', '300-500 grads', '500-1000 grads', '1000+']}
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
