// Define a interface para cada peça
interface Play {
  name: string;
  type: "tragedy" | "comedy"; // Tipos possíveis para "type"
}

// Define o tipo para o conjunto de peças
interface Plays {
  [key: string]: Play;
};

let plays: Plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
}

export { plays, Plays, Play }