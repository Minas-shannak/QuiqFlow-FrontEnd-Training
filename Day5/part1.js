"use strict"

async function fetchData() {
    const apiUrl = "https://api.magicthegathering.io/v1/cards";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        displayCards(data.cards);

        console.log(data);
        console.log(missingCard);

    } catch (error) {
        alert("An error occurred:");
        console.log('An error occurred', error);
    }
}

    let missingCard = 0;
    let cardCount = 0;

    const mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    mainContainer.style.marginLeft = "270px";
    mainContainer.style.display = "grid";
    mainContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    mainContainer.style.gap = "30px";
    mainContainer.style.padding = "20px";

// side Part
    const sidePart = document.createElement("div");
    sidePart.classList.add("side-part");
    sidePart.style.width = "270px";
    sidePart.style.position = "fixed";
    sidePart.style.top = "20px";
    sidePart.style.display = "flex";
    sidePart.style.flexDirection = "column";
    sidePart.style.alignItems = "center";
    sidePart.style.height = "95%";
    sidePart.style.border = "1px solid #aaa";
    sidePart.style.borderRadius = "10px";
    sidePart.style.gap = "10px";

    // or sidePart.style.cssText = "position: fixed; top: 20px; display: flex; flex-direction: column; align-items: center; padding: 10px; height: 95%; border: 1px solid #aaa; border-radius: 10px;";

    const sidePartTitle = document.createElement("p");
    sidePartTitle.textContent = `Magic cards`.toUpperCase();
    sidePartTitle.style.fontWeight = "bold";

    const counterDisplay = document.createElement("p");
    counterDisplay.textContent = `Selected Cards: ${cardCount}`;
    counterDisplay.style.fontWeight = "bold";


    const selectAllButton = document.createElement("button");
    selectAllButton.textContent = "Select All";
    selectAllButton.style.padding = "10px 20px";
    selectAllButton.style.backgroundColor = "#4CAF50";
    selectAllButton.style.color = "white";
    selectAllButton.style.borderRadius = "5px";
    selectAllButton.style.border = "none";
    selectAllButton.style.cursor = "pointer";
    selectAllButton.style.minWidth = "120px";

    const deselectAllButton = document.createElement("button");
    deselectAllButton.textContent = "Deselect All";
    deselectAllButton.style.padding = "10px 20px";
    deselectAllButton.style.backgroundColor = "#f44336";
    deselectAllButton.style.color = "white";
    deselectAllButton.style.borderRadius = "5px";
    deselectAllButton.style.border = "none";
    deselectAllButton.style.cursor = "pointer";
    deselectAllButton.style.minWidth = "120px";

    document.body.appendChild(mainContainer);

    document.body.appendChild(sidePart);
    sidePart.appendChild(sidePartTitle);
    sidePart.appendChild(counterDisplay);
    sidePart.appendChild(selectAllButton);
    sidePart.appendChild(deselectAllButton);

// cards
function displayCards(cards) {    
    mainContainer.innerHTML = ''; 

    cards.forEach(card => {

        if (!card.imageUrl) {
            missingCard++; 
            return;
        }

        const cardElement = document.createElement('div');
        cardElement.style.position = "relative";
        cardElement.style.border = "1px solid #aaa";
        cardElement.style.padding = "20px";
        cardElement.style.borderRadius = "10px";
        cardElement.style.textAlign = "center";

        const cardImage = document.createElement('img');
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name;
        cardImage.classList.add('cardimage');
        cardImage.style.width = '100%';
        cardImage.style.height = 'auto';
        cardImage.style.borderRadius = '10px';

        const cardTitle = document.createElement('h4');
        cardTitle.textContent = card.name || 'Unknown Card';

        const cardType = document.createElement('p');
        cardType.style.fontSize = '13px';
        cardType.textContent =  `type : ${card.type || 'No description available'}`;
        const cardDescription = document.createElement('p');
        cardDescription.style.fontSize = '13px';
        cardDescription.style.marginBottom = '40px';
        cardDescription.textContent = card.text || 'No description available';

        const cardButton = document.createElement('button');
        cardButton.classList.add("card-select-button");
        cardButton.textContent = "Select";
        cardButton.style.position = "absolute";
        cardButton.style.bottom = "10px";
        cardButton.style.transform = "translateX(-50%)";
        cardButton.style.padding = "10px 20px";
        cardButton.style.backgroundColor = "#4CAF50";
        cardButton.style.color = "white";
        cardButton.style.borderRadius = "5px";
        cardButton.style.border = "none";
        cardButton.style.cursor = "pointer";
        

        cardElement.appendChild(cardImage);
        cardElement.appendChild(cardTitle);
        cardElement.appendChild(cardType);
        cardElement.appendChild(cardDescription);
        cardElement.appendChild(cardButton);

        mainContainer.appendChild(cardElement);


        SelectCard(cardButton , cardElement);
        addHoverEffectToAllButtons();
        
    });

}

fetchData();


// add Events

function SelectCardLogic(button, cardElement, select) {
    const isCurrentlySelected = button.dataset.selected === "true";

    if (select && !isCurrentlySelected) {
        button.textContent = "Deselect";
        button.style.background = "blue";
        cardElement.style.background = "#afafaf";
        button.dataset.selected = "true";
        cardCount++;
    } else if (!select && isCurrentlySelected) {
        button.textContent = "Select";
        button.style.background = "#4CAF50";
        cardElement.style.removeProperty("background");
        button.dataset.selected = "false";
        cardCount--;
    }

    counterDisplay.textContent = `Selected Cards: ${cardCount}`;
}

function SelectCard(button, cardElement) {
    button.dataset.selected = "false";

    button.addEventListener('click', () => {
        const toSelect = button.dataset.selected !== "true";
        SelectCardLogic(button, cardElement, toSelect);
    });
}

selectAllButton.addEventListener('click', () => {
    const allButtons = mainContainer.querySelectorAll('.card-select-button');
    allButtons.forEach(button => {
        const cardElement = button.closest('div'); 
        SelectCardLogic(button, cardElement, true);
    });
});

deselectAllButton.addEventListener('click', () => {
    const allButtons = mainContainer.querySelectorAll('.card-select-button');
    allButtons.forEach(button => {
        const cardElement = button.closest('div');
        SelectCardLogic(button, cardElement, false);
    });
});

//Additional event
function addHoverEffectToAllButtons() {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.border = "1px solid black"
        });

        button.addEventListener('mouseleave', () => {
            button.style.border = " none";
        });
    });
}


// Responsive layout
function applyResponsiveLayout() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        mainContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
        mainContainer.style.margin = "80px 10px 10px 10px";

        sidePart.style.top = "0";
        sidePart.style.left = "0";
        sidePart.style.background="white";
        sidePart.style.width = "auto";
        sidePart.style.height = "auto";
        sidePart.style.flexDirection = "row";
        sidePart.style.fontSize = "10px";
        sidePart.style.margin = "10px";
        sidePart.style.padding = "10px";

        selectAllButton.style.fontSize = "10px"
        selectAllButton.style.minWidth = "30px"
        deselectAllButton.style.fontSize = "10px"
        deselectAllButton.style.minWidth = "30px"

    } else if (screenWidth <= 1024) {
        mainContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
        mainContainer.style.marginLeft = "270px";
        sidePart.style.position = "fixed";
        sidePart.style.width = "270px";
        sidePart.style.flexDirection = "column";
        sidePart.style.justifyContent = "flex-start";
    } else {
        mainContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
        mainContainer.style.marginLeft = "270px";
        sidePart.style.position = "fixed";
        sidePart.style.width = "270px";
        sidePart.style.flexDirection = "column";
        sidePart.style.justifyContent = "flex-start";
    }
}

applyResponsiveLayout();
window.addEventListener("resize", applyResponsiveLayout);

