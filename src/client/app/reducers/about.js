const initialState = {
  about: 'About page'
};

export const about = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_ACTION':
      return {
        ...state
      };
    default:
      return state;
  }
};

export function doSmth(dispatch) {
  return function(accessToken) {
    dispatch({
      type: "TEST_ACTION",
      sharedPhotos: 'Test action'
    });
  }
}