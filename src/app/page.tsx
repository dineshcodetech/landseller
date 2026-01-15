import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  MapPin, 
  Shield, 
  Users, 
  TrendingUp, 
  Search,
  Building,
  Leaf,
  Factory,
  Home as HomeIcon,
  MousePointer2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandCard } from "@/components/LandCard";
import { getFeaturedLands } from "@/actions/land";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Properties Listed", value: "2,500+", icon: Building, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Happy Customers", value: "15,000+", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Cities Covered", value: "100+", icon: MapPin, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Total Value", value: "₹500Cr+", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-500/10" },
];

const LAND_TYPES = [
  {
    type: "residential",
    label: "Residential",
    icon: HomeIcon,
    description: "Build your dream sanctuary",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/10 hover:shadow-blue-500/30",
  },
  {
    type: "commercial",
    label: "Commercial",
    icon: Building,
    description: "Launch your next venture",
    color: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-500/10 hover:shadow-purple-500/30",
  },
  {
    type: "agricultural",
    label: "Agricultural",
    icon: Leaf,
    description: "Cultivate a sustainable future",
    color: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/10 hover:shadow-emerald-500/30",
  },
  {
    type: "industrial",
    label: "Industrial",
    icon: Factory,
    description: "Engineered for growth",
    color: "from-orange-500 to-orange-600",
    shadow: "shadow-orange-500/10 hover:shadow-orange-500/30",
  },
];

export default async function HomePage() {
  const featuredLands = await getFeaturedLands();

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden gradient-hero">
        <div className="absolute inset-x-0 bottom-0 top-0 bg-transparent opacity-80" />
        
        {/* Animated Background Elements */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-100/50 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-teal-100/50 blur-[120px] animate-float" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-fade-in space-y-8">
              <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 border-emerald-200/50 shadow-sm">
                <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-800 tracking-wide uppercase">
                  India&apos;s Most Trusted Land Portal
                </span>
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]">
                Claim Your Piece of
                <span className="block mt-2 font-heading gradient-text drop-shadow-sm">
                  Prime Earth
                </span>
              </h1>
              
              <p className="max-w-xl text-xl text-slate-600 leading-relaxed font-medium opacity-90">
                Seamlessly discover, evaluate, and acquire premium land properties. 
                Your gateway to exclusive residential, commercial, and agricultural investments.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row pt-4">
                <Link href="/explore">
                  <Button size="lg" className="w-full sm:w-auto px-10 h-16 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-lg shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-600/30">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Portfolio
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 h-16 rounded-2xl border-2 text-lg font-bold border-slate-200 bg-white/50 backdrop-blur-sm transition-all hover:bg-white hover:border-emerald-400 group">
                    list property
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative h-12 w-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                      <Image 
                        src={`https://i.pravatar.cc/100?u=${i}`} 
                        alt="User avatar" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Sparkles key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-slate-900">15,000+ Active Investors</p>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">TRUSTED BY INDUSTRY LEADERS</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up hidden lg:block" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 p-4 glass rounded-[40px] shadow-2xl shadow-emerald-500/10 border-white/40 overflow-hidden group">
                <div className="absolute inset-0 bg-transparent group-hover:bg-emerald-600/5 transition-all pointer-events-none" />
                <div className="relative rounded-[30px] overflow-hidden aspect-[4/5] shadow-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=1000&fit=crop"
                    alt="Lush green land at sunset"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-6 left-6 flex gap-2">
                    <Badge className="bg-white/20 backdrop-blur-md border-white/20 text-white font-bold py-1.5 px-4 rounded-xl">
                      Featured Investment
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="glass p-6 rounded-[30px] border-white/30 space-y-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-slate-900 font-extrabold text-2xl font-heading">Highland Retreat</p>
                          <p className="text-slate-500 flex items-center gap-1.5 text-sm font-semibold">
                            <MapPin className="h-4 w-4 text-emerald-600" />
                            Coorg, Karnataka
                          </p>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
                          <MousePointer2 className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
                        <span className="text-3xl font-black text-emerald-700">₹85 L<span className="text-sm font-bold text-slate-400"> onw.</span></span>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Leaf className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Eco Property</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute -right-8 top-1/4 h-32 w-32 glass rounded-3xl p-4 shadow-xl border-white/50 animate-float flex flex-col items-center justify-center gap-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-xs font-black text-slate-900 text-center">ROI +12%<br/><span className="text-[10px] text-slate-400 font-bold uppercase">Average</span></span>
              </div>
              
              <div className="absolute -left-12 bottom-1/4 h-32 w-56 glass rounded-[30px] p-5 shadow-2xl border-white/50 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-900 leading-tight">Legally Verified <br/>Documents</p>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">CERTIFIED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 py-16 -mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-dark rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-slate-900/20 border-slate-800">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center space-y-4">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] ${stat.bg} shadow-inner`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Land Types Section */}
      <section className="py-32 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <Badge className="bg-emerald-100 text-emerald-700 py-2 px-6 rounded-full font-bold uppercase text-xs tracking-widest border-emerald-200">
              Categories
            </Badge>
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
              Invest According to Your <br/>
              <span className="gradient-text">Future Aspirations</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Curated opportunities tailored to your specific development and investment goals.
            </p>
          </div>
          
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {LAND_TYPES.map((type, idx) => (
              <Link
                key={type.type}
                href={`/explore?landType=${type.type}`}
                className={`group relative overflow-hidden rounded-[40px] bg-white p-10 transition-all duration-500 card-hover border border-slate-100 shadow-premium ${type.shadow} hover:border-emerald-200`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`relative mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${type.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <type.icon className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {type.label}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {type.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-600 transition-all group-hover:gap-4">
                  View Assets
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lands Section */}
      <section className="py-32 bg-white relative">
        <div className="absolute inset-0 pattern-bg opacity-[0.03] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
            <div className="space-y-4">
               <Badge className="bg-amber-100 text-amber-700 py-2 px-6 rounded-full font-bold uppercase text-xs tracking-widest border-amber-200">
                Hot Assets
              </Badge>
              <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                Exclusive <span className="gradient-text">Market Arrivals</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium max-w-xl">
                The most sought-after properties currently available. Hand-vetted for verified titles and prime potential.
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 border-2 font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all gap-2">
                Explore All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {featuredLands.length > 0 ? (
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {featuredLands.map((land) => (
                <div key={land._id} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <LandCard land={land} />
                </div>
              ))}
            </div>
          ) : (
             <div className="mt-10 rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center bg-slate-50/50">
              <div className="h-24 w-24 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm mb-8">
                <MapPin className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">No Premium Assets Listed</h3>
              <p className="mt-3 text-slate-500 font-medium max-w-sm mx-auto">
                Be the market pioneer. List your premium land development and reach 15,000+ potential investors.
              </p>
              <Link href="/register" className="mt-10 inline-block">
                <Button size="lg" className="rounded-2xl px-10 bg-emerald-600 hover:bg-emerald-700 font-bold">List Your Property</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Trusted By / CTA Section */}
      <section className="py-40 px-4 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-emerald-600/10 rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-teal-600/10 rounded-full blur-[150px] -ml-48 -mb-48" />
        
        <div className="relative mx-auto max-w-5xl text-center space-y-12">
           <div className="space-y-6">
              <Badge className="bg-emerald-500/20 text-emerald-400 py-2 px-6 rounded-full font-bold uppercase text-xs tracking-widest border-emerald-500/30">
                Let&apos;s Build Together
              </Badge>
              <h2 className="text-5xl font-extrabold text-white sm:text-7xl tracking-tighter">
                Transform Wealth into <br/>
                <span className="text-emerald-500 italic">Tangible Legacy.</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
                Join a community of deliberate investors and landowners reshaping India&apos;s landscape. 
                Experience real estate procurement as it should be: transparent, efficient, and premium.
              </p>
           </div>
           
           <div className="flex flex-col gap-6 sm:flex-row sm:justify-center pt-8">
              <Link href="/explore">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl h-16 px-12 text-lg font-black transition-transform hover:scale-105">
                  Begin Search
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl h-16 px-12 text-lg font-black border-slate-700 text-black hover:bg-slate-800 transition-transform hover:scale-105"
                >
                  Start Listing
                </Button>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2", className)}>
      {children}
    </div>
  );
}
