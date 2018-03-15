
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Page extends React.PureComponent {
  render() {
    const { active } = this.props;

    return (
      <div className="text-center" style={{ marginBottom: '20px' }}>
        <div className="btn-group">
          <Link to="/analytics/new/1/direct-university-impact" href="/analytics/new/1/direct-university-impact" className={active === '1' ? 'btn btn-primary' : 'btn btn-default'}><strong>Direct University Impact</strong></Link>
          <Link to="/analytics/new/1/views-on-education" href="/analytics/new/1/views-on-education" className={active === '2' ? 'btn btn-primary' : 'btn btn-default'}><strong>Views on Education</strong></Link>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Page;
