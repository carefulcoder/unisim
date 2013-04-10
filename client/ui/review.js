var basicElements = require('../lib/UiElements.js');

/**
 * The review UI to change to previous states in the game in a certain time
 * period at set interval steps.
 * @param {Object} game - reference to game objects.
 * @constructor
 */
exports.Review = function(game) {

    basicElements.Menu.call(this, 250, 60, 'Review');

    var button = new basicElements.Button(40, 20, 'Close');
    var list;

    if (game != null) {
        var label = new basicElements.Label(100, 20, 'Querying save games from server...');
        this.addElement('loading', label, 50, 30);

        button.addListener('mouseup', function(e, self) {
            self.setVisible(false);
        }, this);
    }

    /**
     * Adds a list of review iterations to the UI for the user to choose from. Then updates the
     * UI to reflect this change.
     * @param {Number} reviews The json objects for each save name sent from the server.
     * @this {Review}.
     */
    this.setReviews = function(reviews) {
        this.removeElement('loading');
        list = new basicElements.List(240, reviews * 20);
        this.setSize(this.getWidth(), (reviews * 20) + 80);
        var reviewsList = [];
        for (var i = 0; i < reviews; i++) {
            reviewsList[i] = (i + 1) + ' minutes ago';
        }

        list.setItems(reviewsList);
        this.addElement('reviews', list, 5, 30);
        this.addElement('button', button, 105, this.getHeight() - 25);

        list.addListener('mouseup', function(e) {
            game.server.send('saveload', 'loadreview', list.getSelectedIndex());
            game.server.send(null, 'load', '');
        });
    };

};
