import React from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FeatureTiles from "@/components/FeatureTiles";
import CollectionsCarousel from "@/components/CollectionsCarousel";
import OccasionsSection from "@/components/OccasionsSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import PopularCardsSection from "@/components/PopularCardsSection";
import ServiceFeatures from "@/components/ServiceFeatures";
import OtherPopularCategories from "@/components/OtherPopularCategories";
import SatisfactionSection from "@/components/SatisfactionSection";
import CustomerReviews from "@/components/CustomerReviews";
import FAQSection from "@/components/FAQSection";
import AboutShopSection from "@/components/AboutShopSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <HeroSection />
        <FeatureTiles />
        <CollectionsCarousel />
        <OccasionsSection />
        <BrandsCarousel />
        <PopularCardsSection />
      </div>
      <ServiceFeatures />
      <OtherPopularCategories />
      <SatisfactionSection />
      <CustomerReviews />
      <FAQSection />
      <AboutShopSection />
      <NewsletterSection />
    </main>
  );
}
