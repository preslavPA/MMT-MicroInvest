

let defaultState = {
  companies : []
};

export default function (state = defaultState, action) {
  switch(action.type) {
    case "SUBMIT_COMPANY_FORM" :
      return action.payload;
      break;

    default:
      return state;
  }
}
