let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

let localStorageItems = JSON.parse(localStorage.getItem('myLeads'));
if(localStorageItems) {
    for(let i=0; i<localStorageItems.length; i++) {
        myLeads.push(localStorageItems[i]);
    }
    render(myLeads);
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
})

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url);
        render(myLeads);
    });
})

deleteBtn.addEventListener("dblclick", function() {
    myLeads = [];
    localStorage.clear();
    render(myLeads);
})

function render(leads) {
    let currLeads = "";
    for(let i=0; i<leads.length; i++)
    {
        currLeads += 
        `<li>
        <a href="${leads[i]}"> ${leads[i]} </a>
        </li>`
    }
    ulEl.innerHTML = currLeads;
}