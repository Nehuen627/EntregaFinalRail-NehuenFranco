import askForDetails from "./Login.js";

async function init() {
    console.log("Script loaded!");
    if (window.location.pathname === '/') {
        const userData = await askForDetails();
        console.log(userData);
    }
}

init();
