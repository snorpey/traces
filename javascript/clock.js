var Clock = function( $particles, $events )
{
	var _self = this;
	var particles;
	var events;
	var symbols = [];
	var active = false;
	var symbol_active = -1;
	var screen = { width: 600, height: 800 };
	
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
	
	_self.getPositions = function()
	{
		var center = { x: screen.width / 2, y: screen.height / 2 };
		var positions = [];
		//var positions_on_circle = getPositionsOnCircle( center, 150, 24 );
		
		
		for ( var i = 0; i < particles.length; i++ )
		{		
			var hour = events[i].getDate().getHours();
			var radius = 150;
			//getPositionOnCircle( $index, $center, $radius, $point_count )
			
			
			//position[i] = positions_on_circle[hour];
			
			for( var j = 0; j < events.length; j++ )
			{
				if(
					hour === events[j].getDate().getHours() &&
					i !== j
				)
				{
					radius += 5;
				}
			}
			
			positions[i] = getPositionOnCircle( i, center, radius, 24 )
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
	
	// 	THANKS newblack!
	// 	http://board.flashkit.com/board/showpost.php?s=5df1c00cfb0e5d2d4544997a59cf64d1&p=4079955&postcount=2
	//	(i hate this trigonomeztry...)
	/*
	function getPositionsOnCircle( $center, $radius, $point_count )
	{
		var alpha = Math.PI * 2 / $point_count;
		var points = [];
		var i = -1;
		
		while( ++i < $point_count )
		{
			var theta = alpha * i;
			var point_on_circle = { x: Math.cos( theta ) * $radius, y: Math.sin( theta ) * $radius };
			
			points[i] = { x: parseInt( center.x + point_on_circle.x ), y: parseInt( center.y + point_on_circle.y ) };
		}
		
		return points;
	}*/
	
	function getPositionOnCircle( $index, $center, $radius, $point_count )
	{
		var alpha = Math.PI * 2 / $point_count;
		var theta = alpha * $index;
		var point_on_circle = { x: Math.cos( theta ) * $radius, y: Math.sin( theta ) * $radius };
		var point = { x: parseInt( $center.x + point_on_circle.x ), y: parseInt( $center.y + point_on_circle.y ) };
	 	
	 	return point;
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