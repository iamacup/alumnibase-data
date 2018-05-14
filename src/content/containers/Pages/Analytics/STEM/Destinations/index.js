
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import drawSankeyChart from '../../../../../../content/scripts/custom/googlecharts/sankey';

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
    const columns1 = [['string', 'From'], ['string', 'To'], ['number', 'Weight']];

    const options1 = {
      STEM: 10, 'Non-STEM': 20, 'High Skilled': 19, 'Not High Skilled': 11,
    };

    const rows1 = [
      ['STEM', 'High Skilled', 8.5],
      ['STEM', 'Not High Skilled', 1.5],
      ['Non-STEM', 'High Skilled', 13],
      ['Non-STEM', 'Not High Skilled', 7],

      ['High Skilled', 'Alligned to Industrial Strategy', 11.5],
      ['High Skilled', 'Not Alligned to Industrial Strategy', 10],

      ['Not High Skilled', 'Not Alligned to Industrial Strategy', 5.5],
      ['Not High Skilled', 'Alligned to Industrial Strategy', 3],
    ];

    const rows2 = [
      ['White', 'Non-STEM', 9],
      ['White', 'STEM', 7],
      ['Mixed', 'Non-STEM', 3],
      ['Mixed', 'STEM', 1],
      ['Asian', 'Non-STEM', 5],
      ['Asian', 'STEM', 3],
      ['Black / African / Caribbean', 'Non-STEM', 5],
      ['Black / African / Caribbean', 'STEM', 2],
      ['Other', 'Non-STEM', 3],
      ['Other', 'STEM', 1],
      ['STEM', 'High Skilled', 12],
      ['STEM', 'Not High Skilled', 2],
      ['Non-STEM', 'High Skilled', 15],
      ['Non-STEM', 'Not High Skilled', 10],
      ['High Skilled', 'Alligned to Industrial Strategy', 17],
      ['High Skilled', 'Not Alligned to Industrial Strategy', 10],
      ['Not High Skilled', 'Not Alligned to Industrial Strategy', 6],
      ['Not High Skilled', 'Alligned to Industrial Strategy', 6],
    ];

    const options2 = {
      White: 16, Mixed: 4, Asian: 8, 'Black / African / Caribbean': 7, Other: 4, STEM: 14, 'Non-STEM': 25, 'High Skilled': 23, 'Not High Skilled': 16,
    };

    const rows3 = [
      ['Female', 'STEM', 2],
      ['Female', 'Non-STEM', 3],
      ['Male', 'STEM', 8],
      ['Male', 'Non-STEM', 7],

      ['STEM', 'High Skilled', 7],
      ['STEM', 'Not High Skilled', 3],
      ['Non-STEM', 'High Skilled', 7],
      ['Non-STEM', 'Not High Skilled', 3],

      ['High Skilled', 'Alligned to Industrial Strategy', 9],
      ['High Skilled', 'Not Alligned to Industrial Strategy', 5],
      ['Not High Skilled', 'Alligned to Industrial Strategy', 2],
      ['Not High Skilled', 'Not Alligned to Industrial Strategy', 4],
    ];

    const options3 = {
      Female: 5, Male: 15, STEM: 10, 'Non-STEM': 10, 'High Skilled': 11, 'Not High Skilled': 9,
    };

    const googleData1 = drawSankeyChart(columns1, rows1, options1);
    const googleData2 = drawSankeyChart(columns1, rows2, options2);
    const googleData3 = drawSankeyChart(columns1, rows3, options3);

    const tabbedPanelData = [
      {
        title: 'Stem Destinations of Graduates',
        globalID: 'stem-destinations-1',
        type: 'googlecharts',
        drawData: { ...googleData1 },
      },
      {
        title: 'Ethnicity split of graduates going into soc.1-3 jobs',
        globalID: 'stem-destinations-2',
        type: 'googlecharts',
        drawData: { ...googleData2 },
      },
      {
        title: 'Gender split of graduates going into soc.1-3 jobs',
        globalID: 'stem-destinations-3',
        type: 'googlecharts',
        drawData: { ...googleData3 },
      },
    ];

    const content = (
      <div id="page-content">
        <StandardFilters />

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">STEM Destinations</h3>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            {tabbedPanelData.map(data => (
              <TabbedGraphPanel
                title={data.title}
                globalID={data.globalID}
                key={data.globalID}
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
