// NOTE: console.logs in this file will output in the browser console
// sanity check:
console.log("Meow");

/* Capitalize username when it appears in H2 tags */
let usernameHeading = document.querySelector('.username-header').innerText;
console.log(usernameHeading);

let capitalizedHeading = null;

function capitalizeFirstLetter(string) {
    return capitalizedHeading = string.charAt(0).toUpperCase() + string.slice(1);
};

capitalizeFirstLetter(usernameHeading); 

document.querySelector('.username-header').innerText = capitalizedHeading;