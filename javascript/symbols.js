var Symbols = function( $data )
{
	var _self = this;
	var particles;
	var symbols = [];
	var active = false;
	var symbol_active = -1;
		
	(function(){ init( $data ); })()
	
	function init( $particles )
	{
		particles = $particles;
		setSymbolData( true, true );
	}
	
	_self.setSymbol = function( $symbol )
	{		
		for( var i = 0; i < symbols.length; i++ )
		{			
			if ( symbols[i].name === $symbol )
			{
				active = true;
				symbol_active = i;
				
				//getParticlePosition( 5, symbols[i], getPathLength( symbol_active ) );
				break;
			}			
		}
	}
	
	_self.setInactive = function()
	{
		active = false;
	}
	
	_self.getActive = function()
	{
		return active;
	}
	
	_self.getPositions = function()
	{
		var positions = [];
		
		for (var i = 0; i < particles.length; i++)
		{
			var particle = particles[i];

			positions[i] = getParticlePosition( i, symbols[symbol_active], getPathLength( symbol_active ) );
		}
		
		return positions;
	}
	
	_self.particlesUpdate = function( $particles )
	{
		particles = $particles;
	}
	
	function getPathLength( $symbol_index )
	{
		var path_length = 0;
	
		if ( symbol_active !== -1 )
		{
			for ( var i = 0; i < symbols[$symbol_index].points.length; i++ )
			{
				var point = symbols[$symbol_index].points[i];
				
				if( i < symbols[$symbol_index].points.length - 1 )
				{
					path_length += dist( symbols[$symbol_index].points[i], symbols[$symbol_index].points[parseInt( i + 1 )] );
				}
				
				else
				{
					path_length += dist( symbols[$symbol_index].points[i], symbols[$symbol_index].points[0] );
				}
			}
		}
		
		return path_length;
	}
	
	function getParticlePosition( $particle_index, $path, $path_length )
	{
		var distance_on_path = ( $path_length / particles.length ) * $particle_index;
		var path_segment = 0;
		var path_segment_distance = 0;		
		var position = {};
		
		getPathSegment( 0 );
		
		function getPathSegment( $path_segment )
		{		
			if ( path_segment_distance < distance_on_path && $path_segment < $path.points.length - 1)
			{				
				path_segment_distance += dist( $path.points[$path_segment], $path.points[parseInt( $path_segment + 1 )] );
				getPathSegment( parseInt( $path_segment + 1 ) );
			}
			
			else
			{
				getPositionOnPath( $particle_index, distance_on_path, $path, $path_segment, path_segment_distance );
			}			
		}
		
		function getPositionOnPath( $particle_index, $distance_on_path, $path, $path_segment, $path_segment_distance )
		{
			var next_segment = parseInt($path_segment + 1);			
			
			if ( $path_segment === $path.points.length - 1)
			{
				next_segment = 0;
			}
			
			var percentage_on_segment = ( distance_on_path - path_segment_distance ) / dist( $path.points[$path_segment], $path.points[next_segment] );			
			
			position = {
				x: (percentage_on_segment * ( $path.points[next_segment].x - $path.points[$path_segment].x )) + $path.points[next_segment].x,
				y: (percentage_on_segment * ( $path.points[next_segment].y - $path.points[$path_segment].y )) + $path.points[next_segment].y
			}
		}
		
		return position;
	}

	function setSymbolData( $scale, $center )
	{
		symbols[0] = {
			name: 'music',
			size: { width: 200, height: 200 },
			points: [
				{ x: 9.612, y: 11.353 }, 
				{ x: 8.965, y: 11.853 }, 
				{ x: 8.789, y: 12.234 }, 
				{ x: 8.642, y: 12.881 }, 
				{ x: 8.642, y: 13.557 }, 
				{ x: 8.612, y: 14.38 }, 
				{ x: 8.701, y: 15.497 }, 
				{ x: 8.877, y: 16.084 }, 
				{ x: 9.229, y: 16.555 }, 
				{ x: 9.729, y: 16.761 }, 
				{ x: 10.229, y: 16.584 }, 
				{ x: 10.64, y: 16.261 }, 
				{ x: 11.11, y: 15.938 }, 
				{ x: 11.493, y: 15.997 }, 
				{ x: 11.551, y: 16.144 }, 
				{ x: 11.581, y: 16.819 }, 
				{ x: 11.64, y: 18.906 }, 
				{ x: 11.617, y: 19.583 }, 
				{ x: 11.64, y: 22.991 }, 
				{ x: 12.168, y: 23.079 }, 
				{ x: 12.139, y: 23.814 }, 
				{ x: 12.168, y: 27.634 }, 
				{ x: 12.756, y: 27.487 }, 
				{ x: 12.756, y: 23.049 }, 
				{ x: 13.256, y: 22.961 }, 
				{ x: 13.315, y: 18.994 }, 
				{ x: 13.347, y: 17.051 }, 
				{ x: 13.197, y: 15.849 }, 
				{ x: 12.686, y: 14.441 }, 
				{ x: 12.374, y: 13.586 }, 
				{ x: 11.997, y: 13 }, 
				{ x: 11.574, y: 12.409 }, 
				{ x: 10.905, y: 11.911 }, 
				{ x: 10.407, y: 11.634 }, 
				{ x: 10.111, y: 11.47 }
			]
		}
		
		for( var i = 0; i < symbols.length; i++ )
		{
			symbols[i].size = getSymbolSize( symbols[i] );
			
			if( $scale )
			{
				symbols[i] = symbolScale( symbols[i], ( 300 / symbols[i].size.height ) );
			}
			
			if( $center )
			{
				symbols[i].size = getSymbolSize( symbols[i] );
				symbols[i] = symbolCenter( symbols[i] );
			}
		}	
	}
	
	function getSymbolSize( $path )
	{
		var size = { width: 0, height: 0 };
		
		for( var i = 0; i < $path.points.length; i++ )
		{
			if( $path.points[i].x > size.width )
			{
				size.width = $path.points[i].x;
			}
			
			if( $path.points[i].y > size.height )
			{
				size.height = $path.points[i].y;
			}
		}
		
		return size;
	}
	
	function symbolScale( $path, $scale )
	{		
		var new_positions = [];
		
		for( var i = 0; i < $path.points.length; i++ )
		{
			new_positions.push( { x: $path.points[i].x * $scale, y: $path.points[i].y * $scale } );
		}
		
		$path.points = new_positions;
				
		return $path;
	}
	
	function symbolCenter( $path )
	{
		var new_positions = [];
		var left = ( $( window ).width() - $path.size.width ) / 2;
		var top = ( $( window ).height() - $path.size.height ) / 2;
		
		for( var i = 0; i < $path.points.length; i++ )
		{
			new_positions.push( { x: parseInt( $path.points[i].x + left ), y: parseInt( $path.points[i].y + top ) } );
		}
		
		$path.points = new_positions;
		
		return $path;
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