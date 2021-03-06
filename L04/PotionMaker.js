"use strict";
var L04_Hexenkessel;
(function (L04_Hexenkessel) {
    generateContent(data);
    document.getElementById("formular")?.addEventListener("change", handleChange);
    document.getElementById("heat")?.addEventListener("click", handleButton);
    document.getElementById("stir")?.addEventListener("click", handleButton);
    document.getElementById("ingredients")?.addEventListener("click", handleButton);
    document.getElementById("delete")?.addEventListener("click", deleteOne);
    document.getElementById("deleteAll")?.addEventListener("click", deleteAll);
    document.getElementById("heat_input")?.addEventListener("input", slider);
    document.getElementById("HeatTime_value")?.addEventListener("input", slider);
    document.getElementById("stirTime_value")?.addEventListener("input", slider);
    document.getElementById("Wirkung_value")?.addEventListener("input", slider);
    document.getElementById("Zutaten_value")?.addEventListener("input", slider);
    let total = 0;
    function handleChange(_event) {
        let formData = new FormData(document.forms[0]);
        console.log(formData);
        let basic = document.querySelector("div#basic");
        basic.innerHTML = "<h2>Allgemein</h2>";
        let select = document.querySelector("select");
        let textarea = document.querySelector("textarea");
        for (let entry of formData) {
            console.log(entry);
            let attribute = document.querySelector("[name='" + entry[0] + "']");
            console.log(attribute);
            if (attribute.value != "" && attribute.value != null)
                basic.innerHTML += attribute.name + ": " + attribute.value + "<br>";
        }
        if (select)
            basic.innerHTML += "Wirkung: " + select.value + "<br>";
        if (textarea.value != "")
            basic.innerHTML += "Beschreibung, Risiken und Nebenwirkungen: <br>" + textarea.value + "<br>";
    }
    function handleButton(_event) {
        let clickedButton = _event.target;
        let formData = new FormData(document.forms[1]);
        let action = document.querySelector("div#action");
        let p = document.createElement("p");
        if (clickedButton.id == "ingredients") {
            let select = document.querySelector("select#Zutaten");
            let menge = parseInt(document.querySelector("[name = 'Menge']").value);
            let price = menge * parseInt(select.selectedOptions[0].getAttribute("price"));
            p.innerHTML = "Füge " + document.querySelector("[name = 'Menge']").value + " Stück/ml " + select.value + " hinzu. (" + priceInCurrency(price, false) + ") <br>";
            document.getElementById("total").innerHTML = "<b>Gesamtpreis: " + priceInCurrency(total, true) + "</b>";
            p.setAttribute("preis", price.toFixed(0));
            action.appendChild(p);
        }
        for (let entry of formData) {
            if (clickedButton.id == "heat") {
                switch (entry[0]) {
                    case "heat":
                        p.innerHTML = "Bringe es auf " + entry[1] + " °C <br>";
                    case "heating":
                        switch (entry[1]) {
                            case "Konsistenz":
                                p.innerHTML += "Bis es " + document.querySelector("select#Konsistenz_value").value + " wird. ";
                                break;
                            case "HeatTime":
                                p.innerHTML += "Für " + document.getElementById(entry[1] + "_value").value + " min. ";
                                break;
                            case "Color":
                                let div = document.createElement("div");
                                div.setAttribute("style", "background-color:" + document.getElementById("Color").value + "; width: 60px; height: 30px");
                                p.innerHTML += "Bis solch eine Farbe erreicht wird";
                                p.appendChild(div);
                        }
                        break;
                }
            }
            if (clickedButton.id == "stir") {
                switch (entry[0]) {
                    case "stir":
                        p.innerHTML = "Jetzt " + entry[1] + "<br>";
                    case "stiring":
                        switch (entry[1]) {
                            case "Konsistenz":
                                p.innerHTML += "Bis es " + document.querySelector("select#Konsistenz_stir").value + " wird. ";
                                break;
                            case "stirTime":
                                p.innerHTML += "Für " + document.getElementById(entry[1] + "_value").value + " min. ";
                                break;
                            case "stirColor":
                                let div = document.createElement("div");
                                div.setAttribute("style", "background-color:" + document.getElementById("ColorStiring").value + "; width: 60px; height: 30px");
                                p.innerHTML += "Bis solch eine Farbe erreicht wird";
                                p.appendChild(div);
                        }
                }
            }
            action.appendChild(p);
        }
    }
    function deleteAll() {
        let action = document.querySelector("div#action");
        total = 0;
        document.getElementById("total").innerHTML = "<b>Gesamtpreis: " + priceInCurrency(total, true) + "</b>";
        while (action.firstChild)
            action.removeChild(action.firstChild);
    }
    function deleteOne() {
        let action = document.querySelector("div#action");
        let p = action.lastChild;
        if (p.hasAttribute("preis")) {
            total -= parseInt(p.getAttribute("preis"));
            document.getElementById("total").innerHTML = "<b>Gesamtpreis: " + priceInCurrency(total, true) + "</b>";
        }
        action.removeChild(action.lastChild);
    }
    function slider(_event) {
        let x = _event.target.value;
        let y = _event.target.id;
        document.getElementById("bubble" + y).value = x;
    }
    function priceInCurrency(_price, _total) {
        if (_total == false)
            total += _price;
        let knut;
        let sickel;
        let gallonen;
        if (_price < 29) {
            return _price.toString() + " Knut ";
        }
        else if (_price < 493) {
            sickel = (_price / 29).toFixed(0) + " Sickel ";
            knut = (_price % 29).toFixed(0) + " Knut ";
            if (knut == "0 Knut")
                return sickel;
            else
                return sickel + knut;
        }
        else {
            gallonen = (_price / 493).toFixed(0) + " Gallonen ";
            _price %= 493;
            sickel = (_price / 29).toFixed(0) + " Sickel ";
            knut = (_price % 29).toFixed(0) + " Knut ";
            if (sickel == "0 Sickel" && knut == "0 Knut")
                return gallonen;
            else if (sickel == "0 Sickel")
                return gallonen + knut;
            else if (knut == "0 Knut")
                return gallonen + sickel;
            else
                return gallonen + sickel + knut;
        }
    }
})(L04_Hexenkessel || (L04_Hexenkessel = {}));
//# sourceMappingURL=PotionMaker.js.map