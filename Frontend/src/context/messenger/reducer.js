export const initialState = {
  senderId: "",
  receiverId: "",
  createConversation: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CREATE_CONV_INFO":
      return {
        ...state,

        senderId: action.senderId,
        receiverId: action.receiverId,
        createConversation: action.createConversation,
      };

    default:
      return state;
  }
};
export default reducer;
