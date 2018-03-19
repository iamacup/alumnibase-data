import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../../../foundation/redux/globals/DataStoreSingle/actions';

import { redrawCharts } from '../../../../../../content/scripts/custom/echarts/utilities';
import { fireDebouncedResizeEvents } from '../../../../../../content/scripts/custom/utilities';

import StandardFilters from '../../../../../../content/containers/Fragments/Filters/standard';
import Section5Graph from '../../../../../../content/containers/Fragments/Graphs/section5Graph';
import Section5Graph2 from '../../../../../../content/containers/Fragments/Graphs/section5Graph2';
import Section5Graph3 from '../../../../../../content/containers/Fragments/Graphs/section5Graph3';
import Section5Graph4 from '../../../../../../content/containers/Fragments/Graphs/section5Graph4';

import SubNav from './subNav';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Views on Education Impact',
      breadcrumbs: [
        {
          name: 'Analytics',
          link: '/analytics',
        },
        {
          name: 'Views',
          link: '/analytics/views',
        },
        {
          name: 'Views on Education Impact',
          link: '/analytics/views/1',
        },
        {
          name: 'Direct University Impact',
          link: '/analytics/views/1/direct-university-impact',
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
    const content = (
      <div id="page-content">

        <StandardFilters />

        <SubNav
          active="1"
        />

        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel">
              <div className="panel-body" style={{ paddingBottom: '15px' }}>
                Data relating directly to your institution from section 5 of the respondent survey is collated here. For clarity this data is split into two areas: <br /><br />
                <strong>Direct University Impact</strong> are those data points that relate to the university degree and its impact on the respondents life and; <br />
                <strong>Views on Education</strong> explain the broader views of the respondent relating to education that are not directly linked to your institution.
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="I apply the knowledge from my degree(s) to my work often"
              globalID="new-1-1"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="I apply the skills, methods or techniques I learnt from undertaking my degree to my work often"
              globalID="new-1-2"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="I apply the things I learnt from extra-curricular activities to my work often"
              globalID="new-1-3"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph
              title="Overall, all the things I did or learnt have contributed meaningfully to my life today"
              globalID="new-1-4"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <Section5Graph2
              title="How likely are you to recommend your HE provider to a friend or a colleague"
              globalID="new-1-10"
            />
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <div className="panel">

              <div className="panel-heading">
                <div className="panel-control">
                  <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
                </div>
                <h3 className="panel-title">If you were now to choose whether or not to do your course, how likely or unlikely is it that you would…</h3>
              </div>

              <div className="collapse">
                <div className="panel-body" style={{ paddingBottom: '0', paddingTop: '0' }}>


                  <Section5Graph3
                    title="Do a different subject"
                    globalID="new-1-12"
                  />

                  <Section5Graph3
                    title="Study at a different institution"
                    globalID="new-1-13"
                  />

                  <Section5Graph3
                    title="Work towards a different type of qualification"
                    globalID="new-1-14"
                  />

                  <Section5Graph3
                    title="Decide to do something completely different"
                    globalID="new-1-15"
                  />

                </div>
              </div>

            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <div className="panel">

              <div className="panel-heading">
                <div className="panel-control">
                  <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
                </div>
                <h3 className="panel-title">To what extent has your HE experience enabled you to...</h3>
              </div>

              <div className="collapse">
                <div className="panel-body" style={{ paddingBottom: '0', paddingTop: '0' }}>


                  <Section5Graph4
                    title="Be innovative in the workplace"
                    globalID="new-1-16"
                  />

                  <Section5Graph4
                    title="Make a difference in the workplace"
                    globalID="new-1-17"
                  />

                  <Section5Graph4
                    title="Change organisational culture and/or working practices"
                    globalID="new-1-18"
                  />

                  <Section5Graph4
                    title="Influence the work of others in the workplace"
                    globalID="new-1-19"
                  />

                  <Section5Graph4
                    title="Access immediate or short-term job opportunities in your chosen career"
                    globalID="new-1-20"
                  />

                  <Section5Graph4
                    title="Enhance your credibility or standing in the workplace"
                    globalID="new-1-21"
                  />

                  <Section5Graph4
                    title="Progress towards your long term career aspirations"
                    globalID="new-1-22"
                  />

                  <Section5Graph4
                    title="Enhance your social and intellectual capabilities beyond employment"
                    globalID="new-1-23"
                  />

                  <Section5Graph4
                    title="Enhance the quality of your life generally"
                    globalID="new-1-24"
                  />

                </div>
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
