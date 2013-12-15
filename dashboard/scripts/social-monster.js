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
var social_monster = (function(){
var __name_popup = "popup";
var __name_script = "social-monster.js";
var __name_social_monster = "social-monster";

var _social_monster = function() {
	this._alertWait			=	"Please wait until previous action has finished.";
	this._alerts			=	[];
	this._alertsByOwner		=	[];
	this._appRoot			=	"/";
	this._confirms			=	[];
	this._console			=	((typeof console == "undefined") || (!console)) ? false : true;
	this._dataGen			=	{
		cacheTm:				300,
		order:					["int","vk","fb"],
		orderEl:				null,
		orderTitles:			[],
		template:				"default",
		update:					0,
	};
	this._dataShare			=	{
		buttonsAll:				[]
	};
	this._debug				=	false;
	this._inAction			=	[];
	this._initData			=	{
		curtry:					0,
		maxtry:					100,
		sleep:					50
	};
	this._initErr			=	false;
	this._inited			=	false;
	this._msgsOnSave		=	{};
	this._name				=	__name_social_monster;
	this._pu				=	-1;
	this._silentReqs		=	[];
	this._tab				=	null;
	this._tabs				=	[];
	this._tabDon			=	{slug: "don"};
	this._tabFb				=	{slug: "fb"};
	this._tabInt			=	{slug: "int"};
	this._tabShare			=	{slug: "share"};
	this._tabSup			=	{slug: "sup"};
	this._tabVk				=	{slug: "vk"};
	this.elAction			=	null;
	this.elFbAppId			=	null;
	this.elFbBtnSave		=	null;
	this.elFbCollapsed		=	null;
	this.elFbColorScheme	=	null;
	this.elFbDisplay		=	null;
	this.elFbMsgSave		=	null;
	this.elFbNumPosts		=	null;
	this.elFbOrderBy		=	null;
	this.elFbScript			=	null;
	this.elFbState			=	null;
	this.elFbWidth			=	null;
	this.elForm				=	null;
	this.elGenBtnSave		=	null;
	this.elGenCacheTm		=	null;
	this.elGenMsgSave		=	null;
	this.elGenTemplate		=	null;
	this.elGenUpdate		=	null;
	this.elIntBtnSave		=	null;
	this.elIntCollapsed		=	null;
	this.elIntDisplay		=	null;
	this.elIntMsgSave		=	null;
	this.elIntState			=	null;
	this.elShareBtnSave		=	null;
	this.elShareBtns		=	null;
	this.elShareBtnsAll		=	null;
	this.elShareHtml		=	null;
	this.elShareMsgSave		=	null;
	this.elSharePosition	=	null;
	this.elSharePublisher	=	null;
	this.elShareState		=	null;
	this.elSupBtnSave		=	null;
	this.elSupDescr			=	null;
	this.elSupEmail			=	null;
	this.elSupMsgSave		=	null;
	this.elSupTitle			=	null;
	this.elSupType			=	null;
	this.elVkApiId			=	null;
	this.elVkAttach			=	{
		audio:					null,
		graffiti:				null,
		link:					null,
		photo:					null,
		select:					null,
		video:					null
	};
	this.elVkBtnSave		=	null;
	this.elVkCollapsed		=	null;
	this.elVkDisplay		=	null;
	this.elVkElemId			=	null;
	this.elVkLimit			=	null;
	this.elVkMsgSave		=	null;
	this.elVkNoRealtime		=	null;
	this.elVkScript			=	null;
	this.elVkState			=	null;
	this.elVkWidth			=	null;
	this.elVkHeight			=	null;
	this.fInit				=	this._initTry.bind(this);
	this.fOnAction			=	null;
	this.plPu				=	null;
	this._initTry();
};
_social_monster.prototype._init = function(last) {
	if (typeof last != "boolean") last = false;
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
			return false;
		}
	}
	// -------------------- waiting plugins and elements ---------------------------
	//parsing dom
	if (this.waitElement(this._name + "-form", "elForm", last)) return this._inited;
	if (this.waitElement(this._name + "-action", "elAction", last)) return this._inited;
	//general settings
	if (this.waitElement(this._name + "-update", "elGenUpdate", last)) return this._inited;
	if (this.waitElement(this._name + "-template", "elGenTemplate", last)) return this._inited;
	if (this.waitElement(this._name + "-wp-template-tm", "elGenCacheTm", last)) return this._inited;
	// --sn order and titles
	if (this.waitElement(this._name + "-order-data", "_dataGen", last, "orderEl")) return this._inited;
	// --translated messages on save result
	if (this.waitElement(this._name + "-btn-save-general", "elGenBtnSave", last)) return this._inited;
	if (this.waitElement(this._name + "-msg-save-general", "elGenMsgSave", last)) return this._inited;
	//share settings
	//comments settings
	// --tab swithes
	// ---tab btn share
	if (this.waitElement(this._name + "-tab-btn-share", "_tabShare", last, true)) return this._inited;
	if (this.waitElement(this._name + "-tab-share", "_tabShare", last, "tab")) return this._inited;
	// ---tab btn fb
	if (this.waitElement(this._name + "-tab-btn-fb", "_tabFb", last, true)) return this._inited;
	if (this.waitElement(this._name + "-tab-fb", "_tabFb", last, "tab")) return this._inited;
	// ---tab btn vk
	if (this.waitElement(this._name + "-tab-btn-vk", "_tabVk", last, true)) return this._inited;
	if (this.waitElement(this._name + "-tab-vk", "_tabVk", last, "tab")) return this._inited;
	// ---tab btn int
	if (this.waitElement(this._name + "-tab-btn-int", "_tabInt", last, true)) return this._inited;
	if (this.waitElement(this._name + "-tab-int", "_tabInt", last, "tab")) return this._inited;
	// ---tab btn sup
	if (this.waitElement(this._name + "-tab-btn-sup", "_tabSup", last, true)) return this._inited;
	if (this.waitElement(this._name + "-tab-sup", "_tabSup", last, "tab")) return this._inited;
	// ---tab btn don
	if (this.waitElement(this._name + "-tab-btn-don", "_tabDon", last, true)) return this._inited;
	if (this.waitElement(this._name + "-tab-don", "_tabDon", last, "tab")) return this._inited;
	// --tab share
	if (this.waitElement(this._name + "-share-state", "elShareState", last)) return this._inited;
	if (this.waitElement(this._name + "-share-position", "elSharePosition", last)) return this._inited;
	if (this.waitElement(this._name + "-share-buttons-all", "elShareBtnsAll", last)) return this._inited;
	if (this.waitElement(this._name + "-share-buttons", "elShareBtns", last)) return this._inited;
	if (this.waitElement(this._name + "-share-sharethis-html", "elShareHtml", last)) return this._inited;
	if (this.waitElement(this._name + "-share-sharethis-publisher", "elSharePublisher", last)) return this._inited;
	// ---share save control
	if (this.waitElement(this._name + "-btn-save-share", "elShareBtnSave", last)) return this._inited;
	if (this.waitElement(this._name + "-msg-save-share", "elShareMsgSave", last)) return this._inited;
	// --tab fb
	if (this.waitElement(this._name + "-fb-state", "elFbState", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-appid", "elFbAppId", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-script", "elFbScript", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-width", "elFbWidth", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-num_posts", "elFbNumPosts", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-colorscheme", "elFbColorScheme", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-order_by", "elFbOrderBy", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-collapse", "elFbDisplay", last)) return this._inited;
	if (this.waitElement(this._name + "-fb-collapsed", "elFbCollapsed", last)) return this._inited;
	// ---fb save control
	if (this.waitElement(this._name + "-btn-save-fb", "elFbBtnSave", last)) return this._inited;
	if (this.waitElement(this._name + "-msg-save-fb", "elFbMsgSave", last)) return this._inited;
	// --tab vk
	if (this.waitElement(this._name + "-vk-state", "elVkState", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-apiid", "elVkApiId", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-script", "elVkScript", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-width", "elVkWidth", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-height", "elVkHeight", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-limit", "elVkLimit", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-attach", "elVkAttach", last, "select")) return this._inited;
	if (this.waitElement(this._name + "-vk-attach-more", "elVkAttachMore", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-attach-graffiti", "elVkAttach", last, "graffiti")) return this._inited;
	if (this.waitElement(this._name + "-vk-attach-photo", "elVkAttach", last, "photo")) return this._inited;
	if (this.waitElement(this._name + "-vk-attach-audio", "elVkAttach", last, "audio")) return this._inited;
	if (this.waitElement(this._name + "-vk-attach-video", "elVkAttach", last, "video")) return this._inited;
	if (this.waitElement(this._name + "-vk-attach-link", "elVkAttach", last, "link")) return this._inited;
	if (this.waitElement(this._name + "-vk-element_id", "elVkElemId", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-norealtime", "elVkNoRealtime", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-collapse", "elVkDisplay", last)) return this._inited;
	if (this.waitElement(this._name + "-vk-collapsed", "elVkCollapsed", last)) return this._inited;
	// ---vk save control
	if (this.waitElement(this._name + "-btn-save-vk", "elVkBtnSave", last)) return this._inited;
	if (this.waitElement(this._name + "-msg-save-vk", "elVkMsgSave", last)) return this._inited;
	// --tab int
	if (this.waitElement(this._name + "-int-state", "elIntState", last)) return this._inited;
	if (this.waitElement(this._name + "-int-collapse", "elIntDisplay", last)) return this._inited;
	if (this.waitElement(this._name + "-int-collapsed", "elIntCollapsed", last)) return this._inited;
	// ---int save control
	if (this.waitElement(this._name + "-btn-save-int", "elIntBtnSave", last)) return this._inited;
	if (this.waitElement(this._name + "-msg-save-int", "elIntMsgSave", last)) return this._inited;
	// --tab sup
	if (this.waitElement(this._name + "-sup-type", "elSupType", last)) return this._inited;
	if (this.waitElement(this._name + "-sup-email", "elSupEmail", last)) return this._inited;
	if (this.waitElement(this._name + "-sup-title", "elSupTitle", last)) return this._inited;
	if (this.waitElement(this._name + "-sup-descr", "elSupDescr", last)) return this._inited;
	// ---sup save control
	if (this.waitElement(this._name + "-btn-save-sup", "elSupBtnSave", last)) return this._inited;
	if (this.waitElement(this._name + "-msg-save-sup", "elSupMsgSave", last)) return this._inited;

	// --------------------------- initializing data ----------------------------------------------------
	// --sn order and titles
	var order = false;
	try {order = eval("(" + this._dataGen.orderEl.innerHTML + ")");} catch (e) {};
	if (order instanceof Array) this._dataGen.order = order;
	this._dataGen.orderEl.innerHTML = "";
	this._dataGen.orderEl.parentNode.removeChild(this._dataGen.orderEl);
	var el, i;
	for (var c in this._dataGen.order) {
		if (!this._dataGen.order.hasOwnProperty(c)) continue;
		el = document.getElementById(this._name + "-order-name-" + this._dataGen.order[c]);
		if (el) {
			this._dataGen.orderTitles.push(el);
			i = this._dataGen.orderTitles.length - 1;
			el = document.getElementById(this._name + "-order-btn" + i);
			if (el) this.eventAdd(el , "click", this.onClickGenOrderChange.bind(this, i));
		}
		else break;
	}
	// --translated messages on save result
	try {this._msgsOnSave[this.elGenBtnSave.id] = eval("(" + this.elGenMsgSave.innerHTML + ")");} catch (e) {};
	this.elGenMsgSave.innerHTML = "";
	this.elGenMsgSave.style.display = "inline-block";
	if (typeof this._msgsOnSave[this.elGenBtnSave.id] != "object") this._msgsOnSave[this.elGenBtnSave.id] = [];
	if (typeof this._msgsOnSave[this.elGenBtnSave.id][0] == "undefined") this._msgsOnSave[this.elGenBtnSave.id][0] = "Success!";
	if (typeof this._msgsOnSave[this.elGenBtnSave.id][1] == "undefined") this._msgsOnSave[this.elGenBtnSave.id][1] = "Error!";
	this._msgsOnSave[this.elGenBtnSave.id][2] = this.elGenMsgSave;
	this.eventAdd(this.elGenBtnSave, "click", this.onClickGenBtnSave.bind(this));
	//comments settings
	// --tab swithes
	// ---tab btn share
	this.eventAdd(this._tabShare.el , "click", this.onClickTabBtn.bind(this, this._tabShare));
	for (var c in this._tabShare.el.parentNode.childNodes) {
		if ((typeof this._tabShare.el.parentNode.childNodes[c].tagName != "undefined") && (this._tabShare.el.parentNode.childNodes[c].tagName.toLowerCase() == "div")) {
			this._tabShare.icon = this._tabShare.el.parentNode.childNodes[c];
			break;
		}
	}
	this._tabs[this._tabShare.slug] = this._tabShare;
	this._tab = this._tabShare;
	// ---tab btn fb
	this.eventAdd(this._tabFb.el , "click", this.onClickTabBtn.bind(this, this._tabFb));
	for (var c in this._tabFb.el.parentNode.childNodes) {
		if ((typeof this._tabFb.el.parentNode.childNodes[c].tagName != "undefined") && (this._tabFb.el.parentNode.childNodes[c].tagName.toLowerCase() == "div")) {
			this._tabFb.icon = this._tabFb.el.parentNode.childNodes[c];
			break;
		}
	}
	this._tabs[this._tabFb.slug] = this._tabFb;
	// ---tab btn vk
	this.eventAdd(this._tabVk.el , "click", this.onClickTabBtn.bind(this, this._tabVk));
	for (var c in this._tabVk.el.parentNode.childNodes) {
		if ((typeof this._tabVk.el.parentNode.childNodes[c].tagName != "undefined") && (this._tabVk.el.parentNode.childNodes[c].tagName.toLowerCase() == "div")) {
			this._tabVk.icon = this._tabVk.el.parentNode.childNodes[c];
			break;
		}
	}
	this._tabs[this._tabVk.slug] = this._tabVk;
	// ---tab btn int
	this.eventAdd(this._tabInt.el , "click", this.onClickTabBtn.bind(this, this._tabInt));
	for (var c in this._tabInt.el.parentNode.childNodes) {
		if ((typeof this._tabInt.el.parentNode.childNodes[c].tagName != "undefined") && (this._tabInt.el.parentNode.childNodes[c].tagName.toLowerCase() == "div")) {
			this._tabInt.icon = this._tabInt.el.parentNode.childNodes[c];
			break;
		}
	}
	this._tabs[this._tabInt.slug] = this._tabInt;
	// ---tab btn sup
	this.eventAdd(this._tabSup.el , "click", this.onClickTabBtn.bind(this, this._tabSup));
	for (var c in this._tabSup.el.parentNode.childNodes) {
		if ((typeof this._tabSup.el.parentNode.childNodes[c].tagName != "undefined") && (this._tabSup.el.parentNode.childNodes[c].tagName.toLowerCase() == "div")) {
			this._tabSup.icon = this._tabSup.el.parentNode.childNodes[c];
			break;
		}
	}
	this._tabs[this._tabSup.slug] = this._tabSup;
	// ---tab btn don
	this.eventAdd(this._tabDon.el , "click", this.onClickTabBtn.bind(this, this._tabDon));
	for (var c in this._tabDon.el.parentNode.childNodes) {
		if ((typeof this._tabDon.el.parentNode.childNodes[c].tagName != "undefined") && (this._tabDon.el.parentNode.childNodes[c].tagName.toLowerCase() == "div")) {
			this._tabDon.icon = this._tabDon.el.parentNode.childNodes[c];
			break;
		}
	}
	this._tabs[this._tabSup.slug] = this._tabSup;
	// --tab share
	var tn = [];//garbage
	for (var c in this.elShareBtnsAll.childNodes) {
		if ((typeof this.elShareBtnsAll.childNodes[c].tagName != "undefined") && (this.elShareBtnsAll.childNodes[c].tagName.toLowerCase() == "div") && (this.elShareBtnsAll.childNodes[c].className.indexOf("btn ") != -1)) {
			var btn = {btn: this.elShareBtnsAll.childNodes[c], name: this.elShareBtnsAll.childNodes[c].className.replace("btn ", "")};
			this._dataShare.buttonsAll.push(btn);
			this.eventAdd(this.elShareBtnsAll.childNodes[c], "click", this.onClickShareBtn.bind(this, btn));
		} else {
			tn.push(this.elShareBtnsAll.childNodes[c]);
		}
	}
	if (tn.length) {
		for (var c in tn) {
			if (!tn.hasOwnProperty(c)) continue;
			if (typeof tn[c].parentNode != "undefined") tn[c].parentNode.removeChild(tn[c]);
		}
		tn = null;
	}
	var btns = [];
	var buttons = this.elShareBtns.innerHTML;
	this.elShareBtns.innerHTML = "";
	buttons = buttons.split(",");
	var found = false;
	for (var c in buttons) {
		if (!buttons.hasOwnProperty(c)) continue;
		found = false;
		for (var c1 in this._dataShare.buttonsAll) {
			if (!this._dataShare.buttonsAll.hasOwnProperty(c1)) continue;
			if (this._dataShare.buttonsAll[c1].name == buttons[c]) {
				found = true;
				break;
			}
		}
		if (found) btns.push(this._dataShare.buttonsAll[c1]);
	}
	for (var c in btns) {
		if (!btns.hasOwnProperty(c)) continue;
		this.elShareBtns.appendChild(btns[c].btn);
	}
	this.eventAdd(this.elShareState, "change", this.onChangeState.bind(this, this.elShareState));
	// ---translated messages on save result
	try {this._msgsOnSave[this.elShareBtnSave.id] = eval("(" + this.elShareMsgSave.innerHTML + ")");} catch (e) {};
	this.elShareMsgSave.innerHTML = "";
	this.elShareMsgSave.style.display = "inline-block";
	if (typeof this._msgsOnSave[this.elShareBtnSave.id] != "object") this._msgsOnSave[this.elShareBtnSave.id] = [];
	if (typeof this._msgsOnSave[this.elShareBtnSave.id][0] == "undefined") this._msgsOnSave[this.elShareBtnSave.id][0] = "Success!";
	if (typeof this._msgsOnSave[this.elShareBtnSave.id][1] == "undefined") this._msgsOnSave[this.elShareBtnSave.id][1] = "Error!";
	this._msgsOnSave[this.elShareBtnSave.id][2] = this.elShareMsgSave;
	this.eventAdd(this.elShareBtnSave, "click", this.onClickShareBtnSave.bind(this));
	// --tab fb
	this.eventAdd(this.elFbState, "change", this.onChangeState.bind(this, this.elFbState));
	this.eventAdd(this.elFbDisplay, "change", this.onChangeFbDisplay.bind(this));
	// ---translated messages on save result
	try {this._msgsOnSave[this.elFbBtnSave.id] = eval("(" + this.elFbMsgSave.innerHTML + ")");} catch (e) {};
	this.elFbMsgSave.innerHTML = "";
	this.elFbMsgSave.style.display = "inline-block";
	if (typeof this._msgsOnSave[this.elFbBtnSave.id] != "object") this._msgsOnSave[this.elFbBtnSave.id] = [];
	if (typeof this._msgsOnSave[this.elFbBtnSave.id][0] == "undefined") this._msgsOnSave[this.elFbBtnSave.id][0] = "Success!";
	if (typeof this._msgsOnSave[this.elFbBtnSave.id][1] == "undefined") this._msgsOnSave[this.elFbBtnSave.id][1] = "Error!";
	this._msgsOnSave[this.elFbBtnSave.id][2] = this.elFbMsgSave;
	this.eventAdd(this.elFbBtnSave, "click", this.onClickFbBtnSave.bind(this));
	// --tab vk
	this.eventAdd(this.elVkState, "change", this.onChangeState.bind(this, this.elVkState));
	this.eventAdd(this.elVkDisplay, "change", this.onChangeVkDisplay.bind(this));
	this.eventAdd(this.elVkAttach.select, "change", this.onChangeVkAttach.bind(this));
	// ---translated messages on save result
	try {this._msgsOnSave[this.elVkBtnSave.id] = eval("(" + this.elVkMsgSave.innerHTML + ")");} catch (e) {};
	this.elVkMsgSave.innerHTML = "";
	this.elVkMsgSave.style.display = "inline-block";
	if (typeof this._msgsOnSave[this.elVkBtnSave.id] != "object") this._msgsOnSave[this.elVkBtnSave.id] = [];
	if (typeof this._msgsOnSave[this.elVkBtnSave.id][0] == "undefined") this._msgsOnSave[this.elVkBtnSave.id][0] = "Success!";
	if (typeof this._msgsOnSave[this.elVkBtnSave.id][1] == "undefined") this._msgsOnSave[this.elVkBtnSave.id][1] = "Error!";
	this._msgsOnSave[this.elVkBtnSave.id][2] = this.elVkMsgSave;
	this.eventAdd(this.elVkBtnSave, "click", this.onClickVkBtnSave.bind(this));
	// --tab int
	this.eventAdd(this.elIntDisplay, "change", this.onChangeIntDisplay.bind(this));
	// ---translated messages on save result
	try {this._msgsOnSave[this.elIntBtnSave.id] = eval("(" + this.elIntMsgSave.innerHTML + ")");} catch (e) {};
	this.elIntMsgSave.innerHTML = "";
	this.elIntMsgSave.style.display = "inline-block";
	if (typeof this._msgsOnSave[this.elIntBtnSave.id] != "object") this._msgsOnSave[this.elIntBtnSave.id] = [];
	if (typeof this._msgsOnSave[this.elIntBtnSave.id][0] == "undefined") this._msgsOnSave[this.elIntBtnSave.id][0] = "Success!";
	if (typeof this._msgsOnSave[this.elIntBtnSave.id][1] == "undefined") this._msgsOnSave[this.elIntBtnSave.id][1] = "Error!";
	this._msgsOnSave[this.elIntBtnSave.id][2] = this.elIntMsgSave;
	this.eventAdd(this.elIntBtnSave, "click", this.onClickIntBtnSave.bind(this));
	// --tab sup
	// ---translated messages on save result
	try {this._msgsOnSave[this.elSupBtnSave.id] = eval("(" + this.elSupMsgSave.innerHTML + ")");} catch (e) {};
	this.elSupMsgSave.innerHTML = "";
	this.elSupMsgSave.style.display = "inline-block";
	if (typeof this._msgsOnSave[this.elSupBtnSave.id] != "object") this._msgsOnSave[this.elSupBtnSave.id] = [];
	if (typeof this._msgsOnSave[this.elSupBtnSave.id][0] == "undefined") this._msgsOnSave[this.elSupBtnSave.id][0] = "Sent!";
	if (typeof this._msgsOnSave[this.elSupBtnSave.id][1] == "undefined") this._msgsOnSave[this.elSupBtnSave.id][1] = "Error!";
	this._msgsOnSave[this.elSupBtnSave.id][2] = this.elSupMsgSave;
	this.eventAdd(this.elSupBtnSave, "click", this.onClickSupBtnSave.bind(this));
	//
	this.fOnAction = this.onAction.bind(this);
	this._inited = true;
	return true;
};
/**
* Common initer function
*/
_social_monster.prototype._initTry = function() {
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
			res = this._init((this._initData.curtry == this._initData.maxtry));
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
/**
* Trigger action functions
*/
_social_monster.prototype.actionSilentCfgFbSave = function(btn) {
	var action = this._name + "-fb-cfg-save";
	if ((typeof this._inAction[action] != "undefined") && this._inAction[action]) return false;
	var r = this.silentReqBuild(this);
	r.action = action;
	r.dataPOST[this._name + "-fb-state"] = this.elFbState.value;
	if (this.elFbState.value == "1") {
		r.dataPOST[this._name + "-fb-appid"] = this.elFbAppId.value;
		r.dataPOST[this._name + "-fb-script"] = this.elFbScript.value;
		r.dataPOST[this._name + "-fb-width"] = this.elFbWidth.value;
		r.dataPOST[this._name + "-fb-num_posts"] = this.elFbNumPosts.value;
		r.dataPOST[this._name + "-fb-colorscheme"] = this.elFbColorScheme.value;
		r.dataPOST[this._name + "-fb-order_by"] = this.elFbOrderBy.value;
		r.dataPOST[this._name + "-fb-collapse"] = this.elFbDisplay.value;
		r.dataPOST[this._name + "-fb-collapsed"] = (this.elFbCollapsed.checked ? "1" : "0");
	}
	r.dataPOST["action"] = this._name.replace("-", "_") + "_action";
	r.debug = this._debug;
	r.cbFunc = this.fOnAction;
	r.msgDisplay = false;
	r.owner_store["action-hint"] = btn.id;
	r.url = this._appRoot + "wp-admin/admin-ajax.php";
	this.silent(r);
	this._inAction[action] = true;
	return true;
};
_social_monster.prototype.actionSilentCfgGeneralSave = function(btn) {
	var action = this._name + "-general-cfg-save";
	if ((typeof this._inAction[action] != "undefined") && this._inAction[action]) return false;
	var r = this.silentReqBuild(this);
	r.action = action;
	r.dataPOST[this._name + "-template"] = this.elGenTemplate.value;
	r.dataPOST[this._name + "-cache-tm"] = this.elGenCacheTm.value;
	r.dataPOST[this._name + "-order"] = this._dataGen.order.join(",");
	r.dataPOST[this._name + "-update"] = this.elGenUpdate.value;
	r.dataPOST["action"] = this._name.replace("-", "_") + "_action";
	r.debug = this._debug;
	r.cbFunc = this.fOnAction;
	r.msgDisplay = false;
	r.owner_store["action-hint"] = btn.id;
	r.url = this._appRoot + "wp-admin/admin-ajax.php";
	this.silent(r);
	this._inAction[action] = true;
	return true;
};
_social_monster.prototype.actionSilentCfgIntSave = function(btn) {
	var action = this._name + "-int-cfg-save";
	if ((typeof this._inAction[action] != "undefined") && this._inAction[action]) return false;
	var r = this.silentReqBuild(this);
	r.action = action;
	r.dataPOST[this._name + "-int-state"] = this.elIntState.value;
	if (this.elIntState.value == "1") {
		r.dataPOST[this._name + "-int-collapse"] = this.elIntDisplay.value;
		r.dataPOST[this._name + "-int-collapsed"] = (this.elIntCollapsed.checked ? "1" : "0");
	}
	r.dataPOST["action"] = this._name.replace("-", "_") + "_action";
	r.debug = this._debug;
	r.cbFunc = this.fOnAction;
	r.msgDisplay = false;
	r.owner_store["action-hint"] = btn.id;
	r.url = this._appRoot + "wp-admin/admin-ajax.php";
	this.silent(r);
	this._inAction[action] = true;
	return true;
};
_social_monster.prototype.actionSilentCfgShareSave = function(btn) {
	var action = this._name + "-share-cfg-save";
	if ((typeof this._inAction[action] != "undefined") && this._inAction[action]) return false;
	var r = this.silentReqBuild(this);
	r.action = action;
	r.dataPOST[this._name + "-share-state"] = this.elShareState.value;
	r.dataPOST[this._name + "-share-position"] = this.elSharePosition.value;
	if (this.elShareState.value == "1") {
		var btns = [];
		var name;
		for (var c in this.elShareBtns.childNodes) {
			if (this.elShareBtns.childNodes[c].className && this.elShareBtns.childNodes[c].className.indexOf("btn") != -1) {
				name = this.elShareBtns.childNodes[c].className.replace("btn ", "");
				if (name) btns.push(name);
			}
		}
		r.dataPOST[this._name + "-share-buttons"] = (btns.length ? btns.join(",") : "");
	}
	if (this.elShareState.value == "2") {
		var v = (this.elShareHtml.value).replace(/\r\n/mg, "");
		v = v.replace(/\n/mg, "");
		v = v.replace(/\r/mg, "");
		r.dataPOST[this._name + "-share-sharethis-html"] = v;
		v = (this.elSharePublisher.value).replace(/\"/,"");
		v = v.replace(/\'/,"");
		r.dataPOST[this._name + "-share-sharethis-publisher"] = v;
		this.elSharePublisher.value = v;
	}
	r.dataPOST["action"] = this._name.replace("-", "_") + "_action";
	r.debug = this._debug;
	r.cbFunc = this.fOnAction;
	r.msgDisplay = false;
	r.owner_store["action-hint"] = btn.id;
	r.url = this._appRoot + "wp-admin/admin-ajax.php";
	this.silent(r);
	this._inAction[action] = true;
	return true;
};
_social_monster.prototype.actionSilentCfgVkSave = function(btn) {
	var action = this._name + "-vk-cfg-save";
	if ((typeof this._inAction[action] != "undefined") && this._inAction[action]) return false;
	var r = this.silentReqBuild(this);
	r.action = action;
	r.dataPOST[this._name + "-vk-state"] = this.elVkState.value;
	if (this.elVkState.value == "1") {
		r.dataPOST[this._name + "-vk-apiid"] = this.elVkApiId.value;
		r.dataPOST[this._name + "-vk-script"] = this.elVkScript.value;
		r.dataPOST[this._name + "-vk-width"] = this.elVkWidth.value;
		r.dataPOST[this._name + "-vk-height"] = this.elVkHeight.value;
		r.dataPOST[this._name + "-vk-limit"] = this.elVkLimit.value;
		if (this.elVkAttach.select.value == "*") r.dataPOST[this._name + "-vk-attach"] = "*";
		else {
			var attach = [];
			if (this.elVkAttach.audio.checked) attach.push("audio");
			if (this.elVkAttach.graffiti.checked) attach.push("graffiti");
			if (this.elVkAttach.link.checked) attach.push("link");
			if (this.elVkAttach.photo.checked) attach.push("photo");
			if (this.elVkAttach.video.checked) attach.push("video");
			if (attach.length) r.dataPOST[this._name + "-vk-attach"] = attach.join(",");
			else r.dataPOST[this._name + "-vk-attach"] = "none";
		}
		r.dataPOST[this._name + "-vk-element_id"] = this.elVkElemId.value;
		r.dataPOST[this._name + "-vk-norealtime"] = this.elVkNoRealtime.value;
		r.dataPOST[this._name + "-vk-collapse"] = this.elVkDisplay.value;
		r.dataPOST[this._name + "-vk-collapsed"] = (this.elVkCollapsed.checked ? "1" : "0");
	}
	r.dataPOST["action"] = this._name.replace("-", "_") + "_action";
	r.debug = this._debug;
	r.cbFunc = this.fOnAction;
	r.msgDisplay = false;
	r.owner_store["action-hint"] = btn.id;
	r.url = this._appRoot + "wp-admin/admin-ajax.php";
	this.silent(r);
	this._inAction[action] = true;
	return true;
};
_social_monster.prototype.actionSilentSupSend = function(btn) {
	var action = this._name + "-sup-send";
	if ((typeof this._inAction[action] != "undefined") && this._inAction[action]) return false;
	var r = this.silentReqBuild(this);
	r.action = action;
	r.dataPOST[this._name + "-sup-type"] = this.elSupType.value;
	r.dataPOST[this._name + "-sup-email"] = this.elSupEmail.value;
	r.dataPOST[this._name + "-sup-title"] = this.elSupTitle.value;
	r.dataPOST[this._name + "-sup-descr"] = this.elSupDescr.value;
	r.dataPOST["action"] = this._name.replace("-", "_") + "_action";
	r.debug = this._debug;
	r.cbFunc = this.fOnAction;
	r.msgDisplay = false;
	r.owner_store["action-hint"] = btn.id;
	r.url = this._appRoot + "wp-admin/admin-ajax.php";
	this.silent(r);
	this._inAction[action] = true;
	return true;
};
/**
* Other own functions
*/
_social_monster.prototype.console = function(msg) {
	if (this._console) console.log(msg);
};
/**
* Dialogs
*/
_social_monster.prototype.dlgAlert = function(msg, type, wd) {
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
_social_monster.prototype.dlgConfirm = function(msg, cb, title, wd) {
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
/**
* Event functions
*/
_social_monster.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
_social_monster.prototype.eventFix = function(e) {
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
_social_monster.prototype.eventPreventDefault = function(e) {
	if (typeof e == "undefined") return;
	if (e.preventDefault) {
		e.preventDefault();
		e.stopPropagation();
	} else {
		e.returnValue = false;
		e.cancelBubble = true;
	}
};
_social_monster.prototype.eventRemove = function(el, evnt, func) {
	if (el.removeEventListener) {
		el.removeEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.detachEvent("on" + evnt, func);
	} else {
		el[evnt] = null;
	}
};
/**
* Main action processor
*/
_social_monster.prototype.onAction = function(r) {
	this._inAction[r.action] = false;
	if (r.response.msg && !r.msgDisplay) this.dlgAlert(r.response.msg, "err");
	if (typeof r.owner_store["action-hint"] != "undefined") this.saveHintShow(r.owner_store["action-hint"], r.response.res);
	switch (r.action) {
		case this._name + "-sup-send":
			if (r.response.res) {
				this.elSupType.selectedIndex = 0;
				this.elSupEmail.value = "";
				this.elSupTitle.value = "";
				this.elSupDescr.value = "";
			}
			break;
	}
};
/**
* User triggered "ON.." functions
*/
_social_monster.prototype.onChangeFbDisplay = function() {
	if (this.elFbDisplay.value != "none") {
		this.elFbCollapsed.parentNode.style.visibility = "";
	} else {
		this.elFbCollapsed.parentNode.style.visibility = "hidden";
		this.elFbCollapsed.checked = false;
	}
};
_social_monster.prototype.onChangeIntDisplay = function() {
	if (this.elIntDisplay.value != "none") {
		this.elIntCollapsed.parentNode.style.visibility = "";
	} else {
		this.elIntCollapsed.parentNode.style.visibility = "hidden";
		this.elIntCollapsed.checked = false;
	}
};
_social_monster.prototype.onChangeState = function(s) {
	var slug = (s.id).replace(this._name + "-", "");
	slug = slug.replace("-state", "");
	if (typeof this._tabs[slug] == "undefined") return;
	this._tabs[slug].icon.className = "icon " + slug + (s.value == "0" ? " off" : "");
	this._tabs[slug].icon.title = (s.options[s.selectedIndex].innerHTML).charAt(0).toUpperCase() + (s.options[s.selectedIndex].innerHTML).slice(1);
	if (slug == "share") {
		var states = [];
		var state = parseInt(this.elShareState.value, 10);
		var val;
		for (var c in this.elShareState.options) {
			val = parseInt(this.elShareState.options[c].value, 10);
			if (isNaN(val)) break;
			states.push(val);
		}
		if ((!isNaN(state)) && states.length) {
			var cnt, brk, el;
			for (var c in states) {
				if (!states.hasOwnProperty(c)) continue;
				cnt = 0;
				brk = false;
				while (!brk) {
					cnt++;
					el = document.getElementById(this._name + "-" + slug + "-set" + states[c] + "-" + cnt);
					if (!el) brk = true;
					else {
						if (states[c] == state) el.style.display = "";
						else el.style.display = "none";
					}
				}
			}
		}
	}
};
_social_monster.prototype.onChangeVkAttach = function() {
	if (this.elVkAttach.select.value == "*") this.elVkAttachMore.style.display = "none";
	else this.elVkAttachMore.style.display = "";
};
_social_monster.prototype.onChangeVkDisplay = function() {
	if (this.elVkDisplay.value != "none") {
		this.elVkCollapsed.parentNode.style.visibility = "";
	} else {
		this.elVkCollapsed.parentNode.style.visibility = "hidden";
		this.elVkCollapsed.checked = false;
	}
};
_social_monster.prototype.onClickFbBtnSave = function(e) {
	if (this.actionSilentCfgFbSave((this.eventFix(e)).target) === true) {
		this.elFbMsgSave.innerHTML = "";
		this.elFbMsgSave.className = this.elFbMsgSave.className + " wait";
		return;
	} else {
		if (typeof 	this._alertsByOwner["onClickFbBtnSave"] != "undefined") {
			this.dlgAlert(this._alertsByOwner["onClickFbBtnSave"]);
		} else this._alertsByOwner["onClickFbBtnSave"] = this.dlgAlert(this._alertWait, "wrn");
	}
	this.elFbBtnSave.blur();
};
_social_monster.prototype.onClickGenBtnSave = function(e) {
	if(this.actionSilentCfgGeneralSave((this.eventFix(e)).target) === true) {
		this.elGenMsgSave.innerHTML = "";
		this.elGenMsgSave.className = this.elGenMsgSave.className + " wait";
	} else {
		if (typeof 	this._alertsByOwner["onClickGenBtnSave"] != "undefined") {
			this.dlgAlert(this._alertsByOwner["onClickGenBtnSave"]);
		} else this._alertsByOwner["onClickGenBtnSave"] = this.dlgAlert(this._alertWait, "wrn");
	}
	this.elGenBtnSave.blur();
};
_social_monster.prototype.onClickGenOrderChange = function(i) {
	var p1, sn1, sn2, el1, el2;
	if (typeof this._dataGen.order[i] == "undefined") return;
	if (typeof this._dataGen.orderTitles[i] == "undefined") return;
	sn1 = this._dataGen.order[i];
	el1 = this._dataGen.orderTitles[i];
	p1 = el1.parentNode;
	var ni;
	if (i == (this._dataGen.order.length - 1)) ni = i -1;
	else ni = i + 1;
	if (typeof this._dataGen.order[ni] == "undefined") return;
	if (typeof this._dataGen.orderTitles[ni] == "undefined") return;
	sn2 = this._dataGen.order[ni];
	el2 = this._dataGen.orderTitles[ni];
	el2.parentNode.appendChild(el1);
	p1.appendChild(el2);
	this._dataGen.order[i] = sn2;
	this._dataGen.order[ni] = sn1;
	this._dataGen.orderTitles[i] = el2;
	this._dataGen.orderTitles[ni] = el1;
};
_social_monster.prototype.onClickIntBtnSave = function(e) {
	if (this.actionSilentCfgIntSave((this.eventFix(e)).target) === true) {
		this.elIntMsgSave.innerHTML = "";
		this.elIntMsgSave.className = this.elIntMsgSave.className + " wait";
	} else {
		if (typeof 	this._alertsByOwner["onClickIntBtnSave"] != "undefined") {
			this.dlgAlert(this._alertsByOwner["onClickIntBtnSave"]);
		} else this._alertsByOwner["onClickIntBtnSave"] = this.dlgAlert(this._alertWait, "wrn");
	}
	this.elIntBtnSave.blur();
};
_social_monster.prototype.onClickShareBtn = function(btn) {
	if (btn.btn.parentNode == this.elShareBtns) {
		var i, el = false;
		for (var c in this._dataShare.buttonsAll) {
			if (!this._dataShare.buttonsAll.hasOwnProperty(c)) continue;
			if (this._dataShare.buttonsAll[c].name == btn.name) {
				var i = parseInt(c, 10);
				if (!isNaN(i)) {
					var l = this._dataShare.buttonsAll.length;
					for (var c1 = (i + 1) ; c1 < l; c1++) {
						if (i != (l - 1)) {
							if (this._dataShare.buttonsAll[c1].btn.parentNode != this.elShareBtns) {
								el = this._dataShare.buttonsAll[c1].btn;
								break;
							}
						}
					}
				}
				break;
			}
		}
		if (el) this.elShareBtnsAll.insertBefore(btn.btn, el);
		else this.elShareBtnsAll.appendChild(btn.btn);
	}
	else this.elShareBtns.appendChild(btn.btn);
};
_social_monster.prototype.onClickShareBtnSave = function(e) {
	if (this.actionSilentCfgShareSave((this.eventFix(e)).target) === true) {
		this.elShareMsgSave.innerHTML = "";
		this.elShareMsgSave.className = this.elShareMsgSave.className + " wait";
	} else {
		if (typeof 	this._alertsByOwner["onClickShareBtnSave"] != "undefined") {
			this.dlgAlert(this._alertsByOwner["onClickShareBtnSave"]);
		} else this._alertsByOwner["onClickShareBtnSave"] = this.dlgAlert(this._alertWait, "wrn");
	}
	this.elShareBtnSave.blur();
};
_social_monster.prototype.onClickSupBtnSave = function(e) {
	if (this.elSupDescr.value == "") {
		if(jQuery) {
			jQuery(this.elSupDescr).stop(true, true);
			jQuery(this.elSupDescr).animate({marginLeft: "-10px"}, 100)
			.animate({marginLeft: "10px"}, 50)
			.animate({marginLeft: "-10px"}, 50)
			.animate({marginLeft: "10"}, 50)
			.animate({marginLeft: "-10"}, 50)
			.animate({marginLeft: "10"}, 50)
			.animate({marginLeft: "0"}, 25);
		} else this.dlgAlert("Description is required.", "wrn");
	} else {
		if (this.actionSilentSupSend((this.eventFix(e)).target) === true) {
			this.elSupMsgSave.innerHTML = "";
			this.elSupMsgSave.className = this.elSupMsgSave.className + " wait";
		} else {
			if (typeof 	this._alertsByOwner["onClickSupBtnSave"] != "undefined") {
				this.dlgAlert(this._alertsByOwner["onClickSupBtnSave"]);
			} else this._alertsByOwner["onClickSupBtnSave"] = this.dlgAlert(this._alertWait, "wrn");
		}
	}
	this.elSupBtnSave.blur();
};
_social_monster.prototype.onClickTabBtn = function(tab) {
	if (tab == this._tab) return;
	this._tab.tab.style.display = "none";
	this._tab.el.parentNode.className = (this._tab.el.parentNode.className).replace(" act", "");
	this._tab = tab;
	this._tab.tab.style.display = "block";
	this._tab.el.parentNode.className = this._tab.el.parentNode.className + " act";
};
_social_monster.prototype.onClickVkBtnSave = function(e) {
	if (this.actionSilentCfgVkSave((this.eventFix(e)).target) === true) {;
		this.elVkMsgSave.innerHTML = "";
		this.elVkMsgSave.className = this.elVkMsgSave.className + " wait";
	} else {
		if (typeof 	this._alertsByOwner["onClickVkBtnSave"] != "undefined") {
			this.dlgAlert(this._alertsByOwner["onClickVkBtnSave"]);
		} else this._alertsByOwner["onClickVkBtnSave"] = this.dlgAlert(this._alertWait, "wrn");
	}
	this.elVkBtnSave.blur();
};
_social_monster.prototype.saveHintShow = function(id, res, hideTm) {
	if (typeof this._msgsOnSave[id] != "object") return;
	if (typeof this._msgsOnSave[id][2] != "object") return;
	if (typeof this._msgsOnSave[id][3] == "undefined") this._msgsOnSave[id][3] = false;
	if (typeof res != "boolean") res = true;
	if (typeof hideTm != "number") hideTm = 3000;
	var el = this._msgsOnSave[id][2];
	var msg = (res ? this._msgsOnSave[id][0] : this._msgsOnSave[id][1]);
	if (this._msgsOnSave[id][3]) {
		window.clearTimeout(this._msgsOnSave[id][3]);
		this._msgsOnSave[id][2].className = this._msgsOnSave[id][2].className.replace(" err", "");
		this._msgsOnSave[id][3] = false;
	}
	el.innerHTML = msg;
	var cl = el.className;
	el.className = cl.replace(" wait", "");
	if (!res && (el.className.indexOf(" err") == -1)) el.className = el.className + " err";
	if(jQuery) {
		jQuery(el).stop(true, true);
		jQuery(el).animate({opacity: 0}, 500).animate({opacity: 1}, 500).animate({opacity: 0}, 500).animate({opacity: 1}, 500, (function(data){
			data[3] = window.setTimeout((function(){
				data[2].innerHTML = "";
				data[3] = false;
				var cl = data[2].className;
				data[2].className = cl.replace(" err", "");
			}), hideTm);
		}).bind(this, this._msgsOnSave[id]));
	} else {
		this._msgsOnSave[id][3] = window.setTimeout((function(data){
			data[2].innerHTML = "";
			data[3] = false;
			var cl = data[2].className;
			data[2].className = cl.replace(" err", "");
		}).bind(this, this._msgsOnSave[id]), hideTm);
	}
};
_social_monster.prototype.seed = function() {
	if (typeof Math != "undefined")
		return "" + (Math.floor((Math.random()*1000000000) + 1));
	else
		return (new Date()).getTime();
};
/**
* Server config methods
*/
_social_monster.prototype.setDebug = function(on) {
	if (typeof on == "boolean") this._debug = on;
};
_social_monster.prototype.setRoot = function(root) {
	if (typeof root == "string") this._appRoot = root;
};
/**
* Silent queries subsystem
*/
_social_monster.prototype.silent = function(req) {
	req.method = req.method.toUpperCase();
	if ((req.method != "POST") && (req.method == "GET")) {
		this.console(__name_script + " > " + this._name + ".silent(): Неизвестный метод [" + req.method + "], операция прервана.");
		return false;
	}
	//проверка параметров uri
	var url;
	if ((typeof req.url != "string") || !req.url) url = document.location.href.replace("http://" + document.domain, "");
	else url = ((req.url.indexOf("http") != -1) ? req.url : (((req.url.indexOf(this._appRoot) === 0) ? "" : this._appRoot) + req.url).replace(/\/\//g, "/"));
	var query = "";
	url = url.split("?");
	if (typeof url[1] != "undefined") query = url[1];
	url = url[0];
	//полный http путь запроса
	req.url = url + (query ? ("?" + query) : "");
	//GET, POST параметры
	var merge = {silent: null};
	if (req.method == "GET") merge[this._name + "-action"] = req.action;
	req.dataGET = this.silentDataBuild(req.dataGET, merge, req.encode);
	if (req.method == "POST") {
		delete merge.silent;
		merge[this._name + "-action"] = req.action;
		req.dataPOST = this.silentDataBuild(req.dataPOST, merge, req.encode, true);
	}
	//отправка
	req.url = req.url + (req.dataGET ? ((query ? "&" : "?") + req.dataGET) : "");
	if (req.action && req.sequential) {
		var r = this.silentReqPendingFind(req.action);
		if (r) return true;
	}
	this._silentReqs.push(req);
	req.r.open(req.method, req.url, true);
	req.r.onreadystatechange = this.silentOnState.bind(this, req);
	if (req.method == "POST") req.r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.r.send(req.method == "POST" ? req.dataPOST : null);
	req.sent = true;
	return true;
};
_social_monster.prototype.silentDataBuild = function(d, merge, encode, str) {
	if (typeof merge != "object") merge = false;
	if (typeof encode != "boolean") encode = false;
	if (typeof str != "boolean") str = true;
	if (!d)	{
		if (!merge) return "";
		d = {};
	} else {
		if (typeof d == "string") {
			var pars = d.split("&");
			for (var par in pars) {
				if (!pars.hasOwnProperty(par)) continue;
				if (pars[par]) {
					var pair = pars[par].split("=");
					if (pair[0]) d[pair[0]] = ((typeof pair[1] != "undefined" && pair[1]) ? pair[1] : null);
				}
			}
		} else {
			if (typeof d != "object") d = {};
		}
	}
	if ((typeof merge == "object") && merge) {
		for (var id in merge) {
			if (!merge.hasOwnProperty(id)) continue;
			d[id] = merge[id];
		}
	}
	if (str) {
		var p = [];
		for (var id in d) {
			if (!d.hasOwnProperty(id)) continue;
			if (typeof d[id] != "string") {
				if (typeof d[id] == "boolean") d[id] = (d[id] ? "1" : "0");
				else {
					if (typeof d[id] == "number") d[id] = ("").concat(d[id]);
					else d[id] = null;
				}
			}
			if (d[id] === null) p.push(("").concat(id));
			else {
				if (encode && d[id]) d[id] = encodeURIComponent(d[id]);
				p.push(("").concat(id, "=", d[id]));
			}
		}
		return (p.join("&") || "");
	} else return d;
};
_social_monster.prototype.silentOnState = function(req) {
	if (req.done) return;//? something wrong occured
	if (req.r.readyState != 4) return;
	req.done = true;
	if (req.r.status == 200) {
		if (req.action) {
			var r = this.silentReqPendingFind(req.action);
			if (r) {
				r.r.open(r.method, r.url, true);
				r.r.onreadystatechange = this.silentOnState.bind(this, r);
				if (r.method == "POST") r.r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				r.r.send(r.method == "POST" ? r.dataPOST : null);
				r.sent = true;
			}
		}
		if (!req.needResponse || !req.json) {
			req.response = {res: true, msg: "", data: req.r.responseText};
		} else {
			try {
				req.response = eval("(" + req.r.responseText + ")");
			} catch(e) {
				req.response = {res: false};
				req.response.msg = "JSON eval error.";
				req.response.debug = {};
				req.response.debug.action = "action:" + req.action + "/key:" + req.key + "";
				req.response.debug.jsError = "JavaScript interpreter message: [" + e.name + "/" + e.message + "]";
				req.response.debug.dataRaw = req.r.responseText;
			}
			if ((typeof req.response != "object") || (req.response === null)) {
				var type = typeof req.response;
				var r = false;
				var m = "";
				switch (type) {
					case "object"://null check
						break;
					case "string":
						if ((req.response == "ok") || (req.response == "true") || (req.response == "1")) r = true;
						if (req.response == "") m = "Server returned empty answer.";
						break;
					case "boolean":
						r = req.response;
						break;
					case "number":
						r = (req.response > 0);
						break
				}
				req.response = {res: r, msg: m, data: req.r.responseText};
			}
		}
	} else {
		req.response = {res: false};
		req.response.msg = "XmlHttpRequest error.";
		req.response.debug = {};
		req.response.debug.action = "[" + req.action + ": " + req.key + "]";
		req.response.debug.responseStatus = "[" + req.r.status + "]";
	}
	if (req.debug) {
		if ((typeof req.response.debug == "object") && (req.response.debug)) {
			var cnt = 0;
			for (var c in req.response.debug) {
				if (!req.response.debug.hasOwnProperty(c)) continue;
				cnt++;
				if (cnt == 1) this.console("Debug data available:");
				this.console("[" + c + "/" + typeof req.response.debug[c] + "]: " + req.response.debug[c]);
			}
		}
	}
	if (req.response.msg) {
		if (req.msgDisplay) {
			if (req.msgDisplayWay == "popup") {
				if (this.plPu) {
					var pu = this.plPu.add({
						content: req.response.msg,
						showcloser: true,
						windowed: true
					});
					this.plPu.show(pu);
				} else alert(req.response.msg);
			} else alert(req.response.msg);
		}
	}
	if (typeof req.cbFunc == "function") {
		try {
			if (!req.cbBound) {
				if (req.owner) req.cbFunc.apply(req.owner, [req]);
				else {
					//trying exec anyway
					req.cbFunc(req);
				}
			} else req.cbFunc(req);
		} catch(e) {
			this.console(__name_script + " > " + this._name + ".silentOnState(): Callback function exec error [" + req.action + ": " + req.key + "]. Javascript Interpreter message: [" + e.name + " / " + e.message + "]");
		}
	}
	var l = this._silentReqs.length;
	if (!l) return;
	for (var c = 0; c < l; c++)
		if (this._silentReqs[c] == req) {
			delete this._silentReqs[c]["r"];
			this._silentReqs.splice(c, 1);
			break;
		}
};
_social_monster.prototype.silentReqBuild = function(o) {
	if (typeof o == "undefined") o = null;
	var req = {
		action:			"",
		cbBound:		true,
		cbFunc:			null,
		dataGET:		{},
		dataPOST:		{},
		debug:			false,
		done:			false,
		encode:			false,
		json:			true,
		key:			this.seed(),
		method:			"POST",
		msgDisplay:		true,
		msgDisplayWay:	"popup",//or alert
		needResponse:	true,
		owner: 			o,
		owner_store:	{},
		r:				this.xmlHttpGet(),
		response:		null,
		sent:			false,
		sequential:		false,
		time:			(new Date()).getTime(),
		url:			""
	};
	return req;
};
_social_monster.prototype.silentReqPendingFind = function(action) {
	if (typeof action != "string") return false;
	for (var c in this._silentReqs) {
		if (!this._silentReqs.hasOwnProperty(c)) continue;
		if ((this._silentReqs[c].action == action) && (!this._silentReqs[c].sent)) return this._silentReqs[c];
	}
	return false;
};
/**
* Init helper function
*/
_social_monster.prototype.waitElement = function(elname, prop, last, store_as_object) {
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
* Simple http request creator
*/
_social_monster.prototype.xmlHttpGet = function() {
	var r = null;
	try {
		r = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			r = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			r = false;
		}
	}
	if (!r && typeof XMLHttpRequest != "undefined") r = new XMLHttpRequest();
	else {
		this.console(__name_script + " > " + this._name + ".xmlHttpGet(): Невозможно создать объект [XmlHttpRequest]");
	}
	return r;
};

var o = new _social_monster();
thirdparty_shared.objReg(__name_social_monster, o);
return o;
})();