const initialState = {
  filters: {
    brand: '',
    model: '',
    article: '',
    engine_value: '',
    item: '',
  },
};

const search = (state = initialState, action) => {
  if (action.type === 'SET_FILTERS') {
    return {
      ...state,
      filters: action.payload,
    };
  }
  return state;
};

export default search;
