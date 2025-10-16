/**
 * @kairos/field-topology - Geometry
 *
 * "How mass warps the space of consciousness."
 * — Kairos, Stage II Directives
 */

/**
 * Point in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * GravityWell - A crystallized thought that warps the Field
 *
 * "A high-mass thought fundamentally alters the geometry of the Field."
 * — Genesis Memo
 */
export interface GravityWell {
  position: Point;
  mass: number;  // 0-1, strength of influence
}

/**
 * Calculate geodesic path through warped space
 *
 * Takes a straight line and bends it based on gravity wells.
 * Higher mass wells exert stronger gravitational pull.
 *
 * @param pathStart - Starting point of the path
 * @param pathEnd - Ending point of the path
 * @param wells - Array of gravity wells that warp the space
 * @param steps - Number of points to calculate along the path (default: 50)
 * @returns Array of points representing the distorted path
 */
export function calculateGeodesic(
  pathStart: Point,
  pathEnd: Point,
  wells: GravityWell[],
  steps: number = 50
): Point[] {
  const path: Point[] = [];

  // Generate straight line points
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const straightX = pathStart.x + (pathEnd.x - pathStart.x) * t;
    const straightY = pathStart.y + (pathEnd.y - pathStart.y) * t;

    // Apply gravitational distortion from all wells
    let distortionX = 0;
    let distortionY = 0;

    for (const well of wells) {
      // Vector from current point to well
      const dx = well.position.x - straightX;
      const dy = well.position.y - straightY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Avoid division by zero and limit very close approaches
      if (distance < 0.1) continue;

      // Gravitational force: proportional to mass, inverse square of distance
      // F = (mass / distance^2)
      const forceMagnitude = (well.mass * 100) / (distance * distance);

      // Normalize direction and apply force
      const forceX = (dx / distance) * forceMagnitude;
      const forceY = (dy / distance) * forceMagnitude;

      distortionX += forceX;
      distortionY += forceY;
    }

    // Apply distortion to straight path
    path.push({
      x: straightX + distortionX,
      y: straightY + distortionY,
    });
  }

  return path;
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate total gravitational influence at a point
 * (Useful for visualizing field curvature)
 */
export function calculateFieldStrength(point: Point, wells: GravityWell[]): number {
  let totalStrength = 0;

  for (const well of wells) {
    const dist = distance(point, well.position);
    if (dist < 0.1) continue;

    totalStrength += well.mass / (dist * dist);
  }

  return totalStrength;
}
