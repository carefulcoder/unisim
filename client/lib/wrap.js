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
 * Text wrapping function for HTML5 canvas.
 * Modified from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/ to support \n
 * @param {object} context The canvas context to wrap text within.
 * @param {String} text The actual text to wrap.
 * @param {number} x The x position to begin drawing.
 * @param {number} y The y position to begin drawing.
 * @param {number} maxWidth Maximum line width.
 * @param {number=20} lineHeight The line height.
 */
exports.drawWrappedText = function(context, text, x, y, maxWidth, lineHeight) {

    text = text.toString();
    if (typeof lineHeight == 'undefined') {
        lineHeight = 20;
    }

    //get text height, split into words.
    var words = text.split(' ');
    var line = '';

    //go through every word, adding to a line
    for (var n = 0; n < words.length; n++) {

        //see if our line would overflow
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        //note - we don't bother trying to break if we only have one word.
        //break onto a new line if the text is going to be too long or if the word ends with a newline
        if (words.length > 1 && (testWidth > maxWidth || (n > 0 && words[n - 1].charAt(words[n - 1].length - 1) == '\n'))) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
};
