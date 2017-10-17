/**
 * Horror Room, a WebVR experience
 * by Nick & Tobias
 */


var Choices = function() {
    this.renderspider = false;
    this.renderclaustrofobia = false;
    this.renderdolls = false;
    this.renderdarkness = false;
    // Define render logic ...
};

window.onload = function() {
    var text = new Choices();
    var gui = new dat.GUI();
    gui.add(text, 'renderspider');
    gui.add(text, 'renderclaustrofobia');
    gui.add(text, 'renderdolls');
    gui.add(text, 'renderdarkness');
};