/**
 * Created by Ruben on 11/17/2016.
 */

//movieCharacterCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('MovieCharacterCtrl', ['$scope', '$window', 'MovieCharacterSvs', 'RateSvc', '$auth', function ($scope, $window, MovieCharacterSvs, RateSvc, $auth) {

        var name = $window.location.pathname.split('/movie-character/')[1];
        $scope.rateValue = 1;
        $scope.dataHref = document.URL;
        $scope.contentLoaded = false;
        $scope.avgUpdate = false;


        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        MovieCharacterSvs.getMovieCharacter(name)
            .then(function (response) {
                $scope.character = response.character;
                $scope.userRate = response.userRate;
                $scope.rateAverage = $scope.character.ratesValue>0 ? $scope.character.ratesValue/$scope.character.ratesCount : 0;
                $scope.contentLoaded = true;
                var dto = {
                    movie: response.character.movies[0].name,
                    artist: response.character.playedBy,
                    year: response.character.movies[0].year
                };
                MovieCharacterSvs.getRecommended(dto)
                    .then(function (result) {
                        $scope.recommended = result.data;
                    }, function (err) {
                        console.log(err);
                    });

            }, function (err) {
                console.log(err);
            });

        $scope.rateFunction = function (value) {
            var dto = {
                value: value,
                characterId: $scope.character._id
            };
            $scope.avgUpdate = true;
            RateSvc.rate(dto)
                .then(function (response) {
                    if (response.success) {
                        if (response.message == 'created') {
                            $scope.character.ratesCount += 1;
                            $scope.character.ratesValue += response.value;
                            $scope.userRate = response.value;
                        }
                        else{
                            $scope.character.ratesValue+= response.dif;
                            $scope.userRate +=response.dif;
                        }

                        $scope.avgUpdate = false;
                        $scope.rateAverage = $scope.character.ratesValue>0 ? $scope.character.ratesValue/$scope.character.ratesCount : 0;
                    }
                }, function (err) {
                    console.log(err);
                })
        };

        $scope.$watch('userRate', function (newVal, oldVal) {
            if (newVal && newVal != oldVal) {
                $scope.rateValue = newVal;
            }
        });
    }]);
})();