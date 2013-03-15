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

'use strict';

// Require in our Encoder
var Encoder = require('encoder.js');

/**
 * A Server object to wrap a socket
 * @param {object} socket A Socket.io socket.
 * @constructor
 */
var Server = function(socket) {

    /**
     * A socket.io socket
     * @type {object}
     */
    var skt = socket;

    /**
     * Send some data - a verb & optional message
     * @param {string} res The resource to send.
     * @param {string} verb The verb to send.
     * @param {object=} message The message.
     *
     */
    this.send = function(res, verb, message) {
        skt.emit('message', Encoder.encode(res, verb, message));
    };
};

/**
 * Create a client object
 * @param {Router} router The router.
 * @param {Repository} repo The module repository.
 * @param {object} game Shared game data.
 * @constructor
 */
exports.Client = function(router, repo, game) {

    //create websocket to server to test module events
    var socket = io.connect(window.location);
    
    //Whether the game has loaded on the client
    var loaded = false;
    
    //Unrouted message cache
    var cache = new Array();

    //general message callback
    socket.on('message', function(data) {
        var decoded = Encoder.decode(data);
        
        //We must wait for this message to be recieved before loading modules
        if (decoded.verb == 'sendDetails'){
            game.config = decoded.msg;
            game.redraw = true;
            repo.load();
            loaded = true;
        } else if (!loaded) {
            //while waiting for the sendDetails message, some other messages may not be routed, so cache them to be routed later
            cache.push(decoded);
        } else if (cache.length != 0) {
            //Route the cached messages
            for (var i=0; i<cache.length; i++) {
                router.route(cache[i], new Server(socket));
            }
            cache = 0;
        }
        
        if (loaded) {
            router.route(decoded, new Server(socket));
        }
    });

    //callback for connections
    socket.on('connect', function() {
        router.route({res: null, verb: 'connect', msg: {}}, new Server(socket));
    });

    socket.on('disconnect', function() {
       alert('Lost connection to server. The page will now attempt to reload.');
       location.reload(); //force hard refresh.
    });

    /**
     * Get a server to send data to
     * @return {object} The server object.
     */
    this.getServer = function() {
        return new Server(socket);
    };
};
