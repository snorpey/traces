var BackgroundSystem = function()
{
	var _self = this;
	var text = [];
	var Signal = signals.Signal;
	var backgrounds = [];
	var screen = { width: 600, height: 800 };
	
	_self.INITIALIZED = new Signal();
	
	(function(){ construct(); })()	
	
	function construct()
	{
	}
	
	_self.init = function( $navigation_items )
	{
		if ( $navigation_items )
		{
			for ( var i = 0; i < $navigation_items.length; i++ )
			{
				var background = new BackgroundItem( $navigation_items[i].getID() );
					background.screenUpdated( screen );
				
				backgrounds[ $navigation_items[i].getID() ] = background;
			}
			
			//_self.INITIALIZED.dispatch( getBackgroundItems() );
		}
	}
	
	function screenUpdated( $screen )
	{
		screen = $screen;
		
		for ( var i = 0; i < getBackgroundItems().length; i++ )
		{
			getBackgroundItems()[i].screenUpdated( screen );
		}
	}
	
	function getBackgroundItems()
	{
		var return_value = [];
		
		for ( var i in backgrounds )
		{
			return_value.push( backgrounds[i] );
		}
		
		return return_value;
	}
	
	function backgroundAnimateIn( $navigation_target )
	{		
		backgrounds[$navigation_target.action + '-' + $navigation_target.value].backgroundAnimateIn();
	}
	
	function backgroundAnimateOut( $navigation_target )
	{
		backgrounds[$navigation_target.action + '-' + $navigation_target.value].backgroundAnimateOut();
	}
	
	_self.screenUpdated = screenUpdated;
	_self.getBackgroundItems = getBackgroundItems;
	_self.backgroundAnimateIn = backgroundAnimateIn;
	_self.backgroundAnimateOut = backgroundAnimateOut;
}
	