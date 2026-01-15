"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createLand, updateLand, type LandFormData } from "@/actions/land";
import { Loader2, Plus, X } from "lucide-react";

const STATES = [
  "Andhra Pradesh",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Gujarat",
  "Rajasthan",
  "Delhi",
  "Uttar Pradesh",
];

interface LandFormProps {
  land?: {
    _id: string;
    title: string;
    description: string;
    price: number;
    area: number;
    location: {
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    landType: "residential" | "commercial" | "agricultural" | "industrial";
    features: string[];
    images: string[];
  };
  onSuccess?: () => void;
}

export function LandForm({ land, onSuccess }: LandFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [newFeature, setNewFeature] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<LandFormData>({
    title: land?.title || "",
    description: land?.description || "",
    price: land?.price || 0,
    area: land?.area || 0,
    address: land?.location.address || "",
    city: land?.location.city || "",
    state: land?.location.state || "",
    pincode: land?.location.pincode || "",
    landType: land?.landType || "residential",
    features: land?.features || [],
    images: land?.images || [],
  });

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.title || !formData.description || !formData.price || !formData.area) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const result = land
        ? await updateLand(land._id, formData)
        : await createLand(formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "success",
        });
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else {
        if (result.errors) setErrors(result.errors);
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Property Title *</Label>
          <Input
            id="title"
            placeholder="Beautiful Residential Plot in Prime Location"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={isPending}
          />
          {errors["title"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["title"]}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your property in detail..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isPending}
            rows={4}
          />
          {errors["description"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["description"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            placeholder="5000000"
            value={formData.price || ""}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            disabled={isPending}
          />
          {errors["price"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["price"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft) *</Label>
          <Input
            id="area"
            type="number"
            placeholder="2400"
            value={formData.area || ""}
            onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
            disabled={isPending}
          />
          {errors["area"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["area"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="landType">Land Type *</Label>
          <Select
            value={formData.landType}
            onValueChange={(value: LandFormData["landType"]) =>
              setFormData({ ...formData, landType: value })
            }
            disabled={isPending}
          >
            <SelectTrigger id="landType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
            disabled={isPending}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Mumbai"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            disabled={isPending}
          />
          {errors["city"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["city"]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode *</Label>
          <Input
            id="pincode"
            placeholder="400001"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            disabled={isPending}
            maxLength={6}
          />
          {errors["pincode"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["pincode"]}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Full Address *</Label>
          <Input
            id="address"
            placeholder="123, Land Avenue, Sector 5"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={isPending}
          />
          {errors["address"] && <p className="text-sm font-medium text-red-500 mt-1">{errors["address"]}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Features</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a feature (e.g., Corner Plot)"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              disabled={isPending}
            />
            <Button type="button" variant="outline" onClick={addFeature} disabled={isPending}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.features.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="ml-1 rounded-full hover:bg-emerald-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="images">Image URLs (comma separated)</Label>
          <Input
            id="images"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            value={formData.images.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                images: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            disabled={isPending}
          />
          <p className="text-xs text-slate-500">
            Add image URLs separated by commas. Leave empty for default images.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {land ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{land ? "Update Listing" : "Create Listing"}</>
          )}
        </Button>
      </div>
    </form>
  );
}
