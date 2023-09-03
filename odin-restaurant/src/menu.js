class itemCard {
  constructor(name, description, price) {
    const cardHtml = document.createElement("article");
    cardHtml.innerHTML = /*html*/ `
			<div class="headerLine">
				<h2>${name}</h2>
				<div class="headerDots"></div>
				<p>${price}</p>
			</div>
			<p>${description}</p>
		`;
    this.cardHtml = cardHtml;
  }
}

const menuItems = [
  new itemCard("steak", "a juicy beef hunk", "$2"),
  new itemCard(
    "your stolen breath",
    "from when your heart caught aflame and you couldn't force the words from your throat",
    "your love",
  ),
  new itemCard("a tongue", "beef, sliced. Rare or medium.", "$5"),
  new itemCard(
    "liver",
    "to heal calluses and open wounds. Consume with caution; and hold a lighter in your right hand.",
    "$7",
  ),
  new itemCard("steak", "a juicy beef hunk", "$2"),
  new itemCard(
    "your stolen breath",
    "from when your heart caught aflame and you couldn't force the words from your throat",
    "your love",
  ),
  new itemCard("a tongue", "beef, sliced. Rare or medium.", "$5"),
  new itemCard(
    "liver",
    "to heal calluses and open wounds. Consume with caution; and hold a lighter in your right hand.",
    "$7",
  ),
  new itemCard("steak", "a juicy beef hunk", "$2"),
  new itemCard(
    "your stolen breath",
    "from when your heart caught aflame and you couldn't force the words from your throat",
    "your love",
  ),
  new itemCard("a tongue", "beef, sliced. Rare or medium.", "$5"),
  new itemCard(
    "liver",
    "to heal calluses and open wounds. Consume with caution; and hold a lighter in your right hand.",
    "$7",
  ),
  new itemCard("steak", "a juicy beef hunk", "$2"),
  new itemCard(
    "your stolen breath",
    "from when your heart caught aflame and you couldn't force the words from your throat",
    "your love",
  ),
  new itemCard("a tongue", "beef, sliced. Rare or medium.", "$5"),
  new itemCard(
    "liver",
    "to heal calluses and open wounds. Consume with caution; and hold a lighter in your right hand.",
    "$7",
  ),
];

const Menu = document.createElement("div");
Menu.id = "menuList";

menuItems.forEach((element) => {
  const newItem = element.cardHtml;
  Menu.appendChild(newItem);
});

export { Menu };
