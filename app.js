(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Main$Unknown = {$: 'Unknown'};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (flags) {
	var model = {activities: flags, application: _List_Nil, applying: false, sections: _List_Nil, selectedActivity: elm$core$Maybe$Nothing, selectedProperty: elm$core$Maybe$Nothing, status: author$project$Main$Unknown};
	return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
};
var author$project$Main$AskRubric = {$: 'AskRubric'};
var author$project$Main$NoOp = {$: 'NoOp'};
var author$project$Main$ReceiveSections = function (a) {
	return {$: 'ReceiveSections', a: a};
};
var author$project$Main$ReceiveStatus = function (a) {
	return {$: 'ReceiveStatus', a: a};
};
var author$project$Main$SelectMapProperty = function (a) {
	return {$: 'SelectMapProperty', a: a};
};
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Main$keyDecoder = A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string);
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Main$receiveSections = _Platform_incomingPort('receiveSections', elm$json$Json$Decode$value);
var author$project$Main$receiveStatus = _Platform_incomingPort('receiveStatus', elm$json$Json$Decode$value);
var author$project$Main$selectMapProperty = _Platform_incomingPort('selectMapProperty', elm$json$Json$Decode$value);
var elm$browser$Browser$Events$Document = {$: 'Document'};
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.key;
		var event = _n0.event;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onKeyPress = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'keypress');
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Main$subscriptions = function (_n0) {
	var checkKeycode = function (k) {
		return (k === 'Enter') ? author$project$Main$AskRubric : author$project$Main$NoOp;
	};
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				elm$browser$Browser$Events$onKeyPress(
				A2(elm$json$Json$Decode$map, checkKeycode, author$project$Main$keyDecoder)),
				author$project$Main$selectMapProperty(author$project$Main$SelectMapProperty),
				author$project$Main$receiveSections(author$project$Main$ReceiveSections),
				author$project$Main$receiveStatus(author$project$Main$ReceiveStatus)
			]));
};
var author$project$Main$Checkbox = F3(
	function (a, b, c) {
		return {$: 'Checkbox', a: a, b: b, c: c};
	});
var author$project$Main$Text = F2(
	function (a, b) {
		return {$: 'Text', a: a, b: b};
	});
var author$project$Main$answerDictionary = F3(
	function (activity, property, sections) {
		var propertyAnswers = function () {
			if (property.$ === 'Just') {
				var p = property.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'zone',
						A2(
							author$project$Main$Text,
							elm$core$Maybe$Just(p.zone),
							'')),
						_Utils_Tuple2(
						'area_specific_layers',
						A2(author$project$Main$Text, p.specialResidentialArea, '')),
						_Utils_Tuple2(
						'hazard_fault_line_area',
						A3(author$project$Main$Checkbox, p.hazardFaultLineArea, '', ''))
					]);
			} else {
				return _List_Nil;
			}
		}();
		var activityAnswers = function () {
			if (activity.$ === 'Just') {
				var a = activity.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'activity',
						A2(
							author$project$Main$Text,
							elm$core$Maybe$Just(a),
							''))
					]);
			} else {
				return _List_Nil;
			}
		}();
		return A2(
			elm$core$Dict$union,
			elm$core$Dict$fromList(propertyAnswers),
			A2(
				elm$core$Dict$union,
				elm$core$Dict$fromList(activityAnswers),
				elm$core$Dict$fromList(
					A2(
						elm$core$List$map,
						function (q) {
							return _Utils_Tuple2(q.key, q.input);
						},
						A3(
							elm$core$List$foldl,
							F2(
								function (s, l) {
									return _Utils_ap(s.questions, l);
								}),
							_List_Nil,
							sections)))));
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var author$project$Main$applicationAnswerDictionary = function (application) {
	return elm$core$Dict$fromList(
		A2(
			elm$core$List$map,
			function (q) {
				return _Utils_Tuple2(q.key, q.input);
			},
			A3(
				elm$core$List$foldl,
				F2(
					function (s, l) {
						return _Utils_ap(
							elm$core$List$concat(s.groups),
							l);
					}),
				_List_Nil,
				application)));
};
var author$project$Main$askRubric = _Platform_outgoingPort('askRubric', elm$core$Basics$identity);
var author$project$Main$ApplicationQuestion = F3(
	function (key, input, help) {
		return {help: help, input: input, key: key};
	});
var author$project$Main$ApplicationSection = F3(
	function (name, info, groups) {
		return {groups: groups, info: info, name: name};
	});
var author$project$Main$File = F2(
	function (a, b) {
		return {$: 'File', a: a, b: b};
	});
var author$project$Main$Multichoice = F3(
	function (a, b, c) {
		return {$: 'Multichoice', a: a, b: b, c: c};
	});
var author$project$Main$statusToString = function (status) {
	switch (status.$) {
		case 'Controlled':
			return 'Controlled';
		case 'DiscretionaryRestricted':
			return 'Discretionary Restricted';
		case 'DiscretionaryUnrestricted':
			return 'Discretionary Unrestricted';
		case 'NonCompliant':
			return 'Non-complying';
		case 'Permitted':
			return 'Permitted';
		default:
			return 'Status Unknown';
	}
};
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$h6 = _VirtualDom_node('h6');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Main$createApplication = function (model) {
	var supportingInformation = function () {
		var matters = A3(
			elm$core$List$foldl,
			F2(
				function (r, l) {
					return _Utils_ap(l, r.mattersOfDiscretion);
				}),
			_List_Nil,
			A3(
				elm$core$List$foldl,
				F2(
					function (s, l) {
						return _Utils_ap(l, s.results.rules);
					}),
				_List_Nil,
				model.sections));
		var showMatters = function () {
			if (!matters.b) {
				return _List_fromArray(
					['none']);
			} else {
				return matters;
			}
		}();
		return A3(
			author$project$Main$ApplicationSection,
			'Supporting Information',
			elm$core$Maybe$Just(
				elm$html$Html$text('\n                    To satisfy the requirement of Section 88(2) of the Resource Management Act 1991\n                    and rule 3.2.2 in the District Plan. If all of the required information is not\n                    provided we may be unable to accept your application and it will be returned to you.\n                    ')),
			_List_fromArray(
				[
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-consideration',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Matters for consideration for the Assessment of Environmental Effects'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        As determined by your answers to questions about the proposed activity in\n                                        relation to the standards in the District Plan, below are the matters for\n                                        consideration for the Assessment of Environmental Effects:\n                                        '),
												A2(
												elm$html$Html$ul,
												_List_Nil,
												A2(
													elm$core$List$map,
													function (m) {
														return A2(
															elm$html$Html$li,
															_List_Nil,
															_List_fromArray(
																[
																	elm$html$Html$text(m)
																]));
													},
													showMatters))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-aee',
						A2(author$project$Main$File, false, 'Assessment of Environmental Effects'),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                        The Assessment of Environmental Effects (AEE) is an assessment of any actual\n                        or potential effects that the activity may have on the environment, and the ways\n                        in which any adverse effects may be mitigated, as per Section 88(6) of the\n                        Resource Management Act 1991.\n                        ')))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-rma',
						A2(author$project$Main$File, false, 'Assessment against Part 2 of the RMA Matters'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                    The Assessment of Environmental Effects (AEE) is an assessment of any actual or potential effects that the activity may have on the environment,\n                                    and the ways in which any adverse effects may be mitigated, as per Section 88(6) of the Resource Management Act 1991. See the guidance below for\n                                    further details.\n                                    ')
											])),
										A2(
										elm$html$Html$h6,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('Guidance')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        The comprehensiveness of your AEE should be proportional to the scale and significance of the actual and potential effects of your proposed activity.\n                                        Information provided, should, as a minimum provide enough information for the Council to evaluate the potential effects on individual parties as well\n                                        as the wider environment.\n                                        ')
											])),
										A2(
										elm$html$Html$p,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('font-weight-bold')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('The process of identifying and assessing effects')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('If the District Plan has not identified the specific effects to be considered (matters for discretion) then you will need to assess all of the\n                                        effects related to your proposal. The effects to be considered will depend on the type of the application and the nature of the activity proposed.\n                                        The Quality Planning website (https://www.qualityplanning.org.nz/index.php/node/836) has useful information that may be helpful in preparing your\n                                        assessment of effects.\n                                        ')
											])),
										A2(
										elm$html$Html$p,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('font-weight-bold')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Permitted Baseline')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        The Permitted baseline is a term that has developed through case law and relates to the point of comparison in assessing environmental effects\n                                        when you propose to do something on your land that is allowed as of right, or without resource consent. Put simply, the Council has the discretion\n                                        to consider only those effects generate over and above those that are permitted. You may wish to undertake an assessment of a permitted baseline\n                                        in support of your proposal however as noted above the discretion as to whether the permitted baseline is accepted or not is up to the Council Officers.\n                                        ')
											])),
										A2(
										elm$html$Html$p,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('font-weight-bold')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('What to include in your AEE')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        You may wish to include the following, noting that it is not an exhaustive list and other matters may also need to be considered: \n                                        ')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Affected Parties: List any parties you consider may be affected and identify those who have given their written approval')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Assessment of Environmental Effects (In this section you must outline all the adverse effects your proposal is likely to create (such as but not limited to)'),
														A2(
														elm$html$Html$ul,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Residential Amenity (shading, bulk and location, loss of privacy)')
																	])),
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Residential Character (Streetscape)')
																	])),
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Visual impact')
																	])),
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Traffic (where applicable)')
																	])),
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Landscape')
																	])),
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Earthworks')
																	])),
																A2(
																elm$html$Html$li,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Other')
																	]))
															]))
													]))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-planning-docs',
						A2(author$project$Main$File, false, 'Assessment against Relevant Objectives and Policies and Provisions of other Planning Documents'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                    Assess the consistency of the effects of your proposal against objectives and policies from\n                                    the District Plan AND against any relevant planning documents in section 104(1)(b) of the\n                                    Resource Management Act 1991. See the guidance below for further details.\n                                    ')
											])),
										A2(
										elm$html$Html$h6,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('Guidance')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        Assess the consistency of the effects of your proposal against the below objectives and policies from the District Plan. \n                                        Note that this is an indicative list of relevant policies; applicants should check all policies for relevance to a particular consent application.\n                                        ')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('See the following sections of '),
												A2(
												elm$html$Html$a,
												_List_fromArray(
													[
														elm$html$Html$Attributes$href('https://wellington.govt.nz/~/media/your-council/plans-policies-and-bylaws/district-plan/volume01/files/v1chap04.pdf?la=en')
													]),
												_List_fromArray(
													[
														elm$html$Html$text('Chapter 4 of the District Plan')
													]))
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        4.3.2.2, 4.2.1.2, 4.2.1.3, 4.2.1.4, 4.2.1.5, 4.2.1.6, 4.2.2.1, 4.2.2.2, 4.2.3.1, 4.2.3.2, 4.2.3.3, 4.2.3.5, 4.2.3.7, 4.2.4.1, 4.2.4.2,\n                                        4.2.4.3, 4.2.2.4, 4.2.8.3, 4.2.8.4, 4.2.10.2, 4.2.10.3, 4.2.12.1, 4.2.12.2, 4.2.12.4, 4.2.12.5, 4.2.13.1, 4.2.13.2, 4.2.13.3\n                                        ')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('And assess against any relevant planning documents in section 104(1)(b) of the Resource Management Act 1991, including, but not limited to:')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('National Policy Statements')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('National Environmental Standards and other regulations')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('The New Zealand Coastal Policy Statement')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Wellington Regional Policy Statement')
													]))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-title-records',
						A2(author$project$Main$File, false, 'Current copies of all Records of Title for the Subject Site'),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                        A \'current\' record of title is one that has been issued by Land Information New Zealand within the last 3 months,\n                        including any relevant consent notice(s) registered on the computer register, or any encumbrances or any other registered\n                        instruments, such as right of way documents, esplanade instruments, etc.\n                        ')))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-plan-scale',
						A3(
							author$project$Main$Multichoice,
							elm$core$Maybe$Nothing,
							'Site Plan Scale',
							_List_fromArray(
								['1:100', '1:200', 'Other'])),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                            Site plans must be drawn at a 1:100 or 1:200 metric scale where possible, or to such a scale to show sufficient detail of the proposal to enable\n                            Council to determine its effects. If the plans are larger than A3 size copies reduced to A3 must also be provided. The site plans must show, a\n                            north point accurately orientated, a unique plan number and title describing the proposal and the site.\n                            ')))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-plan-existing-detail',
						A2(author$project$Main$File, false, 'Site Plan Existing Detail'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('The site plan must detail where relevant the existing situation including:')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('details of hazardous areas (for example uncompacted filling or flood prone areas)')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[levels and contours of the]  topography (noting significant landforms natural features [and identified ridgelines and hilltops]  )')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[gradients of existing slopes (angle)]')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[banks, walls or steep slopes on the site, or on adjoining sites, that may be relevant to an assessment of earthworks stability]')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[drainage and underground services]')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('water bodies and catchment orientation')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('vegetation (including that located on adjacent road reserve or surrounding properties) and/or habitats of indigenous fauna')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('all certificate of title boundaries')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('road frontages')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('existing buildings (indicating those to be retained)')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('buildings on adjacent sites')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[all the features and information must be shown in relation to the boundaries if the site, and the boundaries of other sites where it is relevant to understanding the proposal.')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('the location of any high voltage transmission lines')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('streams, wetland and water bodies located within the site and/or streams, wetlands and waterbodies located outside the site where these are within 20 horizontal metres of the proposed development in the Rural Area or 5 horizontal metres in all other Areas.')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('The location of any NZHPT Registered items or recorded archaeological sites and/or Wellington City Council listed heritage items or sites of significance to Maori')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Streams, wetland and water bodies located within the site.]')
													]))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-plan-proposed-detail',
						A2(author$project$Main$File, false, 'Site Plan Proposed Detail'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('The applicant must provide a site plan detailing where relevant the proposed development including:')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('design of earthworks and final levels and contours of the site')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[gradients of earthwork slopes')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('drainage and underground services]')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('layout and location of proposed structures and buildings or alterations to existing structures and buildings')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('location of proposed activities, vehicle parking, servicing, circulation and manoeuvring, pedestrian and vehicular access')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('floor plans')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('calculation of site coverage')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[a landscaping plan that outlines]   all landscape design, site planting and fencing.')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[all the features and information must be shown in relation to the boundaries of the site, and the boundaries of other sites where it is relevant to understanding the proposal]')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[details of assessed ground levels for the purposes of calculating maximum building mass for the site. The plan must show those corners that were used to calculate the assessed ground level. Where assessed ground levels have been determined from corners that have been fixed by survey, the accuracy of this information must be certified by a licensed surveyor.')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('calculations demonstrating compliance with the maximum building volume')
													]))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-elevation-drawings',
						A2(author$project$Main$File, false, 'Elevation Drawings'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('The applicant must provide, where relevant, elevation drawings [and cross sections], numbered and drawn to a metric scale of generally 1:100 or such')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[gradients of existing and proposed slopes and the location of any associated structures')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('drainage and underground services relevant to earthworks and associated structures]')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('relationship of buildings to existing and finished ground levels')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('extent of compliance with relevant plan rules including solar access and maximum building height')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('elevations from the street showing the relationship of proposed structures to structures on adjacent sites, including the location of existing private outdoor spaces and main living area windows (where these have outlook over the development).')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('[all the features and information must be shown in relation to the boundaries of the site, and the boundaries of other sites where it is relevant to understanding of the proposal.')
													]))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-other-info',
						A2(author$project$Main$File, false, 'Other Information which may be required by the District Plan'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('Including:')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Design statement where design guides apply (multi-units, Central Area buildings, character areas, etc)')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Wind report for Central Are buildings above 18.6 metres')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Noise report')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Traffic report')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Other')
													]))
											]))
									]))))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'supporting-info-party-approval',
						A2(author$project$Main$File, false, 'Written Approvals from Affected Parties'),
						elm$core$Maybe$Just(
							A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('\n                                        Letter or neighbours approval form dated and signed by the affected parties AND their signature and the date on the plans submitted with this application.\n                                        Please note conditional written approval cannot be accepted. \n                                        ')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('You can use the ')
											])),
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												elm$html$Html$Attributes$href('https://wellington.govt.nz/~/media/services/consents-and-licenses/resource-consents/files/application-forms/written approval.pdf')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('written approval form')
											])),
										A2(
										elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('Where effects are generated on neighbouring properties it is encouraged that neighbour approval is sought. Providing neighbour approval can be beneficial for several reasons')
											])),
										A2(
										elm$html$Html$ul,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Can reduce costs and delays later on')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Creates goodwill by alerting people who may be affected by your proposal')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Create efficiencies in not requiring Council to ask for the approvals later through the process')
													])),
												A2(
												elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('The effects on those properties in which written approval has been provided can be disregarded. This can save both time and cost in not only the preparation of the AEE but also the extent of time Council Planners spend in assessing your application. ')
													]))
											]))
									]))))
					])
				]));
	}();
	var siteVisit = A3(
		author$project$Main$ApplicationSection,
		'Site Visit',
		elm$core$Maybe$Just(
			elm$html$Html$text('\n                In order to assess your application it will generally be necessary for the Council Planner to visit your site.\n                This typically involves an outdoor inspection only, and there is no need for you to be home for this purpose.\n                ')),
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'site-visit-security',
					A3(
						author$project$Main$Multichoice,
						elm$core$Maybe$Nothing,
						'Are there any locked gates, security systems or anything else restricting access by Council?',
						_List_fromArray(
							['Yes', 'No'])),
					elm$core$Maybe$Nothing),
					A3(
					author$project$Main$ApplicationQuestion,
					'site-visit-dogs',
					A3(
						author$project$Main$Multichoice,
						elm$core$Maybe$Nothing,
						'Are there any dogs on the property?',
						_List_fromArray(
							['Yes', 'No'])),
					elm$core$Maybe$Nothing),
					A3(
					author$project$Main$ApplicationQuestion,
					'site-visit-notice',
					A3(
						author$project$Main$Multichoice,
						elm$core$Maybe$Nothing,
						'Do you require notice prior to the site visit?',
						_List_fromArray(
							['Yes', 'No'])),
					elm$core$Maybe$Nothing)
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'site-visit-safety',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Are there any other Health and Safety requirements Council staff should be aware of before visiting the site. If so, please describe.'),
					elm$core$Maybe$Nothing)
				])
			]));
	var propertyInformation = function () {
		var zone = A2(
			elm$core$Maybe$map,
			function ($) {
				return $.zone;
			},
			model.selectedProperty);
		var wufi = A2(
			elm$core$Maybe$map,
			elm$core$String$fromInt,
			A2(
				elm$core$Maybe$map,
				function ($) {
					return $.valuationWufi;
				},
				model.selectedProperty));
		var image = A2(
			elm$core$Maybe$map,
			function ($) {
				return $.imageUrl;
			},
			model.selectedProperty);
		var address = A2(
			elm$core$Maybe$map,
			function ($) {
				return $.fullAddress;
			},
			model.selectedProperty);
		return A3(
			author$project$Main$ApplicationSection,
			'Property Information',
			elm$core$Maybe$Nothing,
			_List_fromArray(
				[
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-image',
						A2(author$project$Main$Text, image, 'Image'),
						elm$core$Maybe$Nothing),
						A3(
						author$project$Main$ApplicationQuestion,
						'property-address',
						A2(author$project$Main$Text, address, 'Address'),
						elm$core$Maybe$Nothing),
						A3(
						author$project$Main$ApplicationQuestion,
						'property-wufi',
						A2(author$project$Main$Text, wufi, 'WUFI'),
						elm$core$Maybe$Nothing),
						A3(
						author$project$Main$ApplicationQuestion,
						'property-zone',
						A2(author$project$Main$Text, zone, 'Zone'),
						elm$core$Maybe$Nothing)
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-legal-description',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Legal Description of the Site for this Application'),
						elm$core$Maybe$Nothing)
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-aka',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Any Other Commonly Known Names of the Site'),
						elm$core$Maybe$Nothing)
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-description',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Site Description'),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                        Describe the site including its natural and physical characteristics and any adjacent\n                        uses that may be relevant to the consideration of the application.\n                        ')))
					])
				]));
	}();
	var personalDetailQuestions = function (key) {
		return _List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					key + '-fname',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'First Name'),
					elm$core$Maybe$Nothing),
					A3(
					author$project$Main$ApplicationQuestion,
					key + '-lname',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Last Name'),
					elm$core$Maybe$Nothing)
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					key + '-address',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Postal Address'),
					elm$core$Maybe$Nothing),
					A3(
					author$project$Main$ApplicationQuestion,
					key + '-phone',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Phone (day)'),
					elm$core$Maybe$Nothing)
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					key + '-mobile',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Mobile'),
					elm$core$Maybe$Nothing),
					A3(
					author$project$Main$ApplicationQuestion,
					key + '-email',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'E-mail'),
					elm$core$Maybe$Nothing)
				])
			]);
	};
	var ownerDetails = A3(
		author$project$Main$ApplicationSection,
		'Owner Details',
		elm$core$Maybe$Nothing,
		personalDetailQuestions('owner'));
	var otherResourceConsents = A3(
		author$project$Main$ApplicationSection,
		'Other Resource Consents',
		elm$core$Maybe$Nothing,
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'other-consents',
					A3(
						author$project$Main$Multichoice,
						elm$core$Maybe$Nothing,
						'Are there any other resource consents required/granted from any consent authority for this activity?',
						_List_fromArray(
							['Yes', 'No'])),
					elm$core$Maybe$Just(
						elm$html$Html$text('\n                        Applicant to check with Greater Wellington Regional Council to confirm this.\n                        ')))
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'other-consents-details',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Detail of other resource consents required'),
					elm$core$Maybe$Just(
						elm$html$Html$text('\n                        A statement specifying all other resource consents that the applicant may require\n                        from any consent authority in respect of the activity to which the application relates,\n                        and whether or not the applicant has applied for such consents.\n                        ')))
				])
			]));
	var occupierDetails = A3(
		author$project$Main$ApplicationSection,
		'Occupier Details',
		elm$core$Maybe$Nothing,
		personalDetailQuestions('occupier'));
	var nationalEnvironmentalStandard = A3(
		author$project$Main$ApplicationSection,
		'National Environmental Standard',
		elm$core$Maybe$Just(
			A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('\n                            This site may be subject to or covered by the the NES for Assessing and Managing Contaminants\n                            in Soil to Protect Human Health Regulations 2011. This is determined by reference to the Hazardous\n                            Activities and Industries List (HAIL) which identifies those activities and industries which are\n                            more likely to use or store hazardous substances and therefore have a greater probability of site\n                            contamination. A full list can be found on the \n                            '),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href('https://www.mfe.govt.nz/land/hazardous-activities-and-industries-list-hail')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Ministry for the Environment\'s website')
							])),
						elm$html$Html$text('.')
					]))),
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'nes-hail',
					A3(
						author$project$Main$Multichoice,
						elm$core$Maybe$Nothing,
						'Has the piece of land subject to this application been used for (including its present use), or is it more likely than not to have been used for an activity on the Hazardous Activities and Industries List (HAIL)?',
						_List_fromArray(
							['Yes', 'No'])),
					elm$core$Maybe$Just(
						elm$html$Html$text('\n                        If \'Yes\', and your application involves subdividing or changing the use of the land, sampling\n                        or disturbing soil, or removing or replacing a fuel storage system, then the NES may apply and\n                        you may need to seek consent for this concurrently in your application.\n                        ')))
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'nes-assessment',
					A2(author$project$Main$File, false, 'Assessment against the NES'),
					elm$core$Maybe$Nothing)
				])
			]));
	var fees = A3(
		author$project$Main$ApplicationSection,
		'Fees',
		elm$core$Maybe$Just(
			elm$html$Html$text('\n                An initial fee must be paid before we can process your application.\n                The initial fee due for this non-notified land use consent is: $1650\n                ')),
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'fees-method',
					A3(
						author$project$Main$Multichoice,
						elm$core$Maybe$Nothing,
						'Payment Method',
						_List_fromArray(
							['Internet Banking', 'Online (Credit Card)', 'By Phone (Credit Card)'])),
					elm$core$Maybe$Just(
						A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Internet Banking')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('The Council\'s bank account number is 06 0582 0106111 00. Use \'RC\' followed by the site address as a reference.')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Online')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href('https://wellington.govt.nz/do-it-online/pay-online')
												]),
											_List_fromArray(
												[
													elm$html$Html$text('Pay online')
												])),
											elm$html$Html$text(' using your credit card by selecting \'Property\' from the dropdown box and following the instructions.')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('By phone')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('You can pay over the phone with your credit card. Phone the Council on 04 801 3718')
										]))
								]))))
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'fees-declaration',
					A3(author$project$Main$Checkbox, false, 'Declaration for Initial Fee', 'I agree with these terms'),
					elm$core$Maybe$Just(
						A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        I confirm that I have read and understood the fee payment terms, conditions and\n                                        declaration for the service of applying for a resource consent [link to guidance\n                                        on text \'fee payment terms, conditions and declaration\']\n                                        ')
										])),
									A2(
									elm$html$Html$h6,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Guidance')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Fee payment terms, conditions and declaration')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        I understand that the Council may invoice me for the actual and reasonable costs incurred to process this application\n                                        - as identified in Section 36 of the Resource Management Act and the Council\'s current fee schedule.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Additional fees')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        If the Council spend time processing requests or incur expenses the Council needs to invoice additional fees.\n                                        This may happen during processing or once a decision on your application is made. The Council only charge amounts over $65.\n                                        Likewise, refunds will only be made for unused amounts over $65.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Council payment terms')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        Additional fees are due by the 20th of the month following an invoice. If payment is not received, you will be liable for all legal and collection fees.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Declaration')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        This declaration must be made by the person or entity responsible for paying the application processing costs.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        Subject to my rights under Section 357B and 358 of the Resource Management Act to object to any costs, I undertake to pay all costs associated with this application.\n                                        I also agree to pay all the costs (including debt collection or legal fees) of recovering any unpaid costs\n                                        ')
										]))
								]))))
				])
			]));
	var descriptionOfProposedActivity = A3(
		author$project$Main$ApplicationSection,
		'Description of Proposed Activity',
		elm$core$Maybe$Nothing,
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'activity-description',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Description of Activity'),
					elm$core$Maybe$Just(
						elm$html$Html$text('\n                        Clearly describe the proposal to which this application relates.\n                        ')))
				])
			]));
	var declarationOnBehalf = A3(
		author$project$Main$ApplicationSection,
		'Declaration for the Agent Authorised to Sign on Behalf of the Applicant',
		elm$core$Maybe$Nothing,
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'authorised-declaration-name',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Full Name of Agent'),
					elm$core$Maybe$Nothing)
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'authorised-declaration-declaration',
					A3(author$project$Main$Checkbox, false, 'Declaration for Agent', 'I agree with these terms'),
					elm$core$Maybe$Just(
						A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('I confirm that I have read and understood the notes for the applicant.')
										])),
									A2(
									elm$html$Html$h6,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Guidance')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Notes for the applicant')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        Incomplete applications will be returned. The Council may also request further information under Section 92 of the Resource Management Act 1991,\n                                        to better understand the potential effects of the proposal.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Once this application is lodged with the Council, it becomes public information. If there is sensitive information in the proposal, please let us know.')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        The Council may require a registered surveyor to certify contours, natural ground level, building site(s) or structure(s),\n                                        location of boundaries or any other feature which may affect this proposal.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Fast-track Application')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        Under the fast-track resource consent process, notice of the decision must be given within 10 working days after the date the application was\n                                        first lodged with the authority, unless the applicant opts out of that process at the time of lodgement. \n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('A fast-track application may cease to be a fast-track application under Section 87AAC(2) of the Resource Management Act 1991.')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Privacy Information')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        The information you have provided on this form is required so that your application can be processed under the Resource Management Act 1991, and so that statistics can be collected by the Council. The information will be stored on a public register and held by the Council.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Under the Privacy Act 1993, you have the right to see and correct personal information.')
										]))
								]))))
				])
			]));
	var declaration = A3(
		author$project$Main$ApplicationSection,
		'Declaration for the Agent of Authorised Agent or Other',
		elm$core$Maybe$Nothing,
		_List_fromArray(
			[
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'application-name',
					A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Name of the Person Submitting this Form'),
					elm$core$Maybe$Nothing)
				]),
				_List_fromArray(
				[
					A3(
					author$project$Main$ApplicationQuestion,
					'declaration-declaration',
					A3(author$project$Main$Checkbox, false, 'Declaration', 'I agree with these terms'),
					elm$core$Maybe$Just(
						A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('I confirm that I have read and understood the notes for the applicant.')
										])),
									A2(
									elm$html$Html$h6,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Guidance')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Notes for the applicant')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        Incomplete applications will be returned. The Council may also request further information under Section 92 of the Resource Management Act 1991,\n                                        to better understand the potential effects of the proposal.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Once this application is lodged with the Council, it becomes public information. If there is sensitive information in the proposal, please let us know.')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        The Council may require a registered surveyor to certify contours, natural ground level, building site(s) or structure(s),\n                                        location of boundaries or any other feature which may affect this proposal.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Fast-track Application')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        Under the fast-track resource consent process, notice of the decision must be given within 10 working days after the date the application was\n                                        first lodged with the authority, unless the applicant opts out of that process at the time of lodgement. \n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('A fast-track application may cease to be a fast-track application under Section 87AAC(2) of the Resource Management Act 1991.')
										])),
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Privacy Information')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('\n                                        The information you have provided on this form is required so that your application can be processed under the Resource Management Act 1991, and so that statistics can be collected by the Council. The information will be stored on a public register and held by the Council.\n                                        ')
										])),
									A2(
									elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Under the Privacy Act 1993, you have the right to see and correct personal information.')
										]))
								]))))
				])
			]));
	var consentType = function () {
		var overallActivityStatus = author$project$Main$statusToString(model.status);
		return A3(
			author$project$Main$ApplicationSection,
			'Consent Type',
			elm$core$Maybe$Nothing,
			_List_fromArray(
				[
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'consent-type',
						A2(
							author$project$Main$Text,
							elm$core$Maybe$Just('Land Use'),
							'Consent Type'),
						elm$core$Maybe$Nothing),
						A3(
						author$project$Main$ApplicationQuestion,
						'consent-type-activity',
						A2(author$project$Main$Text, model.selectedActivity, 'Proposed Activity'),
						elm$core$Maybe$Nothing)
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'consent-type-activity-status',
						A2(
							author$project$Main$Text,
							elm$core$Maybe$Just(overallActivityStatus),
							'Overall Activity Status'),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                        This status is indicative only, and must be verified by a Council Planner.\n                        ')))
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'consent-type-fast-track',
						A3(
							author$project$Main$Multichoice,
							elm$core$Maybe$Nothing,
							'Fast-track Consent',
							_List_fromArray(
								['I opt out', 'I do not opt out'])),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                        I opt out / do not opt out of the fast track consent process\n                        ')))
					])
				]));
	}();
	var applicantDetails = A3(
		author$project$Main$ApplicationSection,
		'Applicant Details',
		elm$core$Maybe$Nothing,
		personalDetailQuestions('applicant'));
	var agentDetails = A3(
		author$project$Main$ApplicationSection,
		'Agent Details',
		elm$core$Maybe$Nothing,
		personalDetailQuestions('agent'));
	var additionalInvoices = A3(
		author$project$Main$ApplicationSection,
		'Additional Invoices',
		elm$core$Maybe$Nothing,
		_Utils_ap(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'additional-invoices-send',
						A3(
							author$project$Main$Multichoice,
							elm$core$Maybe$Nothing,
							'Send All Invoices',
							_List_fromArray(
								['To Applicant', 'To Agent', 'Other'])),
						elm$core$Maybe$Nothing)
					])
				]),
			personalDetailQuestions('additional-invoices')));
	return _List_fromArray(
		[propertyInformation, consentType, applicantDetails, agentDetails, ownerDetails, occupierDetails, descriptionOfProposedActivity, otherResourceConsents, supportingInformation, nationalEnvironmentalStandard, siteVisit, declaration, declarationOnBehalf, fees, additionalInvoices]);
};
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm$json$Json$Decode$fail(
						elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm$json$Json$Decode$andThen, handleResult, elm$json$Json$Decode$value);
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm$json$Json$Decode$field, key, elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Main$Property = function (fullAddress) {
	return function (streetNumber) {
		return function (streetName) {
			return function (suburb) {
				return function (postCode) {
					return function (title) {
						return function (valuationId) {
							return function (valuationWufi) {
								return function (zone) {
									return function (specialResidentialArea) {
										return function (hazardFaultLineArea) {
											return function (imageUrl) {
												return {fullAddress: fullAddress, hazardFaultLineArea: hazardFaultLineArea, imageUrl: imageUrl, postCode: postCode, specialResidentialArea: specialResidentialArea, streetName: streetName, streetNumber: streetNumber, suburb: suburb, title: title, valuationId: valuationId, valuationWufi: valuationWufi, zone: zone};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var author$project$Main$decodeBoolFromEmpty = A2(
	elm$json$Json$Decode$andThen,
	function (bool) {
		if (bool === '') {
			return elm$json$Json$Decode$succeed(false);
		} else {
			return elm$json$Json$Decode$succeed(true);
		}
	},
	elm$json$Json$Decode$string);
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Main$decodeProperty = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'imageUrl',
	elm$json$Json$Decode$string,
	A4(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'hazardFaultLineArea',
		author$project$Main$decodeBoolFromEmpty,
		false,
		A4(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'specialResidentialArea',
			elm$json$Json$Decode$maybe(elm$json$Json$Decode$string),
			elm$core$Maybe$Nothing,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'zone',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'valuationWufi',
					elm$json$Json$Decode$int,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'valuationId',
						elm$json$Json$Decode$string,
						A4(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'title',
							elm$json$Json$Decode$string,
							'No Associated Title',
							A3(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'postCode',
								elm$json$Json$Decode$string,
								A3(
									NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'suburb',
									elm$json$Json$Decode$string,
									A3(
										NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'streetName',
										elm$json$Json$Decode$string,
										A3(
											NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'streetNumber',
											elm$json$Json$Decode$string,
											A3(
												NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'fullAddress',
												elm$json$Json$Decode$string,
												elm$json$Json$Decode$succeed(author$project$Main$Property)))))))))))));
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$hardcoded = A2(elm$core$Basics$composeR, elm$json$Json$Decode$succeed, NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom);
var author$project$Main$Section = F8(
	function (key, description, name, section, questions, results, status, open) {
		return {description: description, key: key, name: name, open: open, questions: questions, results: results, section: section, status: status};
	});
var author$project$Main$Question = F4(
	function (key, input, unit, prerequisites) {
		return {input: input, key: key, prerequisites: prerequisites, unit: unit};
	});
var author$project$Main$Number = F2(
	function (a, b) {
		return {$: 'Number', a: a, b: b};
	});
var elm$json$Json$Decode$nullable = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder)
			]));
};
var author$project$Main$decodeBool = A2(
	elm$json$Json$Decode$andThen,
	function (bool) {
		if ((bool.$ === 'Just') && (bool.a === 'true')) {
			return elm$json$Json$Decode$succeed(true);
		} else {
			return elm$json$Json$Decode$succeed(false);
		}
	},
	elm$json$Json$Decode$nullable(elm$json$Json$Decode$string));
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Main$matchInput = function (format) {
	switch (format) {
		case 'text':
			return A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'prompt',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'previousAnswer',
					elm$json$Json$Decode$nullable(elm$json$Json$Decode$string),
					elm$json$Json$Decode$succeed(author$project$Main$Text)));
		case 'number':
			return A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'prompt',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'previousAnswer',
					elm$json$Json$Decode$nullable(elm$json$Json$Decode$float),
					elm$json$Json$Decode$succeed(author$project$Main$Number)));
		case 'multichoice':
			return A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'options',
				elm$json$Json$Decode$list(elm$json$Json$Decode$string),
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'prompt',
					elm$json$Json$Decode$string,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'previousAnswer',
						elm$json$Json$Decode$nullable(elm$json$Json$Decode$string),
						elm$json$Json$Decode$succeed(author$project$Main$Multichoice))));
		case 'file':
			return A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'prompt',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'previousAnswer',
					author$project$Main$decodeBool,
					elm$json$Json$Decode$succeed(author$project$Main$File)));
		default:
			return elm$json$Json$Decode$fail('Invalid format: ' + format);
	}
};
var author$project$Main$decodeInput = A2(
	elm$json$Json$Decode$andThen,
	author$project$Main$matchInput,
	A2(elm$json$Json$Decode$field, 'format', elm$json$Json$Decode$string));
var author$project$Main$Prerequisite = F3(
	function (field, operator, value) {
		return {field: field, operator: operator, value: value};
	});
var author$project$Main$decodePrerequisite = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'value',
	elm$json$Json$Decode$string,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'operator',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'field',
			elm$json$Json$Decode$string,
			elm$json$Json$Decode$succeed(author$project$Main$Prerequisite))));
var author$project$Main$decodeQuestion = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'prerequisites',
	elm$json$Json$Decode$list(author$project$Main$decodePrerequisite),
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'unit',
		elm$json$Json$Decode$nullable(elm$json$Json$Decode$string),
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'input',
			author$project$Main$decodeInput,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'key',
				elm$json$Json$Decode$string,
				elm$json$Json$Decode$succeed(author$project$Main$Question)))));
var author$project$Main$Results = F3(
	function (status, rules, standards) {
		return {rules: rules, standards: standards, status: status};
	});
var author$project$Main$Rule = F8(
	function (key, mattersOfDiscretion, activityStatus, status, report, conditions, title, definition) {
		return {activityStatus: activityStatus, conditions: conditions, definition: definition, key: key, mattersOfDiscretion: mattersOfDiscretion, report: report, status: status, title: title};
	});
var author$project$Main$Condition = F6(
	function (key, activityStatus, status, report, title, definition) {
		return {activityStatus: activityStatus, definition: definition, key: key, report: report, status: status, title: title};
	});
var author$project$Main$Controlled = {$: 'Controlled'};
var author$project$Main$DiscretionaryRestricted = {$: 'DiscretionaryRestricted'};
var author$project$Main$DiscretionaryUnrestricted = {$: 'DiscretionaryUnrestricted'};
var author$project$Main$NonCompliant = {$: 'NonCompliant'};
var author$project$Main$Permitted = {$: 'Permitted'};
var author$project$Main$decodeStatus = A2(
	elm$json$Json$Decode$andThen,
	function (status) {
		_n0$5:
		while (true) {
			if (status.$ === 'Just') {
				switch (status.a) {
					case 'Controlled':
						return elm$json$Json$Decode$succeed(author$project$Main$Controlled);
					case 'Discretionary Restricted':
						return elm$json$Json$Decode$succeed(author$project$Main$DiscretionaryRestricted);
					case 'Discretionary Unrestricted':
						return elm$json$Json$Decode$succeed(author$project$Main$DiscretionaryUnrestricted);
					case 'Non-complying':
						return elm$json$Json$Decode$succeed(author$project$Main$NonCompliant);
					case 'Permitted':
						return elm$json$Json$Decode$succeed(author$project$Main$Permitted);
					default:
						break _n0$5;
				}
			} else {
				break _n0$5;
			}
		}
		return elm$json$Json$Decode$succeed(author$project$Main$Unknown);
	},
	elm$json$Json$Decode$nullable(elm$json$Json$Decode$string));
var author$project$Main$decodeCondition = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'definition',
	elm$json$Json$Decode$nullable(elm$json$Json$Decode$string),
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'title',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'report',
			elm$json$Json$Decode$string,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'status',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'activityStatus',
					author$project$Main$decodeStatus,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'key',
						elm$json$Json$Decode$string,
						elm$json$Json$Decode$succeed(author$project$Main$Condition)))))));
var author$project$Main$decodeRule = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'definition',
	elm$json$Json$Decode$nullable(elm$json$Json$Decode$string),
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'title',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'conditions',
			elm$json$Json$Decode$list(author$project$Main$decodeCondition),
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'report',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'status',
					elm$json$Json$Decode$string,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'activityStatus',
						author$project$Main$decodeStatus,
						A3(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'matters_of_discretion',
							elm$json$Json$Decode$list(elm$json$Json$Decode$string),
							A3(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'key',
								elm$json$Json$Decode$string,
								elm$json$Json$Decode$succeed(author$project$Main$Rule)))))))));
var author$project$Main$Standard = F7(
	function (key, engineRule, status, report, value, title, definition) {
		return {definition: definition, engineRule: engineRule, key: key, report: report, status: status, title: title, value: value};
	});
var author$project$Main$decodeStandard = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'definition',
	elm$json$Json$Decode$nullable(elm$json$Json$Decode$string),
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'title',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'value',
			elm$json$Json$Decode$string,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'report',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'status',
					elm$json$Json$Decode$string,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'engine_rule',
						elm$json$Json$Decode$string,
						A3(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'key',
							elm$json$Json$Decode$string,
							elm$json$Json$Decode$succeed(author$project$Main$Standard))))))));
var author$project$Main$decodeResults = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'standards',
	elm$json$Json$Decode$list(author$project$Main$decodeStandard),
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'rules',
		elm$json$Json$Decode$list(author$project$Main$decodeRule),
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'activityStatus',
			author$project$Main$decodeStatus,
			elm$json$Json$Decode$succeed(author$project$Main$Results))));
var author$project$Main$decodeSection = A2(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$hardcoded,
	false,
	A4(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'activityStatus',
		author$project$Main$decodeStatus,
		author$project$Main$Unknown,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'results',
			author$project$Main$decodeResults,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'questions',
				elm$json$Json$Decode$list(author$project$Main$decodeQuestion),
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'section',
					elm$json$Json$Decode$string,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'name',
						elm$json$Json$Decode$string,
						A3(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'description',
							elm$json$Json$Decode$string,
							A3(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'key',
								elm$json$Json$Decode$string,
								elm$json$Json$Decode$succeed(author$project$Main$Section)))))))));
var author$project$Main$decodeSections = elm$json$Json$Decode$list(author$project$Main$decodeSection);
var author$project$Main$getInputQuestion = function (input) {
	switch (input.$) {
		case 'Text':
			var prompt = input.b;
			return prompt;
		case 'Number':
			var prompt = input.b;
			return prompt;
		case 'Multichoice':
			var prompt = input.b;
			return prompt;
		case 'File':
			var prompt = input.b;
			return prompt;
		default:
			var prompt = input.b;
			return prompt;
	}
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$float = _Json_wrap;
var elm$json$Json$Encode$null = _Json_encodeNull;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Main$encodeAnswersReadable = function (answers) {
	var encodeMaybe = function (encoder) {
		return A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(encoder),
			elm$core$Maybe$withDefault(elm$json$Json$Encode$null));
	};
	var getInputAnswer = function (i) {
		switch (i.$) {
			case 'Text':
				var a = i.a;
				return A2(encodeMaybe, elm$json$Json$Encode$string, a);
			case 'Number':
				var a = i.a;
				return A2(encodeMaybe, elm$json$Json$Encode$float, a);
			case 'Multichoice':
				var a = i.a;
				return A2(encodeMaybe, elm$json$Json$Encode$string, a);
			case 'File':
				var a = i.a;
				return elm$json$Json$Encode$bool(a);
			default:
				var a = i.a;
				return elm$json$Json$Encode$bool(a);
		}
	};
	var encodeAnswer = F3(
		function (key, input, l) {
			return _Utils_ap(
				l,
				_List_fromArray(
					[
						_Utils_Tuple2(
						author$project$Main$getInputQuestion(input),
						getInputAnswer(input))
					]));
		});
	return elm$json$Json$Encode$object(
		A3(elm$core$Dict$foldl, encodeAnswer, _List_Nil, answers));
};
var elm$json$Json$Encode$int = _Json_wrap;
var author$project$Main$encodeProposal = F2(
	function (a, p) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'activity',
					elm$json$Json$Encode$string(a)),
					_Utils_Tuple2(
					'address',
					elm$json$Json$Encode$string(p.fullAddress)),
					_Utils_Tuple2(
					'valuation_wufi',
					elm$json$Json$Encode$int(p.valuationWufi)),
					_Utils_Tuple2(
					'zone',
					elm$json$Json$Encode$string(p.zone)),
					_Utils_Tuple2(
					'area_specific_layers',
					elm$json$Json$Encode$string(
						A2(elm$core$Maybe$withDefault, '', p.specialResidentialArea))),
					_Utils_Tuple2(
					'hazard_fault_line_area',
					elm$json$Json$Encode$bool(p.hazardFaultLineArea))
				]));
	});
var author$project$Main$encodePDF = F4(
	function (activity, property, answers, applicationAnswers) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'proposal',
					A2(author$project$Main$encodeProposal, activity, property)),
					_Utils_Tuple2(
					'answers',
					author$project$Main$encodeAnswersReadable(answers)),
					_Utils_Tuple2(
					'application',
					author$project$Main$encodeAnswersReadable(applicationAnswers))
				]));
	});
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var author$project$Main$encodeAnswers = function (answers) {
	var encodeMaybe = function (encoder) {
		return A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(encoder),
			elm$core$Maybe$withDefault(elm$json$Json$Encode$null));
	};
	var getInputAnswer = function (i) {
		switch (i.$) {
			case 'Text':
				var a = i.a;
				return A2(encodeMaybe, elm$json$Json$Encode$string, a);
			case 'Number':
				var a = i.a;
				return A2(encodeMaybe, elm$json$Json$Encode$float, a);
			case 'Multichoice':
				var a = i.a;
				return A2(encodeMaybe, elm$json$Json$Encode$string, a);
			case 'File':
				var a = i.a;
				return elm$json$Json$Encode$bool(a);
			default:
				var a = i.a;
				return elm$json$Json$Encode$bool(a);
		}
	};
	var encodeAnswer = F2(
		function (_n0, input) {
			return getInputAnswer(input);
		});
	return elm$json$Json$Encode$object(
		elm$core$Dict$toList(
			A2(elm$core$Dict$map, encodeAnswer, answers)));
};
var author$project$Main$encodePayload = F3(
	function (activity, property, answers) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'scenario',
					A2(author$project$Main$encodeProposal, activity, property)),
					_Utils_Tuple2(
					'answers',
					author$project$Main$encodeAnswers(answers))
				]));
	});
var author$project$Main$generatePDF = _Platform_outgoingPort('generatePDF', elm$core$Basics$identity);
var author$project$Main$boolFromString = function (s) {
	if (s === 'true') {
		return true;
	} else {
		return false;
	}
};
var elm$core$String$toFloat = _String_toFloat;
var author$project$Main$updateInput = F2(
	function (input, answer) {
		switch (input.$) {
			case 'Text':
				var p = input.b;
				return A2(
					author$project$Main$Text,
					elm$core$Maybe$Just(answer),
					p);
			case 'Number':
				var p = input.b;
				return A2(
					author$project$Main$Number,
					elm$core$String$toFloat(answer),
					p);
			case 'Multichoice':
				var p = input.b;
				var ops = input.c;
				return A3(
					author$project$Main$Multichoice,
					elm$core$Maybe$Just(answer),
					p,
					ops);
			case 'File':
				var p = input.b;
				return A2(
					author$project$Main$File,
					author$project$Main$boolFromString(answer),
					p);
			default:
				var p = input.b;
				var s = input.c;
				return A3(
					author$project$Main$Checkbox,
					author$project$Main$boolFromString(answer),
					p,
					s);
		}
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$Debug$log = _Debug_log;
var elm_community$list_extra$List$Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			elm$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'SelectActivity':
				var activity = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedActivity: elm$core$Maybe$Just(activity)
						}),
					elm$core$Platform$Cmd$none);
			case 'SelectMapProperty':
				var propertyValue = msg.a;
				var _n1 = A2(elm$json$Json$Decode$decodeValue, author$project$Main$decodeProperty, propertyValue);
				if (_n1.$ === 'Ok') {
					var p = _n1.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								selectedProperty: elm$core$Maybe$Just(p)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = _n1.a;
					var debug = A2(
						elm$core$Debug$log,
						'Error decoding section: ',
						elm$json$Json$Decode$errorToString(err));
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'ReceiveSections':
				var val = msg.a;
				var _n2 = A2(elm$json$Json$Decode$decodeValue, author$project$Main$decodeSections, val);
				if (_n2.$ === 'Ok') {
					var s = _n2.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{sections: s}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = _n2.a;
					var debug = A2(
						elm$core$Debug$log,
						'Error decoding section: ',
						elm$json$Json$Decode$errorToString(err));
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'ReceiveStatus':
				var val = msg.a;
				var _n3 = A2(elm$json$Json$Decode$decodeValue, author$project$Main$decodeStatus, val);
				if (_n3.$ === 'Ok') {
					var s = _n3.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{status: s}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = _n3.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputAnswer':
				var section = msg.a;
				var question = msg.b;
				var answer = msg.c;
				var updateQuestion = function (q) {
					return _Utils_update(
						q,
						{
							input: A2(author$project$Main$updateInput, q.input, answer)
						});
				};
				var updateSection = function (s) {
					return _Utils_update(
						s,
						{
							questions: A3(
								elm_community$list_extra$List$Extra$updateIf,
								function (q) {
									return _Utils_eq(q.key, question.key);
								},
								updateQuestion,
								s.questions)
						});
				};
				var newSections = A3(
					elm_community$list_extra$List$Extra$updateIf,
					function (s) {
						return _Utils_eq(s.key, section.key);
					},
					updateSection,
					model.sections);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sections: newSections}),
					elm$core$Platform$Cmd$none);
			case 'InputApplicationAnswer':
				var section = msg.a;
				var question = msg.b;
				var answer = msg.c;
				var updateQuestion = function (q) {
					return _Utils_update(
						q,
						{
							input: A2(author$project$Main$updateInput, q.input, answer)
						});
				};
				var updateGroup = function (g) {
					return A3(
						elm_community$list_extra$List$Extra$updateIf,
						function (q) {
							return _Utils_eq(q.key, question.key);
						},
						updateQuestion,
						g);
				};
				var updateSection = function (s) {
					return _Utils_update(
						s,
						{
							groups: A2(elm$core$List$map, updateGroup, s.groups)
						});
				};
				var newApplication = A3(
					elm_community$list_extra$List$Extra$updateIf,
					function (s) {
						return _Utils_eq(s.name, section.name);
					},
					updateSection,
					model.application);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{application: newApplication}),
					elm$core$Platform$Cmd$none);
			case 'ToggleSection':
				var section = msg.a;
				var updateSection = function (s) {
					return _Utils_update(
						s,
						{open: !s.open});
				};
				var newSections = A3(
					elm_community$list_extra$List$Extra$updateIf,
					function (s) {
						return _Utils_eq(s.key, section.key);
					},
					updateSection,
					model.sections);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sections: newSections}),
					elm$core$Platform$Cmd$none);
			case 'AskRubric':
				var _n4 = _Utils_Tuple2(model.selectedActivity, model.selectedProperty);
				if ((_n4.a.$ === 'Just') && (_n4.b.$ === 'Just')) {
					var a = _n4.a.a;
					var p = _n4.b.a;
					return _Utils_Tuple2(
						model,
						author$project$Main$askRubric(
							A3(
								author$project$Main$encodePayload,
								a,
								p,
								A3(author$project$Main$answerDictionary, model.selectedActivity, model.selectedProperty, model.sections))));
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'ToggleApplication':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							application: author$project$Main$createApplication(model),
							applying: !model.applying
						}),
					elm$core$Platform$Cmd$none);
			default:
				var _n5 = _Utils_Tuple2(model.selectedActivity, model.selectedProperty);
				if ((_n5.a.$ === 'Just') && (_n5.b.$ === 'Just')) {
					var a = _n5.a.a;
					var p = _n5.b.a;
					return _Utils_Tuple2(
						model,
						author$project$Main$generatePDF(
							A4(
								author$project$Main$encodePDF,
								a,
								p,
								A3(author$project$Main$answerDictionary, model.selectedActivity, model.selectedProperty, model.sections),
								author$project$Main$applicationAnswerDictionary(model.application))));
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
		}
	});
var author$project$Main$ToggleApplication = {$: 'ToggleApplication'};
var author$project$Main$GeneratePDF = {$: 'GeneratePDF'};
var author$project$Main$InputApplicationAnswer = F3(
	function (a, b, c) {
		return {$: 'InputApplicationAnswer', a: a, b: b, c: c};
	});
var author$project$Main$boolToString = function (b) {
	if (b) {
		return 'true';
	} else {
		return 'false';
	}
};
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$checked = elm$html$Html$Attributes$boolProperty('checked');
var elm$html$Html$Attributes$for = elm$html$Html$Attributes$stringProperty('htmlFor');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Main$checkboxInput = F6(
	function (message, _switch, key, prompt, statement, help) {
		var helpDiv = function () {
			if (help.$ === 'Just') {
				var h = help.a;
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('small text-muted mb-2')
						]),
					_List_fromArray(
						[h]));
			} else {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(prompt)
						])),
					helpDiv,
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('form-check')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$input,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id(key),
									elm$html$Html$Attributes$class('form-check-input'),
									elm$html$Html$Attributes$type_('checkbox'),
									elm$html$Html$Attributes$checked(_switch),
									elm$html$Html$Events$onClick(
									message(
										author$project$Main$boolToString(!_switch)))
								]),
							_List_Nil),
							A2(
							elm$html$Html$label,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('form-check-label'),
									elm$html$Html$Attributes$for(key)
								]),
							_List_fromArray(
								[
									elm$html$Html$text(statement)
								]))
						]))
				]));
	});
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Main$multichoiceInput = F6(
	function (message, answer, key, prompt, options, help) {
		var radioButton = function (o) {
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('form-check form-check-inline')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('radio'),
								elm$html$Html$Attributes$value(o),
								elm$html$Html$Attributes$id(
								_Utils_ap(key, o)),
								elm$html$Html$Attributes$class('form-check-input'),
								elm$html$Html$Events$onInput(message),
								elm$html$Html$Attributes$checked(
								_Utils_eq(
									answer,
									elm$core$Maybe$Just(o)))
							]),
						_List_Nil),
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for(
								_Utils_ap(key, o)),
								elm$html$Html$Attributes$class('form-check-label')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(o)
							]))
					]));
		};
		var helpDiv = function () {
			if (help.$ === 'Just') {
				var h = help.a;
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('small text-muted mb-2')
						]),
					_List_fromArray(
						[h]));
			} else {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(prompt)
						])),
					helpDiv,
					A2(
					elm$html$Html$div,
					_List_Nil,
					A2(elm$core$List$map, radioButton, options))
				]));
	});
var elm$html$Html$span = _VirtualDom_node('span');
var author$project$Main$numberInput = F5(
	function (message, answer, key, prompt, unit) {
		var appendUnit = function () {
			if (unit.$ === 'Just') {
				var u = unit.a;
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('input-group-append')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('input-group-text')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(u)
								]))
						]));
			} else {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$for(key)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(prompt)
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('input-group')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$input,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id(key),
									elm$html$Html$Attributes$class('form-control'),
									elm$html$Html$Attributes$type_('number'),
									elm$html$Html$Attributes$value(answer),
									elm$html$Html$Events$onInput(message)
								]),
							_List_Nil),
							appendUnit
						]))
				]));
	});
var author$project$Main$textInput = F5(
	function (message, answer, key, prompt, help) {
		var helpDiv = function () {
			if (help.$ === 'Just') {
				var h = help.a;
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('small text-muted mb-2')
						]),
					_List_fromArray(
						[h]));
			} else {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$for(key),
							elm$html$Html$Attributes$class('mb-0')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(prompt)
						])),
					helpDiv,
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id(key),
							elm$html$Html$Attributes$class('form-control'),
							elm$html$Html$Attributes$type_('text'),
							elm$html$Html$Attributes$value(answer),
							elm$html$Html$Events$onInput(message)
						]),
					_List_Nil)
				]));
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convert = F2(
	function (convertChars, string) {
		return elm$core$String$concat(
			A2(
				elm$core$List$map,
				elm$core$String$fromChar,
				convertChars(
					elm$core$String$toList(string))));
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$String$fromList = _String_fromList;
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convertCode = F5(
	function (mayber, lister, pre, post, list) {
		var string = elm$core$String$fromList(list);
		var maybe = mayber(string);
		if (maybe.$ === 'Nothing') {
			return elm$core$List$concat(
				_List_fromArray(
					[pre, list, post]));
		} else {
			var something = maybe.a;
			return lister(something);
		}
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Char$fromCode = _Char_fromCode;
var marcosh$elm_html_to_unicode$ElmEscapeHtml$friendlyConverterDictionary = elm$core$Dict$fromList(
	A2(
		elm$core$List$map,
		function (_n0) {
			var a = _n0.a;
			var b = _n0.b;
			return _Utils_Tuple2(
				a,
				elm$core$Char$fromCode(b));
		},
		_List_fromArray(
			[
				_Utils_Tuple2('quot', 34),
				_Utils_Tuple2('amp', 38),
				_Utils_Tuple2('lt', 60),
				_Utils_Tuple2('gt', 62),
				_Utils_Tuple2('nbsp', 160),
				_Utils_Tuple2('iexcl', 161),
				_Utils_Tuple2('cent', 162),
				_Utils_Tuple2('pound', 163),
				_Utils_Tuple2('curren', 164),
				_Utils_Tuple2('yen', 165),
				_Utils_Tuple2('brvbar', 166),
				_Utils_Tuple2('sect', 167),
				_Utils_Tuple2('uml', 168),
				_Utils_Tuple2('copy', 169),
				_Utils_Tuple2('ordf', 170),
				_Utils_Tuple2('laquo', 171),
				_Utils_Tuple2('not', 172),
				_Utils_Tuple2('shy', 173),
				_Utils_Tuple2('reg', 174),
				_Utils_Tuple2('macr', 175),
				_Utils_Tuple2('deg', 176),
				_Utils_Tuple2('plusmn', 177),
				_Utils_Tuple2('sup2', 178),
				_Utils_Tuple2('sup3', 179),
				_Utils_Tuple2('acute', 180),
				_Utils_Tuple2('micro', 181),
				_Utils_Tuple2('para', 182),
				_Utils_Tuple2('middot', 183),
				_Utils_Tuple2('cedil', 184),
				_Utils_Tuple2('sup1', 185),
				_Utils_Tuple2('ordm', 186),
				_Utils_Tuple2('raquo', 187),
				_Utils_Tuple2('frac14', 188),
				_Utils_Tuple2('frac12', 189),
				_Utils_Tuple2('frac34', 190),
				_Utils_Tuple2('iquest', 191),
				_Utils_Tuple2('Agrave', 192),
				_Utils_Tuple2('Aacute', 193),
				_Utils_Tuple2('Acirc', 194),
				_Utils_Tuple2('Atilde', 195),
				_Utils_Tuple2('Auml', 196),
				_Utils_Tuple2('Aring', 197),
				_Utils_Tuple2('AElig', 198),
				_Utils_Tuple2('Ccedil', 199),
				_Utils_Tuple2('Egrave', 200),
				_Utils_Tuple2('Eacute', 201),
				_Utils_Tuple2('Ecirc', 202),
				_Utils_Tuple2('Euml', 203),
				_Utils_Tuple2('Igrave', 204),
				_Utils_Tuple2('Iacute', 205),
				_Utils_Tuple2('Icirc', 206),
				_Utils_Tuple2('Iuml', 207),
				_Utils_Tuple2('ETH', 208),
				_Utils_Tuple2('Ntilde', 209),
				_Utils_Tuple2('Ograve', 210),
				_Utils_Tuple2('Oacute', 211),
				_Utils_Tuple2('Ocirc', 212),
				_Utils_Tuple2('Otilde', 213),
				_Utils_Tuple2('Ouml', 214),
				_Utils_Tuple2('times', 215),
				_Utils_Tuple2('Oslash', 216),
				_Utils_Tuple2('Ugrave', 217),
				_Utils_Tuple2('Uacute', 218),
				_Utils_Tuple2('Ucirc', 219),
				_Utils_Tuple2('Uuml', 220),
				_Utils_Tuple2('Yacute', 221),
				_Utils_Tuple2('THORN', 222),
				_Utils_Tuple2('szlig', 223),
				_Utils_Tuple2('agrave', 224),
				_Utils_Tuple2('aacute', 225),
				_Utils_Tuple2('acirc', 226),
				_Utils_Tuple2('atilde', 227),
				_Utils_Tuple2('auml', 228),
				_Utils_Tuple2('aring', 229),
				_Utils_Tuple2('aelig', 230),
				_Utils_Tuple2('ccedil', 231),
				_Utils_Tuple2('egrave', 232),
				_Utils_Tuple2('eacute', 233),
				_Utils_Tuple2('ecirc', 234),
				_Utils_Tuple2('euml', 235),
				_Utils_Tuple2('igrave', 236),
				_Utils_Tuple2('iacute', 237),
				_Utils_Tuple2('icirc', 238),
				_Utils_Tuple2('iuml', 239),
				_Utils_Tuple2('eth', 240),
				_Utils_Tuple2('ntilde', 241),
				_Utils_Tuple2('ograve', 242),
				_Utils_Tuple2('oacute', 243),
				_Utils_Tuple2('ocirc', 244),
				_Utils_Tuple2('otilde', 245),
				_Utils_Tuple2('ouml', 246),
				_Utils_Tuple2('divide', 247),
				_Utils_Tuple2('oslash', 248),
				_Utils_Tuple2('ugrave', 249),
				_Utils_Tuple2('uacute', 250),
				_Utils_Tuple2('ucirc', 251),
				_Utils_Tuple2('uuml', 252),
				_Utils_Tuple2('yacute', 253),
				_Utils_Tuple2('thorn', 254),
				_Utils_Tuple2('yuml', 255),
				_Utils_Tuple2('Amacr', 256),
				_Utils_Tuple2('amacr', 257),
				_Utils_Tuple2('Abreve', 258),
				_Utils_Tuple2('abreve', 259),
				_Utils_Tuple2('Aogon', 260),
				_Utils_Tuple2('aogon', 261),
				_Utils_Tuple2('Cacute', 262),
				_Utils_Tuple2('cacute', 263),
				_Utils_Tuple2('Ccirc', 264),
				_Utils_Tuple2('ccirc', 265),
				_Utils_Tuple2('Cdod', 266),
				_Utils_Tuple2('cdot', 267),
				_Utils_Tuple2('Ccaron', 268),
				_Utils_Tuple2('ccaron', 269),
				_Utils_Tuple2('Dcaron', 270),
				_Utils_Tuple2('dcaron', 271),
				_Utils_Tuple2('Dstork', 272),
				_Utils_Tuple2('dstork', 273),
				_Utils_Tuple2('Emacr', 274),
				_Utils_Tuple2('emacr', 275),
				_Utils_Tuple2('Edot', 278),
				_Utils_Tuple2('edot', 279),
				_Utils_Tuple2('Eogon', 280),
				_Utils_Tuple2('eogon', 281),
				_Utils_Tuple2('Ecaron', 282),
				_Utils_Tuple2('ecaron', 283),
				_Utils_Tuple2('Gcirc', 284),
				_Utils_Tuple2('gcirc', 285),
				_Utils_Tuple2('Gbreve', 286),
				_Utils_Tuple2('gbreve', 287),
				_Utils_Tuple2('Gdot', 288),
				_Utils_Tuple2('gdot', 289),
				_Utils_Tuple2('Gcedil', 290),
				_Utils_Tuple2('gcedil', 291),
				_Utils_Tuple2('Hcirc', 292),
				_Utils_Tuple2('hcirc', 293),
				_Utils_Tuple2('Hstork', 294),
				_Utils_Tuple2('hstork', 295),
				_Utils_Tuple2('Itilde', 296),
				_Utils_Tuple2('itilde', 297),
				_Utils_Tuple2('Imacr', 298),
				_Utils_Tuple2('imacr', 299),
				_Utils_Tuple2('Iogon', 302),
				_Utils_Tuple2('iogon', 303),
				_Utils_Tuple2('Idot', 304),
				_Utils_Tuple2('inodot', 305),
				_Utils_Tuple2('IJlog', 306),
				_Utils_Tuple2('ijlig', 307),
				_Utils_Tuple2('Jcirc', 308),
				_Utils_Tuple2('jcirc', 309),
				_Utils_Tuple2('Kcedil', 310),
				_Utils_Tuple2('kcedil', 311),
				_Utils_Tuple2('kgreen', 312),
				_Utils_Tuple2('Lacute', 313),
				_Utils_Tuple2('lacute', 314),
				_Utils_Tuple2('Lcedil', 315),
				_Utils_Tuple2('lcedil', 316),
				_Utils_Tuple2('Lcaron', 317),
				_Utils_Tuple2('lcaron', 318),
				_Utils_Tuple2('Lmodot', 319),
				_Utils_Tuple2('lmidot', 320),
				_Utils_Tuple2('Lstork', 321),
				_Utils_Tuple2('lstork', 322),
				_Utils_Tuple2('Nacute', 323),
				_Utils_Tuple2('nacute', 324),
				_Utils_Tuple2('Ncedil', 325),
				_Utils_Tuple2('ncedil', 326),
				_Utils_Tuple2('Ncaron', 327),
				_Utils_Tuple2('ncaron', 328),
				_Utils_Tuple2('napos', 329),
				_Utils_Tuple2('ENG', 330),
				_Utils_Tuple2('eng', 331),
				_Utils_Tuple2('Omacr', 332),
				_Utils_Tuple2('omacr', 333),
				_Utils_Tuple2('Odblac', 336),
				_Utils_Tuple2('odblac', 337),
				_Utils_Tuple2('OEling', 338),
				_Utils_Tuple2('oelig', 339),
				_Utils_Tuple2('Racute', 340),
				_Utils_Tuple2('racute', 341),
				_Utils_Tuple2('Rcedil', 342),
				_Utils_Tuple2('rcedil', 343),
				_Utils_Tuple2('Rcaron', 344),
				_Utils_Tuple2('rcaron', 345),
				_Utils_Tuple2('Sacute', 346),
				_Utils_Tuple2('sacute', 347),
				_Utils_Tuple2('Scirc', 348),
				_Utils_Tuple2('scirc', 349),
				_Utils_Tuple2('Scedil', 350),
				_Utils_Tuple2('scedil', 351),
				_Utils_Tuple2('Scaron', 352),
				_Utils_Tuple2('scaron', 353),
				_Utils_Tuple2('Tcedil', 354),
				_Utils_Tuple2('tcedil', 355),
				_Utils_Tuple2('Tcaron', 356),
				_Utils_Tuple2('tcaron', 357),
				_Utils_Tuple2('Tstork', 358),
				_Utils_Tuple2('tstork', 359),
				_Utils_Tuple2('Utilde', 360),
				_Utils_Tuple2('utilde', 361),
				_Utils_Tuple2('Umacr', 362),
				_Utils_Tuple2('umacr', 363),
				_Utils_Tuple2('Ubreve', 364),
				_Utils_Tuple2('ubreve', 365),
				_Utils_Tuple2('Uring', 366),
				_Utils_Tuple2('uring', 367),
				_Utils_Tuple2('Udblac', 368),
				_Utils_Tuple2('udblac', 369),
				_Utils_Tuple2('Uogon', 370),
				_Utils_Tuple2('uogon', 371),
				_Utils_Tuple2('Wcirc', 372),
				_Utils_Tuple2('wcirc', 373),
				_Utils_Tuple2('Ycirc', 374),
				_Utils_Tuple2('ycirc', 375),
				_Utils_Tuple2('Yuml', 376),
				_Utils_Tuple2('Zacute', 377),
				_Utils_Tuple2('zacute', 378),
				_Utils_Tuple2('Zdot', 379),
				_Utils_Tuple2('zdot', 380),
				_Utils_Tuple2('Zcaron', 381),
				_Utils_Tuple2('zcaron', 382),
				_Utils_Tuple2('fnof', 402),
				_Utils_Tuple2('imped', 437),
				_Utils_Tuple2('gacute', 501),
				_Utils_Tuple2('jmath', 567),
				_Utils_Tuple2('circ', 710),
				_Utils_Tuple2('tilde', 732),
				_Utils_Tuple2('Alpha', 913),
				_Utils_Tuple2('Beta', 914),
				_Utils_Tuple2('Gamma', 915),
				_Utils_Tuple2('Delta', 916),
				_Utils_Tuple2('Epsilon', 917),
				_Utils_Tuple2('Zeta', 918),
				_Utils_Tuple2('Eta', 919),
				_Utils_Tuple2('Theta', 920),
				_Utils_Tuple2('Iota', 921),
				_Utils_Tuple2('Kappa', 922),
				_Utils_Tuple2('Lambda', 923),
				_Utils_Tuple2('Mu', 924),
				_Utils_Tuple2('Nu', 925),
				_Utils_Tuple2('Xi', 926),
				_Utils_Tuple2('Omicron', 927),
				_Utils_Tuple2('Pi', 928),
				_Utils_Tuple2('Rho', 929),
				_Utils_Tuple2('Sigma', 931),
				_Utils_Tuple2('Tau', 932),
				_Utils_Tuple2('Upsilon', 933),
				_Utils_Tuple2('Phi', 934),
				_Utils_Tuple2('Chi', 935),
				_Utils_Tuple2('Psi', 936),
				_Utils_Tuple2('Omega', 937),
				_Utils_Tuple2('alpha', 945),
				_Utils_Tuple2('beta', 946),
				_Utils_Tuple2('gamma', 947),
				_Utils_Tuple2('delta', 948),
				_Utils_Tuple2('epsilon', 949),
				_Utils_Tuple2('zeta', 950),
				_Utils_Tuple2('eta', 951),
				_Utils_Tuple2('theta', 952),
				_Utils_Tuple2('iota', 953),
				_Utils_Tuple2('kappa', 954),
				_Utils_Tuple2('lambda', 955),
				_Utils_Tuple2('mu', 956),
				_Utils_Tuple2('nu', 957),
				_Utils_Tuple2('xi', 958),
				_Utils_Tuple2('omicron', 959),
				_Utils_Tuple2('pi', 960),
				_Utils_Tuple2('rho', 961),
				_Utils_Tuple2('sigmaf', 962),
				_Utils_Tuple2('sigma', 963),
				_Utils_Tuple2('tau', 934),
				_Utils_Tuple2('upsilon', 965),
				_Utils_Tuple2('phi', 966),
				_Utils_Tuple2('chi', 967),
				_Utils_Tuple2('psi', 968),
				_Utils_Tuple2('omega', 969),
				_Utils_Tuple2('thetasym', 977),
				_Utils_Tuple2('upsih', 978),
				_Utils_Tuple2('straightphi', 981),
				_Utils_Tuple2('piv', 982),
				_Utils_Tuple2('Gammad', 988),
				_Utils_Tuple2('gammad', 989),
				_Utils_Tuple2('varkappa', 1008),
				_Utils_Tuple2('varrho', 1009),
				_Utils_Tuple2('straightepsilon', 1013),
				_Utils_Tuple2('backepsilon', 1014),
				_Utils_Tuple2('ensp', 8194),
				_Utils_Tuple2('emsp', 8195),
				_Utils_Tuple2('thinsp', 8201),
				_Utils_Tuple2('zwnj', 8204),
				_Utils_Tuple2('zwj', 8205),
				_Utils_Tuple2('lrm', 8206),
				_Utils_Tuple2('rlm', 8207),
				_Utils_Tuple2('ndash', 8211),
				_Utils_Tuple2('mdash', 8212),
				_Utils_Tuple2('lsquo', 8216),
				_Utils_Tuple2('rsquo', 8217),
				_Utils_Tuple2('sbquo', 8218),
				_Utils_Tuple2('ldquo', 8220),
				_Utils_Tuple2('rdquo', 8221),
				_Utils_Tuple2('bdquo', 8222),
				_Utils_Tuple2('dagger', 8224),
				_Utils_Tuple2('Dagger', 8225),
				_Utils_Tuple2('bull', 8226),
				_Utils_Tuple2('hellip', 8230),
				_Utils_Tuple2('permil', 8240),
				_Utils_Tuple2('prime', 8242),
				_Utils_Tuple2('Prime', 8243),
				_Utils_Tuple2('lsaquo', 8249),
				_Utils_Tuple2('rsaquo', 8250),
				_Utils_Tuple2('oline', 8254),
				_Utils_Tuple2('frasl', 8260),
				_Utils_Tuple2('sigma', 963),
				_Utils_Tuple2('euro', 8364),
				_Utils_Tuple2('image', 8465),
				_Utils_Tuple2('weierp', 8472),
				_Utils_Tuple2('real', 8476),
				_Utils_Tuple2('trade', 8482),
				_Utils_Tuple2('alefsym', 8501),
				_Utils_Tuple2('larr', 8592),
				_Utils_Tuple2('uarr', 8593),
				_Utils_Tuple2('rarr', 8594),
				_Utils_Tuple2('darr', 8595),
				_Utils_Tuple2('harr', 8596),
				_Utils_Tuple2('crarr', 8629),
				_Utils_Tuple2('lArr', 8656),
				_Utils_Tuple2('uArr', 8657),
				_Utils_Tuple2('rArr', 8658),
				_Utils_Tuple2('dArr', 8659),
				_Utils_Tuple2('hArr', 8660),
				_Utils_Tuple2('forall', 8704),
				_Utils_Tuple2('part', 8706),
				_Utils_Tuple2('exist', 8707),
				_Utils_Tuple2('empty', 8709),
				_Utils_Tuple2('nabla', 8711),
				_Utils_Tuple2('isin', 8712),
				_Utils_Tuple2('notin', 8713),
				_Utils_Tuple2('ni', 8715),
				_Utils_Tuple2('prod', 8719),
				_Utils_Tuple2('sum', 8721),
				_Utils_Tuple2('minus', 8722),
				_Utils_Tuple2('lowast', 8727),
				_Utils_Tuple2('radic', 8730),
				_Utils_Tuple2('prop', 8733),
				_Utils_Tuple2('infin', 8734),
				_Utils_Tuple2('ang', 8736),
				_Utils_Tuple2('and', 8743),
				_Utils_Tuple2('or', 8744),
				_Utils_Tuple2('cap', 8745),
				_Utils_Tuple2('cup', 8746),
				_Utils_Tuple2('int', 8747),
				_Utils_Tuple2('there4', 8756),
				_Utils_Tuple2('sim', 8764),
				_Utils_Tuple2('cong', 8773),
				_Utils_Tuple2('asymp', 8776),
				_Utils_Tuple2('ne', 8800),
				_Utils_Tuple2('equiv', 8801),
				_Utils_Tuple2('le', 8804),
				_Utils_Tuple2('ge', 8805),
				_Utils_Tuple2('sub', 8834),
				_Utils_Tuple2('sup', 8835),
				_Utils_Tuple2('nsub', 8836),
				_Utils_Tuple2('sube', 8838),
				_Utils_Tuple2('supe', 8839),
				_Utils_Tuple2('oplus', 8853),
				_Utils_Tuple2('otimes', 8855),
				_Utils_Tuple2('perp', 8869),
				_Utils_Tuple2('sdot', 8901),
				_Utils_Tuple2('loz', 9674),
				_Utils_Tuple2('spades', 9824),
				_Utils_Tuple2('clubs', 9827),
				_Utils_Tuple2('hearts', 9829),
				_Utils_Tuple2('diams', 9830)
			])));
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convertFriendlyCodeToChar = function (string) {
	return A2(elm$core$Dict$get, string, marcosh$elm_html_to_unicode$ElmEscapeHtml$friendlyConverterDictionary);
};
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convertFriendlyCode = A2(
	marcosh$elm_html_to_unicode$ElmEscapeHtml$convertCode,
	marcosh$elm_html_to_unicode$ElmEscapeHtml$convertFriendlyCodeToChar,
	function (_char) {
		return _List_fromArray(
			[_char]);
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convertDecimalCode = A2(
	marcosh$elm_html_to_unicode$ElmEscapeHtml$convertCode,
	elm$core$String$toInt,
	function (_int) {
		return _List_fromArray(
			[
				elm$core$Char$fromCode(_int)
			]);
	});
var elm$core$String$reverse = _String_reverse;
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$charOffset = F2(
	function (basis, c) {
		return elm$core$Char$toCode(c) - elm$core$Char$toCode(basis);
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$isBetween = F3(
	function (lower, upper, c) {
		var ci = elm$core$Char$toCode(c);
		return (_Utils_cmp(
			elm$core$Char$toCode(lower),
			ci) < 1) && (_Utils_cmp(
			ci,
			elm$core$Char$toCode(upper)) < 1);
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$intFromChar = function (c) {
	var validInt = function (i) {
		return (i < 16) ? elm$core$Maybe$Just(i) : elm$core$Maybe$Nothing;
	};
	var toInt = A3(
		marcosh$elm_html_to_unicode$ElmEscapeHtml$isBetween,
		_Utils_chr('0'),
		_Utils_chr('9'),
		c) ? elm$core$Maybe$Just(
		A2(
			marcosh$elm_html_to_unicode$ElmEscapeHtml$charOffset,
			_Utils_chr('0'),
			c)) : (A3(
		marcosh$elm_html_to_unicode$ElmEscapeHtml$isBetween,
		_Utils_chr('a'),
		_Utils_chr('z'),
		c) ? elm$core$Maybe$Just(
		10 + A2(
			marcosh$elm_html_to_unicode$ElmEscapeHtml$charOffset,
			_Utils_chr('a'),
			c)) : (A3(
		marcosh$elm_html_to_unicode$ElmEscapeHtml$isBetween,
		_Utils_chr('A'),
		_Utils_chr('Z'),
		c) ? elm$core$Maybe$Just(
		10 + A2(
			marcosh$elm_html_to_unicode$ElmEscapeHtml$charOffset,
			_Utils_chr('A'),
			c)) : elm$core$Maybe$Nothing));
	return A2(elm$core$Maybe$andThen, validInt, toInt);
};
var marcosh$elm_html_to_unicode$ElmEscapeHtml$parseIntR = function (string) {
	var _n0 = elm$core$String$uncons(string);
	if (_n0.$ === 'Nothing') {
		return elm$core$Maybe$Just(0);
	} else {
		var _n1 = _n0.a;
		var c = _n1.a;
		var tail = _n1.b;
		return A2(
			elm$core$Maybe$andThen,
			function (ci) {
				return A2(
					elm$core$Maybe$andThen,
					function (ri) {
						return elm$core$Maybe$Just(ci + (ri * 16));
					},
					marcosh$elm_html_to_unicode$ElmEscapeHtml$parseIntR(tail));
			},
			marcosh$elm_html_to_unicode$ElmEscapeHtml$intFromChar(c));
	}
};
var marcosh$elm_html_to_unicode$ElmEscapeHtml$parseIntHex = function (string) {
	return marcosh$elm_html_to_unicode$ElmEscapeHtml$parseIntR(
		elm$core$String$reverse(string));
};
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convertHexadecimalCode = A2(
	marcosh$elm_html_to_unicode$ElmEscapeHtml$convertCode,
	marcosh$elm_html_to_unicode$ElmEscapeHtml$parseIntHex,
	function (_int) {
		return _List_fromArray(
			[
				elm$core$Char$fromCode(_int)
			]);
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$convertNumericalCode = F3(
	function (pre, post, list) {
		if (!list.b) {
			return elm$core$List$concat(
				_List_fromArray(
					[pre, post]));
		} else {
			if ('x' === list.a.valueOf()) {
				var tail = list.b;
				return A3(
					marcosh$elm_html_to_unicode$ElmEscapeHtml$convertHexadecimalCode,
					A2(
						elm$core$List$append,
						pre,
						_List_fromArray(
							[
								_Utils_chr('x')
							])),
					post,
					tail);
			} else {
				var anyOtherList = list;
				return A3(marcosh$elm_html_to_unicode$ElmEscapeHtml$convertDecimalCode, pre, post, anyOtherList);
			}
		}
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$noAmpUnicodeConverter = F3(
	function (pre, post, list) {
		if (!list.b) {
			return _List_fromArray(
				[pre, post]);
		} else {
			if ('#' === list.a.valueOf()) {
				var tail = list.b;
				return A3(
					marcosh$elm_html_to_unicode$ElmEscapeHtml$convertNumericalCode,
					_List_fromArray(
						[
							pre,
							_Utils_chr('#')
						]),
					_List_fromArray(
						[post]),
					tail);
			} else {
				var head = list.a;
				var tail = list.b;
				return A3(
					marcosh$elm_html_to_unicode$ElmEscapeHtml$convertFriendlyCode,
					_List_fromArray(
						[pre]),
					_List_fromArray(
						[post]),
					A2(elm$core$List$cons, head, tail));
			}
		}
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$unicodeConverter = F2(
	function (post, list) {
		if (!list.b) {
			return _List_fromArray(
				[post]);
		} else {
			var head = list.a;
			var tail = list.b;
			return A3(marcosh$elm_html_to_unicode$ElmEscapeHtml$noAmpUnicodeConverter, head, post, tail);
		}
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$parser = F3(
	function (charsToBeParsed, charsOnParsing, charsParsed) {
		parser:
		while (true) {
			if (!charsToBeParsed.b) {
				return charsParsed;
			} else {
				var head = charsToBeParsed.a;
				var tail = charsToBeParsed.b;
				if (_Utils_eq(
					head,
					_Utils_chr('&'))) {
					var $temp$charsToBeParsed = tail,
						$temp$charsOnParsing = _List_fromArray(
						[head]),
						$temp$charsParsed = charsParsed;
					charsToBeParsed = $temp$charsToBeParsed;
					charsOnParsing = $temp$charsOnParsing;
					charsParsed = $temp$charsParsed;
					continue parser;
				} else {
					if (_Utils_eq(
						head,
						_Utils_chr(';'))) {
						var $temp$charsToBeParsed = tail,
							$temp$charsOnParsing = _List_Nil,
							$temp$charsParsed = A2(
							elm$core$List$append,
							charsParsed,
							A2(marcosh$elm_html_to_unicode$ElmEscapeHtml$unicodeConverter, head, charsOnParsing));
						charsToBeParsed = $temp$charsToBeParsed;
						charsOnParsing = $temp$charsOnParsing;
						charsParsed = $temp$charsParsed;
						continue parser;
					} else {
						if (!elm$core$List$isEmpty(charsOnParsing)) {
							var $temp$charsToBeParsed = tail,
								$temp$charsOnParsing = A2(
								elm$core$List$append,
								charsOnParsing,
								_List_fromArray(
									[head])),
								$temp$charsParsed = charsParsed;
							charsToBeParsed = $temp$charsToBeParsed;
							charsOnParsing = $temp$charsOnParsing;
							charsParsed = $temp$charsParsed;
							continue parser;
						} else {
							var $temp$charsToBeParsed = tail,
								$temp$charsOnParsing = _List_Nil,
								$temp$charsParsed = A2(
								elm$core$List$append,
								charsParsed,
								_List_fromArray(
									[head]));
							charsToBeParsed = $temp$charsToBeParsed;
							charsOnParsing = $temp$charsOnParsing;
							charsParsed = $temp$charsParsed;
							continue parser;
						}
					}
				}
			}
		}
	});
var marcosh$elm_html_to_unicode$ElmEscapeHtml$unescapeChars = function (list) {
	return A3(marcosh$elm_html_to_unicode$ElmEscapeHtml$parser, list, _List_Nil, _List_Nil);
};
var marcosh$elm_html_to_unicode$ElmEscapeHtml$unescape = marcosh$elm_html_to_unicode$ElmEscapeHtml$convert(marcosh$elm_html_to_unicode$ElmEscapeHtml$unescapeChars);
var author$project$Main$inputToHtml = F5(
	function (input, key, unit, msg, help) {
		switch (input.$) {
			case 'Text':
				var answer = input.a;
				var prompt = input.b;
				return A5(
					author$project$Main$textInput,
					msg,
					A2(elm$core$Maybe$withDefault, '', answer),
					key,
					marcosh$elm_html_to_unicode$ElmEscapeHtml$unescape(prompt),
					help);
			case 'Number':
				var answer = input.a;
				var prompt = input.b;
				return A5(
					author$project$Main$numberInput,
					msg,
					A3(
						elm$core$Basics$composeR,
						elm$core$Maybe$map(elm$core$String$fromFloat),
						elm$core$Maybe$withDefault(''),
						answer),
					key,
					marcosh$elm_html_to_unicode$ElmEscapeHtml$unescape(prompt),
					unit);
			case 'Multichoice':
				var answer = input.a;
				var prompt = input.b;
				var options = input.c;
				return A6(
					author$project$Main$multichoiceInput,
					msg,
					answer,
					key,
					marcosh$elm_html_to_unicode$ElmEscapeHtml$unescape(prompt),
					options,
					help);
			case 'File':
				var answer = input.a;
				var prompt = input.b;
				return A6(
					author$project$Main$checkboxInput,
					msg,
					answer,
					key,
					marcosh$elm_html_to_unicode$ElmEscapeHtml$unescape(prompt),
					'Check to Upload File',
					help);
			default:
				var answer = input.a;
				var prompt = input.b;
				var statement = input.c;
				return A6(
					author$project$Main$checkboxInput,
					msg,
					answer,
					key,
					marcosh$elm_html_to_unicode$ElmEscapeHtml$unescape(prompt),
					statement,
					help);
		}
	});
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$h4 = _VirtualDom_node('h4');
var elm$html$Html$hr = _VirtualDom_node('hr');
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var author$project$Main$renderApplicationForm = F2(
	function (model, sections) {
		var renderPropertyGroups = function () {
			var zone = A2(
				elm$core$Maybe$map,
				function ($) {
					return $.zone;
				},
				model.selectedProperty);
			var zoneQuestion = A3(
				author$project$Main$ApplicationQuestion,
				'property-zone',
				A2(author$project$Main$Text, zone, 'Zone'),
				elm$core$Maybe$Nothing);
			var wufi = A2(
				elm$core$Maybe$map,
				elm$core$String$fromInt,
				A2(
					elm$core$Maybe$map,
					function ($) {
						return $.valuationWufi;
					},
					model.selectedProperty));
			var wufiQuestion = A3(
				author$project$Main$ApplicationQuestion,
				'property-wufi',
				A2(author$project$Main$Text, wufi, 'WUFI'),
				elm$core$Maybe$Nothing);
			var others = _List_fromArray(
				[
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-legal-description',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Legal Description of the Site for this Application'),
						elm$core$Maybe$Nothing)
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-aka',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Any Other Commonly Known Names of the Site'),
						elm$core$Maybe$Nothing)
					]),
					_List_fromArray(
					[
						A3(
						author$project$Main$ApplicationQuestion,
						'property-description',
						A2(author$project$Main$Text, elm$core$Maybe$Nothing, 'Site Description'),
						elm$core$Maybe$Just(
							elm$html$Html$text('\n                            Describe the site including its natural and physical characteristics and any adjacent\n                            uses that may be relevant to the consideration of the application.\n                            ')))
					])
				]);
			var image = A2(
				elm$core$Maybe$map,
				function ($) {
					return $.imageUrl;
				},
				model.selectedProperty);
			var address = A2(
				elm$core$Maybe$map,
				function ($) {
					return $.fullAddress;
				},
				model.selectedProperty);
			var addressQuestion = A3(
				author$project$Main$ApplicationQuestion,
				'property-address',
				A2(author$project$Main$Text, address, 'Address'),
				elm$core$Maybe$Nothing);
			var section = A3(
				author$project$Main$ApplicationSection,
				'Property Information',
				elm$core$Maybe$Nothing,
				_Utils_ap(
					_List_fromArray(
						[
							_List_fromArray(
							[addressQuestion]),
							_List_fromArray(
							[wufiQuestion]),
							_List_fromArray(
							[zoneQuestion])
						]),
					others));
			var inputForQuestion = function (q) {
				return A5(
					author$project$Main$inputToHtml,
					q.input,
					q.key,
					elm$core$Maybe$Nothing,
					A2(author$project$Main$InputApplicationAnswer, section, q),
					q.help);
			};
			var showQuestion = function (q) {
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('col')
						]),
					_List_fromArray(
						[
							A5(
							author$project$Main$inputToHtml,
							q.input,
							q.key,
							elm$core$Maybe$Nothing,
							A2(author$project$Main$InputApplicationAnswer, section, q),
							q.help)
						]));
			};
			return _List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('row mb-3')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('col')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$img,
									_List_fromArray(
										[
											elm$html$Html$Attributes$src(
											A2(elm$core$Maybe$withDefault, '', image)),
											elm$html$Html$Attributes$class('cover')
										]),
									_List_Nil)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('col')
								]),
							_List_fromArray(
								[
									inputForQuestion(addressQuestion),
									inputForQuestion(wufiQuestion),
									inputForQuestion(zoneQuestion)
								]))
						]))
				]);
		}();
		var renderAppGroup = F2(
			function (section, questions) {
				var showQuestion = function (q) {
					return A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('col')
							]),
						_List_fromArray(
							[
								A5(
								author$project$Main$inputToHtml,
								q.input,
								q.key,
								elm$core$Maybe$Nothing,
								A2(author$project$Main$InputApplicationAnswer, section, q),
								q.help)
							]));
				};
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('row mb-3')
						]),
					A2(elm$core$List$map, showQuestion, questions));
			});
		var renderAppSection = F2(
			function (index, section) {
				var infoCard = function () {
					var _n0 = section.info;
					if (_n0.$ === 'Just') {
						var i = _n0.a;
						return A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card mb-3')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('card-body')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$p,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('card-text')
												]),
											_List_fromArray(
												[i]))
										]))
								]));
					} else {
						return A2(elm$html$Html$div, _List_Nil, _List_Nil);
					}
				}();
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$h4,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('d-flex justify-content-between align-items-center mb-3')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(section.name)
										]))
								])),
							infoCard,
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('questions')
								]),
							(!index) ? _Utils_ap(
								renderPropertyGroups,
								A2(
									elm$core$List$map,
									renderAppGroup(section),
									A2(
										elm$core$Maybe$withDefault,
										_List_Nil,
										elm$core$List$tail(section.groups)))) : A2(
								elm$core$List$map,
								renderAppGroup(section),
								section.groups)),
							A2(
							elm$html$Html$hr,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('mb-4')
								]),
							_List_Nil)
						]));
			});
		var generateButton = A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Attributes$type_('button'),
					elm$html$Html$Attributes$class('btn btn-success btn-lg btn-block'),
					elm$html$Html$Events$onClick(author$project$Main$GeneratePDF)
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Generate Application')
				]));
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_Utils_ap(
				A2(elm$core$List$indexedMap, renderAppSection, sections),
				_List_fromArray(
					[generateButton])));
	});
var author$project$Main$SelectActivity = function (a) {
	return {$: 'SelectActivity', a: a};
};
var elm$html$Html$h5 = _VirtualDom_node('h5');
var elm$html$Html$option = _VirtualDom_node('option');
var elm$html$Html$select = _VirtualDom_node('select');
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$hidden = elm$html$Html$Attributes$boolProperty('hidden');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$readonly = elm$html$Html$Attributes$boolProperty('readOnly');
var elm$html$Html$Attributes$selected = elm$html$Html$Attributes$boolProperty('selected');
var author$project$Main$renderProposal = F2(
	function (activities, selectedProperty) {
		var propertyCard = function () {
			if (selectedProperty.$ === 'Just') {
				var p = selectedProperty.a;
				var row = F2(
					function (k, v) {
						return A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('row align-items-end')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('col-md-6 font-weight-bold')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(k)
										])),
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('col-md-6')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(v)
										]))
								]));
					});
				var maybeRow = F2(
					function (k, maybev) {
						if (maybev.$ === 'Just') {
							var v = maybev.a;
							return A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('row align-items-end')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('col-md-6 font-weight-bold')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(k)
											])),
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('col-md-6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(v)
											]))
									]));
						} else {
							return A2(elm$html$Html$div, _List_Nil, _List_Nil);
						}
					});
				var hazard = p.hazardFaultLineArea ? elm$core$Maybe$Just('Yes') : elm$core$Maybe$Nothing;
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card my-3')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('row no-gutters')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('col-md-4')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$img,
											_List_fromArray(
												[
													elm$html$Html$Attributes$src(p.imageUrl),
													elm$html$Html$Attributes$class('cover')
												]),
											_List_Nil)
										])),
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('col-md-8')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('card-body')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$h5,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('card-title mb-3')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(p.fullAddress)
														])),
													A2(row, 'Suburb', p.suburb),
													A2(row, 'PostCode', p.postCode),
													A2(row, 'Title', p.title),
													A2(row, 'Valuation ID', p.valuationId),
													A2(row, 'Zone', p.zone),
													A2(maybeRow, 'Special Residential Area', p.specialResidentialArea),
													A2(maybeRow, 'Hazard (Fault Line) Area', hazard)
												]))
										]))
								]))
						]));
			} else {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			}
		}();
		var propertySelect = function () {
			var propertyTable = function () {
				if (selectedProperty.$ === 'Just') {
					var p = selectedProperty.a;
					return A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('form-control'),
								elm$html$Html$Attributes$readonly(true),
								elm$html$Html$Attributes$value(p.fullAddress)
							]),
						_List_Nil);
				} else {
					return A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('form-control'),
								elm$html$Html$Attributes$readonly(true),
								elm$html$Html$Attributes$placeholder('Please use the map to select a property...')
							]),
						_List_Nil);
				}
			}();
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('mb-3')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$label,
						_List_fromArray(
							[
								elm$html$Html$Attributes$for('property-select')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('What is the address of the property?')
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$id('search-widget')
							]),
						_List_Nil),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$id('map')
							]),
						_List_Nil),
						propertyCard
					]));
		}();
		var activitySelect = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$for('activity-select')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('What do you want to do?')
						])),
					A2(
					elm$html$Html$select,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('activity-select'),
							elm$html$Html$Attributes$class('form-control'),
							elm$html$Html$Events$onInput(author$project$Main$SelectActivity)
						]),
					A2(
						elm$core$List$cons,
						A2(
							elm$html$Html$option,
							_List_fromArray(
								[
									elm$html$Html$Attributes$hidden(true),
									elm$html$Html$Attributes$disabled(true),
									elm$html$Html$Attributes$selected(true)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Select an activity...')
								])),
						A2(
							elm$core$List$map,
							function (a) {
								return A2(
									elm$html$Html$option,
									_List_fromArray(
										[
											elm$html$Html$Attributes$value(a)
										]),
									_List_fromArray(
										[
											elm$html$Html$text(a)
										]));
							},
							activities)))
				]));
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('proposal')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$h4,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Proposal')
						])),
					activitySelect,
					propertySelect,
					A2(
					elm$html$Html$hr,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('mb-4')
						]),
					_List_Nil)
				]));
	});
var author$project$Main$InputAnswer = F3(
	function (a, b, c) {
		return {$: 'InputAnswer', a: a, b: b, c: c};
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var author$project$Main$renderQuestion = F3(
	function (answers, section, question) {
		var met = function (_n5) {
			var field = _n5.field;
			var operator = _n5.operator;
			var value = _n5.value;
			var _n0 = _Utils_Tuple2(
				A2(elm$core$Dict$get, field, answers),
				operator);
			_n0$4:
			while (true) {
				if (_n0.a.$ === 'Just') {
					switch (_n0.b) {
						case 'equal':
							switch (_n0.a.a.$) {
								case 'Text':
									var _n1 = _n0.a.a;
									var a = _n1.a;
									return _Utils_eq(
										a,
										elm$core$Maybe$Just(value));
								case 'Number':
									var _n2 = _n0.a.a;
									var a = _n2.a;
									return _Utils_eq(
										A2(elm$core$Maybe$map, elm$core$String$fromFloat, a),
										elm$core$Maybe$Just(value));
								case 'Multichoice':
									var _n3 = _n0.a.a;
									var a = _n3.a;
									return _Utils_eq(
										a,
										elm$core$Maybe$Just(value));
								default:
									break _n0$4;
							}
						case 'doesNotContain':
							if (_n0.a.a.$ === 'Text') {
								var _n4 = _n0.a.a;
								var a = _n4.a;
								return !_Utils_eq(
									a,
									elm$core$Maybe$Just(value));
							} else {
								break _n0$4;
							}
						default:
							break _n0$4;
					}
				} else {
					break _n0$4;
				}
			}
			return false;
		};
		var input = A5(
			author$project$Main$inputToHtml,
			question.input,
			question.key,
			question.unit,
			A2(author$project$Main$InputAnswer, section, question),
			elm$core$Maybe$Nothing);
		return A2(
			elm$core$List$member,
			false,
			A2(elm$core$List$map, met, question.prerequisites)) ? A2(elm$html$Html$div, _List_Nil, _List_Nil) : input;
	});
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var author$project$Main$renderSection = F3(
	function (answers, index, section) {
		var unique = 'section-' + elm$core$String$fromInt(index);
		var placeholder = A2(
			elm$core$String$join,
			' ',
			A2(elm$core$List$repeat, 500, 'placeholder'));
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('sections'),
					elm$html$Html$Attributes$id(unique)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$h4,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('d-flex justify-content-between align-items-center mb-3')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(section.name)
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('questions')
						]),
					A2(
						elm$core$List$map,
						A2(author$project$Main$renderQuestion, answers, section),
						section.questions)),
					A2(
					elm$html$Html$hr,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('mb-4')
						]),
					_List_Nil)
				]));
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$html$Html$form = _VirtualDom_node('form');
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm$core$String$fromInt(n));
};
var author$project$Main$renderContent = function (model) {
	var continueButton = function () {
		var btn = function (_switch) {
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('row')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('col-md-8')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$a,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('btn btn-primary btn-block btn-lg'),
										elm$html$Html$Events$onClick(author$project$Main$AskRubric),
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('disabled', _switch)
											])),
										elm$html$Html$Attributes$tabindex(-1)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Determine your Compliance')
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('col-md-4')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$a,
								_List_fromArray(
									[
										elm$html$Html$Attributes$href('#home'),
										elm$html$Html$Attributes$class('btn btn-success btn-block btn-lg'),
										elm$html$Html$Events$onClick(author$project$Main$ToggleApplication),
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('disabled', _switch)
											])),
										elm$html$Html$Attributes$tabindex(-1)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Apply')
									]))
							]))
					]));
		};
		var _n1 = _Utils_Tuple2(model.selectedActivity, model.selectedProperty);
		if (_n1.a.$ === 'Just') {
			if (_n1.b.$ === 'Just') {
				return _List_fromArray(
					[
						btn(false)
					]);
			} else {
				var _n2 = _n1.b;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('text-muted text-center mb-3')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('You need to select a property before continuing.')
							])),
						btn(true)
					]);
			}
		} else {
			if (_n1.b.$ === 'Just') {
				var _n3 = _n1.a;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('text-muted text-center mb-3')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('You need to select an activity before continuing.')
							])),
						btn(true)
					]);
			} else {
				var _n4 = _n1.a;
				var _n5 = _n1.b;
				return _List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('text-muted text-center mb-3')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('You need to select a property and an activity before continuing.')
							])),
						btn(true)
					]);
			}
		}
	}();
	var compliance = A2(
		elm$html$Html$form,
		_List_Nil,
		A2(
			elm$core$List$cons,
			A2(author$project$Main$renderProposal, model.activities, model.selectedProperty),
			_Utils_ap(
				A2(
					elm$core$List$indexedMap,
					author$project$Main$renderSection(
						A3(author$project$Main$answerDictionary, model.selectedActivity, model.selectedProperty, model.sections)),
					model.sections),
				continueButton)));
	var content = function () {
		if (model.applying) {
			var _n0 = _Utils_Tuple2(model.selectedActivity, model.selectedProperty);
			if ((_n0.a.$ === 'Just') && (_n0.b.$ === 'Just')) {
				var a = _n0.a.a;
				var p = _n0.b.a;
				return A2(author$project$Main$renderApplicationForm, model, model.application);
			} else {
				return compliance;
			}
		} else {
			return compliance;
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('col-md-8 order-md-1')
			]),
		_List_fromArray(
			[content]));
};
var author$project$Main$ToggleSection = function (a) {
	return {$: 'ToggleSection', a: a};
};
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Main$renderModal = F3(
	function (key, modalHeader, modalContent) {
		var title = key + '-modal-title';
		var header = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('modal-header')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$h5,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('modal-title'),
							elm$html$Html$Attributes$id(title)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(modalHeader)
						])),
					A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$type_('button'),
							elm$html$Html$Attributes$class('close'),
							A2(elm$html$Html$Attributes$attribute, 'data-dismiss', 'modal'),
							A2(elm$html$Html$Attributes$attribute, 'aria-label', 'Close')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('×')
								]))
						]))
				]));
		var footer = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('modal-footer')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$type_('button'),
							elm$html$Html$Attributes$class('btn btn-secondary'),
							A2(elm$html$Html$Attributes$attribute, 'data-dismiss', 'modal')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Close')
						]))
				]));
		var body = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('modal-body'),
					A2(elm$html$Html$Attributes$style, 'white-space', 'pre-line')
				]),
			_List_fromArray(
				[modalContent]));
		var modalDialog = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('modal fade'),
					elm$html$Html$Attributes$id(key),
					elm$html$Html$Attributes$tabindex(-1),
					A2(elm$html$Html$Attributes$attribute, 'role', 'dialog'),
					A2(elm$html$Html$Attributes$attribute, 'aria-labelledby', title)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('modal-dialog modal-lg modal-dialog-scrollable'),
							A2(elm$html$Html$Attributes$attribute, 'role', 'document')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('modal-content')
								]),
							_List_fromArray(
								[header, body, footer]))
						]))
				]));
		return modalDialog;
	});
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var author$project$Main$formatKey = function (key) {
	return A3(elm$core$String$replace, '_', '.', key);
};
var author$project$Main$statusToClass = function (status) {
	switch (status.$) {
		case 'Controlled':
			return 'warning';
		case 'DiscretionaryRestricted':
			return 'info';
		case 'DiscretionaryUnrestricted':
			return 'info';
		case 'NonCompliant':
			return 'danger';
		case 'Permitted':
			return 'success';
		default:
			return 'secondary';
	}
};
var elm$html$Html$small = _VirtualDom_node('small');
var author$project$Main$showRule = F3(
	function (section, lastRule, rule) {
		var mattersForDiscretion = function () {
			var _n1 = rule.mattersOfDiscretion;
			if (!_n1.b) {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			} else {
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('small mb-0 mt-2 font-weight-bold')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Matters for Discretion')
								])),
							A2(
							elm$html$Html$ul,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('small')
								]),
							A2(
								elm$core$List$map,
								function (m) {
									return A2(
										elm$html$Html$li,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('mb-2')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(m)
											]));
								},
								rule.mattersOfDiscretion))
						]));
			}
		}();
		var highlight = (_Utils_eq(
			elm$core$Maybe$Just(rule.key),
			A2(
				elm$core$Maybe$map,
				function ($) {
					return $.key;
				},
				lastRule)) && (rule.status === 'Met')) ? ('text-' + author$project$Main$statusToClass(rule.activityStatus)) : '';
		var conditions = function () {
			var _n0 = rule.conditions;
			if (!_n0.b) {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			} else {
				return A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('small mb-0 mt-2 font-weight-bold')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Conditions')
								])),
							A2(
							elm$html$Html$ul,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('small')
								]),
							A2(
								elm$core$List$map,
								function (c) {
									return A2(
										elm$html$Html$li,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('mb-2')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(c.title)
											]));
								},
								rule.conditions))
						]));
			}
		}();
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('list-group-item list-group-item-action'),
					A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'modal'),
					A2(elm$html$Html$Attributes$attribute, 'data-target', '#' + (section.key + (rule.key + '-modal')))
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('d-flex justify-content-between align-items-center mb-2')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$small,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(
									'ⓘ ' + author$project$Main$formatKey(rule.key))
								])),
							A2(
							elm$html$Html$small,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('text-muted')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(rule.report)
								]))
						])),
					A2(
					elm$html$Html$h6,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('my-0 ' + highlight)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(rule.title)
						])),
					conditions,
					mattersForDiscretion
				]));
	});
var author$project$Main$showStandard = function (standard) {
	var mute = (standard.status === 'Not met') ? 'text-muted' : '';
	return A2(
		elm$html$Html$a,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('list-group-item list-group-item-action'),
				A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'modal'),
				A2(elm$html$Html$Attributes$attribute, 'data-target', '#' + (standard.key + '-modal'))
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('d-flex justify-content-between align-items-center mb-2')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$small,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class(mute)
							]),
						_List_fromArray(
							[
								elm$html$Html$text(
								'ⓘ ' + author$project$Main$formatKey(standard.key))
							])),
						A2(
						elm$html$Html$small,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('text-muted')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(standard.report)
							]))
					])),
				A2(
				elm$html$Html$h6,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('my-0 ' + mute)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(standard.title)
					]))
			]));
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var author$project$Main$renderSidebar = F3(
	function (status, sections, prop) {
		var statusClass = function (s) {
			return 'list-group-item-' + author$project$Main$statusToClass(s);
		};
		var statusCard = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('list-group')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							'list-group-item d-flex flex-column justify-content-between align-items-center ' + statusClass(status))
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$small,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text('Overall Activity Status')
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$h6,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('my-0')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											author$project$Main$statusToString(status))
										]))
								]))
						]))
				]));
		var sectionGroup = function (section) {
			var toggleIndicator = section.open ? '▼' : '►';
			var toggle = function () {
				var _n0 = _Utils_Tuple2(section.results.rules, section.results.standards);
				if ((!_n0.a.b) && (!_n0.b.b)) {
					return A2(elm$html$Html$div, _List_Nil, _List_Nil);
				} else {
					return A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('small text-muted d-flex justify-content-center align-items-center pr-3')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(toggleIndicator)
							]));
				}
			}();
			var sectionHeader = A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class(
						'list-group-item list-group-item-action ' + statusClass(section.results.status)),
						A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'collapse'),
						A2(elm$html$Html$Attributes$attribute, 'data-target', '#' + (section.key + '-results')),
						elm$html$Html$Events$onClick(
						author$project$Main$ToggleSection(section))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('row px-3')
							]),
						_List_fromArray(
							[
								toggle,
								A2(
								elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$h6,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('my-0')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(section.name)
											])),
										A2(
										elm$html$Html$small,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text(
												author$project$Main$statusToString(section.results.status))
											]))
									]))
							]))
					]));
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('list-group list-group-flush')
					]),
				_List_fromArray(
					[
						sectionHeader,
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$id(section.key + '-results'),
								elm$html$Html$Attributes$class('collapse')
							]),
						_Utils_ap(
							A2(
								elm$core$List$map,
								A2(
									author$project$Main$showRule,
									section,
									elm_community$list_extra$List$Extra$last(section.results.rules)),
								section.results.rules),
							A2(elm$core$List$map, author$project$Main$showStandard, section.results.standards)))
					]));
		};
		var preapp = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('card')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-body')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$h5,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-title')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Having trouble?')
								])),
							A2(
							elm$html$Html$p,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-text')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('A Council Planner can help you through the process in a meeting.')
								])),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('https://www.surveygizmo.com/s3/1550552/Resource-Consent-Pre-application-Meeting-Registration'),
									elm$html$Html$Attributes$target('_blank'),
									elm$html$Html$Attributes$class('card-link')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Request a Pre-Application Meeting')
								]))
						]))
				]));
		var itemModal = F2(
			function (section, item) {
				return A3(
					author$project$Main$renderModal,
					section.key + (item.key + '-modal'),
					item.title,
					elm$html$Html$text(
						A2(elm$core$Maybe$withDefault, 'placeholder', item.definition)));
			});
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('col-md-4 order-md-2')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('sticky-top py-3 vh-100 d-flex flex-column')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$h4,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('d-flex justify-content-between align-items-center mb-3')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('text-muted')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Summary of Compliance')
										])),
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('text-muted')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											elm$core$String$fromInt(
												elm$core$List$length(sections)))
										]))
								])),
							statusCard,
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('accordion overflow-auto rounded border my-3')
								]),
							A2(elm$core$List$map, sectionGroup, sections)),
							preapp
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('rule-modals')
						]),
					A2(
						elm$core$List$concatMap,
						function (s) {
							return A2(
								elm$core$List$map,
								itemModal(s),
								s.results.rules);
						},
						sections)),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('standard-modals')
						]),
					A2(
						elm$core$List$concatMap,
						function (s) {
							return A2(
								elm$core$List$map,
								itemModal(s),
								s.results.standards);
						},
						sections))
				]));
	});
var elm$html$Html$h2 = _VirtualDom_node('h2');
var elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		elm$core$String$fromInt(n));
};
var author$project$Main$view = function (model) {
	var hero = A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('py-5 text-center')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$img,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('d-block mx-auto mb-4'),
						elm$html$Html$Attributes$src('logo.png'),
						elm$html$Html$Attributes$width(72),
						elm$html$Html$Attributes$height(72)
					]),
				_List_Nil),
				A2(
				elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Apply for a Resource Consent')
					])),
				A2(
				elm$html$Html$p,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('\n                        This Proof of Concept is not a formal council tool. It aims to demonstrate a way to provide an indication of a resource\n                        consent proposal\'s compliance with the District Plan. It is purposefully incomplete and is not intended to be used for\n                        resource consent applications. Wellington City Council accepts no responsibility of liability for the public\'s use or\n                        misuse of this tool.\n                        ')
					]))
			]));
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id('home'),
				elm$html$Html$Attributes$class('container')
			]),
		_List_fromArray(
			[
				hero,
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('row mb-5')
					]),
				_List_fromArray(
					[
						A3(author$project$Main$renderSidebar, model.status, model.sections, model.selectedProperty),
						author$project$Main$renderContent(model)
					]))
			]));
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$list(elm$json$Json$Decode$string))(0)}});}(this));