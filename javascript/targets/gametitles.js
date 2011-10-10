var GameTitles = function( $particles, $events )
{
	var _self = this;
	var particles;
	var events;
	var screen = { width: 600, height: 800 };
	var game_titles = [];
	
	(function(){ init( $particles, $events ); })()
	
	function init( $particles, $events )
	{
		particles = $particles;
		events = $events;
	}
	
	_self.getPositions = function()
	{
		var center = { x: screen.width / 2, y: screen.height / 2 };
		var positions = [];
		
		for ( var i = 0; i < events.length; i++ )
		{			
			if( events[i].getData().game )
			{
				var add_game_title = true;
				
				for ( var j = 0; j < game_titles.length; j++ )
				{
					if ( events[i].getData().game.title === game_titles[j] )
					{
						add_game_title = false;
						break;
					}
				}
				
				if ( add_game_title )
				{
					game_titles.push( events[i].getData().game.title );
					updateGameTitlePositions( game_titles );
				}
				
				
				positions.push( game_titles[getGameTitleIndex( events[i], game_titles )].position );
			}
		}
		
		//console.log( positions.length );
		
		//updateGameTitlePositions( game_titles );
		
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
		
	function updateGameTitlePositions( $game_titles )
	{
		for ( var i = 0; i < $game_titles.length; i++ )
		{	
			var column_count = ( screen.width - 100 ) / 100;
			var row_count = Math.ceil( $game_titles.length / column_count );
			
			// WHAT THE FUCK IT CANNOT BE THAT HARD.
			
			var point_in_grid = {
				x: i % ( row_count * column_count ),
				y: Math.ceil( i / column_count )
			};
			
	 		$game_titles[i].position = { x: point_in_grid.x * 50, y: ( screen.height - ( row_count * 50 ) ) / 2 };
		}	
	}
	
	function getGameTitleIndex( $event, $game_titles )
	{
		var return_value = 0;
		
		for ( var i = 0; i < $game_titles.length; i++ )
		{
			if ( $event.getData().game.game_title === $game_titles[i] )
			{
				return_value = i;
				break;
			}
		}
		
		return return_value;
	}
	
	function mapRange( $value, $low_1, $high_1, $low_2, $high_2 )
	{
		return $low_2 + ( $high_2 - $low_2 ) * ( $value - $low_1) / ( $high_1 - $low_1 );
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