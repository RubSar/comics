!function(){angular.module("iMovieUi",["satellizer","ui.router"]).config(["$authProvider","$httpProvider","$stateProvider","$locationProvider","$urlRouterProvider",function(e,t,a,r,o){t.interceptors.push("authInterceptor"),e.facebook({clientId:"175488799579769"}),a.state("home",{url:"/",templateUrl:"/angular/controllers/home/home.html",controller:"HomeCtrl"}).state("userRates",{url:"/myRates",templateUrl:"/angular/controllers/userRates/user.rates.html",controller:"UserRatesCtrl"}).state("search",{url:"/search?term",templateUrl:"/angular/controllers/search/search.html",controller:"SearchCtrl"}).state("comicsCharacter",{url:"/comics-character/:name",templateUrl:"/angular/controllers/comicsCharacter/comics.character.html",controller:"ComicsCharacterCtrl"}).state("character",{url:"/character/:longName",templateUrl:"/angular/controllers/character/character.html",controller:"CharacterCtrl"}).state("movieCharactersList",{url:"/most-popular-movie-characters?page",templateUrl:"/angular/controllers/movieCharactersList/movie.characters.list.html",controller:"MovieCharactersListCtrl"}).state("movieCharactersList.sorted",{url:"/:key/:value",templateUrl:"/angular/controllers/movieCharactersList/movie.characters.list.html",controller:"MovieCharactersListCtrl"}).state("tvSeriesCharactersList",{url:"/most-popular-tv-series-characters?page",templateUrl:"/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html",controller:"TvSeriesCharactersListCtrl"}).state("tvSeriesCharactersList.sorted",{url:"/:key/:value",templateUrl:"/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html",controller:"TvSeriesCharactersListCtrl"}),o.otherwise("/"),r.html5Mode({enabled:!0,requireBase:!1})}])}(),function(){angular.module("iMovieUi").factory("authToken",["$window",function(e){var t,a=e.localStorage,r="satellizer_token",o=!1,n={setToken:function(e){t=e,a.setItem(r,e),o=!0},getToken:function(){return t||(t=a.getItem(r)),t},isAuthenticated:function(){return!!n.getToken()},removeToken:function(){t=null,a.removeItem(r),o=!1}};return n}])}(),function(){angular.module("iMovieUi").factory("authInterceptor",["authToken",function(e){return{request:function(t){var a=e.getToken();return a&&(t.headers.Authorization="Bearer "+a),t},response:function(e){return e}}}])}(),function(){angular.module("iMovieUi").factory("helperSvc",["$http","$q",function(e,t){function a(a){var r=t.defer();return e(a).success(function(e,t,a,o){r.resolve(e)}).error(function(e,t,a,o){r.reject(t)}),r.promise}function r(e,t){for(var a=[],r=0;r<e.length;r+=t)a.push(e.slice(r,r+t));return a}function o(e,t){if(1==arguments.length)return Math.round(e);var a=Math.pow(10,t);return Math.round(e*a)/a}function n(){return window.innerWidth>768}return{requestHandler:a,chunk:r,decimalRound:o,isDesktop:n}}])}(),function(){angular.module("iMovieUi").factory("MovieCharacterSvs",["helperSvc",function(e){function t(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/top"})}function a(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/artists"})}function r(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/movies"})}function o(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/years"})}function n(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/list",params:t})}function i(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/single",params:{name:t}})}function s(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/search",params:t})}function c(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/recommended",params:t})}return{getTopCharacters:t,getArtists:a,getMovies:r,getOrderedYears:o,getCharactersList:n,getMovieCharacter:i,getRecommended:c,search:s}}])}(),function(){angular.module("iMovieUi").factory("TvSeriesCharacterSvs",["helperSvc",function(e){function t(){return e.requestHandler({method:"GET",url:"/api/tvSeriesCharacter/top"})}function a(){return e.requestHandler({method:"GET",url:"/api/tvSeriesCharacter/movies"})}function r(t){return e.requestHandler({method:"GET",url:"/api/tvSeriesCharacter/list",params:t})}function o(t){return e.requestHandler({method:"GET",url:"/api/tvSeriesCharacter/single",params:{name:t}})}function n(t){return e.requestHandler({method:"GET",url:"/api/tvSeriesCharacter/search",params:t})}function i(t){return e.requestHandler({method:"GET",url:"/api/tvSeriesCharacter/recommended",params:t})}return{topCharacters:t,movies:a,charactersList:r,tvSeriesCharacter:o,getRecommended:i,searchCharacters:n}}])}(),function(){"use strict";angular.module("iMovieUi").factory("ComicsCharactersSvc",["helperSvc",function(e){function t(){return e.requestHandler({method:"GET",url:"/api/comicsCharacters/all"})}function a(t){return e.requestHandler({method:"GET",url:"/api/comicsCharacters/single",params:{name:t}})}function r(t){return e.requestHandler({method:"GET",url:"/api/comicsCharacters/search",params:t})}return{getAll:t,getSingle:a,search:r}}])}(),function(){"use strict";angular.module("iMovieUi").factory("RateSvc",["helperSvc",function(e){function t(t){return e.requestHandler({method:"POST",url:"/api/rate/set",data:t})}function a(t){return e.requestHandler({method:"GET",url:"/api/rate/rates",params:{characterId:t}})}function r(t){return e.requestHandler({method:"Post",url:"/api/rate/userRatesByCharacters",data:{movies:t}})}function o(t){return e.requestHandler({method:"GET",url:"/api/rate/userRate",params:{characterId:t}})}return{rate:t,getRates:a,userRate:o,userRatesForCharacters:r}}])}(),function(){"use strict";angular.module("iMovieUi").factory("VoteSvc",["helperSvc",function(e){function t(t){return e.requestHandler({method:"POST",url:"/api/vote/set",data:t})}function a(t){return e.requestHandler({method:"GET",url:"/api/vote/user",params:{characterId:t}})}return{vote:t,getUserVote:a}}])}(),function(){"use strict";angular.module("iMovieUi").factory("UserSvc",["helperSvc",function(e){function t(t){return e.requestHandler({method:"GET",url:"/api/user/rates",params:t})}function a(){return e.requestHandler({method:"GET",url:"/api/user/topRatings"})}return{userRates:t,ratings:a}}])}(),function(){angular.module("iMovieUi").directive("mcDropdown",function(){return{scope:{onChange:"&",itemsList:"=",term:"@",label:"@",key:"@"},link:function(e,t,a){e.$watch("itemsList",function(t,a){t&&t.length&&(e.itemIsArray=Array.isArray(e.itemsList[0][e.term]))},!0),e.setModel=function(t){e.itemIsArray&&(t=t[0]),e.onChange({param:{term:e.key,value:t}})}},templateUrl:"/angular/directives/dropdown/dropdown.html"}})}(),function(){"use strict";angular.module("iMovieUi").directive("starRating",["$auth","$rootScope",function(e,t){return{restrict:"E",scope:{ratingValue:"=",max:"=",userRate:"=",onRatingSelected:"&"},link:function(a,r,o){a.max=a.max||10,a.ratingValue=a.ratingValue||1,a.isAuthenticated=function(){return e.isAuthenticated()},a.triggerModal=function(){t.$broadcast("trigger-modal")};var n=function(){a.stars=[];for(var e=0;e<a.max;e++)a.stars.push({filled:e<a.ratingValue})};a.toggle=function(e){a.rateMode=!1,a.ratingValue=e+1,a.onRatingSelected({rating:e+1})},a.$watch("ratingValue",function(e,t){t&&n()})},templateUrl:"/angular/directives/starRating/rating.html"}}])}(),function(){"use strict";angular.module("iMovieUi").directive("character",["RateSvc","helperSvc",function(e,t){return{restrict:"E",scope:{model:"="},link:function(a,r,o){a.rateValue=1,a.avgUpdate=!1,a.$watch("model.userRate",function(e,t){e&&e!=t&&(a.rateValue=e)}),a.imgTitle=a.model.name+" played by "+a.model.playedBy+" in "+a.model.movies[0].name,a.rateAverage=a.model.ratesValue>0?t.decimalRound(a.model.ratesValue/a.model.ratesCount,1):0,a.rateFunction=function(r){var o={value:r,characterId:a.model._id};a.avgUpdate=!0,e.rate(o).then(function(e){e.success&&("created"==e.message?(a.model.ratesCount+=1,a.model.ratesValue+=e.value):a.model.ratesValue+=e.dif,a.avgUpdate=!1,a.rateAverage=a.model.ratesValue>0?t.decimalRound(a.model.ratesValue/a.model.ratesCount,1):0)},function(e){console.log(e)})}},templateUrl:"/angular/directives/character/character.html"}}])}(),function(){"use strict";angular.module("iMovieUi").directive("modal",function(){return{template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body" ng-transclude></div></div></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(e,t,a){e.$watch(a.visible,function(e){1==e?$(t).modal("show"):$(t).modal("hide")}),$(t).on("shown.bs.modal",function(){e.$apply(function(){e.$parent[a.visible]=!0})}),$(t).on("hidden.bs.modal",function(){e.$apply(function(){e.$parent[a.visible]=!1})})}}})}(),function(){"use strict";angular.module("iMovieUi").directive("paging",function(){function e(e,t,a){e.$watchCollection("[page,pageSize,total,disabled]",function(){d(e,a)})}function t(e,t){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(t.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-class="Item.aClass" data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'}function a(e,t){e.List=[],e.Hide=!1;var a=window.innerWidth<529?1:2;e.page=parseInt(e.page)||1,e.total=parseInt(e.total)||0,e.adjacent=parseInt(e.adjacent)||a,e.pgHref=e.pgHref||"",e.dots=e.dots||"...",e.ulClass=e.ulClass||"pagination",e.activeClass=e.activeClass||"active",e.disabledClass=e.disabledClass||"disabled",e.textFirst=e.textFirst||"<<",e.textLast=e.textLast||">>",e.textNext=e.textNext||">",e.textPrev=e.textPrev||"<",e.textFirstClass=e.textFirstClass||"",e.textLastClass=e.textLastClass||"",e.textNextClass=e.textNextClass||"",e.textPrevClass=e.textPrevClass||"",e.textTitlePage=e.textTitlePage||"Page {page}",e.textTitleFirst=e.textTitleFirst||"First Page",e.textTitleLast=e.textTitleLast||"Last Page",e.textTitleNext=e.textTitleNext||"Next Page",e.textTitlePrev=e.textTitlePrev||"Previous Page",e.hideIfEmpty=r(e,t.hideIfEmpty),e.showPrevNext=r(e,t.showPrevNext),e.showFirstLast=r(e,t.showFirstLast),e.scrollTop=r(e,t.scrollTop),e.isDisabled=r(e,t.disabled)}function r(e,t){return!!angular.isDefined(t)&&!!e.$parent.$eval(t)}function o(e,t){e.page>t&&(e.page=t),e.page<=0&&(e.page=1),e.adjacent<=0&&(e.adjacent=2),t<=1&&(e.Hide=e.hideIfEmpty)}function n(e,t){e.page!=t&&(e.isDisabled||(e.page=t,e.pagingAction({params:{page:e.page,pageSize:e.pageSize,total:e.total}}),e.scrollTop&&scrollTo(0,0)))}function i(e,t,a){if(!(!e.showPrevNext&&!e.showFirstLast||t<1)){var r,o,i;if("prev"===a){r=e.page-1<=0;var s=e.page-1<=0?1:e.page-1;e.showFirstLast&&(o={value:e.textFirst,title:e.textTitleFirst,aClass:e.textFirstClass,page:1}),e.showPrevNext&&(i={value:e.textPrev,title:e.textTitlePrev,aClass:e.textPrevClass,page:s})}else{r=e.page+1>t;var c=e.page+1>=t?t:e.page+1;e.showPrevNext&&(o={value:e.textNext,title:e.textTitleNext,aClass:e.textNextClass,page:c}),e.showFirstLast&&(i={value:e.textLast,title:e.textTitleLast,aClass:e.textLastClass,page:t})}var l=function(t,a){return{title:t.title,aClass:t.aClass,value:t.aClass?"":t.value,liClass:a?e.disabledClass:"",pgHref:a?"":e.pgHref.replace(h,t.page),action:function(){a||n(e,t.page)}}};if(e.isDisabled&&(r=!0),o){var u=l(o,r);e.List.push(u)}if(i){var d=l(i,r);e.List.push(d)}}}function s(e,t,a){var r=0;for(r=e;r<=t;r++){var o=a.pgHref.replace(h,r),i=a.page==r?a.activeClass:"";a.isDisabled&&(o="",i=a.disabledClass),a.List.push({value:r,title:a.textTitlePage.replace(h,r),liClass:i,pgHref:o,action:function(){n(a,this.value)}})}}function c(e){e.List.push({value:e.dots,liClass:e.disabledClass})}function l(e,t){s(1,2,e),3!=t&&c(e)}function u(e,t,a){a!=e-2&&c(t),s(e-1,e,t)}function d(e,t){(!e.pageSize||e.pageSize<=0)&&(e.pageSize=1);var r=Math.ceil(e.total/e.pageSize);a(e,t),o(e,r);var n,c,d=2*e.adjacent+2;i(e,r,"prev"),r<=d+2?(n=1,s(n,r,e)):e.page-e.adjacent<=2?(n=1,c=1+d,s(n,c,e),u(r,e,c)):e.page<r-(e.adjacent+2)?(n=e.page-e.adjacent,c=e.page+e.adjacent,l(e,n),s(n,c,e),u(r,e,c)):(n=r-d,c=r,l(e,n),s(n,c,e)),i(e,r,"next")}var h=/\{page\}/g;return{restrict:"EA",link:e,template:t,scope:{page:"=",pageSize:"=",total:"=",disabled:"@",dots:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textFirstClass:"@",textLastClass:"@",textNextClass:"@",textPrevClass:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}}})}(),function(){angular.module("iMovieUi").directive("owlCarousel",function(){return{restrict:"E",transclude:!1,link:function(e){e.initCarousel=function(e){var t={loop:!0,margin:15,responsive:{0:{items:1},500:{items:2},650:{items:3},850:{items:4},1024:{items:4},1270:{items:4}},navText:[,],nav:!0,dots:!1,navContainerClass:"owl-buttons"};$(e).owlCarousel(t)}}}})}(),function(){angular.module("iMovieUi").directive("owlCarouselItem",["$timeout",function(e){return{restrict:"A",transclude:!1,link:function(t,a){t.$last&&e(function(){t.initCarousel(a.parent())},500)}}}])}(),function(){angular.module("iMovieUi").controller("headerCtrl",["$scope","$state","$auth","$rootScope",function(e,t,a,r){e.authenticate=function(t){e.showModal=!1,a.authenticate(t)},e.isAuthenticated=function(){return a.isAuthenticated()},e.showModal=!1,e.$on("trigger-modal",function(t){e.showModal=!e.showModal}),e.logOut=function(){a.logout()},e.makeSearch=function(){e.searchTerm.length&&t.go("search",{term:e.searchTerm})}}])}(),function(){"use strict";angular.module("iMovieUi").controller("HomeCtrl",["$scope","$timeout","$window","MovieCharacterSvs","TvSeriesCharacterSvs","ComicsCharactersSvc","helperSvc","RateSvc","$auth",function(e,t,a,r,o,n,i,s,c){function l(t){for(var a=0;a<t.length;a++)for(var r=0;r<e.originalMovieCharacters.length;r++)t[a].characterId==e.originalMovieCharacters[r]._id&&(e.originalMovieCharacters[r].userRate=t[a].value)}function u(t){for(var a=0;a<t.length;a++)for(var r=0;r<e.originalTvSeriesCharacters.length;r++)t[a].characterId==e.originalTvSeriesCharacters[r]._id&&(e.originalTvSeriesCharacters[r].userRate=t[a].value)}function d(){if(e.originalTvSeriesCharacters&&e.authState){var t=e.originalTvSeriesCharacters.map(function(e){return{_id:e._id}});s.userRatesForCharacters(t).then(function(e){e.success&&u(e.data)},function(e){console.log(e)})}}function h(){if(e.originalMovieCharacters&&e.authState){var t=e.originalMovieCharacters.map(function(e){return{_id:e._id}});s.userRatesForCharacters(t).then(function(e){e.success&&l(e.data)},function(e){console.log(e)})}}e.comicsCharactersLoaded=!1,e.movieCharactersLoaded=!1,e.tvSeriesCharactersLoaded=!1,e.authState=!1,a.document.title="iMovieUi: Most popular movie and tv-series characters",r.getTopCharacters().then(function(t){e.originalMovieCharacters=t.data,e.movieCharactersLoaded=!0},function(e){console.log(e)}),o.topCharacters().then(function(t){e.originalTvSeriesCharacters=t.data,e.tvSeriesCharactersLoaded=!0},function(e){console.log(e)}),n.getAll().then(function(a){e.comicsCharacters=a.data,t(function(){e.comicsCharactersLoaded=!0},400)},function(e){console.log(e)}),e.$watch("originalMovieCharacters",function(t,a){t&&(e.movieCharacters=i.chunk(t,2),h())},!0),e.$watch("originalTvSeriesCharacters",function(t,a){t&&(e.tvSeriesCharacters=i.chunk(t,2),d())},!0),e.isAuthenticated=function(){return c.isAuthenticated()},e.$watch("authState",function(e,t){e&&(h(),d())},!0)}])}(),function(){angular.module("iMovieUi").controller("SearchCtrl",["$scope","$sce","$window","$state","MovieCharacterSvs","ComicsCharactersSvc",function(e,t,a,r,o,n){e.movieCharactersContentLoaded=!1,e.comicCharactersContentLoaded=!1,a.document.title="iMovieUi: Most Popular Movie and TV-Series Characters",e.model=r.params.term,o.search({term:e.model}).then(function(t){e.characters=t.data,e.movieCharactersContentLoaded=!0},function(e){console.log(e)}),n.search({term:e.model}).then(function(t){e.comicCharacters=t.data,e.comicCharactersContentLoaded=!0},function(e){console.log(e)}),e.highlight=function(e,a){return a?t.trustAsHtml(e.replace(new RegExp(a,"gi"),'<span class="term">$&</span>')):t.trustAsHtml(e)},window.gl=e}])}(),function(){angular.module("iMovieUi").controller("MovieCharactersListCtrl",["$scope","$rootScope","$timeout","$state","$anchorScroll","$sce","MovieCharacterSvs","RateSvc","helperSvc","$auth","$window",function(e,t,a,r,o,n,i,s,c,l,u){function d(t){for(var a=0;a<t.length;a++)for(var r=0;r<e.originalMovieCharacters.length;r++)t[a].characterId==e.originalMovieCharacters[r]._id&&(e.originalMovieCharacters[r].userRate=t[a].value)}function h(){if(e.originalMovieCharacters&&e.authState){var t=e.originalMovieCharacters.map(function(e){return{_id:e._id}});s.userRatesForCharacters(t).then(function(e){e.success&&d(e.data)},function(e){console.log(e)})}}function m(){e.contentLoaded=!1,i.getCharactersList(e.model).then(function(t){e.originalMovieCharacters=t.data,e.listCharacters=c.chunk(t.data,2),e.count=t.count,e.contentLoaded=!0,o()},function(e){console.log(e)})}e.contentLoaded=!1,e.model={page:r.params.page||1},r.params.key&&r.params.value?(e.model.key=r.params.key,e.model.value=r.params.value,"playedBy"===r.params.key?(e.pageHeader=n.trustAsHtml("list of <strong>"+r.params.value+"</strong> top movie characters"),u.document.title="iMovieUi: List of "+r.params.value+" top characters"):"movies.year"===r.params.key?(e.pageHeader=n.trustAsHtml("Top movie characters of <strong>"+r.params.value+"</strong>"),u.document.title="iMovieUi: Top Movie Characters of "+r.params.value):"movies.name"===r.params.key&&(e.pageHeader=n.trustAsHtml("List of <strong>"+r.params.value+"</strong> top movie characters"),u.document.title="iMovieUi: List of "+r.params.value+" top Characters")):(u.document.title="iMovieUi: Most Popular Movie Characters",e.pageHeader=n.trustAsHtml("most popular <strong>movie characters</strong>")),m(),e.isAuthenticated=function(){return l.isAuthenticated()},i.getArtists().then(function(t){e.artists=t.data},function(e){console.log(e)}),i.getOrderedYears().then(function(t){e.years=t.data},function(e){console.log(e)}),i.getMovies().then(function(t){e.movies=t.data},function(e){console.log(e)}),e.getAll=function(){e.pageHeader=n.trustAsHtml("most popular <strong>movie characters</strong>"),u.document.title="iMovieUi: Most Popular Movie Characters",r.go("movieCharactersList",{page:1},{notify:!1}),e.model={page:1,key:null,value:null},m()},e.pagingChange=function(e){r.params.key?r.go("movieCharactersList.sorted",{page:e.page},{notify:!1}):r.go("movieCharactersList",{page:e.page},{notify:!1}),a(function(){m()})},e.$watch("authState",function(e,t){e&&h()},!0),e.setModel=function(t){"playedBy"===t.term?(e.pageHeader=n.trustAsHtml("list of <strong>"+t.value+"</strong> top movie characters"),u.document.title="iMovieUi: List of "+t.value+" top characters"):"movies.year"===t.term?(e.pageHeader=n.trustAsHtml("Top movie characters of <strong>"+t.value+"</strong>"),u.document.title="iMovieUi: Top Movie Characters of "+t.value):"movies.name"===t.term&&(e.pageHeader=n.trustAsHtml("List of <strong>"+t.value+"</strong> top characters"),u.document.title="iMovieUi: List of "+t.value+" top characters"),r.go("movieCharactersList.sorted",{page:1,key:t.term,value:t.value},{notify:!1}),e.model={page:1,key:t.term,value:t.value},m()},e.$watch("originalMovieCharacters",function(e,t){e&&h()},!0)}])}(),function(){angular.module("iMovieUi").controller("TvSeriesCharactersListCtrl",["$scope","$rootScope","$timeout","$state","$anchorScroll","TvSeriesCharacterSvs","RateSvc","helperSvc","$auth","$window",function(e,t,a,r,o,n,i,s,c,l){function u(t){for(var a=0;a<t.length;a++)for(var r=0;r<e.originalCharacters.length;r++)t[a].characterId==e.originalCharacters[r]._id&&(e.originalCharacters[r].userRate=t[a].value)}function d(){if(e.originalCharacters&&e.authState){var t=e.originalCharacters.map(function(e){return{_id:e._id}});i.userRatesForCharacters(t).then(function(e){e.success&&u(e.data)},function(e){console.log(e)})}}function h(){e.contentLoaded=!1,n.charactersList(e.model).then(function(t){e.originalCharacters=t.data,e.listCharacters=s.chunk(t.data,2),e.count=t.count,e.contentLoaded=!0,o()},function(e){console.log(e)})}e.contentLoaded=!1,l.document.title="iMovieUi: Most Popular TV-Series Characters",e.filteredBy={},e.model={page:r.params.page||1},r.params.key&&r.params.value?(e.model.key=r.params.key,e.model.value=r.params.value,l.document.title="iMovieUi: List of "+r.params.value+" characters"):l.document.title="iMovieUi: Most Popular TV-Series Characters",h(),e.searchTerm=e._searchTerm?decodeURI(e._searchTerm):"",e.isAuthenticated=function(){return c.isAuthenticated()},n.movies().then(function(t){e.movies=t.data},function(e){console.log(e)}),e.getAll=function(){l.document.title="iMovieUi: Most Popular TV-Series Characters",r.go("tvSeriesCharactersList",{page:1,key:void 0,value:void 0},{notify:!1}),e.filteredBy=void 0,e._searchTerm=void 0,e.model={page:1,key:null,value:null},h()},e.pagingChange=function(e){r.params.key?r.go("tvSeriesCharactersList.sorted",{page:e.page},{notify:!1}):r.go("tvSeriesCharactersList",{page:e.page},{notify:!1}),a(function(){h()})},e.$watch("authState",function(e,t){e&&d()},!0),e.setModel=function(t){l.document.title="iMovieUi: List of "+t.value+" characters",r.go("tvSeriesCharactersList.sorted",{page:1,key:t.term,value:t.value},{notify:!1}),t.page=1,e.model={page:1,key:t.term,value:t.value},h()},e.$watch("originalCharacters",function(e,t){e&&d()},!0)}])}(),function(){"use strict";angular.module("iMovieUi").controller("CharacterCtrl",["$scope","$window","$document","$state","MovieCharacterSvs","RateSvc","$auth","helperSvc",function(e,t,a,r,o,n,i,s){t.document.title=r.params.longName+" (iMovieUi)",e.contentLoaded=!1,e.notFound=!1,e.avgUpdate=!1,e.rateValue=1,e.dataHref=a.context.URL,e.isDesktop=s.isDesktop(),e.isAuthenticated=function(){return i.isAuthenticated()},e.$watch("authState",function(t,a){e.character&&t&&!e.userRate&&n.userRate(e.character._id).then(function(t){e.userRate=t.data.value},function(e){console.log(e)})}),o.getMovieCharacter(r.params.longName).then(function(t){if(t.success){if(e.contentLoaded=!0,e.character=t.character,e.userRate=t.userRate,e.rateAverage=e.character.ratesValue>0?s.decimalRound(e.character.ratesValue/e.character.ratesCount,1):0,e.fullName=e.character.name+" played by "+e.character.playedBy+" in "+e.character.movies[0].name,e.isDesktop){var a={movie:t.character.movies[0].name,artist:t.character.playedBy,year:t.character.movies[0].year};o.getRecommended(a).then(function(t){e.recommended=t.data},function(e){console.log(e)})}}else e.notFound=!0,e.message=t.message},function(e){console.log(e)}),e.rateFunction=function(t){var a={value:t,characterId:e.character._id};e.avgUpdate=!0,n.rate(a).then(function(t){t.success&&("created"==t.message?(e.character.ratesCount+=1,e.character.ratesValue+=t.value,e.userRate=t.value):(e.character.ratesValue+=t.dif,e.userRate+=t.dif),e.avgUpdate=!1,e.rateAverage=e.character.ratesValue>0?e.character.ratesValue/e.character.ratesCount:0)},function(e){console.log(e)})},e.shareOnFacebook=function(){var t=i.isAuthenticated()&&e.userRate?"My rating "+e.userRate+", ":"",a=e.character.name+" is a character from "+e.character.movies[0].name+" ("+e.character.movies[0].year+"). He is portrayed by "+e.character.playedBy+". "+t+" Rate Average : "+e.rateAverage+", Rates count : "+e.character.ratesCount;FB.ui({method:"feed",name:"Rate for "+e.character.name.toUpperCase(),link:e.dataHref,picture:e.character.imgUrl,description:a})},e.$watch("userRate",function(t,a){t&&t!=a&&(e.rateValue=t)})}])}(),function(){"use strict";angular.module("iMovieUi").controller("ComicsCharacterCtrl",["$scope","$window","$state","$rootScope","ComicsCharactersSvc","VoteSvc","$auth",function(e,t,a,r,o,n,i){function s(){e.isAuthProp&&n.getUserVote(e.character._id).then(function(t){e.character.actors.filter(function(e){e._id==t.data.chosen&&(e.votedByUser=!0)})},function(e){console.log(e)})}e.dataHref=document.URL,e.voteStart=!1,e.contentLoaded=!1,t.document.title="Vote for the best actor of "+a.params.name,e.isAuthenticated=function(){return i.isAuthenticated()},o.getSingle(a.params.name).then(function(t){e.character=t.data,e.contentLoaded=!0,s()},function(e){console.log(e)}),e.vote=function(t,a){if(e.isAuthProp){if(a)return;e.voteStart=!0;var o={artistId:t,characterId:e.character._id};n.vote(o).then(function(t){e.voteStart=!1,e.character.actors.filter(function(e){e._id==t.value?(e.votedByUser=!0,e.votesCount+=1):e.votedByUser&&(e.votesCount-=1,delete e.votedByUser)})},function(e){console.log(e)})}else r.$broadcast("trigger-modal")},e.$watch("isAuthProp",function(t,a){t&&a!=t&&e.character&&s()},!0),e.fullName=function(e){return e.firstName+" "+e.lastName},e.shareOnFacebook=function(){var t="Choose from "+e.character.actors.length+" actors who created the best character of "+e.character.name;FB.ui({method:"feed",name:"Vote for the best "+e.character.name.toUpperCase()+" actor.",link:e.dataHref,picture:e.character.imgUrl,description:t})}}])}(),function(){"use strict";angular.module("iMovieUi").controller("UserRatesCtrl",["$scope","UserSvc","RateSvc","helperSvc","$auth",function(e,t,a,r,o){e.contentLoaded=!1,o.isAuthenticated()?t.ratings().then(function(a){e.topRatings=a.data,e.curentRate=a.data[0],e.activeTab=e.curentRate._id,t.userRates({value:e.curentRate._id}).then(function(t){e.rateValue=t.data.value,e.characters=r.chunk(t.data.characters,4),e.contentLoaded=!0},function(e){console.log(e)})},function(e){console.log(e)}):window.location="/",e.getRates=function(a){e.activeTab=a,e.contentLoaded=!1,t.userRates({value:a}).then(function(t){e.rateValue=t.data.value,e.characters=r.chunk(t.data.characters,4),e.contentLoaded=!0},function(e){console.log(e)})},e.rateFunction=function(t,r){if(t!=e.rateValue){var o={value:t,characterId:r};a.rate(o).then(function(e){e.success&&console.log(e.value)},function(e){console.log(e)})}},e.isActiveTab=function(t){return e.activeTab==t}}])}();