// ==UserScript==
// @name        Broken Image Fixer
// @namespace   https://easrng.github.io/
// @match       https://scratch.mit.edu/*
// @grant       none
// @version     1.1
// @author      A-E-
// @homepageURL https://github.com/easrng/fix-broken-images
// @supportURL  https://github.com/easrng/fix-broken-images/issues
// @updateURL   https://easrng.github.io/fix-broken-images/f-b-i.user.js
// @description Fixes the broken images resulting from the Wikimedia Open Redirect fix, plus tries to fix some Tinypic images.
// @run-at      document-end
// ==/UserScript==

function goodbye(){
  this.src="https://tinypic.com/images/goodbye.jpg"
}

console.log('Fixing broken images...');
for(let i of document.querySelectorAll('[src*="://secure.wikimedia.org/wikipedia/"]')){
  let m=i.src.match(/^https?:\/\/secure.wikimedia.org\/wikipedia\/([^\/]+)%5c\/..%5c(.+)/i);
    i.src=`https://${m[1]}/${m[2]}`;
  }
  for(let i of document.querySelectorAll('[src*=".tinypic.com/"]')){
    let m=i.src.match(/^https?:\/\/i[^\.]+\.tinypic.com\/[^\/]+\..+$/i);
    if(m){
      i.src=`https://web.archive.org/web/1im_/${i.src}`;
      i.addEventListener("error",goodbye)
    }
}
