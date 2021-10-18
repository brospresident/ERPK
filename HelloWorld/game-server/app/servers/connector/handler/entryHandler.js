module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
  console.log("test")
  next(null, {code: 200, msg: 'Mesaj modificat de mine.'});
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};

Handler.prototype.binaryLength = function(msg, session, next) {
	const data = longestSequence(parseInt(msg));
	next(null, {
		code: 200,
		msg: data
	});
}

// functie care converteste numarul primit in binar.
// am folosit number >>> 0 pentru a trata cazul in care numarul primit e negativ.
function convertToBinary(number) {
	return (number >>> 0).toString(2);
}

function longestSequence(number) {
	const str = convertToBinary(number);

	let longest = 0;
	let temp = 0;

	for (let i = 0; i < str.length; ++i) {
		if (str[i] == '0') {
			temp = 1;
			while (str[i] === str[i + 1]) {
				temp++;
				i++;
			}
			if (temp > longest) longest = temp;
			temp = 0;
		}
	}

	return longest;
}