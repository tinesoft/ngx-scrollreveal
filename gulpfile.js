
const gulp = require('gulp');
/** To log like console.log().. */
const gutil = require('gulp-util');
/** del to remove dist directory */
const del = require('del');
/** TSLint checker */
const tslint = require('gulp-tslint');
/** External command runner */
const shell = require('gulp-shell');
const process = require('process');
/**OS Access */
const os = require('os');
/** File Access */
const fs = require('fs');
const file = require('gulp-file');
const path = require('path');
/** To properly handle pipes on error */
const pump = require('pump');
/** To upload code coverage to coveralls */
const coveralls = require('gulp-coveralls');
/** To order tasks */
const runSequence = require('run-sequence');
/** To bundle the library with Rollup */
const gulpRollup = require('gulp-better-rollup');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');


const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const git = require('gulp-git');


const rename = require('gulp-rename');
const replace = require('gulp-replace');
const Handlebars = require('handlebars');
const Highlights = require('highlights');
const MarkdownIt = require('markdown-it');
const tap = require('gulp-tap');
const yargs = require('yargs');

const highligther = new Highlights();
const markdowniter = new MarkdownIt({
    highlight: function (code, lang) {
        let highlighted =
            highligther.highlightSync({
                fileContents: code,
                scopeName: 'source.js'
            });
        return highlighted;
    }
});
const argv = yargs.option('type', {
        alias: 't',
        choices: ['patch', 'minor', 'major']
    }).argv;


const LIBRARY_NAME = 'ng-scrollreveal';

const config = {
    allTs: 'src/**/!(*.spec).ts',
    demoDir: 'demo/',
    outputDir: 'dist/',
    coverageDir: 'coverage/'
};


//Helper functions

const startKarmaServer = (isTddMode, hasCoverage, done) => {
    const karmaServer = require('karma').Server;
    const travis = process.env.TRAVIS;

    let config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };

    if (travis) {
        config['browsers'] = ['Chrome_travis_ci']; // 'Chrome_travis_ci' is defined in "customLaunchers" section of config/karma.conf.js
    }

    config['hasCoverage'] = hasCoverage;

    new karmaServer(config, done).start();
}

const getPackageJsonVersion = () => {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

// Clean Tasks
gulp.task('clean:dist', () => {
    return del(config.outputDir);
});

gulp.task('clean:coverage', () => {
    return del(config.coverageDir);
});

gulp.task('clean', ['clean:dist', 'clean:coverage']);


// TsLint the source files
gulp.task('lint', (cb) => {
    pump([
        gulp.src(config.allTs),
        tslint({ formatter: "verbose" }),
        tslint.report()
    ], cb);
});


// Compile TS files with Angular Compiler (ngc)
gulp.task('ngc', shell.task(`ngc -p ./tsconfig-aot.json`));

// Test tasks
gulp.task('test', (cb) => {
    const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
    startKarmaServer(false, true, cb);
});

gulp.task('test:ci', ['clean'], (cb) => {
    runSequence('compile', 'test');
});

gulp.task('test:watch', (cb) => {
    const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
    startKarmaServer(true, true, cb);
});

gulp.task('test:watch-no-cc', (cb) => {//no coverage (useful for debugging failing tests in browser)
    const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
    startKarmaServer(true, false, cb);
});

// Prepare 'dist' folder for publication to NPM
gulp.task('package', (cb) => {
    let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    let targetPkgJson = {};
    let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

    targetPkgJson['name'] = LIBRARY_NAME;

    //only copy needed properties from project's package json
    fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

    targetPkgJson['main'] = `bundles/ng-scrollreveal.umd.js`;
    targetPkgJson['module'] = 'index.js';
    targetPkgJson['typings'] = 'index.d.ts';

    // defines project's dependencies as 'peerDependencies' for final users
    targetPkgJson.peerDependencies = {};
    Object.keys(pkgJson.dependencies).forEach((dependency) => {
        targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
    });

    // copy the needed additional files in the 'dist' folder
    pump(
        [
            gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md']),
            file('package.json', JSON.stringify(targetPkgJson, null, 2)),
            gulp.dest(config.outputDir)
        ],
        cb);
});

// Bundles the library as UMD bundle using RollupJS
gulp.task('bundle', () => {
    const globals = {
        // Angular dependencies
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/http': 'ng.http'
    };

    const rollupOptions = {
        context: 'this',
        external: Object.keys(globals),
        plugins: [
            rollupNodeResolve({ module: true }),
            rollupUglify()
        ]
    };

    const rollupGenerateOptions = {
        // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
        moduleId: '',
        moduleName: 'ngScrollreveal', //require for 'umd' bundling, must be a valid js identifier, see rollup/rollup/issues/584
        format: 'umd',
        globals,
        dest: 'ng-scrollreveal.umd.js'
    };

    return gulp.src(`${config.outputDir}/index.js`)
        .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
        .pipe(gulp.dest(`${config.outputDir}/bundles`));
});



//Demo Tasks
gulp.task('md', () => {
    return gulp.src('./demo/src/app/getting-started/getting-started.component.hbs')
        .pipe(tap(function (file) {
            let template = Handlebars.compile(file.contents.toString());

            return gulp.src('./README.md')
                .pipe(tap(function (file) {
                    // convert from markdown
                    let mdContents = file.contents.toString();
                    file.contents = new Buffer(markdowniter.render(mdContents), 'utf-8');
                }))
                .pipe(tap(function (file) {
                    // file is the converted HTML from the markdown
                    // set the contents to the contents property on data
                    let data = { README_md: file.contents.toString() };
                    // we will pass data to the Handlebars template to create the actual HTML to use
                    let html = template(data);
                    // replace the file contents with the new HTML created from the Handlebars template + data object that contains the HTML made from the markdown conversion
                    file.contents = new Buffer(html, "utf-8");
                }))
                .pipe(replace(/(<h1>ng-scrollreveal[^]+?)(<h2>Dependencies<\/h2>)/, '$2'))// strips everything between start & '<h2 id="installation">'
                .pipe(replace('{', "{{ '{' }}")) // escapes '{' to comply with  angular parser
                .pipe(rename('getting-started.component.html'))
                .pipe(gulp.dest('./demo/src/app/getting-started'));

        }));
});

gulp.task('serve:demo', ['md'], shell.task('ng serve', { cwd: `${config.demoDir}` }));

gulp.task('build:demo', ['md'], shell.task('ng build --prod --aot', { cwd: `${config.demoDir}` }));

gulp.task('push:demo', shell.task('ng gh-pages:deploy --gh-username=tinesoft', { cwd: `${config.demoDir}`, interactive: true }));

gulp.task('deploy:demo', (done) => { 
        runSequence('clean:demo', 'build:demo', 'push:demo', done);
});



// Link 'dist' folder (create a local 'ng-scrollreveal' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ng-scrollreveal' (as it should)
// and, thanks to 'npm link ng-scrollreveal' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', shell.task('npm link', { cwd: `${config.outputDir}` }));

gulp.task('unlink', shell.task('npm unlink', { cwd: `${config.outputDir}` }));


// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', () => {
    return gulp.src(`${config.coverageDir}/coverage.lcov`)
        .pipe(coveralls());
});

// Lint, and Compile
gulp.task('compile', (cb) => {
    runSequence('lint', 'ngc', cb);
});

// Watch changes on *.ts files and Compile
gulp.task('watch', () => {
    gulp.watch([config.allTs, config.allHtml, config.allSass], ['compile']);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
    runSequence('compile', 'test', 'package', 'bundle', cb);
});

// Release Tasks
gulp.task('changelog', () => {
    return gulp.src('CHANGELOG.md', { buffer: false })
        .pipe(conventionalChangelog({
            preset: 'angular', releaseCount: 1
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('github-release', (done) => {
    conventionalGithubReleaser({
        type: 'oauth',
        token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
    },
        { preset: 'angular' },
        done);
});

gulp.task('bump-version', () => {
    return gulp.src('./package.json')
        .pipe(bump({ type: argv.type || 'patch' }).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', () => {
    let version = getPackageJsonVersion();
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit(`chore(release): bump version number to ${version}`));
});

gulp.task('push-changes', (cb) => {
    git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', (cb) => {
    let version = getPackageJsonVersion();
    git.tag(version, `chore(release): create tag for version ${version}`, (error) => {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', { args: '--tags' }, cb);
    });

});

gulp.task('release', (cb) => {
    runSequence(
        'bump-version',
        'changelog',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        'github-release',
        (error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            cb(error);
        });
});

// Build and then Publish 'dist' folder to NPM
gulp.task('publish', ['build'], shell.task(`npm publish ${config.outputDir}`));

gulp.task('default', ['build']);
