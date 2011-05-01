var Graph = function()
{
	var _self = this;
	
	var random = [];
	var events = [];
	var screen = {width: 800, height: 600};
	
	_self.init = function()
	{
		dataGenerate(50);
		
		draw();
	}
	
	//	set screen size.
	//	called every time the window size changes
	_self.setScreenSize = function($screen)
	{
		screen = $screen;
	}
	
	//	redraw the content
	_self.reDraw = function()
	{
		draw();
	}
	
	function draw()
	{
	
	}
	
	//	data generation function.
	//	eventually to be replaced with
	//	a callback for an AJAX call in main
	function eventsGenerate($datasets)
	{
		for(var i = 0; i < $datasets; i++)
		{
			//random[i] = Math.round(Math.random() * 100);
			
			var position = {};
			position = {};
			position.x = Math.round(Math.random() * screen.width;
			position.y = Math.round(Math.random() * screen.height;
			
			var data = {}
			data.name = 'Event ' + i;
			data.type = 'code';
			data.date = getDateTime();			
			data.info = {};
			
			eventAdd(position, type);
		}
	}
	
	//	add events
	//	$position: {x, y}
	//	$data:{name, type, date, info}
	function eventAdd($position, $data)
	{
		var index = events.length;
		events[index] = new Event();
		events[index].init($position, $data);
	}
	
	//	processing map function
	function mapRange(value, low_1, high_1, low_2, high_2)
	{
    	return low2 + (high_2 - low_2) * (value - low_1) / (high_1 - low_1);
	}
	
	function getDateTime()
	{
		var now = new Date();
		return now.format("isoDateTime");
	}
}