var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var arg = t.arg('arg');

var ticks = 15;

function outputUpdate(value, id) {
  document.getElementById(id).value = value;
}

var renderFunc = function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section
  function test(value) {
    document.getElementById(id).value = value;  
  }

  // function generateSlider(identifier, value, parent) {
  function generateSlider(values, key, cardValue, parent) {
    if ((typeof cardValue) != "object") {
      cardValue = {};
    }
    var id = "value-" + key;
    // t.get('card', 'shared', "value-" + identifier, 0).then(function (currentValue){
    var outputId = id + "Output";
    var div = document.createElement("div");
    var label = document.createElement("label");
    var currentValue = (key in cardValue) ? cardValue[key] : 0;
    label.setAttribute("for", id);
    label.value = values[key].name + ": ";
    div.appendChild(label);

    var output = document.createElement("output");
    output.setAttribute("id", outputId);
    output.value = currentValue;
    div.appendChild(output);

    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", "range");
    input.setAttribute("min", "0");
    input.setAttribute("max", values[key].range);
    input.setAttribute("step", "1");
    input.setAttribute("list", "valueDatalist");
    input.value = currentValue;
    input.oninput = function() {
      cardValue[key] = input.value;
      output.value = input.value;
      t.set('card', 'shared', "value", cardValue);
    };
    div.appendChild(input);

    parent.appendChild(div);
  };

  function generateSliders(inElement) {
    var parent = document.getElementById(inElement);
    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", "valueDatalist")
    for (i = 0; i <= ticks; i++) {
      var option = document.createElement("option");
      option.innerHTML = i;
      // option.setAttribute("value", i);
      datalist.appendChild(option);
    }
    parent.appendChild(datalist);

    t.get('organization', 'shared', 'values', {})
    .then(function(values){
      t.get('card', 'shared', 'value', {})
      .then(function (cardValue){
        for (var key in values) {
          generateSlider(values, key, cardValue, parent);
        }
      });
    });
  }

  generateSliders("sliderArea");
};

// document.getElementById("save-button")
// .addEventListener('click', function(e) {

// });

if (t) {
  t.render(renderFunc);
} else  {
  renderFunc();
}
