/*
Copyright 2012, 2013 Jake Blatchford, Mike Garwood, Will Oliver, Jonathan Scherrer, Tom Verran

This file is part of Unisim.

Unisim is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Unisim is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Unisim.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * A module to manage connected servers
 * @param {object} game Shared server objects.
 * @constructor
 */
exports.connections = function(game) {

    /**
     * Called when the server connects, sends them a request for details.
     * @param {object} msg The msg from the server.
     * @param {object} client The server.
     */
    game.server.on('connections', 'connect', function(msg, client) {
        client.send('connections', 'requestDetails', {});
    });

    /**
     * Called when the server sends its details.
     * @param {object} msg The msg from the server.
     * @param {object} client The server.
     */
    game.server.on('connections', 'sendDetails', function(msg, client) {
        game.servers[msg.name] = {details: msg.details, client: client, alive: true};
        game.servers[msg.name].details.address = msg.address;
    });

    /**
     * Called by the server each loop iteration
     */
    game.scheduler.on('tick', function() {
        for (var key in game.servers) {
            if (game.servers[key].alive) {
                game.servers[key].alive = false;
                game.servers[key].client.send('connections', 'requestDetails', {});
            } else {
                delete game.servers[key];
            }
        }
    });
};
