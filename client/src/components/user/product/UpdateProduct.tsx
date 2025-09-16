import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { UpdateProduct } from "@/types/product/types";
import { useGetCategory } from "@/hooks/user/useCategory";
import { useUpdateProduct } from "@/hooks/user/useProduct";

interface ProductUpdateDialogProps {
  buttonText: string;
  productId: string;
}

export const UpdateProductDetails: React.FC<ProductUpdateDialogProps> = ({ buttonText, productId }) => {
  const { data: categories } = useGetCategory();
  const { mutate, isPending } = useUpdateProduct();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts" | "">("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const productStatus = ["new", "like_new", "used", "refurbished", "damaged", "for_parts"];

  const handleSubmit = () => {
    const updateData: UpdateProduct = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = Number(price);
    if (address) updateData.address = address;
    if (status) updateData.status = status;
    if (category) updateData.category = category;

    if (Object.keys(updateData).length === 0 && !image) return;

    mutate({ productId, data: updateData, file: image });
    setImage(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white cursor-pointer">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" placeholder="Enter product title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(val) => setStatus(val as typeof status)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {productStatus.map((pst) => (
                  <SelectItem key={pst} value={pst}>
                    {pst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(val) => setCategory(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((ctg) => (
                  <SelectItem key={ctg.id} value={ctg.name}>
                    {ctg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Attach Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
