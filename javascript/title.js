var Title = function( )
{
	var _self = this;
	var Signal = signals.Signal;
	
	
	_self.animation_done = new Signal();
	
	//(function(){ init(); })()
		
	_self.init = function()
	{		
		var text = $( 'h1' ).text().split( '' );
		
		setTimeout( function() { titleAnimateIn( $( 'h1' ), text ); }, 700 );
	}
	
	function titleAnimateIn( $element, $text )
	{
		$element.text( '' );
		
		for( var i = 0; i < $text.length; i++ )
		{
			$element.append( '<span>' + $text[i] + '</span>' );
		}
		
		characterAnimateIn( $element, $text, 0 );
		
		$element.show();
		//_self.animation_done.dispatch();
	}
	
	function characterAnimateIn( $element, $text, $index )
	{
		console.log( $index );
		
		if( $index < $text.length - 1 )
		{
			$element
				.find( 'span:eq(' + $index + ')' )
				.addClass( 'active' )
				
			setTimeout( function() { characterAnimateIn( $element, $text, parseInt( $index + 1 ) ); }, 100 );
		}
		
		else
		{
			setTimeout( function() { _self.animation_done.dispatch(); }, 1000 );
		}
	}
}