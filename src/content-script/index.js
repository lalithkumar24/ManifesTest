import browser from "webextension-polyfill";

console.log("Content Script loaded on this page!");
let formattedContent;

setTimeout(() => {
  const pageContent = document.body.innerText;
  browser.runtime.sendMessage({
    message:"pageContent",
    content: pageContent
  })
}, 1000);

browser.runtime.onMessage.addListener((message) => {
  if(message.type === "FormattedContent"){
    formattedContent = message.content;
    console.log(message.content);
  }
});
browser.runtime.sendMessage({
  message:"gen_mcq",
  conttent:formattedContent,
  no_of_questions:10,
});

browser.runtime.onMessage.addListener((message) => {
  if(message.type === "MCQContent"){
    console.log("Received MCQ Content:", message.content);
  } 
});


//
// browser.runtime.sendMessage({
//   test_id:1233,
//   test_type:"MCQ",
//   test_size:10,
// })
