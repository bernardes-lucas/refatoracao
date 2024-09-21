import { Play, Plays, plays } from "./data/plays"
import { Invoice, invoices, Performance } from "./data/invoices"

console.log(statement(invoices, plays))

function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat(
    "en-US", 
    { style: "currency", currency: "USD", minimumFractionDigits: 2 }
  ).format

  for (let perf of invoice.performances){
    let play = plays[perf.playID]
    let thisAmount = amountFor(perf.audience, play.type)

    // Soma créditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0)

    // Soma um crédito extra para cada cinco espectadores de comédia
    if (play.type === "comedy")
      volumeCredits += Math.floor(perf.audience / 5)

    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function amountFor(audience: number, playType: "tragedy" | "comedy") {
  let thisAmount = 0;

  switch (playType) {
    case "tragedy":
      thisAmount = 40000
      if (audience > 30) 
        thisAmount += 1000 * (audience - 30)
      break;
    case "comedy":
      thisAmount = 30000
      if (audience > 20) 
        thisAmount += 10000 + 500 * (audience - 20)
      thisAmount += 300 * audience
      break;
    default:
      return 0;
  }

  return thisAmount
}
