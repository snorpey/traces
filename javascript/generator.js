var Generator = function()
{
//	data-generation class
//	produces different kinds of sample data

	var _self = this;
	var event_types = ['music', 'game', 'code', 'location', 'photo', 'tweet'];
	
	_self.init = function()
	{
		
	}
	
	_self.generateRandom = function()
	{		
		var event = generateEvent( event_types[Math.floor( Math.random() * event_types.length )] );
		return event;
	}
	
	function generateEvent($type)
	{
		var data = {};
				
		data.type = $type;
		data.name = 'random-' + $type;
		data.date = dateRandom( new Date(2010, 0, 1) );
		data.info = 'randomly generated item';
		
		if( isGeodata($type) )
		{
			data.location = {};
			data.location.lat = randomNumber(-90, 90);
			data.location.lng = randomNumber(0, 180);
		}
		
		return new Event( data );
	}
	
	function isGeodata( $type )
	{
		var geodata = ['location', 'tweet'];
		var return_value = false;
		
		for(var i = 0; i < geodata.length; i++)
		{
			if($type === geodata[i])
			{
				return_value = true;
				break;
			}
		}
		
		return return_value;
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
		
		//console.log( Math.round( date.getTime() / 1000 ) );
		
		return date;
	}
	
	function randomNumber( $min, $max, $digits )
	{
		var return_value = $min + ( Math.random() * ( $max - $min ) );
		
		if( $digits === undefined )
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