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
		
		var graph = new Graph();
		
		$( window ).resize( resized );
		$( 'nav a' ).click( navigated );
		
		init();
		
		function init()
		{		
			$( 'body' ).prepend('<canvas id="canvas" width="960" height="450">sorry but your browser doesn\'t support the canvas element.</canvas>');
			$( 'nav span a:first-child' ).addClass( 'active' );
			$( '#canvas' ).css( { position: 'absolute', top: 0, left: 0, zIndex: 2 } );
			
			graph.init();
			resized();
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

