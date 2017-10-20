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
    gui.add(Choices, 'spiders').onChange(function(value){spidervisible(value)});
    gui.add(Choices, 'dolls').onChange(function(value){dollchokevisible(value)});
    gui.add(Choices, 'darkness').onChange(function(value){toggledarkness(value)});
    gui.add(Choices, 'renderclaustrofobia');



// gui.add(, 'renderspider').onChange(function(value){checkmenurenderaan;});