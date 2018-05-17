import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import getPercentRow from '../../../../../../content/scripts/custom/echarts/drawSalaryRow';
import TabbedGraphPanel from '../../../../../../content/components/TabbedGraphPanel';
import { highest, lowest } from './data';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = ({
      jobs: highest,
    });
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

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');

      $(this.highest).click(() => {
        this.setState({
          jobs: highest,
        });
        $(this.highest).addClass('hidden');
        $(this.lowest).toggle();
      });

      $(this.lowest).click(() => {
        this.setState({
          jobs: lowest,
        });
        $(this.highest).removeClass('hidden');
        $(this.lowest).toggle();
      });
    });
  }

  getGraphs() {
    const { jobs } = this.state;

    const react1 = jobs.map(element => getPercentRow(element.name, element.salary, true, true));

    const react2 = jobs.map(element => (
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

    const filters = (
      <div className="row text-right">
        <button type="button" className="btn btn-default hidden" ref={(element) => { this.highest = element; }} style={{ marginRight: '10px' }}>See Highest to Lowest</button>
        <button type="button" className="btn btn-default" ref={(element) => { this.lowest = element; }}>See Lowest to Highest</button>
        <br />
        <br />
      </div>
    );

    const panel = (
      <TabbedGraphPanel
        title="High level time taken for employment by subject"
        globalID="subject-first-job-1"
        content={[
          {
            title: 'Average Salary',
            active: true,
            preContent: filters,
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
