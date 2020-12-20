import React from 'react';

const useCustomElement = (props, customMapping = {}) => {
  const ref = React.createRef();

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

      fns.forEach(({ key, fn }) => current.addEventListener(key, fn));
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

      if (prop instanceof Object || prop instanceof Array) {
        return { ...acc, [computedKey]: JSON.stringify(prop) };
      }

      return { ...acc, [computedKey]: prop };
    }, {});

  return [customElementProps, ref];
};

export default useCustomElement;
