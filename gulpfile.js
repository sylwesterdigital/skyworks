var gulp = require('gulp');
var fs = require('fs');
var colors = require('colors');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
//var cssfont64 = require('gulp-cssfont64');
//var fontmin = require('gulp-fontmin');
var gulpVersionNumber = require("gulp-version-number")
var clean = require('gulp-clean');
var bump = require('gulp-bump');

/* updating PATCH of semver */
gulp.task('patch', function() {
  gulp.src('./package.json')
	.pipe(bump())
	.pipe(gulp.dest('./'));	
});

var clean = require('gulp-clean');
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});

gulp.task('favicon', function(){
  return gulp.src('src/*.+(ico|png|json|svg|xml|txt)')
  .pipe(gulp.dest('dist'))
});

gulp.task('authcss', function(){
  return gulp.src('src/css/authentication.css')
  .pipe(gulp.dest('dist/css'))
});

gulp.task('useref', function(){
	
	var json = fs.readFileSync("package.json", "utf8");
	var jsonData = JSON.parse(json);

	return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpVersionNumber({
			'replaces': [
			[/#{VERSION}#/g, jsonData.version],
			[/#{DATE}#/g, '%DT%']
	],
		}))


		.pipe(gulpIf('*.js', uglify({
			compress: {
				drop_console: true
			}
		})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
	
})


gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('browserSyncDist', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

gulp.task('dist', ['patch', 'sass', 'useref','images','favicon','authcss'], function (){
  //gulp.watch('src/scss/**/*.scss', ['sass']); 	
  // Other watchers
});

gulp.task('test', ['browserSyncDist'], function (){
});

gulp.task('watch', ['browserSync', 'sass', 'useref'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload); 	
  // Other watchers
});
