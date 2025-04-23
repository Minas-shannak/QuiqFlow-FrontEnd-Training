 /**
 * Given a single input string, write a function that outputs an array of strings with every possible
 * combination of letters.
 *
 * At first, don't worry about repeated (duplicate) strings.
 *
 * What time complexity is your solution?
 *
 * Extra credit: De-duplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */

/*
function allAnagrams(str) {
    const results = [];
    function similarWords(current, remaining) {
        if (remaining.length === 0) {
            results.push(current);
            return;
            }
            for (let i = 0; i < remaining.length; i++) {
                similarWords(current + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1));
            }
        }
    similarWords('', str);
    return results;
}
    console.log(allAnagrams('abc'))
*/

function allAnagrams(str) {
    const results = [];
    function similarWords(current, remaining) {
        if (remaining.length === 0) {
            results.push(current);
            return;
        }
        const usedChars = new Set();
        for (let i = 0; i < remaining.length; i++) {
            const char = remaining[i];
            if (!usedChars.has(char)) {
                usedChars.add(char);
                similarWords(current + char, remaining.slice(0, i) + remaining.slice(i + 1));
            }
        }
    }
    similarWords('', str);
    return results;
}
console.log(allAnagrams('aab'));

//  Time complexity: 
// If all characters were unique => O(n!)

 