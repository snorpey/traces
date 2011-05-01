var Event = function()
{
	var _self = this;
	var type;
	var date;
	var name;
	var text;
	var info;
	
	_self.init = function($data)
	{
		type = $data.type;
		name = $data.name;
		date = $data.date;
		info = $data.info;
		
		//console.log(_self.getDate().format('ss'));
	}
	
	_self.getDate = function()
	{
		return date;
	}
	
	function typeValid($type)
	{
		var types = ['music', 'game', 'code', 'location', 'photo'];
		var return_value = types.join().indexOf($type);
		
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