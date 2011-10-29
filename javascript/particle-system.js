var ParticleSystem = function()
{
	var _self = this;
	
	var ctx;
	var events = [];
	var particles = [];
	var screen = { width: 800, height: 600 };
	
	//	--> events system
	var generator;
	var filter = 'all';
	var display = 'line';
	var collision = false;
			
	var data_types = ['code', 'music', 'text', 'game', 'location', 'photo'];
	
	var _targets;
	
	var Signal = signals.Signal;
	
	_self.PARTICLES_UPDATED = new Signal();
	
	_self.init = function()
	{
		ctx = document.getElementById('canvas').getContext('2d');
		
		_self.run();
	}
	
	//	set screen size.
	//	called every time the window size changes
	_self.screenUpdated = function( $screen )
	{
		screen = $screen;
	}
	
	_self.navigated = function( $target )
	{				
		if (
			$target &&
			$target.action === 'filter'
		)
		{	
			// prolly messy, maybe change signal orders?

			//setTimeout( function(){ _self.PARTICLES_UPDATED.dispatch( particlesGetVisible() ); }, 30 );
		}
	}
	
	_self.run = function()
	{
		requestAnimFrame( _self.run );
		update();
		
		//if ( particlesMoving() )
		//{
			draw();
		//}		
	}
	
	function update()
	{
		// set particle position
		// this is where the cool shit is supposed to happen. (I guess)
		
		for ( var i = 0; i < particles.length; i++ )
		{
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
		//ctx.fillStyle = 'rgba(255, 255, 255, 0.79)';
		//ctx.fillRect(0, 0, screen.width, screen.height);
		
		
		ctx.clearRect(0, 0, screen.width, screen.height);
		
		/*if ( map.getActive() )
		{
			var image = new Image();
            	image.src = 'images/world-map.png';
                     
			try
			{
				ctx.globalAlpha = 0.1;
				ctx.drawImage( image, 0, 0, screen.width, screen.height );
				ctx.globalAlpha = 1;
			}
			
			catch( error ){}
		}*/	
		
		//draw particles
		var i = particles.length;

		while ( i-- )
		{
			if (
			//	particles[i].getColor().a !== 0 &&
				particles[i].getVisibility() === true
			)
			{
				var px = ~~ ( particles[i].getPosition().x + 0.5 );
				var py = ~~ ( particles[i].getPosition().y + 0.5 );
	
				//ctx.fillStyle = particles[i].getColor();
				ctx.fillStyle = '#ffffff';
				ctx.beginPath();
				ctx.arc( px, py, 1.5, 0, Math.PI * 2, true );
				ctx.closePath();
				ctx.fill();
			}
		}
	}
	
	_self.eventsUpdated = function( $events )
	{
		events = $events;
		
		if ( $events.length > particles.length )
		{
			for ( var i = 0; i < $events.length - particles.length; i++ )
			{
				particleAdd( $events[particles.length + i] );
			}
		}
	}
	
	_self.eventsFiltered = function( $events_visible )
	{	
		if ( $events_visible.length === particles.length )
		{
			for ( var i = 0; i < $events_visible.length; i++ )
			{
				particles[i].setVisibility( $events_visible[i].visible );
			}
		}
		
		if ( $events_visible.length > particles.length )
		{
			for ( var i = 0; i < particles.length; i++ )
			{
				particles[i].setVisibility( $events_visible[i].visible );
			}
		}
		
		if ( $events_visible.length < particles.length )
		{
			for ( var i = 0; i < $events_visible.length; i++ )
			{
				particles[i].setVisibility( $events_visible[i].visible );
			}
			
			for ( var i = $events_visible.length - 1; i < particles.length - $events_visible.length; i++ )
			{
				particles[i].setVisibility( false );
			}
		}
		
		_self.PARTICLES_UPDATED.dispatch( particlesGetVisible() );
	}
	
	_self.targetsUpdated = function( $targets )
	{
		var visible_particles = particlesGetVisible();
		
		if ( _targets !== $targets )
		{
			_targets = $targets;
		}
		
		for (  var i = 0; i < $targets.length; i++)
		{
			if( visible_particles[i] )
			{
				visible_particles[i].setTarget( $targets[i] );
			}
		}
	}
	
	_self.setCollision = function( $collision )
	{
		if ( $collision )
		{
			collision = true;
		}
		
		else
		{
			collision = false;
		}
	}
	
	//	create a new particle, corresponding to an event
	//	$event:{name, type, date, info}
	// ! gf: this ain't good. change!
	function particleAdd( $event )
	{
		var index = events.length - 1;
		
		var particle_position = {};
			particle_position.x = Math.round( Math.random() * screen.width );
			particle_position.y = Math.round( Math.random() * screen.height );
			particle_index = events.length;
		
		//particles[index] = new Particle( particle_position, particle_index );
		particles.push( new Particle( particle_position, particle_index ) );
		
		_self.PARTICLES_UPDATED.dispatch( particlesGetVisible() );
	}
	
	function particlesMoving()
	{
		// if no particle is moving, stop the canvas update
		
		return_value = false;
		
		for ( var i = 0; i < particles.length; i++ )
		{
			if ( particles[i].getMoving() )
			{
				return_value = true;
				break;
			}
		}
		
		return return_value;
	}
	
	function particlesGetVisible()
	{
		var particles_active = [];
		
		for ( var i = 0; i < particles.length; i++ )
		{
			if ( particles[i].getVisibility() )
			{
				particles_active.push( particles[i] );
			}
		}
		
		return particles_active;
	}
		
	function filterEvents( $type )
	{
		for ( var i = 0; i < events.length; i++ )
		{
			if ( $type === 'all' )
			{
				particles[i].setVisibility( true );
			}
			
			else
			{				
				if ( events[i].getType() === $type )
				{
					particles[i].setVisibility( true );
				}
				
				else
				{
					particles[i].setVisibility( false );
				}
			}
		}
		
		filter = $type;
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