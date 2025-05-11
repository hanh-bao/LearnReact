export function formatCurrency(value: string | number) {
  const numeric =
    typeof value === "string" ? value.replace(/\D/g, "") : value.toString();
  if (!numeric) return "";
  return Number(numeric).toLocaleString("vi-VN"); // => 1.000.000
}
