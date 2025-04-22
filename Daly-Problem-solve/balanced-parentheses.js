/*
Today's Problem – Balanced Parentheses
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */


//  Step 1:
/*
 function balancedParens(text) {
    let count = 0;
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char === '(') {
        count++;
      } else if (char === ')') {
        count--;
        if (count < 0) {
          return false;
        }
      }
    }
  
    return count === 0;
  }
  */

// Step 2 & 3:
function balancedParens(text) {
    const block = [];
    const pairs = {
      ')': '(',
      ']': '[',
      '}': '{'
    };
  
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
  
      if (char === '(' || char === '[' || char === '{') {
        block.push(char);
      } else if (char === ')' || char === ']' || char === '}') {
        const last = block.pop();
        if (last !== pairs[char]) {
          return false;
        }
      }
    }
  
    return block.length === 0;
  }
  
  console.log(balancedParens('[({})]'));
  console.log(balancedParens('[(]{)}'));

  console.log(balancedParens(' var wow  = { yo: thisIsAwesome() }')); 
  console.log(balancedParens(' var hubble = function() { telescopes.awesome();')); 
