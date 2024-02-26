import { useContext } from "react";

import { CardContext } from "@/contexts/CardContext";

export default function useCards() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCards must be used within a CartContext");
  }

  return context;
}
