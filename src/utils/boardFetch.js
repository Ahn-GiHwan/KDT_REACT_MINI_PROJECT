import axios from "axios";

export const fetchGetBoardList = async (content) => {
  const { data } = await axios.post("api/Board?type=list", {
    content,
  });

  return data;
};

export const fetchUpViewCount = async (id) => {
  const { data } = await axios.post("api/Board?type=upCount", {
    id,
  });

  return data;
};
