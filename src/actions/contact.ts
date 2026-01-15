"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import { auth } from "@/lib/auth";
import ContactRequest, { IContactRequest } from "@/models/ContactRequest";
import Land from "@/models/Land";

export interface ContactFormData {
  landId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

import { ActionResult } from "@/types/actions";

function serializeContactRequest(request: IContactRequest) {
  return {
    _id: request._id.toString(),
    land: request.land.toString(),
    seller: request.seller.toString(),
    name: request.name,
    email: request.email,
    phone: request.phone,
    message: request.message,
    status: request.status,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
  };
}

export async function createContactRequest(
  data: ContactFormData
): Promise<ActionResult> {
  try {
    await connectDB();

    const land = await Land.findById(data.landId);
    if (!land) {
      return { success: false, message: "Land listing not found" };
    }

    await ContactRequest.create({
      land: data.landId,
      seller: land.owner,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Your inquiry has been sent to the seller!",
    };
  } catch (error) {
    console.error("Create contact request error:", error);
    return { success: false, message: "Failed to send inquiry" };
  }
}

export async function getContactRequests() {
  try {
    const session = await auth();
    if (!session?.user) {
      return [];
    }

    await connectDB();

    const requests = await ContactRequest.find({ seller: session.user.id })
      .populate("land", "title location")
      .sort({ createdAt: -1 })
      .lean();

    return requests.map((request) => ({
      ...serializeContactRequest(request as unknown as IContactRequest),
      land:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (request.land as any) === "object"
          ? {
              _id: request.land._id.toString(),
              title: (request.land as unknown as { title: string }).title,
              location: (request.land as unknown as { location: object }).location,
            }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          : (request.land as any).toString(),
    }));
  } catch (error) {
    console.error("Get contact requests error:", error);
    return [];
  }
}

export async function updateContactRequestStatus(
  requestId: string,
  status: "pending" | "read" | "responded"
): Promise<ActionResult> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "You must be logged in" };
    }

    await connectDB();

    const request = await ContactRequest.findById(requestId);
    if (!request) {
      return { success: false, message: "Request not found" };
    }

    if (request.seller.toString() !== session.user.id) {
      return { success: false, message: "Unauthorized" };
    }

    await ContactRequest.findByIdAndUpdate(requestId, { status });

    revalidatePath("/dashboard");

    return { success: true, message: "Status updated successfully" };
  } catch (error) {
    console.error("Update contact request status error:", error);
    return { success: false, message: "Failed to update status" };
  }
}
