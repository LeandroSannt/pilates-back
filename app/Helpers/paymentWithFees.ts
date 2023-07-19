export function paymentWithFees(
  typeTransaction: string,
  paymentReceived: number,
  amount_installments: number
): number {
  let calc = 0;
  let taxaParc = 3.6;

  if (typeTransaction === "debito") {
    calc = paymentReceived - (1.99 / 100) * paymentReceived;
  } else if (typeTransaction === "credito") {
    if (amount_installments == 1) {
      calc = paymentReceived - (3.03 / 100) * paymentReceived;
    } else if (amount_installments == 4) {
      calc = paymentReceived - ((taxaParc + 7.33) / 100) * paymentReceived;
    } else if (amount_installments == 6) {
      calc = paymentReceived - ((taxaParc + 9.96) / 100) * paymentReceived;
    }
  } else {
    calc = paymentReceived;
  }

  return Number(calc.toFixed(2));
}
