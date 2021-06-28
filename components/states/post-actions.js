import {
  listPosts as listPostsFromApi,
  createPost as createPostFromApi,
  createVote as createVoteFromApi,
  deletePost as deletePostFromApi,
  deleteRemindItem as deleteRemindItemFromApi,
  listRemindItem as listRemindItemFromApi,
  createRemindItem as createRemindItemFromApi,
  clearItems as clearItemFromApi,
  setRemindItem as SetRemindItemFromApi,
  storeItemName as StoreItemNameFromApi,
  createCheck as createCheckFromApi,
  listNotification as listNotificationFromApi,
} from "../api/posts.js";
import { func } from "prop-types";
/*  Search text */

export function setSearchText(searchText) {
  return {
    type: "@SEARCH_TEXT/SET_SEARCH_TEXT",
    searchText,
  };
}

/*  Posts */

function startLoading() {
  return {
    type: "@POST/START_LOADING",
  };
}

function endLoading() {
  return {
    type: "@POST/END_LOADING",
  };
}

function endListPosts(posts) {
  return {
    type: "@POST/END_LIST_POSTS",
    posts,
  };
}

function endListMorePosts(posts) {
  return {
    type: "@POST/END_LIST_MORE_POSTS",
    posts,
  };
}

function endCreatePost(post) {
  return {
    type: "@POST/END_CREATE_POST",
    post,
  };
}

function endCreateVote(post) {
  return {
    type: "@POST/END_CREATE_VOTE",
    post,
  };
}

function endDeletPost(post) {
  return {
    type: "@POST/END_DELETE_POST",
    post,
  };
}

function endlistRemindItem(items) {
  return {
    type: "@REMINDER/END_LIST_ITEMs",
    items,
  };
}

function endItemLoading() {
  return {
    type: "@REMINDER/END_LOADING",
  };
}
function startItemLoading() {
  return {
    type: "@REMINDER/START_LOADING",
  };
}

export function deleteNotify(id) {
  return {
    type: "@REMINDER/DELETE_NOTIFY",
    id,
  };
}

/* Remind Setting*/
export function StoreItemName(id, name) {
  //console.log(name);
  return (dispatch, getState) => {
    dispatch(startItemLoading());

    return StoreItemNameFromApi(id, name)
      .then((post) => {
        dispatch(listRemindItem());
      })
      .catch((err) => {
        console.error("Error list post", err);
      })
      .then(() => dispatch(endItemLoading()));
  };
}

export function clearItems() {
  return (dispatch, getState) => {
    dispatch(startItemLoading());

    return clearItemFromApi()
      .then((post) => {
        dispatch(listRemindItem());
      })
      .catch((err) => {
        console.error("Error list post", err);
      })
      .then(() => dispatch(endItemLoading()));
  };
}

export function deleteRemindItem(id) {
  return (dispatch, getState) => {
    dispatch(startItemLoading());

    return deleteRemindItemFromApi(id)
      .then((post) => {
        dispatch(listRemindItem());
      })
      .catch((err) => {
        console.error("Error list post", err);
      })
      .then(() => dispatch(endItemLoading()));
  };
}

export function listRemindItem(searchText) {
  return (dispatch, getState) => {
    dispatch(startItemLoading());
    return listRemindItemFromApi(searchText)
      .then((items) => {
        dispatch(endlistRemindItem(items));
      })
      .catch((err) => {
        console.error("Error listing posts", err);
      })
      .then(() => {
        dispatch(endItemLoading());
      });
  };
}

export function createSet(id, setting) {
  //console.log(id);
  //console.log(setting);
  return (dispatch, getState) => {
    dispatch(startItemLoading());

    return SetRemindItemFromApi(id, setting)
      .then((post) => {
        dispatch(listRemindItem());
      })
      .catch((err) => {
        console.error("Error list post", err);
      })
      .then(() => dispatch(endItemLoading()));
  };
}

export function createRemindItem(id, setting) {
  return (dispatch, getState) => {
    dispatch(startItemLoading());

    return createRemindItemFromApi(id, setting)
      .then((item) => {
        dispatch(listRemindItem());
      })
      .catch((err) => {
        console.error("Error creating remind item", err);
      })
      .then(() => dispatch(endItemLoading()));
  };
}

/* -----------------------------------  Post  ---------------------------------------- */

export function deletePost(id) {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return deletePostFromApi(id)
      .then((post) => {
        dispatch(listPosts());
      })
      .catch((err) => {
        console.error("Error list post", err);
      })
      .then(() => dispatch(endLoading()));
  };
}

export function listPosts(searchText) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return listPostsFromApi(searchText)
      .then((posts) => {
        //console.log(posts);
        dispatch(endListPosts(posts));
      })
      .catch((err) => {
        console.error("Error listing posts", err);
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
}

export function listMorePosts(searchText) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return listPostsFromApi(searchText, state.posts[state.posts.length - 1].id)
      .then((posts) => {
        console.log("listmorepost");
        dispatch(endListMorePosts(posts));
      })
      .catch((err) => {
        console.error("Error listing posts", err);
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
}

export function createPost(
  id,
  isPersonal,
  inputValue,
  locationTpye,
  volume,
  vibration
) {
  return (dispatch, getState) => {
    //TODO
    dispatch(startLoading());
    return createPostFromApi(
      id,
      isPersonal,
      inputValue,
      locationTpye,
      volume,
      vibration
    )
      .then((post) => {
        dispatch(listPosts());
      })
      .catch((err) => {
        console.error("Error creating vote", err);
      })
      .then(() => dispatch(endLoading()));
  };
}

export function createVote(id, mood) {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return createVoteFromApi(id, mood)
      .then((post) => {
        dispatch(listPosts());
      })
      .catch((err) => {
        console.error("Error creating vote", err);
      })
      .then(() => dispatch(endLoading()));
  };
}

export function createCheck(id) {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return createCheckFromApi(id)
      .then((post) => {
        dispatch(listPosts());
      })
      .catch((err) => {
        console.error("Error creating vote", err);
      })
      .then(() => dispatch(endLoading()));
  };
}
/* -----------------------------  Notification  -----------------------------------*/
export function listNotification(lon, lat, searchText) {
  console.log(lon);
  console.log(lat);
  return (dispatch, getState) => {
    dispatch(startLoading());
    return listNotificationFromApi(searchText, lon, lat)
      .then((posts) => {
        console.log("a");
        console.log(posts);
        dispatch(endListPosts(posts));
      })
      .catch((err) => {
        console.error("Error listing posts", err);
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
}

export function listMoreNotification(lon, lat, searchText) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return listNotificationFromApi(
      lon,
      lat,
      searchText,
      state.posts[state.posts.length - 1].id
    )
      .then((posts) => {
        console.log("listmorepost");
        dispatch(endListMorePosts(posts));
      })
      .catch((err) => {
        console.error("Error listing posts", err);
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
}

/* -------------------------------  Post Form --------------------------------------*/

export function input(value) {
  return {
    type: "@POST_FORM/INPUT",
    value,
  };
}

export function inputItemName(id, value) {
  return {
    type: "@REMINDITEM/INPUTITEMNAME",
    id,
    value,
  };
}

export function inputDanger(danger) {
  return {
    type: "@POST_FORM/INPUT_DANGER",
    danger,
  };
}

export function volumeDanger(voldanger) {
  return {
    type: "@POST_FORM/VOLUME_DANGER",
    voldanger,
  };
}

export function inputVol(vol) {
  return {
    type: "@POST_FORM/INPUTVOLUME",
    vol,
  };
}

export function itemDanger(id, danger) {
  return {
    type: "@REMINDITEM/INPUTITEMNAME_DANGER",
    id,
    danger,
  };
}

export function togglelocationType() {
  return {
    type: "@POST_FORM/TOGGLE_LOCATIONTYPE",
  };
}

export function setlocationTypeToggle(toggle) {
  return {
    type: "@POST_FORM/SET_LOCATIONTYPE_TOGGLE",
    toggle,
  };
}

export function selectlocationType(locationType) {
  return {
    type: "@POST_FORM/SELECT_LOCATIONTYPE",
    locationType,
  };
}

export function vibrateSetting() {
  return {
    type: "@POST_FORM/VIBRATESET",
  };
}

export function typeFormSetting() {
  return {
    type: "@POST_FORM/SETTYPEFORM",
  };
}

/*  Post item */

export function OpenCard(id) {
  return {
    type: "@POST_ITEM/DETAIL_OPEN",
    id,
  };
}

export function setIsOpen(id, toggle) {
  return {
    type: "@POST_ITEM/SET_ISOPEN",
    id,
    toggle,
  };
}

export function setAdd() {
  return {
    type: "@POST_FORM/SET_ADD",
  };
}

export function setCoor(lat, lon) {
  console.log(lat);
  return {
    type: "@CURRENTLOCATION_SETCOOR",
    lat,
    lon,
  };
}
