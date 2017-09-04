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
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import { AnalyticsManager } from '@pearson-incubator/aquila-js-core';
import { messages } from './defaultMessages';

const ExpandBtn = props => (
  <SvgIcon {...props}>
    <path
      d="M1158.33104,54.2836362 C1158.71313,53.9055017 1159.33176,53.9055017 1159.71386,54.2836362 C1160.0951,
      54.6614882 1160.09566,55.2744731 1159.71386,55.6528903 L1154.1919,61.064623 C1153.80981,61.4427575 1153.19061,
      61.4427575 1152.80852,61.064623 L1147.28657,55.6528903 C1146.90448,55.2744731 1146.90448,54.6620534 1147.28657,
      54.2836362 C1147.66838,53.9055017 1148.2873,53.9055017 1148.66911,54.2833536 L1153.50007,58.7214888 L1158.33104,
      54.2836362 Z"
      fill="#252525"
      transform="translate(-1147.000000, -54.000000)"
    />
  </SvgIcon>
);

const CollapseBtn = props => (
  <SvgIcon {...props}>
    <path
      d="M2.60946667,7.99993333 L9.47146667,1.13793333 C9.73146667,0.877266667 9.73146667,0.455933333 9.47146667,
      0.195266667 C9.21146667,-0.0654 8.7888,-0.0654 8.5288,0.195266667 L1.19546667,7.5286 C0.9348,7.78926667 0.9348,
      8.2106 1.19546667,8.47126667 L8.5288,15.8046 C8.6588,15.9346 8.82946667,15.9999333 9.00013333,15.9999333 C9.1708,
      15.9999333 9.34146667,15.9346 9.47146667,15.8046 C9.73146667,15.5439333 9.73146667,15.1226 9.47146667,
      14.8619333 L2.60946667,7.99993333 Z"
      fill="#252525"
      transform="translate(376.000000, 36.833333) rotate(90.000000) translate(-376.000000, -36.833333)
      translate(371.500000, 28.833333)"
    />
  </SvgIcon>
);

const btnStyle = {
  width: '16px',
  height: '9px'
};
const iconButtonStyle = {
  paddingTop: '20px',
  float: 'right'
};

export default class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDepth: (this.props.currentDepth || 1),
      nexttab: false,
      expanded: false,
      iconBtnLabel: ''
    };
    this.handleLinkClick = this.handleLinkClick.bind(this, this.props.node.urn);
  }
  componentDidMount() {
    if (this.list) {
      this.list.setAttribute('listIndex', this.props.id);
      this.list.setAttribute('tabIndex', '-1');
    }
  }

  toggle(e) {
    this.setState({ expanded: !this.state.expanded });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }

  handleLinkClick(pageId, e) {
    this.props.tocClick(pageId);
    AnalyticsManager.dispatch({
      category: 'Toc',
      action: 'Click',
      label: pageId
    });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }

  getClassName(nodeLength, currentPageId, nodeUrn) {
    let clsStr = 'content';
    switch (this.props.currentDepth) {
      case 1:
        clsStr = `${clsStr} toc-parent-content`;
        break;
      case 2:
        clsStr = `${clsStr} toc-child-content`;
        break;
      case 3:
        clsStr = `${clsStr} toc-child-content third`;
        break;
      case 4:
        clsStr = `${clsStr} toc-child-content fourth`;
        break;
      case 5:
        clsStr = `${clsStr} toc-child-content fifth`;
        break;
      default:
        break;
    }
    clsStr = currentPageId === nodeUrn ? `${clsStr} selectedPage` : clsStr;
    return `${clsStr} ${(nodeLength > 0 && this.state.expanded) ? 'expanded' : 'collapsed'}`;
  }

  getParentClass = (currentChapterId, nodeUrn, currentDepth, currentPageId) => {
    let classStr = 'list-group-item';
    let ChapterId = currentChapterId;
    if (currentPageId.toLowerCase() === 'glossary' || currentPageId.toLowerCase() === 'footnotes') {
      ChapterId = currentPageId;
    }
    classStr = ChapterId === nodeUrn ? `${classStr} selectedChapter` : classStr;
    classStr = currentDepth > 1 ? `${classStr} toc-child` : `${classStr} toc-parent`;
    return classStr;
  }

  handleKeyDown = (event) => {
    const currentTOC = document.getElementsByClassName('list-group-item');
    const lastElement = currentTOC[currentTOC.length - 1];
    const currentPTOC = document.getElementsByClassName('toc-parent-content');
    const lastParentContent = currentPTOC[currentPTOC.length - 1];
    if (this.state.nexttab === true) {
      this.setState({ nexttab: false });
      this.drawerCallBackFns();
    }
    const className = 'toc-parent-content';
    if (event.target.className && new RegExp(`(^|\\s)${className}(\\s|$)`).test(event.target.className)) {
      if (event.target === lastParentContent) {
        const ariaexp = document.getElementsByClassName(event.target.className)[0].getAttribute('aria-expanded');
        if (ariaexp === 'false') {
          this.setState({ nexttab: true });
        } else {
          this.setState({ nexttab: false });
        }
      }
    }
    if (event.target.parentNode === lastElement) {
      if ((event.which === 40 || event.keyCode === 40)) {
        this.drawerCallBackFns();
      }
    }
  };

  drawerCallBackFns = () => {
    if (this.props.drawerCallbacks.onActive && this.props.drawerCallbacks.changeState) {
      this.props.drawerCallbacks.onActive('bookmarks');
      this.props.drawerCallbacks.changeState(1);
    }
  }

  handleKeyboardFocus = () => {
    const { formatMessage } = this.props.intl;
    const getStateIconBtn = (this.state.expanded) ? formatMessage(messages.collapse) : formatMessage(messages.expand);
    const collapseExpandLabel = `Click Here to ${getStateIconBtn} chapter List`;
    this.setState({ iconBtnLabel: collapseExpandLabel });
  }

  handleIconBtnClick = () => {
    const { formatMessage } = this.props.intl;
    const getStateIconBtn = (this.state.expanded) ? formatMessage(messages.collapsedList) : formatMessage(messages.expandedList);
    const collapseExpandLabel = `${getStateIconBtn} chapter List`;
    this.setState({ iconBtnLabel: collapseExpandLabel });
  }

  renderClickIcon(classStr) {
    const depth = this.props.depth;
    const currDepth = this.props.currentDepth;
    const hasChildren = !!(this.props.childNodes.length);

    /* Logic to display toggle icon for first level headings and then depending on depth, show/hide the icon*/
    if (currDepth === 1 || (currDepth !== 1 && currDepth < depth && hasChildren)) {
      return (<IconButton
        className={`icon ${classStr}`}
        role="button"
        aria-controls={this.props.node.id}
        aria-label={this.state.iconBtnLabel}
        aria-expanded={this.state.expanded}
        iconStyle={btnStyle}
        style={iconButtonStyle}
        onTouchTap={this.handleIconBtnClick}
      >{this.state.expanded ? <CollapseBtn viewBox="368 33 16 9" /> : <ExpandBtn viewBox="0 0 13 9" />}</IconButton>);
    }
    return null;
  }

  render() {
    let nodes = [];
    const self = this;
    const depth = this.props.depth;
    const currentDepth = this.props.currentDepth;
    const childField = this.props.childField;

    if (depth > currentDepth) {
      nodes = this.props.childNodes.map((n, index) => (
        <TreeNode
          key={`display-${n.id}`}
          intl={self.props.intl}
          node={n}
          childField={childField}
          currentDepth={currentDepth + 1}
          childNodes={n[childField] || []}
          depth={depth}
          data={self.props.data}
          tocClick={self.props.tocClick}
          drawerCallbacks={self.props.drawerCallbacks}
          id={`nodeidx_${index}_${n.label}`}
          currentPageId={self.props.currentPageId}
          currentChapterId={self.props.currentChapterId}
        />
      ));
      if (
        depth > currentDepth &&
        this.props.data.showDuplicateTitle &&
        (this.props.childNodes.length || currentDepth === 1)
      ) {
        // repeat the chapter title once again as a link to the respective content.
        nodes.unshift(
          <TreeNode
            key={this.props.node.id}
            id={this.props.node.id}
            intl={this.props.intl}
            node={this.props.node}
            childNodes={[]}
            childField={childField}
            currentDepth={currentDepth + 1}
            depth={depth}
            data={this.props.data}
            tocClick={self.props.tocClick}
            drawerCallbacks={self.props.drawerCallbacks}
            currentPageId={self.props.currentPageId}
            currentChapterId={self.props.currentChapterId}
          />
        );
      }
    }
    const classStr = this.props.separateToggleIcon ? 'content' :
    this.getClassName(nodes.length, this.props.currentPageId, this.props.node.urn);
    const parentClass = this.getParentClass(this.props.currentChapterId, this.props.node.urn,
      this.props.currentDepth, this.props.currentPageId);
    return (
      <li
        className={parentClass}
        role="presentation"
        onKeyDown={this.handleKeyDown}
        ref={(list) => { this.list = list; }}
        data-index={this.props.id}
        data-child={nodes.length}
        data-urn={this.props.node.urn}
      >
        <a
          className={classStr}
          role="button"
          tabIndex="0"
          aria-controls={this.props.node.urn}
          aria-expanded={this.state.expanded}
          onClick={(e) => {
            if (nodes.length > 0) {
              this.toggle(e);
            } else {
              this.handleLinkClick(e);
            }
          }}
          onKeyDown={(e) => {
            if (e.which === 13 || e.keyCode === 13) {
              if (nodes.length > 0) {
                this.toggle(e);
              } else {
                this.handleLinkClick(e);
              }
            }
          }}
          onBlur={this.handleKeyboardFocus}
        >
          <span className="title">{this.props.node.title ? this.props.node.title : this.props.node.label}</span>
          {
            this.props.node[childField] &&
            this.props.node[childField].length > 0 ?
              this.renderClickIcon(this.props.id, classStr) : ''
          }
        </a>

        {
          nodes.length > 0 ?
            (
              <ul
                id={this.props.node.id}
                className={`child-list-group ${this.state.expanded ? 'show' : 'hide'}`}
                aria-hidden={!this.state.expanded}
              >
                {nodes}
              </ul>
            ) : <div />
        }
      </li>
    );
  }
}


TreeNode.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.object.isRequired,
    showDuplicateTitle: PropTypes.bool
  }),
  separateToggleIcon: PropTypes.bool,
  id: PropTypes.string.isRequired,
  node: PropTypes.object.isRequired,
  childNodes: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  drawerCallbacks: React.PropTypes.object,
  tocClick: PropTypes.func.isRequired,
  depth: PropTypes.number.isRequired,
  currentDepth: PropTypes.number.isRequired,
  childField: PropTypes.string,
  currentPageId: PropTypes.string,
  currentChapterId: PropTypes.string
};
TreeNode.defaultProps = {
  currentPageId: '',
  currentChapterId: '',
  drawerCallbacks: {}
};
