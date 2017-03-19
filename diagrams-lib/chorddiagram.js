module.exports = ChordDiagram;

var d3 = require('d3');

function ChordDiagram() {
	this.matrix = [];

	this.createMatrix = function(nodesLinkage, matrixOrder) {
		var compareStrings = function(a,b) {
			a = a.toLowerCase();
			b = b.toLowerCase();

			return (a < b) ? -1 : (a > b) ? 1 : 0;
		}

		var initializeArray = function(length) {
			var arr = [];
			for(var i = 0; i < length; i++) {
				arr.push(0);
			}
			return arr;
		}

		var normalizeMatrix = function(matrix) {
			//complete rows with 0 until its length gets equals to matrix order
			for(var i = 0; i < matrix.length; i++) {
				var rowLength = matrix[i].length;
				if(rowLength != matrixOrder) {
					for(rowLength; rowLength < matrixOrder; rowLength++) {
						matrix[i][rowLength] = 0;
					}
				}
			}

			//add new rows if matrix length its not equals to matrix order
			if(matrix.length != matrixOrder) {
				matrixLength = matrix.length;
				for(matrixLength; matrixLength < matrixOrder; matrixLength++) {
					var row = initializeArray(matrixOrder);
					matrix[matrixLength] = row;
				}
			}
		}

		//sort target nodes alphabetically
		for(var i = 0; i < nodesLinkage.length; i++) {
			nodesLinkage[i].getTargets().sort(function(a,b) {
				return compareStrings(a.target,b.target);
			});
		}

		var index = 0;
		var matrix = nodesLinkage.map(function(e) {
			var numberMessages = [];//initializeArray(matrixOrder);
			var targets = e.getTargets();
			numberMessages[index] = 0;
			var aux = 0;
			for(var i = 0; i < targets.length; i++) {
				if(numberMessages[i] == 0) {
					numberMessages[++aux] = targets[i].count;
					continue;
				}
				numberMessages[aux++] = targets[i].count;
			}
			index++;
			return numberMessages;
		});
		normalizeMatrix(matrix);
		return matrix;
	}

	this.displayDiagram = function(diagram) {
		var matrix = this.createMatrix(diagram.nodesLinkage, diagram.actors.length);
		
		/*var matrix = [
		[0, 5, 7, 2, 0],
		[5, 0, 3, 4, 1],
		[7, 3, 0, 6, 3],
		[2, 4, 6, 0, 8],
		[0, 1, 3, 8, 0]
		];*/

		var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height"),
		outerRadius = Math.min(width, height) * 0.5 - 40,
		innerRadius = outerRadius - 30;

		var formatValue = d3.formatPrefix(",.0", 1e3);

		var chord = d3.chord()
		.padAngle(0.05)
		.sortSubgroups(d3.descending);

		var arc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);

		var ribbon = d3.ribbon()
		.radius(innerRadius);

		var color = d3.scaleOrdinal()
		.domain(d3.range(diagram.nodesLinkage.length))
		.range(function() {
			return diagram.nodesLinkage.map("#000000");
		});

		var g = svg.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
		.datum(chord(matrix));

		var group = g.append("g")
		.attr("class", "groups")
		.selectAll("g")
		.data(function(chords) { return chords.groups; })
		.enter().append("g");

		group.append("path")
		.style("fill", function(d) { return color(d.index); })
		.style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
		.attr("d", arc);

		var groupTick = group.selectAll(".group-tick")
		.data(function(d) { return groupTicks(d, 1e3); })
		.enter().append("g")
		.attr("class", "group-tick")
		.attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

		groupTick.append("line")
		.attr("x2", 6);

		groupTick
		.filter(function(d) { return d.value % 5e3 === 0; })
		.append("text")
		.attr("x", 8)
		.attr("dy", ".35em")
		.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
		.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		.text(function(d) { return formatValue(d.value); });

		g.append("g")
		.attr("class", "ribbons")
		.selectAll("path")
		.data(function(chords) { return chords; })
		.enter().append("path")
		.attr("d", ribbon)
		.style("fill", function(d) { return color(d.target.index); })
		.style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

		// Returns an array of tick angles and values for a given group and step.
		function groupTicks(d, step) {
			var k = (d.endAngle - d.startAngle) / d.value;
			return d3.range(0, d.value, step).map(function(value) {
				return {value: value, angle: value * k + d.startAngle};
			});
		}
	}
}