$(document).ready(
	function()
	{		
		var Signal = signals.Signal;
		
		//	interface
		var navigation = new Navigation();
		
		//	display		
		var title = new Title();
		var intro = new Intro();
		
		// app
		var particle_system = new ParticleSystem();		
		var event_system = new EventSystem();
		var target_system = new TargetSystem();
		
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
						
			navigation.NAVIGATED.add( target_system.navigated );
			navigation.NAVIGATED.add( particle_system.navigated );
			navigation.NAVIGATED.add( event_system.navigated );
			
			//navigation.HOVERED.add( particle_system.navigated );
			//navigation.OUTED.add( event_system.navigated );
			
			particle_system.PARTICLES_UPDATED.add( target_system.particlesUpdated );
			//particle_system.FILTER_UPDATED.add(  );
			
			event_system.EVENTS_UPDATED.add( particle_system.eventsUpdated );
			event_system.EVENTS_FILTERED.add( particle_system.eventsFiltered );
			event_system.EVENTS_UPDATED.add( target_system.eventsUpdated );
			event_system.EVENTS_FILTERED.add( target_system.eventsFiltered );
			
			target_system.TARGETS_UPDATED.add( particle_system.targetsUpdated );
			
			for ( var i = 0; i < navigation.getNavigationItems().length; i++ )
			{
				navigation.getNavigationItems()[i].CLICKED.add( navigation.navigate );
				navigation.getNavigationItems()[i].HOVERED.add( target_system.hovered );
				navigation.getNavigationItems()[i].OUTED.add( target_system.outed );
			}
			
			SCREEN_UPDATED.add( particle_system.screenUpdated );
			SCREEN_UPDATED.add( target_system.screenUpdated );
		}
		
		function resized()
		{
			var screen = { width: $( window ).width(), height: $( window ).height() };
			
			$( '#canvas' ).attr( screen );
			$( '#text' ).css( { top: ( screen.height - $( '#text' ).height() ) / 2 } );
			
			SCREEN_UPDATED.dispatch( screen );
		}
	}
);