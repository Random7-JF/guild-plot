let plotPositions = [];
let mapImageData = {};

async function loadPlotPositions() {
  try {
    const response = await fetch('/api/v1/plots');
    const data = await response.json();
    plotPositions = data.plotPositions;
    mapImageData = data.referenceImage;
    console.log('Plot positions loaded successfully:', data);
  } catch (error) {
    console.error('Error loading plot positions:', error);
    // Fallback to empty array if JSON fails to load
    plotPositions = [];
  }
}

// Initialize the map
document.addEventListener('DOMContentLoaded', async function () {
  // Load plot positions from JSON file first
  await loadPlotPositions();

  console.log(plotPositions)

  // Create house plots after positions are loaded
  //createHousePlots();

  // Update positions on window resize
  //let plotResizeTimeout;
  //window.addEventListener('resize', function () {
    // Clear existing timeout to prevent multiple rapid calls
    //clearTimeout(plotResizeTimeout);
    // Update immediately for responsiveness
    //updatePlotPositions();
  //});

  // Initial position update
  //setTimeout(updatePlotPositions, 100);

  // Create initial grid overlay
  //setTimeout(createGridOverlay, 500);
});