
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'craft-widget-navigationgroup.umd.dev.js',
		library: 'NavigationGroup',
		libraryTarget: 'umd',
	},
	externals: {
		'@craftkit/craft-uikit' : 'Craft'
	}
};
