'use client'
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function BudgetSlider() {
    // Manage the "from" and "to" values for the range
    const [budgetRange, setBudgetRange] = useState([1000, 5000]); // Default values
  
    return (
      <div className="w-[300px]">
        <span>Budget: ${budgetRange[0]} - ${budgetRange[1]}</span>
        <Slider
          min={500}
          max={10000}
          step={500}
          value={budgetRange}  // Pass both values as an array
          onValueChange={(value) => setBudgetRange(value)}  // Update both values
        />
      </div>
    );
  }