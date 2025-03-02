document.addEventListener("DOMContentLoaded", function () {
    showPage('home'); // Show home page on load
    loadData(); // Load travel data
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

let travelData = { countries: [], temples: [], beaches: [] };

function loadData() {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            console.log("Data Loaded:", data);
            travelData = data;
        })
        .catch(error => console.error("Error fetching data:", error));
}

function search() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let resultsDiv = document.getElementById("results");

    if (!input.trim()) {
        resultsDiv.innerHTML = "<p>Please enter a search keyword.</p>";
        return;
    }

    let results = [];

    // Search in Countries
    travelData.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(input)) {
                results.push(city);
            }
        });
    });

    // Search in Temples
    results = results.concat(travelData.temples.filter(temple => temple.name.toLowerCase().includes(input)));

    // Search in Beaches
    results = results.concat(travelData.beaches.filter(beach => beach.name.toLowerCase().includes(input)));

    resultsDiv.innerHTML = "";
    if (results.length > 0) {
        results.forEach(place => {
            resultsDiv.innerHTML += `
                <div class="result">
                    <h3>${place.name}</h3>
                    <img src="${place.imageUrl}" alt="${place.name}">
                    <p>${place.description}</p>
                </div>
            `;
        });
    } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}
