var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

//Helper functions
function webpackCallBack(taskName, gulpDone) {
    return function (err, stats) {
        if (err) throw new gutil.PluginError(taskName, err);
        gutil.log(`[${taskName}]`, stats.toString({
            colors: true
        }));
        gulpDone();
    }
}


// The development server (the recommended option for development)
gulp.task('default', ['webpack:build']);


// Production build
gulp.task('build', ['webpack:build']);
gulp.task('webpack:build', function (callback) {
    // run webpack
    webpack(webpackConfig, webpackCallBack);
});


