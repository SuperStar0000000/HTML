// The Clock Manager controller
// it manage all the other controllers and dispatch event to display controllers and clock manager


// Instanciating the ClockManagaer
var clock_manager = new ClockManager();
var clock_controllers = new Array();
	
//Installing event
document.onkeyup = on_keyup;

function on_keyup(e)
{
	var key = e ? e.which : e.event.keyCode;
// 	clock_manager.ontick();

	update_clock_controllers();

}

function add_clock(clock_id, config_id)
{
	var clock_div = document.getElementById(clock_id);
	var config_div = document.getElementById(config_id);

	if (clock_div == null)
	{
			alert("Can't find div ["+clock_id+"]");
	}

	var config = null; // new clockconfig();
	var clock = clock_manager.new_player(config);

	var clock_controller = new PlayerClockController(clock, clock_div);
	clock_controllers.push(clock_controller);


}

function update_clock_controllers()
{
	for (i in clock_controllers) 
	{
		clock_controllers[i].update();
	}
}
