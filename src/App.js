/**
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './configureStore';

import AppContainer from './AppContainer';

const {store} = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
