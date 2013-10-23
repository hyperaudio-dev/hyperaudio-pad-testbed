/*! hyperaudio-pad-testbed v1.2.1 ~ (c) 2012-2013 Hyperaudio Inc. <hello@hyperaud.io> (http://hyperaud.io) */
var hyperaudio=function(){function e(){}function t(t){var s=t.length,i=e.type(t);return e.isWindow(t)?!1:1===t.nodeType&&s?!0:"array"===i||"function"!==i&&(0===s||"number"==typeof s&&s>0&&s-1 in t)}var s={},i=s.toString,o=s.hasOwnProperty;return e.extend=function(){var t,s,i,o,n,r,a=arguments[0]||{},h=1,d=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[1]||{},h=2),"object"==typeof a||e.isFunction(a)||(a={}),d===h&&(a=this,--h);d>h;h++)if(null!==(t=arguments[h]))for(s in t)i=a[s],o=t[s],a!==o&&(l&&o&&(e.isPlainObject(o)||(n=e.isArray(o)))?(n?(n=!1,r=i&&e.isArray(i)?i:[]):r=i&&e.isPlainObject(i)?i:{},a[s]=e.extend(l,r,o)):void 0!==o&&(a[s]=o));return a},e.extend({isFunction:function(t){return"function"===e.type(t)},isArray:Array.isArray,isWindow:function(e){return null!==e&&e===e.window},type:function(e){return null===e?String(e):"object"==typeof e||"function"==typeof e?s[i.call(e)]||"object":typeof e},isPlainObject:function(t){if("object"!==e.type(t)||t.nodeType||e.isWindow(t))return!1;try{if(t.constructor&&!o.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(s){return!1}return!0}}),e.extend({each:function(e,s){var i,o=0,n=e.length,r=t(e);if(r)for(;n>o&&(i=s.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=s.call(e[o],o,e[o]),i===!1)break;return e}}),e.extend({event:{ready:"ha:ready",load:"ha:load",error:"ha:error"},_commonMethods:{options:{DEBUG:!0,entity:"core"},_trigger:function(t,s){var i=e.extend(!0,{options:this.options},s),o=new CustomEvent(t,{detail:i,bubbles:!0,cancelable:!0});this.target.dispatchEvent(o)},_error:function(e){var t={msg:this.options.entity+" Error : "+e};this._trigger(this.event.error,t)},_debug:function(){var t=this;e.each(e.event,function(e,s){t.target.addEventListener(s,function(e){console.log(t.options.entity+" "+s+" event : %o",e)},!1)})}},register:function(t,s){"string"==typeof t&&("function"==typeof s?(s.prototype=e.extend({},this._commonMethods,s.prototype),this[t]=function(e){return new s(e)}):"object"==typeof s&&(s=e.extend({},this._commonMethods,s),this[t]=s))},utility:function(e,t){"string"==typeof e&&(this[e]=t)},jsonp:function(e,t,s){document.getElementsByTagName("head")[0];var i=document.createElement("script");i.type="text/javascript";var o=0;s[o++]=function(){s.call(t,data)},i.src=e},hasClass:function(e,t){if(!e)return!1;var s=new RegExp("(^|\\s)"+t+"(\\s|$)");return s.test(e.className)},addClass:function(e,t){this.hasClass(e,t)||(e.className+=" "+t)},removeClass:function(e,t){if(this.hasClass(e,t)){var s=new RegExp("(^|\\s)"+t+"(\\s|$)","g");e.className=e.className.replace(s," ").replace(/\s{2,}/g," ")}},toggleClass:function(e,t){this.hasClass(e,t)?this.removeClass(e,t):this.addClass(e,t)}}),e}(),DragDrop=function(e,t,s){function i(e){this.options={handle:null,dropArea:null,init:!0,touch:!0,mouse:!0,timeout:500,html:"",draggableClass:"",containerTag:"article",blockTag:"section"};for(var s in e)this.options[s]=e[s];this.dropArea="string"==typeof this.options.dropArea?t.querySelector(this.options.dropArea):this.options.dropArea,this.list=this.dropArea.querySelector(this.options.containerTag),this.list||(this.list=t.createElement(this.options.containerTag),this.dropArea.appendChild(this.list)),this.placeholder=t.createElement(this.options.blockTag),this.placeholder.className="placeholder",this.options.init&&(this.handle="string"==typeof this.options.handle?t.querySelector(this.options.handle):this.options.handle,this.handleClassName=this.handle.className,this.reordering=this.handle.parentNode==this.list,this.options.touch&&this.handle.addEventListener("touchstart",this,!1),this.options.mouse&&this.handle.addEventListener("mousedown",this,!1))}return i.prototype.handleEvent=function(e){switch(e.type){case"mousedown":if(1!==e.which)break;case"touchstart":this.start(e);break;case"touchmove":case"mousemove":this.move(e);break;case"touchend":case"mouseup":this.end(e)}},i.prototype.start=function(e){var s=e.touches?e.touches[0]:e,i=e.touches?t.elementFromPoint(s.pageX,s.pageY):s.target;/INPUT/.test(i.tagName)||(e.preventDefault(),this.options.touch&&t.addEventListener("touchend",this,!1),this.options.mouse&&t.addEventListener("mouseup",this,!1),clearTimeout(this.dragTimeout),this.initiated=!1,this.lastTarget=null,this.dragTimeout=setTimeout(this.init.bind(this,this.options.html||this.handle.innerHTML,e),this.options.timeout))},i.prototype.init=function(e,s){this.options.init||(this.options.touch&&t.addEventListener("touchend",this,!1),this.options.mouse&&t.addEventListener("mouseup",this,!1)),this.draggable=t.createElement("div"),this.draggable.className="draggable "+this.options.draggableClass,this.draggableStyle=this.draggable.style,this.draggableStyle.cssText="position:absolute;z-index:1000;pointer-events:none;left:-99999px",this.draggable.innerHTML=e,t.body.appendChild(this.draggable),this.draggableCenterX=Math.round(this.draggable.offsetWidth/2),this.draggableCenterY=Math.round(this.draggable.offsetHeight/2),this.position(s),this.options.touch&&t.addEventListener("touchmove",this,!1),this.options.mouse&&t.addEventListener("mousemove",this,!1),this.initiated=!0,this.reordering&&(this.handle.style.display="none"),this.move(s),this.options.onDragStart&&this.options.onDragStart.call(this)},i.prototype.position=function(e){var t=e.changedTouches?e.changedTouches[0]:e;this.draggableStyle.left=t.pageX-this.draggableCenterX+"px",this.draggableStyle.top=t.pageY-this.draggableCenterY+"px"},i.prototype.move=function(e){e.preventDefault(),e.stopPropagation();var i=e.changedTouches?e.changedTouches[0]:e,o=e.touches?t.elementFromPoint(i.pageX,i.pageY):i.target;if(this.position(e),o!=this.lastTarget&&o!=this.placeholder&&o!=this.list){if(this.lastTarget=o,o==this.dropArea)return this.list.appendChild(this.placeholder),void 0;if(s.hasClass(o,"item")){for(var n=this.list.querySelectorAll(".item"),r=0,a=n.length;a>r;r++)if(o==n[r]){this.list.insertBefore(this.placeholder,n[r]);break}}else this.list.querySelector(".placeholder")&&this.placeholder.parentNode.removeChild(this.placeholder)}},i.prototype.end=function(e){if(clearTimeout(this.dragTimeout),t.removeEventListener("touchend",this,!1),t.removeEventListener("mouseup",this,!1),this.initiated){t.removeEventListener("touchmove",this,!1),t.removeEventListener("mousemove",this,!1);var s=e.changedTouches?e.changedTouches[0]:e;e.touches?t.elementFromPoint(s.pageX,s.pageY):s.target;var i=this.options.html?this.handle.innerHTML:this.draggable.innerHTML;if(this.draggable.parentNode.removeChild(this.draggable),this.draggable=null,!this.list.querySelector(".placeholder"))return this.reordering&&this.handle.parentNode.removeChild(this.handle),this.options.onDrop&&this.options.onDrop.call(this,null),void 0;var o;this.reordering?(o=this.handle,this.handle.style.display=""):(o=t.createElement(this.options.blockTag),o.className=this.handleClassName||"item",o.innerHTML=i),this.list.insertBefore(o,this.placeholder),this.placeholder.parentNode.removeChild(this.placeholder),this.options.onDrop&&this.options.onDrop.call(this,o)}},i.prototype.destroy=function(){t.removeEventListener("touchstart",this,!1),t.removeEventListener("touchmove",this,!1),t.removeEventListener("touchend",this,!1),t.removeEventListener("mousedown",this,!1),t.removeEventListener("mousemove",this,!1),t.removeEventListener("mouseup",this,!1)},i}(window,document,hyperaudio),WordSelect=function(e,t,s){function i(e){var t=(e.innerText||e.textContent).split(" ");e.innerHTML="<a>"+t.join(" </a><a>")+"</a>"}function o(e){this.options={el:null,addHelpers:!1,touch:!0,mouse:!0,threshold:10};for(var s in e)this.options[s]=e[s];this.element="string"==typeof this.options.el?t.querySelector(this.options.el):this.options.el,this.options.addHelpers&&i(this.element),this.words=this.element.querySelectorAll("a"),this.wordsCount=this.words.length,this.options.touch&&this.element.addEventListener("touchstart",this,!1),this.options.mouse&&this.element.addEventListener("mousedown",this,!1)}return o.prototype.handleEvent=function(e){switch(e.type){case"mousedown":if(1!==e.which)break;case"touchstart":this.start(e);break;case"touchmove":case"mousemove":this.move(e);break;case"touchend":case"mouseup":this.end(e)}},o.prototype.start=function(t){t.preventDefault(),t.touches?t.touches[0]:t,this.selectStarted=!1,this.startX=t.pageX,this.startY=t.pageY,this.options.mouse&&(this.element.addEventListener("mousemove",this,!1),e.addEventListener("mouseup",this,!1)),this.options.touch&&(this.element.addEventListener("touchmove",this,!1),e.addEventListener("touchend",this,!1)),s.hasClass(t.target,"selected")&&(this.dragTimeout=setTimeout(this.dragStart.bind(this,t),500))},o.prototype.selectStart=function(e){var t,i=e.target;if(i!=this.element&&"A"==i.tagName){if(this.selectStarted=!0,this.currentWord=i,s.removeClass(this.element.querySelector(".first"),"first"),s.removeClass(this.element.querySelector(".last"),"last"),this.words[this.startPosition]===i)return t=this.startPosition,this.startPosition=this.endPosition,this.endPosition=t,void 0;if(this.words[this.endPosition]!==i){for(var o=0;o<this.wordsCount;o++)this.words[o]==i&&(this.startPosition=o),s.removeClass(this.words[o],"selected");this.endPosition=this.startPosition,s.addClass(i,"selected")}}},o.prototype.move=function(e){var i,o=e.changedTouches?e.changedTouches[0]:e,n=e.touches?t.elementFromPoint(o.pageX,o.pageY):o.target;if(!(Math.abs(o.pageX-this.startX)<this.options.threshold&&Math.abs(o.pageY-this.startY)<this.options.threshold)){if(clearTimeout(this.dragTimeout),!this.selectStarted)return this.selectStart(e),void 0;if("P"==n.tagName&&(n=n.querySelector("a:last-child")),n!=this.element&&n!=this.currentWord&&"A"==n.tagName){for(var r=0;r<this.wordsCount;r++)this.words[r]==n&&(i=r),void 0===i&&r>=this.startPosition||void 0!==i&&r<=this.startPosition||i==r?s.addClass(this.words[r],"selected"):s.removeClass(this.words[r],"selected");this.currentWord=n,this.endPosition=i}}},o.prototype.end=function(e){if(clearTimeout(this.dragTimeout),this.options.touch&&(this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1)),this.options.mouse&&(this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1)),!this.selectStarted)return e.target==this.element&&this.clearSelection(),void 0;var t=Math.min(this.startPosition,this.endPosition),i=Math.max(this.startPosition,this.endPosition);s.addClass(this.words[t],"first"),s.addClass(this.words[i],"last")},o.prototype.clearSelection=function(){this.currentWord=null,this.startPosition=null,this.endPosition=null,s.removeClass(this.element.querySelector(".first"),"first"),s.removeClass(this.element.querySelector(".last"),"last"),this.options.touch&&(this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1)),this.options.mouse&&(this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1));for(var e=this.element.querySelectorAll(".selected"),t=0,i=e.length;i>t;t++)s.removeClass(e[t],"selected")},o.prototype.getSelection=function(){for(var e,t=this.element.querySelectorAll(".selected"),s="",i=0,o=t.length;o>i;i++)t[i].parentNode!==e&&(e=t[i].parentNode,s+=0===i?"<p>":"</p><p>"),s+=t[i].outerHTML.replace(/ class="[\d\w\s\-]*\s?"/gi," ");return s&&(s+="</p>"),s},o.prototype.dragStart=function(e){e.stopPropagation(),this.options.touch&&(this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1)),this.options.mouse&&(this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1)),e.changedTouches?e.changedTouches[0]:e,this.options.onDragStart&&this.options.onDragStart.call(this,e)},o.prototype.destroy=function(){this.element.removeEventListener("touchstart",this,!1),this.element.removeEventListener("touchmove",this,!1),this.element.removeEventListener("touchend",this,!1),this.element.removeEventListener("mousedown",this,!1),this.element.removeEventListener("mousemove",this,!1),this.element.removeEventListener("mouseup",this,!1)},o}(window,document,hyperaudio),Tap=function(e,t,s){function i(e){this.options={};for(var s in e)this.options[s]=e[s];this.el="string"==typeof this.options.el?t.querySelector(this.options.el):this.options.el,this.el.addEventListener("touchstart",this,!1),this.el.addEventListener("mousedown",this,!1)}return i.prototype={handleEvent:function(e){switch(e.type){case"mousedown":if(1!==e.which)break;case"touchstart":this._start(e);break;case"touchmove":case"mousemove":this._move(e);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(e)}},_start:function(e){if(!(e.touches&&e.touches.length>1)){var t=e.touches?e.touches[0]:e;this.moved=!1,this.startX=t.pageX,this.startY=t.pageY,this.target=e.target,s.addClass(this.target,"tapPressed"),this.el.addEventListener("touchmove",this,!1),this.el.addEventListener("touchend",this,!1),this.el.addEventListener("touchcancel",this,!1),this.el.addEventListener("mousemove",this,!1),this.el.addEventListener("mouseup",this,!1),this.el.addEventListener("mousecancel",this,!1)}},_move:function(e){var t=e.changedTouches?e.changedTouches[0]:e,i=t.pageX,o=t.pageY;(Math.abs(i-this.startX)>10||Math.abs(o-this.startY)>10)&&(s.removeClass(this.target,"tapPressed"),this.moved=!0)},_end:function(e){if(s.removeClass(this.target,"tapPressed"),!this.moved){var i=t.createEvent("Event"),o=e.changedTouches?e.changedTouches[0]:e;i.initEvent("tap",!0,!0),i.pageX=o.pageX,i.pageY=o.pageY,this.target.dispatchEvent(i)}this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.el.removeEventListener("touchcancel",this,!1),this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.el.removeEventListener("mousecancel",this,!1)},destroy:function(){this.el.removeEventListener("touchstart",this,!1),this.el.removeEventListener("touchmove",this,!1),this.el.removeEventListener("touchend",this,!1),this.el.removeEventListener("touchcancel",this,!1),this.el.removeEventListener("mousedown",this,!1),this.el.removeEventListener("mousemove",this,!1),this.el.removeEventListener("mouseup",this,!1),this.el.removeEventListener("mousecancel",this,!1)}},i}(window,document,hyperaudio),EditBlock=function(e){function t(t){this.options={};for(var s in t)this.options[s]=t[s];this.el="string"==typeof this.options.el?e.querySelector(this.options.el):this.options.el,this.words=this.el.querySelectorAll("a"),this.el.className+=" edit",this.el._tap=new Tap({el:this.el}),this.el.addEventListener("tap",this,!1),e.addEventListener("touchend",this,!1),e.addEventListener("mouseup",this,!1)}return t.prototype.handleEvent=function(e){switch(e.type){case"touchend":case"mouseup":this.cancel(e);break;case"tap":this.edit(e)}},t.prototype.cancel=function(e){var t=e.target;t!=this.el&&t.parentNode!=this.el&&t.parentNode.parentNode!=this.el&&this.destroy()},t.prototype.edit=function(t){t.stopPropagation();var s,i=t.target,o=this.words.length;if("A"==i.tagName&&i!=this.words[o-1]){var n,r,a=e.createElement("section");a.className="item";for(var h=0;o>h;h++)this.words[h].parentNode!=r&&(n&&s&&n.querySelector("a")&&a.appendChild(n),n=e.createElement("p"),r=this.words[h].parentNode),s&&(n.appendChild(this.words[h]),r.querySelector("a")||r.parentNode.removeChild(r)),s||this.words[h]!=i||(s=!0);a.appendChild(n);var d=e.createElement("div");d.className="actions",a.appendChild(d),this.el.parentNode.insertBefore(a,this.el.nextSibling),this.el.handleHTML=this.el.innerHTML,APP.dropped(a),this.destroy()}},t.prototype.destroy=function(){this.el.className=this.el.className.replace(/(^|\s)edit(\s|$)/g," "),e.removeEventListener("touchend",this,!1),e.removeEventListener("mouseup",this,!1),this.el.removeEventListener("tap",this,!1),this.el._editBlock=null,this.el._tap.destroy(),this.el._tap=null},t}(document),SideMenu=function(e,t){function s(s){function i(){d.className="dragdrop"}function o(e){var s=e.innerHTML;t.addClass(e,"effect"),e.innerHTML="<form><div>"+s+'</div><label>Delay: <span class="value">1</span>s</label><input type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.parentNode.querySelector(\'span\').innerHTML = this.value"></form>',APP.dropped(e,s)}this.options={};for(var n in s)this.options[n]=s[n];this.el="string"==typeof this.options.el?e.querySelector(this.options.el):this.options.el,this.mediaCallback=this.options.callback;var r=e.querySelector("#sidemenu-handle");r._tap=new Tap({el:r}),r.addEventListener("tap",this.toggleMenu.bind(this),!1),this.updateStatus();var a=e.querySelectorAll("#sidemenu .tabbar li");for(n=a.length-1;n>=0;n--)a[n]._tap=new Tap({el:a[n]}),a[n].addEventListener("tap",this.selectPanel.bind(this),!1);var h=e.querySelectorAll("#sidemenu .panel");for(n=h.length-1;n>=0;n--)h[n]._tap=new Tap({el:h[n]}),h[n].addEventListener("tap",this.selectMedia.bind(this),!1);h=e.querySelectorAll("#panel-bgm li");var d=e.getElementById("stage");for(n=h.length-1;n>=0;n--)h[n]._dragInstance=new DragDrop({handle:h[n],dropArea:d,draggableClass:"draggableEffect",onDragStart:i,onDrop:o})}return s.prototype.updateStatus=function(){this.opened=t.hasClass(this.el,"opened")},s.prototype.toggleMenu=function(){this.opened?this.close():this.open()},s.prototype.open=function(){this.opened||(t.addClass(this.el,"opened"),this.opened=!0)},s.prototype.close=function(){this.opened&&(t.removeClass(this.el,"opened"),this.opened=!1)},s.prototype.selectPanel=function(s){var i=e.querySelector("#sidemenu .tabbar li.selected"),o=s.currentTarget;t.removeClass(i,"selected"),t.addClass(o,"selected");var n="panel"+o.id.replace("sidemenu","");i=e.querySelector("#sidemenu .panel.selected"),t.removeClass(i,"selected"),o=e.querySelector("#"+n),t.addClass(o,"selected")},s.prototype.selectMedia=function(e){e.stopPropagation();var s=e.target;return t.hasClass(e.target.parentNode,"folder")&&(s=e.target.parentNode),t.hasClass(s,"folder")?(t.toggleClass(s,"open"),void 0):(s.getAttribute("data-source")&&this.mediaCallback&&this.mediaCallback(s),void 0)},s}(document,hyperaudio),fadeFX=function(e,t){function s(e){return r===!1?!1:""===r?e:r+e.charAt(0).toUpperCase()+e.substr(1)}function i(e){if(!h){var s={time:2e3,color:"#000000",autostart:!0,crossFade:!0,autoplay:!0};for(var i in e)s[i]=e[i];video=t.querySelector("#stage-videos .active"),h=new o(video,s)}return h}function o(e,s){this.options=s,this.video=e,this.videoIncoming=t.getElementById("stage-video-"+("stage-video-1"==e.id?"2":"1")),this.servo=t.getElementById("fxHelper"),this.servo.style[a]="opacity 0ms",this.servo.style.left="0px",this.servo.style.opacity="0",this.servo.style.backgroundColor=this.options.color,this.options.autostart&&this.start()}var n=t.createElement("div").style,r=function(){for(var e,t=["t","webkitT","MozT","msT","OT"],s=0,i=t.length;i>s;s++)if(e=t[s]+"ransition",e in n)return t[s].substr(0,t[s].length-1);return!1}(),a=s("transition");s("transform"),n=null;var h;return o.prototype.handleEvent=function(e){switch(e.type){case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this.transitionEnd(e)}},o.prototype.start=function(){this.phase="fadeOut",this.servo.addEventListener("transitionend",this,!1),this.servo.addEventListener("webkitTransitionEnd",this,!1),this.servo.addEventListener("oTransitionEnd",this,!1),this.servo.addEventListener("MSTransitionEnd",this,!1),this.servo.offsetHeight,this.servo.style[a]="opacity "+this.options.time+"ms";var e=this;setTimeout(function(){e.servo.style.opacity="1"},0)},o.prototype.transitionEnd=function(e){e.stopPropagation(),this.servo.removeEventListener("transitionend",this,!1),this.servo.removeEventListener("webkitTransitionEnd",this,!1),this.servo.removeEventListener("oTransitionEnd",this,!1),this.servo.removeEventListener("MSTransitionEnd",this,!1),this.video.pause(),"fadeOut"==this.phase?(this.options.onFadeOutEnd&&this.options.onFadeOutEnd.call(this),this.options.crossFade&&(this.phase="waiting",this.video.className=this.video.className.replace(/(^|\s)active($|\s)/,""),this.videoIncoming.className+=" active",this.fadeIn())):"fadeIn"==this.phase&&(this.options.onFadeInEnd&&this.options.onFadeInEnd.call(this),this.destroy())},o.prototype.fadeIn=function(){this.phase="fadeIn",this.servo.addEventListener("transitionend",this,!1),this.servo.addEventListener("webkitTransitionEnd",this,!1),this.servo.addEventListener("oTransitionEnd",this,!1),this.servo.addEventListener("MSTransitionEnd",this,!1),this.options.autoplay&&this.videoIncoming.play(),this.servo.style.opacity="0"},o.prototype.destroy=function(){this.servo.removeEventListener("transitionend",this,!1),this.servo.removeEventListener("webkitTransitionEnd",this,!1),this.servo.removeEventListener("oTransitionEnd",this,!1),this.servo.removeEventListener("MSTransitionEnd",this,!1),this.servo.style[a]="opacity 0ms",this.servo.style.opacity="0",this.servo.style.left="-9999px",h=null},i}(window,document),fadeFX2=function(e,t){function s(e){return r===!1?!1:""===r?e:r+e.charAt(0).toUpperCase()+e.substr(1)}function i(e){if(!h){var s={video:t.querySelector("#stage-videos video"),time:2e3,color:"#000000",autostart:!0,crossFade:!0,autoplay:!0,source:{}};for(var i in e)s[i]=e[i];h=new o(s)}return h}function o(e){this.options=e,this.video=this.options.video,this.videoIncoming=this.options.incoming,this.servo=t.getElementById("fxHelper"),this.servo.style[a]="opacity 0ms",this.servo.style.left="0px",this.servo.style.opacity="0",this.servo.style.backgroundColor=this.options.color,this.options.autostart&&this.start()}var n=t.createElement("div").style,r=function(){for(var e,t=["t","webkitT","MozT","msT","OT"],s=0,i=t.length;i>s;s++)if(e=t[s]+"ransition",e in n)return t[s].substr(0,t[s].length-1);return!1}(),a=s("transition");s("transform"),n=null;var h;return o.prototype.handleEvent=function(e){switch(e.type){case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this.transitionEnd(e);break;case"canplay":this.videoReady()}},o.prototype.start=function(){this.phase="fadeOut",this.servo.addEventListener("transitionend",this,!1),this.servo.addEventListener("webkitTransitionEnd",this,!1),this.servo.addEventListener("oTransitionEnd",this,!1),this.servo.addEventListener("MSTransitionEnd",this,!1),this.servo.offsetHeight,this.servo.style[a]="opacity "+this.options.time+"ms";var e=this;setTimeout(function(){e.servo.style.opacity="1"},0)},o.prototype.transitionEnd=function(e){if(e.stopPropagation(),this.servo.removeEventListener("transitionend",this,!1),this.servo.removeEventListener("webkitTransitionEnd",this,!1),this.servo.removeEventListener("oTransitionEnd",this,!1),this.servo.removeEventListener("MSTransitionEnd",this,!1),this.video.pause(),"fadeOut"==this.phase){if(this.options.onFadeOutEnd&&this.options.onFadeOutEnd.call(this),this.options.crossFade){this.phase="waiting",this.video.addEventListener("canplay",this,!1);for(var t="",s=this.options.source.length-1;0>s;s--)t+='<source src="'+this.options.source[s].src+"\" type='"+this.options.source[s].type+"'>";this.video.innerHTML=t}}else"fadeIn"==this.phase&&(this.options.onFadeInEnd&&this.options.onFadeInEnd.call(this),this.destroy())},o.prototype.videoReady=function(){this.video.removeEventListener("canplay",this,!1),this.fadeIn()},o.prototype.fadeIn=function(){this.phase="fadeIn",this.servo.addEventListener("transitionend",this,!1),this.servo.addEventListener("webkitTransitionEnd",this,!1),this.servo.addEventListener("oTransitionEnd",this,!1),this.servo.addEventListener("MSTransitionEnd",this,!1),this.options.autoplay&&this.video.play(),this.servo.style.opacity="0"},o.prototype.destroy=function(){this.video.removeEventListener("canplay",this,!1),this.servo.removeEventListener("transitionend",this,!1),this.servo.removeEventListener("webkitTransitionEnd",this,!1),this.servo.removeEventListener("oTransitionEnd",this,!1),this.servo.removeEventListener("MSTransitionEnd",this,!1),this.servo.style[a]="opacity 0ms",this.servo.style.opacity="0",this.servo.style.left="-9999px",h=null},i}(window,document),APP={};APP.editBlock=function(e){e.stopPropagation(),this.parentNode._editBlock=new EditBlock({el:this.parentNode})},APP.dropped=function(e,t){var s,i="",o=document.getElementById("stage");o.className="",/(^|\s)effect($|\s)/.test(e.className)?i="draggableEffect":(s=e.querySelector(".actions"),s._tap=new Tap({el:s}),s.addEventListener("tap",APP.editBlock,!1)),e._dragInstance=new DragDrop({handle:e,dropArea:o,html:t,draggableClass:i,onDragStart:function(){o.className="dragdrop"},onDrop:function(){o.className=""}})},APP.init=function(e,t){function s(){a=t.getElementById("stage"),p=t.querySelector("#video-source video"),h=t.getElementById("save-button"),n=new WordSelect({el:"#transcript",addHelpers:!1,onDragStart:function(e){a.className="dragdrop";var t=new DragDrop({dropArea:a,init:!1,onDrop:function(e){n.clearSelection(),this.destroy(),APP.dropped(e)}}),s=this.getSelection().replace(/ class="[\d\w\s\-]*\s?"/gi,"")+'<div class="actions"></div>';t.init(s,e)}}),r=new SideMenu({el:"#sidemenu",callback:o}),h._tap=new Tap({el:h}),h.addEventListener("tap",function(){fadeFX2({source:[{src:"videos/clapper-responds.mp4",type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'},{src:"videos/clapper-responds.webm",type:'video/webm; codecs="vp8, vorbis"'}]})},!1),d=new DragDrop({handle:"#fadeFX",dropArea:a,draggableClass:"draggableEffect",onDragStart:function(){a.className="dragdrop"},onDrop:function(e){e.className+=" effect",e.innerHTML='<form><label>Fade Effect: <span class="value">1</span>s</label><input type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.parentNode.querySelector(\'span\').innerHTML = this.value"></form>',APP.dropped(e,"Fade")}}),l=new DragDrop({handle:"#pauseFX",dropArea:a,draggableClass:"draggableEffect",onDragStart:function(){a.className="dragdrop"},onDrop:function(e){e.className+=" effect",e.innerHTML='<form><label>Pause: <span class="value">1</span>s</label><input type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.parentNode.querySelector(\'span\').innerHTML = this.value"></form>',APP.dropped(e,"Pause")}}),c=new DragDrop({handle:"#titleFX",dropArea:a,draggableClass:"draggableEffect",onDragStart:function(){a.className="dragdrop"},onDrop:function(e){e.className+=" effect",e.innerHTML='<form><label>Title: <span class="value">1</span>s</label><input type="text" value="Title"><input type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.parentNode.querySelector(\'span\').innerHTML = this.value"></form>',APP.dropped(e,"Title")}})}function i(){}function o(e){var s=e.getAttribute("data-source");t.getElementById("source-mp4").src="videos/"+s+".mp4",t.getElementById("source-webm").src="videos/"+s+".webm",p.load()}var n,r,a,h,d,l,c,p;return e.addEventListener("load",s,!1),t.addEventListener("touchmove",function(e){e.preventDefault()},!1),i}(window,document);