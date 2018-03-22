
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';

import CollapsablePanel from '../../../../content/components/CollapsablePanel';
import TabbedPanel from '../../../../content/components/TabbedPanel';
import BasicPanel from '../../../../content/components/BasicPanel';

import TabbedGraphPanel from '../../../../content/components/TabbedGraphPanel';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';
 
class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Tests',
      breadcrumbs: [
        {
          name: 'Tests',
          link: '/tests',
        }],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    const content = (
      <div id="page-content">
        <div className="row" style={{ paddingTop: '50px' }}>
          <div className="col-lg-12">


            <div className="text-center">
              <h3>Description</h3>

              <h5><strong>Panels</strong> - Almost all content should be in a panel of some sort</h5>

              <h3>Generic content panels</h3>
            </div>

            <div className="row">

              <div className="col-sm-6">
                <BasicPanel
                  content={<p>This is a basic panel</p>}
                />
              </div>

              <div className="col-sm-6">
                <BasicPanel
                  content={<p>This is a basic panel with a title</p>}
                  title="This is the title"
                />
              </div>

              <div className="col-sm-6">
                <CollapsablePanel
                  title="Collapsable Panel - Expanded"
                  content={<p>This is the content for the collapsable panel</p>}
                  expanded
                />
              </div>

              <div className="col-sm-6">
                <CollapsablePanel
                  title="Collapsable Panel - Not Expanded"
                  content={<p>This is the content for the collapsable panel</p>}
                  expanded={false}
                />
              </div>

              <div className="col-sm-6">
                <TabbedPanel
                  title="This is a tabbed panel"
                  content={[
                    {
                      title: 'This is tab 1',
                      content: <p>This is tab 1 content - remember, there is an optional callback in case you need to handle clicked buttons (like redrawing the graph content or something)</p>,
                      active: false,
                      clickCallback: () => { console.log('tab 1 is clicked on'); },
                    },
                    {
                      title: <i className="fas fa-thumbtack" />,
                      content: <p>This is tab 2 content - remember you can use icons for the tab titles as well! And remember you can set which tab is active by default!</p>,
                      active: true,
                    },
                    {
                      title: 'This is tab 3',
                      content: <p>This is tab 3 content - you can add as many as you want (or can fit!!!)</p>,
                      active: false,
                    },
                  ]}
                  seperator
                />
              </div>

            </div>

            <div className="text-center">
              <h3>Graph content panels</h3>
            </div>

            <div className="row">

              <div className="col-sm-6">
                <TabbedGraphPanel
                  title="This is a tabbed panel"
                  globalID="globID"
                  content={[
                    {
                      title: 'This is tab 1',
                      content: <p>This is tab 1 content - remember, there is an optional callback in case you need to handle clicked buttons (like redrawing the graph content or something)</p>,
                      active: true,
                      clickCallback: () => { console.log('tab 1 is clicked on'); },
                      type: 'echarts',
                      allowDownload: true,
                      seeData: true,
                      pinGraph: true,
                    },
                  ]}
                  seperator
                />
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
  reduxAction_doUpdate: PropTypes.func,
  location: PropTypes.object.isRequired,
};

Page.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (storeID, data) => dispatch(storeAction.doUpdate(storeID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
