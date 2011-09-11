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
	var color = { r: 0, g: 0, b: 0, a: 1 };
	
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
			// YAAY. MOVE
		}
		
		velocity = velocity.add( acceleration );
		position = position.add( velocity );
	
		
		//reset acceleration
		acceleration.setElements( [0, 0, 0] );
		
		addDampening( 0.8 );
		fade();
	}
	
	/*_self.updateFilter( $filter )
	{
		if (
			$filter  
		)
		{
			
		}
	}*/
	
	function draw()
	{
		// draw particle
		// maybe somewhere else?
	}
	
	function applyForce( $force )
	{
		acceleration = acceleration.add( $force );
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