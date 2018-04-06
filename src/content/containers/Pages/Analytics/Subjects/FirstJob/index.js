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
        name: 'Medicine & dentistry and veterinary science', salary: [1], male: [1], female: [1],
      },
       {
        name: 'Subjects allied to medicine', salary: [6], male: [2], female: [7],
      },  {
        name: 'Biological sciences', salary: [12], male: [11], female: [13],
      },  {
        name: 'Veterinary Science', salary: [1], male: [1], female: [1],
      },{
        name: 'Agriculture & related subjects', salary: [1], male: [1], female: [1],
      },  {
        name: 'Physical sciences', salary: [7], male: [10], female: [4],
      },  {
        name: 'Mathematical sciences', salary: [3], male: [5], female: [1],
      },  {
        name: 'Computer sciences', salary: [7], male: [13], female: [2],
      },  {
        name: 'Engineering & technology', salary: [8], male: [14], female: [2],
      },  {
        name: 'Architecture, building, and planning', salary: [3], male: [3], female: [2],
      },  {
        name: 'Social studies', salary: [12], male: [11], female: [14],
      },  {
        name: 'Law', salary: [3], male: [3], female: [4],
      },  {
        name: 'Business & administrative studies', salary: [13], male: [16], female: [12],
      },{
        name: 'Mass communications & documentation', salary: [4], male: [4], female: [4],
      },{
        name: 'Languages', salary: [7], male: [5], female: [9],
      },{
        name: 'Historical & philosophical studies', salary: [5], male: [6], female: [5],
      },{
        name: 'Creative arts & design', salary: [3], male: [12], female: [15],
      },{
        name: 'Education', salary: [3], male: [1], female: [4],
      },{
        name: 'Combined Sujects', salary: [1], male: [1], female: [1],
      }
    ]

    const react1 = data.map(element => getPercentRow(element.name, element.salary, true, true));

    const react2 = data.map(element => (
      <div key={element.name}>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{element.name}</p>
          </div>
        </div>
        {getPercentRow('Male', element.male, true, true)}
        {getPercentRow('Female', element.female, true, true)}
      </div>
    ));

    const panel = (
      <TabbedGraphPanel
        title="High level subject salaries"
        globalID="subject-first-job-1"
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
            <h3 className="text-main text-normal text-2x mar-no">First Job</h3>
            <h5 className="text-muted text-normal">Below we explore the average time it takes to get a first job based on the subject studied, optionally split by gender.</h5>
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
