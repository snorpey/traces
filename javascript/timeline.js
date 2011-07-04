var Timeline = function( $data )
{
	var _self = this;
	var timespan = { start: new Date(), end: new Date() };
	var show_labels = false;
	var active = false;
	
	(function(){ init( $data ); })()
	
	function init( $data )
	{

	}
	
	_self.update = function()
	{
		// recalculate display
		
		if(active)
		{
		
		}
		
		else
		{
		
		}
	}
	
	_self.changeTimespan = function()
	{
		// show only a part
	}
	
	
	_self.getXbyDate = function()
	{
		// calculate Xpos by given Date
	}
	
	_self.setActive = function()
	{
		// activate / deactivate
	}
}