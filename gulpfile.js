var os = require('os');
var del = require('del');
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var gulpFile = require('gulp-file');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var runSequence = require('run-sequence');

const LIBRARY_NAME = 'ng2-scrollreveal';

//Helper functions
function platformPath(path) {
    return /^win/.test(os.platform()) ? `${path}.cmd` : path;
}

function webpackCallBack(taskName, gulpDone) {
    return function (err, stats) {
        if (err) throw new gutil.PluginError(taskName, err);
        gutil.log(`[${taskName}]`, stats.toString({
            colors: true
        }));
        gulpDone();
    }
}


// Transpiling & Building

gulp.task('clean:build', function () { return del('dist/'); });

gulp.task('ngc', function (cb) {
    var executable = path.join(__dirname, platformPath('/node_modules/.bin/ngc'));
    exec(`${executable} -p ./src/lib/tsconfig-es2015.json`, (e) => {
        if (e) console.log(e);
        del('./dist/waste');
        cb();
    }).stdout.on('data', function (data) { console.log(data); });
});

gulp.task('umd', function (callback) {
    // run webpack
    webpack(webpackConfig, webpackCallBack);
});

gulp.task('npm', function () {
    var pkgJson = require('./package.json');
    var targetPkgJson = {};
    var fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

    targetPkgJson['name'] = LIBRARY_NAME;

    fieldsToCopy.forEach(function (field) { targetPkgJson[field] = pkgJson[field]; });

    targetPkgJson['main'] = `bundles/${LIBRARY_NAME}.min.js`;
    targetPkgJson['module'] = 'index.js';
    targetPkgJson['typings'] = 'index.d.ts';

    targetPkgJson.peerDependencies = {};
    Object.keys(pkgJson.dependencies).forEach(function (dependency) {
        targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
    });

    return gulp.src('README.md')
        .pipe(gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)))
        .pipe(gulp.dest('dist'));
});

gulp.task('changelog', function () {
    var conventionalChangelog = require('gulp-conventional-changelog');
    return gulp.src('CHANGELOG.md', {})
        .pipe(conventionalChangelog({ preset: 'angular', releaseCount: 1 }, {
            // Override release version to avoid `v` prefix for git comparison
            // See https://github.com/conventional-changelog/conventional-changelog-core/issues/10
            currentTag: require('./package.json').version
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('clean:demo', function () { return del('dist/demo'); });

gulp.task('serve:demo', shell.task('ng serve'));

gulp.task('build:demo', shell.task('ng build --prod'));

gulp.task('push:demo', shell.task('ng gh-pages:deploy'));

// Public Tasks
gulp.task('clean', ['clean:build', 'clean:demo']);

gulp.task('test', shell.task('ng test --watch false'));

gulp.task('lint', shell.task('ng lint'));

gulp.task('build', function (done) {
    runSequence('lint', /*'enforce-format', 'ddescribe-iit', */'test', 'clean:build', 'ngc', 'umd', 'npm', done);
});

gulp.task(
    'deploy-demo', function (done) { runSequence('clean:demo', 'build:demo', 'push:demo', done); });

gulp.task('default', function (done) { runSequence('lint', /*'enforce-format', 'ddescribe-iit', */'test', done); });