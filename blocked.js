/* global window, document, URLSearchParams */

const url = (new URLSearchParams(window.location.search)).get("url");
document.getElementById("url").innerHTML =
  '<a href=" ' + url + '">' + url + "</a>";
