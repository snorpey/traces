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
		
		var title = new Title();
		var intro = new Intro();
		var graph = new Graph();
		var navigation = new Navigation();

		var Signal = signals.Signal;
		var navigation_over = new Signal();
		var navigation_out = new Signal
		
		
		$( window ).resize( resized );
		$( 'nav a' )
			.click( navigated )
			.hover( navigationOver, navigationOut )
		
		init();
		
		function init()
		{		
			$( 'body' ).prepend('<canvas id="canvas" width="960" height="450">sorry but your browser doesn\'t support the canvas element.</canvas>');
			$( 'nav span a:first-child' ).addClass( 'active' );
			$( '#canvas' ).css( { position: 'absolute', top: 0, left: 0, zIndex: 2 } );
			
			resized();
			dispatch();
			
			title.init();			
		}
		
		function dispatch()
		{
			title.animation_done.add( intro.init );
			intro.animation_done.add( graph.init );
			intro.animation_done.add( navigation.init );
			navigation_over.add( graph.navigationOver );
			navigation_over.add( navigation.navigationOver );
			navigation_out.add( graph.navigationOut );
			navigation_out.add( navigation.navigationOut );
		}
		
		function navigated( $event )
		{
			$event.preventDefault();
			$( $event.target ).closest('span').find('a').removeClass( 'active' );
			$( $event.target ).addClass('active');
			graph.navigate( $( $event.target ).attr('href').replace('#', '') );
		}
		
		function navigationOver( $event )
		{
			navigation_over.dispatch( $event );
		}
		
		function navigationOut( $event )
		{
			navigation_out.dispatch( $event );
		}
		
		function resized()
		{
			$( '#canvas' ).attr({width: $(window).width(), height: $(window).height()});
			
			graph.setScreenSize({width: $(window).width(), height: $(window).height()});
		}
	}
);

