import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Building2, Phone, MapPinned } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Calendar22 } from "@/components/pages/Datepicker";

interface BusinessFormData {
  tradeName: string;
  legalName?: string;
  businessType: string;
  businessCategory: string;
  gstin?: string;
  pan?: string;
  phone: string;
  email: string;
  website?: string;
  startDate: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  outlets: number;
  file: string;
}

const businessTypes = [
  { value: "proprietorship", label: "Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "private_ltd", label: "Private Limited" },
  { value: "company", label: "Company" },
  { value: "llp", label: "LLP" },
  { value: "cloud_kitchen", label: "Cloud Kitchen" },
];

const businessCategories = [
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "quick_service", label: "Quick Service" },
  { value: "retail", label: "Retail" },
  { value: "grocery", label: "Grocery" },
  { value: "bakery", label: "Bakery" },
  { value: "food_truck", label: "Food Truck" },
];

export default function BusinessDetailsForm() {
  const [locationStatus, setLocationStatus] = useState("");
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BusinessFormData>({
    defaultValues: {
      country: "India",
      outlets: 1,
    },
  });

  const captureLocation = () => {
    setIsCapturingLocation(true);
    setLocationStatus("");

    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
      setIsCapturingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
        setLocationStatus(
          `Location captured: ${position.coords.latitude.toFixed(
            6
          )}, ${position.coords.longitude.toFixed(6)}`
        );
        setIsCapturingLocation(false);
      },
      (error) => {
        setLocationStatus(`Error: ${error.message}`);
        setIsCapturingLocation(false);
      }
    );
  };

  const onSubmit = (data: BusinessFormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  return (
    <div className="min-h-screen w-[90%] ">
      <div className=" w-[90vw] mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Business Details
              </h1>
            </div>
            <p className="text-gray-600">
              Please provide your business information for registration
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business / Trade Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("tradeName", {
                      required: "Trade name is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter business name"
                  />
                  {errors.tradeName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tradeName.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Legal Registered Name
                  </label>
                  <input
                    {...register("legalName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Legal name (if different)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("businessType", {
                      required: "Business type is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {businessTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.businessType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("businessCategory", {
                      required: "Business category is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {businessCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.businessCategory && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.businessCategory.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GSTIN
                  </label>
                  <input
                    {...register("gstin", {
                      pattern: {
                        value:
                          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                        message: "Invalid GSTIN format",
                      },
                      maxLength: {
                        value: 15,
                        message: "GSTIN must be 15 characters",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15 character GSTIN"
                    maxLength={15}
                  />
                  {errors.gstin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gstin.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("pan", {
                      required: "PAN is required",
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: "Invalid PAN format",
                      },
                      maxLength: {
                        value: 10,
                        message: "PAN must be 10 characters",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    placeholder="10 character PAN"
                    maxLength={10}
                  />
                  {errors.pan && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pan.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10 digit phone number"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="business@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website / Social Media Links
                  </label>
                  <input
                    {...register("website")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com or social media links"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Start Date
                  </label>
                  <Calendar22 />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Outlets/Branches
                  </label>
                  <input
                    {...register("outlets", { valueAsNumber: true, min: 1 })}
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Business Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("addressLine1", {
                      required: "Address is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Street address, building number"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    {...register("addressLine2")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Apartment, suite, floor (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("city", { required: "City is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("state", { required: "State is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Invalid pincode",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6 digit pincode"
                    maxLength={6}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Country"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
                  File upload <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("file", { required: "City is required" })}
                  className="w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  type="file"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </section>

            {/* Location Capture */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPinned className="w-5 h-5" />
                Location Coordinates
              </h2>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={captureLocation}
                  disabled={isCapturingLocation}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  <MapPinned className="w-4 h-4" />
                  {isCapturingLocation
                    ? "Capturing Location..."
                    : "Capture Current Location"}
                </button>

                {locationStatus && (
                  <Alert>
                    <AlertDescription>{locationStatus}</AlertDescription>
                  </Alert>
                )}

                {latitude && longitude && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude
                      </label>
                      <input
                        {...register("latitude", { valueAsNumber: true })}
                        type="number"
                        step="any"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude
                      </label>
                      <input
                        {...register("longitude", { valueAsNumber: true })}
                        type="number"
                        step="any"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Submit Business Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
