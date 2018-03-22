

import React from 'react';
import PropTypes from 'prop-types';

class CollapsablePanel extends React.PureComponent {
  render() {
    const { expanded, title } = this.props;

    return (
      <div className="panel">

        <div className="panel-heading">
          <div className="panel-control">
            <button className="btn btn-default" data-panel="minmax"><i className="far fa-chevron-up" /></button>
          </div>
          <h3 className="panel-title">{title}</h3>
        </div>

        <div className={expanded === true ? 'collapse in' : 'collapse'}>
          <div className="panel-body" style={{ paddingBottom: '15px' }}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

CollapsablePanel.propTypes = {
  content: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

CollapsablePanel.defaultProps = {
  expanded: true,
};

export default CollapsablePanel;
