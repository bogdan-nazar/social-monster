var social_monster = function() {
	this._instances = [];
};
social_monster.prototype.newInstance = function(id) {

function _social_monster() {
};
_social_monster.prototype._init = function() {

};

var obj = new _social_monster(id);
obj._init();
this._instances.push({"id": id, obj: new _social_monster(id)});
return obj;
};
social_monster = new social_monster();