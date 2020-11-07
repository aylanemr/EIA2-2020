"use strict";
var L04_Hexenkessel;
(function (L04_Hexenkessel) {
    function generateContent(_data) {
        let group = null;
        for (let category in _data) {
            let items = _data[category];
            group = createSelect(items, category);
            let div = document.querySelector("div#" + category);
            if (div && group)
                div.appendChild(group);
        }
    }
    L04_Hexenkessel.generateContent = generateContent;
    function createSelect(_items, _category) {
        let group = document.createElement("div");
        let select = document.createElement("select");
        select.id = _category;
        if (_category != "Zutaten") {
            let label = document.createElement("label");
            label.textContent = _category;
            label.htmlFor = _category;
            group.appendChild(label);
            group.innerHTML += "<br>";
        }
        for (let item of _items) {
            let option = document.createElement("option");
            option.value = item.name;
            if (_category == "Zutaten") {
                option.setAttribute("price", (item.price).toString());
                option.setAttribute("stepper", (item.stepper) + "");
            }
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        group.appendChild(select);
        let range = document.createElement("input");
        range.type = "range";
        range.min = "1";
        range.step = "1";
        range.id = _category + "_value";
        if (_category == "Wirkung") {
            range.name = "Wirkungsdauer";
            range.max = "60";
            let labelForRange = document.createElement("label");
            labelForRange.textContent = range.name;
            labelForRange.htmlFor = range.name;
            group.innerHTML += "<br>";
            group.appendChild(labelForRange);
        }
        else {
            range.name = "Menge";
            range.max = "500";
        }
        range.setAttribute("value", "30");
        group.innerHTML += "<br>";
        group.appendChild(range);
        let input = document.createElement("input");
        input.type = "text";
        input.id = "bubble" + range.id;
        input.setAttribute("value", "30");
        input.setAttribute("disabled", "disabled");
        input.setAttribute("class", "time");
        group.appendChild(input);
        if (_category == "Wirkung")
            group.innerHTML += " min";
        else
            group.innerHTML += " Stück/ml";
        return group;
    }
})(L04_Hexenkessel || (L04_Hexenkessel = {}));
//# sourceMappingURL=generate.js.map