var Navigation = function()
{
	var _self = this;
	var navigation_items = [];
	var Signal = signals.Signal;
	
	_self.ANIMATED_IN = new Signal();
	_self.NAVIGATED = new Signal();
	
	(function(){ construct(); })()	
	
	function construct()
	{
		navigation_items = initNavigationItems();
	}
	
	_self.init = function()
	{		
		navigation_items[0].activate();
		$( 'nav' ).fadeIn( 400, function(){ _self.ANIMATED_IN.dispatch(); } );
	}
	
	_self.getNavigationItems = function()
	{
		return navigation_items;
	}
	
	_self.navigate = function(  )
	{
		//_self.NAVIGATED.dispatch( $target );
	}
	
	function initNavigationItems()
	{
		var items = [];
		
		$( 'nav a' ).each(
			function()
			{
				items.push( new NavigationItem( $( this ) ) );
			}
		);
		
		return items;
	}
	
	function showSpecificOptions( $type )
	{
		
	}
}