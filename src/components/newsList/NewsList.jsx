import React from "react";
import { Link } from "react-router-dom";
import CommentItem from "../comment/CommentItem";

export default function NewsList({ news }) {
  return (
    <div>
      {news.map((n) => (
        <div className="newItem" key={n.id}>
          <p> {n.title} </p>
          <p>{n.category}</p>
          <p>
            Comments : <Link to={`/${n.id}`}> Ajouter Commentaire</Link>
          </p>
          {n.comments && (
            <ul>
              {n.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
