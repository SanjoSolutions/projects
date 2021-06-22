export async function getTourSteps(tour) {
  return await tour.$$(".step-content");
}
