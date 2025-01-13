document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("uploadModal");
    const closeModal = document.getElementById("closeModal");
    const uploadForm = document.getElementById("uploadForm");

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

    // Beispiel Studenten Daten
    const students = [
        { id: 1, name: "Student 1", submission: "Student_1.zip" },
        { id: 2, name: "Student 2", submission: "Student_2.zip" },
        { id: 3, name: "Student 3", submission: "Student_3.zip" },
        { id: 4, name: "Student 4", submission: "Student_4.zip" },
        { id: 5, name: "Student 5", submission: "Student_5.zip" }
    ];

    const openModal = () => {
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
        const feedback = document.getElementById("feedback");

        if (!fileInput.files[0]) {
            alert("Bitte wähl eine Datei aus.");
            return;
        }

        if (!fileInput.files[0].name.endsWith(".zip")) {
            alert("Nur ZIP-Dateien sind erlaubt! Prüf das Format deiner Datei.");
            return;
        }

        const file = fileInput.files[0];
        const userFeedback = feedback.value;

        alert(`Datei: ${file.name}\nPunkte: ${userFeedback}\nErfolgreich hochgeladen!`);
        closeModalFunction(); // Schließe das Modal nach dem Hochladen
    });

    // Funktion zur Erstellung der Studentenzeilen
    const createStudentContainer = (student) => {
        const li = document.createElement("li");
        li.className = "student-row";

        const nameDiv = document.createElement("div");
        nameDiv.textContent = student.name;
        nameDiv.className = "student-name";

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "action-buttons";

        // Download Abgabe
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Herunterladen";
        downloadButton.className = "download";
        downloadButton.addEventListener("click", () => {
            alert(`Abgabe herunterladen: ${student.submission}`);
        });

        // Korrektur hochladen
        const uploadButton = document.createElement("button");
        uploadButton.textContent = "Korrektur Hochladen";
        uploadButton.className = "upload";

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";

        uploadButton.addEventListener("click", openModal);

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                alert(`Datei ${file.name} für ${student.name} erfolgreich hochgeladen!`);
            } else {
                alert("Bitte wählen Sie eine Datei aus.");
            }
        });

        // DL Korrektur
        const correctionButton = document.createElement("button");
        correctionButton.textContent = "Korrektur Herunterladen";
        correctionButton.className = "correction";
        correctionButton.addEventListener("click", () => {
            alert(`Korrektur für ${student.name} herunterladen.`);
        });

        // Checkbox um einzelne Abgaben auszuwählen
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "student-checkbox";
        checkbox.dataset.submission = student.submission;

        // Buttons und Checkbox hinzufügen
        buttonsDiv.appendChild(downloadButton);
        buttonsDiv.appendChild(uploadButton);
        buttonsDiv.appendChild(correctionButton);

        li.appendChild(nameDiv);
        li.appendChild(buttonsDiv);
        li.appendChild(checkbox);

        return li;
    };

    // Studentenliste füllen
    students.forEach(student => {
        studentList.appendChild(createStudentContainer(student));
    });

    // Alle Abgaben herunterladen
    const downloadAllButton = document.getElementById("downloadAllButton");
    downloadAllButton.addEventListener("click", () => {
        students.forEach(student => {
            console.log(`Herunterladen von: ${student.submission}`);
        });
        alert("Alle Abgaben werden heruntergeladen!");
    });

    // Ausgewählte Abgaben herunterladen
    const downloadSelectedButton = document.getElementById("downloadSelectedButton");
    downloadSelectedButton.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".student-checkbox:checked");
        if (checkboxes.length === 0) {
            alert("Bitte wählen Sie mindestens eine Abgabe aus.");
            return;
        }
        const selectedSubmissions = [];
        checkboxes.forEach(checkbox => {
            selectedSubmissions.push(checkbox.dataset.submission);
            // Abgaben herunterladen
        });
    
        alert(`Ausgewählte Abgaben werden heruntergeladen: ${selectedSubmissions.join(", ")}`);
    });
});