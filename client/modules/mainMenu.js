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
 * This module shows a menu on the screen and handles user interaction with it
 * @param {object} game Shared game objects.
 * @constructor
 */
exports.mainMenu = function(game) {
    var ui = require('ui/mainMenu.js');

    var mainMenuUi = new ui.MainMenu(game);

    game.menuContainer.addElement('mainMenu', mainMenuUi, Math.floor(game.menuContainer.getWidth() / 2) - 200, Math.floor(game.menuContainer.getHeight() / 2) - 100);

    var gameWidth = game.world.getWidth() * 32;
    var gameHeight = game.world.getHeight() * 32;

    var load = require('lib/images.js');
    var loader = new load.ImageLoader();

    //load in the images we need to draw things
    var grass = loader.addImage('grass.png');

    loader.load();
    /**
     * Gives the UI its list of saves from the server.
     * @param {Object} saves List of save names to choose from.
     */
    this.savelistEvent = function(saves) {
        if (game.mainMenu) {
            mainMenuUi.setSaves(saves);
        }
    };

    /**
     * Kicked by the Client paint event,
     * which is roughly 60fps.
     * @param {object} g Object containing graphics context.
     */
    this.paintEvent = function(g) {
        if (game.mainMenu) {
            for (var x = 0; x < gameWidth; x += 30) {
                for (var y = 0; y < gameHeight; y += 30) {
                    g.context.drawImage(grass, x, y);
                }
            }
        }
    };
};
