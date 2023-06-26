import { useDispatch } from "react-redux";
import { deletePost } from "../../store/services/postService";
import { ThunkDispatch } from "@reduxjs/toolkit";

function PostDelete(props: { id: string }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  function handleClick() {
    dispatch(deletePost(props.id));
  }
  return (
    <>
      <p className="delete-post-p" onClick={handleClick}>
        Eliminar
      </p>
      <button className="btn hidden-btn" onClick={handleClick}>
        X
      </button>
    </>
  );
}

export default PostDelete;
