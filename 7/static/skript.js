function load() {
    GetJSON();
    GetXML();
}

function GetJSON() {
    const result = document.getElementById('json');
    fetch("http://localhost:5000/jsonFile.json")
		.then(response => response.json())
        .then(response => { result.innerHTML = JSON.stringify(response); });
    }

function GetXML() {
    let result = document.getElementById('xml');
    fetch('http://localhost:5000/xmlFile.xml')
        .then(response => response.text())
        .then(response => { result.innerHTML = response;});
}