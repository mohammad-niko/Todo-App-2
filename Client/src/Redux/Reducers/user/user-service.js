import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postUser = async (data, URL) => {
  const res = await axios.post(`${BASE_URL}${URL}`, data);

  return res.data;
};

export const getEmailVerify = async (URL) => {
  const res = await axios.get(`${BASE_URL}${URL}`);
  return res.data;
};

export const resendEmail = async (data, URL) => {
  const res = await axios.post(`${BASE_URL}${URL}`, data);

  return {
    data: res.data,
    rateLimitReset: Number(res.headers["ratelimit-reset"]),
  };
};

export const signin = async (data, URL) => {
  const res = await axios.post(`${BASE_URL}${URL}`, data);
  return res.data;
};
