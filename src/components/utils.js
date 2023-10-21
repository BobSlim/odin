const decimalize = (number = 0, places = 2) => {
    number = number.toString();
    const decimalPlace = number.indexOf(".");
    if (decimalPlace == -1) {
        return number + ".00";
    }
    const addedZeroes = (places + 1) - number.slice(decimalPlace).length;
    return number + "0".repeat(addedZeroes);
};

export const displayPrice = (price = 0) => (price < 0 ? "-$" : "$") + decimalize(Math.abs(price));

export const getData = async (url, max = 0) => {
    const resp = await fetch(url);
    const json = await resp.json();
    const filtered = max ? json.slice(0, max) : json;
    return filtered;
}

export const shuffleArray = (source) => {
    let array = source.slice(0)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export const findIndexById = (array, id) =>
    array.map(item => item.id).indexOf(id)

export const findObjectById = (array, id) =>
    array[findIndexById(array, id)]