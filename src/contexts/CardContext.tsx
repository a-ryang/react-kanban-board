import { PropsWithChildren, createContext, useState } from "react";

import { Card } from "@/types/Card";

type State = {
  cards: Card[];
};

type Action = {
  handleAddCard: (card: Card) => void;
  handleUpdateCards: (cards: Card[]) => void;
  handleRemoveCard: (cardId: string) => void;
};

export const CardContext = createContext<(State & Action) | null>(null);

export function CardProvider({ children }: PropsWithChildren) {
  const [cards, setCards] = useState(CARDS);

  function handleAddCard(card: Card) {
    setCards((prev) => [...prev, card]);
  }

  function handleUpdateCards(cards: Card[]) {
    setCards(cards);
  }

  function handleRemoveCard(cardId: string) {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }

  return (
    <CardContext.Provider
      value={{ cards, handleAddCard, handleUpdateCards, handleRemoveCard }}>
      {children}
    </CardContext.Provider>
  );
}

const CARDS: Card[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
