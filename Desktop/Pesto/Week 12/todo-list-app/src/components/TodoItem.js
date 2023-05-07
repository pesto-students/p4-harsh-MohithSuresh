import React from "react";
import styles from "../styles/TodoItem.module.css";
const TodoItem = ({ todo, onClick }) => {
  return (
    <li
      className={styles.item}
      onClick={onClick}
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
      }}
    >
      {todo.text}
    </li>
  );
};

export default TodoItem;
