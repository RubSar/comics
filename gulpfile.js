var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('serve', function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});


gulp.task('watch', function () {
    gulp.watch('./*.less', ['less']);
});

gulp.task('less', function () {

    return gulp.src('./public/css/style.less')
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(cleanCSS().on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css-concat' , function(){
    return gulp.src([
        './public/lib/bootstrap/dist/css/bootstrap.min.css',
        './public/css/owl.carousel.css',
        './public/css/comics.style.css',
        './public/css/style.min.css'
    ])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./public/css'))
});

gulp.task('main-uglify', function(){
    return gulp.src([
        './public/lib/jquery/dist/jquery.min.js',
        './public/lib/bootstrap/dist/js/bootstrap.min.js',
        './public/lib/angular/angular.min.js',
        './public/lib/angular-ui-router/release/angular-ui-router.min.js',
        './public/js/owl.carousel.min.js'
    ])
        .pipe(concat('main-bundle.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('main-uglify.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('ng-uglify', function(){
    return gulp.src([
        './public/angular/app.js',
        './public/angular/services/authToken.js',
        './public/angular/services/authInterceptor.js',
        './public/angular/services/helperSvc.js',
        './public/angular/services/movieCharacterSvc.js',
        './public/angular/services/tvSeriesCharacterSvc.js',
        './public/angular/services/comicCharacterSvc.js',
        './public/angular/services/rateSvc.js',
        './public/angular/services/voteSvc.js',
        './public/angular/services/userSvc.js',
        './public/angular/directives/dropdown/dropdown.js',
        './public/angular/directives/starRating/rating.js',
        './public/angular/directives/character/character.js',
        './public/angular/directives/modal/modal.js',
        './public/angular/directives/paging/paging.js',
        './public/angular/directives/owlCarousel/owlCarousel.js',
        './public/angular/directives/owlCarousel/owlCarouselItem.js',
        './public/angular/directives/fbComments.js',
        './public/angular/directives/seoMetaTags.js',
        './public/angular/controllers/headerCtrl.js',
        './public/angular/controllers/home/homeCtrl.js',
        './public/angular/controllers/search/searchCtrl.js',
        './public/angular/controllers/movieCharactersList/movieCharactersListCtrl.js',
        './public/angular/controllers/tvSeriesCharactersList/tvSeriesCharactersListCtrl.js',
        './public/angular/controllers/character/characterCtrl.js',
        './public/angular/controllers/comicCharacter/comicCharacterCtrl.js',
        './public/angular/controllers/userRates/userRatesCtrl.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('ng-app-uglify.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});



gulp.task('default', ['js-uglify'], function(){});
gulp.task('default', ['less', 'watch']);