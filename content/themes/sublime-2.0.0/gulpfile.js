const gulp = require('gulp');
const gulpsass = require('gulp-sass');
const babel = require('gulp-babel');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const del = require('del');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', ()=>{
	const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  	];

	return gulp.src([
		'assets/src/styles/**/*.scss',
		'assets/src/styles/**/*.css'
	])
	.pipe(gulpsass({
		precision: 10
	}))
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(gulp.dest('assets/built/css'));
});

gulp.task('styles-prod', ()=>{
	const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  	];

	return gulp.src([
		'assets/src/styles/**/*.scss',
		'assets/src/styles/**/*.css'
	])
	.pipe(gulpsass({
		precision: 10
	}))
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(cssnano())
	.pipe(gulp.dest('assets/built/css'));
});

gulp.task('clean', ()=>{
	del(['built/*'], {dot: true})
});

gulp.task('scripts', ()=>{
	return gulp.src([
		'assets/src/js/**/*.js'
	])
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('assets/built/js'));
})

gulp.task('scripts-prod', ()=>{
	return gulp.src('assets/src/js/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
	.pipe(gulp.dest('assets/built/js'));
});

gulp.task('zip', function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var themeVersion = require('./package.json').version;
    var filename = themeName + '-' + themeVersion + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('build', cb =>{
	runSequence(
		['clean','scripts-prod','styles-prod', 'zip'],
		cb
	)
});

gulp.task('default', ['styles', 'scripts'], ()=>{
	gulp.watch(['assets/src/styles/**/*.scss', 'assets/src/styles/**/*.css'], ['styles']);
	gulp.watch(['assets/src/js/**/*.js'], ['scripts']);
});