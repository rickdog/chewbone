/*
parse inoreader OPML
 */

var folders = document.children.item("opml").firstElementChild.nextElementSibling.children;
for (var item of folders) {
 console.log(item);
}
