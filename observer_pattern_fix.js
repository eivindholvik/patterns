function Subject() {
  // This will contain our objects that are subscribed to
  // our subject
  this.observers = [];
}

Subject.prototype = {
  // This "subscribe" function adds objects to our
  // observer
  subscribe: function (functionToAdd) {
    this.observers.push(functionToAdd);
  },
  // This "unsubscribe" function removes objects to our
  // observer
  unsubscribe: function (functionToRemove) {
    const dummyArray = [];
    this.observers.forEach((currentFunction) => {
      if (currentFunction != functionToRemove) {
        dummyArray.push(currentFunction);
      }
    });
    this.observers = dummyArray;
  },
  // This "fire" function calls for all of our subscribed
  // objects to act
  fire: function () {
    this.observers.forEach((currentFunction) => {
      currentFunction.call();
    });
  },
};

// This example function will get added to the
// Subject
function ExampleFunction1() {
  console.log("Example function 1");
}

// This example function will also get added to the
// Subject
function ExampleFunction2() {
  console.log("Example function 2");
}

function ExampleFunction3() {
  console.log("Example function 3");
}

// Creating a new subject which we will add our
// example functions to
const subject = new Subject();

// Adding both of our example functions to our subject
subject.subscribe(ExampleFunction1);
subject.subscribe(ExampleFunction2);
subject.subscribe(ExampleFunction1);
subject.unsubscribe(ExampleFunction1);

// Firing our subject with a single function which
// will then cause both of our subscribed functions to
// react
subject.fire();
// Logs:
// Example function 1
// Example function 2
