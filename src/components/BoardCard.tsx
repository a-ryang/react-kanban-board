import { Card as CardType } from "@/types/Card";

import { Card, CardContent } from "./ui/Card";
import DropIndicator from "./DropIndicator";

type Props = CardType & {
  onDragStart: (event: React.DragEvent, card: CardType) => void;
};

export default function BoardCard({ title, id, column, onDragStart }: Props) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <Card
        draggable
        onDragStart={(e) => onDragStart(e, { id, column, title })}
        className="cursor-grab active:cursor-grabbing">
        <CardContent className="pt-6 ">
          <p className="text-sm">{title}</p>
        </CardContent>
      </Card>
    </>
  );
}
