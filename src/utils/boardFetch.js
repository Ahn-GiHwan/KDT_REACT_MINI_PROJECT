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

export const fetchInserBoard = async (
  title,
  content,
  insert_user,
  write_password,
  id = "",
  view_count = 0
) => {
  const { data } = await axios.post("/api/Board?type=save", {
    title,
    content,
    insert_user,
    write_password,
    id,
    view_count,
  });

  return data;
};
