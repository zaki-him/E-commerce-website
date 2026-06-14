"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[\d\s\-().+]+$/, "Enter a valid phone number"),
  location: z.string().min(1, "Location is required"),
});

type OrderData = z.infer<typeof orderSchema>;

const ORDERS_KEY = "ecommerce_orders";

function InputField({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className={`block w-full rounded-sm border py-3 px-3 sm:text-[11px] shadow-sm focus:outline-none focus:ring-zinc-900 ${
          error
            ? "border-red-600 focus:border-red-600"
            : "border-zinc-200 focus:border-zinc-900"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function OrderPage() {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [lastOrder, setLastOrder] = useState<{
    id: string;
    data: OrderData;
    items: { name: string; price: number; quantity: number }[];
    total: number;
  } | null>(null);

  const form = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = (data: OrderData) => {
    const order = {
      id: crypto.randomUUID(),
      data,
      items: items.map((i) => ({
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      stored.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(stored));
    } catch {
      /* empty */
    }

    setLastOrder(order);
    clearCart();
    setSubmitted(true);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <ShoppingBag className="h-10 w-10 text-zinc-300" />
          <p className="text-sm text-zinc-400">Your cart is empty</p>
          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-zinc-500 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (submitted && lastOrder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-serif italic text-zinc-900 mb-2">
          Order placed
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Thank you, {lastOrder.data.name}. We will contact you at{" "}
          {lastOrder.data.phone} to confirm your order.
        </p>

        <div className="bg-zinc-50 border border-zinc-100 rounded-sm p-6 text-left mb-8 max-w-md mx-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">
            Order Summary
          </h3>
          <div className="space-y-3">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-zinc-600">
                  {item.name}{" "}
                  <span className="text-zinc-400">x{item.quantity}</span>
                </span>
                <span className="font-mono text-zinc-900">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-200 mt-4 pt-4 flex justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-900">
              Total
            </span>
            <span className="text-sm font-mono text-zinc-900">
              ${lastOrder.total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-zinc-50 border border-zinc-100 rounded-sm p-6 text-left mb-8 max-w-md mx-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3">
            Delivery Details
          </h3>
          <div className="text-sm text-zinc-600 space-y-1">
            <p>{lastOrder.data.name}</p>
            <p>{lastOrder.data.phone}</p>
            <p className="text-zinc-500">{lastOrder.data.location}</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-zinc-900 px-8 py-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-sm"
        >
          Return to Shop
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl font-serif italic text-zinc-900 mb-2">Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
        <div className="lg:col-span-2">
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white px-8 py-10 rounded-sm border border-zinc-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold uppercase tracking-wider text-zinc-900 mb-8">
              Details
            </h2>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <InputField
                label="Name"
                placeholder="Your name"
                {...form.register("name")}
                error={form.formState.errors.name?.message}
              />
              <InputField
                label="Phone"
                type="tel"
                placeholder="+1 555-000-0000"
                {...form.register("phone")}
                error={form.formState.errors.phone?.message}
              />
              <InputField
                label="Location"
                placeholder="City, area, delivery address"
                {...form.register("location")}
                error={form.formState.errors.location?.message}
              />
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-zinc-900 px-8 py-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-black transition-colors rounded-sm cursor-pointer"
                >
                  Place Order — ${cartTotal.toLocaleString()}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-white/80 border border-white/50 shadow-2xl rounded-sm p-6 sticky top-24 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Cart ({cartCount})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="h-14 w-14 shrink-0 bg-zinc-50 border border-zinc-100 rounded-sm overflow-hidden relative">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Qty {item.quantity}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500">
                      ${item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-100 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">Subtotal</span>
                <span className="text-[10px] font-mono text-zinc-900">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">Delivery</span>
                <span className="text-[10px] font-mono text-green-600">
                  Free
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-900">
                  Total
                </span>
                <span className="text-xs font-mono text-zinc-900">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
