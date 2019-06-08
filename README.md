# useCustomElement React Hook

[![Build Status](https://travis-ci.org/the-road-to-learn-react/use-custom-element.svg?branch=master)](https://travis-ci.org/the-road-to-learn-react/use-custom-element) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/the-road-to-learn-react/use-custom-element.svg)](https://greenkeeper.io/) ![NPM](https://img.shields.io/npm/l/use-custom-element.svg)

Custom hook to bridge Custom Elements (Web Components) to React.

* [Learn how to build Web Components.](https://www.robinwieruch.de/web-components-tutorial)
* [Learn how to use Web Components in React.](https://www.robinwieruch.de/react-web-components)

## Installation

`npm install use-custom-element`

## Usage

In this scenario, we are using a specific [Dropdown Web Component](https://github.com/rwieruch/web-components-dropdown) as a React Dropdown Component. By using the custom React hook, we can provide all props in the right format to the custom element and register all event listeners (e.g. onChange from `props`) behind the scenes.

```
import React from 'react';

// Web Component Use Case
// install via npm install road-dropdown
import 'road-dropdown';

import useCustomElement from 'use-custom-element';

const Dropdown = props => {
  const [customElementProps, ref] = useCustomElement(props);

  return <road-dropdown {...customElementProps} ref={ref} />;
};
```

Afterward, the Dropdown component can be used:

```
const props = {
  label: 'Label',
  option: 'option1',
  options: {
    option1: { label: 'Option 1' },
    option2: { label: 'Option 2' },
  },
  onChange: (value) => console.log(value),
};

return <Dropdown {...props} />;
```

### Custom Mapping

You can also define a custom mapping:

```
import React from 'react';

// Web Component Use Case
// install via npm install road-dropdown
import 'road-dropdown';

import useCustomElement from 'use-custom-element';

const Dropdown = props => {
  const [customElementProps, ref] = useCustomElement(props, {
    option: 'selected',
    onChange: 'click',
  });

  console.log(customElementProps);

  // label: "Label"
  // options: "{"option1":{"label":"Option 1"},"option2":{"label":"Option 2"}}"
  // selected: "option1"

  // and "onChange" mapped to "click" event for the event listener

  return <my-dropdown {...customElementProps} ref={ref} />;
};
```

## Contribute

* `git clone git@github.com:the-road-to-learn-react/use-custom-element.git`
* `cd use-custom-element`
* `npm install`
* `npm run test`

### More

* [Publishing a Node Package to NPM](https://www.robinwieruch.de/publish-npm-package-node/)
* [Node.js Testing Setup](https://www.robinwieruch.de/node-js-testing-mocha-chai/)
* [React Testing Setup](https://www.robinwieruch.de/react-testing-tutorial/)
