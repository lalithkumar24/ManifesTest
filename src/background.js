import browser from "webextension-polyfill";
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});


browser.runtime.onMessage.addListener(async (messagee) => {

  if (messagee.message === "pageContent") {
    console.log(messagee.content);

    const formatPrompt = `
      I will provide you with the content of a webpage. Extract only the main content of the page, ignoring navigation menus, headers, footers, ads, and unrelated links. 
      1. Give the title of the page.
      2. Present the main content in clean, readable format.
      3. Keep lists, headings, and code blocks intact.
      4. Remove any unrelated content like "Sign In", "Explore", "Follow", company info, or other menus.
      Webpage content:
      ${messagee.content} 
    `;

    try {
      const session = await LanguageModel.create({
        systemPrompt: "You are content formater for a large company website. You are given the content of a webpage and you need to format it."
      });

      const stream = await session.promptStreaming(formatPrompt);
      
      let formattedPageContent = '';

      for await (const chunk of stream) {
        formattedPageContent += chunk;
        console.log(chunk); 
      }
      
      browser.runtime.sendMessage({
        type: "FormattedContent",
        content: formattedPageContent
      });

      console.log('Final Formatted Content:', formattedPageContent);
      
    } catch (error) {
      console.error('AI Prompt API Error:', error);
      browser.runtime.sendMessage({
        type: "Error",
        content: "Failed to process content with AI: " + error.message
      });
    }
  }
});

browser.action.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePopup' });
});
