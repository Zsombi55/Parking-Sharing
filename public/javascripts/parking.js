var editingSpotsId;
var allSpots = [];
var isGitHost = false;	// NOT Preview.
var allPeople = [];		// JSON, Preview.

var API_URL = {
	ADD: "spots/add",	//	CREATE
	READ: "spots",	// "data/staticSpots.json", preview.
	LOGIN: "login",	// "data/staticPeople.json", preview.
	BOOK: "spots/book",
	UPDATE: "spots/update",
	DELETE: "spots/delete"
};

var API_METHOD = {
	ADD: "POST",	//	CREATE
	READ: "POST",	// GET, github preview.
	LOGIN: "POST",	// GET, github preview.
	BOOK: "POST",
	UPDATE: "PUT",
	DELETE: "DELETE"
};

// Top-menu handlers:
function initTopMenu() {	// find all top-menu items and handle their "onclick" events.
	const links = document.querySelectorAll("#topMenu a");
	console.info(links);

	for (var i = 0; i < links.length; i++) {
		if (links[i].hasAttribute("data-page")) {	// don't collect irrelevant anchors.
			links[i].onclick = clickTmItem;	// no "()" after the function name so the browser calls it not us.
		} else {
			continue;
		}
	}
}

function clickTmItem() {	// Click Top Menu Item.
	console.warn("clicked on menu", this);	// "this" is a variable which was just used. Here: just clicked on.
	hidePages();

	var pageId = this.getAttribute("data-page");
	console.warn({ pageId });
	showPage(pageId);
}

function hidePages() {
	var pages = document.querySelectorAll(".page");
	pages.forEach(function (page) {
		page.style.display = "none";
	});
}

function showPage(page) {	// sets the visibility status of the ID'd object; none = hidden, block = visible.
	console.warn(page);
	document.getElementById(page).style.display = "block";
}

initTopMenu();
// --END-- Top-menu functions.


// "Spots" DB Data transfer handlers:
// Search page initialization.
function searchSpotReq(city, area, address){
	const personId = getUser().id;
	const method = API_METHOD.READ;
	let body = null;
	if (method === "POST") {
		body = JSON.stringify({ city, area, address, personId });
	}

	fetch(API_URL.READ, {
		method, body, headers: { "Content-Type": "application/json" }
	}).then(function (resp) {
		return resp.json()
	}).then(function (parkingData) { // = the succesfully returned "resp"-onse.
		console.log("All spots: ", parkingData);
		allSpots = parkingData;
		displaySpots(parkingData);
	})
}

// Show "spots" DB (actual) or JSON (GitHub) data on page.
function displaySpots(parkingData) {
	const personId = getUser().id;
	var list = parkingData.map(function (spot) {
		const style = spot.person_id == personId ? 'background-color: green' : '';	// TODO: if there is pers. swap button to release.
		return `<tr data-id="${spot.id}" style="${style}">
			<td>${spot.city}</td>
			<td>${spot.area}</td>
			<td>${spot.address}</td>
			<td>${spot.spot_nr}</td>
            <td class="t">${spot.t_from}</td>
            <td class="t">${spot.t_until}</td>
			<td>${spot.description}</td>
			<td>
				<a href="#" class="book" tabindex="-1">Rezervă</a>
			</td>
		</tr>`;
	});
	document.querySelector('#addresses tbody').innerHTML = list.join('');
}
// --END-- "spots" DB Data transfer handling.


// Search "bar".
function searchSpot() {	/*	If the array only ever has 1 value the parrentheses can be left out.	*/	
	var city = document.getElementById("searchCity").value;
	var area = document.getElementById("searchArea").value;
	var address = document.getElementById("searchAddr").value;
	//console.warn("Dynamic Search passes data: \n"+ "City: ", city , " |Area: " , area , " |Address: " , address);

	searchSpotReq(city, area, address);
};

// Search, dynamic in "Spots" DB - Event listener.
function initSearch() {
	// array.
	let searchBox = document.querySelectorAll(".searchSpot");

	searchBox.forEach(function (elem) {
		elem.addEventListener("input", (e) => {
			//console.warn("Search input: " + e.target.value);
			searchSpot();
		}, true);
	});
}
// --END-- Search handling.
searchSpot();
initSearch();
