var Graph = function()
{
	var _self = this;
	
	var ctx;
	var events = [];
	var particles = [];
	var screen = {width: 800, height: 600};
	
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
	
	_self.run = function()
	{
		requestAnimFrame( _self.run );
		update();
		draw();
	}
	
	function update()
	{

		for(var i = 0; i < events.length; i++)
		{
			//var target_x = mapRange(events[i].getDate().format('ss'), 60, 0, 50, screen.width - 200);
			
			var target_x = mapRange(i, events.length, 0, 50, screen.width - 50);
			var target_y = screen.height - 50;
			
			particles[i].applyAttractionForce(Vector.create([target_x, target_y, 0]), -1, 0.01);
		}
		
		for(var i = 0; i < particles.length; i++)
		{
			particles[i].addDampening(0.8);
			particles[i].update();
		}
		
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
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		ctx.fillRect(0, 0, screen.width, screen.height);
		
		//draw particles
		var i = particles.length;

		while(i--)
		{
			var px = ~~ (particles[i].getPosition().x + 0.5);
			var py = ~~ (particles[i].getPosition().y + 0.5);

			ctx.fillStyle = 'rgba(0, 0, 0, 1 )';
			ctx.beginPath();
			ctx.arc(px, py, 1.5, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}
	}
	
	//	data generation function.
	//	eventually to be replaced with
	//	a callback for an AJAX call in main
	function eventsGenerate($datasets)
	{
		if(events.length < $datasets)
		{			
			var position = {};
			position = {};
			position.x = Math.round(Math.random() * screen.width);
			position.y = Math.round(Math.random() * screen.height);
			
			var data = {}
			data.name = 'Event ' + events.length;
			data.type = 'code';
			data.date = new Date();			
			data.info = {};
			
			eventAdd(position, data);
			timer(function(){eventsGenerate($datasets);});
		}
	}
	
	function timer($callback)
	{
		setTimeout($callback, Math.random() * 500);
	}
	
	//	create a new event and corresponding particle
	//	$particle: {x, y}
	//	$event:{name, type, date, info}
	function eventAdd($particle, $event)
	{
		var index = events.length;
		
		particles[index] = new Particle();
		particles[index].init($particle);
		events[index] = new Event();
		events[index].init($event);
		
		//console.log(particles[index].getPosition())
	}
	
	//	processing map function
	function mapRange(value, low_1, high_1, low_2, high_2)
	{
    	return low_2 + (high_2 - low_2) * (value - low_1) / (high_1 - low_1);
	}
}