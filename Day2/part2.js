 //   Develop a dynamic user profile object and search filter using array methods.

"use strict";

// 1 Develop a dynamic user profile object
function createUserProfile(name, location, skills = []){
    let profile={
        name,
        location,
        skills,
        updateName (newName) {this.name=newName},
        updateLocation (newLocation) {this.location=newLocation},
        addSkill (newSkill) {this.skills.push(newSkill) },

        getProfile() {
            return `name: ${this.name}\n Location: ${this.location}\n Skills: ${this.skills.join(", ")}`;
        }
    };
    return profile;
    }

// 2 search filter using array methods
    const users = [
        createUserProfile("Minas", "Amman", ["JavaScript", "React"]),
        createUserProfile("Farah", "Zarqa", ["HTML", "CSS", "JavaScript"]),
        createUserProfile("Yazan", "Amman", ["Java", "Spring"]),
      ];

      function filterByLocation(city) {
        return users.filter(user => user.location.toLowerCase() === city.toLowerCase());
        }
        const ammanUsers = filterByLocation("Amman").map(user => user.name);
        console.log(ammanUsers.join("\n"));
