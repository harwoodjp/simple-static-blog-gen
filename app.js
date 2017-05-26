const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const showdown = require("showdown"),
	converter = new showdown.Converter();

const Post = {
	template: _.template(require("./dev/templates/post.html")),
	devDir: `./dev/post`,
	prodDir: `./production/post`
}

function prepareProduction() {
	if (!fs.existsSync("./production")) {
		fs.mkdirSync("./production")
		fs.mkdirSync(Post.prodDir)				
	}	
}

function compilePosts() {

	fs.readdir(Post.devDir, (err, files) => {

		files.forEach(file => {
			fs.readFile(`${Post.devDir}/${file}`, "utf8", (err, data) => {
				data ? writePost(file, data) : console.log(err) 
			});

			function writePost(file, data) {
				const fileName = file.replace(".md", ".html"),
					fileHtml = Post.template({ foo: converter.makeHtml(data) });


				fs.writeFile(`${Post.prodDir}/${fileName}`, `${fileHtml}`, err => {
					if (err) console.log(err)
				})

			} 

		});
	})
}

prepareProduction();
compilePosts();


