import React from "react";
import TodoList from "./TodoList";
import styles from "../styles/App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDo List Application</h1>

      <TodoList />
    </div>
  );
};

export default App;
