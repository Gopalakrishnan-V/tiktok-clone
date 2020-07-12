const isPromise = require('is-promise');

export default () => {
  return (next) => (action) => {
    // If not a promise, continue on
    if (!isPromise(action.payload)) {
      return next(action);
    }

    /*
     * Another solution would would be to include a property in `meta`
     * and evaulate that property.
     *
     * if (action.meta.globalError === true) {
     *   // handle error
     * }
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     */
    // Dispatch initial pending promise, but catch any errors
    return next(action).catch((error) => {
      // const clonedError = {...error};
      // console.log('_clonedError', clonedError.response.data);
      return {action: {...action, error}};
    });
  };
};
