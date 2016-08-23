import React, {PropTypes} from 'react';
import {intlShape, injectIntl, IntlProvider} from 'react-intl';
import TreeView from './tree-view.js';


class TableOfContents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundImage: 'url(' + this.props.data.content.thumbnail + ')'
    };

    return(
      <div id="toc">
        <div className="toc-wrapper">
          <div className="toc-header" style={style}>
            <div className="header-text">
              <h2 className="header-title">{this.props.data.content.mainTitle}</h2>
              <p className="header-author">{this.props.data.content.author}</p>
            </div>
          </div>
        </div>
        <IntlProvider locale={this.props.locale} messages={this.props.translations}>
          <TreeView data={this.props.data} />
        </IntlProvider>
      </div>
    )
  }
};

TableOfContents.propTypes={
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  data: PropTypes.shape({
    content: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    childField: PropTypes.string.isRequired
  })
};

export default injectIntl(TableOfContents);
