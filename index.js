(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Brainfuck"] = factory();
	else
		root["Brainfuck"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./brainf-ck.js":
/*!**********************!*\
  !*** ./brainf-ck.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Small initialiser class - takes the source and lexes, parses it and then
 * passes it to the interpreter in the form of an AST.
 */
var Brainfuck = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {object} options - options for the interpreter.
   * @return {void}
   */
  function Brainfuck(options) {
    _classCallCheck(this, Brainfuck);

    // Init the output class.
    var Output = __webpack_require__(/*! ./src/lang/output */ "./src/lang/output.js");

    var output = new Output(); // Options...

    this.options = options; // Set the source equal to `undefined` until we know the source.

    this.source = undefined; // Check the options, parse program and run interpreter, if we encounter
    // problems, we'll catch the error

    try {
      this.checkOptions(); // Lex & parse the program source.

      var Program = __webpack_require__(/*! ./src/program */ "./src/program.js");

      this.program = new Program(this.source); // Interpret the AST created in the program class.

      var Interpreter = __webpack_require__(/*! ./src/interpreter */ "./src/interpreter.js");

      new Interpreter(this.program.ast, output); // Once we're done executing instructions, we'll take the output stack and
      // create an output to either the console or HTML element passed.

      output.compileOutputStack(this.options.output === undefined ? undefined : this.options.output);
    } catch (e) {
      output.error(e);
    }
  }
  /**
   * Method to check options passed to the class.
   * @return {void}
   */


  _createClass(Brainfuck, [{
    key: "checkOptions",
    value: function checkOptions() {
      // If we're not running via Node, we'll require a `source` passed as a
      // string...
      if (this.options.source === undefined || typeof this.options.source != 'string') {
        throw 'Expected string source in options object not found or wrong type.\n\nAdd `source`. { source: "BRAINFUCK_PROGRAM" }';
      } // If that's all good, set the source equal to the source passed as an
      // option and return!


      this.source = this.options.source;
      return;
    }
  }]);

  return Brainfuck;
}();

module.exports = Brainfuck;

/***/ }),

/***/ "./src/interpreter.js":
/*!****************************!*\
  !*** ./src/interpreter.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Class to interpret the passed Brainfuck source file.
 * @return {void}
 */
var Interpreter = /*#__PURE__*/function () {
  /**
   * Constructor.
   * @param {object} ast - Abstract Syntax Tree to run.
   * @param {Output} output - output class.
   * @return {void}
   */
  function Interpreter(ast, output) {
    _classCallCheck(this, Interpreter);

    /**
     * Import Brainfuck interpreter libraries.
     *
     * These themselves will also import other core libraries.
     *
     * @type {Memory} - Handles the creation and manipulation of the program
     * memory allocated to Brainfuck.
     *
     */
    var Memory = __webpack_require__(/*! ./lang/memory */ "./src/lang/memory.js");

    this.memory = new Memory();
    this.output = output; // Run the program.

    this.run(ast);
  }
  /**
   * Method to run our program!
   * @param  {object} ast - An Abstract Syntax Tree.
   * @return {void}
   */


  _createClass(Interpreter, [{
    key: "run",
    value: function run(ast) {
      // If we're running in a conditional branch, this will be registered
      // using this variable. Set to `null` otherwise.
      var conditionalType = null; // This is out program pointer based locally on the AST being run.

      var instruction = 0; // Now we're setup, we'll open a while loop that takes the local
      // instruction pointer and uses to reference a point on the AST and
      // incrementing by one every loop until all instructions have been
      // executed.

      while (instruction <= ast.length) {
        // In the AST, we might find a conditional branch, if we do, we
        // basically want to call the `run` method again and pass it the
        // snippet of AST.
        if (_typeof(ast[instruction]) == 'object' || typeof ast[instruction] == 'array') {
          this.run(ast[instruction]); // ^ Once the conditional branch has been executed, we'll be
          // back in the original while loop and able to carry on
          // executing where we left off.
        } // Choose the intruction to execute.


        switch (ast[instruction]) {
          // This instruction moves the memory pointer forward by one.
          case 'RIGHT':
            this.memory.right();
            break;
          // This instruction moves the memory pointer backward by one.

          case 'LEFT':
            this.memory.left();
            break;
          // This instruction increases the integer stored in the current memory
          // address by one.

          case 'ADD':
            this.memory.add();
            break;
          // This instruction decreases the integer stored in the current memory
          // address by one.

          case 'SUBTRACT':
            this.memory.subtract();
            break;
          // This instruction outputs the integer stored in the current memory
          // address to the output stack.

          case 'OUTPUT':
            this.output.pushToStack(this.memory.stack[this.memory.pointer]);
            break;
          // This instruction takes input from the user via CL.

          case 'INPUT':
            this.memory.writeFromUserInput();
            break;
          // This instruction tells the `run` method that we're in a
          // while loop so below, our condition to keep looping will be
          // checked.

          case 'WHILE':
            conditionalType = 'WHILE';
            break;
          // This instruction tells the `run` method that we're in a
          // if statement so below, our condition to keep run the rest
          // of the branch will be checked.

          case 'IF':
            conditionalType = 'IF';
            break;
          // This instruction is for debugging and dumps the memory to the
          // console.

          case 'DUMP':
            this.memory.dump();
            break;
        } // Because this `run` method can be invoked to handle a conditional
        // branch, we have to check the condition to know what to do next.


        switch (conditionalType) {
          // If we're in a while loop...
          case 'WHILE':
            // We'll always run the loop at least once but any more iterations
            // will need to be checked. So, if we're at the end of a loop...
            if (instruction == ast.length) {
              // The conditon is that the current memory address is not equal
              // to 0. We'll return and exit the branch if it is.
              if (this.memory.stack[this.memory.pointer] == 0) {
                return;
              } // Else, let's reloop!


              instruction = 0;
            }

            break;
          // If we're at an if statement.

          case 'IF':
            // To run the if statement - the condition is that the current
            // memory address is not equal to 0. We'll return and exit the
            // branch if it is.
            if (this.memory.stack[this.memory.pointer] == 0) {
              return;
            } // Because we don't want to check this again, we'll let the
            // `run` function know we've settled the if statement by
            // setting `conditionalType` back to `null`.
            else {
              conditionalType = null;
            }

            break;
        } // Increment the program pointer.


        instruction++;
      } // End of program.


      return;
    }
  }]);

  return Interpreter;
}();

module.exports = Interpreter;

/***/ }),

/***/ "./src/lang/input.js":
/*!***************************!*\
  !*** ./src/lang/input.js ***!
  \***************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Class to read input...
 */
var Input = /*#__PURE__*/function () {
  function Input() {
    _classCallCheck(this, Input);
  }

  _createClass(Input, [{
    key: "getChar",
    value:
    /**
     * Method to take a user input and return it to the interpreter.
     * @return {string}
     */
    function getChar() {
      // Get input from the standard input for the running environment.
      var input = prompt('Input...'); // Convert the first character entered to ASCII. If it's valid,
      // write the ASCII code to memory, if not, just make it 0.

      return !isNaN(input.charCodeAt(0)) ? input.charCodeAt(0) : 0;
    }
  }]);

  return Input;
}();

module.exports = Input;

/***/ }),

/***/ "./src/lang/memory.js":
/*!****************************!*\
  !*** ./src/lang/memory.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Class to handle Brainfuck memory functions.
 */
var Memory = /*#__PURE__*/function () {
  /**
   * Constructor to create instance of memory.
   * @return {void}
   */
  function Memory() {
    _classCallCheck(this, Memory);

    var Input = __webpack_require__(/*! ./input */ "./src/lang/input.js");

    this.input = new Input();
    this.stack = Array.from(Array(10).keys()).fill(0);
    this.pointer = 0;
  }
  /**
   * Method to handle memory overflows.
   *
   * If the instruction sends the memory pointer past the allocated stack memory
   * size then we'll dynamically expand the memory allocated.
   *
   * @return {void}
   */


  _createClass(Memory, [{
    key: "handleOverflow",
    value: function handleOverflow() {
      this.pointer >= this.stack.length ? this.stack.push(0) : false;
    }
    /**
     * Method to handle memory underflows.
     *
     * If the instruction goes below zero we'll set the memory pointer to
     * at it's maximum.
     *
     * @return {void}
     */

  }, {
    key: "handleUnderflow",
    value: function handleUnderflow() {
      this.pointer < 0 ? this.stack.length : this.pointer;
    }
    /**
     * Method to move the memory pointer right.
     * @return {void}
     */

  }, {
    key: "right",
    value: function right() {
      this.pointer++;
      this.handleOverflow();
    }
    /**
     * Method to move the memory pointer left.
     * @return {void}
     */

  }, {
    key: "left",
    value: function left() {
      this.pointer--;
      this.handleUnderflow();
    }
    /**
     * Method to add one to the current memory address.
     * @return {void}
     */

  }, {
    key: "add",
    value: function add() {
      this.stack[this.pointer]++;

      if (this.stack[this.pointer] > 256) {
        this.stack[this.pointer] = 0;
      }
    }
    /**
     * Method to subtract one from the current memory address.
     * @return {void}
     */

  }, {
    key: "subtract",
    value: function subtract() {
      this.stack[this.pointer]--;

      if (this.stack[this.pointer] < 0) {
        this.stack[this.pointer] = 256;
      }
    }
    /**
     * Method to write to memory from user input.
     * @return {void}
     */

  }, {
    key: "writeFromUserInput",
    value: function writeFromUserInput() {
      this.stack[this.pointer] = this.input.getChar();
    }
    /**
     * Method to dump the memory stack.
     * @return {void}
     */

  }, {
    key: "dump",
    value: function dump() {
      console.log(this.stack);
    }
  }]);

  return Memory;
}();

module.exports = Memory;

/***/ }),

/***/ "./src/lang/output.js":
/*!****************************!*\
  !*** ./src/lang/output.js ***!
  \****************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Output class. Module contains functions to handle interpreter output.
 */
var Output = /*#__PURE__*/function () {
  /**
   * Constructor
   * @return {void}
   */
  function Output() {
    _classCallCheck(this, Output);

    this.stack = [];
  }
  /**
   * Method to return an error in encountered.
   * @param {string} - error message.
   * @return {void}
   */


  _createClass(Output, [{
    key: "error",
    value: function error(message) {
      console.error('\x1b[31m%s\x1b[0m', message, '\n');
    }
    /**
     * Method to push a payload to the output stack.
     * @param {number} payload - ASCII character to push to stack.
     */

  }, {
    key: "pushToStack",
    value: function pushToStack(payload) {
      this.stack.push(String.fromCharCode(payload));
    }
    /**
     * Method to compile the output stack into a single string and output it to
     * a passed location.
     * @param {string|undefined} outputTo - location to put program output.
     * @return {void}
     */

  }, {
    key: "compileOutputStack",
    value: function compileOutputStack(outputTo) {
      outputTo === undefined ? console.log(this.stack.join(''), '\n') : document.getElementById(outputTo).innerHTML = this.stack.join('');
    }
  }]);

  return Output;
}();

module.exports = Output;

/***/ }),

/***/ "./src/lexer.js":
/*!**********************!*\
  !*** ./src/lexer.js ***!
  \**********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Lexer class - rudimentary, prepares the source into a series of tokens to
 * be parsed.
 */
var Lexer = /*#__PURE__*/function () {
  /**
   * Constructor.
   * @param {string} rawSource - this is the source file contents as a string.
   * @return {void}
   */
  function Lexer(rawSource) {
    _classCallCheck(this, Lexer);

    this.rawSource = rawSource; // Accepted tokens...

    this.tokens = [{
      regex: /\>/,
      token: 'RIGHT'
    }, {
      regex: /\</,
      token: 'LEFT'
    }, {
      regex: /\+/,
      token: 'ADD'
    }, {
      regex: /\-/,
      token: 'SUBTRACT'
    }, {
      regex: /\./,
      token: 'OUTPUT'
    }, {
      regex: /\,/,
      token: 'INPUT'
    }, {
      regex: /\[/,
      token: 'WHILE'
    }, {
      regex: /\]/,
      token: 'ENDWHILE'
    }, {
      regex: /\{/,
      token: 'IF'
    }, {
      regex: /\}/,
      token: 'ENDIF'
    }, {
      regex: /\~/,
      token: 'DUMP'
    }]; // Split type, allows for syntax changes.

    this.splitType = ''; // '' = char, ' ' = word.
    // Generate a lexed source...

    this.source = this.lex();
  }
  /**
   * Method to run the source code through the lexer.
   * @return {array}
   */


  _createClass(Lexer, [{
    key: "lex",
    value: function lex() {
      var _this = this;

      // Split the source into an array of proposed tokens.
      var splitSource = this.rawSource.split(this.splitType); // Create an empty array for the lexed tokens.

      var lexedSource = []; // Then, we'll loop through the source and check if it matches any of
      // the tokens.

      splitSource.forEach(function (proposedToken) {
        _this.tokens.forEach(function (token) {
          // If it does, we'll push the token to the lexed source array.
          token.regex.test(proposedToken) ? lexedSource.push(token.token) : false;
        });
      }); // Return for parsing.

      return lexedSource;
    }
  }]);

  return Lexer;
}();

module.exports = Lexer;

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Parser class – this takes our tokens that are recognised and
 * "makes sense of them" by parsing them into an Abstract Syntax Tree.
 */
var Parser = /*#__PURE__*/function () {
  /**
   * Constructor
   * @return {void}
   */
  function Parser(lexedSource) {
    _classCallCheck(this, Parser);

    this.lexedSource = lexedSource;
    this.ast = this.parse();
  }
  /**
   * Method to parse the tokens.
   *
   * Here we can catch syntaxical errors and generate an AST to traverse.
   *
   * @return {object} - an Abstract Syntax Tree.
   */


  _createClass(Parser, [{
    key: "parse",
    value: function parse() {
      var _this = this;

      // We're going to construct an AST by first creating a string that we
      // can later parse into JSON and then extract an array from there.
      //
      // Creating a string, we'll begin a stringified JSON object with
      // "commands" set to an empty array. Here is where we'll construct the
      // AST.
      var astString = '[{ "commands": ['; // These are tracker variables for the parser. Every opening condition
      // needs a closing one too, so, we'll keep track. Every opening conditional
      // we'll push a new entry to the array with a character number. Every
      // closing conditional we'll pop from the array.
      //
      // If the length of the arrays are not equal to zero then we're missing
      // a closing conditional so, we'll throw an error with the character
      // number.

      var openWhileConditionals = [];
      var openIfConditionals = []; // Now we have that, we'll loop through our Lexed source keeping track
      // of the current token and its position with an "iteration" variable.

      this.lexedSource.forEach(function (token, iteration) {
        // For Brainfuck, most of the commands just need to be added to
        // the AST in the order they're looped in, however, for special,
        // nested, tokens, we'll nest any subsequent commands until their
        // corresponding closing tokens are found. This creates nested
        // arrays which we can traverse later.
        switch (token) {
          case 'WHILE':
            openWhileConditionals.push(iteration);
            astString += '[';
            break;

          case 'IF':
            openIfConditionals.push(iteration);
            astString += '[';
            break;

          case 'ENDWHILE':
            openWhileConditionals.pop();
            astString += ']';
            break;

          case 'ENDIF':
            openIfConditionals.pop();
            astString += ']';
            break;
        } // Record the token in the AST as long as we want it.


        if (token != 'ENDWHILE' && token != 'ENDIF') {
          astString += "\"".concat(token, "\"");
        } // Add a comma ready for the next array element again, if we want it.


        if (iteration + 1 != _this.lexedSource.length && _this.lexedSource[iteration + 1] != 'ENDWHILE' && _this.lexedSource[iteration + 1] != 'ENDIF') {
          astString += ',';
        }
      }); // At this point, our tokens have all been accounted for, so we'll add
      // our closing JSON.

      astString += '] }]'; // The source has a missing closing conditional, so, we'll throw an
      // error.

      if (openIfConditionals.length != 0) {
        throw "Missing closing `if` conditional on character: ".concat(openIfConditionals[0], ".");
      }

      if (openWhileConditionals.length != 0) {
        throw "Missing closing `while` conditional on character: ".concat(openWhileConditionals[0], ".");
      } // And finish by returning the parsed AST by removing the JSON.


      return JSON.parse(astString)[0].commands;
    }
  }]);

  return Parser;
}();

module.exports = Parser;

/***/ }),

/***/ "./src/program.js":
/*!************************!*\
  !*** ./src/program.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Program class. Contains functions to fetch and manage Brainfuck programs.
 */
var Program = /*#__PURE__*/_createClass(
/**
 * Constructor.
 * @return {void}
 */
function Program(source) {
  _classCallCheck(this, Program);

  var Lexer = __webpack_require__(/*! ./lexer */ "./src/lexer.js");
  /**
   * Call the lexer.
   * @type {Lexer}
   * @param {string} - raw string source code to be lexed.
   */


  this.lexer = new Lexer(source);

  var Parser = __webpack_require__(/*! ./parser */ "./src/parser.js");
  /**
   * Call the parser.
   * @type {Parser}
   * @param {array} - tokenised source from the lexer.
   */


  this.parser = new Parser(this.lexer.source);
  this.ast = this.parser.ast;
});

module.exports = Program;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./brainf-ck.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});