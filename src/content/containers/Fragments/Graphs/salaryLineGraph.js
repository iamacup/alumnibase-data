
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import drawLineChart from '../../../../content/scripts/custom/echarts/drawLineChart';

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
    const data = { age: this.props.data.age, name: this.props.data.name, plotted: [] };
    const bucket1 = [];
    const bucket2 = [];
    const set1 = this.props.data.plotted[0];
    const set2 = this.props.data.plotted[1];

    for (let a = 0; a < set1.length; a++) {
      const total = set1[a] + set2[a];

      bucket1.push(Math.round((set1[a] / total) * 100));
      bucket2.push(Math.round((set2[a] / total) * 100));
    }
    data.plotted.push(bucket1, bucket2);
    // draw out the graphs

    const optionPercentage = drawLineChart(data, this.props.label[0], this.props.label[1]);
    const option = drawLineChart(this.props.data, this.props.label[0], this.props.label[1]);

    renderChartToTarget(this.graphTarget1, optionPercentage);
    renderChartToTarget(this.graphTarget2, option);
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
            <button className="btn btn-default" data-panel="minmax" onClick={() => { this.clickGraph(); }}><i className="far fa-chevron-up" /></button>
          </div>
          <h3 className="panel-title">{this.props.title}</h3>
        </div>


        <div className="collapse in">
          <div className="panel-body">
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
              </div>
              <div className="panel-body" style={{ paddingBottom: '0' }}>

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
                <div className="text-right" style={{ marginTop: '26px' }}>
                  <h5>
                    <small>
                      Salary values when all responses are aggregated
                    </small>
                  </h5>
                </div>
              </div>
              <a href="#" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  label: PropTypes.array.isRequired,
  globalID: PropTypes.string.isRequired,
  reduxAction_doUpdate: PropTypes.func,
};

Graph.defaultProps = {
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);