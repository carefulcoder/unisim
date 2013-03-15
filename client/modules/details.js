/**
 * Simply used to get server config details from the server
 * @param {object} game Shared game data.
 * @constructor
 */
exports.details = function(game) {

    'use strict';

    /**
     * Runs when the config properties are sent to us
     * @param {object} data The config properties.
     */
    this.senddetailsEvent = function(data) {
        game.config = data;
    };
};
