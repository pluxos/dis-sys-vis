function Diagram() {
  this.actors  = [];
  this.entries = [];
  //stores how many times a node links to another node. Useful when some visualization needs this info
  this.nodesLinkage = [];

  this.containsObject = function(obj, propertyName, list) {
    if(!list) return -1;
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i][propertyName] === obj) {
        return i;
      }
    }
    return -1;
  }
}

//fulfils nodesLinkage array
Diagram.prototype.link = function(entry) {
  var index = this.containsObject(entry.getSenderName(), '_source', this.nodesLinkage);

  if(index == -1) {
    var node = new Diagram.Node(entry.getSenderName());
    node.addDest(entry.getReceiverName());
    this.nodesLinkage.push(node);
  } else {
    var node = this.nodesLinkage[index];
    node.addDest(entry.getReceiverName());
  }
};

Diagram.prototype.getActor = function(name) {
  var i;
  var actors = this.actors;
  for (i in actors) {
    if (actors[i] === name) {
      return actors[i];
    }
  }
  i = actors.push(name);
  return actors[ i - 1 ];
};

Diagram.prototype.addEntry = function(entry) {
  this.entries.push(entry);
  this.link(entry);
};

Diagram.Entry = function(actorA, eventA, timeA, messagetype, actorB, eventB, timeB, message) {
  this.actorA          = actorA;
  this.eventA          = typeof eventA === 'string' ? eventA.trim() : eventA;
  this.timeA           = typeof timeA === 'string' ? timeA.trim() : timeA;
  this.messagetype     = messagetype;
  this.actorB          = actorB;
  this.eventB          = typeof eventB === 'string' ? eventB.trim() : eventB;
  this.timeB           = typeof timeB === 'string' ? timeB.trim() : timeB;
  
  //'split' the color parameter from the message parameter
  //we do this because Jison's regex engine does not take in account regex group matching
  var parameters       = (function() {
    var eval = function(str, regex, matches) {
      matches.result = str.match(regex);
      return matches.result && matches.result.length > 1;
    };
    //matches, e.g., <string> --color #FFFFFF --weigth 5
    var regexWithColorAndWeight = /^([^\r\n]+)(?:\-\-\w+\s+(\#[A-Za-z\d]+))(?:\s+)(?:\-\-\w+\s+(\d+))?/;
    var regexWithColor = /^([^\r\n]+)(?:\-\-\w+\s+(\#[A-Za-z\d]+))/;
    var regexWithWeigth = /^([^\r\n]+)(?:\-\-\w+\s+(\d+))/;
    var matches = {};
    if(eval(message, regexWithColorAndWeight, matches)) {
      return {
        message: matches.result[1].trim(),
        color: matches.result[2],
        weigth: matches.result[3]
      };
    } else if(eval(message, regexWithColor, matches)) {
      return {
        message: matches.result[1].trim(),
        color: matches.result[2]
      }
    } else if(eval(message, regexWithWeigth, matches)) {
      return {
        message: matches.result[1].trim(),
        weigth: matches.result[2]
      }
    } else {
      return { message: message.trim() }
    }
  }());

  this.message = parameters.message;
  this.color   = parameters.color != null ? parameters.color : '#000000' ;
  this.weigth  = parameters.weigth != null ? parameters.weigth : 1;

  this.getMessageType = function() {
    return this.messagetype;
  }

  this.getSenderName = function() {
    return this.actorA;
  }

  this.getReceiverName = function() {
    return this.actorB;
  }

  this.getSenderEvent = function() {
    return this.eventA;
  }

  this.getReceiverEvent = function() {
    return this.eventB;
  }

  this.getSenderTime = function() {
    return this.timeA;
  }

  this.getReceiverTime = function() {
    return this.timeB;
  }

  this.getColor = function() {
    return this.color;
  }

  this.getMessage = function() {
    return this.message;
  }

  this.getWeight = function() {
    return this.weigth;
  }
};

Diagram.translate = function(s) {
  return s.replace(/^(:\s*)/, "").trim();
}

Diagram.MESSAGETYPE = {
  CONTINOUS_SUCCESS: 'CONTINOUS_SUCCESS',
  DOTTED_SUCCESS: 'DOTTED_SUCCESS',
  CONTINOUS_ERROR: 'CONTINOUS_ERROR',
  DOTTED_ERROR: 'DOTTED_ERROR'
};

Diagram.TYPE = {
  SPACETIME: 0,
  HYPERVIS: 1,
  CHORD: 2
};

/** The following is included by preprocessor */
// #include "build/grammar.js"

function ParseError(message, hash) {
  this.name = 'ParseError';
  this.message = (message || '');
}
ParseError.prototype = new Error();
Diagram.ParseError = ParseError;

Diagram.parse = function(input) {
  grammar.yy = new Diagram();
  grammar.yy.parseError = function(message, hash) {
    throw new ParseError(message, hash);
  };
  var diagram = grammar.parse(input);
  delete diagram.parseError;
  return diagram;
};

Diagram.Node = function(source) {
  this._source = source;
  this._targets = [];
  this.containsObject = new Diagram().containsObject;

  this.addDest = function(target) {
    var index = this.containsObject(target, 'target', this._targets);
    if(index == -1) {
      var obj = {};
      obj.target = target;
      obj.count  = 1;
      this._targets.push(obj);
    } else {
      this._targets[index].count += 1;
    } 
  }

  this.getTargets = function() {
    return this._targets;
  }

  this.getSource = function() {
    return this._source;
  }
};
