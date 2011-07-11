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
		
		symbols[1] = {
			name: 'game',
			points: [
				{ x: 1.271, y: 12.458 }, 
				{ x: 0.521, y: 17.708 }, 
				{ x: 0, y: 20.687 }, 
				{ x: 0.083, y: 22.209 }, 
				{ x: 0.417, y: 23.354 }, 
				{ x: 1.333, y: 24.625 }, 
				{ x: 1.812, y: 24.959 }, 
				{ x: 2.812, y: 25.438 }, 
				{ x: 4.062, y: 25.709 }, 
				{ x: 5.333, y: 25.604 }, 
				{ x: 6.396, y: 25.188 }, 
				{ x: 7.188, y: 24.521 }, 
				{ x: 8.646, y: 22.521 }, 
				{ x: 9.458, y: 21.021 }, 
				{ x: 10.313, y: 19.396 }, 
				{ x: 10.875, y: 18.5 }, 
				{ x: 11.708, y: 19.313 }, 
				{ x: 12.604, y: 19.625 }, 
				{ x: 13.521, y: 19.792 }, 
				{ x: 15.208, y: 19.729 }, 
				{ x: 16.042, y: 19.458 }, 
				{ x: 16.729, y: 19 }, 
				{ x: 17.271, y: 18.375 }, 
				{ x: 17.729, y: 17.729 }, 
				{ x: 18.104, y: 17.292 }, 
				{ x: 18.271, y: 16.958 }, 
				{ x: 22.417, y: 17 }, 
				{ x: 23, y: 17.917 }, 
				{ x: 23.688, y: 18.563 }, 
				{ x: 24.646, y: 19.229 }, 
				{ x: 25.604, y: 19.688 }, 
				{ x: 27.25, y: 19.792 }, 
				{ x: 28.396, y: 19.563 }, 
				{ x: 29.167, y: 19.208 }, 
				{ x: 29.646, y: 18.875 }, 
				{ x: 29.917, y: 18.625 }, 
				{ x: 31.958, y: 22.25 }, 
				{ x: 33.042, y: 23.938 }, 
				{ x: 33.792, y: 24.812 }, 
				{ x: 35.25, y: 25.584 }, 
				{ x: 37, y: 25.604 }, 
				{ x: 37.979, y: 25.375 }, 
				{ x: 38.854, y: 24.959 }, 
				{ x: 39.479, y: 24.438 }, 
				{ x: 40.104, y: 23.562 }, 
				{ x: 40.458, y: 22.729 }, 
				{ x: 40.604, y: 21.75 }, 
				{ x: 40.604, y: 20.375 }, 
				{ x: 39.146, y: 9.333 }, 
				{ x: 39.083, y: 7.938 }, 
				{ x: 38.958, y: 7.271 }, 
				{ x: 38.375, y: 6.083 }, 
				{ x: 37.396, y: 4.771 }, 
				{ x: 36.792, y: 4.042 }, 
				{ x: 36.062, y: 3.521 }, 
				{ x: 35.729, y: 3.312 }, 
				{ x: 35.583, y: 2.312 }, 
				{ x: 35.438, y: 1.708 }, 
				{ x: 35.083, y: 1.021 }, 
				{ x: 34.521, y: 0.562 }, 
				{ x: 33.917, y: 0.271 }, 
				{ x: 33.167, y: 0.104 }, 
				{ x: 32.25, y: 0 }, 
				{ x: 31.583, y: 0 }, 
				{ x: 30.646, y: 0.188 }, 
				{ x: 30.167, y: 0.438 }, 
				{ x: 29.75, y: 0.75 }, 
				{ x: 29.354, y: 1.104 }, 
				{ x: 29.083, y: 1.625 }, 
				{ x: 28.833, y: 2.083 }, 
				{ x: 28.604, y: 2.708 }, 
				{ x: 28.562, y: 3.563 }, 
				{ x: 28.146, y: 3.917 }, 
				{ x: 12.604, y: 3.979 }, 
				{ x: 12.312, y: 3.667 }, 
				{ x: 12.021, y: 3.396 }, 
				{ x: 11.771, y: 3.146 }, 
				{ x: 11.75, y: 2.646 }, 
				{ x: 11.667, y: 2.104 }, 
				{ x: 11.5, y: 1.458 }, 
				{ x: 11.188, y: 1 }, 
				{ x: 10.75, y: 0.542 }, 
				{ x: 10.104, y: 0.229 }, 
				{ x: 9.479, y: 0.083 }, 
				{ x: 8.833, y: 0.042 }, 
				{ x: 7.688, y: 0.063 }, 
				{ x: 6.812, y: 0.25 }, 
				{ x: 6.417, y: 0.438 }, 
				{ x: 6.042, y: 0.646 }, 
				{ x: 5.667, y: 1.104 }, 
				{ x: 5.375, y: 1.5 }, 
				{ x: 5.229, y: 1.917 }, 
				{ x: 5.125, y: 2.458 }, 
				{ x: 5.042, y: 3.188 }, 
				{ x: 4.188, y: 3.854 }, 
				{ x: 3.75, y: 4.208 }, 
				{ x: 2.917, y: 5.125 }, 
				{ x: 2.479, y: 5.917 }, 
				{ x: 2.083, y: 6.979 }, 
				{ x: 1.75, y: 8 }, 
				{ x: 1.625, y: 9.312 }, 
				{ x: 1.375, y: 10.312 }, 
				{ x: 1.25, y: 12.042 }
			]
		}
		
		symbols[2] = {
			name: 'location',
			points: [
				{ x: 1.445, y: 4.013 }, 
				{ x: 3.531, y: 29.695 }, 
				{ x: 2.889, y: 3.691 }, 
				{ x: 3.853, y: 2.407 }, 
				{ x: 3.692, y: 0.963 }, 
				{ x: 2.889, y: 0 }, 
				{ x: 1.605, y: 0 }, 
				{ x: 0.642, y: 0.16 }, 
				{ x: 0, y: 1.284 }, 
				{ x: 0.161, y: 2.407 }, 
				{ x: 0.481, y: 2.889 }
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