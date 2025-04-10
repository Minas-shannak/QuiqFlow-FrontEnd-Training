// Implement a function factory using closures.

"use strict";

function Person(name, age, gender) {
    let address = {
      street: "Default Street",
      city: "Default City",
      zip: "00000" ,
    };
    //I declared the address object inside the factory function so it's private and only accessible via closures.

    const updateAddress = (street, city, zip) =>  address = { street, city, zip };
    const greet = () => console.log(`Hello, my name is ${name} and I am ${age} years old.`);
    const getAddress = () => address;
  
    return {
      name,
      age,
      gender,
      greet,
      updateAddress,
      getAddress,
    };
  }

  const personOne = Person("Minas", 23, "female");
  const personTwo = Person("Tariq", 30, "male");

  
  //for testing
  /*
  personOne.greet();
  personTwo.greet();
  personOne.updateAddress("Street", "Amman", "12345");
  console.log(personOne.getAddress().city);
  console.log(personTwo.getAddress().city);
  */
 
 