import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {

    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};


export const createAlertBarExtraContent = (arr, callback) => {
  const extra = [];
  arr.map((value, key) => extra.push(callback(value, key)));
  return extra;
};

export const createAlertBarExtraContentFromObject = (obj) => {
  const extra = [];
  Object.keys(obj).map((key) => extra.push(`${key} - ${obj[key]}`));
  return extra;
};