let genQ = document.querySelector("#gen");
let quoteDisplay = document.querySelector(".disp");

function genNew() {
    let quotes = [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Do not wait to strike till the iron is hot, but make it hot by striking.",
        "Success usually comes to those who are too busy to be looking for it.",
        "The way to get started is to quit talking and begin doing."
    ];
    
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
}

// Added event listener for click event
genQ.addEventListener("click", genNew);

// Called genNew() when page loads to display initial random quote
window.addEventListener('load', genNew);
function shareQ() {
    const quote = quoteDisplay.textContent;
    const shareData = {
        title: 'Inspirational Quote',
        text: quote,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .catch((error) => console.log('Error sharing:', error));
    } else {
        alert('Web Share API not supported in your browser');
    }
}

document.querySelector('#share').addEventListener('click', shareQ);