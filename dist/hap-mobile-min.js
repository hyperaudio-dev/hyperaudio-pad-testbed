/*! hap-mobile v1.0.0 ~ (c) 2012-2013 Hyperaudio Inc. <hello@hyperaud.io> (http://hyperaud.io) */
var DragDrop=function(e,t){function s(e,s,i){this.options={init:!0,touch:!0,mouse:!0,timeout:500,html:"",draggableClass:""};for(var o in i)this.options[o]=i[o];this.droppable="string"==typeof s?t.querySelector(s):s,this.list=this.droppable.querySelector("ul"),this.list||(this.list=t.createElement("ul"),this.droppable.appendChild(this.list)),this.placeholder=t.createElement("li"),this.placeholder.className="placeholder",this.options.init&&(this.handle="string"==typeof e?t.querySelector(e):e,this.handleClassName=this.handle.className,this.reordering=this.handle.parentNode==this.list,this.options.touch&&this.handle.addEventListener("touchstart",this,!1),this.options.mouse&&this.handle.addEventListener("mousedown",this,!1))}return s.prototype.handleEvent=function(e){switch(e.type){case"mousedown":if(1!==e.which)break;case"touchstart":this.start(e);break;case"touchmove":case"mousemove":this.move(e);break;case"touchend":case"mouseup":this.end(e)}},s.prototype.start=function(e){/INPUT/.test(e.target.tagName)||(e.preventDefault(),this.options.touch&&t.addEventListener("touchend",this,!1),this.options.mouse&&t.addEventListener("mouseup",this,!1),clearTimeout(this.dragTimeout),this.initiated=!1,this.lastTarget=null,this.dragTimeout=setTimeout(this.init.bind(this,this.options.html||this.handle.innerHTML,e),this.options.timeout))},s.prototype.init=function(e,s){this.options.init||(this.options.touch&&t.addEventListener("touchend",this,!1),this.options.mouse&&t.addEventListener("mouseup",this,!1)),this.draggable=t.createElement("div"),this.draggable.className="draggable "+this.options.draggableClass,this.draggableStyle=this.draggable.style,this.draggableStyle.cssText="position:absolute;z-index:1000;pointer-events:none;left:-99999px",this.draggable.innerHTML=e,t.body.appendChild(this.draggable),this.draggableCenterX=Math.round(this.draggable.offsetWidth/2),this.draggableCenterY=Math.round(this.draggable.offsetHeight/2),this.position(s),this.options.touch&&t.addEventListener("touchmove",this,!1),this.options.mouse&&t.addEventListener("mousemove",this,!1),this.initiated=!0,this.reordering&&(this.handle.style.display="none"),this.move(s),this.options.onDragStart&&this.options.onDragStart.call(this)},s.prototype.position=function(e){var t=e.changedTouches?e.changedTouches[0]:e;this.draggableStyle.left=t.pageX-this.draggableCenterX+"px",this.draggableStyle.top=t.pageY-this.draggableCenterY+"px"},s.prototype.move=function(e){e.preventDefault(),e.stopPropagation();var s=e.changedTouches?e.changedTouches[0]:e,i=e.touches?t.elementFromPoint(s.pageX,s.pageY):s.target;if(this.position(e),i!=this.lastTarget&&i!=this.placeholder&&i!=this.list){if(this.lastTarget=i,this.list.querySelector(".placeholder")&&this.list.removeChild(this.placeholder),i==this.droppable)return this.list.appendChild(this.placeholder),void 0;if(/(^|\s)item(\s|$)/.test(i.className))for(var o=this.list.querySelectorAll(".item"),n=0,r=o.length;r>n;n++)if(i==o[n]){this.list.insertBefore(this.placeholder,o[n]);break}}},s.prototype.end=function(e){if(clearTimeout(this.dragTimeout),t.removeEventListener("touchend",this,!1),t.removeEventListener("mouseup",this,!1),this.initiated){t.removeEventListener("touchmove",this,!1),t.removeEventListener("mousemove",this,!1);var s=e.changedTouches?e.changedTouches[0]:e;e.touches?t.elementFromPoint(s.pageX,s.pageY):s.target;var i=this.options.html?this.handle.innerHTML:this.draggable.innerHTML;if(this.draggable.parentNode.removeChild(this.draggable),this.draggable=null,this.reordering&&(this.handle._dragInstance&&(this.handle._dragInstance.destroy(),this.handle._dragInstance=null),this.handle.parentNode.removeChild(this.handle)),this.list.querySelector(".placeholder")){var o=t.createElement("li");o.className=this.handleClassName||"item",o.innerHTML=i,this.list.insertBefore(o,this.placeholder),this.placeholder.parentNode.removeChild(this.placeholder),this.options.onDrop&&this.options.onDrop.call(this,o)}}},s.prototype.destroy=function(){t.removeEventListener("touchstart",this,!1),t.removeEventListener("touchmove",this,!1),t.removeEventListener("touchend",this,!1),t.removeEventListener("mousedown",this,!1),t.removeEventListener("mousemove",this,!1),t.removeEventListener("mouseup",this,!1)},s}(window,document),WordSelect=function(e,t){function s(e){var t=(e.innerText||e.textContent).split(" ");e.innerHTML="<a>"+t.join(" </a><a>")+"</a>"}function i(e,t){if(!e)return!1;var s=new RegExp("(^|\\s)"+t+"(\\s|$)");return s.test(e.className)}function o(e,t){if(!i(e,t)){var s=e.className.split(" ");s.push(t),e.className=s.join(" ")}}function n(e,t){if(i(e,t)){var s=new RegExp("(^|\\s)"+t+"(\\s|$)","g");e.className=e.className.replace(s," ")}}function r(e,i){this.element=t.querySelector(e),this.options={addHelpers:!1,touch:!0,mouse:!0,threshold:10};for(var o in i)this.options[o]=i[o];this.options.addHelpers&&s(this.element),this.words=this.element.querySelectorAll("a"),this.wordsCount=this.words.length,this.options.touch&&this.element.addEventListener("touchstart",this,!1),this.options.mouse&&this.element.addEventListener("mousedown",this,!1)}return r.prototype.handleEvent=function(e){switch(e.type){case"mousedown":if(1!==e.which)break;case"touchstart":this.start(e);break;case"touchmove":case"mousemove":this.move(e);break;case"touchend":case"mouseup":this.end(e)}},r.prototype.start=function(e){e.preventDefault(),e.touches?e.touches[0]:e,this.selectStarted=!1,this.startX=e.pageX,this.startY=e.pageY,this.options.mouse&&(this.element.addEventListener("mousemove",this,!1),this.element.addEventListener("mouseup",this,!1)),this.options.touch&&(this.element.addEventListener("touchmove",this,!1),this.element.addEventListener("touchend",this,!1)),i(e.target,"selected")&&(this.dragTimeout=setTimeout(this.dragStart.bind(this,e),500))},r.prototype.selectStart=function(e){var t,s=e.target;if(s!=this.element&&"A"==s.tagName){if(this.selectStarted=!0,this.currentWord=s,n(this.element.querySelector(".first"),"first"),n(this.element.querySelector(".last"),"last"),this.words[this.startPosition]===s)return t=this.startPosition,this.startPosition=this.endPosition,this.endPosition=t,void 0;if(this.words[this.endPosition]!==s){for(var i=0;i<this.wordsCount;i++)this.words[i]==s&&(this.startPosition=i),n(this.words[i],"selected");this.endPosition=this.startPosition,o(s,"selected")}}},r.prototype.move=function(e){var s,i=e.changedTouches?e.changedTouches[0]:e,r=e.touches?t.elementFromPoint(i.pageX,i.pageY):i.target;if(!(Math.abs(i.pageX-this.startX)<this.options.threshold&&Math.abs(i.pageY-this.startY)<this.options.threshold)){if(clearTimeout(this.dragTimeout),!this.selectStarted)return this.selectStart(e),void 0;if("P"==r.tagName&&(r=r.querySelector("a:last-child")),r!=this.element&&r!=this.currentWord&&"A"==r.tagName){for(var a=0;a<this.wordsCount;a++)this.words[a]==r&&(s=a),void 0===s&&a>=this.startPosition||void 0!==s&&a<=this.startPosition||s==a?o(this.words[a],"selected"):n(this.words[a],"selected");this.currentWord=r,this.endPosition=s}}},r.prototype.end=function(e){if(clearTimeout(this.dragTimeout),this.options.touch&&(this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1)),this.options.mouse&&(this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1)),!this.selectStarted)return e.target==this.element&&this.clearSelection(),void 0;var t=Math.min(this.startPosition,this.endPosition),s=Math.max(this.startPosition,this.endPosition);o(this.words[t],"first"),o(this.words[s],"last")},r.prototype.clearSelection=function(){this.currentWord=null,this.startPosition=null,this.endPosition=null,n(this.element.querySelector(".first"),"first"),n(this.element.querySelector(".last"),"last"),this.options.touch&&(this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1)),this.options.mouse&&(this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1));for(var e=this.element.querySelectorAll(".selected"),t=0,s=e.length;s>t;t++)n(e[t],"selected")},r.prototype.getSelection=function(){for(var e,t=this.element.querySelectorAll(".selected"),s="",i=0,o=t.length;o>i;i++)t[i].parentNode!==e&&(e=t[i].parentNode,s+=0===i?"<p>":"</p><p>"),s+=t[i].outerHTML.replace(/ class="[\d\w\s\-]*\s?"/gi," ");return s&&(s+="</p>"),s},r.prototype.dragStart=function(e){e.stopPropagation(),this.options.touch&&(this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1)),this.options.mouse&&(this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1)),e.changedTouches?e.changedTouches[0]:e,this.options.onDragStart&&this.options.onDragStart.call(this,e)},r.prototype.destroy=function(){this.element.removeEventListener("touchstart",this,!1),this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1),this.element.removeEventListener("mousedown",this,!1),this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1)},r}(window,document),APP={};APP.editBlock=function(e){e.stopPropagation(),this.parentNode._editBlock=new APP.EditBlock(this.parentNode)},APP.dropped=function(e,t){var s,i="",o=document.getElementById("stage");o.className="",/(^|\s)effect($|\s)/.test(e.className)?i="draggableEffect":(s=e.querySelector(".actions"),s._tap=new APP.Tap(s),s.addEventListener("tap",APP.editBlock,!1)),e._dragInstance=new DragDrop(e,o,{html:t,draggableClass:i,onDragStart:function(){o.className="dragdrop",e.style.display="none",s&&s._tap.destroy()},onDrop:function(e){APP.dropped(e,t)}})},APP.init=function(e,t){function s(){r=t.getElementById("stage"),o=new WordSelect("#transcript",{addHelpers:!1,onDragStart:function(e){r.className="dragdrop";var t=new DragDrop(null,r,{init:!1,onDrop:function(e){o.clearSelection(),this.destroy(),APP.dropped(e)}}),s=this.getSelection().replace(/ class="[\d\w\s\-]*\s?"/gi,"")+'<div class="actions"></div>';t.init(s,e)}}),n=new APP.SideMenu("#sidemenu"),a=new DragDrop("#fadeFX",r,{draggableClass:"draggableEffect",onDragStart:function(){r.className="dragdrop"},onDrop:function(e){e.className+=" effect",e.innerHTML='<form><label>Fade Effect: <span class="value">1</span>s</label><input type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.parentNode.querySelector(\'span\').innerHTML = this.value"></form>',APP.dropped(e,"Fade")}}),h=new DragDrop("#pauseFX",r,{draggableClass:"draggableEffect",onDragStart:function(){r.className="dragdrop"},onDrop:function(e){e.className+=" effect",e.innerHTML='<form><label>Pause: <span class="value">1</span>s</label><input type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.parentNode.querySelector(\'span\').innerHTML = this.value"></form>',APP.dropped(e,"Pause")}})}function i(){}var o,n,r,a,h;return e.addEventListener("load",s,!1),t.addEventListener("touchmove",function(e){e.preventDefault()},!1),i}(window,document),APP.Tap=function(){function e(e,t){if(!e)return!1;var s=new RegExp("(^|\\s)"+t+"(\\s|$)");return s.test(e.className)}function t(t,s){if(!e(t,s)){var i=t.className.split(" ");i.push(s),t.className=i.join(" ")}}function s(t,s){if(e(t,s)){var i=new RegExp("(^|\\s)"+s+"(\\s|$)","g");t.className=t.className.replace(i," ")}}function i(e){this.el="string"==typeof e?document.querySelector(e):e,this.el.addEventListener("touchstart",this,!1),this.el.addEventListener("mousedown",this,!1)}return i.prototype={handleEvent:function(e){switch(e.type){case"mousedown":if(1!==e.which)break;case"touchstart":this._start(e);break;case"touchmove":case"mousemove":this._move(e);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(e)}},_start:function(e){if(!(e.touches&&e.touches.length>1)){var s=e.touches?e.touches[0]:e;this.moved=!1,this.startX=s.pageX,this.startY=s.pageY,this.target=e.target,t(this.target,"tapPressed"),this.el.addEventListener("touchmove",this,!1),this.el.addEventListener("touchend",this,!1),this.el.addEventListener("touchcancel",this,!1),this.el.addEventListener("mousemove",this,!1),this.el.addEventListener("mouseup",this,!1),this.el.addEventListener("mousecancel",this,!1)}},_move:function(e){var t=e.changedTouches?e.changedTouches[0]:e,i=t.pageX,o=t.pageY;(Math.abs(i-this.startX)>10||Math.abs(o-this.startY)>10)&&(s(this.target,"tapPressed"),this.moved=!0)},_end:function(e){if(s(this.target,"tapPressed"),!this.moved){var t=document.createEvent("Event"),i=e.changedTouches?e.changedTouches[0]:e;t.initEvent("tap",!0,!0),t.pageX=i.pageX,t.pageY=i.pageY,this.target.dispatchEvent(t)}this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.el.removeEventListener("touchcancel",this,!1),this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.el.removeEventListener("mousecancel",this,!1)},destroy:function(){this.el.removeEventListener("touchstart",this,!1),this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.el.removeEventListener("touchcancel",this,!1),this.el.removeEventListener("mousedown",this,!1),this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.el.removeEventListener("mousecancel",this,!1)}},i}(),APP.EditBlock=function(){function e(e){this.el="string"==typeof e?document.querySelector(e):e,this.words=this.el.querySelectorAll("a"),this.el.className+=" edit",this.el._tap=new APP.Tap(e),this.el.addEventListener("tap",this,!1)}return e.prototype.handleEvent=function(e){switch(e.type){case"tap":this.edit(e)}},e.prototype.edit=function(e){var t,s=e.target,i=this.words.length;if("A"==s.tagName&&s!=this.words[i-1]){var o,n,r=document.createElement("li");r.className="item";for(var a=0;i>a;a++)this.words[a].parentNode!=n&&(o&&t&&r.appendChild(o),o=document.createElement("p"),n=this.words[a].parentNode),t&&(o.appendChild(this.words[a]),n.querySelector("a")||n.parentNode.removeChild(n)),t||this.words[a]!=s||(t=!0);r.appendChild(o);var h=document.createElement("div");h.className="actions",r.appendChild(h),this.el.parentNode.insertBefore(r,this.el.nextSibling),this.el.handleHTML=this.el.innerHTML,APP.dropped(r),this.el.className=this.el.className.replace(/(^|\s)edit(\s|$)/g," "),this.destroy()}},e.prototype.destroy=function(){this.el.removeEventListener("tap",this,!1),this.el._editBlock=null,this.el._tap.destroy(),this.el._tap=null},e}(),APP.SideMenu=function(e){function t(t){this.el=e.querySelector(t);var s=e.querySelector("#sidemenu-handle");s._tap=new APP.Tap(s),s.addEventListener("tap",this.toggleMenu.bind(this),!1),this.updateStatus()}return t.prototype.updateStatus=function(){this.opened=/(^|\s)opened(\s|$)/.test(this.el.className)},t.prototype.toggleMenu=function(){this.opened?this.close():this.open()},t.prototype.open=function(){this.opened||(this.el.className+=" opened",this.opened=!0)},t.prototype.close=function(){this.opened&&(this.el.className=this.el.className.replace(/(^|\s)opened(\s|$)/," "),this.opened=!1)},t}(document);