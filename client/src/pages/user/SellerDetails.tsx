import { useParams } from "react-router-dom";
import { useGetUser } from "@/hooks/user/useUser";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Star, Shield, Package, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreateReview } from "@/hooks/user/useReviews";
import type { CreateReview } from "@/types/reviews/types";

const SellerDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetUser(id as string);

  const { mutate, isPending } = useCreateReview();

  const user = data?.data;

  if (!user) return <ErrorMessage title="User not found" refetch={refetch} />;

  const { name, email, contactNumber, address, isVerified, totalProducts, averageRating, reviews, imageUrl } = user;

  if (isLoading) return <LoadingScreen title="Loading profile" subtitle="Fetching seller details..." />;
  if (error) return <ErrorMessage title="Failed to fetch seller details" refetch={refetch} />;

  const handleReview = (id: string, data: CreateReview) => {
    mutate({ sellerId: id, data });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-5">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover shadow-sm" />
        ) : (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-sm">
            {name[0]}
          </div>
        )}

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 text-gray-600 text-xs sm:text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{email}</span>
              </div>
              {contactNumber && (
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contactNumber}</span>
                </div>
              )}
            </div>
            {address && (
              <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-600 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{address}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
            <span
              className={`px-2 py-0.5 rounded-full font-medium text-xs flex items-center gap-1 ${
                isVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              <Shield className="w-3 h-3" />
              {isVerified ? "Verified" : "Not Verified"}
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium text-xs flex items-center gap-1">
              <Package className="w-3 h-3" />
              {totalProducts}
            </span>
            <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {averageRating?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            Reviews ({reviews?.length || 0})
          </h2>
          <Review onSubmit={handleReview} id={user.id} isPending={isPending} />
        </div>
        {reviews && reviews.length > 0 ? (
          <ul className="space-y-2.5">
            {reviews.map((review) => (
              <li key={review.id} className="border border-gray-150 rounded-md p-3 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <p className="font-medium text-gray-800 text-sm">{review.reviewer.name}</p>
                  <div className="flex items-center gap-1 text-amber-500 font-medium text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {review.rating}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.comment || <span className="italic text-gray-400">No comment provided</span>}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center py-4 text-sm">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDetails;

const Review = ({ id, onSubmit, isPending }: { id: string; isPending: boolean; onSubmit: (id: string, data: CreateReview) => void }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string | null>(null);

  const handleSubmit = () => {
    const data: CreateReview = { rating: 0 };
    data.rating = rating;
    if (comment) data.comment = comment;
    onSubmit(id, data);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 px-2.5 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Review the seller</DialogTitle>
            <DialogDescription>Review the seller and promote them</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" max={5} min={0} onChange={(e) => setRating(Number(e.target.value))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="comment">Comment</Label>
              <Input id="comment" onChange={(e) => setComment(e.target.value)} value={comment ? comment : ""} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="outline" className="bg-blue-600 text-white cursor-pointer" onClick={handleSubmit}>
              {isPending?"Processing":"Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
