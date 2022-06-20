import styled from "styled-components";
import { Todo } from "../types";
import TodoCard from "./TodoCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  margin: 20px;
  padding: 36px;
  background-color: #dedede;
`;

interface TodoCardStackProps {
  cards: Todo[];
  title: string;
  onStatusChange: (id: number, isComplete: boolean, note: string) => void;
  onCardEdit: (id: number, completed: boolean, note: string) => void;
}

const TodoCardStack = ({
  cards,
  title,
  onStatusChange,
  onCardEdit,
}: TodoCardStackProps) => {
  return (
    <Wrapper>
      <h2>{title}</h2>

      {cards.map((card: Todo) => (
        <TodoCard
          key={card.id}
          id={card.id}
          note={card.note}
          completed={card.completed}
          onStatusChange={onStatusChange}
          onCardEdit={onCardEdit}
        />
      ))}
    </Wrapper>
  );
};

export default TodoCardStack;
