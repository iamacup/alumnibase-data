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

// const htmlVariable = this.getGraphs(jobData.sort((a, b) => b.salary - a.salary));

// const logOut = $('.graph-highest').html(htmlVariable);


$(this.highestButton).click(() => {
  console.log('****Highest Button*****')
  $(this.highestButton).toggle();
  $(this.lowestButton).removeClass('hidden');
  // $('.graph-lowest').html(htmlVariable);
});

$(this.lowestButton).click(() => {
  console.log('*****Lowest Button****')
  $(this.highestButton).toggle();
  $(this.lowestButton).addClass('hidden');
  $('.graph-highest').replaceWith(`<div className="graph-lowest">${this.getGraphs(jobData.sort((a, b) => a.salary - b.salary))}</div>`);
});
          
// $(this.highest).attr('hidden', true);

      //     $(this.highestButton).click(() => {
      //       console.log('**********H')
      //   $(this.lowest).toggle();
      //   // $(this.highest).attr('hidden', false);
      // });

      // $(this.lowestButton).click(() => {
      //             console.log('**********L')
      //   $(this.highest).attr('hidden', true);
      //   $(this.lowest).toggle();
      // });

    });
  }

  getGraphs(jobs) {
 
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

      const filter = (
        <div className="row">
          <h5>Filter Data by:</h5>
          <button type="button" className="btn btn-default" ref={(element) => { this.highestButton = element; }} style={{ marginRight: '10px' }}>Highest to Lowest Salary</button>
          <button type="button" className="btn btn-default hidden" ref={(element) => { this.lowestButton = element; }}>Lowest to Highest Salary</button>
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

  render() {
    // this couldn't be here if buttons were working correcty, jobs would just be this.state.jobs.
    const lowest = jobData.sort((a, b) => a.salary - b.salary);
    const highest = jobData.sort((a, b) => b.salary - a.salary);

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

        <div className="row" ref={(element) => { this.lowest = element; }}>
             <div className="col-md-10 col-md-push-1">
             <div className="graph-lowest">
               {this.getGraphs(lowest)}
             </div>
         {    // <div className="graph-highest hidden">
                      // {this.getGraphs(highest)}
                      // </div>
                    }
             </div>
           </div>
    
  { 
       // <div className="row hidden" id="highest">
 //                <div className="col-md-10 col-md-push-1">
 //                  {getGraphs(highest)}
 //                </div>
 //              </div>
}
  
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
