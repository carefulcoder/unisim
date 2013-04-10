var basicElements = require('../lib/UiElements.js');

/**
 * A UI to display various types of buildings
 * and to fire events when the user picks one.
 * @param {json} game JSON object representing client shared game objects.
 * @constructor
 */
exports.MainMenu = function(game) {

    // Call parent constructor
    basicElements.Menu.call(this, 400, 230, 'Main Menu');
    var list = new basicElements.List(180, 230);
    this.addElement('list', list, 10, 10);

    var label = new basicElements.Label(400, 20, '');
    label.setCentered(true);
    label.setText('Welcome to unisim! \n You are playing on: ' + game.config.name);
    list.addElement('LabelCourses', label, 0, 0);

    var newGame = new basicElements.Button(380, 40, 'New Game');
    list.addElement('New Game', newGame, 5, 50);

    newGame.addListener('mouseup', function(e) {
        if (game.mainMenu) {
            game.server.send(null, 'newWorld', {msg: null});
            game.server.send(null, 'loaded', {msg: null});
        }
        game.mainMenu = false;
        game.menuClosed = true;
    });

    var continueGame = new basicElements.Button(380, 40, 'Continue Game');
    list.addElement('Continue Game', continueGame, 5, 100);

    continueGame.addListener('mouseup', function(e) {
        if (game.mainMenu) {
            game.server.send(null, 'loaded', {msg: null});
        }
        game.mainMenu = false;
        game.menuClosed = true;
    });

    var loadGame = new basicElements.Button(380, 40, 'Load Game');
    list.addElement('Load Game', loadGame, 5, 150);

    var saveload = require('../ui/saveload.js');
    var load = new saveload.Saveload(game);
    load.setVisible(false);

    loadGame.addListener('mouseup', function(e) {
        if (load.isVisible()) {
            load.setVisible(false);
        } else {
            game.menuContainer.addElement('load', load, Math.floor(game.menuContainer.getWidth() / 2) - 125, Math.floor(game.menuContainer.getHeight() / 2) + 120);
            load.setVisible(true);
            game.server.send('saveload', 'getsaves', null);
        }
    });

    this.distributeChildren(true, 10, 10);
    this.setSaves = function(saves) {
        load.setSaves(saves);
    };
};

//setup menu prototype info.
exports.MainMenu.prototype = new basicElements.Menu;

/**
 * Prototype constructor.
 * @type {function}
 */
exports.MainMenu.prototype.constructor = exports.MainMenu;
