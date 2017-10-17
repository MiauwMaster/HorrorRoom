/**
 * Horror Room, a WebVR experience
 * by Nick & Tobias
 */


var Choices = {
    spiders : false,
    claustrofobia : false,
    dolls : false,
    darkness : false
    // Define render logic ...
};

    var gui = new dat.GUI({width : 300});
    gui.add(Choices, 'spiders').onChange(function(value){checkmenu().renderspider = value;});
    gui.add(Choices, 'renderclaustrofobia');
    gui.add(Choices, 'renderdolls');
    gui.add(Choices, 'renderdarkness');


// gui.add(, 'renderspider').onChange(function(value){checkmenurenderaan;});