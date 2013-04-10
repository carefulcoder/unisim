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
 * A money module, for keeping
 * track of a player's money.
 * Our constructor isn't doing much
 * @param {object} game Shared game objects.
 * @constructor
 */
exports.money = function(game) {

    'use strict';

    /**
     * Send the money to the client when they load
     * @param {object} message The message sent to the server.
     * @param {object} client The client that connected.
     */
    game.server.on('money', 'loaded', function(message, client) {
        client.send('money', 'set', game.money.getBalance());
    });

    /**
     * Request a redownload of the money balance
     * @param {object} message The message sent to the server.
     * @param {object} client The client that connected.
     */
    game.server.on('money', 'redownload', function(message, client) {
        client.send('money', 'set', game.money.getBalance());
    });

    /**
     * Called by the server each loop iteration
     */
    game.scheduler.on('tick', function() {
        if (game.money.getChanged()) {
            game.server.broadcast('money', 'set', game.money.getBalance());
            game.money.setChanged(false);
        }
    });

    /**
     * Called when the client requests a new world
     * @param {object} message The message sent to the server.
     * @param {object} client The client that connected.
     *
     */
    game.server.on('building', 'newWorld', function(message, client) {
        game.money.initialize(game.startingMoney);
        client.send('money', 'redownload');
    });

    /**
     * Saves money module.
     */
    game.server.on('money', 'save', function(message, client) {
        var json = {money: game.money.getBalance()};
        game.saveload.save('money', message.savename, json);
    });

    /**
     * Load the money module's contents from file.
     * @param {object} msg The msg from the client.
     * @param {object} client The client.
     */
    game.server.on('money', 'load', function(msg, client) {
        var json = game.saveload.load('money', msg.savename);
        game.money.initialize(json.money);
        client.send('money', 'redownload');
    });
};
