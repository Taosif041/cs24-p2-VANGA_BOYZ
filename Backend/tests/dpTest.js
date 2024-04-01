function minCostDP(items, totalCapacity) {
    // Initialize DP table
    const dp = Array.from({ length: totalCapacity + 1 }, () => Array.from({ length: items.length+1 }, () => ({
        cost: Infinity,
        itemCount: Infinity,
        capacityTaken: 0
    })));
    dp[0][0] = { cost: 0, itemCount: 0 }; // Base case

    // Build the DP table
    for (let i = 0; i < items.length; i++) {
        for (let j = totalCapacity; j >= 0; j--) {
            for (let k = 0; k <= Math.min(j, items[i].c); k++) {
                let newCost = dp[j - k][i].cost + items[i].a + items[i].b * k;
                let newItemCount = dp[j - k][i].itemCount + 1;
                if (newCost < dp[j][i+1].cost || (newCost === dp[j][i+1].cost && newItemCount < dp[j][i+1].itemCount)) {
                    dp[j][i+1] = { cost: newCost, itemCount: newItemCount, capacityTaken: k};
                    console.log(i,j,k,newCost,newItemCount);
                }
                if (dp[j][i].cost < dp[j][i+1].cost || (dp[j][i].cost  === dp[j][i+1].cost && dp[j][i].itemCount < dp[j][i+1].itemCount)) {
                    dp[j][i+1] = dp[j][i];
                }
            }
        }
    }
    console.log(dp[totalCapacity][items.length]);
  
    // Backtrack to find the solution
    let remainingCapacity = totalCapacity;
    const usedItems = [];
    let i = items.length;
    console.log(i,remainingCapacity);
    while (remainingCapacity > 0 && i > 0) {
        const capacityTaken = dp[remainingCapacity][i].capacityTaken;
    console.log(i,remainingCapacity);

        if (capacityTaken > 0) {
            const itemIndex = i - 1;
            const usedCapacity = capacityTaken;
            const itemCost = items[itemIndex].a + items[itemIndex].b * usedCapacity;
            usedItems.push({ itemIndex, usedCapacity, itemCost });
            remainingCapacity -= usedCapacity;
        }
        i--;
    }
    console.log(usedItems);
  
    return { totalCost: dp[totalCapacity][items.length].cost, usedItems };
  }
  
  // Example usage:
  const items = [
    { a: 20, b: 2, c: 10 }, // a: initial cost, b: per unit cost, c: maximum capacity
    { a: 20, b: 3, c: 15 },
    { a: 15, b: 4, c: 120 },
    // ... add more items as needed
  ];
  const totalCapacity = 1000; // The total capacity you want to achieve
  
const result = minCostDP(items, totalCapacity);
console.log('Total Cost:', result.totalCost);
console.log('Used Items:', result.usedItems.map(item => `Item ${item.itemIndex} with ${item.usedCapacity} capacity`));