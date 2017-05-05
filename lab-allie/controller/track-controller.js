'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
// const Track = require('../model/track.js');
const Album = require('../model/album.js');

module.exports = exports = {};

exports.createTrack = function(albumId, track, res) {
  if(!track) return Promise.reject(createError(400, 'Album required'));
  
  Album.findByIdAndAddTrack(albumId, track)
  .then(newTrack => {
    res.json(newTrack);
    console.log('new track', newTrack);
  })
  .catch(() => Promise.reject(createError(500, 'Error saving track in mongo')));
};

exports.fetchTrack = function(albumId, trackId, res) {
  if(!albumId) return Promise.reject(createError(400, 'Album ID required'));
  // if(!trackId) return Promise.reject(createError(400, 'Track ID required'));
  
  Album.findAlbumAndFindTrack(albumId, trackId)
  .then(fetchedTrack => {
    console.log('fetched track', res.json(fetchedTrack));
    return fetchedTrack;
  })
  .catch(() => Promise.reject(createError(500, 'Error getting track from mongo')));
};

exports.fetchAllTracks = function() {};

exports.updateTrack = function() {};

exports.removeTrack = function() {};




exports.fetchAlbum = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return Album.findById(id)
  .then(album => {
    res.json(album);
  })
  .catch(err => res.status(400).send(err.message));
};