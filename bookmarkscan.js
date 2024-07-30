// Function for when a bookmark is created
let found = false;
function onBookmarkCreated(id, bookmark) {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        for (let node of bookmarkTreeNodes) {
            iterateBookmarks(node, bookmark);
        }
        found = false;
    });    
}
  
  // Add event listener for when a new bookmark is created
chrome.bookmarks.onCreated.addListener(onBookmarkCreated);
  
  // Function to recursively iterate through bookmarks (for reference)
function iterateBookmarks(bookmarkNode, bookmark) {
    if (found) return;
  
    if (bookmarkNode.children) {
        for (let child of bookmarkNode.children) {
            iterateBookmarks(child, bookmark);
        }
    } else {
        const bookmarkUrl = bookmark.url.lastIndexOf(".");
        const url = bookmarkNode.url.lastIndexOf(".")
        // Compare two urls
        if (bookmarkNode.url.substring(0, url) === bookmark.url.substring(0, bookmarkUrl) &&
            bookmarkNode.id !== bookmark.id) {
            // Create notification
            chrome.notifications.create({
                type: "basic",
                iconUrl: chrome.runtime.getURL("Boo_Island_Tour.png"),
                title: "Hello Extensions",
                message: "You created a bookmark to a website you already bookmarked!",
            });
            console.log(bookmarkNode.url.substring(0, url))
            found = true;
        }
    }
}
