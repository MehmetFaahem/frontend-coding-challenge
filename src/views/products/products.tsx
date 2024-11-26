"use client";

import React, { useCallback } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useSearchParams, useRouter } from "next/navigation";

export const Products: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const productId = searchParams.get("productId");
  const selectedProduct = PRODUCTS_DATA.find((p) => p.id === productId) || null;

  const handleOpenModal = useCallback(
    (product: Product) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("productId", product.id);
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleCloseModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("productId");
    router.push(`/products?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
