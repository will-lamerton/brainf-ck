# Brainf-ck
A small, properly written interpreter built in JavaScript 🤯

## Introduction
Brainf-ck is an esoteric programming language originally created in 1993 by Urban Müller. It's an extremely minimal language, with the original compiler only consisting of eight simple commands, a data pointer and an instruction pointer. Don't be fooled though, the name is adequately chosen as this language is one massive head f🤯ck to create something in.

Nevertheless, Brainf-ck is considered Turing Complete, so, technically – you could build anything with it.

However, one advantage of it's minimalism is that Brainf-ck is a great place to start when learning how programming languages work under the hood – hence this little project.

Despite being small, this Brainf-ck interpreter has been written properly, lexing a source input, then parsing it to create an abstract syntax tree before the interpreter runs the code.

You can run the interpreter in the command line via Node and a shell script or, you can import it as a library and use the API to build a Brainf-ck interpreter into your website.

## Installation
Installing the package is fairly simple. You can either clone this repo directly or use NPM as detailed below.

### NPM
You can install the package via NPM
```
npm install brainf-ck
```

## Setup
Getting setup depends entirely on your environment.

### Node
To a program using Node, there's a handy shell script included in the package that takes a number of arguments in the command line. To simply interpret a Brainf-ck file, run the following command:
```
./brainf-ck --run PROGRAM.bf
```

The shell script takes arguments in the command line.

| Argument One   | Explanation                                        |
| ---------------| ---------------------------------------------------|
| ```--help```   | Use this to get help on the CLI. *Coming soon*     |
| ```--run```    | Use this to interpret a Brainf-ck file.            |
| ```--compile```| Use this to compile a Brainf-ck file. *Coming soon*|

### Browser
If you want to include the Brainf-ck interpreter client-side in your web applications you can do so by interacting with the Brainf-ck API.

**Example**
```
const Brainfuck = require('brainf-ck/browser');

new Brainfuck({
    viaNode: false,
    source: '[.+]',
    output: 'foo',
});
```

Again, the interpreter class takes an object as a parameter to define how the library functions. A list of configuration options are below:

| Parameter | Type | Required | Explanation                                                      |
|-----------|------------|----------|------------------------------------------------------------------|
| ```viaNode```   | Bool | Yes | Used to tell the interpreter whether or not to run via Node. |
| ```source```    | string | Yes* | A Brainf-ck program to interpret. |
| ```output```    | string | No | If you want to output the program straight to a HTML DOM element, you can pass it's ID here. |

*```source``` only required if you're running in browser as the interpreter has no native, easy way to read files. You can build this functionality in yourself should want it and pass the string output.


*Please note: I'm still firming up these docs and the package itself.*

**_Still to complete:_**
- Language extensions
- Project use cases
- Project roadmap
- Contributing

**_Still to complete in package:_**
- Dictionary so you can choose the keywords for the language.


SETUP...
chmod u+x brainfuck
