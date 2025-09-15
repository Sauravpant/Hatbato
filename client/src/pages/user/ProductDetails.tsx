import MapCard from "@/components/common/MapCard";
import ProductDetailsCard from "@/components/common/ProductDetailsCard";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { getProductById } from "@/services/productServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["productById", id],
    queryFn: () => getProductById(id!),
    staleTime: Infinity,
  });

  if (error) {
    return <ErrorMessage title="Error fetching Product" refetch={refetch} />;
  }

  if (isLoading) {
    return <LoadingScreen title="Loading Product Details" subtitle="Explore the Product in detail" />;
  }
  return (
    <div className="px-4 sm:px-6">
      <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-bold text-blue-600 mt-4 mb-4">Product Details & Location</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
        <ProductDetailsCard product={data!} />
        <MapCard productLatitude={data?.latitude!} productLongitude={data?.longitude!} />
      </div>
    </div>
  );
};

export default ProductDetails;
