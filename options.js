"use strict";

/* global chrome, window, document */

const textarea = document.getElementById("textarea");
const checkbox = document.getElementById("checkbox");

textarea.placeholder = [
  "facebook.com",
  "instagram.com",
  "youtube.com",
  "!music.youtube.com",
  "twitter.com",
  "reddit.com",
  "!reddit.com/r/MachineLearning",
].join("\n");

textarea.addEventListener("change", (event) => {
  const blocked = event.target.value.split("\n").map(s => s.trim()).filter(Boolean);

  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;

  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (!Array.isArray(blocked)) {
      return;
    }

    // blocked
    var value = blocked.join("\r\n"); // display every blocked in new line
    textarea.value = value;

    // enabled
    checkbox.checked = enabled;

    // UI ready
    document.body.classList.add("ready");
  });
});
