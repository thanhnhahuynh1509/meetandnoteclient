export const API_URL = "//localhost:8080";

export const getConfig = () => {
  const token = localStorage.getItem("jwt-token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};
