const pkg = require("../package.json");
const Configstore = require("configstore");

module.exports = {
	conf: new Configstore(pkg.name)
};
