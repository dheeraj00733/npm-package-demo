// Demonstration Syntax Error File
// Intentional syntax error near line 4 to show DevCheck precise line and column diagnostics
function calculateTotal(price, tax) {
  const subtotal = price + tax;
  if (subtotal == ) {
    return 0;
  }
  return subtotal;
}

module.exports = { calculateTotal };
