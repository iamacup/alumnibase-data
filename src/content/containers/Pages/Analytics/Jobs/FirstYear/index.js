import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getSalaryRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';

import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import jobData from './jobData';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      jobs: jobData,
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
          name: 'Salary Overview',
          link: '/analytics/salary/overview',
        }],
    });

    // $(() => {
    // need to re-initialise the framework here when pages change
    // $(document).trigger('nifty.ready');

    // functions change the state correctly but aren't showing change on screen
    // $(this.lowest).on('click', () => {
    //   this.setState({
    //     jobs: jobData.sort((a, b) => a.salary - b.salary),
    //   });
    // });

    // $(this.highest).on('click', () => {
    //   this.setState({
    //     jobs: jobData.sort((a, b) => b.salary - a.salary),
    //   });
    // });

    // });
  }

  render() {
    // this couldn't be here if buttons were working correcty, jobs would just be this.state.jobs.
    const jobs = this.state.jobs.sort((a, b) => a.salary - b.salary);

    const react1 = jobs.map(element => getSalaryRow(element.job, element.salary));

    const react2 = jobs.map(element => (
      <div key={element.job}>
        <div className="row">
          <div className="col-md-4 col-md-push-2">
            <p>{element.job}</p>
          </div>
        </div>
        <div>
          {getSalaryRow('Male', element.male)}
          {getSalaryRow('Female', element.female)}
        </div>
      </div>
    ));

    const getGraphs = () => {
      const filter = (
        <div className="row">
          <h5>Filter Data by:</h5>
          <button type="button" className="btn btn-default" ref={(element) => { this.highest = element; }} style={{ marginRight: '10px' }}>Highest to Lowest Salary</button>
          <button type="button" className="btn btn-default" ref={(element) => { this.lowest = element; }}>Lowest to Highest Salary</button>
          <br />
          <br />
        </div>
      );

      const panel = (
        <TabbedGraphPanel
          title="High level job salaries"
          globalID="jobs-first-year-1"
          content={[
          {
            title: 'Average Salary',
            active: true,
            preContent: filter,
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
    };

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
            {getGraphs()}
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
