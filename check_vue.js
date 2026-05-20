const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('prompt-app.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });

dom.window.onerror = function(msg, source, lineno, colno, error) {
  console.log('Browser Error:', msg, lineno, colno);
};

dom.window.addEventListener('load', () => {
  setTimeout(() => {
    console.log('Document loaded. Vue should have mounted if no errors.');
    console.log('Is app mounted?', dom.window.document.querySelector('#app').__vue_app__ !== undefined);
  }, 1000);
});
