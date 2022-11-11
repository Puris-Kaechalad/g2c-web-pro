// Api https://gamertocoder.garena.co.th/api/assets
// Api https://gamertocoder.garena.co.th/api/minigames

// Get the container element for create new element
const getContainerId = document.getElementById("minigames-container");

// Function that create new element with class name
createNewElement = (elementType, name) => {
    var newElem = document.createElement(elementType);
    newElem.className = name;
    return newElem;
}

const API = "https://gamertocoder.garena.co.th/api/minigames";

// Get an API
fetch(API)
.then((respond) => {
    return respond.json();
}).then((data) => {
    for (let i = 0; i < data.length; i++) {
        const getCurrentContentClass = getContainerId.appendChild(createNewElement("div", "minigames-content"));
        const getLeftContent = getCurrentContentClass.appendChild(createNewElement("div", "minigames-content-left"));
        const getRightContent = getCurrentContentClass.appendChild(createNewElement("div", "minigames-content-right"));
        const currentData = data[i];

        // Create allData to iterate dictionary
        const allData = Object.entries(currentData);

        // Iterate through API to get all value
        for (const [key, value] of allData) {
            // Check if key is "no" or the value is null will skip this loop in data
            if (key == "no" || value == null) continue;

            // Check if this value is an array
            const isArray = Array.isArray(value);
            let currentContainer = null;
            if (key == "name" || key == "icon") currentContainer = getLeftContent.appendChild(createNewElement("div", "minigames-content-" + key));
            else currentContainer = getRightContent.appendChild(createNewElement("div", "minigames-content-" + key));

            switch (key) {
                case "name" :
                    const name = currentContainer.appendChild(createNewElement("h2", "name"));
                    name.innerHTML = value;
                    break;
                case "icon" :
                    const icon = currentContainer.appendChild(createNewElement("img", "icon"));
                    icon.src = value;
                    break;
                case "genre" :
                    value.forEach(element => {
                        const genre = currentContainer.appendChild(createNewElement("p", "genre" + i));
                        genre.innerHTML = element;
                    });
                    break;
                case "images" :
                    value.forEach(element => {
                        const img = currentContainer.appendChild(createNewElement("img", "images" + i));
                        img.src = element;
                    });
                    break;
                case "description" :
                    const text = currentContainer.appendChild(createNewElement("p", "text"));
                    text.innerHTML = value;
                    break;
            }
        }
    }
})