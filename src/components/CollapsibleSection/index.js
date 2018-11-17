import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { toggleSectionCollapse } from '../../actions/settings';
import { getCollapsedSections } from '../../selectors/settings';
import './index.css';

const CollapsibleSection = ({
  name,
  label,
  LabelComponent,
  collapsed,
  toggle,
  children
}) => (
  <div className="section">
    <div
      className={
        collapsed.includes(name) ? 'section__header' : 'section__header active'
      }
      onClick={() => toggle(name)}
    >
      <Icon name="dropdown" />
      <h3>{label}</h3>
      {LabelComponent && <LabelComponent />}
    </div>
    {!collapsed.includes(name) && (
      <div className="section__body">{children}</div>
    )}
  </div>
);

CollapsibleSection.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  LabelComponent: PropTypes.func,
  collapsed: PropTypes.arrayOf(PropTypes.string),
  toggle: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  collapsed: getCollapsedSections(state)
});

export default connect(
  mapStateToProps,
  { toggle: toggleSectionCollapse }
)(CollapsibleSection);
