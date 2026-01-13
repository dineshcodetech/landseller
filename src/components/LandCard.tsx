"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize, Calendar, ChevronRight } from "lucide-react";
import { formatPrice, formatArea } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LandCardProps {
  land: {
    _id: string;
    title: string;
    price: number;
    area: number;
    location: {
      address: string;
      city: string;
      state: string;
    };
    landType: "residential" | "commercial" | "agricultural" | "industrial";
    images: string[];
    createdAt: string;
  };
}

export function LandCard({ land }: LandCardProps) {
  return (
    <Link
      href={`/land/${land._id}`}
      className="group block relative rounded-[32px] bg-white border border-slate-100 shadow-premium overflow-hidden card-hover transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={land.images[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"}
          alt={land.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm capitalize rounded-lg">
            {land.landType}
          </Badge>
        </div>
        
        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-black text-lg shadow-xl">
             {formatPrice(land.price)}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="p-7 space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 leading-tight">
            {land.title}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs uppercase tracking-wider">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span className="line-clamp-1">{land.location.city}, {land.location.state}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Maximize className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Plot Size</p>
              <p className="text-sm font-extrabold text-slate-900">{formatArea(land.area)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Listed On</p>
              <p className="text-sm font-extrabold text-slate-900">
                {new Date(land.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
           <div className="flex flex-col">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Total Valuation</p>
              <p className="text-2xl font-black text-emerald-600 tracking-tight">{formatPrice(land.price)}</p>
           </div>
           
           <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-emerald-600 transition-all duration-300">
              <ChevronRight className="h-6 w-6" />
           </div>
        </div>
      </div>
    </Link>
  );
}
