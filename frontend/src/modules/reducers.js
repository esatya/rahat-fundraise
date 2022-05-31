import APP_ACTIONS from './actions';

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.INIT_APP:
      return {
        ...state,
        is_app_ready: action.data.app_ready
      };

    default:
      return state;
  }
};
