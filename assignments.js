document.addEventListener("DOMContentLoaded", () => {
    // Back-Button erstellen
    const backButton = document.createElement("button");
    backButton.textContent = "Zurück";
    backButton.className = "back-button";
    backButton.addEventListener("click", () => {
        window.history.back(); // Zur vorherigen Seite zurückkehren
    });

    // Back-Button zum Body hinzufügen
    document.body.appendChild(backButton);

    // Event-Titel aus URL lesen
    const params = new URLSearchParams(window.location.search);
    const eventTitle = params.get("title");
    document.getElementById("eventTitle").textContent = `${eventTitle}`;

    // Beispiel-Daten mit Abgabezeit
    const assignments = {
        current: [
            { id: 1, name: "Abgabe 1: HTML Basics", due: "15.01.2025" },
            { id: 2, name: "Abgabe 2: CSS Styling", due: "22.01.2025" },
        ],
        past: [
            { id: 3, name: "Abgabe 3: JavaScript Basics", due: "08.01.2025", correction: true },
            { id: 4, name: "Abgabe 4: Backend-Setup", due: "01.01.2025", correction: true },
        ],
        locked: [
            { id: 5, name: "Abgabe 5: UI/UX-Design", due: "Verfügbar ab 20.01.2025" },
            { id: 6, name: "Abgabe 6: Cloud Computing", due: "Verfügbar ab 01.02.2025" },
        ],
    };

    const createAssignmentItem = (assignment, type) => {
        const li = document.createElement("li");
        const containerDiv = document.createElement("div");
        containerDiv.className = "assignment-container";
    
        const textDiv = document.createElement("div");
        const title = document.createElement("div");
        const dueDate = document.createElement("div");
        const buttonsDiv = document.createElement("div");
    
        title.textContent = assignment.name;
        dueDate.textContent = `Abgabe bis: ${assignment.due}`;
        dueDate.className = "due-date";
    
        textDiv.className = "assignment-text";
        textDiv.appendChild(title);
        textDiv.appendChild(dueDate);
    
        buttonsDiv.className = "assignment-buttons";
    
        if (type === "current" || type === "past") {
            const uploadButton = document.createElement("button");
            uploadButton.textContent = "Hochladen";
            uploadButton.className = "upload";
    
            // Dateiauswahl-Input erstellen (versteckt)
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".zip"; // Nur ZIP-Dateien erlauben
            fileInput.style.display = "none"; // Verstecken, bis es benötigt wird
    
            uploadButton.addEventListener("click", () => {
                fileInput.click(); // Öffnet den Dateiauswahl-Dialog
            });
    
            // Wenn eine Datei ausgewählt wird
            fileInput.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (file && file.name.endsWith(".zip")) {
                    alert(`Datei ${file.name} erfolgreich hochgeladen!`);
                } else {
                    alert("Bitte wählen Sie eine ZIP-Datei aus."); // HAL goes here
                }
            });
    
            buttonsDiv.appendChild(uploadButton);

            // Download-Button bleibt bestehen
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Herunterladen";
            downloadButton.className = "download";
            downloadButton.addEventListener("click", () => alert(`Herunterladen von: ${assignment.name}`));
            buttonsDiv.appendChild(downloadButton);
        }
    
        if (type === "past" && assignment.correction) {
            const correctionButton = document.createElement("button");
            correctionButton.textContent = "Korrektur herunterladen";
            correctionButton.className = "correction";
            buttonsDiv.appendChild(correctionButton);
        }
    
        containerDiv.appendChild(textDiv);
        containerDiv.appendChild(buttonsDiv);
    
        li.appendChild(containerDiv);
        return li;
    };
    
    // Abschnitte füllen
    const currentList = document.getElementById("currentAssignments");
    assignments.current.forEach(assignment => {
        currentList.appendChild(createAssignmentItem(assignment, "current"));
    });

    const pastList = document.getElementById("pastAssignments");
    assignments.past.forEach(assignment => {
        pastList.appendChild(createAssignmentItem(assignment, "past"));
    });

    const lockedList = document.getElementById("lockedAssignments");
    assignments.locked.forEach(assignment => {
        const li = document.createElement("li");
        li.textContent = `${assignment.name} - ${assignment.due}`;
        lockedList.appendChild(li);
    });

    // Placeholder für login
    const username = document.getElementById("username");
    const userName = sessionStorage.getItem("userName");
    username.textContent = userName;
});
