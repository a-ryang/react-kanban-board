import { useState } from "react";
import { Plus } from "lucide-react";

import useCards from "@/hooks/useCards";
import { Card } from "@/types/Card";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type Props = {
  column: string;
};

export default function AddCard({ column }: Props) {
  const { handleAddCard } = useCards();
  const [text, setText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!text.trim().length) return;

    const newCard: Card = {
      column,
      title: text.trim(),
      id: crypto.randomUUID(),
    };

    handleAddCard(newCard);
    setIsAdding(false);
  }

  return (
    <>
      {isAdding ? (
        <form onSubmit={handleSubmit}>
          <Textarea
            onChange={handleChangeText}
            autoFocus
            placeholder="Add new task..."
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAdding(false)}>
              Close
            </Button>
            <Button size="sm" type="submit">
              <span>Add</span>
              <Plus size={16} />
            </Button>
          </div>
        </form>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => setIsAdding(true)}>
          Add Card
          <Plus size={16} />
        </Button>
      )}
    </>
  );
}
