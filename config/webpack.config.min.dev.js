
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.min.js',
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'craft-widget-navigationgroup.min.dev.js',
		library: 'NavigationGroup',
		libraryTarget: 'window',
		globalObject: 'window'
	},
	externals: {
		'craft-uikit' : 'Craft',
	}
};
