/** SLEEP FUNCTION
** await sleep(time in ms)
* @param {number} ms - the delay in milliseconds
* @return {promise} - pending, fulfilled, rejected
*/
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//------------------------------------------------------------------------------------------
/** CREATE DIV
**create a container of your choice, with optionnal content and classe(s)
* @param {string} type - container type
* @param {Element} parent - the parent container
* @param {string} content - innerHTML
* @param {string} className - classname(s)
* @param {string} setValue - value
* @param {URL} setSrc - source
* @return {Element} - the new element
*/
export function createDiv(type, parent, content, className, setValue, setSrc) {
    const newDiv = document.createElement(type);
    if (content !== null) {
        newDiv.innerHTML = content;
    }
    if (className !== null) {
        newDiv.classList.add(className);
    }
    if (typeof setValue !== null) {
        if (newDiv instanceof HTMLInputElement || newDiv instanceof HTMLTextAreaElement || newDiv instanceof HTMLSelectElement) {
            newDiv.value = setValue;
        }
        else {
            newDiv.textContent = setValue;
        }
    }
    if (setSrc !== null) {
        if (newDiv instanceof HTMLImageElement) {
            newDiv.src = setSrc.toString();
        }
        else {
            newDiv.appendChild(document.createTextNode(setSrc.toString()));
        }
    }
    parent.appendChild(newDiv);
    return newDiv;
}
//------------------------------------------------------------------------------------------
/** ESCAPE HTML
 * @param {string} text - text to clean
*/
export function escapeHTML(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}
//------------------------------------------------------------------------------------------
/**RANDOM COLOR
 * @return {string} - hexadecimal color
*/
export function randomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
}
//------------------------------------------------------------------------------------------
/**BINARY SEARCH
 * @param {array} arr - where to search
 * @param {any} x - what you are looking for
 * @return {Number} - return the index or -1 if nothing is find */
export function binarySearch(arr, x) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((high + low) / 2);
        if (arr[mid] < x) {
            low = mid + 1;
        }
        else if (arr[mid] > x) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -1;
}
//------------------------------------------------------------------------------------------
/**QUICK SORT
 * @param {array} arr - array to sort
 * @return {array} - sorted array
 */
export function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    for (let el of arr) {
        if (el < pivot) {
            left.push(el);
        }
        else if (el > pivot) {
            right.push(el);
        }
        else {
            equal.push(el);
        }
    }
    return [...quickSort(left), ...equal, ...quickSort(right)];
}
//------------------------------------------------------------------------------------------
/**RANDOM NUMBER FROM INTERVAL
 * @param {number} min - minimum
 * @param {number} max - maximum
 * @return {number} - random number
 */
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//------------------------------------------------------------------------------------------
