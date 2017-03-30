import React from 'react';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import TableOfContents from './TableOfContents';
import msgObject from '../../translations';

export const TableOfContentsComponent = function TableOfContentsComponent(paramsObj) { // eslint-disable-line import/prefer-default-export
  const intlObj = new InternationalSupport(msgObject, paramsObj.locale);
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


