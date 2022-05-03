const initialState = {
  sortBy: {
    type: 'year',
    order: 'desc',
  },
};

const sortBy = (state = initialState, action) => {
  if (action.type === 'SET_SORT_BY') {
    return {
      ...state,
      sortBy: action.payload,
    };
  }
  return state;
};
export default sortBy;
