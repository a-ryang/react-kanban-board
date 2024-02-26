type Props = {
  beforeId: string | null;
  column: string;
};

export default function DropIndicator({ beforeId, column }: Props) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-blue-300 opacity-0"></div>
  );
}
