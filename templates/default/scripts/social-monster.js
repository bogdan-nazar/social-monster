var social_monster = function() {
	this._instances = [];
};
social_monster.prototype.newInstance = function(config) {

var __name_inst_vk = "social-monster-vk";

/*
* Wrapper object for VK Comments handling
* Extended documentation on VK Comments API see here (Russian):
* http://vk.com/developers.php?o=-1&p=%C4%EE%EA%F3%EC%E5%ED%F2%E0%F6%E8%FF+%EE+%E2%E8%E4%E6%E5%F2%E5+%EA%EE%EC%EC%E5%ED%F2%E0%F0%E8%E5%E2
*
*/
function _social_monster_vk(id) {
	this._config	=	{
		_loaded:		false,
		apiId:			"3952643",
		attach:			"*", //graffiti, photo, audio, video, link
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
};
if (typeof config != "object" || (!config)) config = {};
if (typeof config.type != "string" || (!config.type)) config.type = "vk";
var i = {};
this._instances.push(i);
i.id = i.length - 1;
switch(config.type) {
	case "vk":
		i.obj = new _social_monster_vk(i.id);
		break;
}
i.obj._init(config);
return i;
};
social_monster = new social_monster();

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