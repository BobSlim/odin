const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const redText = document.createElement('p');
redText.classList.add('redText');
redText.textContent = ("Hey I'm red!");
redText.style.color = "red";
container.appendChild(redText);

const blueText = document.createElement('h3');
blueText.classList.add('blueText');
blueText.textContent = ("I'm a blue h3!");
blueText.style.color = "blue";
container.appendChild(blueText);

const divContainer = document.createElement('div');
divContainer.classList.add('divContainer');
divContainer.style.color = "blue";
divContainer.style.borderColor = "black";
divContainer.style.borderStyle = "solid";
divContainer.style.backgroundColor = "pink";

const divh1 = document.createElement('h1');
divh1.classList.add('divh1');
divh1.textContent = ("I'm in a div")

const divp = document.createElement('p');
divp.classList.add('divp');
divp.textContent = ("ME TOO!");

divContainer.appendChild(divh1);
divContainer.appendChild(divp);
container.appendChild(divContainer);