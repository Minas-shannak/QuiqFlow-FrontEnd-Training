/*
*
* Given an array representing prices of the stock on different days,
* find the maximum profit that can be earned by performing maximum of
* one transaction. A transaction consists of activity of buying and
* selling the stock on different or same days.
*
*/
/*
*
* For example in this array - {100, 80, 120, 130, 70, 60, 100, 125}
* the price of the stock on day-1 is 100, on day-2 is 80 and so on.
* The maximum profit that could be earned in this window is 65
* (buy at 60 and sell at 125).
* For price array - {100, 80, 70, 65, 60, 55, 50}, maximum profit
* that could be earned is 0.
*
*/
// Feel free to add helper functions if needed
  // Example usage:
  // console.log(maximumProfit([100, 80, 120, 130, 70, 60, 100, 125])); // 65
  // console.log(maximumProfit([100, 80, 70, 65, 60, 55, 50])); // 0 (edited)
  
  var maximumProfit = function(prices) {
    if (prices.length === 0) return 0;
    let minPrice = prices[0];
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
      let profit = prices[i] - minPrice;
      maxProfit = Math.max(maxProfit, profit);
      minPrice = Math.min(minPrice, prices[i]);
    }
    return maxProfit;
  };
  
/*
The following iterative sequence is defined for the set of positive integers:
n → n/2 (n is even)
n → 3n + 1 (n is odd)
Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
Which starting number, under one million, produces the longest chain?
NOTE: Once the chain starts the terms are allowed to go above one million.
*/

let CollatzProblem = function(n){
    let integer = n;
    let sequence = [n];
    while(integer != 1){
        if(integer % 2 == 0){
            integer = integer / 2;
            sequence.push(integer);
            }else {
            integer = integer * 3 + 1;
            sequence.push(integer);
            }
    }

    return sequence.join(" → ");
}

console.log(CollatzProblem(13));