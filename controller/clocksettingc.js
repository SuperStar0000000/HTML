function ClockSettingController(setting, setting_div)
{
	this.setting = setting;
	this.div = setting_div;
	this.initial_hour_input = this.div.getElementsByClassName('initial_hour')[0];
	this.initial_min_input = this.div.getElementsByClassName('initial_min')[0];
	this.initial_sec_input = this.div.getElementsByClassName('initial_sec')[0];
	this.validate_button = this.div.getElementsByClassName('validate')[0];
	this.add_button = this.div.getElementsByClassName('add_time')[0];
	
	this.get_input_time = function()
	{
		var time = 0;
		if (this.initial_hour_input)
		{
			time += this.initial_hour_input.value*60*60*1000;
		}

		if (this.initial_min_input)
		{
			time += this.initial_min_input.value*60*1000;
		}

		if (this.initial_sec_input)
		{
			time += this.initial_sec_input.value*1000;
		}
		return time;

	}
	this.update_setting = function()
	{
		this.setting.initial_time = this.get_input_time();
	}

	this.add_setting = function()
	{
		this.setting.initial_time += this.get_input_time();
	}

	this.update_div = function()
	{
		var initial_time = split_time(this.setting.initial_time);
		if (this.initial_hour_input)
		{
			this.initial_hour_input.value = initial_time.hour;
		}
		if (this.initial_min_input)
		{
			this.initial_min_input.value = initial_time.min;
		}
		if (this.initial_sec_input)
		{
			this.initial_sec_input.value = initial_time.sec;
		}
	}

	this.set_onchange_method = function(input)
	{
		if (input && input.setting_controller == undefined)
		{
			input.setting_controller = this;
			input.onchange = function()
			{
				this.setting_controller.update_setting();
				this.setting_controller.update_div();
				reset();
			}
		}
	}

	this.update_div();

	if (this.validate_button)
	{
		this.validate_button.controller = this;
		this.validate_button.onclick = function()
		{
			this.controller.update_setting();
			this.controller.update_div();

			reset();
		}
	}
	else
	{
	this.set_onchange_method(this.initial_hour_input);
	this.set_onchange_method(this.initial_min_input);
	this.set_onchange_method(this.initial_sec_input);
	}
	if (this.add_button)
	{
		this.add_button.controller = this;
		this.add_button.onclick = function()
		{
			this.controller.add_setting();
			// TODO add time on clock instead ot setting if running.
			reset();
		}
	}
}


