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
			$('body').prepend('<svg id="graph" xmlns="http://www.w3.org/2000/svg"></svg>');
			
			$('#graph').css(
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
			$('#graph').css(
				{
					width: $(window).width(),
					height: $(window).height()
				}
			);
			
			graph.setScreenSize({width: $(window).width(), height: $(window).height()});
			graph.reDraw();
		}
	}
);

