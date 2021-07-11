const dataUl = document.getElementById("dataUl");
let button = document.getElementById("button");
button.addEventListener("click", getData);

async function getData()
{
    const number = document.getElementById("number").value;

    if(number < 1 || number > 10)
    {
        alert("Enter a number between 1 and 10");
        return;
    }

    const category = document.getElementById("category");
    let categories = [];

    for (let i = 0; i < category.selectedOptions.length; i++)
    {
        categories.push(category.selectedOptions[i].value);
    }

    const categoriesList = categories.join(",")
    
 
    const url = "https://v2.jokeapi.dev/joke/";
    const params = categoriesList + "?amount=" + number;

    const response = await fetch(url+params);

    let data = await response.json();

    displayData(data);
}

function displayData(data)
{
    dataUl.innerHTML = "";

    if(data.amount === undefined)
    {
        buildHTML(data);
    }
    else
    {
        data.jokes.map(joke =>
            {
                buildHTML(joke);
            });
    }
}

function buildHTML(joke)
{
    let jokeText;
    const li = document.createElement("li");

    if(joke.type === "single")
        jokeText = `<div>Witz: ${joke.joke}</div>`;
    else if(joke.type === "twopart")
        jokeText = 
            `   <div>Frage: ${joke.setup}</div>
                <div>Antwort: ${joke.delivery}</div>
            `
    li.innerHTML =
        `
            <p>Category: ${joke.category}</p>
            ${jokeText}
        `
    dataUl.append(li);
}