import React from 'react';
import { renderToString } from 'react-dom/server';

const useCustomElement = (props, customMapping = {}) => {
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    const { current } = ref;

    let fns;

    if (current) {
      fns = Object.keys(props)
        .filter(key => props[key] instanceof Function)
        .map(key => ({
          key: customMapping[key] || key,
          fn: customEvent =>
            props[key](customEvent.detail, customEvent),
        }));

      fns.forEach(({ key, fn }) => {
        current.addEventListener(key, fn);
      });
    }

    return () => {
      if (current) {
        fns.forEach(({ key, fn }) =>
          current.removeEventListener(key, fn),
        );
      }
    };
  }, [customMapping, props, ref]);

  const customElementProps = Object.keys(props)
    .filter(key => !(props[key] instanceof Function))
    .reduce((acc, key) => {
      const prop = props[key];
      const computedKey = customMapping[key] || key;
      let value;

      if (
        React.isValidElement(prop) ||
        (prop instanceof Array && prop.every(React.isValidElement))
      ) {
        value = renderToString(prop);
      } else if (prop instanceof Object || prop instanceof Array) {
        value = JSON.stringify(prop);
      } else {
        value = prop;
      }

      return { ...acc, [computedKey]: value };
    }, {});

  return [customElementProps, ref];
};

export default useCustomElement;
