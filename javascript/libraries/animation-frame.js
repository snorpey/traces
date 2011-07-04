// shim layer with setTimeout fallback, see
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (
	function()
	{
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
 			window.mozRequestAnimationFrame	||
				window.oRequestAnimationFrame		||
				window.msRequestAnimationFrame 	||
				function(callback, element)
				{
				window.setTimeout(callback, 1000 / 60);
				};
	}
)();