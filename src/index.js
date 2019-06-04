import React from 'react';

const useCustomElement = props => {
  const ref = React.createRef();

  React.useLayoutEffect(() => {
    const fns = Object.keys(props)
      .filter(key => props[key] instanceof Function)
      .map(key => ({
        key,
        fn: customEvent => props[key](customEvent.detail),
      }));

    fns.forEach(({ key, fn }) =>
      ref.current.addEventListener(key, fn),
    );

    return () =>
      fns.forEach(({ key, fn }) =>
        ref.current.removeEventListener(key, fn),
      );
  }, []);

  const customElementProps = Object.keys(props).reduce((acc, key) => {
    const prop = props[key];

    if (prop instanceof Object || prop instanceof Array) {
      return { ...acc, [key]: JSON.stringify(prop) };
    }

    if (prop instanceof Function) {
      return acc;
    }

    return { ...acc, [key]: prop };
  }, {});

  return [customElementProps, ref];
};

export default useCustomElement;
