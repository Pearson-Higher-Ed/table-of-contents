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
    const title = this.props.data.content.mainTitle;
    const author = this.props.data.content.author;
    const maxCharTitle = this.props.data.maxTitleChars|| 55;
    const maxCharAuthor = this.props.data.maxAuthorChars || 60;


    return(
      <div id="toc">
        <div className="toc-wrapper">
          <div className="toc-header" style={style}>
            <div className="header-text">
              <h2 className="header-title">{title.length > maxCharTitle ? title.substring(0, this.props.data.maxTitleChars)+'...' : title}</h2>
              <p className="header-author">{author.length > maxCharAuthor ? author.substring(0, this.props.data.maxAuthorChars)+'...' : author}</p>
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
