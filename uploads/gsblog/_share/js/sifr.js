/*=:project
    scalable Inman Flash Replacement (sIFR) version 3, revision 230

  =:file
    Copyright: 2006 Mark Wubben.
    Author: Mark Wubben, <http://novemberborn.net/>

  =:history
    * IFR: Shaun Inman
    * sIFR 1: Mike Davidson, Shaun Inman and Tomas Jogin
    * sIFR 2: Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

  =:license
    This software is licensed and provided under the CC-GNU LGPL.
    See <http://creativecommons.org/licenses/LGPL/2.1/>    
*/

var parseSelector=(function(){var _1=/\s*,\s*/;var _2=/\s*([\s>+~(),]|^|$)\s*/g;var _3=/([\s>+~,]|[^(]\+|^)([#.:@])/g;var _4=/^[^\s>+~]/;var _5=/[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;function parseSelector(_6,_7){_7=_7||document.documentElement;var _8=_6.split(_1),_9=[];for(var i=0;i<_8.length;i++){var _b=[_7],_c=toStream(_8[i]);for(var j=0;j<_c.length;){var _e=_c[j++],_f=_c[j++],_10="";if(_c[j]=="("){while(_c[j++]!=")"&&j<_c.length){_10+=_c[j]}_10=_10.slice(0,-1)}_b=select(_b,_e,_f,_10)}_9=_9.concat(_b)}return _9}function toStream(_11){var _12=_11.replace(_2,"$1").replace(_3,"$1*$2");if(_4.test(_12)){_12=" "+_12}return _12.match(_5)||[]}function select(_13,_14,_15,_16){return (_17[_14])?_17[_14](_13,_15,_16):[]}var _18={toArray:function(_19){var a=[];for(var i=0;i<_19.length;i++){a.push(_19[i])}return a}};var dom={isTag:function(_1d,tag){return (tag=="*")||(tag.toLowerCase()==_1d.nodeName.toLowerCase())},previousSiblingElement:function(_1f){do{_1f=_1f.previousSibling}while(_1f&&_1f.nodeType!=1);return _1f},nextSiblingElement:function(_20){do{_20=_20.nextSibling}while(_20&&_20.nodeType!=1);return _20},hasClass:function(_21,_22){return (_22.className||"").match("(^|\\s)"+_21+"(\\s|$)")},getByTag:function(tag,_24){return _24.getElementsByTagName(tag)}};var _17={"#":function(_25,_26){for(var i=0;i<_25.length;i++){if(_25[i].getAttribute("id")==_26){return [_25[i]]}}return []}," ":function(_28,_29){var _2a=[];for(var i=0;i<_28.length;i++){_2a=_2a.concat(_18.toArray(dom.getByTag(_29,_28[i])))}return _2a},">":function(_2c,_2d){var _2e=[];for(var i=0,_30;i<_2c.length;i++){_30=_2c[i];for(var j=0,_32;j<_30.childNodes.length;j++){_32=_30.childNodes[j];if(_32.nodeType==1&&dom.isTag(_32,_2d)){_2e.push(_32)}}}return _2e},".":function(_33,_34){var _35=[];for(var i=0,_37;i<_33.length;i++){_37=_33[i];if(dom.hasClass([_34],_37)){_35.push(_37)}}return _35},":":function(_38,_39,_3a){return (pseudoClasses[_39])?pseudoClasses[_39](_38,_3a):[]}};parseSelector.selectors=_17;parseSelector.pseudoClasses={};parseSelector.util=_18;parseSelector.dom=dom;return parseSelector})();
var sIFR=new function(){var _3b=this;var _3c="sIFR-active";var _3d="sIFR-replaced";var _3e="sIFR-replacing";var _3f="sIFR-flash";var _40="sIFR-ignore";var _41="sIFR-alternate";var _42="sIFR-class";var _43="sIFR-layout";var _44="http://www.w3.org/1999/xhtml";var _45=6;var _46=126;var _47=8;var _48="SIFR-PREFETCHED";var _49=" ";var _4a=[10,1.55,19,1.45,32,1.35,71,1.3,1.25];var _4b=5;this.isActive=false;this.isEnabled=true;this.hideElements=true;this.replaceNonDisplayed=false;this.preserveSingleWhitespace=false;this.fixWrap=true;this.fixHover=true;this.registerEvents=true;this.setPrefetchCookie=true;this.cookiePath="/";this.domains=[];this.fromLocal=true;this.forceClear=false;this.forceWidth=false;this.fitExactly=false;this.forceTextTransform=true;this.useDomContentLoaded=true;this.debugMode=false;this.hasFlashClassSet=false;this.delayCss=false;var _4c=0;var _4d=false,_4e=false;var _4f=[];var dom=new function(){this.getBody=function(){var _51=document.getElementsByTagName("body");if(_51.length==1){return _51[0]}return null};this.addClass=function(_52,_53){if(_53){_53.className=((_53.className||"")==""?"":_53.className+" ")+_52}};this.removeClass=function(_54,_55){if(_55){_55.className=_55.className.replace(new RegExp("(^|\\s)"+_54+"(\\s|$)"),"").replace(/^\s+|(\s)\s+/g,"$1")}};this.hasClass=function(_56,_57){return new RegExp("(^|\\s)"+_56+"(\\s|$)").test(_57.className)};this.hasOneOfClassses=function(_58,_59){for(var i=0;i<_58.length;i++){if(this.hasClass(_58[i],_59)){return true}}return false};this.create=function(_5b){if(document.createElementNS){return document.createElementNS(_44,_5b)}return document.createElement(_5b)};this.setInnerHtml=function(_5c,_5d){if(ua.innerHtmlSupport){_5c.innerHTML=_5d}else{if(ua.xhtmlSupport){_5d=["<root xmlns=\"",_44,"\">",_5d,"</root>"].join("");var xml=(new DOMParser()).parseFromString(_5d,"text/xml");xml=document.importNode(xml.documentElement,true);while(_5c.firstChild){_5c.removeChild(_5c.firstChild)}while(xml.firstChild){_5c.appendChild(xml.firstChild)}}}};this.nodeFromHtml=function(_5f){var _60=this.create("div");_60.innerHTML=_5f;return _60.firstChild};this.getComputedStyle=function(_61,_62){var _63;if(document.defaultView&&document.defaultView.getComputedStyle){_63=document.defaultView.getComputedStyle(_61,null)[_62]}else{if(_61.currentStyle){_63=_61.currentStyle[_62]}}return _63||""};this.getStyleAsInt=function(_64,_65,_66){var _67=this.getComputedStyle(_64,_65);if(_66&&!/px$/.test(_67)){return 0}_67=parseInt(_67);return isNaN(_67)?0:_67};this.getZoom=function(){return _68.zoom.getLatest()}};this.dom=dom;var ua=new function(){var ua=navigator.userAgent.toLowerCase();var _6b=(navigator.product||"").toLowerCase();this.macintosh=ua.indexOf("mac")>-1;this.windows=ua.indexOf("windows")>-1;this.quicktime=false;this.opera=ua.indexOf("opera")>-1;this.konqueror=_6b.indexOf("konqueror")>-1;this.ie=false/*@cc_on || true @*/;this.ieSupported=this.ie&&!/ppc|smartphone|iemobile|msie\s5\.5/.test(ua)/*@cc_on && @_jscript_version >= 5.5 @*/;this.ieWin=this.ie&&this.windows/*@cc_on && @_jscript_version >= 5.1 @*/;this.windows=this.windows&&(!this.ie||this.ieWin);this.ieMac=this.ie&&this.macintosh/*@cc_on && @_jscript_version < 5.1 @*/;this.macintosh=this.macintosh&&(!this.ie||this.ieMac);this.safari=ua.indexOf("safari")>-1;this.webkit=ua.indexOf("applewebkit")>-1&&!this.konqueror;this.khtml=this.webkit||this.konqueror;this.gecko=!this.webkit&&_6b=="gecko";this.operaVersion=this.opera&&/.*opera(\s|\/)(\d+\.\d+)/.exec(ua)?parseInt(RegExp.$2):0;this.webkitVersion=this.webkit&&/.*applewebkit\/(\d+).*/.exec(ua)?parseInt(RegExp.$1):0;this.geckoBuildDate=this.gecko&&/.*gecko\/(\d{8}).*/.exec(ua)?parseInt(RegExp.$1):0;this.konquerorVersion=this.konqueror&&/.*konqueror\/(\d\.\d).*/.exec(ua)?parseInt(RegExp.$1):0;this.flashVersion=0;if(this.ieWin){var axo;var _6d=false;try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(e){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");this.flashVersion=6;axo.AllowScriptAccess="always"}catch(e){_6d=this.flashVersion==6}if(!_6d){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(e){}}}if(!_6d&&axo){this.flashVersion=parseFloat(/([\d,?]+)/.exec(axo.GetVariable("$version"))[1].replace(/,/g,"."))}}else{if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){var _6e=navigator.plugins["Shockwave Flash"];this.flashVersion=parseFloat(/(\d+\.?\d*)/.exec(_6e.description)[1]);var i=0;while(this.flashVersion>=_47&&i<navigator.mimeTypes.length){var _70=navigator.mimeTypes[i];if(_70.type=="application/x-shockwave-flash"&&_70.enabledPlugin.description.toLowerCase().indexOf("quicktime")>-1){this.flashVersion=0;this.quicktime=true}i++}}}this.flash=this.flashVersion>=_47;this.transparencySupport=this.macintosh||this.windows;this.computedStyleSupport=this.ie||document.defaultView&&document.defaultView.getComputedStyle&&(!this.gecko||this.geckoBuildDate>=20030624);this.css=true;if(this.computedStyleSupport){try{var _71=document.getElementsByTagName("head")[0];_71.style.backgroundColor="#FF0000";var _72=dom.getComputedStyle(_71,"backgroundColor");this.css=!_72||/\#F{2}0{4}|rgb\(255,\s?0,\s?0\)/i.test(_72);_71=null}catch(e){}}this.xhtmlSupport=!!window.DOMParser&&!!document.importNode;try{var n=dom.create("span");if(!this.ieMac){n.innerHTML="x"}this.innerHtmlSupport=n.innerHTML=="x"}catch(e){this.innerHtmlSupport=false}this.zoomSupport=!!(this.opera&&document.documentElement);this.geckoXml=this.gecko&&(document.contentType||"").indexOf("xml")>-1;this.requiresPrefetch=this.ieWin||this.khtml;this.verifiedKonqueror=false;this.supported=this.flash&&this.css&&(!this.ie||this.ieSupported)&&(!this.opera||this.operaVersion>=8)&&(!this.webkit||this.webkitVersion>=412)&&(!this.konqueror||this.konquerorVersion>3.5)&&this.computedStyleSupport&&(this.innerHtmlSupport||!this.khtml&&this.xhtmlSupport)};this.ua=ua;var _74=new function(){function capitalize($){return $.toUpperCase()}this.normalize=function(str){if(_3b.preserveSingleWhitespace){return str.replace(/\s/g,_49)}return str.replace(/(\s)\s+/g,"$1").replace(/\xA0/,_49)};this.textTransform=function(_77,str){switch(_77){case "uppercase":str=str.toUpperCase();break;case "lowercase":str=str.toLowerCase();break;case "capitalize":var _79=str;str=str.replace(/^\w|\s\w/g,capitalize);if(str.indexOf("function capitalize")!=-1){var _7a=_79.replace(/(^|\s)(\w)/g,"$1$1$2$2").split(/^\w|\s\w/g);str="";for(var i=0;i<_7a.length;i++){str+=_7a[i].charAt(0).toUpperCase()+_7a[i].substring(1)}}break}return str};this.toHexString=function(str){if(typeof (str)!="string"||!str.charAt(0)=="#"||str.length!=4&&str.length!=7){return str}str=str.replace(/#/,"");if(str.length==3){str=str.replace(/(.)(.)(.)/,"$1$1$2$2$3$3")}return "0x"+str};this.toJson=function(obj){var _7e="";switch(typeof (obj)){case "string":_7e="\""+obj+"\"";break;case "number":case "boolean":_7e=obj.toString();break;case "object":_7e=[];for(var _7f in obj){if(obj[_7f]==Object.prototype[_7f]){continue}_7e.push("\""+_7f+"\":"+_74.toJson(obj[_7f]))}_7e="{"+_7e.join(",")+"}";break}return _7e};this.convertCssArg=function(arg){if(!arg){return {}}if(typeof (arg)=="object"){if(arg.constructor==Array){arg=arg.join("")}else{return arg}}var obj={};var _82=arg.split("}");for(var i=0;i<_82.length;i++){var $=_82[i].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);if(!$||$.length!=3){continue}if(!obj[$[1]]){obj[$[1]]={}}var _85=$[2].split(";");for(var j=0;j<_85.length;j++){var $2=_85[j].match(/\s*([^:\s]+)\s*\:\s*([^\s;]+)/);if(!$2||$2.length!=3){continue}obj[$[1]][$2[1]]=$2[2]}}return obj};this.extractFromCss=function(css,_89,_8a,_8b){var _8c=null;if(css&&css[_89]&&css[_89][_8a]){_8c=css[_89][_8a];if(_8b){delete css[_89][_8a]}}return _8c};this.cssToString=function(arg){var css=[];for(var _8f in arg){var _90=arg[_8f];if(_90==Object.prototype[_8f]){continue}css.push(_8f,"{");for(var _91 in _90){if(_90[_91]==Object.prototype[_91]){continue}css.push(_91,":",_90[_91],";")}css.push("}")}return escape(css.join(""))};this.bind=function(_92,_93){return function(){_92[_93].apply(_92,arguments)}}};this.util=_74;var _68={};_68.fragmentIdentifier=new function(){this.fix=true;var _94;this.cache=function(){_94=document.title};function doFix(){document.title=_94}this.restore=function(){if(this.fix){setTimeout(doFix,0)}}};_68.synchronizer=new function(){this.isBlocked=false;this.block=function(){this.isBlocked=true};this.unblock=function(){this.isBlocked=false;_95.replaceAll()}};_68.zoom=new function(){var _96=100;this.getLatest=function(){return _96};if(ua.zoomSupport&&ua.opera){var _97=document.createElement("div");_97.style.position="fixed";_97.style.left="-65536px";_97.style.top="0";_97.style.height="100%";_97.style.width="1px";_97.style.zIndex="-32";document.documentElement.appendChild(_97);function updateZoom(){if(!_97){return}var _98=window.innerHeight/_97.offsetHeight;var _99=Math.round(_98*100)%10;if(_99>5){_98=Math.round(_98*100)+10-_99}else{_98=Math.round(_98*100)-_99}_96=isNaN(_98)?100:_98;_68.synchronizer.unblock();document.documentElement.removeChild(_97);_97=null}_68.synchronizer.block();setTimeout(updateZoom,54)}};this.hacks=_68;var _9a={kwargs:[],replaceAll:function(){for(var i=0;i<this.kwargs.length;i++){_3b.replace(this.kwargs[i])}this.kwargs=[]}};var _95={kwargs:[],replaceAll:_9a.replaceAll};function isValidDomain(){if(_3b.domains.length==0){return true}var _9c="";try{_9c=document.domain}catch(e){}if(_3b.fromLocal&&sIFR.domains[0]!="localhost"){sIFR.domains.unshift("localhost")}for(var i=0;i<_3b.domains.length;i++){var _9e=_3b.domains[i];if(_9e=="*"||_9e==_9c){return true}var _9f=_9e.lastIndexOf("*");if(_9f>-1){_9e=_9e.substr(_9f+1);var _a0=_9c.lastIndexOf(_9e);if(_a0>-1&&(_a0+_9e.length)==_9c.length){return true}}}return false}this.activate=function(){if(!ua.supported||!this.isEnabled||this.isActive||!isValidDomain()){return}if(arguments.length>0){this.prefetch.apply(this,arguments)}this.isActive=true;if(this.hideElements){this.setFlashClass()}if(ua.ieWin&&_68.fragmentIdentifier.fix&&window.location.hash!=""){_68.fragmentIdentifier.cache()}else{_68.fragmentIdentifier.fix=false}if(!this.registerEvents){return}function handler(evt){_3b.initialize();if(evt&&evt.type=="load"){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",handler,false)}if(window.removeEventListener){window.removeEventListener("load",handler,false)}}}if(window.addEventListener){if(_3b.useDomContentLoaded&&ua.gecko){document.addEventListener("DOMContentLoaded",handler,false)}window.addEventListener("load",handler,false)}else{if(ua.ieWin){if(_3b.useDomContentLoaded){document.write("<scr"+"ipt id=__sifr_ie_onload defer src=//:></script>");document.getElementById("__sifr_ie_onload").onreadystatechange=function(){if(this.readyState=="complete"){handler();this.removeNode()}}}window.attachEvent("onload",handler)}}};this.setFlashClass=function(){if(this.hasFlashClassSet){return}dom.addClass(_3c,dom.getBody()||document.documentElement);this.hasFlashClassSet=true};this.removeFlashClass=function(){if(!this.hasFlashClassSet){return}dom.removeClass(_3c,dom.getBody());dom.removeClass(_3c,document.documentElement);this.hasFlashClassSet=false};this.initialize=function(){if(_4e||!this.isActive||!this.isEnabled){return}_4e=true;_9a.replaceAll();clearPrefetch()};function getSource(src){if(typeof (src)!="string"){if(src.src){src=src.src}if(typeof (src)!="string"){var _a3=[];for(var _a4 in src){if(src[_a4]!=Object.prototype[_a4]){_a3.push(_a4)}}_a3.sort().reverse();var _a5="";var i=-1;while(!_a5&&++i<_a3.length){if(parseFloat(_a3[i])<=ua.flashVersion){_a5=src[_a3[i]]}}src=_a5}}if(!src&&_3b.debugMode){throw new Error("sIFR: Could not determine appropriate source")}if(ua.ie&&src.charAt(0)=="/"){src=window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/,"$1$2$3")+src}return src}this.prefetch=function(){if(!ua.requiresPrefetch||!ua.supported||!this.isEnabled||!isValidDomain()){return}if(this.setPrefetchCookie&&new RegExp(";?"+_48+"=true;?").test(document.cookie)){return}try{_4d=true;if(ua.ieWin){prefetchIexplore(arguments)}else{prefetchLight(arguments)}if(this.setPrefetchCookie){document.cookie=_48+"=true;path="+this.cookiePath}}catch(e){if(_3b.debugMode){throw e}}};function prefetchIexplore(_a7){for(var i=0;i<_a7.length;i++){document.write("<script defer type=\"sifr/prefetch\" src=\""+getSource(_a7[i])+"\"></script>")}}function prefetchLight(_a9){for(var i=0;i<_a9.length;i++){new Image().src=getSource(_a9[i])}}function clearPrefetch(){if(!ua.ieWin||!_4d){return}try{var _ab=document.getElementsByTagName("script");for(var i=_ab.length-1;i>=0;i--){var _ad=_ab[i];if(_ad.type=="sifr/prefetch"){_ad.parentNode.removeChild(_ad)}}}catch(e){}}function getRatio(_ae,_af){for(var i=0;i<_af.length;i+=2){if(_ae<=_af[i]){return _af[i+1]}}return _af[_af.length-1]}function getFilters(obj){var _b2=[];for(var _b3 in obj){if(obj[_b3]==Object.prototype[_b3]){continue}var _b4=obj[_b3];_b3=[_b3.replace(/filter/i,"")+"Filter"];for(var _b5 in _b4){if(_b4[_b5]==Object.prototype[_b5]){continue}_b3.push(_b5+":"+escape(_74.toJson(_74.toHexString(_b4[_b5]))))}_b2.push(_b3.join(","))}return _b2.join(";")}function calculate(_b6){var _b7,_b8;if(!ua.ie){_b7=dom.getStyleAsInt(_b6,"lineHeight");_b8=Math.floor(dom.getStyleAsInt(_b6,"height")/_b7)}else{if(ua.ie){var _b9=_b6.innerHTML;_b6.style.visibility="visible";_b6.style.overflow="visible";_b6.style.position="static";_b6.style.zoom="normal";_b6.style.writingMode="lr-tb";_b6.style.width=_b6.style.height="auto";_b6.style.maxWidth=_b6.style.maxHeight=_b6.style.styleFloat="none";var _ba=_b6;var _bb=_b6.currentStyle.hasLayout;if(_bb){dom.setInnerHtml(_b6,"<div class=\""+_43+"\">X<br />X<br />X</div>");_ba=_b6.firstChild}else{dom.setInnerHtml(_b6,"X<br />X<br />X")}var _bc=_ba.getClientRects();_b7=_bc[1].bottom-_bc[1].top;_b7=Math.ceil(_b7*0.8);if(_bb){dom.setInnerHtml(_b6,"<div class=\""+_43+"\">"+_b9+"</div>");_ba=_b6.firstChild}else{dom.setInnerHtml(_b6,_b9)}_bc=_ba.getClientRects();_b8=_bc.length;if(_bb){dom.setInnerHtml(_b6,_b9)}_b6.style.visibility=_b6.style.width=_b6.style.height=_b6.style.maxWidth=_b6.style.maxHeight=_b6.style.overflow=_b6.style.styleFloat=_b6.style.position=_b6.style.zoom=_b6.style.writingMode=""}}return {lineHeight:_b7,lines:_b8}}this.replace=function(_bd,_be){if(!ua.supported){return}if(_be){for(var _bf in _bd){if(typeof (_be[_bf])=="undefined"){_be[_bf]=_bd[_bf]}}_bd=_be}if(!_4e){return _9a.kwargs.push(_bd)}if(_68.synchronizer.isBlocked){return _95.kwargs.push(_bd)}var _c0=_bd.elements;if(!_c0&&parseSelector){_c0=parseSelector(_bd.selector)}if(_c0.length==0){return}this.setFlashClass();var src=getSource(_bd.src);var css=_74.convertCssArg(_bd.css);var _c3=getFilters(_bd.filters);var _c4=(_bd.forceClear==null)?_3b.forceClear:_bd.forceClear;var _c5=(_bd.fitExactly==null)?_3b.fitExactly:_bd.fitExactly;var _c6=_c5||(_bd.forceWidth==null?_3b.forceWidth:_bd.forceWidth);var _c7=parseInt(_74.extractFromCss(css,".sIFR-root","leading"))||0;var _c8=_74.extractFromCss(css,".sIFR-root","font-size",true)||0;var _c9=_74.extractFromCss(css,".sIFR-root","background-color",true)||"#FFFFFF";var _ca=_74.extractFromCss(css,".sIFR-root","kerning",true)||"";var _cb=_bd.gridFitType||_74.extractFromCss(css,".sIFR-root","text-align")=="right"?"subpixel":"pixel";var _cc=_3b.forceTextTransform?_74.extractFromCss(css,".sIFR-root","text-transform",true)||"none":"none";var _cd=_74.extractFromCss(css,".sIFR-root","opacity",true)||"100";var _ce=_bd.pixelFont||false;var _cf=_bd.ratios||_4a;if(parseInt(_c8).toString()!=_c8&&_c8.indexOf("px")==-1){_c8=0}else{_c8=parseInt(_c8)}if(parseFloat(_cd)<1){_cd=100*parseFloat(_cd)}var _d0=null;var _d1="";if(_c5){_74.extractFromCss(css,".sIFR-root","text-align",true)}if(!_bd.modifyCss){_d1=_74.cssToString(css);_d0=_3b.fixHover&&_d1.indexOf("%3Ahover")>-1}var _d2=_bd.wmode||"";if(_d2=="transparent"){if(!ua.transparencySupport){_d2="opaque"}else{_c9="transparent"}}for(var i=0;i<_c0.length;i++){var _d4=_c0[i];if(!ua.verifiedKonqueror){if(dom.getComputedStyle(_d4,"lineHeight").match(/e\+08px/)){ua.supported=_3b.isEnabled=false;this.removeFlashClass();return}ua.verifiedKonqueror=true}if(dom.hasOneOfClassses([_3d,_3e,_40,_41],_d4)){continue}var _d5=false;if(!_d4.offsetHeight||!_d4.offsetWidth){if(!_3b.replaceNonDisplayed){continue}_d4.style.display="block";if(!_d4.offsetHeight||!_d4.offsetWidth){_d4.style.display="";continue}_d5=true}if(_c4&&ua.gecko){_d4.style.clear="both"}var _d6=null;if(_3b.fixWrap&&ua.ie&&dom.getComputedStyle(_d4,"display")=="block"){_d6=_d4.innerHTML;dom.setInnerHtml(_d4,"X")}var _d7=dom.getStyleAsInt(_d4,"width",ua.ie);if(_d7==0){var _d8=dom.getStyleAsInt(_d4,"paddingRight",true);var _d9=dom.getStyleAsInt(_d4,"paddingLeft",true);var _da=dom.getStyleAsInt(_d4,"borderRightWidth",true);var _db=dom.getStyleAsInt(_d4,"borderLeftWidth",true);_d7=_d4.offsetWidth-_d9-_d8-_db-_da}if(_d6&&_3b.fixWrap&&ua.ie){dom.setInnerHtml(_d4,_d6)}var _dc,_dd;if(!_c8){var _de=calculate(_d4);_dc=Math.min(_46,Math.max(_45,_de.lineHeight));if(_ce){_dc=Math.max(8,8*Math.round(_dc/8))}_dd=_de.lines;if(isNaN(_dd)||!isFinite(_dd)||_dd==0){_dd=1}if(_dd>1&&_c7){_df+=Math.round((_dd-1)*_c7)}}else{_dc=_c8;_dd=1}var _df=Math.round(_dd*_dc);if(_d5){_d4.style.display=""}if(_c4&&ua.gecko){_d4.style.clear=""}var _e0=dom.create("span");_e0.className=_41;var _e1=_d4.cloneNode(true);for(var j=0,l=_e1.childNodes.length;j<l;j++){_e0.appendChild(_e1.childNodes[j].cloneNode(true))}if(_bd.modifyContent){_bd.modifyContent(_e1,_bd.selector)}if(_bd.modifyCss){_d1=_bd.modifyCss(css,_e1,_bd.selector)}if(_d0==null){_d0=_3b.fixHover&&_d1.indexOf("%3Ahover")>-1}var _e4=handleContent(_e1,_cc);if(_bd.modifyContentString){_e4=_bd.modifyContentString(_e4,_bd.selector)}if(_e4==""){continue}var _e5=["content="+_e4,"width="+_d7,"height="+_df,"fitexactly="+(_c5?"true":""),"tunewidth="+(_bd.tuneWidth||""),"tuneheight="+(_bd.tuneHeight||""),"offsetleft="+(_bd.offsetLeft||""),"offsettop="+(_bd.offsetTop||""),"thickness="+(_bd.thickness||""),"sharpness="+(_bd.sharpness||""),"kerning="+_ca,"gridfittype="+_cb,"zoomsupport="+ua.zoomSupport,"flashfilters="+_c3,"opacity="+_cd,"blendmode="+(_bd.blendMode||""),"size="+_dc,"zoom="+dom.getZoom(),"css="+_d1,"selectable="+(_bd.selectable==null?"true":_bd.selectable),"lines="+_dd];var _e6=encodeURI(_e5.join("&amp;"));var _e7="sIFR_callback_"+_4c++;var _e8=new CallbackInfo(_e7,_e5,_bd.onReplacement,_d0);window[_e7+"_DoFSCommand"]=(function(_e9){return function(_ea,arg){_e9.handle(_ea,arg)}})(_e8);_df=Math.round(_dd*getRatio(_dc,_cf)*_dc)+_4b;var _ec=_c6?_d7:"100%";var _ed;if(ua.ie){_ed=["<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" id=\"",_e7,"\" sifr=\"true\" width=\"",_ec,"\" height=\"",_df,"\" class=\"",_3f,"\">","<param name=\"movie\" value=\"",src,"\"></param>","<param name=\"flashvars\" value=\"",_e6,"\"></param>","<param name=\"allowScriptAccess\" value=\"always\"></param>","<param name=\"quality\" value=\"best\"></param>","<param name=\"wmode\" value=\"",_d2,"\"></param>","<param name=\"bgcolor\" value=\"",_c9,"\"></param>","<param name=\"name\" value=\"",_e7,"\"></param>","</object>","<scr","ipt event=FSCommand(info,args) for=",_e7,">",_e7,"_DoFSCommand(info, args);","</","script>"].join("")}else{_ed=["<embed type=\"application/x-shockwave-flash\"",(ua.opera||!_3b.delayCss?" class=\""+_3f+"\"":"")," src=\"",src,"\" quality=\"best\" flashvars=\"",_e6,"\" width=\"",_ec,"\" height=\"",_df,"\" wmode=\"",_d2,"\" bgcolor=\"",_c9,"\" name=\"",_e7,"\" id=\"",_e7,"\" allowScriptAccess=\"always\" sifr=\"true\"></embed>"].join("")}dom.setInnerHtml(_d4,_ed);_e8.flashNode=_d4.firstChild;_e8.html=_ed;_4f.push(_e8);_d4.appendChild(_e0);dom.addClass(_3b.delayCss?_3e:_3d,_d4);_e8.setupFixHover()}_68.fragmentIdentifier.restore()};function handleContent(_ee,_ef){var _f0=[],_f1=[];var _f2=_ee.childNodes;var i=0;while(i<_f2.length){var _f4=_f2[i];if(_f4.nodeType==3){var _f5=_74.normalize(_f4.nodeValue);_f5=_74.textTransform(_ef,_f5);_f1.push(_f5.replace(/\%/g,"%25").replace(/\&/g,"%26").replace(/\,/g,"%2C").replace(/\+/g,"%2B"))}if(_f4.nodeType==1){var _f6=[];var _f7=_f4.nodeName.toLowerCase();var _f8=_f4.className||"";if(/\s+/.test(_f8)){if(_f8.indexOf(_42)){_f8=_f8.match("(\\s|^)"+_42+"-([^\\s$]*)(\\s|$)")[2]}else{_f8=_f8.match(/^([^\s]+)/)[1]}}if(_f8!=""){_f6.push("class=\""+_f8+"\"")}if(_f7=="a"){var _f9=_f4.getAttribute("href")||"";var _fa=_f4.getAttribute("target")||"";_f6.push("href=\""+_f9+"\"","target=\""+_fa+"\"")}_f1.push("<"+_f7+(_f6.length>0?" ":"")+escape(_f6.join(" "))+">");if(_f4.hasChildNodes()){_f0.push(i);i=0;_f2=_f4.childNodes;continue}else{if(!/^(br|img)$/i.test(_f4.nodeName)){_f1.push("</",_f4.nodeName.toLowerCase(),">")}}}if(_f0.length>0&&!_f4.nextSibling){do{i=_f0.pop();_f2=_f4.parentNode.parentNode.childNodes;_f4=_f2[i];if(_f4){_f1.push("</",_f4.nodeName.toLowerCase(),">")}}while(i<_f2.length&&_f0.length>0)}i++}return _f1.join("").replace(/\n|\r/g,"")}function CallbackInfo(id,_fc,_fd,_fe){this.id=id;this.vars=_fc;this._replacementHandler=_fd;this._firedReplacementEvent=!(this._replacementHandler!=null);this._fixHover=_fe;this._setClasses=!_3b.delayCss;this.html="";this._pings=0}CallbackInfo.prototype.getFlashNode=function(){return document.getElementById(this.id)};CallbackInfo.prototype.handle=function(_ff,arg){if(/(FSCommand\:)?resize/.test(_ff)){var _101=this.getFlashNode();var $=arg.split(":");_101.setAttribute($[0],$[1]);if(!this._setClasses&&$[0]=="height"){if(!ua.ie&&!ua.opera){dom.addClass(_3f,_101)}dom.removeClass(_3e,_101.parentNode);dom.addClass(_3d,_101.parentNode);this._setClasses=true}if(ua.khtml){var _103=_101.offsetHeight}if(!this._firedReplacementEvent){this._replacementHandler(this);this._firedReplacementEvent=true}}else{if(/(FSCommand\:)?resetmovie/.test(_ff)){this.resetMovie()}else{if(/(FSCommand\:)?ping/.test(_ff)){if(this._pings>0){this.setupFixHover()}this._pings++}else{if(this.debugHandler&&/(FSCommand\:)?debug/.test(_ff)){this.debugHandler(_ff,arg)}}}}};CallbackInfo.prototype.call=function(type,_105){var _106=this.getFlashNode();if(!_106){return}_106.SetVariable("callbackType",type);_106.SetVariable("callbackValue",_105);_106.SetVariable("callbackTrigger",true)};CallbackInfo.prototype.write=function(_107){this.call("write",_107);this.vars[0]="content="+_107;this.html=this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/,"$1"+encodeURI(this.vars.join("&amp;")))};CallbackInfo.prototype.resetMovie=function(){var _108=this.getFlashNode();var node=_108.parentNode;node.replaceChild(dom.nodeFromHtml(this.html),_108);this.setupFixHover()};CallbackInfo.prototype.setupFixHover=function(){var _10a=this.getFlashNode();if(!this._fixHover||!_10a){return}var node=_10a.parentNode;if(node.addEventListener){node.addEventListener("mouseout",_74.bind(this,"fixHover"),false)}else{if(node.attachEvent){node.attachEvent("onmouseout",_74.bind(this,"fixHover"))}}};CallbackInfo.prototype.fixHover=function(){this.call("resettext")}};