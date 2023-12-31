"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";

import { Product } from "@/types";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { IconButton } from "@/components/ui/icon-button";
import { Currency } from "@/components/ui/currency";

interface ProductCardProps {
    data: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const priviewModal = usePreviewModal();
    const router = useRouter();
    const cart = useCart();
    const handleClick = () => {
        router.push(`/product/${data.id}`);
    };
    const onPriview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        priviewModal.onOpen(data);
    };
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(data);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
        >
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0].url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPriview}
                            icon={<Expand size={20} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="font-semibold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">{data.category?.name}</p>
            </div>
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    );
};
