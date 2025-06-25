import request from "./request";

export const requestUser = () => {
  const USERS = async () => {
    return await request({
      url: "/user?page=1&limit=10&sortOrder=DESC&is_deleted=false",
      method: "GET",
    });
  };
  return {
    USERS,
  };
};
