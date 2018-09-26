
// Create a new object of properties pulled from a source object
//
// @example
// 	const myBuddies = { dana: { name: "Dana", age: 32 }, kyle: { name: "Kyle", age: 28 }}
// 	console.log(mapObj(myBuddies, "name"))
//
// 	> { dana: "Dana", kyle: "Kyle"}

export const mapObj = (object: Object, key: string) =>
	Object.keys(object).reduce(function(result, k) {
		if (object[k][key]) {
			result[k] = object[k][key];
		}
		return result;
	}, {});
		