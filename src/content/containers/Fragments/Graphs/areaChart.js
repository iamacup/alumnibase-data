// eslint-disable jsx-a11y/anchor-is-valid

import React from 'react';
// import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { renderChartToTarget, redrawCharts } from '../../../../content/scripts/custom/echarts/utilities';
import { drawComparisonChart, drawAreaChart } from '../../../../content/scripts/custom/echarts/generators';

import * as storeAction from '../../../../foundation/redux/globals/DataStoreMulti/actions';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      panel1ID: this.props.globalID + '1',
    };
  }

  componentDidMount() {
    console.log(this.props);
    const data = [];

    // this.props.titles.reduce((acc, name, i) => {
    //   acc.name = name;
    //   acc.data = this.props.setdata[i];
    //   data.push(acc);
    // }, {});

    // console.log(data);
    // data={[
    //     { name: 'Full Time Work', data: [11000, 12000, 13000, 14000, 15755, 21625, 23787.5, 26166.25, 28782.875, 31661.1625, 34827.27875, 38310.00662, 42141.00729, 42983.82743, 43843.50398, 44720.37406, 45614.78154, 46527.07717, 47457.61872, 48406.77109, 49374.90651, 50362.40464, 51369.65274, 52397.04579, 53444.98671, 54513.88644, 55604.16417, 56716.24745, 57850.5724, 59007.58385, 60187.73553] },
    //     { name: 'Part Time Work', data: [8000, 19500, 20000, 2100, 2115, 3310, 3476, 3649, 3832, 4138.27785, 4469.340078, 4826.887284, 5213.038267, 5630.081328, 6080.487835, 5472.439051, 4925.195146, 4432.675631, 3989.408068, 3590.467261, 3231.420535, 1615.710268, 807.8551338, 403.9275669, 201.9637835, 100.9818917, 50.49094586, 25.24547293, 12.62273647, 6.311368233, 3.155684117] },
    //     { name: 'Work and Further Study', data: [714.6980944, 693.881645, 673.6715, 654.05, 635, 870, 878.7, 887.487, 896.36187, 905.3254887, 914.3787436, 923.522531, 932.7577563, 942.0853339, 951.5061872, 961.0212491, 932.1906116, 904.2248933, 877.0981465, 850.7852021, 825.261646, 800.5037966, 776.4886827, 753.1940223, 37.65970111, 30, 29, 20, 18, 10, 11] },
    //     { name: 'Further Study', data: [1930, 1930, 1930, 1930, 1930, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 1765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    //     { name: 'Unemployed', data: [930, 930, 930, 930, 930, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450] },
    //     { name: 'Retired', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 110, 121, 133.1, 159.72, 191.664, 229.9968, 275.99616, 358.795008] },
    //     { name: 'Other', data: [169.2705, 241.815, 345.45, 493.5, 705, 1100, 1210, 1331, 1464.1, 1610.51, 1771.561, 1948.7171, 2143.58881, 2165.024698, 2186.674945, 2208.541695, 2230.627111, 2252.933383, 2275.462716, 1820.370173, 1456.296139, 1165.036911, 932.0295286, 745.6236229, 596.4988983, 477.1991187, 381.7592949, 305.4074359, 244.3259488, 195.460759, 156.3686072] },
    //    ]}

    // const options = drawAreaChart(data);

    // renderChartToTarget(this.graphTarget1, options);
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
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body" id={this.state.panel1ID}>
          <div className="pad-all">
            <div
              className="echarts-graph"
              style={{ width: '100%', height: '360px' }}
              ref={(graphTarget1) => { this.graphTarget1 = graphTarget1; }}
            />
          </div>
        </div>
        <a href="" className="hidden" ref={(downloadLink) => { this.downloadLink = downloadLink; }} > Download Holder </a>
      </div>


    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
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
