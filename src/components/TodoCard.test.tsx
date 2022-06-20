import renderer from "react-test-renderer";
import { act } from "@testing-library/react";

import TodoCard from "./TodoCard";

it("renders with completed=false", () => {
  const tree = renderer
    .create(
      <TodoCard
        id={123}
        note="some note"
        completed={false}
        onStatusChange={() => {}}
        onCardEdit={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with completed=true", () => {
  const tree = renderer
    .create(
      <TodoCard
        id={123}
        note="some note"
        completed={true}
        onStatusChange={() => {}}
        onCardEdit={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("becomes editable after clicking Edit button", () => {
  const component = renderer.create(
    <TodoCard
      id={123}
      note="some note"
      completed={true}
      onStatusChange={() => {}}
      onCardEdit={() => {}}
    />
  );

  const btn = component.root.findByType("button");

  act(() => btn.props.onClick());

  expect(component.toJSON()).toMatchSnapshot();
});
