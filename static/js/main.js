// Housing data from CSV
const housingData = {
  0: "Neviriah",
};

// House plot positions loaded from external JSON file
let plotPositions = [];
let mapImageData = {};

async function loadPlotPositions() {
  try {
    const response = await fetch('/static/json/plot-positions.json');
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

function createHousePlots() {
  const mapBackground = document.getElementById('mapBackground');

  // Clear existing plots
  mapBackground.innerHTML = '';

  plotPositions.forEach((position) => {
    const plot = document.createElement('div');
    plot.className = 'plot-symbol';
    plot.textContent = position.plotNumber;

    // Check if plot is occupied
    if (housingData[position.plotNumber]) {
      plot.classList.add('occupied');

      // Add tooltip with buyer name
      const tooltip = document.createElement('div');
      tooltip.className = 'plot-info';
      tooltip.textContent = `Plot ${position.plotNumber}: ${housingData[position.plotNumber]}`;
      plot.appendChild(tooltip);
    } else {
      // Add tooltip for available plot
      const tooltip = document.createElement('div');
      tooltip.className = 'plot-info';
      tooltip.textContent = `Plot ${position.plotNumber}: Available`;
      plot.appendChild(tooltip);
    }

    // Position the plot
    plot.style.left = position.x + 'px';
    plot.style.top = position.y + 'px';

    mapBackground.appendChild(plot);
  });
}

function updatePlotPositions() {
  const mapBackground = document.getElementById('mapBackground');
  const plots = document.querySelectorAll('.plot-symbol');

  if (plots.length === 0) return;

  // Get the actual map image dimensions and position (same logic as grid)
  const mapImage = new Image();
  mapImage.onload = function () {
    const mapRect = mapBackground.getBoundingClientRect();
    const containerWidth = mapRect.width;
    const containerHeight = mapRect.height;

    // Calculate the actual displayed image dimensions (maintaining aspect ratio)
    const imageAspectRatio = mapImage.width / mapImage.height;
    const containerAspectRatio = containerWidth / containerHeight;

    let imageWidth, imageHeight, offsetX, offsetY;

    if (imageAspectRatio > containerAspectRatio) {
      // Image is wider than container
      imageWidth = containerWidth;
      imageHeight = containerWidth / imageAspectRatio;
      offsetX = 0;
      offsetY = (containerHeight - imageHeight) / 2;
    } else {
      // Image is taller than container
      imageHeight = containerHeight;
      imageWidth = containerHeight * imageAspectRatio;
      offsetX = (containerWidth - imageWidth) / 2;
      offsetY = 0;
    }

    // Calculate scale factor from original image to displayed image
    const scaleX = imageWidth / mapImage.width;
    const scaleY = imageHeight / mapImage.height;

    // Update plot positions using the same logic as grid
    plots.forEach((plot, index) => {
      const originalPos = plotPositions[index];
      if (originalPos) {
        const scaledX = offsetX + (originalPos.x * scaleX);
        const scaledY = offsetY + (originalPos.y * scaleY);

        plot.style.left = scaledX + 'px';
        plot.style.top = scaledY + 'px';
      }
    });
  };

  mapImage.src = '/static/img/map.jpg';
}

// Initialize the map
document.addEventListener('DOMContentLoaded', async function () {
  // Load plot positions from JSON file first
  await loadPlotPositions();

  // Create house plots after positions are loaded
  createHousePlots();

  // Update positions on window resize
  let plotResizeTimeout;
  window.addEventListener('resize', function () {
    // Clear existing timeout to prevent multiple rapid calls
    clearTimeout(plotResizeTimeout);
    // Update immediately for responsiveness
    updatePlotPositions();
  });

  // Initial position update
  setTimeout(updatePlotPositions, 100);

  // Create initial grid overlay
  //setTimeout(createGridOverlay, 500);
});