var EventSystem = function()
{
	var _self = this;
	
	var events = [];
	var event_generator;
	
	var Signal = signals.Signal;
	
	_self.EVENTS_UPDATED = new Signal();
	_self.EVENTS_FILTERED = new Signal();
	_self.EVENTS_ORDERED = new Signal();
	
	(function(){ init(); })();
	
	function init()
	{
		event_generator = new EventGenerator();
		
		eventsGenerate( 100 );
	}
	
	_self.navigated = function( $target )
	{
		if ( $target.action === 'filter' )
		{
			var events_visible = [];
			
			for ( var i = 0; i < events.length; i++ )
			{
				if ( $target.value !== 'all' )
				{
					if ( events[i].getType() === $target.value )
					{
						events_visible[i] = { visible: true };
					}
					
					else
					{
						events_visible[i] = { visible: false };
					}
				}
				
				else
				{
					events_visible[i] = { visible: true };
				}
			}
			
			_self.EVENTS_FILTERED.dispatch( events_visible );
		}
		
		if ( $target.action === 'order' )
		{
	
		}
	}
	
	function eventsGenerate( $datasets )
	{		
		if ( events.length < $datasets )
		{			
			var event = event_generator.generateRandom()
			
			events.push( event );
			
			_self.EVENTS_UPDATED.dispatch( events );
			
			timer( function(){ eventsGenerate( $datasets ); } );
		}
	}
		
	function timer( $callback, $max )
	{
		if ( ! $max )
		{
			$max = 100;
		}
		
		setTimeout( $callback, Math.random() * $max );
	}
}