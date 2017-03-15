### Welcome to the Distributed Systems Visualization project.
Distributed systems are notoriously hard to write and understand. Tools that enable visualizing the distributed computation are therefore a valuable tool in this field.

The main objective of this work is to develop a framework for tools to visualize distributed computations. So far our prototype allows visualization in the form of build animated time-space (or space-time) diagrams and hyperbolic trees.

## Live Demo
For a live demo, go here http://pluxos.github.io/dis-sys-vis/live/index.html


## Instalation and Compilation
If you would rather run the tool directly from your own box, the following steps should be followed:

1. Download and install node.js following the steps from https://nodejs.org/en/download/
2. Download and install Browserify: `npm install -g browserify`
3. Download DSVis: `git clone git@github.com:pluxos/dis-sys-vis.git` or dowload the zip from http://pluxos.github.io/dis-sys-vis/
4. cd to folder ?
5. Install dependencies: `npm install`
6. Build the library without minification: `make clean debug` Resulting file is called `vsdis.js`
7. Build the library with minification: `make clean all` Resulting file is called `vsdis-min.js`
7. Import the resulting file into your project.


## License
Copyright 2017 the Distributed Systems and Networks Research Group at the Federal University of Uberlândia or its descendants.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
