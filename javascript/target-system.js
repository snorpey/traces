var TargetSystem = function()
{
	var _self = this;
	
	var targets = {};	
	var events = [];
	var particles = [];
	var screen = { width: 600, height: 800 };
	
	var navigation_item;
	
	var Signal = signals.Signal;
	
	_self.TARGETS_UPDATED = new Signal();
	
	(function(){ init(); })();
	
	function init()
	{

	}
	
	_self.navigated = function( $navigation_item )
	{	
		if (
			$navigation_item.action === 'filter' && 
			$navigation_item.value !== undefined
		)
		{
//			if ( navigationToTarget( $navigation_item ) )
//			{
				_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( $navigation_item ) ) );
//			}
//			filterEvents( $target.value );
		}
		
		if (
			$navigation_item.action === 'orderby' && 
			$navigation_item.value !== undefined
		)
		{
			//orderEventsBy( $target.value );
			_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( $navigation_item ) ) );
		}
		
		//if ( navigationToTarget( $navigation_item ) )
		//{
		//	_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( $navigation_item ) ) );
		//}
	}
	
	_self.hovered = function( $navigation_item )
	{	
		if ( navigationToTarget( $navigation_item ) )
		{
			_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( $navigation_item ) ) );
		}
	}
	
	_self.outed = function( $navigation_item )
	{
		if ( navigationToTarget( $navigation_item ) )
		{
			_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( $navigation_item ) ) );
		}
	}
	
	_self.particlesUpdated = function( $particles )
	{
		particles = $particles;
		
		targetsCreate();
		
		for ( var target in targets )
		{		
			if ( target !== 'symbols' )
			{
				targets[target].particlesUpdate( $particles );		
			}
			
			else
			{
				for ( var symbol in targets[target] )
				{
					targets[target][symbol].particlesUpdate( $particles );
				}
			}
		}
		
		if ( navigation_item )
		{
			_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( navigation_item ) ) );
		}
	}
	
	_self.eventsUpdated = function( $events )
	{
		events = $events;
		
		targetsCreate();
		
		for ( var target in targets )
		{
			if ( target !== 'symbols' )
			{
				targets[target].eventsUpdate( $events );		
			}
			
			else
			{
				for ( var symbol in targets[target] )
				{
					targets[target][symbol].eventsUpdate( $events );
				}
			}
		}
		
		if ( navigation_item )
		{
			_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( navigation_item ) ) );
		}
	}
	
	_self.eventsFiltered = function( $events_visible )
	{

	}
	
	_self.screenUpdated = function( $screen )
	{
		screen = $screen;
		
		for ( var target in targets )
		{
			if ( target !== 'symbols' )
			{
				targets[target].screenUpdate( $screen );		
			}
			
			else
			{
				for ( var symbol in targets[target] )
				{
					targets[target][symbol].screenUpdate( $screen );
				}
			}
			
			_self.TARGETS_UPDATED.dispatch( targetPositions( navigationToTarget( navigation_item ) ) );
		}
	}
	
	function navigationToTarget( $navigation_item )
	{
		return_value = false;
		
		if (
			$navigation_item &&
			$navigation_item.type == 'click'
		)
		{
			if ( $navigation_item.action === 'filter' )
			{
				if ( $navigation_item.value === 'game' )
				{
					return_value = 'symbol.game';
				}
				
				if ( $navigation_item.value === 'location' )
				{	
					return_value = 'symbol.location';
				}
				
				if ( $navigation_item.value === 'music' )
				{	
					return_value = 'symbol.music';
				}
			}
			
			if ( $navigation_item.action === 'orderby' )
			{	
				if ( $navigation_item.value === 'date')
				{
					return_value = 'timeline';
				}
						
				if ( $navigation_item.value === 'time' )
				{
					return_value = 'clock';
				}
				
				if ( $navigation_item.value === 'game' )
				{
					return_value = 'gametitles';
				}
				
				if ( $navigation_item.value === 'location' )
				{
					//console.log(  )
					return_value = 'map';
				}
			}
		}
		
		else
		{
			if (
				$navigation_item &&
				$navigation_item.type &&
				$navigation_item.type === 'mouseenter'
			)
			{	
				if ( $navigation_item.action === 'filter' )
				{
					if ( $navigation_item.value === 'game' )
					{
						return_value = 'symbol.game';
					}
					
					if ( $navigation_item.value === 'location' )
					{	
						return_value = 'symbol.location';
					}
					
					if ( $navigation_item.value === 'music' )
					{	
						return_value = 'symbol.music';
					}
				}
			}
		}
			
		if ( return_value )
		{
			navigation_item = $navigation_item;
		}
		
		return return_value;
	}
	
	function targetPositions( $target )
	{
		var return_value = [];
		
		if (
			$target &&
			targets[$target]
		)
		{
			return_value = targets[$target].getPositions();
		}
		
		else
		{			
			if (
				$target &&
				$target.indexOf( 'symbol.' ) !== -1 &&
				targets.symbols[ $target.replace( 'symbol.', '' ) ] !== undefined
			)
			{
				return_value = targets.symbols[ $target.replace( 'symbol.', '' ) ].getPositions();
			}
			
			if ( ! $target )
			{
				//console.log( 'target system. targetPositions(): NO TARGET, YO' );
			}
		}
		
		return return_value;
	}
	
	function targetsCreate()
	{
		if ( 
			particles.length &&
			events.length
		)
		{
			if ( targets.timeline === undefined )
			{
				targets.timeline = new Timeline( particles, events );
			}
			
			if ( targets.clock === undefined )
			{
				targets.clock = new Clock( particles, events );
			}
			
			if ( targets.map === undefined )
			{
				targets.map = new Map( particles, events );
			}
			
			if ( targets.gametitles === undefined )
			{
				targets.gametitles = new GameTitles( particles, events );
			}
			
			if ( targets.symbols === undefined )
			{
				targets.symbols = {};
				
				if ( targets.symbols.game === undefined )
				{
					targets.symbols.game = new Symbol( particles, events, 'game' );
				}
				
				if ( targets.symbols.location === undefined )
				{
					targets.symbols.location = new Symbol( particles, events, 'location' );
				}
				
				if ( targets.symbols.music === undefined )
				{
					targets.symbols.music = new Symbol( particles, events, 'music' );
				}
			}
		}
		
		for ( var target in targets )
		{
			if ( target !== 'symbols' )
			{
				targets[target].screenUpdate( screen );		
			}
			
			else
			{
				for ( var symbol in targets[target] )
				{
					targets[target][symbol].screenUpdate( screen );
				}
			}
		}
	}
}