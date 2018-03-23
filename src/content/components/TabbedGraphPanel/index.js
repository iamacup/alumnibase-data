
/* eslint-disable react/no-array-index-key */

/*
  takes an array that will be displayed as tabs if there is more than 1 element, no tabs if only 1, with structure:

  {
    title: String OR react element (icon) - of the tab title, it will be ignored if only 1 element provided in the overall array (can be set to empty)
    preContent: String or react element - optional - will be displayed before the graph,
    postContent: String or react element - optional - will be displayed after the graph,
    active: Boolean - will be the active tab - can only be 1 active tab and there MUST be at least 1 active tab,
    clickCallback: Function - optional - will be called when this tab is clicked
    graphData: {
      type: String - can be 'echarts', 'googlecharts' or 'react'
      tools: { - if none are specified to true, there will be no tools button shown in the top right
        allowDownload: Boolean - if true will show a download to PNG button - ONLY WORKS IF TYPE IS echarts
        seeData: Boolean - if true will show data that made teh graph as a table - NOT IMPLEMENTED
        pinGraph: Boolean - if true will show a pin button - ONLY WORKS IF TYPE IS echarts
      },
      width: String - usual value would be 100%
      height: Absolute height value - do not use percentages - i.e. '400px'
      data: {
        if type is 'echarts'
          {  
            options: Object - options for graph 
          }
        if type is 'googlecharts'
          { 
            load: Array - the values to be passed to the google.charts.load function (first 2 arguments) 
            drawCallback: Function - the function that will be passed to the google.charts.setOnLoadCallback function (will be passed the dom target as its argument when called)
          }
        if type is 'react'
          {
            reactData: String or react element to render
          }
      },
    },
  }
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { dNc } from '../../../content/scripts/custom/utilities';
import { drawOrRedrawChart } from '../../../content/scripts/custom/echarts/utilities';

import * as storeAction from '../../../foundation/redux/globals/DataStoreMulti/actions';


class TabbedGraphPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { content } = this.props;

    let currentActive = -1;

    content.forEach((value, index) => {
      if (value.active === true) {
        if (currentActive !== -1) {
          console.log('More than 1 tab was active in TabbedGraphPanel');
        }

        currentActive = index;
      }
    });

    if(currentActive === -1) {
      console.log('Was not an active tab specified in TabbedGraphPanel');
    }

    this.state = {
      id: _.uniqueId(),
      currentActive,
    };
  }

  componentDidMount() {
    const { content } = this.props;

    const drawGraphs = () => {
      if (content[this.state.currentActive].graphData.type === 'echarts') {
        drawOrRedrawChart(this['graph' + this.state.currentActive], content[this.state.currentActive].graphData.data.options);
      } else if (content[this.state.currentActive].graphData.type === 'googlecharts') {
        const {load, drawCallback} = content[this.state.currentActive].graphData.data;

        const { google } = window;

        google.charts.load(load[0], load[1]);
        google.charts.setOnLoadCallback(drawCallback(this['graph' + this.state.currentActive]));
      } else {
        console.log('unknown graph type in TabbgedGraphPanel 4');
      }
    };

    // when everything is loaded
    $(() => {
      drawGraphs();

      // and when we resize
      $(document).on('debouncedResizeEvent', () => {
        // we resize the current graph on screen
        drawGraphs();
      });
    });
  }

  getTabTitles() {
    const { content } = this.props;
    const result = [];

    content.forEach((value, index) => {
      const tmp = (
        <li className={value.active === true ? 'active' : ''} key={index + 'tab'}>
          <a
            data-toggle="tab"
            href={'#tab-factory-id-' + this.state.id + '-' + index}
            onClick={() => {
              this.tabClicked(index);

              if (dNc(value.clickCallback)) {
                value.clickCallback();
              }
            }}
          >
            {value.title}
          </a>
        </li>
      );

      result.push(tmp);
    });

    return result;
  }

  getTabContent() {
    const { content } = this.props;
    const result = [];

    // loop over the content items in the array
    content.forEach((value, index) => {
      const contentItems = [];
      const toolButtonItems = [];
      let graphContent = null;

      // check what type of graph it is
      if (value.graphData.type === 'echarts' || value.graphData.type === 'googlecharts') {
        const { allowDownload, seeData, pinGraph } = value.graphData.tools;

        if (allowDownload === true) {
          toolButtonItems.push(<li key="allowDownload"><a href="#" onClick={(e) => { this.download(e); }} ><i className="far fa-download" /> Download Image</a></li>);
        }

        if (seeData === true) {
          toolButtonItems.push(<li key="seeData"><a href="#"><i className="far fa-table" /> See Underlying Data</a></li>);
        }

        if (pinGraph === true) {
          toolButtonItems.push(<li key="pinGraph"><a href="#" onClick={(e) => { this.pin(e); }}><i className="fas fa-thumbtack" /> Pin Graph</a></li>);
        }

        graphContent = (
          <div
            style={{ width: value.graphData.width, height: value.graphData.height }}
            ref={(target) => { this['graph' + index] = target; }}
          />
        );
      } else if(value.graphData.type === 'react') {
        graphContent = value.graphData.data.reactData;
      } else {
        console.log('unknown graph type in TabbgedGraphPanel 2');
      }

      // we add the tool buttons skeleton if needed
      if (toolButtonItems.length > 0) {
        contentItems.push(
          <div key="tools" style={{ marginBottom: '10px' }}>
            <div className="pull-right">
              <div className="btn-group">
                <div className="dropdown">
                  <button className="btn dropdown-toggle" data-toggle="dropdown" type="button">
                    <i className="fas fa-cogs" /> <i className="dropdown-caret" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right">
                    {toolButtonItems}
                  </ul>
                </div>
              </div>
            </div>
            <div className="clearfix" />
          </div>,
        );
      }

      // if there is pre-content then put it in
      if (dNc(value.preContent)) {
        contentItems.push(
          <div key="preContent">
            {value.preContent}
          </div>,
        );
      }

      // we drop in the graph content
      contentItems.push(
        <div key="graphContent">
          {graphContent}
        </div>,
      );

      // we drop in the post-content if it exists
      if (dNc(value.postContent)) {
        contentItems.push(
          <div key="postContent">
            {value.postContent}
          </div>,
        );
      }

      // we push the final tab content container with all of the stuff inside of it
      const final = (
        <div key={index + 'tab'} id={'tab-factory-id-' + this.state.id + '-' + index} className={value.active === true ? 'tab-pane fade in active' : 'tab-pane fade'}>
          {contentItems}
        </div>
      );

      result.push(final);
    });

    return result;
  }

  getImageDataForActiveGraph() {
    const { content } = this.props;
    const { currentActive } = this.state;

    if (content[currentActive].graphData.type === 'echarts') {
      const $canvas = $(this['graph' + currentActive]).find('canvas');

      if ($canvas.length === 1) {
        return $canvas[0].toDataURL('image/png');
      }
    } else {
      console.log('unknown graph type in TabbgedGraphPanel 3');
    }

    console.log('handle error TODO');
    return null;
  }

  tabClicked(index) {
    const { content } = this.props;

    if (content[index].graphData.type === 'echarts') {
      setTimeout(() => { drawOrRedrawChart(this['graph' + index], content[index].graphData.data.options); }, 300);
    } else if (content[index].graphData.type === 'googlecharts') {
      const {load, drawCallback} = content[index].graphData.data;

      const { google } = window;

      google.charts.load(load[0], load[1]);
      
      setTimeout(() => { google.charts.setOnLoadCallback(drawCallback(this['graph' + index])); }, 300);
    } else {
      console.log('unknown graph type in TabbgedGraphPanel 5');
    }

    this.setState({ currentActive: index });
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
    const { seperator, title, content } = this.props;

    let seperatorContent = null;

    if (seperator === true) {
      seperatorContent = <hr style={{ margin: '0px' }} />;
    }

    return (
      <div className="panel">

        <div className="panel-heading">
          <div className="panel-control">
            <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
          </div>

          <h3 className="panel-title">{this.props.title}</h3>
        </div>

        <div className="collapse in">
          <div className="panel-body" style={{ paddingBottom: '0', paddingTop: '0' }}>

            <div className="panel">
            {
              // we test if the content has tabs, if it does, we render tabs
              (content.length > 1) ?
                <div className="panel-heading">
                  <div className="panel-control">
                    <ul className="nav nav-tabs">
                      {this.getTabTitles()}
                    </ul>
                  </div>
                </div> 
              // if it does not, we just render null
                : null
            }
              
              <hr style={{ margin: 0 }} />

              <div className="panel-body" style={{ paddingBottom: '0' }}>
                <div className="tab-content">
                  {this.getTabContent()}
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

TabbedGraphPanel.propTypes = {
  globalID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  seperator: PropTypes.bool,

  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      preContent: PropTypes.any,
      postContent: PropTypes.any,
      active: PropTypes.bool.isRequired,
      clickCallback: PropTypes.func,
      graphData: PropTypes.shape({
        type: PropTypes.string.isRequired,
        tools: PropTypes.shape({
          allowDownload: PropTypes.bool.isRequired,
          seeData: PropTypes.bool.isRequired,
          pinGraph: PropTypes.bool.isRequired,
        }),
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
      }),
    }),
  ).isRequired,

  reduxAction_doUpdate: PropTypes.func,
};

TabbedGraphPanel.defaultProps = {
  seperator: true,
  reduxAction_doUpdate: () => {},
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  reduxAction_doUpdate: (mainID, subID, data) => dispatch(storeAction.doUpdate(mainID, subID, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabbedGraphPanel);

