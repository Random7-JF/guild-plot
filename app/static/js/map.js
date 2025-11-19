function scaleSymbols() {
  const plotSymbols = document.querySelectorAll('.plot-symbol');
  console.log("Scaling")
  console.log(plotSymbols)
  if (plotSymbols.length === 0) return;

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
    plotSymbols.forEach((plot, index) => {
        const scaledX = offsetX + (originalPos.x * scaleX);
        const scaledY = offsetY + (originalPos.y * scaleY);

        plot.style.left = scaledX + 'px';
        plot.style.top = scaledY + 'px';
      })    
  }
}

document.addEventListener("DOMContentLoaded", () => {
  scaleSymbols()
});