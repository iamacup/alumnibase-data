import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawSankey from '../../../../../../content/scripts/custom/googlecharts/sankey';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Requirements 106 to 109 - Further Study Details',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Further Study',
          link: '/analytics/further-study',
        },
        {
          name: 'RQ 106-109 - Further Study Details',
          link: '/analytics/further-study/106-109',
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
    const googleData = drawSankey(columns1, rows1, options1);
    const content = (
      <div id="page-content">

        <StandardFilters />


        <div className="row">
          <div className="col-md-6">
            <TabbedGraphPanel
              title="Further Study Among Durham Graduates"
              globalID="RQ-105-pie-1"
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
                data: { ...googleData },
              },
            },
          ]}
              seperator
            />

          </div>
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./2.png')} />
              </div>

            </div>

          </div>

        </div>

        <div className="row">
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./3.png')} />
              </div>
            </div>

          </div>
          <div className="col-md-6">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./4.png')} />
              </div>

            </div>

          </div>

        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title"> - </h3>
              </div>
              <div className="pad-all">
                <img alt="Graph" className="img-responsive center-block" src={require('./5.png')} />
              </div>
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
