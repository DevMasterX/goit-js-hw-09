!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body"),a=null;t.addEventListener("click",(function(){a||(a=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),t.disabled=!0,e.disabled=!1)})),e.addEventListener("click",(function(){clearInterval(a),a=null,t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.3c896b09.js.map
