var Timeline = function( $particles, $events )
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
		var first_date = getFirstDate( events );
		var last_date = getLastDate( events );
		
		for ( var i = 0; i < particles.length; i++ )
		{
			var particle = particles[i];
			
			positions[i] = getParticlePosition( i, first_date, last_date );
			
			for ( var j = 0; j < positions.length; j++ )
			{
				if ( 
					Math.abs( positions[j].x - positions[i].x ) <= 4 &&
					j !== i
				)
				{
					positions[i].y -= 2;
				}
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

	function getParticlePosition( $particle_index, $first_date, $last_date )
	{
		var position = { x: 0, y: screen.height / 2 };
				
		position.x = mapRange(
			Math.round( events[$particle_index].getDate().getTime() / 1000 ),
			Math.round( $first_date.getTime() / 1000 ),
			Math.round( $last_date.getTime() / 1000 ),
			50,
			screen.width - 100
		)
		
		return position;
	}
	
	function getFirstDate( $events )
	{
		var first_date = new Date();
		
		for ( var i = 0; i < $events.length; i++ )
		{
			if ( $events[i].getDate() < first_date )
			{
				first_date = $events[i].getDate();
			}
		}
		
		return first_date;
	}
	
	function getLastDate( $events )
	{
		var last_date = new Date( 1900, 0, 1 );
		
		for ( var i = 0; i < $events.length; i++ )
		{
			if ( $events[i].getDate() > last_date )
			{
				last_date = $events[i].getDate();
			}
		}
		
		return last_date;
	}
	
	function mapRange( $value, $low1, $high1, $low2, $high2 )
	{
		return $low2 + ( $high2 - $low2 ) * ( $value - $low1) / ( $high1 - $low1 );
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