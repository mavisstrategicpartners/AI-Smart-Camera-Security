import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const filter = searchParams.get("category") ?? "all";

  return (
    <>
      <Hero
        onShopClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
        onSolarClick={() => {
          setSearchParams({ category: "solar" });
          document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <TrustStrip />
      <ProductGrid filter={filter} onViewDetails={setSelectedSlug} />
      {selectedSlug && <ProductModal slug={selectedSlug} onClose={() => setSelectedSlug(null)} />}
    </>
  );
}
