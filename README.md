# Brainf-ck
A small, properly written interpreter built in JavaScript 🤯

## Introduction
Brainf-ck is an esoteric programming language originally created in 1993 by Urban Müller. It's an extremely minimal language, with the original compiler only consisting of eight simple commands, a data pointer and an instruction pointer. Don't be fooled though, the name is adequately chosen as this language is one massive head f🤯ck to create something in.

Nevertheless, Brainf-ck is considered Turing Complete, so, technically – you could build anything with it.

However, one advantage of it's minimalism is that Brainf-ck is a great place to start when learning how programming languages work under the hood – hence this little project.

Despite being small, this Brainf-ck interpreter has been written properly, lexing a source input, then parsing it to create an abstract syntax tree before the interpreter runs the code.

You can run the interpreter by importing it as a library and using the API to build a Brainf-ck interpreter into your application.

## Installation
Installing the package is fairly simple. You can either clone this repo directly or use NPM as detailed below.

### NPM
You can install the package via NPM
```
npm install brainf-ck
```

## Setup
If you want to include the Brainf-ck interpreter client-side in your web applications you can do so by interacting with the Brainf-ck API.

**Example**
```
const Brainfuck = require('brainf-ck');

new Brainfuck({
    source: '[.+]',
    output: 'foo',
});
```

Again, the interpreter class takes an object as a parameter to define how the library functions. A list of configuration options are below:

| Parameter | Type | Required | Explanation                                                      |
|-----------|------------|----------|------------------------------------------------------------------|
| ```source```    | String | Yes    | A Brainf-ck program to interpret. |
| ```output```    | String | No     | If you want to output the program straight to a HTML DOM element, you can pass it's ID here. If you don't specify this, the interpreter will output the result to the console. |


## The Language
As previously mentioned, Brainf-ck is an incredibly lightweight language. The original implementation and compiler for the The language consisted of just eight command, all other characters are ignored as comments. The commands are generally run in sequence with the program terminating when the instruction pointer moves past the last command.

The Brainf-ck language uses a simple machine model consisting of the instruction pointer, as well as a an array of at least 30,000 byte cells defaulting to zero and a movable data pointer to indicate which memory address to access.

**The commands are as follows:**

| Instruction | Description |
|-------------|-------------|
| ```>```     | Move the data pointer to the right. |
| ```<```     | Move the data pointer to the left. |
| ```+```     | Increment the byte at the data pointer by one. |
| ```-```     | Decrement the byte at the data pointer by one. |
| ```.```     | Output the byte at the data pointer. |
| ```,```     | Take an input byte and store its value in the byte at the data pointer. |
| ```[```     | Essentially a ```while``` loop. If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ```]``` command. |
| ```]```     | If the byte at the data pointer is not zero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching ```[``` command. |

### Language Extensions
I've also taken the liberty to extend the language slightly and add an ```if``` conditional. You don't have to use this but it may help when writing more complex programs in Brainf-ck.

**The commands for this are as follows:**
| Instruction | Description |
|-------------|-------------|
| ```{```     | If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ```}``` command. If the data *is not* zero however, then execute the code contained in the ```{```, ```}``` just once before jumping the instruction pointer forward to the next command after the closing ```}``` command. |
| ```}```     | This command marks the end of the contained ```if``` conditional code. |
| ```~```     | A debugging command, this dumps the memory as it currently is to the console. |

## Project Use Cases
I get it, a Brainf-ck interpreter is not the most obviously useful package and to be totally honest, there's not much argument against that. The truth is, I built this for fun, as a weekend challenge and I just thought, why not write up some docs, upload it to NPM and GitHub and then I can call myself a *contributor to the world of open source*. 😎

However, as a learning resource or something to build into your own weekend project, this could be a great place to start.

The cool thing about Brainf-ck as a language is that it's super basic in terms of syntax and therefore, you can create an interpreter or compiler for it very very simply. In fact the first version of this interpreter was less than 100 lines long and consisted of nothing more than a couple of variables, a while loop and a switch statement.

However, I've overcomplicated the process and included both a lexer and parser for the source that after both running, generate an *abstract syntax tree* for the interpreter to navigate and run. This is over the top for such a simple language but, in interpreting a Brainf-ck source string this way you get to track and see how real program languages actually work, all be it in its most rudimentary form. Moreover, I've tried to comment and document the source code as well as possible so that one looking can learn and digest exactly what's happening.

Other use cases are to build and experiment more easily with an interpreter. You can import this library and play around with Brainf-ck in your own projects and applications very simply with everything here giving you the bare skeleton to get started.

## Roadmap
Look, this is by far not a project I am actively looking to maintain for any particular reason other than for fun so, no promises. I'll strive to fix bugs but adding features will only be as and when I have time.

Some features that would be great to work on at some point:

- A compiler/transpiler to optionally transpile the Brainf-ck source code to JavaScript (or something).
- Optional input parameter so that you can specify where the library takes it's input stream from.
- More example programs.
- Optional dictionary so that you can specify your own syntax.
- Web interface application for learning.
- Language extensions:
    - Functions
    - Variables

## Contributing
Feel free to contribute! Just submit a pull request and I'll review it.

## Credits
This library was built by Will Lamerton. Feel free to check out my social places:

Website: https://willlamerton.me
Instagram: https://instagram.com/willlamerton
Twitter: https://twitter.com/@WillLamerton
LinkedIn: https://www.linkedin.com/in/will-lamerton-b16ab915b
Quora: https://www.quora.com/profile/Will-Lamerton

Barr Media (my company): https://barr.media
Truffle (my website builder): https://truffle.page
