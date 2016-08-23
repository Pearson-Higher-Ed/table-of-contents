/* global describe it expect */

import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import {IntlProvider} from 'react-intl';
import TestUtils from 'react-addons-test-utils';
import TreeView from '../src/js/tree-view';

expect.extend(expectJSX);

describe('TreeView', () => {
  let renderer;
  let intlProvider;
  let clicked = false;
  let toggled = false;

  const sampleList = {
    'author': 'Charles Dickens',
    'mainTitle': 'Chroniques du Québec et du Canada, 1500-1840',
    'thumbnail': 'http://content.stg-openclass.com/eps/pearson-reader/api/item/15c00f37-af40-41e0-8bac-e543da8f2051/1/file/cover_thumbnail.jpg',
    list:
      [{
        'id':'p-1',
        'href': 'OPS/xhtml/file_0003.html',
        'title': 'Parent-1',
        children:[
          {
            'id':'c-1',
            'href': 'OPS/xhtml/file_0003_1.html',
            'title': 'child-1',
            children:[
              {
                'id':'c-1-1',
                'href': 'OPS/xhtml/file_0003_1-1.html',
                'title': 'grandchild-1',
                children:[
                  {
                    'id':'c-1-1-1',
                    'href': 'OPS/xhtml/file_0003_1-1-1.html',
                    'title': 'great-grandchild-1',
                    children:[
                      {
                        'id':'c-1-1-1-1',
                        'href': 'OPS/xhtml/file_0003_1-1-1-1.html',
                        'title': 'great-great-grandchild-1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'id':'c-2',
            'href': 'OPS/xhtml/file_0003_2.html',
            'title': 'Child-2'
          }
        ]
      }, {
        'id':'p-2',
        'href': 'OPS/xhtml/file_0005.html',
        'title': 'Parent-2',
        children:[]
      }]
  };

  const toggle = function() {
    toggled = true;
  };
  const clickHandler = function() {
    clicked = true;
  };

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
    intlProvider = new IntlProvider({locale: 'en'}, {});
  });

  it('shallowly renders the component owner using React TestUtils', () => {

    const {intl} = intlProvider.getChildContext();


    const targetData = {
      elementId: 'demo-target1',
      depth: 2,
      content: sampleList,
      childField: 'items',
      cbk:clickHandler
    };

    renderer.render(
      <TreeView.WrappedComponent
        data={targetData}
        intl={intl} />
      , {intl}
    );

    let result = renderer.getRenderOutput();
    expect(result.type).toEqual('ul');
    expect(result.props.className).toEqual('list-group');
    expect(result.props.children.length).toEqual(2);
  });
});
