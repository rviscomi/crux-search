let NUM_ORIGINS;
let origins = [];
fetch('/static/crux-origins.json')
	.then(response => response.text())
	.then(jsonStr => {
		origins = JSON.parse(jsonStr);
		NUM_ORIGINS = origins.length;
		updateResults(origins);
	});

document.getElementById('search').addEventListener('keyup', e => {
	const query = e.target.value.toLowerCase();
	document.body.classList.toggle('results', !!query.length);
	const origins = search(query);
	updateResults(origins);
});

function search(query) {
	if (!origin.length) {
		return [];
	}
	return origins.filter(origin => origin.includes(query));
}

const summary = document.getElementById('summary');
const results = document.getElementById('results');
let allResults = null;
function updateResults(origins) {
	results.innerHTML = '';
	if (!origins.length) {
		summary.innerText = 'No Results';
		return;
	}
	summary.innerText = `${origins.length.toLocaleString()} Origin${origins.length > 1 ? 's' : ''}`;

	if (origins.length === NUM_ORIGINS && allResults) {
		results.innerHTML = allResults;
		return;
	}

	const frag = document.createDocumentFragment();
	origins.forEach(o => {
		const li = el('li');
		li.innerText = o;
		frag.appendChild(li);
	});
	results.appendChild(frag);

	if (origins.length === NUM_ORIGINS) {
		allResults = results.innerHTML;
	}
}

function el(e) {
	return document.createElement(e);
}