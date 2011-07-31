$(document).ready(
	function()
	{		
		var Signal = signals.Signal;
		
		//	interface
		var navigation = new Navigation();
		//	-- navigation-item
		
		//	display		
		var title = new Title();
		var intro = new Intro();
		
		// app
		var particle_system = new ParticleSystem();
		//	-- particle
		//	-- shapes
		//		-- timeline
		//		-- map
		//		-- ect.
		
		//var event_system = new EventSystem();
		//	-- eventPhase
		
		var SCREEN_UPDATED = new Signal();
		
		$( window ).resize( resized );
		
		init();
		
		function init()
		{		
			var screen = { width: $( window ).width(), height: $( window ).height() };
			
			$( 'body' ).prepend('<canvas id="canvas" width="960" height="450">sorry but your browser doesn\'t support the canvas element.</canvas>');
			$( '#canvas' ).css( { position: 'absolute', top: 0, left: 0, zIndex: 2 } );
			
			resized();
			dispatch();
			
			title.init();
			
			SCREEN_UPDATED.dispatch( screen );		
		};
		
		function dispatch()
		{
			title.ANIMATED_IN.add( intro.init );
			
			intro.ANIMATED_IN.add( navigation.init );
			intro.ANIMATED_IN.add( particle_system.init );			
			navigation.NAVIGATED.add( particle_system.navigate );
			//navigation.NAVIGATED.add( event_system.navigate );
			
			for( var i = 0; i < navigation.getNavigationItems().length; i++ )
			{
				navigation.getNavigationItems()[i].CLICKED.add( navigation.navigate );
				//navigation.getNavigationItems()[i].hovered.add( symbols.show );
				//navigation.getNavigationItems()[i].outed.add( symbols.stop );
			}
			
			SCREEN_UPDATED.add( particle_system.setScreenSize );
		}
		
		function resized()
		{
			var screen = { width: $( window ).width(), height: $( window ).height() };
			
			$( '#canvas' ).attr( screen );
			SCREEN_UPDATED.dispatch( screen );
		}
	}
);