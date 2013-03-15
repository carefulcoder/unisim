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

exports.mainMenu = function(game) {
    var ui = require('ui/mainMenu.js');
    
    
    var mainMenuUi = new ui.MainMenu(game);

    game.menuContainer.addElement('mainMenu', mainMenuUi, Math.floor(game.menuContainer.getWidth() / 2) - 200, Math.floor(game.menuContainer.getHeight() / 2) - 200);

    /**
     * Gives the UI its list of saves from the server.
     * @param {Object} saves List of save names to choose from.
     */
    this.savelistEvent = function(saves) {
        if (game.mainMenu) {
            console.log('hm');
            mainMenuUi.setSaves(saves);
        }
    };
    
    /**
     * Kicked by the Client paint event,
     * which is roughly 60fps.
     * @param {object} g Object containing graphics context.
     */
    this.paintEvent = function(g) {
        
    };
};
