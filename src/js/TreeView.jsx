/**
PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 *  Copyright © 2017 Pearson Education, Inc.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 * patent applications, and are protected by trade secret or copyright law.
 * Dissemination of this information, reproduction of this material, and copying or distribution of this software
 * is strictly forbidden unless prior written permission is obtained
 * from Pearson Education, Inc.
**/

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
    let reqChapterId = '';
    list.forEach((chapter) => {
      const reqChapter = chapter[field] ? chapter[field].find(page => page.urn === this.props.currentPageId) : {};
      if (reqChapter && Object.keys(reqChapter).length !== 0) {
        reqChapterId = chapter.urn;
      }
    });
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
        currentPageId={this.props.currentPageId}
        currentChapterId={reqChapterId}
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
  separateToggleIcon: PropTypes.bool,
  currentPageId: PropTypes.string
};

TreeView.defaultProps = {
  separateToggleIcon: false,
  currentPageId: ''
};
