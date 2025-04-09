"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navItems = document.querySelectorAll('.sidebar nav li');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            sidebar.classList.remove('active');
        });
    });

});


    
