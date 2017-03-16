%lex

%{
	// pre-lexer
%}

%%

[\r\n]+                                      return 'NL';
\#[^\r\n]*                                   /* skip comments */
"-->"                                        return 'CONTINOUS_SUCCESS';
"..>"                                        return 'DOTTED_SUCCESS';
^(\-\-x)                                     return 'CONTINOUS_ERROR';
^(\.\.x)                                     return 'DOTTED_ERROR';
(?!\s)([^\->:,\r\n"]+?)(?=\s)                return 'ACTOR';
(?=\s)([^\->:\.\r\n"]+)(?=\s)                return 'EVENT';
"null"                                       return 'EVENT';
(?=)\s([0-9]+)                               return 'TIME';
(\:[^\r\n]+)                                 return 'MESSAGE';
(\:\s*)                                      return 'MESSAGE';
<<EOF>>                                      return 'EOF';
.                                            return 'INVALID';

/lex

%start start

%% /* language grammar */

start
	: document 'EOF' { return yy.parser.yy; }
	;

document
	: /* empty */
	| document line
	;

line
	: statement { }
	| 'NL'
	;

statement
	: entry { yy.parser.yy.addEntry($1); }
	;

entry
	: actor event time messagetype actor event time msg
	{ $$ = new Diagram.Entry($1, $2, $3, $4, $5, $6, $7, $8); }	
	;

actor
	: ACTOR 
	{ $$ = yy.parser.yy.getActor($1); }
	;

messagetype
	: CONTINOUS_SUCCESS  { $$ = Diagram.MESSAGETYPE.CONTINOUS_SUCCESS; }
	| DOTTED_SUCCESS     { $$ = Diagram.MESSAGETYPE.DOTTED_SUCCESS; }
	| CONTINOUS_ERROR    { $$ = Diagram.MESSAGETYPE.CONTINOUS_ERROR; }
	| DOTTED_ERROR       { $$ = Diagram.MESSAGETYPE.DOTTED_ERROR; }
	;

event
	: EVENT   
	%{ 
		var event = $1;
		if(event.trim() === 'null') { 			
			$$ = ''; 
		}
		else { 
			$$ = event;
		}
	%}
	;

time
	: TIME    { $$ = $1; }
	;

msg
	: MESSAGE 
	%{		
		$$ = Diagram.translate($1);
	%}
	;

%%