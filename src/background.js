import browser from "webextension-polyfill";
import { YoutubeTranscript } from "@danielxceron/youtube-transcript";
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

async function fetchTranscript(videoId) {
  if (!videoId) {
    console.error("Video id was not provided");
    return;
  }

  try {
    delay(2900)
    const transcript = YoutubeTranscript.fetchTranscript(videoId).then(console.log);
    console.log(transcript);
    return transcript;
    if(transcript.length <= 0){
      console.warn("There was no transcript found");
      
    }
  } catch (error) {
    console.error("Error fetching transcript:", error);
  }
}

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    try {
      const url = new URL(tab.url);
      const hostname = url.hostname;
      const pathname = url.pathname;

      if ((hostname === "www.youtube.com" || hostname === "m.youtube.com") && pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        if (videoId) {
          console.log("User has loaded a YouTube video:", videoId);
          const transcript = await fetchTranscript(videoId);
          if (transcript) {
            browser.tabs.sendMessage(tabId, { type: "transcript", transcript: transcript });
          }
        }
      }
    } catch (error) {
       console.error("Error in onUpdated listener:", error);
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'togglePopup' });
});
