
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import echarts from 'echarts';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import WorldMap from '../../../../../../content/containers/Fragments/Graphs/section5WorldMap';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import BasicPanel from '../../../../../../content/components/BasicPanel';

import drawWorldMap from '../../../../../../content/scripts/custom/echarts/drawWorldMap';
import worldMapData from '../../../../../../content/containers/Fragments/Graphs/worldMapData';

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
          name: 'Geographical Views',
          link: '/analytics/destinations/1',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getMap() {
    // area chart stuff
    const propsDataOne = [{ name: 'United States of America', value: 60000 }, { name: 'United Kingdom', value: 60000 }, { name: 'Zimbabwe', value: 20 }, { name: 'South Africa', value: 50 }, { name: 'India', value: 8000 }, { name: 'Italy', value: 109550 }, { name: 'Germany', value: 900 }, { name: 'Canada', value: 679 }, { name: 'France', value: 67468 }, { name: 'Spain', value: 674 }, { name: 'China', value: 67468 }, { name: 'Australia', value: 679 }];
    const propsDataTwo = [{ name: 'United States of America', value: 10 }, { name: 'United Kingdom', value: 60000 }, { name: 'India', value: 4000 }, { name: 'Italy', value: 2000 }, { name: 'Germany', value: 3000 }, { name: 'Canada', value: 8000 }, { name: 'France', value: 7000 }, { name: 'Spain', value: 3050 }, { name: 'China', value: 3000 }, { name: 'Australia', value: 6000 }];

    const data1 = propsDataOne.map(element => ({
      code: worldMapData[element.name].code, name: element.name, value: element.value, color: worldMapData[element.name].color,
    }));

    const data2 = propsDataTwo.map(element => ({
      code: worldMapData[element.name].code, name: element.name, value: element.value, color: worldMapData[element.name].color,
    }));

    const options1 = drawWorldMap(data1, 'map', 'People');
    const options2 = drawWorldMap(data2, 'map', 'People');

    // the actual panel stuff
    const panel = (
      <TabbedGraphPanel
        title="Graduate Destinations"
        globalID="geo-1"
        content={[
            {
              title: 'Country of Origin',
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
                  options: options1,
                },
              },
            },
            {
              title: 'Current Country of Residence',
              active: false,
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
          <div className="col-md-10 col-md-push-1">
            <BasicPanel
              content={
                <p>
                  Data from section 5 of the respondent survey is collated here. This data is split into two areas: <br /><br />
                  <strong>Where Graduates Come From</strong> the country of origin a graduate had come from to study.<br />
                  <strong>Alumni Destinations</strong> the country a graduate has moved to since studying.<br /><br />
                  <strong>Remember</strong> to use the filters above to narrow your analytics to specific <strong>year groups, subjects, or other areas</strong>.
                </p>
              }
            />
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
