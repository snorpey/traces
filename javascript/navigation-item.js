// nav item.

//	X show defaults all the time
//	- show specifics on hover
// 	- hide specifics on out
// 	- show specifics and default if parent selected
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
		
	function init( $dom_object )
	{
		dom_object = $dom_object;
		dom_object.click( click );
		dom_object.hover( hover, out );
		
		if ( isSpecific( dom_object ) )
		{
			dom_object.hide();
		}
		
		
		dom_object.attr( { 'data-text': dom_object.text() } )

		if (
			_self.getID() === 'filter-all' ||
			_self.getID() === 'orderby-none'
		)
		{
			_self.activate();
		}
		
		else
		{
			dom_object.text( '' );
		}
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
	
	// up the active status of this object
	_self.checkTarget = function( $target )
	{
		
		var navigation_keys = dom_object.attr( 'href' ).replace( '#', '' ).split( '-' );		
		var return_value = false;
						
		if (
			navigation_keys.length > 1 &&
			$target.action === navigation_keys[0] &&
			$target.value === navigation_keys[1]
		)
		{
			_self.activate();
		}
		
		else
		{
			_self.deactivate();
		}
	}
	
	
	// show specific nav items for target
	_self.showSpecificFor = function( $target )
	{		
		if (
			isSpecific( dom_object ) &&
			isSpecificFor( dom_object, $target )
		)
		{
			_self.activate();
		}
		
		else
		{
			_self.deactivate();
		}
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
		dom_object.show();
		
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
		var animated_out = false;
		
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
				
				$dom_object.hide();
				animated_out = true;
			}
		}
		
		else
		{
			animated_out = true;			
		}
		
		if ( animated_out )
		{
			
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
	
	function activeUpdate( $animate )
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
				
				//if ( $animate )
				//{
				//	animateIn();
				//}
			}
			
			if (
				! active &&
				dom_object.hasClass( 'active' )
			)
			{
				dom_object.removeClass( 'active' );
				//dom_object.hide();
				
				//if ( $animate )
				//{
				//	animateOut();
				//}
			}
		}
	}
	
	function click( $event )
	{
		//$event.preventDefault();
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
	
	(function(){ init( $dom_object ); })();
}