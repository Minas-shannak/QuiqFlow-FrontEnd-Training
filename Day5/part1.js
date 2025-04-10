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
        console.log(data)

    } catch (error) {
        alert("An error occurred:");
        console.log('An error occurred', error);
    }
}

    const title = document.getElementById("title");
    title.style.display="flex";
    title.style.justifyContent="center";
    title.style.alignItems="center";
    title.style.border="1px solid #aaa"
    title.style.padding="20px 5px"
    title.style.borderRadius="10px"


function displayCards(cards) {
    const cardContainer = document.getElementById('cardContainer');

    cardContainer.style.display="grid"
    cardContainer.style.gridTemplateColumns="repeat(4, 1fr)"
    cardContainer.style.gap="30px"
    cardContainer.style.padding="20px"

    cardContainer.innerHTML = ''; 

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        cardElement.style.border="1px solid #aaa"
        cardElement.style.padding="10px"
        cardElement.style.borderRadius="10px"
        cardElement.style.textAlign="center"

        const cardImage = card.imageUrl ? `<img src="${card.imageUrl}" alt="${card.name}">` : '';
        const cardTitle = card.name ? `<h3>${card.name}</h3>` : 'Unknown Card';
        
        const img = cardElement.querySelector('img');
        if(img){
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.borderRadius = '5px';
        }

        const h3 = cardElement.querySelector('h3');
        if (h3) {
            h3.style.fontSize = '18px';
            h3.style.margin = '10px 0';
        }

        cardElement.innerHTML = `${cardImage}${cardTitle}`;
        cardContainer.appendChild(cardElement);

        addHoverEffect(cardElement);
        SelectCard(cardElement);
        
    });
}

fetchData();


// add Events
    function addHoverEffect (card) {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = "0 0 10px";
            card.style.transition = "box-shadow 0.2s ease-in-out";
            card.style.cursor = "pointer";
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = "";
        });
    }

    function SelectCard (card) {
        card.addEventListener('click', () => {
            card.style.background = "#f0f0f0";
            card.style.border = "1px solid #ccc";
        });     
    }


