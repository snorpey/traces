var Title = function( )
{
	var _self = this;
	var Signal = signals.Signal;
	
	_self.ANIMATED_IN = new Signal();
	
	//(function(){ construct() })()
	
	//function construct()
	//{
	
	//}
		
	_self.init = function()
	{		
		var text = $( 'h1' ).text().split( '' );
_self.ANIMATED_IN.dispatch();
		setTimeout( function() { titleAnimateIn( $( 'h1' ), text ); }, 700 );
	}
	
	function titleAnimateIn( $dom_element, $text )
	{
		$dom_element.text( '' );
		
		for ( var i = 0; i < $text.length; i++ )
		{
			$dom_element.append( '<span>' + $text[i] + '</span>' );
		}
		
		characterAnimateIn( $dom_element, $text, 0 );
		
		$dom_element.show();
	}
	
	function characterAnimateIn( $dom_element, $text, $index )
	{		
		if ( $index < $text.length - 1 )
		{
			$dom_element
				.find( 'span:eq(' + $index + ')' )
				.addClass( 'active' )
				
			setTimeout( function() { characterAnimateIn( $dom_element, $text, parseInt( $index + 1 ) ); }, 70 );
		}
		
		else
		{
			setTimeout( function() { /*_self.ANIMATED_IN.dispatch();*/ }, 1000 );
		}
	}
}