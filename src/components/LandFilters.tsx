"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, IndianRupee, Maximize, Filter, X, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LAND_TYPES = [
  { value: "all", label: "All Asset Types" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "agricultural", label: "Agricultural" },
  { value: "industrial", label: "Industrial" },
];

const STATES = [
  "Karnataka", "Maharashtra", "Tamil Nadu", "Telangana", "Kerala", "Gujarat", "Rajasthan", "Punjab", "Delhi", "Goa"
];

export function LandFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentFilters = {
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minArea: searchParams.get("minArea") || "",
    maxArea: searchParams.get("maxArea") || "",
    landType: searchParams.get("landType") || "all",
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push("/explore");
    });
  };

  return (
    <div className="space-y-10">
      {/* Principal Search Bar */}
      <div className="relative group max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative p-2 glass rounded-[32px] shadow-2xl border-white/40 flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by plot title, locality, or features..."
              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
              defaultValue={currentFilters.search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFilterChange("search", (e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>
          <Button 
            className="h-16 px-10 rounded-2xl bg-slate-900 hover:bg-emerald-600 shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/20 transition-all text-lg font-bold"
            onClick={() => handleFilterChange("search", currentFilters.search)}
            disabled={isPending}
          >
            Find Assets
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-premium">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Filter className="h-5 w-5 text-emerald-600" />
             </div>
             <h3 className="text-xl font-extrabold text-slate-900">Advanced Specifications</h3>
          </div>
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="text-slate-500 hover:text-red-500 font-bold text-xs uppercase tracking-widest gap-2"
          >
            <X className="h-4 w-4" /> Clear All
          </Button>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Asset Type */}
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Building className="h-3.5 w-3.5" /> Asset Classification
            </Label>
            <Select
              value={currentFilters.landType}
              onValueChange={(v) => handleFilterChange("landType", v)}
            >
              <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50 px-5 font-semibold text-slate-700 focus:ring-emerald-500/20">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 p-2 shadow-2xl">
                {LAND_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="rounded-xl py-3 font-semibold">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> Geographic Region
            </Label>
            <Select
              value={currentFilters.location}
              onValueChange={(v) => handleFilterChange("location", v)}
            >
              <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50 px-5 font-semibold text-slate-700 focus:ring-emerald-500/20">
                <SelectValue placeholder="Select State / Region" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 p-2 shadow-2xl">
                {STATES.map((state) => (
                  <SelectItem key={state} value={state} className="rounded-xl py-3 font-semibold">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <IndianRupee className="h-3.5 w-3.5" /> Valuation Framework
            </Label>
            <div className="flex gap-3">
              <Input
                placeholder="Min"
                type="number"
                className="h-14 rounded-2xl border-slate-100 bg-slate-50 px-5 font-semibold"
                defaultValue={currentFilters.minPrice}
                onBlur={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <Input
                placeholder="Max"
                type="number"
                className="h-14 rounded-2xl border-slate-100 bg-slate-50 px-5 font-semibold"
                defaultValue={currentFilters.maxPrice}
                onBlur={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          {/* Area */}
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Maximize className="h-3.5 w-3.5" /> Dimensional Bounds (Sq Ft)
            </Label>
            <div className="flex gap-3">
              <Input
                placeholder="From"
                type="number"
                className="h-14 rounded-2xl border-slate-100 bg-slate-50 px-5 font-semibold"
                defaultValue={currentFilters.minArea}
                onBlur={(e) => handleFilterChange("minArea", e.target.value)}
              />
              <Input
                placeholder="To"
                type="number"
                className="h-14 rounded-2xl border-slate-100 bg-slate-50 px-5 font-semibold"
                defaultValue={currentFilters.maxArea}
                onBlur={(e) => handleFilterChange("maxArea", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
