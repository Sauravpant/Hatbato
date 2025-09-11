import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPinHouse, Navigation, LocateFixed, MapPin } from "lucide-react";
import { getCurrentLocation } from "@/lib/geoLocation";
import { LoadingScreen } from "../ui/LoadingScreen";

interface MapCardProps {
  productLatitude: number;
  productLongitude: number;
}

const productLocationIcon = new Icon({
  iconUrl: "/map-pin.png",
  iconSize: [38, 38],
});

function MapPan({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

const MapCard: React.FC<MapCardProps> = ({ productLatitude, productLongitude }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [focusOnProduct, setFocusOnProduct] = useState<boolean>(false);

  // Fetch user's location
  useEffect(() => {
    (async () => {
      try {
        const result = await getCurrentLocation();
        setUserLocation([result.latitude, result.longitude]);
      } catch (err) {
        console.error("Could not get user location", err);
      }
    })();
  }, []);

  if (!userLocation) {
    return <LoadingScreen title="Loading Map" subtitle="Exploring the product location" />;
  }

  const distance = calculateDistance(userLocation[0], productLatitude, userLocation[1], productLongitude);
  const distanceDisplay = distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(2)} km`;

  const center: [number, number] = focusOnProduct ? [productLatitude, productLongitude] : (userLocation as [number, number]);

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
          <MapPin className="text-blue-500" size={24} />
          Product Location
        </h2>
        <p className="text-gray-600">See where this item is located relative to your position</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center">
          <div className="bg-white p-3 rounded-xl mr-4 shadow-sm">
            <MapPinHouse className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium">Distance from you</p>
            <p className="text-xl font-bold text-blue-900">{distanceDisplay} away</p>
          </div>
        </div>
        <button
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
          onClick={() => setFocusOnProduct(!focusOnProduct)}
        >
          {focusOnProduct ? (
            <>
              <LocateFixed size={18} />
              My Location
            </>
          ) : (
            <>
              <Navigation size={18} />
              View Product
            </>
          )}
        </button>
      </div>

      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <MapContainer center={center} zoom={15} className="w-full h-full z-0" zoomControl={true} style={{ borderRadius: "12px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapPan center={center} />
          <Marker position={userLocation}>
            <Popup>
              <div className="font-semibold text-blue-600">Your location</div>
            </Popup>
          </Marker>
          <Marker position={[productLatitude, productLongitude]} icon={productLocationIcon}>
            <Popup>
              <div className="font-semibold text-indigo-600">Product location</div>
            </Popup>
          </Marker>
        </MapContainer>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-white py-2 px-3 rounded-lg shadow-md flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm font-medium">Your location</span>
          </div>
          <div className="bg-white py-2 px-3 rounded-lg shadow-md flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm font-medium">Product location</span>
          </div>
        </div>
      </div>

      <div className="mt-5 text-sm text-gray-500 flex items-center justify-center">
        <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>The location is approximated and may introduce some errors</span>
        </div>
      </div>
    </div>
  );
};

export default MapCard;

// Haversine formula
function calculateDistance(lat1: number, lat2: number, lon1: number, lon2: number) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6378; // Earth radius in km
  return c * r;
}
