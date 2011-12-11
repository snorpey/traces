var Particle = function( $position, $index )
{
	var _self = this;
	
	var index;
	
	var position;
	var velocity;
	var accelleration;
	
	var target;
	
	var has_target = false;
	var is_moving = false;
	var visible = true;
	
	var damping = 0.13;
	var color = { r: 255, g: 255, b: 255, a: 1 };
	
	var screen = { width: 800, height: 600 };
	
	(function(){ init( $position, $index ); })();
	
	function init( $position, $index )
	{
		index = $index;
		position = Vector.create( [$position.x, $position.y, 0] );
		velocity = Vector.create( [0, 0, 0] );
		acceleration = Vector.create( [0, 0, 0] );
	}
	
	_self.run = function()
	{
		update();
		draw();
	}
	
	_self.setTarget = function( $target )
	{
		if ( $target )
		{
			target = $target;
			has_target = true;
		}
		
		else
		{
			target = undefined;
			has_target = false;
		}
	}
		
	_self.removeTarget = function()
	{
		_self.setTarget();
	}
	
	_self.screenUpdated = function( $screen )
	{
		screen = $screen;
	}
	
	_self.getPosition = function()
	{
		return {
			x: position.elements[0],
			y: position.elements[1]
		};
	}
		
	_self.setPosition = function( x, y, z )
	{
		position.setElements( [x, y, z] );
	}
	
	_self.getVelocity = function()
	{
		return {
			x: velocity.elements[0],
			y: velocity.elements[1],
			z: velocity.elements[2]
		};
	}
	
	_self.getColor = function()
	{
		return_value = color;
	}
	
	_self.getMoving = function()
	{
		return is_moving;
	}
	
	_self.setVisibility = function( $visible )
	{
		visible = $visible;
		
		fade();
	}
	
	_self.getVisibility = function()
	{
		return visible;
	}
	
	_self.update = function()
	{
		if ( has_target )
		{						
			if ( position.distanceFrom( Vector.create( [target.x, target.y, 0] ) ) > 0.2 )
			{
				
				is_moving = true;
				applyAttractionForce( Vector.create( [target.x, target.y, 0] ), -1, 0.01 );
			}
			
			else
			{
				is_moving = false;
			}
		}
		
		else
		{
			is_moving = true;

		}
		
		acceleration = acceleration.add( moveOnScreen( position, velocity, acceleration ) );			
		
		velocity = velocity.add( acceleration );
		position = position.add( velocity );
	
		
		//reset acceleration
		acceleration.setElements( [0, 0, 0] );
		
		if ( has_target )
		{
			addDampening( 0.8 );
		}
		
		fade();
	}
	
	function moveOnScreen( $position, $velocity, $acceleration )
	{
		// cool shit...
		// acceleration = acceleration.add( velocity.multiply( 1 ) );
		var new_acceleration = $acceleration;
		
		if ( $velocity.modulus() < 1 && ! has_target )
		{
			new_acceleration = acceleration.add( $velocity.multiply( 1 + ( Math.random() * 10 ) ) );
		}
		
		var new_position = $position.add( $velocity.add( new_acceleration ) );
		var collided = false;
		
		if (
			new_position.elements[0] > screen.width &&
			$velocity.elements[0] >= 0
		)
		{			
			new_acceleration.setElements( [ $velocity.elements[0] * -1, new_acceleration.elements[1], new_acceleration.elements[2] ] );
			collided = true;
		}
		
		if (
			new_position.elements[0] < 0 &&
			$velocity.elements[0] <= 0
		)
		{
			new_acceleration.setElements( [ $velocity.elements[0] * -1, new_acceleration.elements[1], new_acceleration.elements[2] ] );
			collided = true;
		}
		
		if (
			new_position.elements[1] > screen.height &&
			$velocity.elements[1] >= 0
		)
		{
			new_acceleration.setElements( [ new_acceleration.elements[0], $velocity.elements[1] * -1, new_acceleration.elements[2] ] );
			collided = true;
		}
		
		if (
			new_position.elements[1] < 0 &&
			$velocity.elements[1] <= 0
		)
		{
			new_acceleration.setElements( [ new_acceleration.elements[0], $velocity.elements[1] * -1, new_acceleration.elements[2] ] );
			collided = true;
		}
		
		if ( collided )
		{
			if ( new_acceleration.modulus < 0.2 )
			{
				new_acceleration = new_acceleration.toUnitVector().multiply( 1.3 );
			}
			
			else
			{
				// add dampening?
				//new_acceleration = new_acceleration.multipl
			}
		}
		
//		console.log( new_acceleration.modulus() )
		
		return new_acceleration;		
	}
	
	function draw()
	{
		// draw particle
		// maybe somewhere else?
	}
	
	function applyForce( $force )
	{
		acceleration = acceleration.add( $force );
	}
	
	//_self.repelFrom(  )
	
	_self.explode = function()
	{
		var center = Vector.create( [screen.width / 2, screen.height / 2, 0] );
		var direction = position.subtract( center ).toUnitVector();
		var acceleration_new = acceleration.add( direction.multiply( ( Math.random() * 5 ) + 1 ) );

		//console.log( 'EXPLODE', center, direction, acceleration, acceleration_new );

		if ( acceleration_new.modulus() )
		{
			acceleration = acceleration.add( acceleration_new );
		}
	}
	
	function addDampening( $dampening )
	{
		velocity = velocity.multiply( $dampening );
	}
	
	function applyAttractionForce( $force, $radius, $scale )
	{
		var distance = position.distanceFrom( $force );
		
		if (
			distance > $radius &&
			$radius != -1
		)
		{
			return;
		}
		
		//Get Direction
		var direction = position.subtract( $force ).toUnitVector();
		
		if ( $radius != -1 )
		{
			//Get Scale
			var pct = 1 - ( distance / $radius );
			var scale_vec = Vector.create( [$scale, $scale, 0] );
		
			//Find new force
			var new_force = direction.multiply( distance ).multiply( $scale ).multiply( pct );
		}
		
		else
		{
			var new_force = direction.multiply( distance ).multiply( $scale );
		}
		
		acceleration = acceleration.subtract( new_force );
	}
	
	function fade()
	{
		if (
			! visible &&
			color.a > 0
		)
		{
			if ( color.a < 0.02)
			{
				color.a = 0;
			}
			
			else
			{
				color.a *= 0.9;
			}
		}
		
		if (
			visible &&
			color.a < 1
		)
		{
			if ( color.a > 0.98)
			{
				color.a = 1;
			}
			
			else
			{
				color.a *= 1.1;
			}
		}
		
		color.a = parseFloat( color.a ).toFixed( 2 );
	}
};