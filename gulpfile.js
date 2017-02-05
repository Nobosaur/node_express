// Follow this steps
// npm install express-init
// npm install bower -g
// npm install gulp -g
// bower init
// make .bowerrc
// bower install --save bootstrap
// npm install gulp --save-dev
// npm install gulp-jshint --save-dev
// npm install gulp-jscs --save-dev
// npm install jshint-stylish --save-dev
// npm install wiredep --save-dev
// npm install gulp-inject --save-dev
// npm install gulp-nodemon --save-dev

// Make overides in bower.json
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    //Inject css and JS in html
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    //src of files which need to be injected
    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });

    //inject ignore
    var injectOptions = {
        ignorePath: '/public'
    };

    //where to look which css nad js needs to be injected
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public/'
    };

    //inject function in html
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views/'));
});

gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});
