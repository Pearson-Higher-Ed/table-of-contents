/**
 * Tree View implementation. Currently called from a Table Of Contents component for that specific purpose.
 * Can be optimized to display as two different components.
 * @type {boolean} showDuplicateTitle - optional param to repeat the chapter title in display.
 * @type {boolean} separateToggleIcon - optional param to make the toggle icon separate from the content.
 */

import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {messages} from './defaultMessages';


export class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDepth: (this.props.currentDepth || 1),
      expanded: false
    };
  }

  toggle() {
    this.setState({expanded : !this.state.expanded});
  }

  handleLinkClick(refStr) {
    this.props.data.cbk(refStr);
  }

  isToggleAble() {
    const hasChildren = !! this.props.children.length;
    const currDepth = this.props.currentDepth;
    const depth = this.props.data.depth;
    return (currDepth === 1 && (hasChildren || this.props.showDuplicateTitle) ||(currDepth !== 1 && currDepth < depth && hasChildren));
  }

  getClassName() {
    const clsStr = 'content';
    const expandedClsStr = clsStr + ' pe-icon--chevron-up';
    const collapsedClsStr = clsStr + ' pe-icon--chevron-down';
    return ((this.isToggleAble()) ? (this.state.expanded ? expandedClsStr : collapsedClsStr) : clsStr);
  }

  renderClickIcon() {
    const classStr = this.getClassName();
    const depth = this.props.data.depth;
    const currDepth = this.props.currentDepth;
    const hasChildren = !!(this.props.children.length);

    /*Logic to display toggle icon for first level headings and then depending on depth, show/hide the icon*/
    if (currDepth === 1 ||(currDepth !== 1 && currDepth < depth && hasChildren)) {
      return(<a role="button"
        onClick= {this.toggle.bind(this)}
        className= {'icon '+ classStr}
        aria-controls= {this.props.node.id}
        aria-expanded= {this.state.expanded}
        aria-label= {this.props.intl.formatMessage(this.state.expanded ? messages.expandedList : messages.collapsedList)}
      ></a>)
    }else {
      return null;
    }
  }

  render() {
    let nodes = [];
    const self = this;
    const data = this.props.data;
    const depth = data.depth;
    const currentDepth = this.props.currentDepth;
    const classStr = this.props.separateToggleIcon ? 'content' : this.getClassName();
    const doToggle = this.isToggleAble();

    if (depth > currentDepth) {
      nodes = this.props.children.map(function(n) {
        return <TreeNode
          key= {'display-'+n.id}
          intl= {self.props.intl}
          node= {n}
          children= {n.children || []}
          currentDepth= {currentDepth+1}
          data= {self.props.data}
        />
      });
      if (depth > currentDepth && this.props.data.showDuplicateTitle && (this.props.children.length || currentDepth === 1)) {
        //repeat the chapter title once again as a link to the respective content.
        nodes.unshift(
          <TreeNode
            key= {this.props.node.id}
            intl= {this.props.intl}
            node= {this.props.node}
            children= {[]}
            currentDepth= {currentDepth+1}
            data= {this.props.data}
          />
        )
      }
    }

    return (
      <li className= {'list-group-item ' + (this.state.expanded ? 'selected': '')}>
        <a href= "javascript:void(0)"
          className= {classStr}
          role= "button"
          aria-controls= {this.props.node.id}
          aria-expanded= {this.state.expanded}
          onClick= {((doToggle && !this.props.separateToggleIcon)  ? this.toggle.bind(this) : this.handleLinkClick.bind(this, this.props.node.href))}>
          <span className= "title">{this.props.node.title}</span>
        </a>
        {(this.props.separateToggleIcon ? this.renderClickIcon(currentDepth, depth) : '')}
        {(() => {
          if (nodes.length) {
            return(<ul id={this.props.node.id} className={'child-list-group '+(this.state.expanded ? 'show' : 'hide')} aria-hidden={!this.state.expanded}>
              {nodes}
            </ul>)
          }
        })()}
      </li>
    );
  }
}

class treeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.data.content.list,
      currentDepth: 1
    };
  }

  render() {
    const self = this;
    const list = this.state.list;
    const field = this.props.data.childField || 'children';

    const nodes = list.map(function(n) {
      return <TreeNode
        key= {n.id}
        intl= {self.props.intl}
        node= {n}
        children= {n[field] ? n[field] : []}
        currentDepth= {self.state.currentDepth}
        data= {self.props.data}
      />
    });

    return(
      <ul className="list-group">
           {nodes}
      </ul>
    );
  }
}

treeView.propTypes={
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  data: PropTypes.shape({
    content: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    childField: PropTypes.string.isRequired
  })
};

export default injectIntl(treeView);
