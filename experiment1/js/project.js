// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

const fillers = {
  adventurer: ["Galactus", "Einstein", "Penrose", "Fermi", "Cosmo", ""],
  pre: ["Neutro", "Mali", "Galacto", "Astro"],
  post: ["gloria", "borus", "gladios","diria"],
  people: ["Malinians", "Empyreans", "Arcadians", "Celestians"],
  ship: ["The Nomius", "The Mighty Voyager", "The Bastion", "The Polaris"],
  threat: ["supermassive black hole", "gamma ray burst", "comet", "solar flare", "supernova"],
  num: ["10", "100", "1,000", "5,000", "10,000", "25,000", "50,000"],
  currency: ["Astreums", "Avalons", "Metamatter", "Geodes"],
  obstacles: ["asteroids", "dead planet fragments", "neutron stars", "red giants", "white dwarf star"],
  message: ["distress call", "distress beacon", "cosmic plead", "nova alert"],
  
};

const template = `$adventurer, I have received a $message from the planet $pre$post.

It appears the $people that reside on that planet have assembled their first crew and launched their spacecraft into the cosmos, but that spacecraft is now being threatened by a $threat!

I need you to take your ship, $ship, and travel at lightspeed to the threatened spacecraft before it's too late!

Ensure that the crew returns to $planet safely, and I shall reward you with $num $currency. Oh, and try not to run into any $obstacles on the way there!
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

$("#box").text(story);
}
$("#clicker").click(generate);
generate();


// let's get this party started - uncomment me
main();