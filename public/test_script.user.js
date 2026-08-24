// ==UserScript==
// @name         chinese webpage tools
// @namespace    http://tampermonkey.net/
// @version      2026-08-24
// @description  try to take over the world!
// @author       You
// @updateURL    https://orangishcat.github.io/test_script.user.js
// @downloadURL  https://orangishcat.github.io/test_script.user.js
// @match        https://www.echineseworld.com/*/Stu_Homework.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=echineseworld.com
// ==/UserScript==

(function () {
  "use strict";

  let doc = document;

  function runOrder(...funcs) {
    let i = 1;
    for (const func of funcs) {
      try {
        func();
        console.log(`Func ${i} succeeded!`);
        return;
      } catch (e) {
        console.log(`Func ${i++} failed:`, e);
      }
    }
  }

  function fillTagValue() {
    doc = document.querySelector("[id*=layui-layer-iframe]").contentWindow
      .document;
    const inputs = doc.querySelectorAll(".tl_section_r_div input");
    for (const input of inputs) {
      input.value = (
        input.getAttribute("tagvalue") || input.getAttribute("tarvalue")
      ).trim();
    }
    console.log("body element:", doc.body);
    const message =
      (Math.random() < 0.5 ? "Done :D" : "Completed ;)") +
      " (" +
      inputs.length +
      " found)";
    GM_notification({ text: message });
    console.log(message);
  }

  function fillStdAns() {
    const window = document.querySelector(
      "[id*=layui-layer-iframe]",
    ).contentWindow;
    doc = window.document;
    let i = 0;
    console.log("answer list:", window.StdAnswerList);
    const sections = doc.querySelectorAll("section");
    console.log("sections:", sections);
    for (const ans of window.StdAnswerList) {
      const selector = `:nth-child(${ans.toUpperCase().charCodeAt() - 64} of li) input`;
      console.log(`Selecting ${selector}`);
      sections[i++].querySelector(selector).click();
    }
  }

  function fillDataAnswer() {
    const window = document.querySelector(
      "[id*=layui-layer-iframe]",
    ).contentWindow;
    doc = window.document;
    const questions = doc.querySelectorAll(
      "#objectiveCont section.unit-test-question",
    );
    for (const ques of questions) {
      const ans = ques.getAttribute("data-answer").trim();
      let selector = `input[value=${ans}]`;
      console.log(`Attempting to select ${selector} from `, ques);
      ques.querySelector(selector).checked = true;
    }
  }

  document.addEventListener(
    "keydown",
    (ev) => {
      if (!ev.altKey) return;
      console.log(`Pressed: Opt+${ev.code}`);
      if (ev.code === "KeyV") {
        ev.preventDefault();
        runOrder(fillTagValue, fillStdAns, fillDataAnswer);
      }
    },
    true,
  );
})();
