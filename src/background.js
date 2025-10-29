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

      const formattedPageContent = await session.prompt(formatPrompt);
      
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
  }else if(messagee.message === "gen_mcq"){
    console.log("Generating MCQs for content:", messagee.conttent);
    const mcq_prompt = `
      Based on the following content, generate ${messagee.no_of_questions} multiple-choice questions (MCQs) with 4 options each and indicate the correct answer in json format with correct option number as "crt_op_no".
      Content:
      ${messagee.conttent}
    `;
    try {
      const session = await LanguageModel.create({
        systemPrompt: "You are a helpful assistant that generates multiple-choice questions (MCQs) from given content."
      });
      const mcqContent = await session.prompt(mcq_prompt);
      
      browser.runtime.sendMessage({
        type: "MCQContent",
        content: mcqContent
      });
      console.log('Generated MCQs:', mcqContent);
    } catch (error) {
      console.error('AI Prompt API Error:', error);
      browser.runtime.sendMessage({
        type: "Error",
        content: "Failed to generate MCQs with AI: " + error.message
      });
    }
  }
});

browser.action.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { action: 'togglePopup' });
});
