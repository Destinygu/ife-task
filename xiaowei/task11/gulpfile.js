const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    open = require('open');

let app = {
    srcPath: 'src/', //源代码目录
    prdPath: 'dist/' //生产部署
};

// html
gulp.task('html', function() {
    gulp.src(app.srcPath + '*.html')
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload())
});

// css
gulp.task('sass', function() {
    gulp.src(app.srcPath + '/style/*.scss')
        .pipe($.sass({ outputStyle: 'expanded' }))
        .on('error', function(err) {
            console.log('sass Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest(app.prdPath + '/style'))
        .pipe($.connect.reload())
});

// img
gulp.task('tinypng', function() {
    gulp.src('src/img/*')
        .pipe($.tinypng('Q0xc1mTNU3hxjxeU0reEPkjfSvni5UvG'))
        .pipe(gulp.dest(app.prdPath + '/img'));
});


gulp.task('clean', function() {
    gulp.src(app.prdPath)
        .pipe($.clean())
});

gulp.task('build', ['sass', 'tinypng', 'html']);

gulp.task('serve', ['build'], function() {
    $.connect.server({
        root: app.prdPath,
        livereload: true,
        port: 3000
    });

    open('http://localhost:3000')

    gulp.watch(app.srcPath + '**/*.html', ['html'])
    gulp.watch(app.srcPath + 'style/**/*.scss', ['sass'])
});