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
  // return {
  //   isSuccess: true,
  //   data: data.items,
  // };
   const { data, error, count } = await conn
      .from("users")
      .select("*")
      .order("id", { ascending: true });
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
  const { data, error } = await conn
    .from("users")
    .select("*, activityLogs(*)")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };

  // const user = data.items.find((user) => user.id == id);
  // if (!user) {
  //   return {
  //     isSuccess: false,
  //     message: "User not found",
  //     data: null,
  //   };
  // }
  // return {
  //   isSuccess: true,
  //   data: user,
  // };

  // const { data, error } = await conn.from("users").select("*").eq("id", id);
  // return {
  //   isSuccess: !error,
  //   message: error?.message,
  //   data: data[0],
  // };
}

/**
 * Add a user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
  const { data, error } = await conn
    .from("users")
    .insert([
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        adminAccess: user.adminAccess,
      },
    ])
    .select("*")
    .single();

  if (user.activityLogs?.length) {
    await conn
      .from("activityLogs")
      .insert(
        user.activityLogs.map((activityLog) => ({
          userId: data.id,
          date: activityLog.date,
          activity: activityLog.activity,
          duration: activityLog.duration,
          calories: activityLog.calories,
          distance: activityLog.distance,
        }))
      )
      .select("*");
  }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };

  // const id = data.items.length + 1;
  // user.id = id;
  // data.items.push(user);
  // return {
  //   isSuccess: true,
  //   data: user,
  // };
  // const { data, error } = await conn.from("users").insert([user]);
  // return {
  //   isSuccess: !error,
  //   message: error?.message,
  //   data: data,
  // };
}//end of add function

async function seed() {
  for (const user of data.items) {
    await add(user);
  }
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
  seed,
};
