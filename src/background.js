import browser from "webextension-polyfill"; 
import { YouTubeTranscriptApi } from "youtube-transcript-api";
console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

async function fetchTranscript(videoId) {
  const api = new YouTubeTranscriptApi();
  try {
    const transcript = await api.fetch(videoId); // Rick Roll video
    console.log('Transcript snippets:');
    transcript.snippets.forEach(snippet => {
      console.log(`[${snippet.start}s] ${snippet.text}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
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
