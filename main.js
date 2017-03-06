import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import InternationalSupport from './src/js/InternationalSupport';
import ComponentOwner from './src/js/component-owner';
import './main.scss';


export default class TableOfContentsDemo {
  constructor(config) {
    this.init(config);
  }

  init(config) {
    this.intlObj = new InternationalSupport(config.locale);

    ReactDOM.render(
      <IntlProvider locale={this.intlObj.getLocale()} messages={this.intlObj.getMessages()}>
        <ComponentOwner data={config} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export { TableOfContentsComponent } from './src/js/TableOfContentsComponent';

document.body.addEventListener('o.InitToc', e => new TableOfContentsDemo(e.detail));
