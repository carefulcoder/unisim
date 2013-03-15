/**
 * Simply responds to messages for requesting server details
 * @param {object} game Shared game objects.
 * @constructor
 */
exports.details = function(game) {

    'use strict';
    /**
     * Send the server config properties to the client
     * @param {object} message The config properties.
     * @param {object} client The client that connected.
     *
     */
    game.server.on('details', 'connect', function(message, client) {
        client.send('details', 'sendDetails', game.config);
    });
};
