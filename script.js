function giveBubble(index, maximum_diameter) {
	var diameter = Math.ceil((Math.random() * maximum_diameter * 0.1));
	var diameter_element = '<div class="diameter_element">' + diameter.toString() + '</div>';

	var colors = ['blue', 'yellow', 'orange', 'red', 'green', '#337ab7'];
	var color = colors[Math.floor(Math.random() * colors.length)];
	var max_score_computer = parseInt($('#max_score_computer').text());
	max_score_computer += diameter;

	$('#max_score_computer').text(max_score_computer);

	var current_score_now = parseInt($('#current_score_computer').text());
	var efficiency_now = (current_score_now / max_score_computer) * 100;

	$('#efficiency_computer').text(efficiency_now.toString().substring(0, 5));

	var magin_number = Math.floor(Math.random() * 80);
	new_css = 'width: ' + diameter.toString() + 'px; height: ' + diameter.toString() +
	'px; background-color: ' + color + '; points=' + diameter.toString() + '; margin-left: ' + magin_number.toString() + '%';
	var circle = '<div id="bubble' + index.toString() + '" class="bubbles" style="' + new_css + '" index="' + index.toString() + '" points="' + diameter + '">' + diameter_element + '</div>';
	return circle;
}

$(document).ready(function() {

	$('div').dblclick(function(e) {
		var this_class = e.target.getAttribute('class');
		if (this_class == 'bubbles') {
			this_id = e.target.getAttribute('id');
			$('#' + this_id).css('border', '5px solid gray');
			$('#' + this_id).effect('explode');
		}
	});
	$('div').click(function(e) {
		var this_class = e.target.getAttribute('class');
		if (this_class == 'bubbles') {
			this_id = e.target.getAttribute('id');
			$('#' + this_id).addClass('blownbubbles').removeClass('bubbles');
			var these_points = parseInt(e.target.getAttribute('points'));
			var current_points = parseInt($('#current_score_computer').text());
			current_points += these_points;
			$('#current_score_computer').text(current_points);
			$('#' + this_id).effect('bounce', {times: 5}, 'fast');
			$('#current_score_computer').effect('bounce', {times: 20}, 'slow');
			$('#' + this_id).effect('explode', 500);
		}
	});

	var timestep = 0;
	function generate() {
		if (timestep < 1000) {
			mycircle = giveBubble(timestep, screen.width * .8);
			$('#playground_border').prepend(mycircle);
			$('div').each(function() {
				var this_class = $(this).attr('class');
				if (this_class == 'bubbles') {
					this_index = parseInt($(this).attr('index'));
					if (this_index < timestep - 10) {
						$(this).css('background-color', 'yellow');
						$(this).fadeOut(200);
					}
				}

			});
			timestep++;
			animate = setTimeout(generate, 500);
		}
		else {
			clearTimeout(animate);
		}
	}
	generate();
});
