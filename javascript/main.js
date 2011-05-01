$(document).ready(
	function()
	{
		// data sources
		/*
			flickr
			twitter
			foursquare
			steam
			psn
			last.fm
			gowalla
			stack overflow
			github
			delicious
		*/
		
		// frameworks:
		/*
			d3.js for graphs
			isotope for layout
		*/
		
		var graph = new Graph();
		
		$(window).resize(resized);
		
		init();
		
		function init()
		{		
			$('body').prepend('<canvas id="canvas" width="960" height="450">sorry but your browser doesn\'t support the canvas tag.</canvas>');
			
			$('#canvas').css(
				{
					position: 'absolute',
				 	top: 0,
				 	left: 0,
			 		zIndex: 1
				}
			);
			
			graph.init();
			resized();
		}
		
		function resized()
		{
			$('#canvas').attr(
				{
					width: $(window).width(),
					height: $(window).height()
				}
			);
			
			graph.setScreenSize({width: $(window).width(), height: $(window).height()});
		}
	}
);

