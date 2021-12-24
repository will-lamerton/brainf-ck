# Brainf-ck
A small, properly written interpreter built in JavaScript 🤯

## Introduction
Brainf-ck is an esoteric programming language originally created in 1993 by Urban Müller. It's an extremely minimal language, with the original compiler only consisting of eight simple commands, a data pointer and an instruction pointer. Don't be fooled though, the name is adequately chosen as this language is one massive head f🤯ck to create something in.

Nevertheless, Brainf-ck is considered Turing Complete, so, technically – you could build anything with it.

However, one advantage of it's minimalism is that Brainf-ck is a great place to start when learning how programming languages work under the hood – hence this little project.

Despite being small, this Brainf-ck interpreter has been written properly, lexing a source input, then parsing it to create an abstract syntax tree before the interpreter runs the code.

You can run the interpreter in the command line via Node and a shell script or, you can import it as a library and use the API to build a Brainf-ck interpreter into your website.

*Please note: I'm still firming up these docs and the package itself.*

**_Still to complete:_**
- Installation & setup
- Language extensions
- Project use cases
- Project roadmap
- Contributing

**_Still to complete in package:_**
- More output methods based on running environment. Done but needs test.
- Dictionary so you can choose the keywords for the language.


SETUP...
chmod u+x brainfuck
