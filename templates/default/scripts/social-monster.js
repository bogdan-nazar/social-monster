//global objects registry
if (typeof thirdparty_shared == "undefined") {
	thirdparty_shared = new (function() {
		this._objects	=	[];
		this.objGet		=	function(name) {
			if (typeof this._objects[name] != "undefined") {
				if (typeof this._objects[name] == "Function") return new (this._objects[name]);
				else return this._objects[name];
			}
			else return null;
		};
		this.objReg		=	function(name, obj) {
			if ((typeof this._objects[name] != "undefined") && obj) return false;
			return this._objects[name] = obj;
		};
	});
}
if (Function.prototype.bind == null) {
    Function.prototype.bind = (function (slice){
        // (C) WebReflection - Mit Style License
        function bind(context) {
            var self = this; // "trapped" function reference
            // only if there is more than an argument
            // we are interested into more complex operations
            // this will speed up common bind creation
            // avoiding useless slices over arguments
            if (1 < arguments.length) {
                // extra arguments to send by default
                var $arguments = slice.call(arguments, 1);
                return function () {
                    return self.apply(
                        context,
                        // thanks @kangax for this suggestion
                        arguments.length ?
                            // concat arguments with those received
                            $arguments.concat(slice.call(arguments)) :
                            // send just arguments, no concat, no slice
                            $arguments
                    );
                };
            }
            // optimized callback
            return function () {
                // speed up when function is called without arguments
                return arguments.length ? self.apply(context, arguments) : self.call(context);
            };
        }
        // the named function
        return bind;
    }(Array.prototype.slice));
}
/**
* Social Monster Global Object
*/
var social_monster = function() {
	this._instances = [];
};
social_monster.prototype.newInstance = function(config) {

var __name_plug_dir = "social-features-for-wp";
var __name_inst_fb = "social-monster-fb";
var __name_inst_int = "social-monster-int";
var __name_inst_share = "social-monster-share";
var __name_inst_vk = "social-monster-vk";
var __name_popup = "popup";
var __name_script = "social-monster.js";
var __name_this = "social-monster";

/*
* Wrapper object for Share Buttons
*/
function _social_monster_share(id) {
	this._alerts			=	[];
	this._args				=	false;
	this._buttons			=	null;
	this._confirms			=	[];
	this._console			=	((typeof console == "undefined") || (!console)) ? false : true;
	this._dirRoot			=	"/";
	this._domain			=	"";
	this._initData			=	{
		curtry:					0,
		maxtry:					100,
		sleep:					50
	};
	this._inited			=	false;
	this._instance			=	0;
	this._name				=	__name_inst_share;
	this._page				=	null;
	this._puLinked			=	false;
	this._puScript			=	"wp-content/plugins/" + __name_this + "/dashboard/scripts/popup.js";
	this._puStyle			=	"wp-content/plugins/" + __name_this + "/dashboard/styles/popup.css";
	this._session			=	"unknown";
	this._shareHelper		=	"wp-content/plugins/" + __name_this + "/sharer.php";
	this.elMain				=	null;
	this.fInit				=	this._initTry.bind(this);
	this.plPu				=	null;
};
_social_monster_share.prototype._init = function(last, config) {
	if (typeof last != "boolean") last = false;
	//saving config
	if (!this._buttons) {
		if (typeof config == "object" && config) {
			if (config.buttons instanceof Array) {
				this._buttons = {};
				for (var c in config.buttons) {
					if (!config.buttons.hasOwnProperty(c)) continue;
					this._buttons[config.buttons[c]] = {cont: null, el: null, pu: -1, func: null};
				}
			} else this._buttons = {};
			this._page = {};
			if (typeof config.inst == "number") this._instance = config.inst;
			if (typeof config.domain == "string" && config.domain) this._page.domain = config.domain;
			if (typeof config.session == "string" && config.session) this._page.session = config.session;
			if (typeof config.excerpt == "string" && config.excerpt) this._page.excerpt = config.excerpt;
			if (typeof config.root == "string" && config.root) this._dirRoot = config.root;
			if (typeof config.link == "string") this._page.url = config.link;
			if (typeof config.title == "string") this._page.title = config.title;
		} else {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > " + this._name + "._init: Init error - config wait timeout.");
				return true;
			}
			return false;
		}
	}
	//waiting other objects
	if (!this.plPu) {
		this.plPu = thirdparty_shared.objGet(__name_popup);
		if (!this.plPu) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > " + this._name + "._init: Init error - dependend object [" + __name_popup + "] wait timeout.");
				return true;
			}
			if (!this._puLinked) {
				var head = document.getElementsByTagName("HEAD")[0];
				for (var c in head.childNodes) {
					if (typeof head.childNodes[c].tagName != "undefined" && (head.childNodes[c].tagName.toLowerCase() == "script") && (typeof head.childNodes[c].src != "undefined")) {
						if (head.childNodes[c].src.indexOf(__name_this + "/dashboard/scripts/popup.js") != -1) {
							this._puLinked = true;
							break;
						}
					}
				}
				if (!this._puLinked) {
					var s = document.createElement("SCRIPT");
					s.type = "text/javascript";
					s.async = true;
					s.src = this._dirRoot + this._puScript;
					head.appendChild(s);
					var l = document.createElement("LINK");
					l.type = "text/css";
					l.rel = "stylesheet";
					l.href = this._dirRoot + this._puStyle;
					head.appendChild(l);
					this._puLinked = true;
					this._puLinked = true;
				}
			}
			return false;
		}
	}
	if (this.waitElement(this._name + this._instance, "elMain", last)) return this._inited;
	if (typeof this._page.url == "undefined") {
		this._page.url = encodeURIComponent(document.location.href);
		this._page.title = encodeURIComponent(document.title);
	}
	var n,c;
	for (var c in this.elMain.childNodes) {
		n = this.elMain.childNodes[c];
		if ((typeof n.className != "undefined") && (n.className.indexOf("btn ") != -1)) {
			c = n.className.replace("btn ", "");
			if (typeof this._buttons[c] != "undefined") {
				this._buttons[c].el = n;
				if (n.tagName.toLowerCase() == "div") {
					if (c == "pinterest") {
						var d = document.createElement("DIV");
						d.style.opacity = "0";
						n.appendChild(d);
						var a = document.createElement("A");
						a.style.height = "32px";
						d.appendChild(a);
   						a.href = "http://www.pinterest.com/pin/create/button/?url=" + this._page.url + "&media=" + "&description=" + this._page.title;
   						a["data-pin-do"] = "buttonBookmark";
						var f = document.getElementsByTagName('SCRIPT')[0], p = document.createElement('SCRIPT');
   						p.type = "text/javascript";
   						p.async = true;
   						p.src = "//assets.pinterest.com/js/pinit.js";
   						f.parentNode.insertBefore(p, f)
   						ml = 120;
   						cc = 0;
   						f = function() {
   							cc++;
   							if (cc > ml) return;
   							var a;
   							for (var c in d.childNodes) {
   								a = d.childNodes[c];
   								if ((typeof a.tagName == "undefined") || (a.tagName.toLowerCase() != "a")) {
   									a = null;
									continue;
   								} else {
									if (a.className.indexOf("PIN_") != -1) {
										var t = document.createElement("SPAN");
										t.style.fontSize = "100px";
										t.innerHTML = "extend";
										a.appendChild(t);
										break;
									} else {
										a = null;
									}
								}
							}
							if (!a) window.setTimeout(f, 500);
   						};
   						window.setTimeout(f, 500);
					} else {
						this._buttons[c].func = this.onClickButton.bind(this, c);
						this.eventAdd(n, "click", this._buttons[c].func);
					}
				} else {
					n.target = "_blank";
					switch (c) {
						case "linked-in":
							n.href = "http://www.linkedin.com/shareArticle?mini=true&url=" + this._page.url +"&title=" + this._page.title + "&summary=" + encodeURIComponent(this._page.excerpt);
							break;
						case "live-journal":
							n.href = "http://www.livejournal.com/update.bml?subject=" + this._page.title + "&event=" + this._page.url;
							break;
						case "moi-krug":
							n.href = "http://moikrug.ru/share?ie=utf-8&url=" + this._page.url + "&title=" + this._page.title + "&description=" + encodeURIComponent(this._page.excerpt);
							break;
						case "tumblr":
							n.href = "http://tumblr.com/share?s=&v=3&t=" + this._page.title + "&u=" + this._page.url;
							break;
						case "ya-ru":
							n.href = "http://my.ya.ru/posts_add_link.xml?url=" + this._page.url + "&title=" + this._page.title + "&u=" + this._page.url;
							break;
					}
				}
			}
		}
	}
	this._inited = true;
	return true;
};
/*
* Common initer function
*/
_social_monster_share.prototype._initTry = function(config) {
	if (typeof config != "object") config = false;
	this._initData.curtry++;
	if (this._initData.curtry > this._initData.maxtry) {
		this._inited = true;
		this._initErr = true;
		return;
	}
	var res = false;
	var err = false;
	if (typeof this._init == "function") {
		try {
			if (config) res = this._init((this._initData.curtry == this._initData.maxtry), config);
			else res = this._init((this._initData.curtry == this._initData.maxtry));
			if (typeof res !== "boolean") res = true;
		} catch(e) {
			res = true;
			err = true;
			this.console(__name_script + " > " + this._name + ".initTry(): Plugin init error [" + this._name + "]. Javascript message: [" + e.name + "/" + e.message + "].");
		}
	} else {
		res = true;
		err = true;
		this.console(__name_script + " > " + this._name + ".initTry(): Warning - init entry [._init()] of [" + this._name + "] instance is not defined or is not a function.");
	}
	if (res) {
		if (typeof this._inited == "undefined") this._inited = true;
		if (typeof this._initeErr == "undefined") this._initErr = err;
	} else {
		window.setTimeout(this.fInit, this._initData.sleep);
	}
};
/*
* Other own functions
*/
_social_monster_share.prototype.console = function(msg) {
	if (this._console) console.log(msg);
};
/*
* Dialogs
*/
_social_monster_share.prototype.dlgAlert = function(msg, type, wd) {
	var el = null;
	if ((typeof msg != "string") && (typeof msg.nodeType == "undefined")) {
		var err = false;
		if (typeof msg == "number") {
			if (typeof this._alerts[msg] != "undefined") {
				if (this._alerts[msg].pu != -1) {
					this.plPu.show(this._alerts[msg].pu);
					return msg;
				} else {
					this.console(__name_script + " > " + this._name + ".dlgAlert(): Can't create modal window from the stack [_alerts], item was not created during the previous popup call.");
					return -1;
				}
			} else err = true;
		} else err = true;
		if (err) {
			this.console(__name_script + " > " + this._name + ".dlgAlert(): Can't create modal window, wrong/unregistered message id [" + msg + "].");
			return -1;
		}
	} else {
		if (typeof msg == "string") {
			el = document.createElement("DIV");
			el.className = "ab-body";
			el.innerHTML = msg;
		} else {
			el = msg;
			el.className = (el.className ? el.className.concat(" ") : "").concat("ab-body");
		}
	}
	if (typeof type != "string") type = "inf";
	else {
		if ((type != "inf") && (type != "wrn") && (type != "err")) type = "inf";
	}
	if (typeof wd != "number") wd = 300;
	var m = document.createElement("DIV");
	m.className = this._name;
	m.style.width = ("").concat(wd, "px");
	var el1 = document.createElement("DIV");
	el1.className = "alert-box";
	m.appendChild(el1);
	var el2 = document.createElement("DIV");
	el2.className = "ab-title " + type;
	switch (type) {
		case "wrn":
			el2.innerHTML = "Warning";
			break;
		case "err":
			el2.innerHTML = "Error";
			break;
		default:
			el2.innerHTML = "Info";
			break;
	}
	el1.appendChild(el2);
	el1.appendChild(el);
	el2 = document.createElement("DIV");
	el2.className = "ab-buttons";
	var btn = document.createElement("DIV");
	btn.className = "btn cl";
	btn.innerHTML = "Close";
	el2.appendChild(btn);
	el1.appendChild(el2);
	var obj = {msg: m, closer: btn, pu: -1, showed: false};
	this._alerts.push(obj);
	if (!this._inited) return (this._alerts.length - 1);
	obj.pu = this.plPu.add({content: m, windowed: true, showcloser: false, closers: btn});
	if (obj.pu != -1) this.plPu.show(obj.pu);
	else this.console(__name_script + " > " + this._name + ".dlgAlert(): Can't create modal window: popup plugin [" + __name_popup + "] call returned with an error.");
	return (this._alerts.length - 1);
};
_social_monster_share.prototype.dlgConfirm = function(msg, cb, title, wd) {
	var el = null;
	if ((typeof msg != "string") && (typeof msg.nodeType == "undefined")) {
		var err = false;
		if (typeof msg == "number") {
			if (typeof this._confirms[msg] != "undefined") {
				if (this._confirms[msg].pu != -1) {
					this.plPu.show(this._confirms[msg].pu);
					return msg;
				} else {
					this.console(__name_script + " > " + this._name + ".dlgConfirm():  Can't create modal window from the stack [_confirms], item was not created during the previous popup call.");
					return -1;
				}
			} else err = true;
		} else err = true;
		if (err) {
			this.console(__name_script + " > " + this._name + ".dlgConfirm(): Can't create modal window: wrong/unregistered message id [" + msg + "].");
			this.console(msg);
			return -1;
		}
	} else {
		if (typeof msg == "string") {
			el = document.createElement("DIV");
			el.className = "ab-body";
			el.innerHTML = msg;
		} else {
			el = msg;
			el.className = (el.className ? el.className.concat(" ") : "").concat("ab-body");
		}
	}
	if (typeof cb != "function") cb = false;
	if (typeof title != "string") title = "Confirm the action";
	if (typeof wd != "number") wd = 300;
	var m = document.createElement("DIV");
	m.className = this._name;
	m.style.width = ("").concat(wd, "px");
	var el1 = document.createElement("DIV");
	el1.className = "alert-box";
	m.appendChild(el1);
	var el2 = document.createElement("DIV");
	el2.className = "ab-title inf";
	el2.innerHTML = title;
	el1.appendChild(el2);
	el1.appendChild(el);
	el2 = document.createElement("DIV");
	el2.className = "ab-buttons";
	var btn1 = document.createElement("DIV");
	btn1.className = "btn cl";
	btn1.innerHTML = "Cancel";
	el2.appendChild(btn1);
	var btn2 = document.createElement("DIV");
	btn2.className = "btn ok";
	btn2.innerHTML = "OK";
	el2.appendChild(btn2);
	el1.appendChild(el2);
	var obj = {msg: m, "cb": cb, pu: -1, showed: false};
	var f = function(res, obj) {
		if (obj.pu != -1) this.plPu.hide(obj.pu);
		if (typeof obj.cb == "function") {
			try {
				cb(res);
			} catch(e) {
				this.console(__name_script + " > " + this._name + ".dlgConfirm(): Error while executing \"onclose\" callback function.");
			}
		}
	};
	this.eventAdd(btn1, "click", f.bind(this, false, obj));
	this.eventAdd(btn2, "click", f.bind(this, true, obj));
	this._confirms.push(obj);
	if (!this._inited) return (this._confirms.length - 1);
	obj.pu = this.plPu.add({content: m, windowed: true, showcloser: false});
	if (obj.pu != -1) this.plPu.show(obj.pu);
	else this.console(__name_script + " > " + this._name + ".dlgConfirm(): Can't create modal window: popup plugin [" + __name_popup + "] call returned with an error.");
	return (this._confirms.length - 1);
};
/*
* Event helper functions
*/
_social_monster_share.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
_social_monster_share.prototype.eventFix = function(e) {
	// получить объект событие для IE
	e = e || window.event
	// добавить pageX/pageY для IE
	if (e.pageX == null && e.clientX != null) {
		var html = document.documentElement;
		var body = document.body;
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}
	// добавить which для IE
	if (!e.which && e.button) {
		e.which = (e.button & 1) ? 1 : ((e.button & 2) ? 3 : ((e.button & 4) ? 2 : 0));
	}
	if (!e.target && e.srcElement) {
		e.target = e.srcElement;
	}
	return e;
};
_social_monster_share.prototype.eventPreventDefault = function(e) {
	if (typeof e == "undefined") return;
	if (e.preventDefault) {
		e.preventDefault();
		e.stopPropagation();
	} else {
		e.returnValue = false;
		e.cancelBubble = true;
	}
};
_social_monster_share.prototype.eventRemove = function(el, evnt, func) {
	if (el.removeEventListener) {
		el.removeEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.detachEvent("on" + evnt, func);
	} else {
		el[evnt] = null;
	}
};
/*
* Events proccessing
*/
_social_monster_share.prototype.onClickButton = function(t) {
	if (typeof t != "string") return;
	if (typeof this._buttons[t] == "undefined") return;
	var bo = this._buttons[t];
	switch (t) {
		case "delicious":
		case "facebook":
		case "google-plus":
		case "mail-ru":
		case "odnoklassniki":
		case "twitter":
		case "vkontakte":
			var url = this._dirRoot + this._shareHelper + "?title=" + this._page.title + "&url=" + this._page.url + "&excerpt=" + encodeURIComponent(this._page.excerpt) + "&type=" + encodeURIComponent(t) + "&session=" + this._page.session + "&seed=" + this.seed();
			var left = Math.floor((screen.availWidth - 800) / 2);
			var top = Math.floor((screen.availHeight - 530) / 2);
    		var params = "width=800,height=530,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,directories=no,status=no,left=" + left + ",top=" + top;
			if (bo.pu !== -1 && !bo.pu.closed) {
				bo.pu.location.href = url;
				bo.pu.focus();
			} else {
				bo.pu = window.open(url, "", params);
				if (!bo.pu) {
					alert("Can't open popup window, please turn off the browser popup blocker.");
					bo.pu = -1;
				}
			}
			break;
		case "unknown-sn"://possible popup
			if (bo.pu == -1) {
				var cont = document.createElement("DIV");
				bo.pu = this.plPu.add({windowed: true, content: cont, showcloser: true});
				if (bo.pu > -1) {
					bo.cont = cont;
					cont.style.width = "560px";
					cont.style.backgroundColor = "#fff";
					var frame = document.createElement("IFRAME");
					frame.style.border = "none";
					frame.style.margin = "none";
					frame.style.outline = "none";
					frame.style.width = "560px";
					frame.style.height = "530px";
					cont.appendChild(frame);
				}
			}
			if (bo.pu == -1) this.console(__name_script + " > " + this._name + ".onClickButton(" + t + "): Popup create error.");
			else {
				frame.src = "http://[social_network_host]/share?url=" + this._page.url + "&title=" + this._page.title + "&description=" + encodeURIComponent(this._page.excerpt) + "&imageurl=";
				this.plPu.show(bo.pu);
			}
			break;
	}
};
_social_monster_share.prototype.seed = function() {
	if (typeof Math != "undefined")
		return "" + (Math.floor((Math.random()*1000000000) + 1));
	else
		return (new Date()).getTime();
};
/*
* Init helper function
*/
_social_monster_share.prototype.waitElement = function(elname, prop, last, store_as_object) {
	var name = "";
	if (typeof store_as_object != "string") {
		if ((typeof store_as_object == "boolean") && store_as_object) {
			name = "el";
		} else store_as_object = false;
	} else {
		name = store_as_object;
		store_as_object = true;
	}
	if ((typeof this[prop] != "object") || (!this[prop])) {
		if (store_as_object) {
			this[prop] = {};
			this[prop][name] = null;
		} else this[prop] = null;
	}
	var get = false;
	if (store_as_object) {
		if (!this[prop][name]) get = true;
	} else {
		if (!this[prop]) get = true;
	}
	if (get) {
		var el = document.getElementById(elname);
		if (!el) {
			if (last) {
				this.console(__name_script + " > " + this._name + ".waitElement() > Плагин не инициализирован - элемент [" + elname + "] не найден.");
				this._initErr = true;
				this._inited = true;
				return false;
			}
			return true;
		}
		if (store_as_object) this[prop][name] = el;
		else this[prop] = el;
	}
	return false;
};


/**
* Wrapper object for FB Comments handling
* Extended documentation on FB Comments API see here:
* https://developers.facebook.com/docs/plugins/comments/
*/
function _social_monster_fb(id) {
	this._config	=	{
		_loaded:		false,
		appId:			"",
		collapse:		false,
		collapsed:		false,
		colorscheme:	"light",//dark
		data_href:		"",
		instNum:		1,
		num_posts:		5,
		order_by:		"reverse_time", //time,social
		script:			"//connect.facebook.net/en_US/all.js",
		width:			550
	},
	this._initErr	=	false;
	this._initMax	=	100;
	this._initTm	=	100;
	this._initTry	=	0;
	this._inited	=	false;
	this._id		=	id;
	this._name		=	__name_inst_fb;
	this.elCollapse	=	null;
	this.elParent	=	null;
	this.fInit		=	null;
};
_social_monster_fb.prototype._init = function(config) {
	if (this._inited) return true;
	this._initTry++;
	if (typeof config != "object") config = false;
	if (!this._config._loaded && config) this._configImport(config);
	if (!this.elParent) this.elParent = document.getElementById(this._name + this._config.instNum);
	if (!this._config._loaded || (!this.elParent)) {
		if (this._initTry >= this._initMax) {
			this._inited = true;
			this._initErr = true;
			return true;
		} else {
			if (!this.fInit) this.fInit = this._init.bind(this);
			window.setTimeout(this.fInit, this._initTm);
			return false;
		}
	}
	var root = document.createElement("DIV");
	root.id = "fb-root";
	document.body.insertBefore(root, document.body.childNodes[0]);
	window.fbAsyncInit = this.start.bind(this);
	var head = document.getElementsByTagName("HEAD")[0];
	var s = document.createElement("SCRIPT");
	s.type = "text/javascript";
	s.async = true;
	s.src = this._config.script;
	head.appendChild(s);
	this._inited = true;
	return true;
};
_social_monster_fb.prototype._configImport = function(cfg) {
	if (typeof cfg != "object" || !cfg) return false;
	for (var c in this._config) {
		if (!this._config.hasOwnProperty(c)) continue;
		if (typeof cfg[c] != "undefined") {
			switch(c) {
				case "_loaded":
					break;
				case "num_posts":
				case "width":
					if (typeof cfg[c] == "string") {
						var v = parseInt(cfg[c], 10);
						if (isNaN(v)) v = 0;
						if ((c == "num_posts") && !v);
						else this._config[c] = v;
					} else {
						if (typeof cfg[c] == "number") this._config[c] = cfg[c];
					}
					break;
				default:
					if (typeof cfg[c] == "string" && !cfg[c]) break;
					this._config[c] = cfg[c];
					break;
			}
		}
	}
	this._config._loaded = true;
	return true;
};
_social_monster_fb.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
_social_monster_fb.prototype.onClickHide = function() {
	if (jQuery) {
		jQuery(this.elParent).stop(true, true);
		if (this.elParent.style.display == "block" || (this.elParent.style.display == "")) jQuery(this.elParent).slideUp(500);
		else jQuery(this.elParent).slideDown(500);
	} else {
		if (this.elParent.style.display == "block") this.elParent.style.display = "none";
		else this.elParent.style.display = "block"
	}
};
_social_monster_fb.prototype.start = function() {
	FB.init({
		appId      : this._config["appId"], // App ID
		//channelURL : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		oauth      : true, // enable OAuth 2.0
		xfbml      : true  // parse XFBML
	});
	if (!this.elParent) return;
	var el = document.createElement("DIV");
	el.className = "fb-comments";
	el.setAttribute("data-href", document.location.href);
	el.setAttribute("data-numposts", this._config.num_posts);
	el.setAttribute("data-colorscheme", this._config.colorscheme);
	el.setAttribute("data-order-by", this._config.order_by);
	el.setAttribute("data-width", this._config.width);
	this.elParent.appendChild(el);
	FB.XFBML.parse(this.elParent);
	if (this._config.collapse) {
		this.elCollapse = document.getElementById(this._name + this._config.instNum + "-hide");
		var ch;
		for (var c in this.elCollapse.childNodes) {
			ch = this.elCollapse.childNodes[c];
			if ((typeof ch.tagName != "undefined") && (ch.tagName.toLowerCase() == "div")) {
				if (ch.className.indexOf("btn") != -1) break;
			} else ch = false;
		}
		if (ch) this.eventAdd(ch, "click", this.onClickHide.bind(this));
	}
};
/**
* Wrapper object for Wordpress Comments handling
*/
function _social_monster_int(id) {
	this._config	=	{
		_loaded:		false,
		collapse:		false,
		collapsed:		false,
		instNum:		1,
	},
	this._initErr	=	false;
	this._initMax	=	100;
	this._initTm	=	100;
	this._initTry	=	0;
	this._inited	=	false;
	this._id		=	id;
	this._name		=	__name_inst_int;
	this.elCollapse	=	null;
	this.elParent	=	null;
	this.fInit		=	null;
};
_social_monster_int.prototype._init = function(config) {
	if (this._inited) return true;
	this._initTry++;
	if (typeof config != "object") config = false;
	if (!this._config._loaded && config) {
		this._configImport(config);
	}
	if (!this.elParent) this.elParent = document.getElementById(this._name + this._config.instNum);
	if (!this._config._loaded || (!this.elParent)) {
		if (this._initTry >= this._initMax) {
			this._inited = true;
			this._initErr = true;
			return true;
		} else {
			if (!this.fInit) this.fInit = this._init.bind(this);
			window.setTimeout(this.fInit, this._initTm);
			return false;
		}
	}
	this._inited = true;
	this.start();
	return true;
};
_social_monster_int.prototype._configImport = function(cfg) {
	if (typeof cfg != "object" || !cfg) return false;
	for (var c in this._config) {
		if (!this._config.hasOwnProperty(c)) continue;
		if (typeof cfg[c] != "undefined") {
			switch(c) {
				case "_loaded":
					break;
				default:
					if (typeof cfg[c] == "string" && !cfg[c]) break;
					this._config[c] = cfg[c];
					break;
			}
		}
	}
	this._config._loaded = true;
	return true;
};
_social_monster_int.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
_social_monster_int.prototype.onClickHide = function() {
	if (jQuery) {
		jQuery(this.elParent).stop(true, true);
		if (this.elParent.style.display == "block" || (this.elParent.style.display == "")) jQuery(this.elParent).slideUp(500);
		else jQuery(this.elParent).slideDown(500);
	} else {
		if (this.elParent.style.display == "block") this.elParent.style.display = "none";
		else this.elParent.style.display = "block"
	}
};
_social_monster_int.prototype.start = function() {
	this.elParent = document.getElementById(this._name + this._config.instNum);
	if (!this.elParent) return;
	if (this._config.collapse) {
		this.elCollapse = document.getElementById(this._name + this._config.instNum + "-hide");
		var ch;
		for (var c in this.elCollapse.childNodes) {
			ch = this.elCollapse.childNodes[c];
			if ((typeof ch.tagName != "undefined") && (ch.tagName.toLowerCase() == "div")) {
				if (ch.className.indexOf("btn") != -1) break;
			} else ch = false;
		}
		if (ch) this.eventAdd(ch, "click", this.onClickHide.bind(this));
	}
};
/**
* Wrapper object for VK Comments handling
* Extended documentation on VK Comments API see here (Russian):
* http://vk.com/developers.php?o=-1&p=%C4%EE%EA%F3%EC%E5%ED%F2%E0%F6%E8%FF+%EE+%E2%E8%E4%E6%E5%F2%E5+%EA%EE%EC%EC%E5%ED%F2%E0%F0%E8%E5%E2
*/
function _social_monster_vk(id) {
	this._config	=	{
		_loaded:		false,
		apiId:			"",
		attach:			"*", //graffiti, photo, audio, video, link
		collapse:		false,
		collapsed:		false,
		height:			0,
		element_id:		"vk_comments",
		instNum:		1,
		limit:			10,
		norealtime:		0,
		script:			"//vk.com/js/api/openapi.js?101",
		width:			0, //0 - auto
	},
	this._initErr	=	false;
	this._initMax	=	100;
	this._initTm	=	100;
	this._initTry	=	0;
	this._inited	=	false;
	this._id		=	id;
	this._name		=	__name_inst_vk;
	this._vkLinked	=	false;
	this.elCollapse	=	null;
	this.elParent	=	null;
	this.fInit		=	null;
};
_social_monster_vk.prototype._init = function(config) {
	if (this._inited) return true;
	this._initTry++;
	if (typeof config != "object") config = false;
	if (!this._config._loaded && config) {
		this._configImport(config);
	}
	if (this._config._loaded) {
		if (!this._vkLinked) {
			var segs = this._config.script.split("?");
			var head = document.getElementsByTagName("HEAD")[0];
			for (var c in head.childNodes) {
				if (typeof head.childNodes[c].tagName != "undefined" && (head.childNodes[c].tagName.toLowerCase() == "script") && (typeof head.childNodes[c].src != "undefined")) {
					if (head.childNodes[c].src.indexOf(segs[0]) != -1) {
						this._vkLinked = true;
						break;
					}
				}
			}
			if (!this._vkLinked) {
				var s = document.createElement("SCRIPT");
				s.type = "text/javascript";
				s.async = true;
				s.src = this._config.script;
				head.appendChild(s);
				this._vkLinked = true;
			}
		}
	}
	if (!this._config._loaded || (typeof VK == "undefined")) {
		if (this._initTry >= this._initMax) {
			this._inited = true;
			this._initErr = true;
			return true;
		} else {
			if (!this.fInit) this.fInit = this._init.bind(this);
			window.setTimeout(this.fInit, this._initTm);
			return false;
		}
	}
	this._inited = true;
	this.start();
	return true;
};
_social_monster_vk.prototype._configImport = function(cfg) {
	if (typeof cfg != "object" || !cfg) return false;
	for (var c in this._config) {
		if (!this._config.hasOwnProperty(c)) continue;
		if (typeof cfg[c] != "undefined") {
			switch(c) {
				case "_loaded":
					break;
				case "height":
				case "limit":
				case "norealtime":
				case "width":
					if (typeof cfg[c] == "string") {
						var v = parseInt(cfg[c], 10);
						if (isNaN(v)) v = 0;
						if ((c == "limit") && !v) this._config[c];
						else this._config[c] = v;
					}
					break;
				default:
					if (typeof cfg[c] == "string" && !cfg[c]) break;
					this._config[c] = cfg[c];
					break;
			}
		}
	}
	this._config._loaded = true;
	return true;
};
_social_monster_vk.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
_social_monster_vk.prototype.onClickHide = function() {
	if (jQuery) {
		jQuery(this.elParent).stop(true, true);
		if (this.elParent.style.display == "block" || (this.elParent.style.display == "")) jQuery(this.elParent).slideUp(500);
		else jQuery(this.elParent).slideDown(500);
	} else {
		if (this.elParent.style.display == "block") this.elParent.style.display = "none";
		else this.elParent.style.display = "block"
	}
};
_social_monster_vk.prototype.start = function() {
	this.elParent = document.getElementById(this._name + this._config.instNum);
	if (!this.elParent) return;
	VK.init({
		apiId: this._config.apiId,
		onlyWidgets: true,
	});
	VK.Widgets.Comments((this._name + this._config.instNum), {
		attach:	this._config.attach,
		height:	this._config.height,
		limit: this._config.limit,
		norealtime: this._config.norealtime,
		width: this._config.width
	});
	if (this._config.collapse) {
		this.elCollapse = document.getElementById(this._name + this._config.instNum + "-hide");
		var ch;
		for (var c in this.elCollapse.childNodes) {
			ch = this.elCollapse.childNodes[c];
			if ((typeof ch.tagName != "undefined") && (ch.tagName.toLowerCase() == "div")) {
				if (ch.className.indexOf("btn") != -1) break;
			} else ch = false;
		}
		if (ch) this.eventAdd(ch, "click", this.onClickHide.bind(this));
	}
};
if (typeof config != "object" || (!config)) config = {};
if (typeof config.type != "string" || (!config.type)) config.type = "vk";
var i = {};
this._instances.push(i);
i.id = this._instances.length - 1;
switch(config.type) {
	case "fb":
		i.obj = new _social_monster_fb(i.id);
		break;
	case "int":
		i.obj = new _social_monster_int(i.id);
		break;
	case "share":
		i.obj = new _social_monster_share(i.id);
		break;
	case "vk":
		i.obj = new _social_monster_vk(i.id);
		break;
	default:
		return;
}
if (typeof i.obj._initTry == "function") i.obj._initTry(config);
else if (typeof i.obj._init != "undefined") i.obj._init(config);
return i;
};
social_monster = new social_monster();