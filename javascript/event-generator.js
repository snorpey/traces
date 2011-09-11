var EventGenerator = function()
{
//	data-generation class
//	produces different kinds of sample data

	var _self = this;
	var event_types 		= ['music', 'game', 'code', 'location', 'photo', 'tweet'];
	
	var geodata_types 		= [ 'location', 'tweet' ];
	
	var text_types 			= [ 'tweet' ];
	var text_mentions = [ '@snorpey', '@markhoppus', '@google', '@twitter', '@github' ];
	var text_urls = [ 'http://www.fishnation.de', 'http://www.google.com', 'http://www.github.com' ];

	var game_titles = [ 'Portal 2', 'Fallout 3 New Vegas', 'Colin McRae Dirt 2', 'Street Fighter', 'Half Life' ];
	var game_trophies = [ 'Bronze', 'Silver', 'Gold', 'Platinum' ];

	_self.init = function()
	{
		
	}
	
	_self.generateRandom = function()
	{		
		var event = generateEvent( event_types[Math.floor( Math.random() * event_types.length )] );
		return event;
	}
	
	function generateEvent( $type )
	{
		var data = {};
				
		data.type = $type;
		data.name = 'random-' + $type;
		data.date = dateRandom( new Date( 2010, 0, 1 ) );
		data.info = 'randomly generated item';
		
		data = getGeodata( data );
		data = getText( data );
		data = getGame( data );
		
		return new Event( data );
	}
	
	function getGeodata( $data )
	{
		var is_geodata = false;
		
		for ( var i = 0; i < geodata_types.length; i++)
		{
			if ( $data.type === geodata_types[i] )
			{
				is_geodata = true;
				break;
			}
		}
		
		if ( is_geodata )
		{
			$data.location = {};
			$data.location.lat = randomNumber( -90, 90 );
			$data.location.lng = randomNumber( 0, 180 );
			
			if ( $data.type === 'location' )
			{
				var location_types = [ 'bar', 'work', 'restaurant', 'public transport' ];
				$data.location.type = location_types[parseInt( (location_types.length - 1) * Math.random() )];
			}	
		}
		
		return $data;
	}
	
	function getText( $data )
	{
		var is_text = false;
		
		for ( var i = 0; i < text_types.length; i++)
		{
			if ( $data.type === text_types[i] )
			{
				is_text = true;
				break;
			}
		}
		
		if ( is_text )
		{
			$data.text = {};
			$data.text.message = 'this is a random message'
			$data.text.url = text_urls[parseInt( (text_urls.length - 1) * Math.random() )];
			$data.text.mention = text_mentions[parseInt( (text_mentions.length - 1) * Math.random() )];
		}
		
		return $data;
	}
	
	function getGame( $data )
	{	
		if ( $data.type === 'game' )
		{
			$data.game = {};
			$data.game.title = game_titles[parseInt( (game_titles.length - 1) * Math.random() )];
			$data.game.trophy = game_trophies[parseInt( (game_trophies.length - 1) * Math.random() )];
		}
		
		return $data;
	}
	
	function dateRandom( $from, $to )
	{
		if ( !$from )
		{
		    $from = new Date( 1900, 0, 1 ).getTime();
		}
		
		else
		{
		    $from = $from.getTime();
		}
		
		if ( !$to ) 
		{
		    $to = new Date().getTime();
		}
		
		else
		{
			$to = $to.getTime();
		}
		
		var date = new Date( $from + Math.random() * ($to - $from) );
				
		return date;
	}
	
	function randomNumber( $min, $max, $digits )
	{
		var return_value = $min + ( Math.random() * ( $max - $min ) );
		
		if ( $digits === undefined )
		{
			Math.round( return_value );
		}
		
		else
		{
			 return_value.toFixed( $digits );
		}
		
		return return_value;
	}
}