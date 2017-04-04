module.exports = ChordDiagram;

var d3 = require('d3');

function ChordDiagram() {
	this.matrix = [];

	this.createMatrix = function(nodesLinkage, nodes) {
		var matrixOrder = nodes.length;

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

		var matrix = nodesLinkage.map(function(e) {
			var numberMessages = initializeArray(matrixOrder);
			var source = e.getSource();
			var sourceIndex = nodes.indexOf(source);
			numberMessages[sourceIndex] = 0;
			var targets = e.getTargets();
			for(var i = 0; i < targets.length; i++) {
				var targetIndex = nodes.indexOf(targets[i].target);
				if(targetIndex != -1) {
					numberMessages[targetIndex] = targets[i].count;
				}
			}

			return numberMessages;
		});
		normalizeMatrix(matrix);
		return matrix;
	}

	this.displayDiagram = function(diagram) {
		var getRandomColor = function() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		};

		var matrix = this.createMatrix(diagram.nodesLinkage, diagram.actors);
		var svg = d3.select("#chord"),
		width = +svg.attr("width"),
		height = +svg.attr("height"),
		//outerRadius = Math.min(width, height) * 0.5 - 40,
		//innerRadius = outerRadius - 30;
		innerRadius = Math.min(width, height) * .41;
		outerRadius = innerRadius * 1.1;

		var formatValue = d3.formatPrefix(",.0", 1e3);

		var chord = d3.chord()
		.padAngle(0.05)
		.sortSubgroups(d3.descending);

		var arc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);

		var ribbon = d3.ribbon()
		.radius(innerRadius);

		var colorArr = (function() {
			var arr = [];
			for(var i = 0; i < diagram.nodesLinkage.length; i++) {
				arr.push(getRandomColor());
			}
			
			return arr;
		}());

		var color = d3.scaleOrdinal()
		.domain(d3.range(diagram.nodesLinkage.length))
		.range(colorArr);

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

		g.append("g")
		.attr("class", "ribbons")
		.selectAll("path")
		.data(function(chords) { return chords; })
		.enter().append("path")
		.attr("d", ribbon)
		.style("fill", function(d) { return color(d.target.index); })
		.style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

		var key = 1000;
		g.selectAll(".group")
		.data(chord(matrix).groups, function(d) { return key++; })
		.enter()
		.append("text")
		.each(function(d) {
			d.angle = (d.startAngle + d.endAngle) / 2; 
		})
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		.attr("transform", function(d) {
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
			+ "translate(" + ((height / 2) - 10) + ")"
			+ (d.angle > Math.PI ? "rotate(180)" : "");
		})
		.text(function(d) { return diagram.actors[d.index]; })
		.on("mouseover", fade(.1))
		.on("mouseout", fade(1));

		function fade(opacity) {
			return function(g, i) {
				svg.selectAll("g.ribbons path")
				.filter(function(d) {
					return d.source.index != i && d.target.index != i;
				})
				.transition()
				.style("opacity", opacity);
			};
		}		
	}
}