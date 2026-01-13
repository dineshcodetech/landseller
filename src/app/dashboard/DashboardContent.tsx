"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  MapPin,
  Mail,
  Phone,
  Trash2,
  Edit,
  Eye,
  MessageSquare,
  Building,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { LandForm } from "@/components/LandForm";
import { deleteLand } from "@/actions/land";
import { updateContactRequestStatus } from "@/actions/contact";
import { formatPrice, formatArea } from "@/lib/utils";

interface Land {
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
  isActive: boolean;
  createdAt: string;
}

interface ContactRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "read" | "responded";
  createdAt: string;
  land: {
    _id: string;
    title: string;
    location: {
      city: string;
      state: string;
    };
  };
}

interface DashboardContentProps {
  user: {
    name: string;
    email: string;
  };
  lands: Land[];
  contactRequests: ContactRequest[];
}

export function DashboardContent({
  user,
  lands,
  contactRequests,
}: DashboardContentProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLand, setEditingLand] = useState<Land | null>(null);
  const [deletingLandId, setDeletingLandId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deletingLandId) return;

    startTransition(async () => {
      const result = await deleteLand(deletingLandId);

      if (result.success) {
        toast({
          title: "Deleted!",
          description: result.message,
          variant: "success",
        });
        setDeletingLandId(null);
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleStatusChange = async (
    requestId: string,
    status: "pending" | "read" | "responded"
  ) => {
    startTransition(async () => {
      const result = await updateContactRequestStatus(requestId, status);

      if (result.success) {
        toast({
          title: "Updated!",
          description: result.message,
          variant: "success",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  const pendingRequests = contactRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Welcome back, {user.name}!
              </h1>
              <p className="mt-1 text-slate-500">
                Manage your land listings and view inquiries
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-5 w-5" />
              Add New Listing
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Building className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{lands.length}</p>
                    <p className="text-sm text-slate-500">Your Listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {contactRequests.length}
                    </p>
                    <p className="text-sm text-slate-500">Total Inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{pendingRequests}</p>
                    <p className="text-sm text-slate-500">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {lands.filter((l) => l.isActive).length}
                    </p>
                    <p className="text-sm text-slate-500">Active Listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="inquiries">
              Contact Requests
              {pendingRequests > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">{pendingRequests}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            {lands.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <MapPin className="h-16 w-16 text-slate-300" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    No Listings Yet
                  </h3>
                  <p className="mt-2 text-slate-500 text-center max-w-md">
                    You haven&apos;t listed any land properties yet. Click the button below
                    to create your first listing.
                  </p>
                  <Button className="mt-6" onClick={() => setShowAddForm(true)}>
                    <Plus className="h-5 w-5" />
                    Add Your First Listing
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {lands.map((land) => (
                  <Card key={land._id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-slate-900">
                                  {land.title}
                                </h3>
                                <Badge variant={land.landType}>{land.landType}</Badge>
                              </div>
                              <p className="mt-1 text-sm text-slate-500 flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {land.location.city}, {land.location.state}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-emerald-600">
                                {formatPrice(land.price)}
                              </p>
                              <p className="text-sm text-slate-500">
                                {formatArea(land.area)}
                              </p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                            {land.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link href={`/land/${land._id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingLand(land)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => setDeletingLandId(land._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Contact Requests Tab */}
          <TabsContent value="inquiries">
            {contactRequests.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <MessageSquare className="h-16 w-16 text-slate-300" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    No Inquiries Yet
                  </h3>
                  <p className="mt-2 text-slate-500 text-center max-w-md">
                    You haven&apos;t received any contact requests. When interested buyers
                    reach out, their inquiries will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {contactRequests.map((request) => (
                  <Card key={request._id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{request.name}</CardTitle>
                          <p className="text-sm text-slate-500">
                            Inquiry for:{" "}
                            <Link
                              href={`/land/${request.land._id}`}
                              className="text-emerald-600 hover:underline"
                            >
                              {request.land.title}
                            </Link>
                          </p>
                        </div>
                        <Badge
                          variant={
                            request.status === "pending"
                              ? "destructive"
                              : request.status === "read"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-emerald-500" />
                          {request.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4 text-emerald-500" />
                          {request.phone}
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700">{request.message}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                          {new Date(request.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <div className="flex gap-2">
                          {request.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(request._id, "read")}
                              disabled={isPending}
                            >
                              Mark as Read
                            </Button>
                          )}
                          {request.status !== "responded" && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(request._id, "responded")}
                              disabled={isPending}
                            >
                              Mark as Responded
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Land Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Land Listing</DialogTitle>
            <DialogDescription>
              Fill in the details below to list your property
            </DialogDescription>
          </DialogHeader>
          <LandForm
            onSuccess={() => {
              setShowAddForm(false);
              router.refresh();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Land Dialog */}
      <Dialog open={!!editingLand} onOpenChange={() => setEditingLand(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Land Listing</DialogTitle>
            <DialogDescription>Update your property details</DialogDescription>
          </DialogHeader>
          {editingLand && (
            <LandForm
              land={editingLand}
              onSuccess={() => {
                setEditingLand(null);
                router.refresh();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingLandId} onOpenChange={() => setDeletingLandId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingLandId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
