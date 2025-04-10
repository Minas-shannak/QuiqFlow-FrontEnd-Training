//Develop a structured "Hello, World!" program with variable declarations.
"use strict"; 

let name = "World";
console.log(`Hello , ${name} !`);

// Implement a menu-driven program using conditionals and loops.
function showMenu() {
    let userChoice;
    do {
        userChoice = prompt("Choose an option:\n1. Show a welcome message\n2. Show today's date\n3. Show current time\n4. Exit");
        
        if (userChoice === null) {
            alert("Exiting the program...");
            break;
            }
            
        userChoice = parseInt(userChoice);

        if (userChoice === 1) {
            alert("Welcome to the program!");
        } else if (userChoice === 2) {
            const today = new Date();
            alert(`Today's date is: ${today.toLocaleDateString()}`);
        } else if (userChoice === 3) {
            const now = new Date();
            alert(`Current time is: ${now.toLocaleTimeString()}`);
        } else if (userChoice === 4) {
            alert("Exiting the program...");
            break;
        } else {
            alert("Invalid option, please try again.");
        }
    } while (true);
}
showMenu();