var BackgroundItem = function( $id )
{
	var _self = this;
	var Signal = signals.Signal;
	var dom_object;	
	var active = false;
	var screen = { width: 600, height: 800 };
	var color = '#ff0000';
	var id;
	
	_self.ANIMATED_IN = new Signal();
	_self.ANIMATED_OUT = new Signal();
	
	(function(){ init( $id ); })();
		
	function init( $id )
	{		
		color = getBackgroundById( $id );
		id = $id;
		
		if( ! $( '#backgrounds' ).length )
		{
			$( '#text' ).after( '<div id="backgrounds"></div>' );
		}
		
		dom_object = $( '<div class="background-' + $id +  ' background"></div>' );
		dom_object
			.css( screen )
			.css( { left: screen.width, background: color } );

		$( '#backgrounds' ).append( dom_object );
	}
	
	function screenUpdated( $screen )
	{
		screen = $screen;
		
//		console.log( screen );
		
		dom_object
			.css( screen )
		
		if ( dom_object.hasClass( 'active' ) )
		{
//			dom_object.css( { left: 0 } );
		}
		
		else
		{
//			dom_object.css( { left: screen.width } );
		}
			
	}
	
	function backgroundAnimateIn()
	{
//		dom_object
//			.css( { left: 0, opacity: 0.5 } )
//			.addClass( 'active' );
	}
	
	function backgroundAnimateOut()
	{
		dom_object
			.css( { left: -screen.width, opacity: 0 } )
		
		setTimeout( 
			function()
			{
				dom_object
					.css( { left: screen.width, opacity: 0 } )
					.removeClass( 'active' )		
			},
			600
		);
	}
	
	function getBackgroundById( $id )
	{
		var colorsets = [];
			colorsets[0] = [ '4AD368', '536EC4', 'F5FD58', 'FF6959' ];
			colorsets[1] = [ '067EAC', 'FFB000', 'FF3D00' ];
			colorsets[2] = [ 'F2BC00', 'FFF0BA', 'FF542E', 'CFD6DE', 'ADC1D6', '7297BA' ];
		
		var return_value = '#' + colorsets[2][Math.floor( Math.random() * colorsets[2].length )];

		return return_value;
	}
	
	_self.screenUpdated = screenUpdated;
	_self.backgroundAnimateIn = backgroundAnimateIn;
	_self.backgroundAnimateOut = backgroundAnimateOut;
}
	