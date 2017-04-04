var SpaceTimeDraw = require('../space-time-draw');
var ChordDiagram = require('../chorddiagram');

(function() {

/** The following is included by preprocessor */
// #include "build/diagram-grammar.js"
// #include "build/hypervis.js"

	function DiagramController(diagram, view, parser) {
		this.view    = view;
		this.diagram = diagram;
		this.parser  = parser;

		this.setVisualization = function(view) {
			this.view = view;
		}

		this.updateView = function() {
			this.view.displayDiagram(diagram, parser);
		}
	}

	window.model = {Diagram: Diagram};
	window.controller = {DiagramController: DiagramController};
	window.view = {
		SpaceTimeDraw: SpaceTimeDraw,
		Hypervis: Hypervis,
		ChordDiagram: ChordDiagram
	};

}());