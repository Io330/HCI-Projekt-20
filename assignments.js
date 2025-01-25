document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("uploadModal");
    const closeModal = document.getElementById("closeModal");
    const uploadForm = document.getElementById("uploadForm");

    const openModal = (event) => {
        const button = event.target;
        const assignmentID = button.dataset.assignment;

        const assignmentIDInput = document.getElementById("assignmentIdInput");
        assignmentIDInput.value = assignmentID

        modal.style.display = "block";
    };

    const closeModalFunction = () => {
        modal.style.display = "none";
    };

    closeModal.addEventListener("click", closeModalFunction);

    // Wenn der Nutzer irgendwo außerhalb des Modals klickt, schließen
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModalFunction();
        }
    });

    uploadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const fileInput = document.getElementById("fileInput");
        const halMessage = document.getElementById("halMessage");
        const feedback = document.getElementById("feedback");
        const assignmentIdInput = document.getElementById("assignmentIdInput");
        const assignmentId = assignmentIdInput.value;

        if (!fileInput.files[0]) {
            alert("Bitte wähl eine Datei aus.");
            return;
        }

        if (!fileInput.files[0].name.endsWith(".zip")) {
            // HAL-9000-Nachricht anzeigen
            halText.textContent = `Es tut mir leid, ${userName}, aber das kann ich nicht tun. Nur ZIP-Dateien sind erlaubt.`;
            halMessage.style.opacity = "1";
            halMessage.style.display = "flex";
            setTimeout(() => {
                halMessage.style.opacity = "0";
                setTimeout(() => {
                    halMessage.style.display = "none";
                }, 500);
            }, 5000);
            return;
        }

        const file = fileInput.files[0];
        const userFeedback = feedback.value;

        alert(`Datei: ${file.name}\nFor: ${assignmentId}\nFeedback: ${userFeedback}\nErfolgreich hochgeladen!`);
        closeModalFunction(); // Schließe das Modal nach dem Hochladen
    });

    // Placeholder für login
    const userName = sessionStorage.getItem("userName");
    document.getElementById("username").textContent = userName;

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

    // Beispiel-Daten mit Abgabezeit, muss später von Datenbank geladen werden
    const assignments = {
        current: [
            { id: 1, name: "Abgabe 1: HTML Basics", due: "15.01.2025", state: "uploaded" },
            { id: 2, name: "Abgabe 2: CSS Styling", due: "22.01.2025" },
        ],
        past: [
            { id: 3, name: "Abgabe 3: JavaScript Basics", due: "08.01.2025", state: "uploaded", correction: false},
            { id: 4, name: "Abgabe 4: Backend-Setup", due: "01.01.2025", state: "uploaded", correction: true, points: 18 },
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
        const points = document.createElement("div");
        const stateDiv = document.createElement("div")
        const buttonsDiv = document.createElement("div");
    
        title.textContent = assignment.name;
        if (assignment.correction){
            dueDate.textContent = `Abgelaufen: ${assignment.due}`;
            points.textContent = `${assignment.points} Punkte`;
            points.className = "points";
        }else{
            dueDate.textContent = `Abgabe bis: ${assignment.due}`;
        }
        dueDate.className = "due-date";
    
        textDiv.className = "assignment-text";
        textDiv.appendChild(title);
        textDiv.appendChild(dueDate);
        textDiv.appendChild(points);
    
        buttonsDiv.className = "assignment-buttons";
    
        if (type === "current"){
            const uploadButton = document.createElement("button");
            uploadButton.textContent = "Hochladen";
            uploadButton.className = "upload";
            uploadButton.dataset.assignment = assignment.name
    
            uploadButton.addEventListener("click", (event) => openModal(event));

            stateDiv.textContent = "Abgabe: "
            stateDiv.textContent += assignment.state === "uploaded" ? "✅" : "❌"; 
            stateDiv.className = "stateDiv"
            buttonsDiv.appendChild(uploadButton);
        }
    
        if (type === "current" || type === "past") {
            // Download-Button bleibt bestehen
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Herunterladen";
            downloadButton.className = "download";
            downloadButton.addEventListener("click", () => alert(`Herunterladen von: ${assignment.name}`));
            downloadButton.disabled = assignment.state != "uploaded";
            buttonsDiv.appendChild(downloadButton);
        }

        if (type === "past" && assignment.correction) {
            const correctionButton = document.createElement("button");
            correctionButton.textContent = "Korrektur herunterladen";
            correctionButton.className = "correction";
            correctionButton.addEventListener("click", () => alert(`Herunterladen von ${assignment.name} Korrektur`));
            buttonsDiv.appendChild(correctionButton);
        }
    
        containerDiv.appendChild(textDiv);
        containerDiv.appendChild(stateDiv)
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

});
