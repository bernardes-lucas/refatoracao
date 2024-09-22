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
    volumeCredits = volumeCredtisFor(perf)

    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function amountFor(perf: Performance) {
  let thisAmount = 0;

  switch (playFor(perf).type) {
    case "tragedy":
      thisAmount = 40000
      if (perf.audience > 30) 
        thisAmount += 1000 * (perf.audience - 30)
      break;
    case "comedy":
      thisAmount = 30000
      if (perf.audience > 20) 
        thisAmount += 10000 + 500 * (perf.audience - 20)
      thisAmount += 300 * perf.audience
      break;
    default:
      return 0;
  }

  return thisAmount
}

function playFor(perf: Performance) {
  return plays[perf.playID];
}

function volumeCredtisFor(perf: Performance) {
  let volumeCredits = 0
  volumeCredits += Math.max(perf.audience - 30, 0)
  if (playFor(perf).type === "comedy")
    volumeCredits += Math.floor(perf.audience / 5)
  return volumeCredits
}
