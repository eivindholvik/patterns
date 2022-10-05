// const modulePatternExample = (function () {
//   /* Private variables and methods */

//   // Private variable
//   let _privateVariable = "Private";

//   const _privateMethod = function () {
//     console.log("Private method");
//   };

//   /* Public variables and methods */
//   // These variables and methods added to the 'return'  so they can be accessed

//   // getter for private variable
//   function getPrivateVariable() {
//     return _privateVariable;
//   }

//   function setPrivateVariable(newPrivateVar) {
//     _privateVariable = newPrivateVar;

//     // Will lead to the object that runs the callback function
//     // this._privateVariable = newPrivateVar;
//   }

//   // get privateVariable () {
//   //   return _privateVariable;
//   // };

//   // Public variable
//   const publicVariable = "Public";

//   // Public method
//   const publicMethod = function () {
//     console.log("Public method");
//   };

//   // Return the public variables and functions so they can be accessed
//   return {
//     publicVariable,
//     publicMethod,
//     getPrivateVariable,
//     setPrivateVariable,
//   };
// })();

// console.log(modulePatternExample);
// modulePatternExample.publicMethod();
// console.log(modulePatternExample.publicVariable);
// modulePatternExample.setPrivateVariable("Something Else");
// console.log(modulePatternExample.getPrivateVariable());
// // modulePatternExample["Noe helt annet"] = null;
// console.log(modulePatternExample);

// Shopping cart "previously"

// const shoppingCart = {
//   // Stores the cart items
//   cart: [],
//   // Adds a single item to the 'cart' array
//   addToCart: function (item) {
//     this.cart.push(item);
//   },
//   // Displays the contents of the cart
//   getCartItems: function () {
//     console.log("Cart:", this.cart);
//   },
// };

// // Add an item to the cart
// shoppingCart.addToCart({ name: "Milk", price: 9.99 });
// shoppingCart.cart = "hest";
// // Display the cart contents
// shoppingCart.getCartItems();

// // Shooping cart module pattern
// const shoppingCart = (function () {
//   const _cart = new Set();

//   function addToCart(item) {
//     _cart.add(item);
//   }

//   function getCartItems() {
//     // Return a new array
//     return [..._cart];
//   }

//   return {
//     addToCart,
//     getCartItems,
//   };
// })();

// const milk = { name: "Milk", price: 19.99 };

// shoppingCart.addToCart(milk);
// shoppingCart.addToCart(milk);
// const someCart = shoppingCart.getCartItems();
// someCart.push(milk);
// console.log(someCart);
// // Returns:
// // [{name: 'Milk', price: 19.99}]

// -------singleton

// const Singleton = (function () {
//   // This is our main instance data
//   let instance;

//   // This creates a new instance
//   function createInstance() {
//     const object = { message: "Hello world" };
//     return object;
//   }

//   return {
//     // We return our instance, but we first check if it
//     // doesn't exist. If it doesn't exist, we create a new
//     // one before we return
//     getInstance: function () {
//       if (!instance) {
//         instance = createInstance();
//       }
//       return instance;
//     },
//   };
// })();

// const instance1 = Singleton.getInstance();
// const instance2 = Singleton.getInstance();
// const instance3 = Singleton.getInstance();

// instance1["hei"] = "på deg";
// console.log(instance1);
// // Logs: {message: 'Hello world'}
// console.log(instance2);
// // Logs: {message: 'Hello world'}
// console.log("Is the same object:", instance1 === instance2);
// // Logs: Is the same object: true

// import { logIn } from "./api.mjs";

// const GetUser = (function () {
//   let instance;

//   async function createInstance(email, password) {
//     return await logIn(email, password);
//   }

//   return {
//     getInstance: async function (email, password) {
//       if (!instance) {
//         instance = await createInstance(email, password);
//       }
//       return instance;
//     },
//     removeInstance: function () {
//       // instance = undefined;
//       instance["username"] = "";
//       instance["logged"] = false;
//       console.log(instance);
//     },
//   };
// })();

// const email = "testingsa@noroff.no";
// const password = "asdf1234";

// (async () => {
//   let first = await GetUser.getInstance(email, password);
//   console.log(first);
//   GetUser.removeInstance();

//   console.log(first);
// })();
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
    this.observers = this.observers((currentFunction) => {
      if (currentFunction != functionToRemove) {
        return currentFunction;
      }
    });
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

// Creating a new subject which we will add our
// example functions to
const subject = new Subject();

// Adding both of our example functions to our subject
subject.subscribe(ExampleFunction1);
subject.subscribe(ExampleFunction2);
subject.unsubscribe(ExampleFunction2);

// Firing our subject with a single function which
// will then cause both of our subscribed functions to
// react
subject.fire();
// Logs:
// Example function 1
// Example function 2
