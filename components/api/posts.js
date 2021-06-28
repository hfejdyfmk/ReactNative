import axios from "axios";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "@babel/polyfill";
import { post } from "jquery";

const postKey = "posts";
const itemKey = "items";

/*-----------------------  Connet to Backend  -------------------------------- */
const postBaseUrl = "http://54.151.107.126:3000/api";
export function listPosts(searchText = "", start) {
  let mode = "list";
  let url = `${postBaseUrl}/posts`;
  let query = [];
  if (searchText) query.push(`searchText=${searchText}`);
  if (start) query.push(`start=${start}`);
  if (query.length) url += "?" + query.join("&");

  //console.log(`Making GET request to: ${url}`);

  return axios.get(url).then(function (res) {
    if (res.status !== 200)
      throw new Error(`Unexpected response code: ${res.status}`);
    //console.log(res.data);
    return res.data;
  });
}

export function createPost(
  id,
  isPersonal,
  inputValue,
  locationType,
  volume,
  vibrate
) {
  let url = `${postBaseUrl}/posts`;
  let itemArray = JSON.parse(localStorage.getItem(itemKey));
  let items = Array.isArray(itemArray) ? itemArray : [];
  //console.log(`Making POST request to: ${url}`);

  return axios
    .post(url, {
      inputValue,
      isPersonal,
      locationType,
      volume,
      vibrate,
      items,
    })
    .then(function (res) {
      if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
      //console.log(res.data);
      return res.data;
    });
}

export function listNotification(searchText = "", lon, lat, start) {
  //_createNotification(lon, lat);
  let url = `${postBaseUrl}/remind`;
  let query = [];
  query.push(`lon=${lon}`);
  query.push(`lat=${lat}`);
  if (searchText) query.push(`searchText=${searchText}`);
  if (start) query.push(`start=${start}`);
  if (query.length) url += "?" + query.join("&");

  //console.log(`Making GET request to: ${url}`);

  return axios.get(url).then(function (res) {
    if (res.status !== 200)
      throw new Error(`Unexpected response code: ${res.status}`);
    //console.log(res.data);
    return res.data;
  });
}

export function deletePost(id) {
  //let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;
  let mode = "delete";
  let url = `${postBaseUrl}/posts/${id}/${mode}`;

  console.log(`Making POST request to: ${url}`);

  return axios.post(url).then(function (res) {
    if (res.status !== 200)
      throw new Error(`Unexpected response code: ${res.status} `);
    console.log(res.data);
    return res.data;
  });
}

export function createCheck(id) {
  //let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;
  let checked = true;
  let url = `${postBaseUrl}/remind/${id}/${checked}`;

  //console.log(`Making POST request to: ${url}`);

  return axios.post(url).then(function (res) {
    if (res.status !== 200)
      throw new Error(`Unexpected response code: ${res.status} `);
    //console.log(res.data);
    return res.data;
  });
}

/* -------------------------- Use Frontend -------------------------------------*/

// export function listPosts(searchText = "") {
//   //localStorage.clear('items');
//   //localStorage.clear('posts');
//   //console.log(searchText);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(_listPosts(searchText));
//     }, 50);
//   });
// }

// // Simulated server-side code
// function _listPosts(searchText = "") {
//   let postString = localStorage.getItem(postKey);
//   let posts = postString ? JSON.parse(postString) : [];
//   if (posts.length > 0 && searchText) {
//     posts = posts.filter((p) => {
//       return (
//         p.text.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1
//       );
//     });
//   }
//   return posts;
// }

// export function createPost(
//   id,
//   isPersonal,
//   inputValue,
//   locationTpye,
//   volume,
//   vibrate
// ) {
//   return new Promise((resolve, reject) => {
//     resolve(
//       _createPost(id, isPersonal, inputValue, locationTpye, volume, vibrate)
//     );
//   });
// }

// Object.byString = function (o) {
//   let l = o.length;
//   let s = "";
//   for (let i = 0; i < l; i++) {
//     let itemsetting = JSON.stringify(o[i]);
//     s = s + "\n" + itemsetting;
//     //console.log(s);
//   }
//   return s;
// };

// // Simulated server-side code
// function _createPost(
//   id,
//   isPersonal,
//   inputValue,
//   locationTpye,
//   volume,
//   vibrate
// ) {
//   let itemArray = JSON.parse(localStorage.getItem(itemKey));
//   let items = Array.isArray(itemArray) ? itemArray : [];
//   //let reminding = Object.byString(items);
//   //console.log(items);
//   const newPost = {
//     id: uuid(),
//     ts: moment().unix(),
//     Name: inputValue,
//     isPersonal: isPersonal,
//     locationType: locationTpye,
//     volume: volume,
//     vibrate: vibrate,
//     reminding: items,
//     checked: false,
//   };
//   const posts = [newPost, ..._listPosts()];
//   localStorage.setItem(postKey, JSON.stringify(posts));
//   //console.log(newPost);
//   return newPost;
// }

export function createVote(id, mood) {
  return new Promise((resolve, reject) => {
    _createVote(id, mood);
    resolve();
  });
}

// Simulated server-side code
function _createVote(id, mood) {
  const posts = _listPosts().map((p) => {
    if (p.id === id) {
      p[mood.toLowerCase() + "Votes"]++;
    }
    return p;
  });
  localStorage.setItem(postKey, JSON.stringify(posts));
}

// export function createCheck(id) {
//   return new Promise((resolve, reject) => {
//     _createCheck(id);
//     resolve();
//   });
// }

// export function _createCheck(id) {
//   const posts = _listPosts().map((p) => {
//     if (p.id === id) {
//       p["checked"] = !p["checked"];
//     }
//     return p;
//   });
//   localStorage.setItem(postKey, JSON.stringify(posts));
// }

// export function deletePost(id) {
//   return new Promise((resolve, reject) => {
//     _deletePost(id);
//     resolve();
//   });
// }

// function _deletePost(id) {
//   const posts = _listPosts();
//   let index = 0;
//   for (const p of posts) {
//     if (p.id === id) {
//       index = posts.indexOf(p);
//       break;
//     }
//   }
//   //console.log(posts);
//   if (index > -1) {
//     posts.splice(index, 1);
//   }
//   //console.log(posts);
//   localStorage.setItem(postKey, JSON.stringify(posts));
// }

/* ---------------------------------------------------------------------- */

export function deleteRemindItem(id) {
  return new Promise((resolve, reject) => {
    _deleteRemindItem(id);
    resolve();
  });
}

function _deleteRemindItem(id) {
  const items = _listRemindItem();
  let index = 0;
  for (const p of items) {
    if (p.id === id) {
      index = items.indexOf(p);
      break;
    }
  }
  if (index > -1) {
    items.splice(index, 1);
  }
  localStorage.setItem(itemKey, JSON.stringify(items));
}
export function listRemindItem(searchText = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_listRemindItem(searchText));
    }, 50);
  });
}

// Simulated server-side code
function _listRemindItem(searchText = "") {
  let itemString = localStorage.getItem(itemKey);
  let items = itemString ? JSON.parse(itemString) : [];
  //console.log(searchText);
  if (items.length > 0 && searchText) {
    items = items.filter((p) => {
      return (
        p.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    });
  }
  //console.log(items);
  return items;
}

function _createRemindItem(setting, name) {
  const newRemindItem = {
    id: uuid(),
    Name: name,
    leaving: false,
    entering: false,
  };
  const items = [newRemindItem, ..._listRemindItem()];
  localStorage.setItem(itemKey, JSON.stringify(items));
  //console.log(newRemindItem);
  return newRemindItem;
}

export function createRemindItem(id, setting) {
  return new Promise((resolve, reject) => {
    resolve(_createRemindItem(setting, id));
  });
}

export function clearItems() {
  return new Promise((resolve, reject) => {
    _clearItem();
    resolve();
  });
}

function _clearItem() {
  localStorage.removeItem(itemKey);
  return;
}

export function setRemindItem(id, setting) {
  return new Promise((resolve, reject) => {
    _setRemindItem(id, setting);
    resolve();
  });
}

function _setRemindItem(id, setting) {
  const items = _listRemindItem().map((p) => {
    if (p.id === id) {
      if (p[setting.toLowerCase()]) {
        p[setting.toLowerCase()] = false;
      } else {
        p[setting.toLowerCase()] = true;
      }
    }
    return p;
  });
  //console.log(items);
  localStorage.setItem(itemKey, JSON.stringify(items));
}

export function storeItemName(id, name) {
  return new Promise((resolve, reject) => {
    _storeItemName(id, name);
    resolve();
  });
}

function _storeItemName(id, Name) {
  const items = _listRemindItem().map((p) => {
    if (p.id === id) {
      p["Name"] = Name;
    }
    return p;
  });
  //console.log(items);
  localStorage.setItem(itemKey, JSON.stringify(items));
}
