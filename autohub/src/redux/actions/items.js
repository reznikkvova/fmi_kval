import axios from 'axios';

export const setDetails = (items) => ({
  type: 'SET_DETAILS',
  payload: items,
});

export const fetchDetails = (sortBy) => (dispatch) => {
  axios
    .get(
      `https://sheet.best/api/sheets/0f57ec51-d10e-4bb4-9c37-5efdb0a37a5a?_sort=${sortBy.type}&_order=${sortBy.order}`,
    )
    .then(({ data }) => {
      dispatch(setDetails(data));
    });
};
