export function calculateUtilization(data) {
  const [categories, transactions] = data;

  // Step 1: Map each category to include its transaction details
  const results = categories.map((category) => {
    const matchingTransaction = transactions.find(
      (tx) => tx.category === category.name && tx.type === category.type
    );

    // Calculate total amount from matching transaction
    const totalAmount = matchingTransaction?._sum?.amount || 0;

    // Calculate utilization
    const utilization = category.amount
      ? ((totalAmount / category.amount) * 100).toFixed(2)
      : null;

    return {
      category: category.name,
      type: category.type,
      budget: category.amount,
      totalAmount,
      utilization: utilization || "No Budget Set",
    };
  });

  return results;
}

// console.log(calculateUtilization(data));
