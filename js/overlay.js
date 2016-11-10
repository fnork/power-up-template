/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
var num = t.arg('rand');

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  // Render values
  var valuesDiv = document.getElementById("values-section");
  while (valuesDiv.lastChild) {
    valuesDiv.removeChild(valuesDiv.lastChild);
  }

  t.get('organization', 'shared', 'values', {})
  .then(function(values){
    for (var key in values) {
      var value = values[key];
      var valueDiv = document.createElement("div");

      var h2 = document.createElement("h2");
      h2.innerHTML = value.name + " <i>" + value.toString() + "</i>";
      valueDiv.appendChild(h2);

      var p = document.createElement("p");
      p.innerHTML = value.description;
      valueDiv.appendChild(p);

      valueDiv.appendChild(document.createElement("hr"));

      valuesDiv.appendChild(valueDiv);
    }
  });
});

// close overlay if user clicks outside our content
document.addEventListener('click', function(e) {
  if(e.target.tagName == 'BODY') {
    t.closeOverlay().done();
  }
});

// close overlay if user presses escape key
document.addEventListener('keyup', function(e) {
  if(e.keyCode == 27) {
    t.closeOverlay().done();
  }
});

// handle save button
var addValueButton = document.getElementById("add-value-button");
addValueButton.addEventListener('click', function(e) {
  var weight = document.getElementById("add-value-weight-output").value;
  var name = document.getElementById("add-value-name").value;
  var description = document.getElementById("add-value-name").value;

  t.get('organization', 'shared', 'values', {})
  .then(function (values){
    var id = (Math.random() * 1000000).toFixed(0).toString();
    values[id] = {
      name: name,
      description: description,
      weight: weight,
      range: 15
    };
    t.set('organization', 'shared', 'values', values);
  });
});
