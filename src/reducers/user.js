import Axios from 'axios';
import * as ActionHelper from '../helpers/ActionHelper';

// export const LOGIN = 'LOGIN';

const initialState = {
  isLoggedIn: true,
};

export default (state = initialState, action) => {
  const {type, meta, payload, error} = action;

  switch (type) {
    default: {
      return state;
    }
  }
};
