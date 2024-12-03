document.addEventListener("DOMContentLoaded", function () {
	const entriesList = document.getElementById("entries-list");
	const entries = JSON.parse(localStorage.getItem("entries")) || [];
	const modal = document.getElementById("modal");
	const closeModal = document.getElementById("close-modal");

	if (entries.length === 0) {
		const noEntriesMessage = document.createElement("p");
		noEntriesMessage.classList.add("no-entries-message");
		noEntriesMessage.textContent = "На жаль, ви ще не зробили жодної запису.";
		entriesList.appendChild(noEntriesMessage);
	} else {
		const latestEntries = entries.slice().reverse().slice(0, 3);

		latestEntries.forEach(entry => {
			const li = document.createElement("li");
			li.classList.add("entry-item");

			const dateElement = document.createElement("p");
			dateElement.textContent = `Дата: ${entry.date}`;
			li.appendChild(dateElement);

			const textElement = document.createElement("p");
			textElement.innerHTML = `<strong>Заголовок:</strong> ${entry.title}`;
			li.appendChild(textElement);

			const moodElement = document.createElement("p");
			moodElement.innerHTML = `<strong>Настрій:</strong> ${entry.mood}`;
			li.appendChild(moodElement);

			li.addEventListener("click", function () {
				openModal(entry);
			});

			entriesList.appendChild(li);

			function openModal(entry) {
				document.getElementById("modal-date").textContent = `Дата: ${entry.date}`;
				document.getElementById("modal-mood").textContent = `Настрій: ${entry.mood}`;
				document.getElementById("modal-title").innerHTML = `<h3>${entry.title}</h3>`;
				document.getElementById("modal-text").innerHTML = `${entry.text}`;
				modal.classList.add("show");
			}
		});

		closeModal.addEventListener("click", function () {
			modal.classList.remove("show");
		});

		window.addEventListener("click", function (event) {
			if (event.target === modal) {
				modal.classList.remove("show");
			}
		});
	}
});
