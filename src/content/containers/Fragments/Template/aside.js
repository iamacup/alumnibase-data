
/* eslint-disable jsx-a11y/anchor-is-valid */


import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fireDebouncedResizeEvents } from '../../../../content/scripts/custom/utilities';

class Page extends React.PureComponent {
  getPins() {
    const arr = Object.keys(this.props.reduxState_pins);
    const resultArr = [];

    arr.forEach((value) => {
      const graphData = this.props.reduxState_pins[value];

      const res = (
        <div key={value} className="pad-all">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-control">
                <button className="btn btn-default" data-panel="dismiss"><i className="fas fa-trash" /></button>
              </div>
              <h3 className="panel-title">{graphData.title}</h3>
            </div>
            <div className="panel-body">
              <img className="img-responsive center-block" src={graphData.imageData} alt="graph" />
            </div>
          </div>
        </div>
      );

      resultArr.push(res);
    });

    if (resultArr.length === 0) {
      const res = (
        <div className="pad-hor">
            You don't currently have any pinned items.
        </div>
      );

      return res;
    }

    return resultArr;
  }

  render() {
    const pins = this.getPins();

    return (
      <aside id="aside-container" className="hidden-xs">
        <div id="aside">
          <div className="nano">
            <div className="nano-content">

              {/*  <!--Nav tabs--> */}
              {/*  <!--================================--> */}
              <ul className="nav nav-tabs nav-justified">
                <li className="active">
                  <a href="#demo-asd-tab-1" data-toggle="tab">
                    <i className="fas fa-thumbtack" /> Pinned Items
                  </a>
                </li>
                {/* <li>
                    <a href="#demo-asd-tab-3" data-toggle="tab">
                      <i className="far fa-cog" /> Settings
                    </a>
                  </li> */}
              </ul>
              {/*  <!--================================--> */}
              {/*  <!--End nav tabs--> */}


              {/*  <!-- Tabs Content --> */}
              {/*  <!--================================--> */}
              <div className="tab-content">

                {/*  <!--First tab--> */}
                {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                <div className="tab-pane fade in active" id="demo-asd-tab-1">
                  <p className="pad-all text-lg">Your Pins</p>
                  {pins}
                </div>
                {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                {/*  <!--End first tab--> */}


                {/*  <!--Third tab--> */}
                {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}
                {/* <div className="tab-pane fade" id="demo-asd-tab-3">
                    <p className="pad-all text-lg">Your Settings</p>
                    <div className="pad-hor">
                      Here you can edit the settings for your pinned items.
                    </div>
                  </div> */}
                {/*  <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--> */}

              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

Page.propTypes = {
  reduxState_pins: PropTypes.object,
};

Page.defaultProps = {
  reduxState_pins: {},
};

const mapStateToProps = state => ({
  reduxState_pins: state.dataStoreMulti.pins,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
