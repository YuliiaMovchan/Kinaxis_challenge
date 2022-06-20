import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface TodoCardProps {
  id: number;
  note: string;
  completed: boolean;
  onStatusChange: (id: number, isComplete: boolean, note: string) => void;
  onCardEdit: (id: number, completed: boolean, note: string) => void;
}

interface TodoCardWrapperProps {
  completed: boolean;
}

const TodoCardWrapper = styled.div<TodoCardWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-bottom: 8px;
  border-radius: 3px;
  padding: 10px 15px;
  background-color: ${(props) => (props.completed ? "#f2f2f2" : "#d2e2df")};
  font-family: Comic Sans MS;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
`;

const TodoCardFooter = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 24px 0 0 0;
`;

const ToDoText = styled.label`
  flex: 1 1 100%;
  font-size: 1.5em;
`;

const TodoCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
`;

const TodoActionButton = styled.button`
  border: 1px solid #5c5b59;
  border-radius: 4px;
  padding: 4px 12x;
  font-family: Comic Sans MS;
`;

const TodoCard = ({
  id,
  note,
  completed,
  onStatusChange,
  onCardEdit,
}: TodoCardProps) => {
  const [isEditing, setIsEditable] = React.useState(false);
  const labelEl = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (isEditing) {
      labelEl.current?.focus();
    }
  }, [isEditing]);

  return (
    <TodoCardWrapper completed={completed}>
      <ToDoText
        ref={labelEl}
        htmlFor={String(id)}
        contentEditable={isEditing}
        suppressContentEditableWarning
      >
        {note}
      </ToDoText>
      <TodoCardFooter>
        <TodoCheckbox
          type="checkbox"
          id={String(id + note)}
          checked={completed}
          onChange={(e) => {
            const isChecked = e.target.checked;
            onStatusChange(id, isChecked, note);
          }}
        />
        <TodoActionButton
          onClick={() => {
            const isEditingNew = !isEditing;
            setIsEditable(isEditingNew);

            if (isEditing) {
              const newNote = labelEl.current
                ? labelEl.current.innerText
                : note;

              onCardEdit(id, completed, newNote);
            }
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </TodoActionButton>
      </TodoCardFooter>
    </TodoCardWrapper>
  );
};

export default TodoCard;
