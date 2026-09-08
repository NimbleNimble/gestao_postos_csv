export const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export const downloadFile = () => {
  window.location.href = `${API_URL}/list/export`;
};

export const getData = () => {
  return fetch(`${API_URL}/list`).then((response) => response.json());
};
