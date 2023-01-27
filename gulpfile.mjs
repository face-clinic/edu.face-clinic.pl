import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import replace from 'gulp-replace';
import rev from 'gulp-rev';
import revdel from 'gulp-rev-delete-original';
import revRewrite from 'gulp-rev-rewrite';

gulp.task('css', function () {
    return gulp.src(['src/css/normalize.css', 'src/css/webflow.css', 'src/css/*.webflow.css'], { allowEmpty: true })
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*', { allowEmpty: true })
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function () {
    return gulp.src('src/images/**/*', { allowEmpty: true })
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('txt', function () {
    return gulp.src('src/*.txt', { allowEmpty: true })
        .pipe(gulp.dest('dist/'));
});

gulp.task('documents', function () {
    return gulp.src('src/documents/**/*', { allowEmpty: true })
        .pipe(gulp.dest('dist/documents'));
});

gulp.task('html', function () {
    return gulp.src(['src/**/*.html'], { allowEmpty: true })
        .pipe(replace(/<link href="(..\/)*css\/normalize\.css" rel="stylesheet" type="text\/css">/, ''))
        .pipe(replace(/<link href="(..\/)*css\/webflow\.css" rel="stylesheet" type="text\/css">/, ''))
        .pipe(replace(/(..\/)*css\/.+.webflow\.css/, '/css/style.min.css'))
        .pipe(replace(/(..\/)*js\/webflow.js/, '/js/scripts.min.js'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('hash', function () {
    return gulp.src(['dist/**/*.{css,js}'], { allowEmpty: true })
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.src('dist/**/*.html'))
        .pipe(revRewrite())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(
    'css',
    'img',
    'js',
    'html',
    'txt',
    'documents',
    'hash'
));
