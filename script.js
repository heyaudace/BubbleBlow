goog.require('goog.dom');
const dom = goog.dom;
console.log(dom, 'is dom');
console.log('over');
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
	var maximumScoreComputer = parseInt($('#maximumScoreComputer').text());
	maximumScoreComputer += diameter;

	$('#maximumScoreComputer').text(maximumScoreComputer);

	const currentScoreNow = parseInt($('#currentScoreComputer').text());
	const efficiencyNow = (currentScoreNow / maximumScoreComputer) * 100;

	$('#efficiency_computer').text(efficiencyNow.toString().substring(0, 5));

	const marginNumber = Math.floor(Math.random() * 80);
	const newCss = {
		width: diameter,
		height: diameter,
		'background-color': color,
		points: diameter,
		'margin-left': marginNumber

	};
	const circle = dom.createDom(dom.TagName.DIV, {
		id: 'bubble' + index.toString(),
		classname: 'bubbles',
		style: generateStyleString(newCss),
		index: index.toString(),
		points: diameter,
	}, diameterElement);
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
		styleString += attribute.toString() + '=' +
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
			var currentPoints = parseInt($('#currentScoreComputer').text());
			currentPoints += thesePoints;
			$('#currentScoreComputer').text(currentPoints);
			$('#' + thisId).effect('bounce', {times: 5}, 'fast');
			$('#currentScoreComputer').effect('bounce', {times: 20}, 'slow');
			$('#' + thisId).effect('explode', 500);
		}
	});
}

/**
 * Initializes the game
 *
 */
function initialize() {
	handleEvents();
	var timeStep = 0;
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
			timeStep++;
			animate = setTimeout(initialize, 500);
		}
		else {
			clearTimeout(animate);
		}
}

$(document).ready(() => {initialize()});
