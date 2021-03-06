/**
 * Created by User on 11/14/2016.
 */
var express = require('express');
var voteApi = express.Router();

var User = require('../models/movieCharacterModel').User;
var models = require('../models/comicCharacterModel');
var ComicCharacter = models.ComicCharacter;
var Vote = models.Vote;

var auth = require('../services/authService');

var router = function () {

    voteApi.post('/set', function (req, res) {

        var id = auth.user(req);
        if (id) {
            User.findOne({_id: id}, function (err, user) {

                var characterQuery = {_id: req.body.characterId};
                ComicCharacter.findOne(characterQuery).exec(function (err, character) {
                    if (err) {
                        console.log(err);
                    }
                    if (character) {
                        Vote.findOne({userId: user._id, characterId: character._id}).exec(function (err, vote) {
                            if (err) {
                                console.log(err);
                            }
                            if (vote) {
                                if (vote.chosen !== req.body.artistId) {
                                    character.actors.filter(function (artist) {
                                        if (artist._id == req.body.artistId) {
                                            artist.votesCount += 1;
                                        } else if (artist._id == vote.chosen) {
                                            console.log(artist._id == vote.chosen);
                                            artist.votesCount -= 1;
                                        }
                                    });
                                    character.save();
                                    vote.chosen = req.body.artistId;
                                    vote.save();
                                    res.send({
                                        message: 'updated',
                                        success: true,
                                        value: vote.chosen,
                                        status: 200
                                    })
                                } else {
                                    res.send({
                                        message: 'unchanged',
                                        success: true,
                                        value: vote.chosen,
                                        status: 200
                                    })
                                }
                            } else {
                                var newVote = new Vote();
                                newVote.userId = user._id;
                                newVote.characterId = req.body.characterId;
                                newVote.chosen = req.body.artistId;
                                newVote.save(function (err, doc) {
                                    character.votes.push(doc._id);
                                    character.actors.filter(function (artist) {
                                        if (artist._id == req.body.artistId) {
                                            artist.votesCount += 1;
                                        }
                                    });
                                    user.votes.push(doc._id);
                                    user.save();
                                    character.save();
                                    res.send({
                                        message: 'created',
                                        success: true,
                                        value: newVote.chosen,
                                        status: 200
                                    })
                                });

                            }
                        });
                    } else {
                        res.send({
                            message: 'character not found',
                            success: false,
                            status: 200
                        })
                    }

                });
            });

        }
        else {
            res.send({
                status: 401,
                message: 'unauthenticated'
            });

        }

    });

    voteApi.get('/user', function (req, res) {
        var id = auth.user(req);
        if (id) {
            Vote.findOne({characterId: req.query.characterId, userId:id}, 'chosen', function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.send({
                    data: result,
                    success: true,
                    status: 200
                });
            });
        } else {
            res.send({
                status: 401,
                message: 'unauthenticated'
            });
        }


    });


    return voteApi;
};

module.exports = router();