"use strict";

async function fetchData() {
    const apiUrl = "https://api.magicthegathering.io/v1/cards";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        displayCards(data.cards);
        // console.log(data);
        // console.log(missingCard);
    } catch (error) {
        alert("An error occurred:");
        console.log("An error occurred", error);
    }
}


let selectedCardIds = JSON.parse(sessionStorage.getItem("selectedCardIds")) || [];
let cardCount = selectedCardIds.length;
let missingCard = 0;

const mainContainer = document.createElement("div");
mainContainer.id = "mainContainer";
mainContainerStyle();

const sidePart = document.createElement("div");
sidePart.classList.add("side-part");
if (window.innerWidth <= 768) {
    sidePartMobileStyle();
}else{
    sidePartDesktopStyle();
}


const sidePartTitle = document.createElement("p");
sidePartTitle.textContent = `Magic cards`.toUpperCase();
sidePartTitle.style.fontWeight = "bold";

const counterDisplay = document.createElement("p");
counterDisplay.textContent = `Selected Cards: ${cardCount}`;
counterDisplay.style.fontWeight = "bold";

const selectAllButton = document.createElement("button");
selectAllButton.textContent = "Select All";
applyButtonStyle(selectAllButton, "#4CAF50");

const deselectAllButton = document.createElement("button");
deselectAllButton.textContent = "Deselect All";
applyButtonStyle(deselectAllButton, "#f44336");


sidePart.append(
    sidePartTitle,
    counterDisplay,
    selectAllButton,
    deselectAllButton
);
document.body.appendChild(mainContainer);
document.body.appendChild(sidePart);

// cards
function displayCards(cards) {
    mainContainer.innerHTML = '';

    cards.forEach(card => {
        
        // if (!card.imageUrl) {
        //     missingCard++;
        //     return;
        // }

        const cardImage = document.createElement('img');
        cardImage.alt = card.name;
        cardImage.classList.add('cardimage');
        cardImage.style.width = '100%';
        cardImage.style.height = 'auto';
        cardImage.style.borderRadius = '10px';

        cardImage.src =card.imageUrl ||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoXYrY3nkRpZo3ECGqLIeYOB1esuLmdngbQ&s';

        const cardElement = document.createElement('div');
        cardElement.id = `card-${card.id}`;
        CardStyles(cardElement);

        const cardTitle = document.createElement('h4');
        cardTitle.textContent = card.name || 'Unknown Card';

        const cardType = document.createElement('p');
        cardType.textContent = `type : ${card.type || 'No description available'}`;
        cardType.style.fontSize = '13px';

        const cardDescription = document.createElement('p');
        cardDescription.textContent = card.text || 'No description available';
        cardDescription.style.fontSize = '13px';
        cardDescription.style.marginBottom = '40px';

        const cardButton = document.createElement('button');
        cardButton.classList.add("card-select-button");
        cardButton.dataset.cardId = card.id;
        cardButton.textContent = "Select";
        cardButton.style.position = "absolute";
        cardButton.style.bottom = "10px";
        cardButton.style.transform = "translateX(-50%)";
        applyButtonStyle(cardButton, "#4CAF50", "auto");

        cardElement.append(
            cardTitle,
            cardImage,
            cardType,
            cardDescription,
            cardButton
        );
        mainContainer.appendChild(cardElement);

        SelectCard(cardButton, card.id);
        addHoverEffectToAllButtons();
    });
}





// handle select & Deselect
function SelectCardLogic(button, select, cardId) {
    const cardElement = document.getElementById(`card-${cardId}`);
    if (!cardElement) return;
    const isCurrentlySelected = button.dataset.selected === "true";

    if (select && !isCurrentlySelected) {
        button.textContent = "Deselect";
        button.style.background = "blue";
        cardElement.style.background = "#afafaf";
        button.dataset.selected = "true";
    
        if (!selectedCardIds.includes(cardId)) {
            selectedCardIds.push(cardId);
            sessionStorage.setItem("selectedCardIds", JSON.stringify(selectedCardIds));
            cardCount++;
        }

    } else if (!select && isCurrentlySelected) {
        button.textContent = "Select";
        button.style.background = "#4CAF50";
        cardElement.style.removeProperty("background");
        button.dataset.selected = "false";
    
        const previousLength = selectedCardIds.length;
        selectedCardIds = selectedCardIds.filter(id => id !== cardId);
        if (selectedCardIds.length !== previousLength) {
            sessionStorage.setItem("selectedCardIds", JSON.stringify(selectedCardIds));
            cardCount--;
        }
    }

    counterDisplay.textContent = `Selected Cards: ${cardCount}`;
}


function SelectCard(button, cardId) {
    if (selectedCardIds.includes(cardId)) {
        SelectCardLogic(button, true, cardId);
    } else {
        button.dataset.selected = "false";
    }

    button.addEventListener('click', () => {
        const toSelect = button.dataset.selected !== "true";
        SelectCardLogic(button, toSelect, cardId);
    });
}

selectAllButton.addEventListener('click', () => {
    const allButtons = mainContainer.querySelectorAll('.card-select-button');
    allButtons.forEach(button => {
        const cardId = button.dataset.cardId;
        SelectCardLogic(button, true, cardId);
    });
});

deselectAllButton.addEventListener('click', () => {
    const allButtons = mainContainer.querySelectorAll('.card-select-button');
    allButtons.forEach(button => {
        const cardId = button.dataset.cardId;
        SelectCardLogic(button, false, cardId);
    });
});


// additional effects
function addHoverEffectToAllButtons() {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.border = "1px solid black"
        });

        button.addEventListener('mouseleave', () => {
            button.style.border = "none";
        });
    });
}

// Responsive Layout
function applyResponsiveLayout() {
    if (window.innerWidth <= 768) {
        mainContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
        mainContainer.style.margin = "80px 10px 10px 10px";
        
        sidePart.removeAttribute("style");
        sidePartMobileStyle()

        selectAllButton.style.fontSize = "10px";
        selectAllButton.style.minWidth = "30px";
        deselectAllButton.style.fontSize = "10px";
        deselectAllButton.style.minWidth = "30px";

    } else {
        mainContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
        mainContainer.style.margin = "10px 10px 10px 270px";

        sidePart.removeAttribute("style");
        sidePartDesktopStyle();

        selectAllButton.style.fontSize = "15px";
        deselectAllButton.style.fontSize = "15px";

        selectAllButton.style.minWidth = "120px";
        deselectAllButton.style.minWidth = "120px";


    }
}



window.addEventListener("resize", () => {
    applyResponsiveLayout();
    mainContainer.scrollTo(0, 0); 
});

fetchData();
applyResponsiveLayout();




// styles
function sidePartMobileStyle() {
    Object.assign(sidePart.style, {
        display: "flex",
        alignItems: "center",
        border: "1px solid #aaa",
        borderRadius: "10px",
        gap: "10px",
        background: "white",
        position: "fixed",
        flexDirection: "row",
        top: "0",
        left: "0",
        width: "auto",
        height: "auto",
        fontSize: "10px",
        margin: "10px",
        padding: "10px"
    });
}

function sidePartDesktopStyle() {
    Object.assign(sidePart.style, {
        display: "flex",
        alignItems: "center",
        border: "1px solid #aaa",
        borderRadius: "10px",
        gap: "10px",
        background: "white",
        width: "270px",
        position: "fixed",
        top: "20px",
        flexDirection: "column",
        height: "95%",
    });
}

function mainContainerStyle(){
    Object.assign(mainContainer.style, {
        margin: "10px 10px 10px 270px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "30px",
        padding: "20px"
    });
}

function CardStyles(cardElement) {
    Object.assign(cardElement.style, {
        position: "relative",
        border: "1px solid #aaa",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center"
    });
}

function applyButtonStyle(button, backgroundColor, minWidth = "120px") {
    Object.assign(button.style, {
        padding: "10px 20px",
        backgroundColor: backgroundColor,
        color: "white",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        minWidth: minWidth
    });
}
