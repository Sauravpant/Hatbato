import React, { useState } from "react";
import { useMyGivenReviews, useMyReceivedReviews, useAverageData, useMyStats, useDeleteReview, useUpdateReview } from "@/hooks/user/useReviews";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyMessage } from "@/components/common/EmptyMessage";
import { Button } from "@/components/ui/button";
import type { UpdateReview } from "@/types/reviews/types";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { Textarea } from "flowbite-react";

interface UpdateBoxProps {
  id: string;
  isPending: boolean;
  onSubmit: (id: string, data: UpdateReview) => void;
}

const ReviewManagement = () => {
  const { data: givenData, isLoading: loadingGiven, error: errorGiven, refetch: refetchGiven } = useMyGivenReviews();
  const { data: receivedData, isLoading: loadingReceived, error: errorReceived, refetch: refetchReceived } = useMyReceivedReviews();
  const { data: averageData } = useAverageData();
  const { data: statsData } = useMyStats();

  const { mutate: deleteReview } = useDeleteReview();
  const { mutate: updateReview, isPending } = useUpdateReview();

  if (loadingGiven || loadingReceived) {
    return <LoadingScreen title="Fetching your reviews" subtitle="Please wait while we load your data" />;
  }

  if (errorGiven || errorReceived) {
    return (
      <ErrorMessage
        title="Error fetching reviews. Try again."
        refetch={() => {
          refetchGiven();
          refetchReceived();
        }}
      />
    );
  }

  const givenReviews = givenData?.data || [];
  const receivedReviews = receivedData?.data || [];

  const handleDeleteReview = (id: string) => {
    deleteReview({ reviewId: id });
  };
  const handleUpdateReview = (id: string, data: UpdateReview) => {
    updateReview({ reviewId: id, data });
  };
  return (
    <div className="space-y-10 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews Given</h2>
        {givenReviews.length === 0 ? (
          <EmptyMessage title="No reviews given" description="You haven't reviewed any sellers yet." />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">SN</th>
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Comment</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {givenReviews.map((review, index) => (
                  <tr key={review.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{review.seller.name}</td>
                    <td className="px-4 py-3">{review.comment || "—"}</td>
                    <td className="px-4 py-3 font-semibold">{review.rating} ⭐</td>
                    <td className="px-4 py-3">{new Date(review.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 space-x-2 flex">
                      <UpdateBox id={review.id} isPending={isPending} onSubmit={handleUpdateReview} />
                      <Button size="sm" className="bg-red-500 hover:bg-red-400 text-white" onClick={() => handleDeleteReview(review.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews Received</h2>
        {receivedReviews.length === 0 ? (
          <EmptyMessage title="No reviews received" description="You haven’t received any reviews yet." />
        ) : (
          <div className="space-y-6">
            {averageData?.data && statsData?.data && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg shadow border bg-white">
                  <h3 className="text-lg font-semibold">Average Rating</h3>
                  <p className="text-3xl font-bold mt-2">{averageData.data.averageRating.toFixed(1)} ⭐</p>
                  <p className="text-gray-500">{averageData.data.totalReviews} total reviews</p>
                </div>
                <div className="p-4 rounded-lg shadow border bg-white">
                  <h3 className="text-lg font-semibold mb-2">Ratings Breakdown</h3>
                  {Object.entries(statsData.data).map(([star, count]) => (
                    <div key={star} className="flex items-center justify-between text-sm mb-1">
                      <span>{star} ⭐</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Sn</th>
                    <th className="px-4 py-3">Reviewer</th>
                    <th className="px-4 py-3">Comment</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedReviews.map((review, index) => (
                    <tr key={review.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{review.reviewer.name}</td>
                      <td className="px-4 py-3">{review.comment || "—"}</td>
                      <td className="px-4 py-3 font-semibold">{review.rating} ⭐</td>
                      <td className="px-4 py-3">{new Date(review.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewManagement;

const UpdateBox: React.FC<UpdateBoxProps> = ({ id, onSubmit, isPending }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string | null>(null);

  const handleSubmit = () => {
    const data: UpdateReview = { rating: 0 };
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
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" max={5} min={0} onChange={(e) => setRating(Number(e.target.value))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" onChange={(e) => setComment(e.target.value)} value={comment ? comment : ""} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="outline" className="bg-blue-600 text-white cursor-pointer" onClick={handleSubmit}>
              {isPending ? "Updating" : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
