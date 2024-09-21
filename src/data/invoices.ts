// Define a interface para cada performance
interface Performance {
  playID: string;
  audience: number;
}

// Define a interface para o conjunto de invoices
interface Invoice {
  customer: string;
  performances: Performance[];
}

let invoices: Invoice = {
  "customer": "BigCo",
  "performances": [
    {
      "playID": "hamlet",
      "audience": 55
    },
    {
      "playID": "as-like",
      "audience": 35
    },
    {
      "playID": "othello",
      "audience": 40
    }
  ]
}

export { invoices, Invoice, Performance }
