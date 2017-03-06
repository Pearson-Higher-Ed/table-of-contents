import React from 'react';
import { IntlProvider } from 'react-intl';
import InternationalSupport from './InternationalSupport';
import TableOfContents from './TableOfContents';

export const TableOfContentsComponent = function TableOfContentsComponent(paramsObj) { // eslint-disable-line import/prefer-default-export
  const intlObj = new InternationalSupport(paramsObj.locale);
  return (<IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
    <TableOfContents
      separateToggleIcon={paramsObj.separateToggleIcon}
      data={paramsObj.data}
      showDuplicateTitle={paramsObj.showDuplicateTitle}
      depth={paramsObj.depth} 
      childField={paramsObj.childField}
      clickTocHandler={paramsObj.clickTocHandler}
      drawerCallbacks={paramsObj.drawerCallbacks} />
  </IntlProvider>)
}
