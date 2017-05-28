

let defaultState = {
  users         : [],
  property      : '',
  propertyValue : '',
  allUsers      : []
};

export default function (state = defaultState, action) {
  switch(action.type) {
    case "CHANGE_PROP_VALUE" :
      return {
        eventType     : action.type,
        property      : action.property,
        propertyValue : action.propertyValue
      };
      break;

    case "SHOW_ALL_USERS":
      return {eventType: action.type, allUsers: action.allUsers};

    default:
      return state;
  }
}