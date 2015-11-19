/*
Social Monster client App
Version: 1.0.8
Description: Adds various social features - likes, comments, etc.
Author: Bogdan Nazar
Author URI: http://www.bogdan-nazar.ru/wordpress/
License: GPLv2 or later
*/
(function(){
var __name_plug_dir = "social-features-for-wp";
var __name_inst_fb = "social-monster-fb";
var __name_inst_int = "social-monster-int";
var __name_inst_share = "social-monster-share";
var __name_inst_vk = "social-monster-vk";
var __name_popup = "popup";
var __name_script = "social-monster.js";
var __name_this = "social-monster";

//global objects registry
if (typeof window.thirdparty_shared == "undefined") {
	window.thirdparty_shared = new (function() {
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
	this.$_console			=	(window.console && (typeof window.console.log == "function"));
	this.$_initTm			=	false;
	this.$_initSleep		=	50;
	this.$_instances		=	[];
	this.$_protos			=	{};
	this.fInstancesInit		=	this._instancesInit.bind(this);
};
social_monster.prototype._init = function() {

/**
* Wrapper object for Share Buttons
*/
var _share = function(id) {
	this._alerts			=	[];
	this._args				=	false;
	this._buttons			=	null;
	this._confirms			=	[];
	this._dirs				=	{
		plug:					__name_plug_dir,
		root:					"/"
	};
	this._domain			=	"";
	this._inited			=	false;
	this._instance			=	0;
	this._name				=	__name_inst_share;
	this._page				=	null;
	this._puLinked			=	false;
	this._puScript			=	"wp-content/plugins/" + this._dirs.plug + "/dashboard/scripts/popup.js";
	this._puStyle			=	"wp-content/plugins/" + this._dirs.plug + "/dashboard/styles/popup.css";
	this._session			=	"unknown";
	this._shareHelper		=	"wp-content/plugins/" + this._dirs.plug + "/sharer.php";
	this.elMain				=	null;
	this.plPu				=	null;
};
_share.prototype._init = function(last, config) {
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
			if (typeof config.plug == "string" && config.plug) this._dirs.plug = config.plug;
			if (typeof config.root == "string" && config.root) this._dirs.root = config.root;
			if (typeof config.link == "string") this._page.url = config.link;
			if (typeof config.title == "string") this._page.title = config.title;
		} else {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > " + this._name + "._init(): Init error - config wait timeout.");
				return true;
			}
			return false;
		}
	}
	//waiting other objects
	if (!this.plPu) {
		this.plPu = window.thirdparty_shared.objGet(__name_popup);
		if (!this.plPu) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > " + this._name + "._init(): Init error - dependend object [" + __name_popup + "] wait timeout.");
				return true;
			}
			if (!this._puLinked) {
				var head = document.getElementsByTagName("HEAD")[0];
				for (var c in head.childNodes) {
					if (typeof head.childNodes[c].tagName != "undefined" && (head.childNodes[c].tagName.toLowerCase() == "script") && (typeof head.childNodes[c].src != "undefined")) {
						if (head.childNodes[c].src.indexOf(this._dirs.plug + "/dashboard/scripts/popup.js") != -1) {
							this._puLinked = true;
							break;
						}
					}
				}
				if (!this._puLinked) {
					var s = document.createElement("SCRIPT");
					s.type = "text/javascript";
					s.async = true;
					s.src = this._dirs.root + this._puScript;
					head.appendChild(s);
					var l = document.createElement("LINK");
					l.type = "text/css";
					l.rel = "stylesheet";
					l.href = this._dirs.root + this._puStyle;
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
	var n, c;
	for (c in this.elMain.childNodes) {
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
   						var ml = 120;
   						var cc = 0;
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
_share.prototype.onClickButton = function(t) {
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
			var url = this._dirs.root + this._shareHelper + "?title=" + this._page.title + "&url=" + this._page.url + "&excerpt=" + encodeURIComponent(this._page.excerpt) + "&type=" + encodeURIComponent(t) + "&session=" + this._page.session + "&seed=" + this.seed();
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
this.$_protos["share"] = _share;

/**
* Wrapper object for FB Comments handling
* Extended documentation on FB Comments API see here:
* https://developers.facebook.com/docs/plugins/comments/
*/
var _fb = function(id) {
	this._collapsed		=	false;
	this._collapsedEmu	=	true;
	this._config		=	{
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
		version:		false,
		width:			"100%"//native is 550px
	},
	this._initErr		=	false;
	this._inited		=	false;
	this._id			=	id;
	this._name			=	__name_inst_fb;
	this._script		=	{
		checked:			false,
		elem:				null,
		inited:				false,
		isSDK:				false,
		hasId:				false,
		root:				false,
		version:			false
	};
	this.elBody			=	null;
	this.elCollapse		=	null;
	this.elParent		=	null;
	this.fFBInit		=	this.FBInit.bind(this);
	this.fStart			=	this.start.bind(this);
};
_fb.prototype._init = function(last, config) {
	if (this._inited) return true;
	if (typeof config == "string") {
		this.console(__name_script + " > [Social Monster FB]._init(): instance init error. Reason: " + config);
		this._initErr = true;
		this._inited = true;
		return true;
	}
	if (typeof last != "boolena") last = false;
	if (typeof config != "object") config = false;
	if (!this._config._loaded) {
		if (config) {
			this._configImport(config);
			this._collapsed = this._config.collapsed;
		}
		if (!this._config._loaded) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > [Social Monster FB]._init(): Can't start without configuration passed.");
				return true;
			}
			return false;
		}
	}
	if (!this._script.checked) {
		var loaded = this.FBInjected();
		if (loaded) {
			//using external script
			if (window.FB) {
				//FB loaded and inited (will be inited)
				if ((window.fbAsyncInit && window.fbAsyncInit.hasRun) || this._script.hasId || this._script.isSDK) {
					this._script.inited = true;
				} else {
					this.FBInit();
				}
			} else {
				if (window.fbAsyncInit) {
					//trying to intercept fbAsyncInit
					var extInit = window.fbAsyncInit;
					var self = this;
					window.fbAsyncInit = function(){
						try {
							extInit.apply(window, arguments);
						} catch(e) {
							self.console(__name_script + " > [Social Monster FB]._init(): FB init error on a thirdparty function [extInit()].");
							self.console(extInit);
						}
						self._script.inited = true;
						self.FBRoot();
					};
				} else {
					//trying to start anyway...
					//but fbAsyncInit() function may be overwritten by another thirdparty FB installation
					window.fbAsyncInit = this.fFBInit;
					this.console(__name_script + " > [Social Monster FB].init(): Trying to start in the non-secure mode...")
				}
			}
		} else {
			window.fbAsyncInit = this.fFBInit;
			var head = document.getElementsByTagName("HEAD")[0];
			var s = document.createElement("SCRIPT");
			s.type = "text/javascript";
			s.async = true;
			s.src = this._config.script;
			head.appendChild(s);
		}
	}
	if (!this.elBody) {
		this.elBody = document.body;
		if (!this.elBody) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > [Social Monster FB]._init(): Can't start without page BODY container.");
				return true;
			}
			return false;
		}
	}
	if (!this._script.root) this.FBRoot();
	if (!this._script.inited) {
		if (last) {
			this._inited = true;
			this._initErr = true;
			this.console(__name_script + " > [Social Monster FB]._init(): Can't start without FB SDK.");
			return true;
		}
		return false;
	}
	if (!this.elParent) {
		this.elParent = document.getElementById(this._name + this._config.instNum);
		if (!this.elParent) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > [Social Monster FB]._init(): Can't start without main DIV container (" + this._name + this._config.instNum  + ")");
				return true;
			}
			return false;
		}
	}
	this._inited = true;
	this.start();
	return true;
};
_fb.prototype._configImport = function(cfg) {
	if (typeof cfg != "object" || !cfg) return false;
	var c, v;
	for (c in this._config) {
		if (!this._config.hasOwnProperty(c)) continue;
		if (typeof cfg[c] != "undefined") {
			switch(c) {
				case "_loaded": break;
				case "num_posts":
				case "width":
					if (typeof cfg[c] == "string") v = parseInt(cfg[c], 10) || 0;
					else v = cfg[c];
					//saving cfg[c] cause it may contain string value "100%"
					if (v) this._config[c] = cfg[c];
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
_fb.prototype.FBInjected = function() {
	this._script.checked = true;
	var h = document.getElementsByTagName("HEAD")[0];
	var c = 0, ch,
		cn = h.childNodes,
		l = cn.length, pt;
	for (; c < l; c++) {
		ch = h.childNodes[c];
		if (ch.tagName && (ch.tagName.toUpperCase() == "SCRIPT")) {
			if (ch.src.indexOf("connect.facebook.net") != -1) {
				this._script.elem = ch;
				//version is not used now but may be used in future
				if (ch.src.indexOf("&version=v") != -1) {
					pt = ch.src.split("&version=v");
					this._script.version = (pt[1].split("&"))[0];
				}
				this._script.isSDK = (ch.src.indexOf("/sdk.js") != -1)
				this._script.hasId = (ch.src.indexOf("appId=") != -1)
				return ch;
			};
		}
	}
	return false;
};
_fb.prototype.FBInit = function() {
	this._script.inited = true;
	var opts = {
		appId:		this._config["appId"], // App ID
		//channelURL: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
		status:		true, // check login status
		cookie:		true, // enable cookies to allow the server to access the session
		oauth:		true, // enable OAuth 2.0
		xfbml:		true  // parse XFBML
	};
	if (this._script.version) opts.version = this._script.version;
	FB.init(opts);
	this.FBRoot();
};
_fb.prototype.FBRoot = function() {
	if (!this.elBody) return;
	this._script.root = true;
	//trying to start by own
	var root = document.getElementById("fb-root") || false;
	if (!root) {
		root = document.createElement("DIV");
		root.id = "fb-root";
		if (this.elBody.childNodes.length) this.elBody.insertBefore(root, this.elBody.childNodes[0]);
		else this.elBody.appendChild(root);
	}
};
_fb.prototype.onClickHide = function() {
	if (this._collapsedEmu) {
		this._collapsedEmu = false;
		this.elParent.style.display = "none";
		var a = ["height", "overflow", "margin-top"];
		for (var c = 0; c < 2; c++) {
			if (this.elParent.style.removeProperty) this.elParent.style.removeProperty(a[c]);
			else this.elParent.style.removeAttribute(a[c]);
		}
	}
	if (jQuery) {
		jQuery(this.elParent).stop(true, true);
		if (this.elParent.style.display == "block" || (this.elParent.style.display == "")) jQuery(this.elParent).slideUp(500);
		else jQuery(this.elParent).slideDown(500);
	} else {
		if (this.elParent.style.display == "block") this.elParent.style.display = "none";
		else this.elParent.style.display = "block"
	}
};
_fb.prototype.start = function() {
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
this.$_protos["fb"] = _fb;

/**
* Wrapper object for Wordpress Comments handling
*/
var _int = function(id) {
	this._config	=	{
		_loaded:		false,
		collapse:		false,
		collapsed:		false,
		instNum:		1,
	},
	this._initErr	=	false;
	this._inited	=	false;
	this._id		=	id;
	this._name		=	__name_inst_int;
	this.elCollapse	=	null;
	this.elParent	=	null;
};
_int.prototype._init = function(last, config) {
	if (this._inited) return true;
	if (typeof config != "object") config = false;
	if (!this._config._loaded && config) {
		this._configImport(config);
		if (!this._config._loaded) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				return true;
			}
			return false;
		}
	}
	if (!this.elParent) {
		this.elParent = document.getElementById(this._name + this._config.instNum);
		if (!this.elParent) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				return true;
			}
			return false;
		}
	}
	this._inited = true;
	this.start();
	return true;
};
_int.prototype._configImport = function(cfg) {
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
_int.prototype.onClickHide = function() {
	if (jQuery) {
		jQuery(this.elParent).stop(true, true);
		if (this.elParent.style.display == "block" || (this.elParent.style.display == "")) jQuery(this.elParent).slideUp(500);
		else jQuery(this.elParent).slideDown(500);
	} else {
		if (this.elParent.style.display == "block") this.elParent.style.display = "none";
		else this.elParent.style.display = "block"
	}
};
_int.prototype.start = function() {
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
this.$_protos["int"] = _int;

/**
* Wrapper object for VK Comments handling
* Extended documentation on VK Comments API see here (Russian):
* http://vk.com/developers.php?o=-1&p=%C4%EE%EA%F3%EC%E5%ED%F2%E0%F6%E8%FF+%EE+%E2%E8%E4%E6%E5%F2%E5+%EA%EE%EC%EC%E5%ED%F2%E0%F0%E8%E5%E2
*/
var _vk = function(id) {
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
		script:			"//vk.com/js/api/openapi.js",
		width:			0, //0 - auto
	},
	this._initErr	=	false;
	this._inited	=	false;
	this._id		=	id;
	this._name		=	__name_inst_vk;
	this._vkLinked	=	false;
	this.elCollapse	=	null;
	this.elParent	=	null;
};
_vk.prototype._init = function(last, config) {
	if (this._inited) return true;
	if (typeof config == "string") {
		this.console(__name_script + " > [Social Monster VK]._init(): instance init error. Reason: " + config);
		this._initErr = true;
		this._inited = true;
		return true;
	}
	if (typeof config != "object") config = false;
	if (!this._config._loaded) {
		if (config) this._configImport(config);
		if (!this._config._loaded) {
			if (last) {
				this._inited = true;
				this._initErr = true;
				this.console(__name_script + " > [Social Monster VK]._init(): Can't start without configuration passed.");
				return true;
			}
			return false;
		}
	}
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
	if (typeof window.VK == "undefined") {
		if (last) {
			this._inited = true;
			this._initErr = true;
			this.console(__name_script + " > [Social Monster VK]._init(): Can't start without VK SDK.");
			return true;
		}
		return false;
	}
	this._inited = true;
	this.start();
	return true;
};
_vk.prototype._configImport = function(cfg) {
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
						var v = parseInt(cfg[c], 10) || 0;
						if ((c == "limit") && !v) this._config[c];
						else this._config[c] = v;
					} else {
						if ((typeof cfg[c] == "number") && cfg[c]) this._config[c] = cfg[c];
					}
					break;
				default:
					if ((typeof cfg[c] == "string") && !cfg[c]) break;
					this._config[c] = cfg[c];
					break;
			}
		}
	}
	this._config._loaded = true;
	return true;
};
_vk.prototype.onClickHide = function() {
	if (jQuery) {
		jQuery(this.elParent).stop(true, true);
		if (this.elParent.style.display == "block" || (this.elParent.style.display == "")) jQuery(this.elParent).slideUp(500);
		else jQuery(this.elParent).slideDown(500);
	} else {
		if (this.elParent.style.display == "block") this.elParent.style.display = "none";
		else this.elParent.style.display = "block"
	}
};
_vk.prototype.start = function() {
	this.elParent = document.getElementById(this._name + this._config.instNum);
	if (!this.elParent) return;
	VK.init({
		apiId: this._config.apiId,
		onlyWidgets: true,
	});
	VK.Widgets.Comments((this._name + this._config.instNum), {
		attach:	this._config.attach,
		autoPublish: 0,
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
this.$_protos["vk"] = _vk;

};
social_monster.prototype._instance = function(config) {
	if (typeof config != "object" || (!config)) config = {};
	if (typeof config.type != "string" || (!config.type)) config.type = "vk";
	var i = {
		config:		config,
		id:			0,
		initErr:	false,
		inited:		false,
		init:		{
			last:	false,
			tryCur:	0,
			tryMax:	1000,
		},
		obj:		null,
		parent:		this
	};
	this.$_instances.push(i);
	i.id = this.$_instances.length - 1;
	//creating
	if (this.$_protos[config.type]) i.obj = new this.$_protos[config.type](i.id);
	else return false;
	//extending
	i.obj.console = this.console;
	i.obj.eventAdd = this.eventAdd;
	i.obj.eventFix = this.eventFix;
	i.obj.eventPreventDefault = this.eventPreventDefault;
	i.obj.eventRemove = this.eventRemove;
	i.obj.seed = this.seed;
	i.obj.waitElement = this.waitElement;
	this._instancesInit();
	return i;
};
social_monster.prototype._instancesInit = function() {
	if (this.$_initTm) {
		window.clearTimeout(this.$_initTm);
		this.$_initTm = false;
	}
	var c = 0, err, i,
		l = this.$_instances.length,
		inited = true, res;
	for (; c < l; c++) {
		i = this.$_instances[c];
		if (i.inited) continue;
		i.init.tryCur++;
		if (i.init.tryCur > i.init.tryMax) {
			i.inited = true;
			i.initErr = true;
		} else {
			err = false;
			i.init.last = (i.init.tryCur == i.init.tryMax);
			if (typeof i.obj._init == "function") {
				try {
					res = i.obj._init(i.init.last, i.config, i);
					//this.console("[" + i.obj._name + "/" + i.init.tryCur + "]: " + (res?"true":"false"));
					if (typeof res !== "boolean") res = true;
				} catch(e) {
					res = true;
					err = true;
					this.console(__name_script + " > " + this._name + "._instancesInit(): Plugin init error [" + i.obj._name + "]. Message: [" + e.name + "/" + e.message + "].");
				}
			} else {
				res = true;
				err = true;
				this.console(__name_script + " > " + this._name + "._instancesInit(): Warning - init entry [._init()] of the [" + this._name + "] instance is not defined or is not a function.");
			}
			i.inited = res;
			i.initErr = err;
			if (err) {
				if (typeof i.obj._inited == "boolean") this._inited = true;
				if (typeof i.obj._initeErr == "boolean") this._initErr = true;
			}
			inited = inited && res;
		}
	}
	if (!inited) {
		this.$_initTm = window.setTimeout(this.fInstancesInit, this.$_initSleep);
		//this.console("Timeout set: " + this.$_initTm);
	}
};
/*
* Shared functions
*/
social_monster.prototype.console = function(msg) {
	if (this.$_console) window.console.log(msg);
};
social_monster.prototype.dlgAlert = function(msg, type, wd) {
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
social_monster.prototype.dlgConfirm = function(msg, cb, title, wd) {
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
social_monster.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
social_monster.prototype.eventFix = function(e) {
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
social_monster.prototype.eventPreventDefault = function(e) {
	if (typeof e == "undefined") return;
	if (e.preventDefault) {
		e.preventDefault();
		e.stopPropagation();
	} else {
		e.returnValue = false;
		e.cancelBubble = true;
	}
};
social_monster.prototype.eventRemove = function(el, evnt, func) {
	if (el.removeEventListener) {
		el.removeEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.detachEvent("on" + evnt, func);
	} else {
		el[evnt] = null;
	}
};
social_monster.prototype.seed = function() {
	if (typeof Math != "undefined")
		return "" + (Math.floor((Math.random()*1000000000) + 1));
	else
		return (new Date()).getTime();
};
social_monster.prototype.waitElement = function(elname, prop, last, store_as_object) {
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

//starting Social Monster
window.social_monster = new social_monster();
window.social_monster._init();
})();