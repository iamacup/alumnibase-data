
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Page Pending',
      breadcrumbs: [
      ],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  render() {
    const content = (
      <div id="page-content">
        <div className="row">
          <div className="col-lg-12">

            <div className="panel">
              <div className="panel-body">
                <div className="pad-all text-center">
                  <h3>This page is still under Construction</h3>

                  <div style={{ marginTop: '48px' }} />

                  <div className="row">
                    <div className="col-sm-6 col-sm-push-3">
                      <div className="panel widget">
                        <div className="widget-header bg-warning text-center">
                          {/* <h4 className="text-light mar-no pad-top"></h4> */}
                        </div>
                        <div className="widget-body bg-on-white">
                          <div className="widget-img img-circle img-border-light bg-on-white">
                            <i className="fas fa-cogs fa-3x" style={{ marginTop: '12px' }} />
                          </div>

                          <div className="list-group bg-trans mar-no text-center">

                            <h4>We are currently still working on this page,</h4>
                            <h4>It will be up and running soon.</h4>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

