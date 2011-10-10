var NavigationItem = function( $dom_object )
{
	var Signal = signals.Signal;
	
	var _self = this;
	
	var dom_object;	
	var active = false;
	
	_self.CLICKED = new Signal();
	_self.HOVERED = new Signal();
	_self.OUTED = new Signal();
	_self.ANIMATED_IN = new Signal();
	_self.ANIMATED_OUT = new Signal();
	
	(function(){ init( $dom_object ); })();
		
	function init( $dom_object )
	{
		dom_object = $dom_object;
		dom_object.click( click );
		dom_object.hover( hover, out );
		
		if ( isSpecific( dom_object ) )
		{
			dom_object.hide();
		}
		
		dom_object
			.attr( { 'data-text': dom_object.text() } )
			.text( '' );
	}
	
	_self.getDomObject = function()
	{
		return dom_object;
	}
	
	_self.activate = function()
	{
		active = true;
		
		activeUpdate();
	}
	
	_self.deactivate = function()
	{
		active = false;
		
		activeUpdate();
	}
	
	// show specific nav items for target
	_self.showSpecificFor = function( $target )
	{		
//		if (
//			isSpecific( dom_object ) &&
//			isSpecificFor( dom_object, $target )
//		)
//		{
//			_self.activate();
//		}
//		
//		else
//		{
//			_self.deactivate();
//		}
	}
	
	_self.animateText = function( $direction, $index )
	{
		if( $direction === true )
		{
			animateIn( $index );
		}
		
		if( $direction === false )
		{
			animateOut( $index );
		}
	}
	
	_self.getID = function()
	{
		return dom_object.attr( 'href' ).replace( '#', '' );	
	}
	
	function animateIn( $index, $text_displayed, $text_original )
	{
		if (
			! $text_displayed &&
			! $text_original
		)
		{
			$text_original = dom_object.attr( 'data-text' );
			$text_displayed = '';
		}
		
		if ( $text_displayed.length < $text_original.length )
		{
			$text_displayed += $text_original.charAt( $text_displayed.length );
			
			dom_object.text( $text_displayed );
			
			setTimeout( function(){ animateIn( $index, $text_displayed, $text_original ); }, 1 );
		}
		
		else
		{
			_self.ANIMATED_IN.dispatch( $index );
		}
	}
	
	function animateOut( $index, $text_displayed, $text_original )
	{
		if ( ! active )
		{			
			if (
				! $text_displayed &&
				! $text_original
			)
			{
				if ( dom_object.attr( 'data-text' ) )
				{
					$text_original = dom_object.attr( 'data-text' );
				}
				
				else
				{
					$text_original = dom_object.text();
				}
				
				$text_displayed = $text_original;
			}
			
			if ( $text_displayed.length > 0 )
			{
				$text_displayed = $text_displayed.substring( 0, $text_displayed.length - 1 );
				
				dom_object.text( $text_displayed );
				
				setTimeout( function(){ animateOut( $index, $text_displayed, $text_original ); }, 1 );
			}
			
			else
			{

//				if ( ! dom_object.attr( 'data-text' ) )
//				{
//					dom_object.attr( { 'data-text': $text_original } );
//				}
				
//				console.log( 'animated out: ' + dom_object.index() )
				_self.ANIMATED_OUT.dispatch( $index );
			}
		}
		
		else
		{
//			console.log( 'active:' + dom_object.index() );
			_self.ANIMATED_OUT.dispatch( $index );
		}
	}
	
	function isSpecific( $dom_object )
	{		
		var return_value = false;
		
		if(
			$dom_object.hasClass( 'specific' ) ||
			$dom_object.attr( 'href' ).indexOf( '-all' ) != -1
		)
		{
			return_value = true;
		}
		
		return return_value;
	}
	
	function isSpecificFor( $dom_object, $target )
	{	
		var return_value = false;
		
		if(
			$dom_object.hasClass( $target.value + '-specific' ) ||
			$dom_object.attr( 'href' ).indexOf( '-all' ) != -1
		)
		{
			return_value = true;
		}
		
		return return_value;
	}
	
	function getTarget( $event )
	{
		var navigation_keys = dom_object.attr( 'href' ).replace( '#', '' ).split( '-' );		
		var return_value = false;
		
		if ( navigation_keys.length > 1 )
		{
			return_value = { action: navigation_keys[0], value: navigation_keys[1], type: $event.type };
		}
						
		return return_value;
	}
	
	function activeUpdate()
	{
		if ( dom_object )
		{		
			if ( 
				active &&
				! $dom_object.hasClass( 'active' )
			)
			{
				dom_object.addClass( 'active' );
				dom_object.show();
			}
			
			if (
				! active &&
				dom_object.hasClass( 'active' )
			)
			{
				dom_object.removeClass( 'active' );
				dom_object.hide();
			}
		}
	}
	
	function click( $event )
	{
		_self.CLICKED.dispatch( getTarget( $event ) );
	}
	
	function hover( $event )
	{
		_self.HOVERED.dispatch( getTarget( $event ) );
	}
	
	function out( $event )
	{
		_self.OUTED.dispatch( getTarget( $event ) );
	}
}