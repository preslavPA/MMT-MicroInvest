

let defaultState = {
  invoices : []
};

export default function (state = defaultState, action) {
  switch(action.type) {
    case "SUBMIT_INVOICE_FORM" :
      return action.payload;
      break;

    default:
      return state;
  }
}