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
        {title: "Einführung in HTML", tutoren: [""]},
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
        eventData.forEach(event => {
            newEntry = document.createElement("li");
            newEntry.textContent = event.title;
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
        events.forEach((event, index) => {
            event.addEventListener("click", () => {
                const eventTitle = event.textContent.trim();
                const params = new URLSearchParams({ title: eventTitle });
                if(isTutor(eventTitle)){
                    window.location.href = `assignments_tutor.html?${params.toString()}`;
                }else{
                    window.location.href = `assignments.html?${params.toString()}`;
                }
            });
        });
    }
});
