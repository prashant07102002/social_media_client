// localstorageManage.js
const KEY_ACCESS_TOKEN = "access_key";

function getItem(key) {
    return localStorage.getItem(key);
}

function setItem(key, value) {
    localStorage.setItem(key, value);
}

function removeItem(key) {
    localStorage.removeItem(key);
}

module.exports = {
    KEY_ACCESS_TOKEN,
    getItem,
    setItem,
    removeItem,
};
