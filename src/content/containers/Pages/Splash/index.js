
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

            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-money-bill-alt" />
                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Salary Data</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              {/*  <!--Panel body--> */}
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/salary/Overview" className="btn btn-mint" style={{ marginRight: '8px' }}>Overview</a>
                  <a href="/analytics/salary/ranges" className="btn btn-mint">Ranges</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">
                  <div className="media-left">
                    <i className="text-3x fas fa-user-md" />
                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Jobs and Careers</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/jobs/overview" className="btn btn-mint" style={{ marginRight: '8px' }}>Overview</a>
                  <a href="/analytics/jobs/employers" className="btn btn-mint" style={{ marginRight: '8px' }}>Employers</a>
                  <a href="/analytics/jobs/first-year" className="btn btn-mint" style={{ marginRight: '8px' }}>First Year Salary</a>
                  <a href="/analytics/jobs/first-job" className="btn btn-mint">Time to First Job</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-pen-square" />
                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Subjects</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/subjects/vfm" className="btn btn-mint" style={{ marginRight: '8px' }}>Value For Money</a>
                  <a href="/analytics/subjects/3" className="btn btn-mint" style={{ marginRight: '8px' }}>Longterm Outcomes</a>
                  <a href="/analytics/subjects/first-year" className="btn btn-mint" style={{ marginRight: '8px' }}>First Year Salary</a>
                  <a href="/analytics/subjects/first-job" className="btn btn-mint">Time to First Job</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-chart-line" />
                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>STEM</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/stem/overview" className="btn btn-mint" style={{ marginRight: '8px' }}>Overview</a>
                  <a href="/analytics/stem/destinations" className="btn btn-mint">Destinations and Outcomes</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-address-book" />
                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>POLAR</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/polar" className="btn btn-mint">Overview</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}


            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-chevron-double-up" />
                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Further Study</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/further-study/overview" className="btn btn-mint">Overview</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}
            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-eye" />

                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Respondant Views</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/views/1" className="btn btn-mint" style={{ marginRight: '8px' }}>Views on Education Impact</a>
                  <a href="/analytics/views/2" className="btn btn-mint">Views on Overall Happiness</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}


            {/*  <!--===================================================--> */}
            <div className="panel panel-success panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x fas fa-map" />

                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Geographic Data</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/destination/1" className="btn btn-mint" style={{ marginRight: '8px' }}>Global</a>
                  <a href="/analytics/destination/2" className="btn btn-mint">Local</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h3 className="text-main text-normal text-2x mar-no">Regulatory Outputs</h3>
            <h5 className="text-muted text-normal">General Analytics for your university to tackle the difficult challenges of modern day reporting and improvement.</h5>
            <hr className="new-section-xs" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-push-2">

            {/*  <!--===================================================--> */}
            <div className="panel panel-purple panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x far fa-adjust" />


                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>DLHE-Like</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/dlhe-like/2-3" className="btn btn-pink" style={{ marginRight: '8px' }}>Graduates and What they are Doing</a>
                  <a href="/analytics/dlhe-like/4" className="btn btn-pink" style={{ marginRight: '8px' }}>Full Time Graduate Destinations</a>
                  <a href="/analytics/dlhe-like/5" className="btn btn-pink" style={{ marginRight: '8px' }}>Destination, Employment and Earnings</a>
                  <a href="/analytics/dlhe-like/6" className="btn btn-pink" style={{ marginRight: '8px' }}>Employment Outcomes</a>
                  <a href="/analytics/dlhe-like/7" className="btn btn-pink" style={{ marginRight: '8px' }}>UK Domicilied Graduates</a>
                  <a href="/analytics/dlhe-like/8" className="btn btn-pink" style={{ marginRight: '8px' }}>Graduates in Employment</a>
                  <a href="/analytics/dlhe-like/9" className="btn btn-pink" style={{ marginRight: '8px' }}>Geographical Destinations of Employment</a>
                  <a href="/analytics/dlhe-like/11" className="btn btn-pink">First Time Graduates in Full Time Work</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

            {/*  <!--===================================================--> */}
            <div className="panel panel-purple panel-colorful">
              <div className="panel-heading">
                <div className="pad-all media">

                  <div className="media-left">
                    <i className="text-3x far fa-adjust" />


                  </div>
                  <div className="media-body text-left">
                    <p style={{ fontSize: '16px', marginTop: '8px' }}><strong>Widening Participation</strong></p>
                  </div>
                  <div className="media-body text-right">
                    <p>Explore salary for different metrics</p>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-control">
                  <a href="/analytics/widening-participation/bme-economic-achievement" className="btn btn-pink" style={{ marginRight: '8px' }}>BME Economic Achievement</a>
                  <a href="/analytics/widening-participation/improving-technical-pathways" className="btn btn-pink">Improving Technical Pathways of BME and POLAR3</a>
                </div>
              </div>
            </div>
            {/* <!--===================================================--> */}

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

