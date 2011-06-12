var Particle = function()
{
	var _self = this;
	var position = null;
	var velocity = null;
	var acceleration = null;
	var damping = 0.13;
	var lifespan = 1100;
	var death_rate = 1;
	var has_lifespan = true;
	var index;
	
	_self.init = function($data)
	{
		position = Vector.create([$data.x, $data.y, 0]);
		velocity = Vector.create([0, 0, 0]);
		acceleration = Vector.create([0, 0, 0]);
		index = $data.index;
		console.log(index);
	}
	
	//	update particle values
	_self.update = function()
	{
		velocity = velocity.add(acceleration);
		position = position.add(velocity);

		//reset acceleration
		acceleration.setElements([0, 0, 0]);
		
		//if this has a lifespan, move towards 0
		if(_self.has_lifespan)
		{
			lifespan -= death_rate;
		}
	}
	
	//	apply force to this article
	_self.applyForce = function(force)
	{
		acceleration = acceleration.add(force);
	}
	
	_self.addDampening = function(dampening)
	{
		velocity = velocity.multiply(dampening);
	}
	
	_self.getPosition = function()
	{
		return {
			x: position.elements[0],
			y: position.elements[1]
		};
	}
		
	_self.setPosition = function(x, y, z)
	{
		position.setElements([x, y, z]);
	}
	
	_self.getVelocity = function()
	{
		return {
			x: velocity.elements[0],
			y: velocity.elements[1],
			z: velocity.elements[2]
		};
	}
	
	_self.setVelocity = function(x, y, z)
	{
		velocity.setElements([x, y, z]);
	}	
	
	_self.setLifespan = function(lifespan, death_rate)
	{
		lifespan = lifespan;
		death_rate = death_rate;
		has_lifespan = true;
	}
		
	_self.isDead = function()
	{
		return lifespan <= 0;
	}
	
	//	processing.org map function
	_self.mapRange = function(value, low1, high1, low2, high2)
	{
		return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}
	
	_self.applyParticleRepulsion = function(particle, radius, scale)
	{
		applyRepulsionForce(particle.position, radius, scale, particle); 
	}
	
	_self.applyAttractionForce = function($force, $radius, $scale, $particle)
	{
		var distance = position.distanceFrom($force);
		
		// do nothing
		if(distance > $radius && $radius != -1) return;
		
		//Get Direction
		var direction = position.subtract($force).toUnitVector();
		
		if($radius != -1)
		{
		//Get Scale
			var pct = 1 - (distance / $radius);
			var scale_vec = Vector.create([$scale, $scale, 0]);
		
		//Find new force
			var new_force = direction.multiply(distance).multiply($scale).multiply(pct);
		}
		
		else
		{
			var new_force = direction.multiply(distance).multiply($scale);
		}
		
		//Apply
		acceleration = acceleration.subtract(new_force);
		
	}
	
	_self.applyRepulsionForce = function($force, $radius, $scale, $particle)
	{
		var direction = position.subtract($force).toUnitVector();
		var distance = position.distanceFrom($force);
		
		if(distance > $radius) return;
		
		//Scale
		var pct = 1 - (distance / $radius);
		var scale_vec = Vector.create([$scale, $scale, 0]);
		
		var new_force = direction.multiply(distance).multiply($scale).multiply(pct);
		
		//Apply
		acceleration = acceleration.add(new_force);
		
		//	apply force to other particle
		if($particle)
		{
			$particle.acceleration = $particle.acceleration.subtract(new_force);
		}
	}
};