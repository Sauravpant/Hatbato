import MapCard from "@/components/common/MapCard";
import ProductDetailsCard from "@/components/common/ProductDetailsCard";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { getProductById } from "@/services/product.services";
import type { Product } from "@/types/product/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["productById"],
    queryFn: () => getProductById(id!),
    staleTime: Infinity,
  });
  console.log(id);

  if (error) {
    return <ErrorMessage title="Error fetching Product" refetch={refetch} />;
  }

  if (isLoading) {
    return <LoadingScreen title="Loading Product Details" subtitle="Explore the Product in detail" />;
  }
  const productDetails: Product = data!;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <ProductDetailsCard product={productDetails} />
      <MapCard />
    </div>
  );
};

export default ProductDetails;
