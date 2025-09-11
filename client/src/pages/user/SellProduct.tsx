import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CategoryDetails } from "@/types/category/types";
import { getCategory } from "@/services/categoryServices";
import type { CreateProduct } from "@/types/product/types";
import toast from "react-hot-toast";
import { postProduct } from "@/services/product.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "flowbite-react";
import { getCurrentLocation } from "@/lib/geoLocation";

const productStatus: string[] = ["new", "like_new", "used", "refurbished", "damaged", "for_parts"];

const SellProduct = () => {
  const { data, error } = useQuery<CategoryDetails[]>({
    queryKey: ["productsCategory"],
    queryFn: getCategory,
    staleTime: Infinity,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateProduct>({
    title: "",
    description: "",
    price: 0,
    address: "",
    status: "new",
    category: "",
    deliveryAvailable: "false",
    latitude: 0,
    longitude: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(!loading);
      const { latitude, longitude } = await getCurrentLocation();

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("price", formData.price.toString());
      payload.append("address", formData.address);
      payload.append("status", formData.status);
      payload.append("category", formData.category);
      payload.append("deliveryAvailable", formData.deliveryAvailable);
      payload.append("latitude", latitude.toString());
      payload.append("longitude", longitude.toString());

      if (file) payload.append("productImage", file);

      const response = await postProduct(payload);
      setLoading(false);
      toast.success(response.message || "Product posted successfully!");

      setFormData({
        title: "",
        description: "",
        price: 0,
        address: "",
        status: "new",
        category: "",
        deliveryAvailable: "false",
        latitude: 0,
        longitude: 0,
      });
      
      setFile(null);
      setImagePreview(null);

    } catch (err: any) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Error submitting the form");
    }
  };

  if (error)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-md">Error fetching categories. Please try again later.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sell Your Product</h1>
            <p className="text-gray-600 mb-4">Fill in the details below to list your product for sale</p>
            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Enable location permission so we can track your product location
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file" className="text-gray-700 font-medium">
                Product Image
              </Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-400 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Product preview" className="mx-auto h-32 w-32 object-cover rounded-md shadow-sm" />
                    </div>
                  ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors duration-200"
                    >
                      <span>{file ? "Change image" : "Upload an image"}</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        required
                        accept="image/png, image/jpeg"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium">
                  Product Name
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  placeholder="e.g. Vintage Leather Jacket"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700 font-medium">
                  Price (Rs.)
                </Label>
                <Input
                  id="price"
                  type="number"
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Description
              </Label>
              <textarea
                id="description"
                value={formData.description}
                placeholder="Describe your product in detail..."
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 font-medium">
                Your Address
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                placeholder="Enter your complete address"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-700 font-medium">
                  Condition
                </Label>
                <div className="relative">
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CreateProduct["status"] })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all duration-200"
                  >
                    {productStatus.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700 font-medium">
                  Category
                </Label>
                <div className="relative">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    {data &&
                      data.map((ctg) => (
                        <option key={ctg.id} value={ctg.name}>
                          {ctg.name}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="space-y-0.5">
                <Label htmlFor="delivery" className="text-gray-700 font-medium">
                  Delivery Available
                </Label>
                <p className="text-sm text-gray-500">Check if you can deliver this product</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="delivery"
                  checked={formData.deliveryAvailable === "true"}
                  onChange={(e) => setFormData({ ...formData, deliveryAvailable: e.target.checked ? "true" : "false" })}
                  className="sr-only"
                />
                <label
                  htmlFor="delivery"
                  className={`block h-6 w-12 rounded-full cursor-pointer transition-colors duration-200 ${formData.deliveryAvailable === "true" ? "bg-blue-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all duration-200 ease-in-out ${formData.deliveryAvailable === "true" ? "transform translate-x-6" : ""}`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? <Spinner /> : "Post Product"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;
