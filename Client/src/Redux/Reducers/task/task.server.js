import axiosInstance from "../../../Api/axiosInstance";

export const getTask = async (URL) => {
  const res = await axiosInstance.get(URL);
  return res;
};
export const postTask = async (data, URL) => {
  const res = await axiosInstance.post(URL, data);

  return res;
};
export const patchaTask = async (data, URL) => {
  const res = await axiosInstance.patch(URL, data);

  return res;
};
export const deleteTask = async (URL) => {
  const res = await axiosInstance.delete(URL);

  return res;
};
