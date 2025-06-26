import request from "./request";

type UserQueryParams = {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
};

export const requestUser = () => {
  const USERS = async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
  }: UserQueryParams) => {
    const url = `/user?page=${page}&limit=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&is_deleted=false`;

    return await request({
      url,
      method: "GET",
    });
  };

  return {
    USERS,
  };
};
