
import React from 'react';
import PropTypes from 'prop-types';

class BasicPanel extends React.PureComponent {
  render() {
    const { title } = this.props;
    let titleContent = null;

    if (title !== null) {
      titleContent = (
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
      );
    }

    return (
      <div className="panel">
        {titleContent}
        <div className="panel-body" style={{ paddingBottom: '15px' }}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

BasicPanel.propTypes = {
  content: PropTypes.any.isRequired,
  title: PropTypes.string,
};

BasicPanel.defaultProps = {
  title: null,
};

export default BasicPanel;
