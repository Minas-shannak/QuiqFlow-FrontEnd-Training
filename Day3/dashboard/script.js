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

    // bult in code from https://www.w3schools.com 
    const performanceLabels = ["Q1", "Q2", "Q3", "Q4", "Total"];
    const performanceData = [3500, 4000, 2800, 6200, 8500];

    const trafficLabels = ["Organic", "Referral", "Direct", "Email", "Social"];
    const trafficData = [5000, 2000, 1500, 800, 1200];

    const performanceANDtrafficColors = ["red", "green", "blue", "orange", "brown"];

    new Chart("BarCharts", {
    type: "bar",
    data: {
        labels: performanceLabels,
        datasets: [{
        backgroundColor: performanceANDtrafficColors,
        data: performanceData
        }]
    },
    options: {
        legend: { display: false },
        title: {
        display: true,
        }
    }
    });


    new Chart("PieCharts", {
    type: "pie",
    data: {
        labels: trafficLabels,
        datasets: [{
        backgroundColor: performanceANDtrafficColors,
        data: trafficData
        }]
    },
    options: {
        title: {
        display: true,
        }
    }
    });

});


    
