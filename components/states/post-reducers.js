/* Search text */

import { startLocationUpdatesAsync } from "expo-location";

export function searchText(state = "", action) {
  switch (action.type) {
    case "@SEARCH_TEXT/SET_SEARCH_TEXT":
      return action.searchText;
    default:
      return state;
  }
}

/* Reminder */

const initReminderState = {
  remindItemLoading: false,
  items: [],
  saveAll: false,
  deleteNotify: "",
};

export function reminder(state = initReminderState, action) {
  switch (action.type) {
    case "@REMINDER/START_LOADING":
      return {
        ...state,
        remindItemLoading: true,
      };
    case "@REMINDER/END_LOADING":
      return {
        ...state,
        remindItemLoading: false,
      };
    case "@REMINDER/END_LIST_ITEMs":
      return {
        ...state,
        items: action.items,
      };
    case "@REMINDER/END_CREATE_ITEM":
      var newItems = state.items.map((p) => {
        if (p.id === action.reminder.id) return action.reminder;
        return p;
      });
      return {
        ...state,
        items: newItems,
      };
    case "@REMINDER/END_DELETE_ITEM":
      var targetitem = state.items.map((p) => {
        if (p.id === action.reminder.id) return action.reminder;
        return p;
      });
      return {
        ...state,
        items: targetitem,
      };
    case "@REMINDER/DELETE_NOTIFY":
      return {
        ...state,
        deleteNotify: action.id,
        //items: state.items,
      };
    default:
      return state;
  }
}

/* Posts */

const initPostState = {
  postLoading: false,
  posts: [],
  hasMore: true,
};
export function post(state = initPostState, action) {
  switch (action.type) {
    case "@POST/START_LOADING":
      return {
        ...state,
        postLoading: true,
      };
    case "@POST/END_LOADING":
      return {
        ...state,
        postLoading: false,
      };
    case "@POST/END_LIST_POSTS":
      return {
        ...state,
        posts: action.posts,
        hasMore: action.posts.length > 0,
      };
    case "@POST/END_LIST_MORE_POSTS":
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
        hasMore: action.posts.length > 0,
      };
    case "@POST/END_CREATE_VOTE":
      var newPosts = state.posts.map((p) => {
        if (p.id === action.post.id) return action.post;
        return p;
      });
      return {
        ...state,
        posts: newPosts,
      };
    // TODO
    case "@POST/END_CREATE_POST":
      var newPosts = state.posts.map((p) => {
        if (p.id === action.post.id) return action.post;
        return p;
      });
      return {
        ...state,
        posts: newPosts,
      };
    case "@POST/END_DELETE_POST":
      var targetpost = state.posts.map((p) => {
        if (p.id === action.post.id) return action.post;
        return p;
      });
      return {
        ...state,
        posts: targetpost,
      };
    default:
      return state;
  }
}

/* Post Form */

const initPostFormState = {
  inputValue: "",
  inputDanger: false,
  locationTpyeToggle: false,
  locationType: "na",
  vibrate: true,
  volume: "",
  volumeDanger: false,
  isPersonal: false,
  add: false,
  /*moodToggle: false,
    mood: 'na'*/
};

export function postForm(state = initPostFormState, action) {
  switch (action.type) {
    case "@POST_FORM/INPUT":
      return {
        ...state,
        inputValue: action.value,
      };
    case "@POST_FORM/INPUT_DANGER":
      return {
        ...state,
        inputDanger: action.danger,
      };
    case "@POST_FORM/TOGGLE_LOCATIONTYPE":
      return {
        ...state,
        locationTypeToggle: !state.locationTypeToggle,
      };
    case "@POST_FORM/SET_LOCATIONTYPE_TOGGLE":
      return {
        ...state,
        locationTypeToggle: action.toggle,
      };
    case "@POST_FORM/SELECT_LOCATIONTYPE":
      return {
        ...state,
        locationType: action.locationType,
      };
    case "@POST_FORM/VIBRATESET":
      return {
        ...state,
        vibrate: !state.vibrate,
      };
    case "@POST_FORM/INPUTVOLUME":
      return {
        ...state,
        volume: action.vol,
      };
    case "@POST_FORM/VOLUME_DANGER":
      return {
        ...state,
        volumeDanger: action.voldanger,
      };
    case "@POST_FORM/ITEMDANGER":
      return {
        ...state,
        itemDanger: true,
      };
    case "@POST_FORM/ALLSAFE":
      return {
        ...state,
        itemDanger: false,
      };
    case "@POST_FORM/SETTYPEFORM":
      return {
        ...state,
        isPersonal: !state.isPersonal,
      };
    case "@POST_FORM/SET_ADD":
      return {
        ...state,
        add: !state.add,
      };
    /*case '@POST_FORM/TOGGLE_MOOD':
            return {
                ...state,
                moodToggle: !state.moodToggle
            };
        case '@POST_FORM/SET_MOOD_TOGGLE':
            return {
                ...state,
                moodToggle: action.toggle
            };
        case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };*/
    default:
      return state;
  }
}

/* Post item */

const initNotificationItemState = {
  tooltipOpen: {},
};

export function NotificationItem(state = initNotificationItemState, action) {
  switch (action.type) {
    case "@POST_ITEM/TOGGLE_TOOLTIP":
      return {
        tooltipOpen: {
          ...state.tooltipOpen,
          [action.id]: state.tooltipOpen[action.id] ? false : true,
        },
      };
    case "@POST_ITEM/SET_TOOLTIP_TOGGLE":
      return {
        tooltipOpen: {
          ...state.tooltipOpen,
          [action.id]: action.toggle,
        },
      };
    default:
      return state;
  }
}

/* Post item */
const initPostItemState = {
  isOpen: {},
};

export function postItem(state = initPostItemState, action) {
  switch (action.type) {
    case "@POST_ITEM/DETAIL_OPEN":
      return {
        isOpen: {
          ...state.isOpen,
          [action.id]: state.isOpen[action.id] ? false : true,
        },
      };
    case "@POST_ITEM/SET_ISOPEN":
      return {
        isOpen: {
          ...state.isOpen,
          [action.id]: action.toggle,
        },
      };
    default:
      return state;
  }
}

const initRemindItemState = {
  Name: {},
  itemDanger: false,
};

export function remindItem(state = initRemindItemState, action) {
  switch (action.type) {
    case "@REMINDITEM/INPUTITEMNAME":
      return {
        Name: {
          ...state.Name,
          [action.id]: action.value,
        },
      };
    case "@REMINDITEM/INPUTITEMNAME_DANGER":
      return {
        ...state,
        itemDanger: action.danger,
      };
    default:
      return state;
  }
}

const initCurrentLocationState = {
  latitude: 0,
  longtitude: 0,
};

export function currentLocation(state = initCurrentLocationState, action) {
  switch (action.type) {
    case "@CURRENTLOCATION_SETCOOR":
      return {
        ...state,
        latitude: action.lat,
        longtitude: action.lon,
      };
    default:
      return state;
  }
}
