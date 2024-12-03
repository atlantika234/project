document.getElementById("entry-form").addEventListener("submit", (e) => {
	e.preventDefault();

	const entryTitle = document.getElementById("entry-title").value;
	const entryText = document.getElementById("entry-text").value;
	const mood = document.getElementById("mood").value;

	const entry = {
			title: entryTitle,
			text: entryText,
			mood: mood,
			date: new Date().toLocaleDateString(),
	};

	const entries = JSON.parse(localStorage.getItem("entries")) || [];
	entries.push(entry);
	localStorage.setItem("entries", JSON.stringify(entries));

	showToast("Запис збережено!");

	e.target.reset();
});

function showToast(message) {
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = message;

	document.body.appendChild(toast);

	setTimeout(() => {
			toast.classList.add("show");
	}, 100);

	setTimeout(() => {
			toast.classList.remove("show");
			toast.addEventListener("transitionend", () => toast.remove());
	}, 3000);
}

document.getElementById('entry-text').addEventListener('input', function () {
	this.style.height = 'auto';
	this.style.height = (this.scrollHeight) + 'px';
});
