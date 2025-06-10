import axios from "axios";
import md5 from "md5";
import { ENDPOINT, KEY } from "@/configs/marvel_app";

export async function fetchMarvelData(type, extraParams = {}) {
  const ts = Date.now().toString();
  const hash = md5(ts + KEY.PRIVATE_KEY + KEY.PUBLIC_KEY);

  const url = ENDPOINT[type.toUpperCase()];

  try {
    const res = await axios.get(url, {
      params: {
        ts,
        apikey: KEY.PUBLIC_KEY,
        hash,
        ...extraParams,
      },
    });

    return res.data.data;
  } catch (error) {
    console.error("Marvel API Error:", error.response?.data || error.message);
    throw error;
  }
}
