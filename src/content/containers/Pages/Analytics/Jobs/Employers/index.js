
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawGroupedBarChart from '../../../../../../content/scripts/custom/echarts/drawBarChart';
import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';


class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Further Study Overview',
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
          name: 'Overview',
          link: '/analytics/further-study/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  getGroupedBarchart(title, value, direction, globalID, titles, data, label) {
    const obj = {
      direction,
      value,
    };

    let labels = '';
    let topLabel = '';
    if (label) {
      labels = <p>Small and medium-sized enterprises (SMEs) employ fewer than 250 people.<br />SMEs are further subdivided into <strong>Micro enterprises</strong> (fewer than 10 employees).<br /><strong>Small enterprises</strong> (10 to 49 employees).<br /><strong>Medium-sized enterprises</strong> (50 to 249 employees).<br /><strong>Large enterprises</strong> employ 250 or more people.</p>;
    } else {
      topLabel = <p>Percentage of graduates in employment afetr completing a sandwich course.</p>;
    }
    const options = drawGroupedBarChart(titles, data, obj);

    const panel = (<TabbedGraphPanel
      title={title}
      globalID={globalID}
      content={[
            {
              title: '',
              preContent: <p>{topLabel}</p>,
              postContent: <p>{labels}</p>,
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
                  options,
                },
              },
            },
          ]}
      seperator
    />);

    return panel;
  }


  getSankeyGraph() {
    const columns1 = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];

    const rows1 = [
      ['Graduates', 'Public', 100],
      ['Public', 'NHS', 34],
      ['Public', 'Defence', 23],
      ['Public', 'Social Care', 11],
      ['Public', 'Other', 32],
    ];

    const googleData1 = drawSankeyChart(columns1, rows1);

    const data = {
      title: 'Destinations of Graduates Working in the Public Sector',
      globalID: 'stem-destinations-1',
      type: 'googlecharts',
      drawData: { ...googleData1 },
    };

    const panel = (<TabbedGraphPanel
      title={data.title}
      globalID={data.globalID}
      content={[
                  {
                    title: '',
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
    />);
    return panel;
  }


  render() {
    const content = (
      <div id="page-content">

        <StandardFilters />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <h3 className="text-main text-normal text-2x mar-no">Job and Careers Employers Page</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getGroupedBarchart('Graduate Employer Destinations Split by Time After Graduating',
              '',
              'vertical',
              'tuesday-graphs-3',
              ['Micro', 'Small', 'Medium', 'Large'],
              [
                { name: '1 Year', data: [50, 243, 365, 674] },
                { name: '5 Years', data: [85, 156, 500, 356] },
                { name: '10 Years', data: [135, 376, 300, 209] },
              ], true)}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            {this.getGroupedBarchart('Employment rate of graduates after 6 months',
              '',
              'vertical',
              'tuesday-graphs-3',
              ['University Average', 'Sandwich Course'],
              [
                { name: '', data: [65, 85] },
              ])}

          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {this.getSankeyGraph()}
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
