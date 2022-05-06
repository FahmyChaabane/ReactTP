import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentItem from "../components/comment/CommentItem";
import { addComment, fetchNewsById } from "../services/news.service";

export default function NewPage() {
  const [n, setN] = useState({});
  const [comment, setcomment] = useState("");
  const [added, setAdded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNewsById(id);
        setN(data);
      } catch (error) {
        console.log("err", error.message);
      }
    };

    fetchData();
  }, [id]);

  const onChangeComment = ({ target }) => {
    setcomment(target.value);
  };

  const addC = async () => {
    try {
      await addComment(id, comment);
      const data = { ...n };
      data.comments.push({
        id: data.comments[data.comments.length - 1].id + 1,
        text: comment,
      });
      setN(data);
      setAdded(true);
      setcomment("");
    } catch (error) {
      console.log("err", error.messsage);
    }
  };

  return (
    <div>
      {added && <p>Comment is added, you can add another one</p>}
      <p>Title: {n.title}</p>
      <p>Category: {n.category}</p>
      {n.comments && (
        <ul>
          {n.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
      <div>
        <p> New Comment</p>
        <input
          type="text"
          value={comment}
          placeholder="add comment"
          onChange={onChangeComment}
        />{" "}
        <button onClick={addC}>Add</button>
      </div>
    </div>
  );
}
