import { useState } from "react";

import useCards from "@/hooks/useCards";
import { Card } from "@/types/Card";

import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";
import BoardCard from "./BoardCard";

type Props = {
  title: string;
  headingColor: string;
  column: string;
};

export default function BoardColumn({ title, headingColor, column }: Props) {
  const { cards, handleUpdateCards } = useCards();
  const [isActive, setIsActive] = useState(false);

  function handleDragStart(event: React.DragEvent, card: Card) {
    event.dataTransfer.setData("cardId", card.id);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    highilightIndicator(event);
    setIsActive(true);
  }

  function handleDragLeave() {
    setIsActive(false);
    clearHighlights();
  }

  function handleDragEnd(event: React.DragEvent) {
    const cardId = event.dataTransfer.getData("cardId");

    setIsActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element: indicatorElement } = getNearestIndicator(
      event,
      indicators
    );

    const before = indicatorElement.dataset.before || "-1";

    if (before === cardId) return;

    let copy = [...cards];

    let cardToTransfer = copy.find((c) => c.id === cardId);
    if (!cardToTransfer) return;
    cardToTransfer = { ...cardToTransfer, column };

    copy = copy.filter((c) => c.id !== cardId);

    const moveToBack = before === "-1";

    if (moveToBack) {
      copy.push(cardToTransfer);
    } else {
      const insertAtIndex = copy.findIndex((el) => el.id === before);
      if (insertAtIndex === undefined) return;

      copy.splice(insertAtIndex, 0, cardToTransfer);
    }

    handleUpdateCards(copy);
  }

  function highilightIndicator(event: React.DragEvent) {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const element = getNearestIndicator(event, indicators);

    element.element.style.opacity = "1";
  }

  function clearHighlights(elements?: HTMLElement[]) {
    const indicators = elements || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  }

  function getIndicators(): HTMLElement[] {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  }

  function getNearestIndicator(
    event: React.DragEvent,
    indicators: HTMLElement[]
  ) {
    const DISTANCE_OFFSET = 50;

    const element = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = event.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return element;
  }

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <section className="w-56 shrink-0">
      <header className="mb-3 flex items-center justify-between">
        <h1 className={`font-medium ${headingColor}`}>{title}</h1>
        <div className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </div>
      </header>
      <div
        className={`h-full w-full px-1 transition-colors ${
          isActive ? "bg-gray-100" : "bg-gray-800/0"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}>
        {filteredCards.map((c) => (
          <BoardCard key={c.id} onDragStart={handleDragStart} {...c} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} />
      </div>
    </section>
  );
}
