import BoardColumn from "./BoardColumn";
import TrashCan from "./TrashCan";

export default function BoardContainer() {
  return (
    <section className="flex h-full w-full gap-3 overflow-scroll p-12">
      <h1 className="hidden">Board</h1>
      <BoardColumn
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-700"
      />
      <BoardColumn title="TODO" column="todo" headingColor="text-yellow-700" />
      <BoardColumn
        title="In progress"
        column="doing"
        headingColor="text-blue-700"
      />
      <BoardColumn
        title="Complete"
        column="done"
        headingColor="text-emerald-700"
      />
      <TrashCan />
    </section>
  );
}
