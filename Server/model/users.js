/** @type {{ items: User[] }} */
const data = require("../data/users.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/users").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("users")
    .select("*", { count: "estimated" });

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
 const { data, error } = await conn.from("users").select("*").eq("id", id);
 return {
   isSuccess: !error,
   message: error?.message,
   data: data,
 }
}

/**
 * Add a user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
  // Ensure user.activityLogs is an array before calling reduce
  // if (!Array.isArray(user.activityLogs)) {
  //   user.activityLogs = [];
  // }

  const { data: insertedData, error } = await conn
    .from("users")
    .insert([user]);

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
    };
  }

  return {
    isSuccess: true,
    data: insertedData[0],
  };
}


/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(id, user) {
  const userToUpdate = await get(id);
  Object.assign(userToUpdate.data, user);
  return {
    isSuccess: true,
    data: userToUpdate.data,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
   const itemIndex = data.items.findIndex((user) => user.id == id)
   if (itemIndex === -1)
     throw { isSuccess: false, message: "Item not found", data: id }
   data.items.splice(itemIndex, 1);
   return { isSuccess: true, message: "Item deleted", data: id }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
