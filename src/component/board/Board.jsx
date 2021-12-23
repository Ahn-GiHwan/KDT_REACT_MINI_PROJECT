import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "reactstrap";
import InfoTable from "../common/InfoTable";
import { BoardTitle, Container, Main } from "../../css/style";
import { fetchGetBoardList, fetchUpViewCount } from "../../utils/boardFetch";
import Swal from "sweetalert2";
import Loading from "../common/Loading";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Board = () => {
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user);

  const getBoradList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { json } = await fetchGetBoardList();
      setBoardList(json);
      setData(json === [] ? null : json);
    } catch ({ response }) {
      Swal.fire("통신에러", response.statusText, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changeValue = () => {
    const content = ref.current.value;
    setBoardList(data.filter((post) => post.title.includes(content)));
  };

  const boardDetail = async (id, title, content) => {
    await fetchUpViewCount(id);
    setData(
      data.map((post) => {
        if (post.id === id) post.view_count += 1;
        return post;
      })
    );
    changeValue();
    Swal.fire({ title, text: content });
  };

  const goCreateBoard = () => {
    if (userInfo?.user_email) history.push("/board/create");
    else Swal.fire({ title: "로그인 후 가능합니다.", icon: "error" });
  };

  useEffect(() => {
    getBoradList();
  }, [getBoradList]);

  return (
    <Container>
      <Main>
        <div>
          <BoardTitle>
            <h2>게시판({boardList.length})</h2>
            <Button
              color="danger"
              onClick={goCreateBoard}
              style={{ margin: 0 }}
            >
              글쓰기
            </Button>
          </BoardTitle>
          <Input
            innerRef={ref}
            onChange={changeValue}
            placeholder="ex) 공지 사항"
          />
        </div>
        <InfoTable
          style={{ marginTop: "20px" }}
          type="board"
          bodyList={boardList}
          clickEvent={boardDetail}
        />
        {isLoading && <Loading />}
      </Main>
    </Container>
  );
};

export default Board;
