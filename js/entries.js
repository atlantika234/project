document.addEventListener("DOMContentLoaded", function () {
	const entriesList = document.getElementById("entries-list");
	const pagination = document.getElementById("pagination");
	const moodFilter = document.getElementById("mood-filter");
	const dateFilter = document.getElementById("date-filter");
	const entries = JSON.parse(localStorage.getItem("entries")) || [];
	const entriesPerPage = 5;
	let currentPage = 1;
	const modal = document.getElementById("modal");
	const closeModal = document.getElementById("close-modal");
	const modalText = document.getElementById("modal-text");

	if (!modal || !modalText) {
    console.error("Modal or modalText element not found!");
    return;
}

	function convertDateFormat(dateString) {
			const dateParts = dateString.split('.');
			const day = dateParts[0].padStart(2, '0');
			const month = dateParts[1].padStart(2, '0');
			const year = dateParts[2];

			return `${year}-${month}-${day}`;
	}

	if (entries.length === 0) {
			const noEntriesMessage = document.createElement("p");
			noEntriesMessage.classList.add("no-entries-message");
			noEntriesMessage.textContent = "На жаль, ви ще не зробили жодної запису.";
			entriesList.appendChild(noEntriesMessage);
	} else {
			const latestEntries = entries.slice().reverse();

			function filterEntries() {
					let filteredEntries = latestEntries;

					const selectedMood = moodFilter.value;
					if (selectedMood) {
							filteredEntries = filteredEntries.filter(entry => entry.mood === selectedMood);
					}

					const selectedDate = dateFilter.value;
					if (selectedDate) {
							filteredEntries = filteredEntries.filter(entry => convertDateFormat(entry.date) === selectedDate);
					}

					return filteredEntries;
			}

			function displayEntries(page) {
					entriesList.innerHTML = '';

					const filteredEntries = filterEntries();
					const startIndex = (page - 1) * entriesPerPage;
					const endIndex = startIndex + entriesPerPage;
					const currentEntries = filteredEntries.slice(startIndex, endIndex);

					if (currentEntries.length === 0 && filteredEntries.length > 0) {
							const noEntriesMessage = document.createElement("p");
							noEntriesMessage.classList.add("no-entries-message");
							noEntriesMessage.textContent = "Не знайдено записів за обраним фільтром.";
							entriesList.appendChild(noEntriesMessage);
							return;
					}

					currentEntries.forEach(entry => {
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
					});

					pagination.innerHTML = '';

					const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

					if (page > 1) {
							const prevButton = document.createElement("button");
							prevButton.textContent = "Попередня сторінка";
							prevButton.addEventListener("click", () => displayEntries(page - 1));
							pagination.appendChild(prevButton);
					}

					for (let i = 1; i <= totalPages; i++) {
							const pageButton = document.createElement("button");
							pageButton.textContent = i;
							pageButton.addEventListener("click", () => displayEntries(i));
							if (i === page) {
									pageButton.disabled = true;
									pageButton.style.backgroundColor = "#ddd";
							}
							pagination.appendChild(pageButton);
					}

					if (page < totalPages) {
							const nextButton = document.createElement("button");
							nextButton.textContent = "Наступна сторінка";
							nextButton.addEventListener("click", () => displayEntries(page + 1));
							pagination.appendChild(nextButton);
					}
			}

			function openModal(entry) {
				document.getElementById("modal-date").textContent = `Дата: ${entry.date}`;
				document.getElementById("modal-mood").textContent = `Настрій: ${entry.mood}`;
				document.getElementById("modal-title").innerHTML = `<h3>${entry.title}</h3>`;
				document.getElementById("modal-text").innerHTML = `${entry.text}`;
				modal.classList.add("show");
		}
		
			closeModal.addEventListener("click", function () {
				modal.classList.remove("show");
			});

			window.addEventListener("click", function (event) {
					if (event.target === modal) {
						modal.classList.remove("show");
					}
			});

			moodFilter.addEventListener("change", () => {
					currentPage = 1;
					displayEntries(currentPage);
			});

			dateFilter.addEventListener("change", () => {
					currentPage = 1;
					displayEntries(currentPage);
			});

			displayEntries(currentPage);
	}
});
