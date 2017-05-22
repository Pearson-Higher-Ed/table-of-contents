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
  intl: PropTypes.object.isRequired
};

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
