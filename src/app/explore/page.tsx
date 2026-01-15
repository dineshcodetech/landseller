import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Sparkles, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { LandFilters } from "@/components/LandFilters";
import { LandCard } from "@/components/LandCard";
import { getLands } from "@/actions/land";

interface ExplorePageProps {
  searchParams: Promise<{
    search?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
    landType?: string;
    page?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  // Parse search params
  const params = await searchParams;
  const lands = await getLands({
    ...params,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minArea: params.minArea ? Number(params.minArea) : undefined,
    maxArea: params.maxArea ? Number(params.maxArea) : undefined,
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-32">
      {/* Header Banner */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(20,184,166,0.1),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
               <Sparkles className="h-4 w-4" /> Global Discovery
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl mb-6">
               Asset <span className="text-emerald-500">Inventory</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
               Navigate through our curated collection of high-potential land assets. 
               Hand-vetted properties for professional and private investments.
            </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <Suspense fallback={<SearchLoader />}>
          <LandFilters />
        </Suspense>

        <div className="mt-24">
          <div className="flex items-center justify-between mb-12 px-2">
             <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                   <SlidersHorizontal className="h-6 w-6 text-emerald-600" /> Availability Spectrum
                </h2>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                   {lands.length} Assets Identified <ArrowUpRight className="h-3 w-3" />
                </div>
             </div>
          </div>

          <Suspense fallback={<ListingsLoader />}>
            {lands.length > 0 ? (
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {lands.map((land, idx) => (
                  <div 
                    key={land._id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <LandCard land={land} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[40px] bg-white border border-slate-100 p-24 text-center shadow-premium">
                <div className="h-32 w-32 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <MapPin className="h-14 w-14 text-slate-300" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Requirement Mismatch</h3>
                <p className="mt-4 text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                  We couldn&apos;t identify any assets matching your specific valuation or geographical criteria. 
                  Try recalibrating your search parameters.
                </p>
                <div className="mt-12 flex justify-center gap-4">
                   <Button asChild variant="outline" className="rounded-2xl px-10 h-14 border-2 font-bold">
                      <Link href="/explore">
                        Reset Parameters
                      </Link>
                   </Button>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function SearchLoader() {
  return (
    <div className="h-[400px] w-full bg-white rounded-[40px] shadow-premium flex items-center justify-center">
       <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mx-auto opacity-20" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Filters...</p>
       </div>
    </div>
  );
}

function ListingsLoader() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-[500px] rounded-[32px] bg-white animate-pulse border border-slate-100 shadow-premium p-6">
           <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl mb-8" />
           <div className="h-8 w-3/4 bg-slate-50 rounded-lg mb-4" />
           <div className="h-4 w-1/2 bg-slate-50 rounded-lg mb-12" />
           <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-slate-50 rounded-xl" />
              <div className="h-12 bg-slate-50 rounded-xl" />
           </div>
        </div>
      ))}
    </div>
  );
}
