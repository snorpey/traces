var Map = function( $particles, $events )
{
	var _self = this;
	var particles;
	var events;
	var screen = { width: 600, height: 800 };
	
	(function(){ init( $particles, $events ); })()
	
	function init( $particles, $events )
	{
		particles = $particles;
		events = $events;
	}
	
	_self.getPositions = function()
	{	
		var positions = [];
		
		for ( var i = 0; i < events.length; i++ )
		{
			if ( events[i].hasLocation() )
			{
				positions[i] = getPosition( i, events[i] );
			}
			
			else
			{
				positions[i] = { x: screen.width / 2, y: -50 };
			}
		}
		
		return positions;
	}
	
	_self.particlesUpdate = function( $particles )
	{
		particles = $particles;
	}
	
	_self.eventsUpdate = function( $events )
	{
		events = $events;
	}
	
	_self.screenUpdate = function( $screen )
	{
		screen = $screen;
	}
	
	function getPosition( $index, $event )
	{
		var position = { x: 0, y: 0 };
		
		if( $event.hasLocation() )
		{	
			var location = $event.getData().location;
			
			position.x = mapRange( location.lng, -180, 180, 0, screen.width );
		
			if ( location.lat >= 0 )
			{
				position.y = mapRange( location.lat, 0, 90, screen.height / 2, 0 );
			}
			
			else
			{
				position.y = mapRange( location.lat, -90, 0, screen.height, screen.height / 2 );
			}		
		}
		
		return position;
	}
	
	function mapRange( $value, $low_1, $high_1, $low_2, $high_2 )
	{
		return $low_2 + ( $high_2 - $low_2 ) * ( $value - $low_1 ) / ( $high_1 - $low_1 );
	}

	function dist( $point_1, $point_2 )
	{
		var xs = 0;
		var ys = 0;
		
		xs = $point_2.x - $point_1.x;
		xs = xs * xs;
		
		ys = $point_2.y - $point_1.y;
		ys = ys * ys;
		
		return Math.sqrt( xs + ys );
	}
}