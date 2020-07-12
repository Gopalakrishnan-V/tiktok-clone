import Axios from 'axios';
import * as ActionHelper from '../helpers/ActionHelper';

export const FETCH_POSTS = 'FETCH_POSTS';
export const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE';

const initialState = {
  isLoading: false,
  postsList: [],
};

export default (state = initialState, action) => {
  const {type, meta, payload, error} = action;

  switch (type) {
    case ActionHelper.getPending(FETCH_POSTS): {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionHelper.getFullfilled(FETCH_POSTS): {
      return {
        ...state,
        isLoading: false,
        postsList: payload.data.data.posts,
      };
    }
    case ActionHelper.getRejected(FETCH_POSTS): {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UPDATE_POST_LIKE: {
      const {postId, flag} = payload;
      const updatedPostsList = state.postsList.map((post) => {
        if (post.id === postId) {
          return {...post, isLiked: flag};
        }

        return {...post};
      });
      return {
        ...state,
        postsList: updatedPostsList,
      };
    }
    default: {
      return state;
    }
  }
};

export const fetchPosts = () => {
  return {
    type: FETCH_POSTS,
    payload: Axios.get(
      'https://firebasestorage.googleapis.com/v0/b/sample-a8754.appspot.com/o/p%2Ftiktok%2Fapi%2Fposts.json?alt=media&token=caec491c-756b-4dcf-93bd-6cde90b9ffee',
    ),
    meta: {},
  };
};

export const updatePostLike = (postId, flag) => {
  return {
    type: UPDATE_POST_LIKE,
    payload: {postId, flag},
  };
};
