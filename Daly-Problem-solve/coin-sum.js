/*
In England the currency is made up of pound, £, and pence, p.
There are eight coins in general circulation:

   1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

   1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

Given that total amount of pences, calculate the number of ways to create that amount.
Example:
coinCombination(200p) //-> 73682
*/

function coinCombinationRecursive(amount, coins = [1,2,5,10,20,50,100,200]) {
    let memo = {};

    function countWays(index, remaining) {
        let key = `${index}-${remaining}`;
        if (key in memo) return memo[key];

        if (remaining === 0) return 1;
        if (remaining < 0 || index === coins.length) return 0;

        let include = countWays(index, remaining - coins[index]);
        let exclude = countWays(index + 1, remaining);

        memo[key] = include + exclude;
        return memo[key];
    }

    return countWays(0, amount);
}

console.log(coinCombinationRecursive(200)); 
