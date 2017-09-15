/* *
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
* */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, fullBlack } from 'material-ui/styles/colors';
import { TableOfContentsComponent } from './TableOfContentsComponent';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    shadowColor: fullBlack
  }
});

class ComponentOwner extends React.Component {

  getChildContext() {
    return {
      muiTheme
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <TableOfContentsComponent
          childField={this.props.data.childField}
          separateToggleIcon
          depth={5}
          data={this.props.data}
          locale={this.props.intl.locale}
          drawerCallbacks={this.props.data.drawerCallbacks}
          clickTocHandler={this.props.data.clickTocHandler}
          isTocWrapperRequired={this.props.isTocWrapperRequired}
          currentPageId={this.props.currentPageId}
        />
      </MuiThemeProvider>
    );
  }
}

ComponentOwner.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

ComponentOwner.propTypes = {
  data: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  isTocWrapperRequired: PropTypes.bool,
  currentPageId: PropTypes.string
};
ComponentOwner.defaultProps = {
  isTocWrapperRequired: true,
  currentPageId: ''
};

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
