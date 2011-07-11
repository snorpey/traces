var Navigation = function( )
{
	var _self = this;
	var text = [];
	var Signal = signals.Signal;
	
	_self.animation_done = new Signal();
		
	_self.init = function()
	{		
		$( 'nav .specific' ).hide();
		$( 'nav' ).fadeIn(400);
	}
	
	_self.navigationOver = function( $event )
	{
		var type = $( event.target )
						.attr( 'href' )
						.replace( '#filter-', '' );
		
		showSpecificOptions( type );
	}
	
	_self.navigationOut = function( $event )
	{
		showSpecificOptions( 'all' );
	}
	
	function showSpecificOptions( $type )
	{
		$( 'nav .specific' ).each(
			function()
			{
				if( $( this ).hasClass( $type + '-specific' ) )
				{
					$( this )
						.addClass( 'active' )
						.show();
					
				}
				
				else
				{
					if( $( this ).hasClass( 'active' ) )
					{
						$( this )
							.removeClass( 'active' )
							.hide();
					}
				}
			}
		);
	}
}