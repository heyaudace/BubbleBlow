goog.require('goog.dom');
var dom = goog.dom;
/**
 * Generates a div element that corresponds to a bubble
 * @param {number} index
 * @param {number} maximum_diameter
 * @return {Element} circle
 */
function giveBubble(index, maximum_diameter) {
	const diameter = Math.ceil((Math.random() * maximum_diameter * 0.1));
	const diameterElement = dom.createDom(dom.TagName.DIV,
		{className: 'diameter-element'}, diameter.toString());

	const colors = ['blue', 'yellow', 'orange', 'red', 'green', '#337ab7'];
	const color = colors[Math.floor(Math.random() * colors.length)];
	var maximumScoreComputer = parseInt($('#maximum-score-computer').text());
	maximumScoreComputer += diameter;

	$('#maximum-score-computer').text(maximumScoreComputer);

	const currentScoreNow = parseInt($('#current-score-computer').text());
	const efficiencyNow = (currentScoreNow / maximumScoreComputer) * 100;

	$('#efficiency-computer').text(efficiencyNow.toString().substring(0, 5));

	const marginNumber = Math.floor(Math.random() * 80);
	const newCss = {
		width: diameter.toString()+'px',
		height: diameter.toString()+'px',
		'background-color': color,
		points: diameter,
		'margin-left': marginNumber.toString() + '%',
		'text-align': 'center',
		'padding-top': (diameter/2.3).toString()+'px'

	};
	const circle = dom.createDom(dom.TagName.DIV, {
		id: 'bubble' + index.toString(),
		className: 'bubbles',
		'style': generateStyleString(newCss).toString(),
		'index': index.toString(),
		'points': diameter.toString(),
	}, diameterElement);
	window.circle = circle;
	return circle;
}

/**
 * Given a css style object, generates a style string that corresponds to
 * that object
 * @param {Object} cssStyle
 * @return {string} styleString
 */
function generateStyleString(cssStyle) {
	var styleString = '';
	window.cssStyle = cssStyle;
	for (const attribute in cssStyle) {
		styleString += attribute.toString() + ':' +
			cssStyle[attribute].toString() + ';';
	}
	styleString = styleString.substring(0, styleString.length);
	return styleString;
}
/**
 * Controllls click and doubleClick events
 * for the bubbles
 *
 */
function handleEvents() {

	$('div').dblclick(function(e) {
		var thisClass = e.target.getAttribute('class');
		if (thisClass == 'bubbles') {
			thisId = e.target.getAttribute('id');
			$('#' + thisId).css('border', '5px solid gray');
			$('#' + thisId).effect('explode');
		}
	});
	$('div').click(function(e) {
		const thisClass = e.target.getAttribute('class');
		if (thisClass == 'bubbles') {
			const thisId = e.target.getAttribute('id');
			$('#' + thisId).addClass('blownBubbles').removeClass('bubbles');
			const thesePoints = parseInt(e.target.getAttribute('points'));
			var currentPoints = parseInt($('#current-score-computer').text());
			console.log('these: ', thesePoints, ' current :', currentPoints);
			currentPoints += thesePoints;
			$('#current-score-computer').text(currentPoints);
			$('#' + thisId).effect('bounce', {times: 5}, 'fast');
			$('#current-score-computer').effect('bounce', {times: 20}, 'slow');
			$('#' + thisId).effect('explode', 500);
		}
	});
}

/**
 * Initializes the game
 *
 */
function initialize(timeStep = 0) {
	handleEvents();
	if (timeStep < 1000) {
		myCircle = giveBubble(timeStep, screen.width * .8);
			$('#playground_border').prepend(myCircle);
			$('div').each(function() {
				var thisClass = $(this).attr('class');
				if (thisClass == 'bubbles') {
					thisIndex = parseInt($(this).attr('index'));
					if (thisIndex < timeStep - 10) {
						$(this).css('background-color', 'yellow');
						$(this).fadeOut(200);
					}
				}

			});
			animate = setTimeout(() => {initialize(timeStep+1)}, 1000);
		}
		else {
			clearTimeout(animate);
	}
}
