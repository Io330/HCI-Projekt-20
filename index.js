document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const eventList = document.getElementById("eventList");

    // Überprüfen, ob eventList vorhanden ist und Elemente enthält
    if (eventList) {
        const events = Array.from(eventList.getElementsByTagName("li"));

        // Suchfunktion
        searchBar.addEventListener("input", () => {
            const query = searchBar.value.toLowerCase();
            events.forEach(event => {
                const text = event.textContent.toLowerCase();
                event.style.display = text.includes(query) ? "" : "none";
            });
        });

        // Navigation zur Detailseite
        events.forEach((event, index) => {
            event.addEventListener("click", () => {
                const eventTitle = event.textContent.trim();
                const params = new URLSearchParams({ title: eventTitle });
                window.location.href = `assignments.html?${params.toString()}`;
            });
        });
    }

    // Benutzerinformationen setzen (Platzhalter)
    const username = document.getElementById("username");
    const userName = "Max Mustermann" // Muss später von login kommen
    sessionStorage.setItem("userName", userName);
    if (username) {
        username.textContent = userName;
    }
});
