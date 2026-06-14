"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createOrder(data: {
  name: string;
  phone: string;
  location: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
}) {
  const order = await prisma.order.create({
    data: {
      name: data.name,
      phone: data.phone,
      location: data.location,
      total: data.total,
      status: "pending",
      items: {
        create: data.items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  return {
    id: order.id,
    data: { name: order.name, phone: order.phone, location: order.location },
    items: order.items.map((i) => ({
      name: i.name,
      price: Number(i.price),
      quantity: i.quantity,
    })),
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
  };
}

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  revalidatePath("/admin/orders");
}

export async function deleteOrder(orderId: string) {
  await prisma.order.delete({ where: { id: orderId } });
  revalidatePath("/admin/orders");
}
