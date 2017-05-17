### Welcome to the Distributed Systems Visualization project.
Distributed systems are notoriously hard to write and understand. Tools that enable visualizing the distributed computation are therefore a valuable tool in this field.

The main objective of this work is to develop a framework for tools to visualize distributed computations. So far our prototype allows visualization in the form of build animated time-space (or space-time) diagrams and hyperbolic trees.

## Live Demo
For a live demo, go to [http://pluxos.github.io/dis-sys-vis/live/index.html](http://pluxos.github.io/dis-sys-vis/live/index.html)

## Examples

Basic usage:

`B p1 10-->C p2 20:request`

`C p3 30-->B p4 40:response`

<img src="https://cloud.githubusercontent.com/assets/1865566/24640285/4354fc7a-18cc-11e7-8034-ab4da22491d7.png" alt="Basic Usage" />

Many processes:

`B p1 10-->C p2 20:request`

`C p3 30-->B p4 40:response`

`B p5 60-->D p6 80:request`

`D p7 90-->E p8 100:request`

<img src="https://cloud.githubusercontent.com/assets/1865566/24640283/43507c9a-18cc-11e7-8c88-cd4e45f276eb.png" />

Lost request:

`B p1 10-->C p2 20:request`

`B p3 15-->C p4 23:request`

`C p5 25..>B p6 30:lost request`

<img src="https://cloud.githubusercontent.com/assets/1865566/24640286/4355134a-18cc-11e7-871d-9d08a6dc0f5b.png" alt="Lost request" />

Loopback message:

`B p1 10-->C p2 20:request`

`C p5 5-->C p6 15:loopback`

<img src="https://cloud.githubusercontent.com/assets/1865566/24640284/435498e8-18cc-11e7-9fc5-65966ce0cce2.png" />

Colored messages:

`B p1 10-->C p2 20:request`

`B p3 15-->C p4 23:request`

`C p5 25..>B p6 30:lost request --color #881A1B`

`C p7 40-->D p8 60:response`

`D p9 65-->E p10 68:request `

`D p11 70-->B p12 80:response`

`D p13 85..>C p14 95:lost request --color #FF8D00`

<img src="https://cloud.githubusercontent.com/assets/1865566/24640287/43563766-18cc-11e7-9c38-7ebc736e4e3b.png" />

## Download and Compilation
If you would rather run the tool directly from your own box, the following steps should be followed:

1. Download and install node.js following the steps from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Download and install Browserify: `npm install -g browserify`
3. Download DSVis: `git clone git@github.com:pluxos/dis-sys-vis.git` or dowload the zip from [http://pluxos.github.io/dis-sys-vis/](http://pluxos.github.io/dis-sys-vis/)
4. cd to the project's folder (dis-sys-vis/live/diagrams-lib)
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
