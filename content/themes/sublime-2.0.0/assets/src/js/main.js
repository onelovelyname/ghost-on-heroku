//
//    Sublime by STYLESHEETS.DEV
//    https://stylesheets.dev | @arp_ban
//

// Set current page variable to empty
var current_page = ""; 

// Toggle drawer menu
function openDrawer() {
    $(".drawer-handle").toggleClass("open");
    $(".drawer-menu").toggleClass("open");
}

// Toggle's the sub-menu inside the drawer-menu
function toggleNavDropdownMenu(){
    $(".navigation-dropdown-menu").toggleClass("hidden");
}

// return to the previous page
function goback() {
    if (window.history.length == 1) {
        window.location.href = "/";
    } else {
        window.history.back();
    }
}

// Ajax post loader (called by load-more button)
// Currently not using this function
function loadMorePosts(){
    var btn = document.querySelector('.load-more-posts button');
    var spinner = document.querySelector('.lds-ripple');
    var message = document.querySelector('.load-more-posts .message');
    
    // next link element
    var nextElement = document.querySelector('link[rel=next]');
    if (!nextElement){
        btn.style.display = "none";
        message.style.display = "block";
        return;
    };

    // post feed element
    var feedElements = document.querySelectorAll('.post-feed');
    var feedElement = feedElements[0];
    if (!feedElement) return;

    // disable button until post loads
    btn.disabled = true;
    btn.style.display = "none";

    // activate spinner
    spinner.style.display = "block";

    var xhr = new window.XMLHttpRequest();
    xhr.responseType = 'document';

    xhr.addEventListener('load', function(){
        // append contents
        var postElements = this.response.querySelectorAll('.post-card');
        postElements.forEach(function (item) {
            feedElement.appendChild(item);
            imagesLoaded(item, function(){
                msnry.appended(item);
            })
        });

        // set next link
        var resNextElement = this.response.querySelector('link[rel=next]');
        if (resNextElement) {
            nextElement.href = resNextElement.href;
            btn.disabled = false;
            btn.style.display = "block";
            spinner.style.display = "none";
        } else {
            console.log("Reached end");
            message.style.display = "block";
            btn.style.display = "none";
            spinner.style.display = "none";
        }
    });

    xhr.open('GET', nextElement.href);
    xhr.send(null);
}