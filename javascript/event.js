var Event = function( $data )
{
	var _self = this;
	var data;
	
	(function(){ init( $data ); })()
	
	function init( $data )
	{
		data = $data;
	}
	
	_self.getDate = function()
	{
		return data.date;
	}
	
	_self.getType = function()
	{
		return data.type;
	}
	
	_self.getData = function()
	{
		return data;
	}
	
	_self.hasLocation = function()
	{
		var return_value = false;
		
		if( data.location !== undefined )
		{
			return_value = true;
		}
		
		return return_value;
	}
}