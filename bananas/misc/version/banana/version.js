// -*- coding: UTF-8 -*-

function compare(a, b) {
	if( a === undefined ) a = -1;
	if( b === undefined ) b = -1;
	return a == b ? 0 : a > b ? 1 : -1;
}

var r = /^(\d+(?:\.\d+)*)(?:([a-z]+)(\d+(\.\d+)*)?)?$/;
var p = ["a", "b", "rc", ""];
function versionParse(v) {
	var [, primary, type, after] = r(v);
	primary = primary.split('.').map(function(n) parseInt(n, 10));
	after = after ? after.split('.').map(function(n) parseInt(n, 10)) : [];
	if(p.indexOf(type||"") < 0) throw new TypeError;
	return {primary:primary, type:p.indexOf(type||""), after:after};
}

function versionCompare(a, b) {
	a = versionParse(a);
	b = versionParse(b);
	
	var c;
	while( a.primary.length || b.primary.length ) {
		c = compare(a.primary.shift(), b.primary.shift());
		if( c !== 0 ) return c;
	}
	
	c = compare(a.type, b.type);
	if( c !== 0 ) return c;
	
	while( a.after.length || b.after.length ) {
		c = compare(a.after.shift(), b.after.shift());
		if( c !== 0 ) return c;
	}
	
	return 0;
}

exports.versionCompare = versionCompare;
