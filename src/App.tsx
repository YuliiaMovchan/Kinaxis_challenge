import { useEffect, useState } from "react";
import { Todo } from "./types";
import TodoCardStack from "./components/TodoCardStack";

const getTodos = async (): Promise<any[]> => {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const todos = await fetch(url).then((response) => response.json());
  return todos;
};

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const updateTodoList = (
    id: number,
    todoList: Todo[],
    completed: boolean,
    note: string
  ) => {
    const newTodoList = [...todoList];
    const todoIndex = newTodoList.findIndex((t) => {
      return t.id === id;
    });
    const todo = newTodoList[todoIndex];
    todo.completed = completed;
    todo.note = note;

    setTodoList(newTodoList);
  };

  const onStatusChange = (
    id: number,
    isComplete: boolean,
    note: string
  ): void => {
    updateTodoList(id, todoList, isComplete, note);
  };

  const onCardEdit = (id: number, completed: boolean, note: string): void => {
    updateTodoList(id, todoList, completed, note);
  };

  useEffect(() => {
    getTodos().then((todos) => {
      const todoSliced = todos
        .slice(0, 10)
        .map((t) => ({ id: t.id, completed: t.completed, note: t.title }));
      setTodoList(todoSliced);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <TodoCardStack
        cards={todoList.filter((todoCard) => !todoCard.completed)}
        title="Active"
        onStatusChange={onStatusChange}
        onCardEdit={onCardEdit}
      />
      <TodoCardStack
        cards={todoList.filter((todoCard) => todoCard.completed)}
        title="Completed"
        onStatusChange={onStatusChange}
        onCardEdit={onCardEdit}
      />
    </div>
  );
};

export default App;
