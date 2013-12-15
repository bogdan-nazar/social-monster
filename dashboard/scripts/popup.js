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

(function(){

var __name_popup = "popup";
var __name_script = "popup.js";

var self = thirdparty_shared.objGet(__name_popup);
if (self) return;
//--------------- Плагин PopUp [static] -------------------
/**
* Создание объекта всплывающего модального окна
* windowed boolean - показать рамку по умолчанию
* container elemDOM/name/string - id/имя контейнера/строка-содержание
* onclose object(function) - функция выполняемая после закрытия окна,
*			если функция возвращает false, то закрытие окна отменняется
*
* example call: var myPuId = (thirdparty_shared.objGet("popup")).add({
* 	windowed:false,
* 	content:"myPopupDivId",
* 	onclose:(function(){alert("ok");return true;})
*	showcloser:false,
* });
*
* @param object pars
*/
var _pu = function() {
	this._borderSize	=	24;
	this._console		=	((typeof console == "undefined") || (!console)) ? false : true;
	this._initData		=	{
		curtry:				0,
		maxtry:				100,
		sleep:				50
	};
	this._inited		=	false;
	this._initErr		=	false;
	this._items			=	[];
	this._name			=	__name_popup;
	this._visible		=	[];
	this.elBase			=	null;
	this.elBox			=	null;
	this.elMama			=	null;
	this.elPage			= 	null;
	this.elShade		=	null;
	this.elWin			=	null;
	this.elWin_			=	null;
	this.fInit			=	this._initTry.bind(this);
	this._initTry();
};
_pu.prototype._init = function(last) {
	if (this._inited) return true;
	if (typeof last != "boolean") last = false;
	if (!this.elPage)
		this.elPage = document.createElement("DIV");
	if (document.body) {
		document.body.appendChild(this.elPage);
	} else {
		if (last) {
			this.console(__name_script + " > " + this._name + "._init(): WTF???");
			this._initErr = true;
			this._inited = true;
			return true;
		}
		return false;
	}
	//затенение и основной контейнер
	this.elMama = document.createElement("DIV");
	this.elMama.style.display = "none";
	this.elPage.appendChild(this.elMama);
	this.elShade = document.createElement("DIV");
	this.elShade.className = "popup-shade";
	this.elShade.style.display = "none";
	this.elPage.appendChild(this.elShade);
	this.elBase = document.createElement("DIV");
	this.elBase.className = "popup";
	this.elBase.style.display = "none";
	this.elPage.appendChild(this.elBase);
	var el = document.createElement("DIV");
	el.className = "inner";
	this.elBase.appendChild(el);
	//контейнер для необрамленных поп-апов
	this.elBox = document.createElement("DIV");
	this.elBox.className = "box";
	this.elBox.style.display = "none";
	el.appendChild(this.elBox);
	//контейнер для поп-апов в виде стилизированного окна
	this.elWin_ = document.createElement("DIV");
	this.elWin_.className = "win";
	this.elWin_.style.display = "none";
	el.appendChild(this.elWin_);
	this.elWin = document.createElement("DIV");
	this.elWin.className = "rel";
	this.elWin_.appendChild(this.elWin);
	//левый верхний угол
	el = document.createElement("DIV");
	el.className = "c-tl";
	this.elWin.appendChild(el);
	//правый верхний угол
	el = document.createElement("DIV");
	el.className = "c-tr";
	this.elWin.appendChild(el);
	//правый нижний угол
	el = document.createElement("DIV");
	el.className = "c-br";
	this.elWin.appendChild(el);
	//левый нижний угол
	el = document.createElement("DIV");
	el.className = "c-bl";
	this.elWin.appendChild(el);
	//верхняя граница
	el = document.createElement("DIV");
	el.className = "l-t";
	this.elWin.appendChild(el);
	//правая граница
	el = document.createElement("DIV");
	el.className = "l-r";
	this.elWin.appendChild(el);
	//нижняя граница
	el = document.createElement("DIV");
	el.className = "l-b";
	this.elWin.appendChild(el);
	//левая граница
	el = document.createElement("DIV");
	el.className = "l-l";
	this.elWin.appendChild(el);
	this._inited = true;
	return true;
};
_pu.prototype._initTry = function() {
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
			this.console(__name_script + " > " + this._name + ".initTry(): Ошибка инициализации плагина [" + this._name + "]. Сообщение интерпретатора: [" + e.name + "/" + e.message + "].");
		}
	} else {
		res = true;
		err = true;
		this.console(__name_script + " > " + this._name + ".initTry(): Предупреждение - точка инициализации [._init] плагина [" + this._name + "] не определена или не является функцией. Плагин пропущен.");
	}
	if (res) {
		if (typeof this._inited == "undefined") this._inited = true;
		if (typeof this._initeErr == "undefined") this._initErr = err;
	} else {
		window.setTimeout(this.fInit, this._initData.sleep);
	}
};
_pu.prototype.add = function(params) {
	if (!this._inited) return -1;
	var item = {
		closer:null,
		closers:[],
		content:null,
		onclose:[],
		owner:null,
		parent:null,
		showcloser:true,
		windowed:true
	}
	if ((typeof params != "object") || (typeof params === null)) return -1;
	//проверка контента
	if (typeof params.content != "undefined" && (params.content)) {
		if (typeof params.content == "string") {
			if (!document.getElementById(params.content)) {
				item.content = document.createElement("DIV");
				item.content.innerHTML = params.content;
				this.elMama.appendChild(item.content);
				item.parent = this.elMama;
			} else {
				item.content = document.getElementById(params.content);
				if (item.content.parentNode) item.parent = item.content.parentNode;
				else item.parent = this.elMama;
			}
		} else {
			if (typeof params.content != "object") return -1;
			else {
				item.content = params.content;
				if (item.content.parentNode) item.parent = item.content.parentNode;
				else item.parent = this.elMama;
			}
		}
	}
	//проверка владельца
	if ((typeof params.owner == "object") && (params.owner))
		item.owner = params.owner;
	else
		item.owner = this;
	//проверка клоузеров
	if (typeof params.closers != "undefined") {
		if (typeof params.closers == "object") {
			if (params.closers instanceof Array) {
				var c;
				for (var i in params.closers) {
					if (!params.closers.hasOwnProperty(i)) continue;
					c = params.closers[i];
					if (typeof c == "string") {
						if (document.getElementById(c)) item.closers.push(document.getElementById(c));
					} else {
						if (typeof c == "object") item.closers.push(c);
					}
				}
			} else item.closers.push(params.closers);
		} else {
			if (typeof params.closers == "string") {
				if (document.getElementById(params.closers)) item.closers.push(document.getElementById(params.closers));
			}
		}
	}
	//проверка функции onclose
	if (typeof params.onclose != "undefined") {
		if (typeof params.onclose == "object") {
			if (params.onclose instanceof Array) {
				var c;
				for (var i in params.onclose) {
					if (!params.hasOwnProperty(i)) return;
					c = params.onclose[i];
					if (c instanceof Function) {
						item.onclose.push(c);
					} else {
						if (typeof c == "string") item.onclose.push((function(code){
							eval(code + ";");
						}).bind(item.owner, c));
					}
				}
			}
		} else {
			if (params.onclose instanceof Function) {
				item.onclose.push(params.onclose);
			}
			else {
				if (typeof params.onclose == "string") item.onclose.push((function(code){
					eval(code + ";");
				}).bind(item.owner, params.onclose));
			}

		}
	}
	//проверка кнопки закрытия
	if (typeof params.showcloser != "undefined") {
		if (typeof params.showcloser == "boolean")
			item.showcloser = params.showcloser;
	}
	//проверка опции обрамляющего окна
	if (typeof params.windowed != "undefined") {
		if (typeof params.windowed == "boolean")
			item.windowed = params.windowed;
	}
	this._items.push(item);
	var id = this._items.length - 1;
	item.funcOnClose = this.hide.bind(this, id);
	for (var i in item.closers) {
		if (!item.closers.hasOwnProperty(i)) continue;
		this.eventAdd(item.closers[i], "click", item.funcOnClose);
	}
	if (item.showcloser) {
		item.closer = document.createElement("DIV");
		item.closer.className = "close";
		var el = document.createElement("DIV");
		el.className = "btn";
		this.eventAdd(el, "click", item.funcOnClose);
		item.closer.appendChild(el);
	}
	return id;
};
_pu.prototype.console = function(msg) {
	if (this._console) console.log(msg);
};
_pu.prototype.content = function(id, content, closers) {
	//проверяем аргументы
	if (typeof this._items[id] == "undefined") return false;
	if (typeof content == "undefined") return false;
	if (!content) return false;
	var item = this._items[id];
	//отвязываем предыдущий контент и клоузеры
	if (item.content) {
		if (item.parent) item.parent.appendChild(item.content);
		if (item.closers.length) {
			for (var i in item.closers) {
				if (!closers.hasOwnProperty(i)) continue;
				this.eventRemove(item.closers[i], "click", item.funcOnClose);
			}
		}
		item.closers = [];
	}
	//привязываем новый контент
	if (typeof content == "string") {
		if (!document.getElementById(content)) {
			item.content = document.createElement("DIV");
			item.content.innerHTML = content;
			this.elMama.appendChild(item.content);
			item.parent = this.elMama;
		} else {
			item.content = document.getElementById(content);
			if (item.content.parentNode) item.parent = item.content.parentNode;
			else item.parent = this.elMama;
		}
	} else {
		if (typeof content != "object") return false;
		else {
			item.content = content;
			if (item.content.parentNode) item.parent = item.content.parentNode;
			else item.parent = this.elMama;
		}
	}
	if (typeof closers != "undefined") {
		if (typeof closers == "object") {
			if (closers instanceof Array) {
				var c;
				for (var i in closers) {
					if (!closers.hasOwnProperty(i)) continue;
					c = closers[i];
					if (typeof c == "string") {
						if (document.getElementById(c)) item.closers.push(document.getElementById(c));
					} else {
						if (typeof c == "object") item.closers.push(c);
					}
				}
			} else item.closers.push(closers);
		} else {
			if (typeof closers == "string") {
				if (document.getElementById(closers)) item.closers.push(document.getElementById(closers));
			}
		}
		for (var i in item.closers) {
			if (!item.closers.hasOwnProperty(i)) continue;
			this.eventAdd(item.closers[i], "click", item.funcOnClose);
		}
	}
	return true;
};
_pu.prototype.eventAdd = function(el, evnt, func) {
	if (el.addEventListener) {
		el.addEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evnt, func);
	} else {
		el[evnt] = func;
	}
};
_pu.prototype.eventRemove = function(el, evnt, func) {
	if (el.removeEventListener) {
		el.removeEventListener(evnt, func, false);
	} else if (el.attachEvent) {
		el.detachEvent("on" + evnt, func);
	} else {
		el[evnt] = null;
	}
};
_pu.prototype.hide = function(id) {
	var f = false;
	for (i in this._visible) {
		if (!this._visible.hasOwnProperty(i)) continue;
		if (this._visible[i] == id) {
			f = parseInt(i, 10);
			break;
		}
	}
	if (f === false) return;
	var item = this._items[this._visible[f]];
	var res = true;
	var r;
	for (var i in item.onclose) {
		if (!item.onclose.hasOwnProperty(i)) continue;
		r = false;
		try {
			r = item.onclose[i]();
		} catch(e) {
			this.console(__name_script + " > " + this._name + ".hide(): Ошибка выполнения callback-функции [itemId: " + i + "]. Сообщение интерпретатора: [" + e.name + "/" + e.message + "].");
		}
		if (typeof r == "boolean") res = res && r;
	}
	if (!res) return;
	if (item.windowed)
		this.elWin_.style.display = "none";
	else
		this.elBox.style.display = "none";
	item.parent.appendChild(item.content);
	if (item.showcloser && item.closer)
		item.content.removeChild(item.closer);
	this._visible.splice(f, 1);
	var len = this._visible.length;
	if (len) {
		item = this._items[this._visible[len - 1]];
		if (item.windowed) {
			this.elWin_.style.display = "table-cell";
			this.elWin.appendChild(item.content);
		} else {
			this.elBox.style.display = "table-cell";
			this.elBox.appendChild(item.content)
		}
		if (item.showcloser && item.closer)
			item.content.insertBefore(item.closer, item.content.childNodes[0]);
	} else {
		this.elShade.style.display = "none";
		this.elBase.style.display = "none";
	}
};
_pu.prototype.show = function(id) {
	if (typeof this._items[id] == "undefined") {
		this.console(__name_script + " > " + this._name + ".show(): Невозможно показать всплывающее окно, объект не найден [itemId: " + id + "].");
		return;
	}
	if (!this._items[id].content) {
		this.console(__name_script + " > " + this._name + ".show(): Невозможно показать всплывающее окно, контент не определен [itemId: " + id + "].");
		return;
	}
	for (i in this._visible) {
		if (!this._visible.hasOwnProperty(i)) continue;
		if (this._visible[i] == id) return;
	}
	var len = this._visible.length;
	var item;
	if (len) {
		item = this._items[this._visible[len - 1]];
		if (item.windowed)
			this.elWin_.style.display = "none";
		else
			this.elBox.style.display = "none";
		item.parent.appendChild(item.content);
		if (item.showcloser && item.closer)
			item.content.removeChild(item.closer);
	} else {
		this.elShade.style.display = "block";
		this.elBase.style.display = "block";
	}
	item = this._items[id];
	if (item.windowed) {
		this.elWin_.style.display = "table-cell";
		this.elWin.appendChild(item.content);
	} else {
		this.elBox.style.display = "table-cell";
		this.elBox.appendChild(item.content)
	}
	if (item.showcloser && item.closer)
		if (typeof item.content.childNodes[0] != "undefined")
			item.content.insertBefore(item.closer, item.content.childNodes[0]);
		else
			item.content.appendChild(item.closer);
	this._visible.push(id);
};

thirdparty_shared.objReg(__name_popup, new _pu());
})();