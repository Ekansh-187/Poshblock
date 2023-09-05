export const INITIAL_STATE = {
  title: "",
  receiverId: "",
  desc: "",
  startDate: "",
  endDate: "",
};

export const contractReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};
