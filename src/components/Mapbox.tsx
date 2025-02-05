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
        zoom: 0,
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
            center: [activeBusiness.lang, activeBusiness.lat - 0.013], // Ensure correct order [lng, lat]
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
      const points = localBusinesses.map((business) => ({
        type: "Feature",
        properties: {
          id: business.id,
          name: business.name,
          companyAddress: business.companyAddress,
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
          [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]],
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
            el.innerHTML = `
                            <svg width="18" height="18" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.21875 0.375H13.7812H14.5547L14.8359 1.14844L16.5234 6H18V13.3125V16.125H14.625V13.3125H3.375V16.125H0V13.3125V6H1.44141L3.12891 1.14844L3.41016 0.375H4.21875ZM14.1328 6L12.9727 2.625H4.99219L3.83203 6H14.1328ZM2.25 9.375C2.25 10.0078 2.74219 10.5 3.375 10.5C3.97266 10.5 4.5 10.0078 4.5 9.375C4.5 8.77734 3.97266 8.25 3.375 8.25C2.74219 8.25 2.25 8.77734 2.25 9.375ZM14.625 8.25C13.9922 8.25 13.5 8.77734 13.5 9.375C13.5 10.0078 13.9922 10.5 14.625 10.5C15.2227 10.5 15.75 10.0078 15.75 9.375C15.75 8.77734 15.2227 8.25 14.625 8.25Z" fill="#FCFBF8"/>
                            </svg>
                        `;

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

              // setTimeout(() => {
              //   map.flyTo({
              //     center: [coordinates[0], coordinates[1]], // Ensure correct order [lng, lat]
              //     zoom: 15, // Adjust zoom level
              //     essential: true, // Ensure smooth animation
              //     speed: 0.8, // Adjust speed for smoother transition
              //     curve: 1.42, // Adjust easing for a natural feel
              //   });
              // }, 100); // Delay execution slightly to allow state updates
            });
          }

          // Create a marker for the cluster
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
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
