import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';

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
          name: 'Salary Overview',
          link: '/analytics/salary/overview',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

    });
  }

  getGraphs() {
    const data = [
      {
        name: 'Medicine & dentistry and veterinary science', salary: [38], male: [38], female: [37.5],
      },
      {
        name: 'Subjects allied to medicine', salary: [27], male: [27], female: [28],
      }, {
        name: 'Biological sciences', salary: [23], male: [23], female: [23.5],
      }, {
        name: 'Veterinary Science', salary: [33], male: [33], female: [32],
      }, {
        name: 'Agriculture & related subjects', salary: [19], male: [20], female: [19],
      }, {
        name: 'Physical sciences', salary: [23], male: [22], female: [23],
      }, {
        name: 'Mathematical sciences', salary: [26], male: [26], female: [26.5],
      }, {
        name: 'Computer sciences', salary: [25], male: [26], female: [25],
      }, {
        name: 'Engineering & technology', salary: [28], male: [29], female: [28],
      }, {
        name: 'Architecture, building, and planning', salary: [26], male: [26], female: [25],
      }, {
        name: 'Social studies', salary: [22], male: [22], female: [22],
      }, {
        name: 'Law', salary: [23], male: [25], female: [23],
      }, {
        name: 'Business & administrative studies', salary: [24], male: [25], female: [24],
      }, {
        name: 'Mass communications & documentation', salary: [20], male: [20], female: [20],
      }, {
        name: 'Languages', salary: [24], male: [24], female: [25],
      }, {
        name: 'Historical & philosophical studies', salary: [21], male: [21], female: [21],
      }, {
        name: 'Creative arts & design', salary: [18], male: [18], female: [18],
      }, {
        name: 'Education', salary: [22], male: [22], female: [21.5],
      }, {
        name: 'Combined Sujects', salary: [20], male: [20], female: [20],
      },
    ];

    const react1 = data.map(element => getPercentRow(element.name, element.salary));

    const react2 = data.map(element => (
      <div key={element.name}>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{element.name}</p>
          </div>
        </div>
        {getPercentRow('Male', element.male)}
        {getPercentRow('Female', element.female)}
      </div>
    ));

    const panel = (
      <TabbedGraphPanel
        title="High level subject salaries"
        globalID="subjects-first-year-1"
        content={[
          {
            title: 'Average Salary',
            active: true,
            graphData: {
              type: 'react',
              width: '100%',
              height: '100%',
              tools: {
                allowDownload: false,
                seeData: false,
                pinGraph: false,
              },
              data: {
                reactData: react1,
              },
            },
          },
          {
            title: 'Gender Split',
            active: false,
            graphData: {
              type: 'react',
              width: '100%',
              height: '100%',
              tools: {
                allowDownload: false,
                seeData: false,
                pinGraph: false,
              },
              data: {
                reactData: react2,
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
            <h3 className="text-main text-normal text-2x mar-no">First Year Salary</h3>
            <h5 className="text-muted text-normal">Below we explore the average salary for all respondants within their first year of graduation, optionally split by gender.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {this.getGraphs()}
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
