import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputPost } from "../../interfaces/interfaces";
import { createPost } from "../../store/services/postService";
import { searchPost } from "../../store/features/postSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const nameMaxLength = 250;
const descriptionMaxLength = 5000;

function PostForm() {
  const [input, setInput] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const target = event.target as HTMLInputElement;
    setErrors((prev) => {
      return { ...prev, [target.name]: "" };
    });
    setInput((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const trimmedInput: InputPost = {
      name: input.name.trim(),
      description: input.description.trim(),
    };
    let pass: boolean = true;
    if (trimmedInput.name === "") {
      setErrors((prev) => {
        return { ...prev, name: "El post debe tener un nombre" };
      });
      pass = false;
    }
    if (trimmedInput.description === "") {
      setErrors((prev) => {
        return {
          ...prev,
          description: "El post debe tener una descripción",
        };
      });
      pass = false;
    }
    if (pass) {
      dispatch(createPost(trimmedInput));
      dispatch(searchPost(""));
      setInput({ name: "", description: "" });
    }
  }
  return (
    <>
      <form className="post-form dashboard-section" onSubmit={handleSubmit}>
        <textarea
          className={
            "textarea-small " + (errors.name !== "" ? "input-error" : "")
          }
          placeholder={errors.name || "Nombre"}
          name="name"
          maxLength={nameMaxLength}
          value={input.name}
          onChange={handleChange}
        />
        <textarea
          className={
            "textarea-large " + (errors.description !== "" ? "input-error" : "")
          }
          placeholder={errors.description || "Descripción"}
          name="description"
          maxLength={descriptionMaxLength}
          value={input.description}
          onChange={handleChange}
        />
        <button className="btn create-post-btn" type="submit">
          Crear
        </button>
      </form>
    </>
  );
}

export default PostForm;
