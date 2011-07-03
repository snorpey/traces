var Graph = function()
{
	var _self = this;
	
	var ctx;
	var events = [];
	var particles = [];
	var screen = {width: 800, height: 600};
	var generator;
	
	var data_types = ['code', 'music', 'text', 'game', 'location', 'photo'];
	
	_self.init = function()
	{
		ctx = document.getElementById('canvas').getContext('2d');

		eventsGenerate(50);	
		_self.run();
	}
	
	//	set screen size.
	//	called every time the window size changes
	_self.setScreenSize = function($screen)
	{
		screen = $screen;
	}
	
	_self.navigate = function( $nav )
	{
		//console.log( $nav );
		
		var action = $nav.split('-')[0];
		var value = $nav.split('-')[1];
				
		if(
			action === 'filter' && 
			value !== undefined
		)
		{
			filterEvents( value );
		}
	}
	
	_self.run = function()
	{
		requestAnimFrame( _self.run );
		update();
		draw();
	}
	
	_self.getParticleCount = function()
	{
		return particles.length;
	}
	
	function update()
	{
		// set particle position
		// this is where the cool shit is supposed to happen. (I guess)
		for(var i = 0; i < events.length; i++)
		{
			//var target_x = mapRange(events[i].getDate().format('ss'), 60, 0, 50, screen.width - 200);
			
			var target_x = mapRange(i, events.length, 0, 50, screen.width - 50);
			var target_y = screen.height - 50;
			
			particles[i].applyAttractionForce( Vector.create( [target_x, target_y, 0] ), -1, 0.01 );
		}
		
		for(var i = 0; i < particles.length; i++)
		{
			particles[i].addDampening(0.8);
			particles[i].update();
		}
		
		//	merge event and particle classes into one class
		// 	also, do not use functional apporach anymore
		
		/*
		//	sort particles by current x position
		//	EDIT: since events  and particles are 
		//	supposed to be in sync this may not
		//	be such a good idea.
		
		particles.sort(
			function(a, b)
			{
				return a.getPosition().x - b.getPosition().x ;
			}
		);
		
		//	cycle backwards through articles
		//	because sometimes a particle dies
		//	(use splice() !) 
		var i = particles.length;

		while(i--)
		{
			particles[i].update();
		}
		*/
	}
	
	//	draw particles on the canvas
	function draw()
	{
		//clear background
		ctx.fillStyle = 'rgba(255, 255, 255, 0.79)';
		ctx.fillRect(0, 0, screen.width, screen.height);
		
		//draw particles
		var i = particles.length;

		while(i--)
		{
			if( particles[i].getColor().a !== 0 )
			{
				var px = ~~ ( particles[i].getPosition().x + 0.5 );
				var py = ~~ ( particles[i].getPosition().y + 0.5 );
	
				ctx.fillStyle = particles[i].getColor( true );
				ctx.beginPath();
				ctx.arc( px, py, 1.5, 0, Math.PI * 2, true );
				ctx.closePath();
				ctx.fill();
			}
		}
	}
	
	//	data generation.
	//	eventually to be replaced with
	//	a callback for an AJAX call in main
	function eventsGenerate($datasets)
	{
		if(generator === undefined)
		{
			generator = new Generator();
		}
		
		if(events.length < $datasets)
		{			
			events.push( generator.generateRandom() );
			
			particleAdd( event );
			timer( function(){ eventsGenerate( $datasets ); } );
		}
	}
	
	function timer( $callback, $max )
	{
		if(!$max)
		{
			$max = 500;
		}
		
		setTimeout( $callback, Math.random() * $max );
	}
	
	//	create a new particle, corresponding to an event
	//	$event:{name, type, date, info}
	// ! gf: this ain't good. change!
	function particleAdd( $event )
	{
		var index = events.length - 1;
		
		var particle = {};
			particle.x = Math.round( Math.random() * screen.width );
			particle.y = Math.round( Math.random() * screen.height );
			particle.index = events.length;
		
		particles[index] = new Particle();
		particles[index].init( particle );
	}
	
	function filterEvents( $type )
	{
		for(var i = 0; i < events.length; i++)
		{
			if($type === 'all')
			{
				particles[i].setVisibility( true );
			}
			
			else
			{				
				if(events[i].getType() === $type)
				{
					particles[i].setVisibility( true );
				}
				
				else
				{
					particles[i].setVisibility( false );
				}
			}
		}
	}

	//	processing.org map function
	function mapRange( $value, $low1, $high1, $low2, $high2 )
	{
		return $low2 + ( $high2 - $low2 ) * ( $value - $low1) / ( $high1 - $low1 );
	}
	
	function randomFromTo( $from, $to )
	{
		return Math.floor( Math.random() * ( $to - $from + 1 ) + $from );
	};
}