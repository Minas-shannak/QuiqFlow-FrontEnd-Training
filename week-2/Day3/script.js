document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector('.grid');
    const themeToggleButton = document.getElementById("theme-toggle");
    const CARD_COUNT = 6;

    initTheme();
    createCards(CARD_COUNT);
    setupThemeToggle();

    // Functions
    function createCards(count) {
        for (let i = 1; i <= count; i++) {
            const card = document.createElement('div');
            card.classList.add('item');
            card.textContent = `Card ${i}`;
            grid.appendChild(card);
        }
    }

    function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
        }
    }

    function setupThemeToggle() {
        themeToggleButton.addEventListener("click", function () {
            const isDark = document.body.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }
});
