import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory, useUpdateCategory } from "@/hooks/admin/useCategories";
import type { CreateCategory, UpdateCategory } from "@/types/admin/types";
import { Plus, Edit, ArrowRight } from "lucide-react";

export const CreateNewCategory: React.FC = () => {
  const [form, setForm] = useState<CreateCategory>({ name: "", slug: "", slogan: "", description: "" });
  const { mutate, isPending } = useCreateCategory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ data: form });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Create New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Slug</Label>
            <Input name="slug" value={form.slug} onChange={handleChange} required className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Slogan</Label>
            <Input name="slogan" value={form.slogan} onChange={handleChange} required className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <Input name="description" value={form.description} onChange={handleChange} required className="rounded-md" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md">
              Create Category
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateCategoryInfo: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutate, isPending } = useUpdateCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: UpdateCategory = {};
    if (name) data.name = name;
    if (slug) data.slug = slug;
    if (description) data.description = description;
    if (slogan) data.slogan = slogan;
    mutate({ categoryId: categoryId, data });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 rounded-md">
          <Edit className="h-3.5 w-3.5" />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Update Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Name</Label>
            <Input name="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Slug</Label>
            <Input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Slogan</Label>
            <Input name="slogan" value={slogan} onChange={(e) => setSlogan(e.target.value)} className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-md" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md">
              Update Category
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
