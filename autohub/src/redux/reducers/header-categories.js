const initialState = {
  category: 0,
};

const headerCategories = (state = initialState, action) => {
  if (action.type === 'SET_CATEGORY') {
    return {
      ...state,
      category: action.payload,
    };
  }
  return state;
};

export default headerCategories;
