
var path = require('path');

module.exports = {
	mode: 'production',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'craft-widget-navigationgroup.umd.js',
		library: 'NavigationGroup',
		libraryTarget: 'umd',
	},
	externals: {
		'craft-uikit' : 'Craft'
	}
};
