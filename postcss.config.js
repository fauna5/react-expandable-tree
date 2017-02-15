/* global module */

var bemLinter = require('postcss-bem-linter')
var autoprefixer = require('autoprefixer')

module.exports = {
	plugins: [
		autoprefixer,
		bemLinter('bem')
	]
}