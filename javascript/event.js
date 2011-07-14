var Event = function( $data )
{
	var _self = this;
	var type;
	var date;
	var name;
	var text;
	var info;
	var location;
	
	(function(){ init( $data ); })()
	
	function init( $data )
	{
		type = $data.type;
		name = $data.name;
		date = $data.date;
		info = $data.info;
		
		if( $data.location !== undefined )
		{
			location = $data.location;
			
			_self.getLocation = function()
			{
				return location;
			}
		}
	}
	
	_self.getDate = function()
	{
		return date;
	}
	
	_self.getType = function()
	{
		return type;
	}
	
	_self.hasLocation = function()
	{
		var return_value = false;
		
		if( location !== undefined )
		{
			return_value = true;
		}
		
		return return_value;
	}
	
	function typeValid($type)
	{
		var types = ['music', 'game', 'code', 'location', 'photo'];
		var return_value = types.join().indexOf( $type );
		
		if(return_value != -1)
		{
			return_value = true;
		}
		
		else
		{
			return_value = false;
		}
		
		return return_value;
	}
}