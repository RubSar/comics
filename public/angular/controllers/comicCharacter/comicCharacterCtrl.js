/**
 * Created by Ruben on 11/20/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi')
        .controller('ComicCharacterCtrl', ['$scope', '$window', '$state', '$rootScope', '$location', '$sce', 'ComicCharactersSvc', 'VoteSvc', '$auth',
            function ($scope, $window, $state, $rootScope, $location, $sce, ComicCharactersSvc, VoteSvc, $auth) {


                $scope.activeTab = 0;
                $scope.dataHref = function () {
                    var url = $location.absUrl();
                    return url.replace('localhost:3000', 'imovieui.com');
                };

                $scope.voteStart = false;
                $scope.contentLoaded = false;
                $window.document.title = 'Vote for the best actor of ' + $state.params.name + ' | iMovieUi';


                $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

                $scope.isActiveTab = function (index) {
                    return $scope.activeTab == index;
                };

                $scope.selectArtist = function (index) {
                    $scope.activeTab = index;
                    $scope.currentArtist = $scope.character.actors[index];
                    if (!!$scope.currentArtist.about && typeof($scope.currentArtist.about) === 'string') {
                        $scope.currentArtist.about = $sce.trustAsHtml($scope.currentArtist.about);
                    }
                };

                ComicCharactersSvc.getSingle($state.params.name)
                    .then(function (response) {
                        $scope.character = response.data;
                        $scope.currentArtist = $scope.character.actors[0];
                        $scope.currentArtist.about = $sce.trustAsHtml($scope.currentArtist.about);
                        $scope.character.about = $sce.trustAsHtml($scope.character.about);
                        $scope.contentLoaded = true;
                        getUserRate();
                    }, function (err) {
                        console.log(err);
                    });

                $scope.vote = function (artistId, same) {
                    if ($scope.isAuthProp) {

                        if (same) {
                            return;
                        }
                        $scope.voteStart = true;
                        var dto = {
                            artistId: artistId,
                            characterId: $scope.character._id
                        };
                        VoteSvc.vote(dto)
                            .then(function (response) {
                                $scope.voteStart = false;
                                $scope.character.actors.filter(function (artist) {
                                    if (artist._id == response.value) {
                                        artist.votedByUser = true;
                                        artist.votesCount += 1;
                                    } else if (artist.votedByUser) {
                                        artist.votesCount -= 1;
                                        delete  artist.votedByUser;
                                    }
                                })
                            }, function (err) {
                                console.log(err);
                            });
                    } else {
                        $rootScope.$broadcast('trigger-modal');
                    }
                };

                $scope.$watch('isAuthProp', function (newVal, oldVal) {
                    if (newVal && oldVal != newVal) {
                        if ($scope.character) {
                            getUserRate();
                        }
                    }
                }, true);

                $scope.fullName = function (artist) {
                    return artist.firstName + ' ' + artist.lastName;
                };

                $scope.shareOnFacebook = function () {

                    var description = 'Choose from ' + $scope.character.actors.length + ' actors who created the best character of ' + $scope.character.name;
                    FB.ui({
                        method: 'share',
                        display: 'popup',
                        href: $scope.dataHref(),
                        title: 'Vote for the best ' + $scope.character.name.toUpperCase() + ' actor.',
                        link: $scope.dataHref(),
                        picture: $scope.character.imgUrl,
                        description: description
                    });
                };

                function getUserRate() {
                    if ($scope.isAuthProp) {
                        VoteSvc.getUserVote($scope.character._id)
                            .then(function (response) {
                                $scope.character.actors.filter(function (artist) {
                                    if (!!response.data && artist._id == response.data.chosen) {
                                        artist.votedByUser = true;
                                    }
                                })
                            }, function (err) {
                                console.log(err);
                            })
                    }
                }

            }]);
})();