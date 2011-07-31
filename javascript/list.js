var List = function( $particles, $events )
{
	var _self = this;
	var particles;
	var events;
	var symbols = [];
	var active = false;
	var screen = { width: 600, height: 800 };
	
	var filter;
	
	
	(function(){ init( $particles, $events ); })()
	
	function init( $particles, $events )
	{
		particles = $particles;
		events = $events;
	}
	
	_self.setActive = function()
	{		
		active = true;
	}
	
	_self.setInactive = function()
	{
		active = false;
	}
	
	_self.getActive = function()
	{
		return active;
	}
	
	_self.setFilter = function( $filter )
	{
		filter = $filter;
	}
	
	_self.getPositions = function( filter )
	{
		var positions = [];
		var first_date = getFirstDate( events );
		var last_date = getLastDate( events );
		
		for ( var i = 0; i < particles.length; i++ )
		{
			var particle = particles[i];
			
			positions[i] = getParticlePosition( i, first_date, last_date );
			
			for( var j = 0; j < positions.length; j++ )
			{
				if( 
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
	
	_self.getLabelPositions = function( $filter, $events )
	{
		var positions = [];
		var keys = getKeys( filter );
		var values = getValues( keys, $events )
		var distance = parseInt( (screen.height - 200) / keys.length );
		var labels = [];
		
		for( var i = 0; i < values.length; i++ )
		{
			var position = {};
				position.x = 200;
				position.y = 100 + i * distance;
		}
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
	
	function getKeys( $filter )
	{
		var keys = [];
		
		if( $filter === 'all' )
		{
			keys = [ 'type' ];
		}
		
		if( $filter === 'location' )
		{
			keys = [ 'location', 'type' ];
		}
		
		if( $filter === 'music' )
		{
			keys = [ 'music', 'artist' ];
		}
		
		if( $filter === 'photo' )
		{
			keys = [ 'photo', 'tags' ];
		}
		
		if( $filter === 'game' )
		{
			keys = [ 'game', 'title' ];
		}
		
		return keys;
	}
	
	function getValues( $keys, $events )
	{
		var values = [];
		
		for( var i = 0; i < $events.length; i++ )
		{
			var key = $events[i];
			
			for( var j = 0; j < $keys.length; j++ )
			{
				if( key[$keys[j]] )
				{
					key = key[$keys[j]];
					
					var value_add = true;
					
					for( var k = 0; k < values.length; k++ )
					{
						if( key === values[k] )
						{
							value_add = false;
							break;
						}
					}
					
					if( value_add )
					{
						values.push( key );
					}
				}				
			}
		}
		
		return values;
	}

	function getParticlePosition( $particle_index, $first_date, $last_date )
	{
		var position = { x: 0, y: screen.height / 2 };
				
		//console.log( event[$particle_index].getDate() );
		position.x = mapRange(
			Math.round( events[$particle_index].getDate().getTime() / 1000 ),
			Math.round( $first_date.getTime() / 1000 ),
			Math.round( $last_date.getTime() / 1000 ),
			50,
			screen.width - 100
		)
		
		return position;
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