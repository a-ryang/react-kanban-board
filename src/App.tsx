import BoardContainer from "./components/BoardContainer";
import { CardProvider } from "./contexts/CardContext";

export default function App() {
  return (
    <main className="h-svh">
      <CardProvider>
        <BoardContainer />
      </CardProvider>
    </main>
  );
}
