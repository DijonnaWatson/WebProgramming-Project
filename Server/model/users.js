/**@type {{items: User[]}} */
const data = require("../data/users.json");


/** *
* @typedef {import("../../Client/src/models/users").User }User
 */
 function getAll() {
     return data.items;
 }

function get(id) {
    return data.items.find((x) => x.id === id);
}

function add(user) {
    user.id = data.items.length + 1;
    data.items.push(user);
}

function update(id, user) {
    const index = data.items.findIndex((x) => x.id === id);
    data.items[index] = user;
}


function remove(id) {
    data.items = data.items.filter((x) => x.id !== id);
}

 module.exports = {
   getAll,
   get,
   add,
   update,
   remove,
 };