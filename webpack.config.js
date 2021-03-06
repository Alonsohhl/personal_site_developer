const path =require("path");
const merge =require("webpack-merge");
const webpack = require("webpack");

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname,"app"),
	build: path.join(__dirname,"build")
	// build: __dirname
};


const common = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: "bundle.js"
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
				// loaders: ["style-loader", "css-loader"], // Include accepts either a path or an array of paths. 
				// include: PATHS.app
			}
		]
	}
};
	


if(TARGET === "start" || !TARGET){
	module.exports = merge(common,{
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress:true,
			stats: "errors-only",

			host: process.env.HOST ,
			port: process.env.PORT || 3000
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}


if(TARGET ==="build"){
	module.exports=merge(common,{});
}
