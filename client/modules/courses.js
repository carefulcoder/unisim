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
 * Client Time Module
 * @param {object} game Shared game data.
 * @constructor
 */
exports.courses = function(game) {

    //Courses UI
    var ui = require('ui/courses.js');
    var coursesUI = null;

    var makeCoursesUI = function() {
        coursesUI = new ui.Courses(game);
        game.container.addElement('courses', coursesUI, -360, 210);
    };

    //Courses Button
    var uiElem = require('lib/UiElements.js');
    var coursesButton = new uiElem.Button(50, 20, 'Courses');
    coursesButton.addListener('mouseup', function(e) {
        if (coursesUI == null) {
            makeCoursesUI();
        } else if (coursesUI.isVisible()) {
            coursesUI.setVisible(false);
        } else {
            coursesUI.setVisible(true);
        }
    });

    game.container.addElement('coursesButton', coursesButton, 220, 10);

    /**
     * The sets the course data sent to us from the server!
     * @param {object} data The course data.
     */
    this.setEvent = function(data) {
        game.courses.fromJSON(data);
    };

    /**
     * Message to redraw the coursesUI.
     */
    this.redrawcoursesEvent = function() {
        makeCoursesUI();
    };

    /**
     * Message to redraw the coursesUI.
     */
    this.hidecoursesEvent = function() {
        coursesUI.setVisible(false);
    };

    /**
     * Server has told us if we are enrolled on a course
     * @param {object} data The course data - course and value.
     */
    this.enrolledEvent = function(data) {
        var courseName = data.course;
        var course = game.courses.getCourseByName(courseName);

        if (course != null) {
            course.setEnrolled(data.value);
            makeCoursesUI();
        }
    };

    /**
     * request a course redownload.
     */
    this.redownloadEvent = function() {
        game.server.send('courses', 'redownload', {});
    };

};
