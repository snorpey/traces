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
		$( '#text > h1').hide();
		$( '#text > p' ).each(
			function()
			{
				var paragraph = $( this ).text().split( '' );
				text.push( paragraph );
				
				
				
				$( this ).text( '' );
			}
		);
//_self.ANIMATED_IN.dispatch();
console.log( text );
		textWrite( 0, 0, text );	
	}
	
	function textWrite( $paragraph, $character, $text )
	{
		var text_insert = '';			
		var recurse = true;
		var timeout = 30;
		
		if ( $character < $text[$paragraph].length )
		{
			$character++;
		}
		
		else
		{
			$character = 0;
			
			if ( $paragraph < $text.length - 1 )
			{
				$paragraph++;
				timeout += 1200;
			}
			
			else
			{
				recurse = false;
				//setTimeout( function(){ _self.ANIMATED_IN.dispatch(); }, 1500 );
				
				setTimeout( function(){ textHide( $text.length - 1, $text[$text.length - 1].length - 1, $text ); }, 500 );
			}
		}
		
		if ( recurse )
		{
			
			for ( var i = 0; i < $character; i++ )
			{
				text_insert += $text[$paragraph][i];
			}
			
			if (
				$text[$paragraph][$character] == ' ' &&
				$text[$paragraph][parseInt( $character - 1 )] == '.'
			)
			{
				timeout = 1200;
			}
			
			text_insert += '|';
			
			$('#text p:eq(' + $paragraph + ')' ).text( text_insert );
			
			if ( $('#text p:eq(' + $paragraph + ')' ).css('display') === 'none' )
			{
				$('#text p:eq(' + $paragraph + ')' ).fadeIn(100);
			}
			
			setTimeout( function() { textWrite( $paragraph, $character, $text ); }, timeout );
		}		
	}
	
	function textHide( $paragraph, $character, $text, $text_to_show, $text_to_show_array )
	{
		var text_insert = '';			
		var recurse = true;
		var timeout = 15;
		var text_string = '';
		var text_to_show_position = 0;
		
		for ( var i = 0; i < $text.length; i++ )
		{
			text_string = $text[i].join( '' );
		}
		
		text_to_show_position = text_string.indexOf( $text_to_show );
		
		if ( $character > 0 )
		{
			if (
				! $text_to_show_array &&
				text_to_show_position > -1 &&
				$character == text_to_show_position + $text_to_show.length - 1
			)
			{								
				var the_text = [];
				
				for ( var i = $character; i >= text_to_show_position; i-- )
				{					
					the_text.push( i );
				}
				
				the_text.reverse();
				
				$text_to_show_array = the_text;
			}
			
			$character--;
		}
		
		else
		{			
			if ( $paragraph > 0 )
			{
				$paragraph--;
				timeout += 1200;
				
				$character = $text[$paragraph].length;
			}
			
			else
			{
				recurse = false;
			}
		}
		
		if ( recurse )
		{
			for ( var i = 0; i < $character; i++ )
			{
				text_insert += $text[$paragraph][i];
			}
			
			if( $text_to_show_array )
			{
				if( $character <= $text_to_show_array[$text_to_show_array.length - 1] )
				{					
					for ( var i = 0; i < $text_to_show_array.length; i++ )
					{
						if( $character < $text_to_show_array[i] )
						{
							text_insert += $text[$paragraph][$text_to_show_array[i]];
						}
					}
				}	
			}
			
			text_insert += '|';
			
			$( '#text p:eq(' + $paragraph + ')' ).text( text_insert );
			
			if ( $( '#text p:eq(' + $paragraph + ')' ).css('display') === 'none' )
			{
				$( '#text p:eq(' + $paragraph + ')' ).fadeIn(100);
			}
			
			setTimeout( function() { textHide( $paragraph, $character, $text, $text_to_show, $text_to_show_array ); }, timeout );
		}
		
		else
		{
			console.log( 'NO RECURSION' );
			titleShow();
			
			$( '#text > p' ).hide();
		}
		
		//console.log( $paragraph, $character, $text );
	}
	
	function titleShow()
	{
		$( '#text > h1' ).show();
		
		var text = $( '#text > h1' ).text().toLowerCase().split( '' );
		var characters = []; 
		var current_text = [];
		var index = [];
		var timeout = 20;
		var animated = [];
		
		for ( var i = 0; i < text.length; i++ )
		{
			current_text.push( ' ' );
			index.push( 0 );
			characters.push( '012345-,._!"§$%&/()=?*+#{} abcdefghijklmnopqrstuvwxyz'.split( '' ).sort( function() { return 0.5 - Math.random() } ) );
			animated.push( false );
		}
		
		titleAnimate( index, text, current_text, animated, timeout );
		
		function titleAnimate( $index, $text, $current_text, $animated, $timeout )
		{
			var recurse = false;
			
			for ( var i = 0; i < $text.length; i++ )
			{
				if ( $current_text[i] !== $text[i] )
				{
					if ( $index[i] < characters[i].length )
					{
						$index[i]++;
					}
					
					else
					{
						$index[i] = 0;
					}
					
					$current_text[i] = characters[i][$index[i]];
					recurse = true;
				}
				
				else
				{
					if( ! $animated[i] )
					{
						$animated[i] = true;
						$timeout += 10;
					}
				}			
			}
			
			$( '#text > h1' ).text( $current_text.join( '' ) );
			
			if( recurse )
			{
				setTimeout( function() { titleAnimate( $index, $text, $current_text, $animated, $timeout ); }, $timeout );
			}
		}
	}	
}