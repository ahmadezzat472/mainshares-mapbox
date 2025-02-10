import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Supercluster from "supercluster";
import { LocalBusiness } from "@/interfaces";
import "../App.css";

interface IProps {
  localBusinesses: LocalBusiness[];
  activeCardId: string;
  setActiveCardId: (arg: string) => void;
}

const Mapbox = ({ localBusinesses, activeCardId, setActiveCardId }: IProps) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // Initialize the map
  useEffect(() => {
    if (mapContainer.current && !map) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        zoom: 1,
        attributionControl: false,
      });

      const navControl = new mapboxgl.NavigationControl({ showCompass: false });
      newMap.addControl(navControl, "bottom-right");

      setMap(newMap);
      return () => map?.remove(); // Cleanup on unmount
    }
  }, [map]);

  // Fly to the active marker when activeCardId changes
  useEffect(() => {
    if (map && activeCardId) {
      const activeBusiness = localBusinesses.find(
        (business) => business.id === activeCardId
      );

      if (activeBusiness) {
        setTimeout(() => {
          map.flyTo({
            center: [activeBusiness.lang, activeBusiness.lat], // Ensure correct order [lng, lat]
            zoom: 13, // Adjust zoom level
            essential: true, // Ensure smooth animation
            speed: 0.8, // Adjust speed for smoother transition
            curve: 1.42, // Adjust easing for a natural feel
          });
        }, 100); // Delay execution slightly to allow state updates
      }
    }
  }, [activeCardId, map, localBusinesses]);

  // Add clustered markers to the map
  useEffect(() => {
    if (map && localBusinesses.length > 0) {
      const points: GeoJSON.Feature<
        GeoJSON.Point,
        { id: string; name: string; companyAddress: string }
      >[] = localBusinesses.map((business) => ({
        type: "Feature",
        properties: {
          id: business.id,
          name: business.name,
          companyAddress: business.companyAddress,
          IconsSVG: business.IconsSVG,
        },
        geometry: {
          type: "Point",
          coordinates: [business.lang, business.lat],
        },
      }));

      // Initialize supercluster
      const cluster = new Supercluster({
        radius: 60,
        maxZoom: 16,
      });

      // Load points into supercluster
      cluster.load(points);

      // Get clusters for the current map view
      const updateClusters = () => {
        const bounds = map.getBounds()?.toArray();
        const zoom = map.getZoom();
        const clusters = cluster.getClusters(
          [
            bounds?.[0]?.[0] ?? 0,
            bounds?.[0]?.[1] ?? 0,
            bounds?.[1]?.[0] ?? 0,
            bounds?.[1]?.[1] ?? 0,
          ],
          Math.floor(zoom)
        );

        // Remove existing markers
        const markers = document.querySelectorAll(".custom-marker");
        markers.forEach((marker) => marker.remove());

        // Add markers for clusters
        clusters.forEach((clusterPoint) => {
          const { coordinates } = clusterPoint.geometry;
          const {
            cluster: isCluster,
            point_count: pointCount,
            id,
          } = clusterPoint.properties;

          const el = document.createElement("div");
          el.style.width = "48px";
          el.style.height = "48px";
          el.style.cursor = "pointer";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.border = "3px #FCFBF8 solid";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = "#727C7A";
          el.className = "custom-marker";

          if (isCluster) {
            el.classList.remove("marker");
            el.innerHTML = `<div style="font-weight: bold; color: white; font-size: 18px">+${pointCount}</div>`;
          } else {
            el.classList.add("marker");
            el.innerHTML = `<img src=${clusterPoint.properties.IconsSVG} />`;

            // Set active marker color
            if (id === activeCardId) {
              el.style.backgroundColor = "#132527"; // Active color
              el.classList.add("active-marker");
            } else {
              el.style.backgroundColor = "#727C7A"; // Default color
              el.classList.remove("marker");
            }

            el.addEventListener("click", () => {
              if (!map) {
                return;
              }
              setActiveCardId(id); // Update active marker state
            });
          }

          // Create a marker for the cluster
          new mapboxgl.Marker(el)
            .setLngLat([coordinates[0], coordinates[1]])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                isCluster
                  ? `<h3>${pointCount} Businesses</h3>`
                  : `<h3>${clusterPoint.properties.name}</h3><p>${clusterPoint.properties.companyAddress}</p>`
              )
            )
            .addTo(map);
        });
      };

      // Update clusters when the map moves or zooms
      map.on("moveend", updateClusters);
      map.on("zoomend", updateClusters);

      // Initial cluster update
      updateClusters();

      // Fit the map to the bounds of all markers
      const bounds = new mapboxgl.LngLatBounds();
      localBusinesses.forEach((business) =>
        bounds.extend([business.lang, business.lat])
      );
      map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
  }, [map, localBusinesses, activeCardId]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Mapbox;
