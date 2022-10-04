import AdminUserSchema from "./User.schema.js";

// create user
export const createAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

// get user by id
export const getAdminUserById = (id) => {
  return AdminUserSchema.findById(_id);
};

// get one user by filter
export const getAdminUser = (filter) => {
  return AdminUserSchema.findOne(filter);
};

// get all users by filter
export const getAllAdminUsers = (filter) => {
  return AdminUserSchema.find(filter);
};

// update user
export const updateAdminUser = (filter, obj) => {
  return AdminUserSchema.findOneAndUpdate(filter, obj, { new: true });
};

// delete user
export const deleteAdminUser = (filter) => {
  return AdminUserSchema.findOneAndDelete(filter);
};
