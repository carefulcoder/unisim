var basicElements = require('../lib/UiElements.js');

/**
 * A UI to display various types of buildings
 * and to fire events when the user picks one.
 * @param {json} game JSON object representing client shared game objects.
 * @constructor
 */
exports.MainMenu = function(game) {

    // Call parent constructor
    basicElements.Menu.call(this, 400, 400, 'Main Menu');
    var list = new basicElements.List(180, 230);
    this.addElement('list', list, 10, 10);

    var label = new basicElements.Label(400, 20, '');
    label.setCentered(true);
    label.setText('Welcome to unisim! \n You are playing on: ' + game.config.name);
    list.addElement('LabelCourses', label, 0, 0);
    
    var newGame = new basicElements.Button(380, 40, 'New Game');
    list.addElement('New Game', newGame, 5, 50);
    
    newGame.addListener('mouseup', function(e) {
        game.mainMenu = false;
        game.menuClosed = true;
    });
    
    var loadGame = new basicElements.Button(380, 40, 'Load Game');
    list.addElement('Load Game', loadGame, 5, 100);
    
    var saveload = require('../ui/saveload.js');
    var load = null;
    
    loadGame.addListener('mouseup', function(e) {
        if (load != null && load.isVisible()) {
            load.setVisible(false);
        } else {
            load = new saveload.Saveload(game, 'Load');
            list.addElement('load', load, 70, 150);
            load.setVisible(true);
            game.server.send('saveload', 'getsaves', null);
            load.loadListen();
        }
    });
    
    this.distributeChildren(true, 10, 10);
    
    this.setSaves = function(saves) {
        load.setSaves(saves);
    }
};

//setup menu prototype info.
exports.MainMenu.prototype = new basicElements.Menu;

/**
 * Prototype constructor.
 * @type {function}
 */
exports.MainMenu.prototype.constructor = exports.MainMenu;
