import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Ruler, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  ArrowLeft,
  Check,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/ContactForm";
import { getLandById } from "@/actions/land";
import { formatPrice, formatArea } from "@/lib/utils";

interface LandPageProps {
  params: Promise<{ id: string }>;
}

const landTypeImages = {
  residential: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
  agricultural: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
  industrial: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
};

export async function generateMetadata({ params }: LandPageProps) {
  const { id } = await params;
  const land = await getLandById(id);

  if (!land) {
    return { title: "Land Not Found | LandSeller" };
  }

  return {
    title: `${land.title} | LandSeller`,
    description: land.description.substring(0, 160),
    openGraph: {
      title: land.title,
      description: land.description.substring(0, 160),
      images: [land.images[0] || landTypeImages[land.landType]],
    },
  };
}

export default async function LandPage({ params }: LandPageProps) {
  const { id } = await params;
  const land = await getLandById(id);

  if (!land) {
    notFound();
  }

  const images = land.images.length > 0 
    ? land.images 
    : [landTypeImages[land.landType as keyof typeof landTypeImages]];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/explore"
            className="inline-flex items-center text-sm text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Explore
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={images[0]}
                alt={land.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <Badge variant={land.landType as "residential" | "commercial" | "agricultural" | "industrial"} className="text-sm">
                  {land.landType}
                </Badge>
              </div>
              {land.isFeatured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Additional Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`${land.title} - Image ${i + 2}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Details Card */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{land.title}</CardTitle>
                    <div className="mt-2 flex items-center text-slate-500">
                      <MapPin className="h-4 w-4 mr-1 text-emerald-500" />
                      {land.location.address}, {land.location.city}, {land.location.state} - {land.location.pincode}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Price & Key Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-xl font-bold text-emerald-600">
                      {formatPrice(land.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Area</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatArea(land.area)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Price per sq ft</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatPrice(Math.round(land.price / land.area))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Listed On</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {new Date(land.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900">Description</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed whitespace-pre-line">
                    {land.description}
                  </p>
                </div>

                {/* Features */}
                {land.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-900">Features</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {land.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-slate-600"
                        >
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                            <Check className="h-3 w-3 text-emerald-600" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Details */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900">Location</h3>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-emerald-500" />
                      <span>{land.location.city}, {land.location.state}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Ruler className="h-4 w-4 text-emerald-500" />
                      <span>{formatArea(land.area)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl font-bold">
                    {land.owner.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{land.owner.name}</p>
                    <p className="text-sm text-slate-500">Property Seller</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-emerald-500" />
                    {land.owner.email}
                  </div>
                  {land.owner.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4 text-emerald-500" />
                      {land.owner.phone}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interested? Contact Seller</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm landId={land._id} landTitle={land.title} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
