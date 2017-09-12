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

import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import { AnalyticsManager } from '@pearson-incubator/aquila-js-core';
import { messages } from './defaultMessages';


const iconButtonStyle = {
  float: 'right',
  top: 22
};

const iconStyle = {
  fill: '#6a7070'
};

const arrowStyle = {
  float: 'right',
  position: 'relative',
  top: 32,
  right: 18
};
const NextBtn = props => (
  <SvgIcon {...props}>
    <path
      d="M1211.56028,31.7501875 L1214.03008,29.2804375 C1214.32334,28.9871875 1214.32334,
      28.5131875 1214.03008,28.2199375 C1213.73682,27.9266875 1213.26281,27.9266875 1212.96956,
      28.2199375 L1209.22023,31.9691875 C1209.18498,32.0044375 1209.15348,32.0434375 1209.12573,
      32.0846875 C1209.11373,32.1019375 1209.10623,32.1214375 1209.09573,32.1401875 C1209.08223,
      32.1641875 1209.06798,32.1874375 1209.05673,32.2136875 C1209.04698,32.2376875 1209.04098,
      32.2631875 1209.03348,32.2879375 C1209.02748,32.3104375 1209.01923,32.3306875 1209.01473,
      32.3531875 C1208.99522,32.4499375 1208.99522,32.5496875 1209.01473,32.6471875 C1209.01923,
      32.6696875 1209.02748,32.6899375 1209.03348,32.7116875 C1209.04098,32.7371875 1209.04698,
      32.7626875 1209.05673,32.7866875 C1209.06798,32.8129375 1209.08223,32.8361875 1209.09573,
      32.8601875 C1209.10623,32.8789375 1209.11373,32.8984375 1209.12573,32.9156875 C1209.15348,
      32.9569375 1209.18498,32.9959375 1209.22023,33.0311875 L1212.96956,36.7804375 C1213.11581,
      36.9266875 1213.30781,37.0001875 1213.49982,37.0001875 C1213.69182,37.0001875 1213.88383,
      36.9266875 1214.03008,36.7804375 C1214.32334,36.4871875 1214.32334,36.0131875 1214.03008,
      35.7199375 L1211.56028,33.2501875 L1226.25008,33.2501875 C1226.66409,33.2501875 1227.0001,
      32.9141875 1227.0001,32.5001875 C1227.0001,32.0861875 1226.66409,31.7501875 1226.25008,
      31.7501875 L1211.56028,31.7501875 Z"
      fill="#6a7070"
      transform="translate(1218.000100, 32.500094) rotate(180.000000) translate(-1218.000100, -32.500094)"
    />
  </SvgIcon>
);


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
        style={iconButtonStyle}
        iconStyle={iconStyle}
        onTouchTap={this.handleIconBtnClick}
      >{this.state.expanded ? <NavigationExpandLess /> : <NavigationExpandMore />}</IconButton>);
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
              this.renderClickIcon(this.props.id, classStr) : <NextBtn
                className="arrowForward"
                viewBox="1209 28 18 9"
                style={arrowStyle}
              />
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
