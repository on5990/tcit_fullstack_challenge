import { useEffect, useRef, useState } from "react";
import {
  selectPostSearch,
  selectPostsList,
} from "../../store/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostModel } from "../../interfaces/interfaces";
import { postsPerPage } from "../../constants/constants";
import PostDelete from "./PostDelete";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getPosts } from "../../store/services/postService";
import PostDescription from "./PostDescription";

const colWidth = { nameWidth: 4, descriptionWidth: 8, actionWidth: 3 };

function PostTable() {
  const [filteredPosts, setFilteredPosts] = useState<PostModel[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<PostModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const search = useSelector(selectPostSearch);
  const postList = useSelector(selectPostsList);
  const callBackend = useRef(true);
  useEffect(() => {
    if (!callBackend.current) return;
    console.log("Calling API ...");
    dispatch(getPosts());
    callBackend.current = false;
  }, []);
  useEffect(() => {
    const filtered: PostModel[] = postList.filter((post) =>
      post.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentIndex(0);
  }, [search, postList]);

  useEffect(() => {
    const limit = currentIndex + postsPerPage;
    setVisiblePosts(filteredPosts.slice(currentIndex, limit));
  }, [filteredPosts]);

  function handlePrevClick() {
    const newIndex = currentIndex - postsPerPage;
    if (newIndex < 0) return;
    const limit = newIndex + postsPerPage;
    setVisiblePosts(filteredPosts.slice(newIndex, limit));
    setCurrentIndex(newIndex);
  }
  function handleNextClick() {
    const newIndex = currentIndex + postsPerPage;
    if (filteredPosts.length - 1 < newIndex) return;
    const limit = newIndex + postsPerPage;
    setVisiblePosts(filteredPosts.slice(newIndex, limit));
    setCurrentIndex(newIndex);
  }
  function handleResetClick() {
    setVisiblePosts(filteredPosts.slice(0, postsPerPage));
    setCurrentIndex(0);
  }
  return (
    <table className="post-table">
      <thead className="post-table-thead">
        <tr>
          <th colSpan={colWidth.nameWidth} className="post-table-head">
            Nombre
          </th>
          <th colSpan={colWidth.descriptionWidth} className="post-table-head">
            Descripción
          </th>
          <th colSpan={colWidth.actionWidth} className="post-table-head">
            Acción
          </th>
        </tr>
      </thead>
      <tbody className="post-table-tbody">
        {visiblePosts.map((post) => {
          return (
            <tr key={post.id}>
              <td colSpan={colWidth.nameWidth}>
                <p>{post.name}</p>
              </td>
              <td colSpan={colWidth.descriptionWidth}>
                <PostDescription description={post.description} />
              </td>
              <td colSpan={colWidth.actionWidth}>
                <PostDelete id={post.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot className="pagination">
        <tr>
          <td colSpan={colWidth.nameWidth}>
            {currentIndex > postsPerPage - 1 && (
              <p className="prev" onClick={handlePrevClick}>
                {"< Anterior"}
              </p>
            )}
          </td>
          <td colSpan={colWidth.descriptionWidth}>
            {currentIndex > postsPerPage - 1 && (
              <p className="reset" onClick={handleResetClick}>
                Inicio
              </p>
            )}
            {filteredPosts.length < 1 && (
              <p className="empty-message">No hay resultados</p>
            )}
          </td>
          <td colSpan={colWidth.actionWidth}>
            {currentIndex + postsPerPage < filteredPosts.length && (
              <p className="next" onClick={handleNextClick}>
                {"Próxima >"}
              </p>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default PostTable;
