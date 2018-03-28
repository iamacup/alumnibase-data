
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import drawUKMap from '../../../../../../content/scripts/custom/echarts/drawUkMap';
import { gradsComeFromData, gradsGoToData } from './UKGradData';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';

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
          name: 'Graduate Salaries',
          link: '/analytics/salary/2',
        },
        {
          name: 'Alumni Destinations',
          link: '/analytics/destinations/2',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getMap() {
    const pieces1 = ['less than 100', '100-300 grads', '300-500 grads', '500-1000 grads', '1000+'].map((element, i) => ({ max: i + 0.1, label: element, min: i }));
    const pieces2 = ['less than 100', '100-300 grads', '300-500 grads', '500-1000 grads', '1000+'].map((element, i) => ({ max: i + 0.1, label: element, min: i }));

    const options1 = drawUKMap(gradsComeFromData, pieces1);
    const options2 = drawUKMap(gradsGoToData, pieces2);

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Graduate Destinations"
        globalID="geo-2"
        content={[
            {
              title: 'County of Origin',
              active: true,
              preContent: <p>Use the mouse wheel to scroll, click and drag to move the map. You can also filter the results by clicking on them in the legend.</p>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '650px',
                data: {
                  options: options1,
                },
              },
            },
            {
              title: 'County of Residence',
              active: false,
              preContent: <p>Use the mouse wheel to scroll, click and drag to move the map. You can also filter the results by clicking on them in the legend.</p>,
              graphData: {
                type: 'echarts',
                tools: {
                  allowDownload: true,
                  seeData: false,
                  pinGraph: true,
                },
                width: '100%',
                height: '650px',
                data: {
                  options: options2,
                },
              },
            },
          ]}
        seperator
      />
    );

    return panel;
  }

  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Breakdown of Alumni by location</h3>
            <h5 className="text-muted text-normal">Both past and present - this only includes alumni that were born in the uk, or are currently in the UK respectively.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getMap()}
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
