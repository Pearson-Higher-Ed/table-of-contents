/**
 * Tree View implementation. Currently called from a Table Of Contents component for that specific purpose.
 * Can be optimized to display as two different components.
 * @type {boolean} showDuplicateTitle - optional param to repeat the chapter title in display.
 * @type {boolean} separateToggleIcon - optional param to make the toggle icon separate from the content.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

export default class TreeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.data.content.list,
      currentDepth: 1
    };
  }

  render() {
    const list = this.state.list;
    const field = this.props.childField || 'childNodes';
    const nodes = list.map(n => (
      <TreeNode
        separateToggleIcon={this.props.separateToggleIcon}
        depth={this.props.depth}
        key={n.id}
        id={n.id}
        intl={this.props.intl}
        node={n}
        childNodes={n[field] || []}
        childField={field}
        currentDepth={this.state.currentDepth}
        data={this.props.data}
        tocClick={this.props.tocClick}
        drawerCallbacks={this.props.drawerCallbacks}
      />)
    );
    return (
      <ul className="list-group">
        {nodes}
      </ul>
    );
  }
}

TreeView.propTypes = {
  intl: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  childField: PropTypes.string.isRequired,
  data: PropTypes.shape({
    content: PropTypes.object.isRequired,
    showDuplicateTitle: PropTypes.bool.isRequired
  }).isRequired,
  drawerCallbacks: PropTypes.object.isRequired,
  tocClick: PropTypes.func.isRequired,
  separateToggleIcon: PropTypes.bool
};

TreeView.defaultProps = {
  separateToggleIcon: false
};
