
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../../../content/containers/Fragments/Template/wrapper';
import * as storeAction from '../../../../foundation/redux/globals/DataStoreSingle/actions';

import BasicPanel from '../../../../content/components/BasicPanel';

class Page extends React.PureComponent {
  componentDidMount() {
    this.props.reduxAction_doUpdate('pageData', {
      pageTitle: 'Analytics',
      breadcrumbs: [
      ],
    });

    $(() => {
      // need to re-initialise the framework here when pages change
      $(document).trigger('nifty.ready');
    });
  }

  pageContent() {
    const content = (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">General Analytics</h3>
            <h5 className="text-muted text-normal">General Analytics for your university to tackle the difficult challenges of modern day reporting and improvement.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            <div className="row">
              <div className="col-sm-4">
                <div className="panel panel-success panel-colorful">
                  <div className="pad-all media">
                    <div className="media-left">
                      <i className="text-3x fas fa-money-bill-alt" />
                    </div>
                    <div className="media-body text-center">
                      <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Salary Data</strong></p>
                    </div>
                  </div>
                  <div className="progress progress-xs progress-success mar-no" />
                  <div className="pad-all text-sm text-center">
                    Explore salary for different metrics<br /><br />
                    <a href="" className="btn btn-primary btn-block">Overview</a>
                    <a href="" className="btn btn-primary btn-block">Ranges</a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );

    return content;
  }

  render() {
    const content = (
      <div id="page-content">
        <div className="row">
          <div className="col-sm-10 col-sm-push-1">

            <BasicPanel
              content={this.pageContent()}
            />

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

