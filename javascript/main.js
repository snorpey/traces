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
		
		
		var intro = new Intro();
		var graph = new Graph();
		var navigation = new Navigation();
		
		$( window ).resize( resized );
		$( 'nav a' ).click( navigated );
		
		init();
		
		function init()
		{		
			$( 'body' ).prepend('<canvas id="canvas" width="960" height="450">sorry but your browser doesn\'t support the canvas element.</canvas>');
			$( 'nav span a:first-child' ).addClass( 'active' );
			$( '#canvas' ).css( { position: 'absolute', top: 0, left: 0, zIndex: 2 } );
			
			resized();
			dispatch();
			intro.init();			
		}
		
		function dispatch()
		{
			intro.animation_done.add( graph.init );
			intro.animation_done.add( navigation.init );
		}
		
		function navigated( $event )
		{
			$event.preventDefault();
			$( $event.target ).closest('span').find('a').removeClass( 'active' );
			$( $event.target ).addClass('active');
			graph.navigate( $( $event.target ).attr('href').replace('#', '') );
		}
		
		function resized()
		{
			$( '#canvas' ).attr({width: $(window).width(), height: $(window).height()});
			
			graph.setScreenSize({width: $(window).width(), height: $(window).height()});
		}
	}
);

