var Intro = function()
{
	var _self = this;
	var text = [];
	var Signal = signals.Signal;
	
	
	_self.ANIMATED_IN = new Signal();
	
	//(function(){ construct() })()
	
	//function construct()
	//{
	
	//}
	
	_self.init = function()
	{		
		$( '#text > p' ).each(
			function()
			{
				var paragraph = $( this ).text().split('');
				text.push( paragraph );
				
				$( this ).text('');
			}
		);
_self.ANIMATED_IN.dispatch();
		textWrite( 0, 0, text );	
	}
	
	function textWrite( $paragraph, $character, $text )
	{
		var text_insert = '';			
		var recurse = true;
		var timeout = 30;
		
		if( $character < $text[$paragraph].length )
		{
			$character++;
		}
		
		else
		{
			$character = 0;
			
			if( $paragraph < $text.length - 1)
			{
				$paragraph++;
				timeout += 1200;
			}
			
			else
			{
				recurse = false;
				setTimeout( function(){ /*_self.ANIMATED_IN.dispatch();*/ }, 1500 );
			}
		}
		
		if( recurse )
		{
			for ( var i = 0; i < $character; i++ )
			{
				text_insert += $text[$paragraph][i];
			}
			
			$('#text p:eq(' + $paragraph + ')' ).text( text_insert );
			
			if( $('#text p:eq(' + $paragraph + ')' ).css('display') === 'none' )
			{
				$('#text p:eq(' + $paragraph + ')' ).fadeIn(100);
			}
			
			setTimeout( function() { textWrite( $paragraph, $character, $text ); }, timeout );
		}		
	}	
}