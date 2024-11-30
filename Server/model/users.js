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
     .select("*, activityLogs(*)", { count: "estimated" });
   
     
   
    //   if (error) {
    //   console.error("Error fetching users:", error.message);
    //   return {
    //     isSuccess: false,
    //     message: error.message,
    //     data: [],
    //     total: 0,
    //   };
    // }

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
        activityLogs: user.activityLogs,
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
}//end of add function

// //function for handling when a new activty log is added
// /**
//  * Add an activity log to a user
//  * @param {number} userId
//  * @param {object} activityLog
//  * @returns {Promise<DataEnvelope<User>>}
//  */
// async function addActivityLog(userId, activityLog) {
//   // Fetch the current activity logs
//   const { data: user, error: fetchError } = await conn
//     .from("users")
//     .select("activityLogs")
//     .eq("id", userId)
//     .single();

//   if (fetchError) {
//     return {
//       isSuccess: false,
//       message: fetchError.message,
//       data: null,
//     };
//   }

//   // Add the new activity log
//   const updatedActivityLogs = [...user.activityLogs, activityLog];

//   // Update the user's activity logs
//   await conn
//     .from("users")
//     .update({ activityLogs: updatedActivityLogs })
//     .eq("id", userId)
//     .select("*")
//     .single();

//   //Insert the activity log into the `activityLogs` table
//   const { data, error: logError } = await conn
//     .from("activityLogs")
//     .insert([
//       {
//         userId: userId,
//         date: activityLog.date,
//         activity: activityLog.activity,
//         duration: activityLog.duration,
//         distance: activityLog.distance,
//         calories: activityLog.calories,
//       },
//     ])
//     .select("*")
//     .single();

//   if (logError) {
//     return {
//       isSuccess: false,
//       message: logError.message,
//       data: null,
//     };
//   }

//   return {
//     isSuccess: true,
//     data: data,
//   };
// }


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
  const { data, error } = await conn
    .from("users")
    .update({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      adminAccess: user.adminAccess,
    })
    .eq("id", id)
    .select("*")
    .single();

  // if (user.activityLogs?.length) {
  //   await conn
  //     .from("activityLogs")
  //     .upsert(
  //       user.activityLogs.map((activityLog) => ({
  //         userId: data.id,
  //         date: activityLog.date,
  //         activity: activityLog.activity,
  //         duration: activityLog.duration,
  //         calories: activityLog.calories,
  //         distance: activityLog.distance,
  //       }))
  //     )
  //     .select("*");
  // }

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  }
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("users")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}



/**
 * Add an activity log to a user
 * @param {number} userId
 * @param {object} activityLog
 * @returns {Promise<DataEnvelope<User>>}
 */
async function addActivityLog(userId, activityLog) {
  // Fetch the current activity logs
  const { data: user, error: fetchError } = await conn
    .from("users")
    .select("activityLogs")
    .eq("id", userId)
    .single();

  if (fetchError) {
    return {
      isSuccess: false,
      message: fetchError.message,
      data: null,
    };
  }

  // Add the new activity log
  const updatedActivityLogs = [...user.activityLogs, activityLog];

  // Update the user's activity logs
  const { data, error } = await conn
    .from("users")
    .update({ activityLogs: updatedActivityLogs })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
    };
  }

  return {
    isSuccess: true,
    data: data,
  };
}

/**
 * Remove an activity log from a user
 * @param {number} userId
 * @param {object} activityLog
 * @returns {Promise<DataEnvelope<User>>}
 */
async function removeActivityLog(userId, activityLog) {
  // Fetch the current activity logs
  const { data: user, error: fetchError } = await conn
    .from("users")
    .select("activityLogs")
    .eq("id", userId)
    .single();

  if (fetchError) {
    return {
      isSuccess: false,
      message: fetchError.message,
      data: null,
    };
  }

  // Remove the activity log
  const updatedActivityLogs = user.activityLogs.filter(
    (log) =>
      log.date !== activityLog.date || log.activity !== activityLog.activity
  );

  // Update the user's activity logs
  const { data, error } = await conn
    .from("users")
    .update({ activityLogs: updatedActivityLogs })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
    };
  }

  return {
    isSuccess: true,
    data: data,
  };
}

/**
 * Update an activity log for a user
 * @param {number} userId
 * @param {object} activityLog
 * @returns {Promise<DataEnvelope<User>>}
 */
async function updateActivityLog(userId, activityLog) {
  // Fetch the current activity logs
  const { data: user, error: fetchError } = await conn
    .from("users")
    .select("activityLogs")
    .eq("id", userId)
    .single();

  if (fetchError) {
    return {
      isSuccess: false,
      message: fetchError.message,
      data: null,
    };
  }

  // Update the activity log
  const updatedActivityLogs = user.activityLogs.map((log) =>
    log.date === activityLog.date && log.activity === activityLog.activity
      ? activityLog
      : log
  );

  // Update the user's activity logs
  const { data, error } = await conn
    .from("users")
    .update({ activityLogs: updatedActivityLogs })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
    };
  }

  return {
    isSuccess: true,
    data: data,
  };
}





module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
  addActivityLog,
  removeActivityLog,
  updateActivityLog,
  //addActivityLog,
};
