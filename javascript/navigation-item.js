var NavigationItem = function( $dom_object )
{
	var Signal = signals.Signal;
	
	var _self = this;
	
	var dom_object;	
	var active = false;
	
	_self.CLICKED = new Signal();
	_self.HOVERED = new Signal();
	_self.OUTED = new Signal();
	
	(function(){ init( $dom_object ); })();
		
	function init( $dom_object )
	{
		dom_object = $dom_object;
		dom_object.click( click );
		dom_object.hover( hover, out );
		
		if( isSpecific( dom_object ) )
		{
			dom_object.hide();
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
	
	_self.showSpecificFor = function( $target )
	{		
		if(
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
	
	function isSpecific( $dom_object )
	{
		return $dom_object.hasClass('specific');
	}
	
	function isSpecificFor( $dom_object, $target )
	{	
		return $dom_object.hasClass($target.value + '-specific');
	}
	
	function getTarget( $event )
	{
		var navigation_keys = dom_object.attr('href').replace('#', '').split('-');		
		var return_value = false;
		
		if( navigation_keys.length > 1 )
		{
			return_value = { action: navigation_keys[0], value: navigation_keys[1], type: $event.type };
		}
						
		return return_value;
	}
	
	function activeUpdate()
	{
		if( dom_object )
		{		
			if( 
				active &&
				! $dom_object.hasClass('active')
			)
			{
				dom_object.addClass('active');
				dom_object.show();
			}
			
			if(
				! active &&
				dom_object.hasClass('active')
			)
			{
				dom_object.removeClass('active');
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