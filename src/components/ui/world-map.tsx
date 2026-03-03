"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
    color?: string;
  }>;
  lineColor?: string;
  theme?: "light" | "dark";
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  theme = "light",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isDark = theme === "dark";

  // Build DottedMap exactly once — height:100 diagonal matches the original
  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    [],
  );

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: isDark ? "#FFFFFF40" : "#00000040",
        shape: "circle",
        backgroundColor: isDark ? "black" : "white",
      }),
    [map, isDark],
  );

  // The SVG from getSVG() uses viewBox="0 0 {image.width} {image.height}"
  // getPin() returns coordinates in the SAME space — so our overlay SVG
  // must use the EXACT same viewBox.
  const mapWidth = map.image.width;
  const mapHeight = map.image.height;

  // Get the closest dot on the map grid for a lat/lng coordinate
  const getPoint = (lat: number, lng: number) => {
    const pin = map.getPin({ lat, lng });
    if (!pin) return { x: 0, y: 0 };
    return { x: pin.x, y: pin.y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 20;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className="w-full aspect-2/1 rounded-lg relative font-sans"
      style={{ backgroundColor: isDark ? "black" : "white" }}
    >
      {/* Base dotted map — uses its own internal SVG coordinate space */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
        }}
        alt="world map"
        draggable={false}
      />

      {/* Overlay SVG — SAME viewBox as the dotted map SVG for pixel-perfect alignment */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Curved arc paths (only when start ≠ end) */}
        {dots.map((dot, i) => {
          const startPoint = getPoint(dot.start.lat, dot.start.lng);
          const endPoint = getPoint(dot.end.lat, dot.end.lng);
          const color = dot.color ?? lineColor;
          const isSamePoint =
            dot.start.lat === dot.end.lat && dot.start.lng === dot.end.lng;
          if (isSamePoint) return null;
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                strokeOpacity="0.7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease: "easeOut" }}
                key={`path-${i}`}
              />
            </g>
          );
        })}

        {/* Pulsing dots at each location */}
        {dots.map((dot, i) => {
          const color = dot.color ?? lineColor;
          const isSamePoint =
            dot.start.lat === dot.end.lat && dot.start.lng === dot.end.lng;
          const points = [getPoint(dot.start.lat, dot.start.lng)];
          if (!isSamePoint) points.push(getPoint(dot.end.lat, dot.end.lng));

          return points.map((pt, j) => (
            <g key={`dot-${i}-${j}`}>
              <circle cx={pt.x} cy={pt.y} r="1" fill={color} />
              <circle cx={pt.x} cy={pt.y} r="1" fill={color} opacity="0.5">
                <animate
                  attributeName="r"
                  from="1"
                  to="4"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ));
        })}
      </svg>
    </div>
  );
}
