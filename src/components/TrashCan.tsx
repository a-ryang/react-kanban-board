import { useState } from "react";
import { Trash } from "lucide-react";

import useCards from "@/hooks/useCards";

import { Card } from "./ui/Card";

export default function TrashCan() {
  const { handleRemoveCard } = useCards();
  const [isActive, setIsActive] = useState(false);

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsActive(true);
  }

  function handleDragLeave() {
    setIsActive(false);
  }

  function handleDragEnd(event: React.DragEvent) {
    const cardId = event.dataTransfer.getData("cardId");

    handleRemoveCard(cardId);

    setIsActive(false);
  }

  return (
    <Card
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 w-56 h-56 shrink-0 flex justify-center items-center rounded border text-3xl ${
        isActive
          ? "border-red-600 bg-red-800/20 text-red-600"
          : "birder-red-400 text-neutral-500"
      }`}>
      <Trash />
    </Card>
  );
}
