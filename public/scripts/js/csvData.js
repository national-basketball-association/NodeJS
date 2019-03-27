var fileInput = document.getElementById("csv");
var btn = document.getElementsByClassName("team");

readFile = function () {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://s3.amazonaws.com/national-basketball-predictions-system/ATL_2015_to_2018.csv"; // site that doesn’t send Access-Control-*
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then(response => response.text())
  .then(contents => {
    var str = contents;
    var rows = str.split("\n");
    var titles = rows[0].split(",");

    console.log(titles.length);
    var i;

    //build table header
    var table = document.createElement("TABLE");
    table.classList.add("table");
    // table.classList.add("table-striped");
    var thead = document.createElement("THEAD");
    var tr = document.createElement("TR");
    for (i = 3; i < titles.length; i++) {
      var th = document.createElement("TH");
      var t = document.createTextNode(titles[i]);
      th.appendChild(t);
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    //build talbe body
    var tbody = document.createElement("TBODY");
    for (i = 1; i < rows.length; i++) {
        var body_tr = document.createElement("TR");
        var content = rows[i].split(",");

        var j;
        for (j = 3; j < content.length; j++) {
          var body_th = document.createElement("TD");
          var body_t = document.createTextNode(content[j]);
          body_th.appendChild(body_t);
          body_tr.appendChild(body_th);
        }

        tbody.appendChild(body_tr);
        table.appendChild(tbody);
    }

    // document.body.appendChild(table);

    var element = document.getElementById("table");
    element.appendChild(table);

  // reader.readAsBinaryString(fileInput.files[0]);
  })
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
};

function print() {
  console.log("works");
}

// fileInput.addEventListener('change', readFile);
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', readFile, false);
}
