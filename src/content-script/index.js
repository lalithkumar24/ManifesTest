import browser from "webextension-polyfill";

console.log("Content Script loaded on this page!");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "transcript") {
    console.log("✅ Transcript received in content script:", message.transcript);
    alert("Transcript has been loaded!");
  }
});
