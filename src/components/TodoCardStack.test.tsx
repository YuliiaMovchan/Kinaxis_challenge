import renderer from "react-test-renderer";
import { Todo } from "../types";
import TodoCardStack from "./TodoCardStack";

let cards: Todo[];

beforeAll(() => {
  cards = [];
  for (let i = 0; i < 4; i++) {
    cards.push({ id: i, note: `note${i}`, completed: false });
  }
});

it("renders stack", () => {
  const tree = renderer
    .create(
      <TodoCardStack
        title="title"
        cards={cards}
        onStatusChange={() => {}}
        onCardEdit={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
