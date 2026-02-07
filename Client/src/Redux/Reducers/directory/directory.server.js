import axiosInstance from "../../../Api/axiosInstance";

export const getDir = async (URL) => {
  const res = await axiosInstance.get(URL);

  return res;
};
export const postDir = async (data, URL) => {
  console.log("URL: " + URL, "data: " + data);
  const res = await axiosInstance.post(URL, data);

  return res;
};
export const patchDir = async (data, URL) => {
  const res = await axiosInstance.patch(URL, data);

  return res;
};
export const deleteDir = async (URL) => {
  const res = await axiosInstance.delete(URL);

  return res;
};
