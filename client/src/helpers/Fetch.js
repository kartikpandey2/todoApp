const baseUrl = "http://localhost:9900";

const Fetch = async (path, options) => {
  const url = `${baseUrl}${path}`;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
  try {
    const res = await fetch(url, {
      headers,
      method: "POST",
      ...options
    });
    return Promise.resolve(res.json());
  } catch (e) {
    return Promise.reject(e);
  }
};

export default Fetch;
