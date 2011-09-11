var Label = function( $title, $position )
{
	var _self = this;
	var title;	
	var position;
	var active;
	var id;
	
	(function(){ init(); })()
	
	function init( $title, $position, $id )
	{
		title = $title;
		position = $position;
		id = $id;
		
		$( '#text' ).append( '<label id="label-' + $id + '" class="label">' + title + '</label>' );
		show();
	}
	
	_self.setActive = function()
	{		
		active = true;
	}
	
	_self.setInactive = function()
	{
		active = false;
	}
	
	_self.getActive = function()
	{
		return active;
	}
	
	_self.getPosition = function()
	{
		return position;
	}
	
	_self.setPosition = function( $position )
	{
		position = $position;
	}
	
	function show()
	{
		$( '#label-' + id ).css( { left: position.x, top: position.y } );
		$( '#label-' + id ).addClass('active');
	}
	
	function hide()
	{
		$( '#label-' + id ).removeClass('active');
		settimeout( function(){ $( '#label-' + id ).remove() }, 500 );
	}
	
	function mapRange( $value, $low1, $high1, $low2, $high2 )
	{
		return $low2 + ( $high2 - $low2 ) * ( $value - $low1) / ( $high1 - $low1 );
	}

	function dist( $point_1, $point_2 )
	{
		var xs = 0;
		var ys = 0;
		
		xs = $point_2.x - $point_1.x;
		xs = xs * xs;
		
		ys = $point_2.y - $point_1.y;
		ys = ys * ys;
		
		return Math.sqrt( xs + ys );
	}
}