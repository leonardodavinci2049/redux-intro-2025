const BalanceDisplay = () => {
  return <div className="balance">{formatCurrency(123456)}</div>;
};

export default BalanceDisplay;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
