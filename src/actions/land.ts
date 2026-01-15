"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import { auth } from "@/lib/auth";
import Land, { ILand } from "@/models/Land";

export interface LandFormData {
  title: string;
  description: string;
  price: number;
  area: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landType: "residential" | "commercial" | "agricultural" | "industrial";
  features: string[];
  images: string[];
}

import { ActionResult } from "@/types/actions";

export interface LandFilters {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  landType?: string;
  search?: string;
}

function serializeLand(land: ILand) {
  return {
    _id: land._id.toString(),
    title: land.title,
    description: land.description,
    price: land.price,
    area: land.area,
    location: land.location,
    images: land.images,
    landType: land.landType,
    features: land.features,
    owner: land.owner.toString(),
    isFeatured: land.isFeatured,
    isActive: land.isActive,
    createdAt: land.createdAt.toISOString(),
    updatedAt: land.updatedAt.toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleMongooseError(error: any): { message: string; errors?: Record<string, string> } {
  console.error("Land action error:", error);

  if (error.name === "ValidationError") {
    const errors: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
      // Also map nested location fields to top-level keys for the form
      if (key.startsWith("location.")) {
        const field = key.split(".")[1];
        errors[field] = error.errors[key].message;
      }
    });
    return { message: "Validation failed", errors };
  }

  return { message: error.message || "Something went wrong" };
}

export async function createLand(data: LandFormData): Promise<ActionResult> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "You must be logged in" };
    }

    await connectDB();

    const land = await Land.create({
      title: data.title,
      description: data.description,
      price: data.price,
      area: data.area,
      location: {
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
      landType: data.landType,
      features: data.features,
      images: data.images,
      owner: session.user.id,
    });

    revalidatePath("/dashboard");
    revalidatePath("/explore");
    revalidatePath("/");

    return {
      success: true,
      message: "Land listing created successfully!",
      data: { id: land._id.toString() },
    };
  } catch (error) {
    const { message, errors } = handleMongooseError(error);
    return { success: false, message, errors };
  }
}

export async function updateLand(
  landId: string,
  data: Partial<LandFormData>
): Promise<ActionResult> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "You must be logged in" };
    }

    await connectDB();

    const land = await Land.findById(landId);
    if (!land) {
      return { success: false, message: "Land not found" };
    }

    if (land.owner.toString() !== session.user.id) {
      return { success: false, message: "Unauthorized" };
    }

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.price) updateData.price = data.price;
    if (data.area) updateData.area = data.area;
    if (data.landType) updateData.landType = data.landType;
    if (data.features) updateData.features = data.features;
    if (data.images) updateData.images = data.images;
    if (data.address || data.city || data.state || data.pincode) {
      updateData.location = {
        address: data.address || land.location.address,
        city: data.city || land.location.city,
        state: data.state || land.location.state,
        pincode: data.pincode || land.location.pincode,
      };
    }

    await Land.findByIdAndUpdate(landId, updateData, { runValidators: true });

    revalidatePath("/dashboard");
    revalidatePath("/explore");
    revalidatePath(`/land/${landId}`);
    revalidatePath("/");

    return { success: true, message: "Land listing updated successfully!" };
  } catch (error) {
    const { message, errors } = handleMongooseError(error);
    return { success: false, message, errors };
  }
}

export async function deleteLand(landId: string): Promise<ActionResult> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "You must be logged in" };
    }

    await connectDB();

    const land = await Land.findById(landId);
    if (!land) {
      return { success: false, message: "Land not found" };
    }

    if (land.owner.toString() !== session.user.id) {
      return { success: false, message: "Unauthorized" };
    }

    await Land.findByIdAndDelete(landId);

    revalidatePath("/dashboard");
    revalidatePath("/explore");
    revalidatePath("/");

    return { success: true, message: "Land listing deleted successfully!" };
  } catch (error) {
    console.error("Delete land error:", error);
    return { success: false, message: "Failed to delete listing" };
  }
}

export async function getLands(filters: LandFilters = {}) {
  try {
    await connectDB();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isActive: true };

    if (filters.city) {
      query["location.city"] = { $regex: filters.city, $options: "i" };
    }
    if (filters.state) {
      query["location.state"] = { $regex: filters.state, $options: "i" };
    }
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }
    if (filters.minArea || filters.maxArea) {
      query.area = {};
      if (filters.minArea) query.area.$gte = filters.minArea;
      if (filters.maxArea) query.area.$lte = filters.maxArea;
    }
    if (filters.landType) {
      query.landType = filters.landType;
    }
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
        { "location.city": { $regex: filters.search, $options: "i" } },
      ];
    }

    const lands = await Land.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return lands.map((land) => serializeLand(land as unknown as ILand));
  } catch (error) {
    console.error("Get lands error:", error);
    return [];
  }
}

export async function getFeaturedLands() {
  try {
    await connectDB();

    const lands = await Land.find({ isActive: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    if (lands.length < 6) {
      const additionalLands = await Land.find({
        isActive: true,
        _id: { $nin: lands.map((l) => l._id) },
      })
        .sort({ createdAt: -1 })
        .limit(6 - lands.length)
        .lean();

      return [...lands, ...additionalLands].map((land) =>
        serializeLand(land as unknown as ILand)
      );
    }

    return lands.map((land) => serializeLand(land as unknown as ILand));
  } catch (error) {
    console.error("Get featured lands error:", error);
    return [];
  }
}

export async function getLandById(landId: string) {
  try {
    await connectDB();

    const land = await Land.findById(landId).populate("owner", "name email phone");
    if (!land) {
      return null;
    }

    return {
      ...serializeLand(land),
      owner: {
        _id: land.owner._id.toString(),
        name: (land.owner as unknown as { name: string }).name,
        email: (land.owner as unknown as { email: string }).email,
        phone: (land.owner as unknown as { phone?: string }).phone,
      },
    };
  } catch (error) {
    console.error("Get land by id error:", error);
    return null;
  }
}

export async function getUserLands() {
  try {
    const session = await auth();
    if (!session?.user) {
      return [];
    }

    await connectDB();

    const lands = await Land.find({ owner: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return lands.map((land) => serializeLand(land as unknown as ILand));
  } catch (error) {
    console.error("Get user lands error:", error);
    return [];
  }
}
