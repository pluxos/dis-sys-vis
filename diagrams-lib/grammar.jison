%lex

%{
	// pre-lexer
%}

%%

[\r\n]+                                      return 'NL';
\#[^\r\n]*                                   /* skip comments */
"-->"                                        return 'FULL_SUCCESS';
"..>"                                        return 'HALF_SUCCESS';
^(\-\-x)                                     return 'FULL_ERROR';
^(\.\.x)                                     return 'HALF_ERROR';
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
	: FULL_SUCCESS  { $$ = Diagram.MESSAGETYPE.FULL_SUCCESS; }
	| HALF_SUCCESS  { $$ = Diagram.MESSAGETYPE.HALF_SUCCESS; }
	| FULL_ERROR    { $$ = Diagram.MESSAGETYPE.FULL_ERROR; }
	| HALF_ERROR    { $$ = Diagram.MESSAGETYPE.HALF_ERROR; }
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