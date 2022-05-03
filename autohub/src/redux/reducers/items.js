const initialState = {
  items: [],
  isLoaded: false,
};

const details = (state = initialState, action) => {
  if (action.type === 'SET_DETAILS') {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};

export default details;
