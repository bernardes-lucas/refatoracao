import { Invoice, invoices, Performance } from "./data/invoices";
import { plays } from "./data/plays";

console.log(statement(invoices))

function statement(invoice: Invoice) {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances){
    result += ` ${playFor(perf).name}: ${formatToUSD(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${formatToUSD(calculateTotalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
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

  return thisAmount / 100
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

function formatToUSD(amount: number) {
  return new Intl.NumberFormat(
    "en-US", 
    { style: "currency", currency: "USD", minimumFractionDigits: 2 }
  ).format(amount)
}

function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoices.performances) {
    volumeCredits = volumeCredtisFor(perf)
  }

  return volumeCredits
}

function calculateTotalAmount() {
  let totalAmount = 0;
  for (let perf of invoices.performances){
    totalAmount += amountFor(perf);
  }
  return totalAmount
}
