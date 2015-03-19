module.exports = function promiseTryAll(arrayOfPromises) {
	return new Promise(function(resolve, reject) {
		var erroredPromiseList = new Array(arrayOfPromises.length);
		var successPromiseList = new Array(arrayOfPromises.length);
		var success = false;

		var promiseIndex = 0;
		var errorHandledPromises = arrayOfPromises.map(function(promise) {
			var index = promiseIndex;
			promiseIndex++;
			return promise.then(function(value) {
				success = true;
				successPromiseList[index] = value;
				return value;
			}).catch(function(e) {
				erroredPromiseList[index] = e;
				throw e;
			});
		});

		Promise.all(errorHandledPromises).then(function(successValues) {
			// Every promise resolved without a problem, so just resolve
			resolve(successValues);
		}).catch(function(e) {
			if (success) {
				resolve(successPromiseList);
			} else {
				reject(erroredPromiseList);
			}
		});
	});
};
