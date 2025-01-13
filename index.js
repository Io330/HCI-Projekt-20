document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const eventList = document.getElementById("eventList");

    // Benutzerinformationen setzen (Platzhalter)
    const username = document.getElementById("username");
    const userName = "Max Mustermann" // Muss später von login kommen
    sessionStorage.setItem("userName", userName);
    if (username) {
        username.textContent = userName;
    }

    // Placeholder events
    const eventData = [
        {title: "Einführung in HTML", tutoren: [""], due: true},
        {title: "CSS für Fortgeschrittene", tutoren: [""]},
        {title: "JavaScript Basics", tutoren: ["Max Mustermann"]},
        {title: "Backend-Entwicklung", tutoren: [""]},
        {title: "DevOps Grundlagen", tutoren: [""]},
        {title: "UI/UX-Design", tutoren: [""]},
        {title: "Cloud Computing", tutoren: [""]},
        {title: "Künstliche Intelligenz", tutoren: [""]},
        {title: "Datenbanken verstehen", tutoren: [""]},
        {title: "IT-Projektmanagement", tutoren: [""]}
    ];

    const isTutor = (eventName => {
        return eventData.find((e) => {return e.title === eventName;}).tutoren.includes(userName);
    });

    // Überprüfen, ob eventList vorhanden ist und Elemente enthält
    if (eventList) {
        // Liste füllen
        eventData.forEach((event) => {
            const newEntry = document.createElement("li");

            // Separate title and icons
            const titleSpan = document.createElement("span");
            titleSpan.textContent = event.title;
            newEntry.appendChild(titleSpan);

            const iconDiv = document.createElement("div");
            iconDiv.textContent = event.due ? " ❗" : "";
            iconDiv.textContent += event.tutoren.includes(userName) ? " 🔧" : "";
            newEntry.appendChild(iconDiv);

            eventList.appendChild(newEntry);
        });

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
        events.forEach((event) => {
            event.addEventListener("click", () => {
                // Use only the title span's textContent
                const eventTitle = event.querySelector("span").textContent.trim();
                const params = new URLSearchParams({ title: eventTitle });
                if (isTutor(eventTitle)) {
                    window.location.href = `assignments_tutor.html?${params.toString()}`;
                } else {
                    window.location.href = `assignments.html?${params.toString()}`;
                }
            });
        });
    }
});
