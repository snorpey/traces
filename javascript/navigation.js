var Navigation = function( )
{
	var _self = this;
	var text = [];
	var Signal = signals.Signal;
	
	_self.animation_done = new Signal();
		
	_self.init = function()
	{		
		$( 'nav').fadeIn(400);
	}
}