var Navigation = function()
{
	var _self = this;
	var navigation_items = [];
	var Signal = signals.Signal;
	var animation_direction;
	
	_self.ANIMATED_IN = new Signal();
	_self.NAVIGATED = new Signal();
	_self.HOVERED = new Signal();
	_self.OUTED = new Signal();
	_self.NAVIGATION_ITEMS_INITIALIZED = new Signal();
	
	(function(){ construct(); })()	
	
	function construct()
	{
		navigation_items = navigationItemsInit();
	}
	
	_self.init = function()
	{		
		navigation_items[0].activate();
		
		$( 'nav' )
			.hover( navHovered, navOuted )
			.fadeIn( 400, function(){ _self.ANIMATED_IN.dispatch(); } );
			
		_self.NAVIGATION_ITEMS_INITIALIZED.dispatch( navigation_items );
	}
	
	_self.getNavigationItems = function()
	{
		return navigation_items;
	}
	
	_self.navigate = function( $target )
	{		
		for ( var i = 0; i < navigation_items.length; i++ )
		{
			//navigation_items[i].showSpecificFor( $target );
			navigation_items[i].checkTarget( $target );
		}

		_self.NAVIGATED.dispatch( $target );
	}
	
	_self.navigationShow = function()
	{
		navigationItemsShow();
	}
	
	function navigationItemsInit()
	{
		var items = [];
		
		$( 'nav li a' ).each(
			function()
			{
				items.push( new NavigationItem( $( this ) ) );
			}
		);
		
		return items;
	}
	
	function navHovered()
	{
		animation_direction = true;
		_self.HOVERED.dispatch();
	}
	
	function navOuted()
	{
		animation_direction = false;
		_self.OUTED.dispatch();
	}
	
	_self.navigationItemsShow = function( $index )
	{		
		if( animation_direction === true )
		{
			if( $index === undefined )
			{
				$index = -1;
			}
			
			var next_index = parseInt( $index + 1 );
						
			if (
				navigation_items[next_index] &&
				next_index < navigation_items.length
			)
			{
				navigation_items[next_index].animateText( true, next_index );
			}
		}
	}
	
	_self.navigationItemsHide = function( $index )
	{		
		//console.log( 'NAV CLOSE' );
		if( animation_direction !== true )
		{
			if( $index === undefined )
			{
				$index = navigation_items.length;
			}
			
			var next_index = parseInt( $index - 1 );
			
			if (
				navigation_items[next_index] &&
				next_index >= 0
			)
			{
				navigation_items[next_index].animateText( false, next_index );
			}
		}
	}
	
	function showSpecificOptions( $type )
	{
		
	}
}