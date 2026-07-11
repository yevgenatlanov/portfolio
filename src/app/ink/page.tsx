"use client";

import { HomePage } from "@/components/home/homePage";
import { InkAbsorptionEffect } from "@/components/ink/inkAbsorption";

export default function InkPage() {
  return (
    <InkAbsorptionEffect>
      <HomePage />
    </InkAbsorptionEffect>
  );
}
