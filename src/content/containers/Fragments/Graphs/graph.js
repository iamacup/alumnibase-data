
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { drawComparisonChart } from '../../../../content/scripts/custom/echarts/generators';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
      panel2ID: this.props.globalID + '2',
    };
  }

  componentDidMount() {
    const option1 = drawComparisonChart(this.props.titles, this.props.set1Name, this.props.set2Name, this.props.set1, this.props.set2, true);

    renderChartToTarget(this.graphTarget1, option1);

    const option2 = drawComparisonChart(this.props.titles, this.props.set1Name, this.props.set2Name, this.props.set1, this.props.set2, false);

    renderChartToTarget(this.graphTarget2, option2);
  }

  getImageDataForActiveGraph() {
    let $parent = $('#' + this.state.panel1ID);

    if (!$parent.hasClass('active')) {
      $parent = $('#' + this.state.panel2ID);
    }

    const $canvas = $parent.find('canvas');

    if ($canvas.length === 1) {
      return $canvas[0].toDataURL('image/png');
    }

    console.log('handle error TODO');
    return null;
  }

  clickGraph() {
    setTimeout(() => { redrawCharts(); }, 200);
  }

  download(e) {
    e.preventDefault();

    const image = this.getImageDataForActiveGraph().replace('image/png', 'image/octet-stream');

    const cleanTitle = this.props.title.replace(/\W+/g, '_');

    this.downloadLink.setAttribute('download', cleanTitle + '.png');
    this.downloadLink.setAttribute('href', image);
    this.downloadLink.click();
  }

  pin(e) {
    e.preventDefault();

    this.props.reduxAction_doUpdate('pins', this.props.globalID, {
      title: this.props.title,
      imageData: this.getImageDataForActiveGraph(),
    });
  }

  render() {
    return (
      <div className="panel">

        <div className="panel-heading">
          <div className="panel-control">

            <ul className="nav nav-tabs">
              <li className="active">
                <a data-toggle="tab" href={'#' + this.state.panel1ID} onClick={() => { this.clickGraph(); }}>
                  <i className="far fa-percent" />
                </a>
              </li>
              <li>
                <a data-toggle="tab" href={'#' + this.state.panel2ID} onClick={() => { this.clickGraph(); }}>
                  <i className="far fa-hashtag" />
                </a>
              </li>
            </ul>
            <div className="btn-group dropdown">
              <button data-toggle="dropdown" className="dropdown-toggle btn btn-default btn-active-primary">
                <i className="caret" />
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a href="#" onClick={(e) => { this.download(e); }} ><i className="far fa-download" /> Download Image</a></li>
                <li><a href="#"><i className="far fa-table" /> See Underlying Data</a></li>
                <li><a href="#" onClick={(e) => { this.pin(e); }}><i className="fas fa-thumbtack" /> Pin Graph</a></li>
              </ul>
            </div>
          </div>
          <h3 className="panel-title"><strong>{this.props.title}</strong></h3>
        </div>

        <hr style={{ margin: 0 }} />

        <div className="panel-body">


          <div className="tab-content">
            <div id={this.state.panel1ID} className="tab-pane fade in active">
              <div className="pad-all">
                <div
                  className="echarts-graph"
                  style={{ width: '100%', height: '360px' }}
                  ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
                />
              </div>
            </div>
            <div id={this.state.panel2ID} className="tab-pane fade">
              <div className="pad-all">
                <div
                  className="echarts-graph"
                  style={{ width: '100%', height: '360px' }}
                  ref={(graphTarget2) => { this.graphTarget2 = graphTarget2; }}
                />
              </div>
            </div>
          </div>

          {this.props.postContent}
        </div>

        <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
      </div>
    );
  }
}

Graph.propTypes = {
  titles: PropTypes.array.isRequired,
  set1: PropTypes.array.isRequired,
  set2: PropTypes.array.isRequired,
  set1Name: PropTypes.string.isRequired,
  set2Name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
  postContent: PropTypes.any,
};

Graph.defaultProps = {
  reduxAction_doUpdate: () => {},
  postContent: null,
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

