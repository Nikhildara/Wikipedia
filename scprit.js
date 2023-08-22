let searchinput = document.getElementById("searchInput");
let searchRes = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendsearchResults(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    searchRes.appendChild(resultContainer);
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultContainer.appendChild(titleEl);
    let brEl = document.createElement("br");
    resultContainer.appendChild(brEl);
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.textContent = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    resultContainer.appendChild(urlEl);
    let brE2 = document.createElement("br");
    resultContainer.appendChild(brE2);
    let des = document.createElement("p");
    des.textContent = description;
    resultContainer.appendChild(des);
}

function displayResult(search_results) {
    for (let each of search_results) {
        createAndAppendsearchResults(each)
    }
}

function fetchdata() {
    spinnerEl.classList.toggle("d-none")
    searchRes.textContent = "";
    let value = searchinput.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + value;
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(JSONdata) {
            let {
                search_results
            } = JSONdata;
            spinnerEl.classList.toggle("d-none")
            displayResult(search_results);
        })
}


searchinput.addEventListener("keydown", function press(event) {
    if (event.key === "Enter") {
        fetchdata()

    }
})