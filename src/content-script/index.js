import browser from "webextension-polyfill";

console.log("Content Script loaded on this page!");

setTimeout(() => {
  const pageContent = document.body.innerText;
  browser.runtime.sendMessage({
    message:"pageContent",
    content: pageContent
  })
}, 1000);

browser.runtime.onMessage.addListener((message) => {
  if(message.type === "FormattedContent"){
    console.log(message.content);
  }
});


//
// browser.runtime.sendMessage({
//   test_id:1233,
//   test_type:"MCQ",
//   test_size:10,
// })
