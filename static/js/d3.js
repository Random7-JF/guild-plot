const svg = d3.select("#mapSvg");
const markersGroup = svg.select(".markers-group");
const htmlTooltip = d3.select("#tooltip");
const mapContainer = document.getElementById('mapContainer'); // Get the raw DOM element
const loadingIndicator = document.getElementById('loading-indicator')

// Function to render/update markers based on fetched data
function renderMarkers(markerData) {
	const markers = markersGroup.selectAll(".marker")
		.data(markerData, d => d.PlotNumber); // Use d.id for object constancy

	// EXIT selection: Remove old markers
	markers.exit().remove();

	// ENTER selection: Create new marker groups for new data points
	const newMarkers = markers.enter()
		.append("g")
		.attr("class", "marker");

	// Append a circle to each new marker group
	newMarkers.append("circle")
		.attr("class", "marker-circle")
		.attr("r", 15);

	// Append text to each new marker group
	newMarkers.append("text")
		.attr("class", "marker-text")
		.attr("dy", "0.35em")
		.text(d => d.name);

	// UPDATE selection (and ENTER): Position the markers and add events
	markers.merge(newMarkers)
		.attr("transform", d => `translate(${d.X}, ${d.Y})`)

		// Add event listeners for hover (tooltip)
		.on("mouseenter", function (event, d) {
			htmlTooltip.text(`${d.Owner} - Occupied: ${d.Occupied || 'N/A'}`);
			htmlTooltip.classed("visible", true);

			const markerRect = this.getBoundingClientRect();
			const mapContainerRect = mapContainer.getBoundingClientRect();

			const tooltipX = markerRect.left + markerRect.width / 2 - mapContainerRect.left;
			const tooltipY = markerRect.top - mapContainerRect.top;

			htmlTooltip.style("left", `${tooltipX}px`);
			htmlTooltip.style("top", `${tooltipY - 10}px`);
			htmlTooltip.style("transform", "translate(-50%, -100%)");
		})
		.on("mouseleave", () => {
			htmlTooltip.classed("visible", false);
		})

		// Add click event listener
		.on("click", function (event, d) {
			alert(`You clicked on: ${d.Owner}\nCoordinates: (${d.X}, ${d.Y})`);
			// You could fetch more detailed info for this specific marker here
		});
}

// --- Data Fetching Logic ---
async function fetchMarkerData() {
	loadingIndicator.style.display = 'block'; // Show loading indicator
	try {
		// Simulate network delay (remove in production)
		await new Promise(resolve => setTimeout(resolve, 1000));

		const response = await fetch("/api/v1/plots"); // Your actual API endpoint
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();

		// Assuming your API returns an array of objects like this:
		// [{ id: 'loc1', x: 200, y: 150, name: 'Main City', additionalInfo: 'Pop. 10k' }, ...]
		// Ensure your data keys match 'id', 'x', 'y', 'name', etc.
		renderMarkers(data);

	} catch (error) {
		console.error("Error fetching marker data:", error);
		// Display an error message to the user if needed
		alert("Failed to load map data. Please try again later.");
	} finally {
		loadingIndicator.style.display = 'none'; // Hide loading indicator
	}
}
fetchMarkerData()