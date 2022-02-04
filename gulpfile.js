/* constiables */
const { src, dest, watch, series, parallel } = require('gulp');

//related css
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob-use-forward');

//related server
const browserSync = require('browser-sync');

const dir = {
	dest: 'dest',
	dev: 'src',
};

const paths = {
	html: dir.dest + '/*.html',
	styles: {
		dest: dir.dest + '/css',
		src: dir.dev + '/sass/**/*.scss',
	},
};

/* Functions */
// Sass
sass.compiler = require('sass');
const compileSass = (done) => {
	src(paths.styles.src)
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(dest(paths.styles.dest));
	done();
};

// Browser Sync
const browserSyncFunc = (done) => {
	browserSync.init({
		server: {
			baseDir: dir.dest,
			index: 'index.html',
		},
	});
	done();
};

// Reload Browser
const reloadBrowser = (done) => {
	browserSync.reload();
	done();
};

//
// Default task
//
const watchFiles = (done) => {
	watch(paths.html, series(reloadBrowser));
	watch(paths.styles.src, series(compileSass, reloadBrowser));
	done();
};

exports.default = parallel(compileSass, watchFiles, browserSyncFunc);
