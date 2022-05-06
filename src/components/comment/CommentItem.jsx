import React from "react";

export default function CommentItem({ comment }) {
  return <li> {comment.text}</li>;
}
