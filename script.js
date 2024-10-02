function toggleRespMenu() {
    document.getElementById("menu").classList.toggle("resp-menu");
}


function sendMail(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("https://formspree.io/f/myzgvnbp", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(() => {
        window.location.href = "./send_mail.html";
    }).catch((error) => {
        console.log(error);
    });
}


const RECIPE_CASSEROLE_NAME = "CASSEROLE";
const RECIPE_CASSEROLE = [125, 100, 0.5, 0.5, 0.5, 100, 0.25, 0.25, 125, 0.5, 50, 0.75, 0];
const NUTRITIONAL_VALUES_CASSEROLE = [1202.9, 78.1, 50, 107.9];

const RECIPE_CHILI_NAME = "CHILI";
const RECIPE_CHILI = [125, 0.25, 0.5, 0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.25, 0.25, 0.25, 0.5, 0];
const NUTRITIONAL_VALUES_CHILI = [813.6, 40.6, 39.4, 66.2];

const RECIPE_BOEREK_NAME = "BOEREK";
const RECIPE_BOEREK = [6, 600, 300, 400, 5, 0, 0];
const NUTRITIONAL_VALUES_BOEREK = [1578.2, 59.1, 70.3, 167];

const RECIPE_MUFFIN_NAME = "MUFFIN";
const RECIPE_MUFFIN = [250, 150, 2, 1, 1, 100, 80, 1, 200];
const NUTRITIONAL_VALUES_MUFFIN = [1427.4, 48.9, 62.6, 157];


function selectIngredientsArray(recipeName) {
    if (RECIPE_CASSEROLE_NAME === recipeName) {
        return RECIPE_CASSEROLE;
    }
    if (RECIPE_CHILI_NAME === recipeName) {
        return RECIPE_CHILI;
    }
    if (RECIPE_BOEREK_NAME === recipeName) {
        return RECIPE_BOEREK;
    }
    if (RECIPE_MUFFIN_NAME === recipeName) {
        return RECIPE_MUFFIN;
    }
    return null;
}

function selectNutritionalValuesArray(recipeName) {
    if (RECIPE_CASSEROLE_NAME === recipeName) {
        return NUTRITIONAL_VALUES_CASSEROLE;
    }
    if (RECIPE_CHILI_NAME === recipeName) {
        return NUTRITIONAL_VALUES_CHILI;
    }
    if (RECIPE_BOEREK_NAME === recipeName) {
        return NUTRITIONAL_VALUES_BOEREK;
    }
    if (RECIPE_MUFFIN_NAME === recipeName) {
        return NUTRITIONAL_VALUES_MUFFIN;
    }
    return null;
}


function calc(recipeName, event) {
    
    let portions = parseInt(document.getElementById("inputfield").value);
    
    if (portions < 21 && portions > 0) {
        event.preventDefault(); // prevents the page from reloading
        calcPortions(recipeName, portions);
        calcNutritionalValues(recipeName, portions);
    }  
    event.target.blur(); // causes the button to lose focus
}

function calcPortions(recipeName, portions) {
    let ingredientsTable = document.querySelectorAll(".table-container table tbody tr td:first-child");
    let ingredientsTableSize = ingredientsTable.length;
    let ingredientsArray = selectIngredientsArray(recipeName);
    
    for (let i = 0; i < ingredientsTableSize; i++) {
        let currentValue = ingredientsArray[i];
        if (currentValue > 0) {
            let newValue = currentValue * portions;
            let newValueRounded = Math.round(newValue * 100) / 100;
            ingredientsTable[i].innerText = newValueRounded.toString().replace(".", ",");
        }
    }
}

function calcNutritionalValues(recipeName, portions) {
    let nutritionalValuesTable = document.querySelectorAll(".nutritional-value span");
    let nutritionalValuesTableSize = nutritionalValuesTable.length;
    let nutritionalValuesConstantArray = selectNutritionalValuesArray(recipeName);

    for (let i = 0; i < nutritionalValuesTableSize; i++) {
        let currentValue = nutritionalValuesConstantArray[i];
        if (currentValue > 0) {
            let newValue = currentValue * portions;
            let newValueRounded = Math.round(newValue * 100) / 100;
            nutritionalValuesTable[i].innerText = newValueRounded.toString().replace(".", ",");
        }
    }
}