"use client";

import { useState, useEffect } from "react";
import warehousesData from "@/data/warehouses.json";

const LocationSelector = ({ location, setLocation }) => {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  // Get unique regions on mount
  useEffect(() => {
    const uniqueRegions = [...new Set(warehousesData.map((w) => w.region))];
    setRegions(uniqueRegions);
  }, []);

  // Update districts when region changes
  useEffect(() => {
    if (location.region) {
      const filteredDistricts = warehousesData
        .filter((w) => w.region === location.region && w.status === "active")
        .map((w) => w.district);
      const uniqueDistricts = [...new Set(filteredDistricts)];
      setDistricts(uniqueDistricts);

      // Reset dependent fields
      setLocation((prev) => ({
        ...prev,
        district: "",
        city: "",
        area: "",
      }));
      setAreas([]);
    }
  }, [location.region]);

  // Update areas when district changes
  useEffect(() => {
    if (location.district) {
      const warehouse = warehousesData.find(
        (w) =>
          w.region === location.region &&
          w.district === location.district &&
          w.status === "active"
      );

      if (warehouse) {
        setAreas(warehouse.covered_area || []);
        setLocation((prev) => ({
          ...prev,
          city: warehouse.city,
          area: "",
        }));
      }
    }
  }, [location.district]);

  const handleChange = (field, value) => {
    setLocation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Region */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Region (Division)</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={location.region}
          onChange={(e) => handleChange("region", e.target.value)}
          required
        >
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* District */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">District</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={location.district}
          onChange={(e) => handleChange("district", e.target.value)}
          disabled={!location.region}
          required
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* City (Auto-filled) */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">City</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full bg-base-200"
          value={location.city}
          readOnly
          placeholder="Auto-filled based on district"
        />
      </div>

      {/* Area */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Area</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={location.area}
          onChange={(e) => handleChange("area", e.target.value)}
          disabled={!location.district}
          required
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Address */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Detailed Address</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Enter your detailed address (House no, Road no, etc.)"
          value={location.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
          required
        />
      </div>
    </div>
  );
};

export default LocationSelector;
