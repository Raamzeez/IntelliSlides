import axios from "axios";
import iSearchResult from "../models/searchResult";

const getImage = async (search: string, key: string, cx: string) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          q: search,
          key,
          cx,
          num: 1,
          searchType: "image",
        },
      }
    );
    const data: iSearchResult = response.data;
    return data.items[0].link;
  } catch (err) {
    console.error(err);
  }
};

export default getImage;
