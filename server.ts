import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const dataPackages = [
  { id: 1, label: "Ksh 5", amount: 5, type: "limited" },
  { id: 2, label: "Ksh 10", amount: 10, type: "limited" },
  { id: 3, label: "Ksh 15", amount: 15, type: "limited" },
  { id: 4, label: "Ksh 20", amount: 20, type: "unlimited" },
  { id: 5, label: "Ksh 25", amount: 25, type: "limited" },
  { id: 6, label: "Ksh 30", amount: 30, type: "unlimited" },
  { id: 7, label: "Ksh 50", amount: 50, type: "limited" },
  { id: 8, label: "Ksh 100", amount: 100, type: "unlimited" },
];

export default function AlphatechNetUserInterface() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const selectedPackage = dataPackages.find((pkg) => pkg.id === selected);
  const filteredPackages = dataPackages.filter((pkg) =>
    filter === "all" ? true : pkg.type === filter
  );
  const visiblePackages = showAll ? filteredPackages : filteredPackages.slice(0, 3);

  return (
    <div className="relative min-h-screen bg-gray-950 text-white py-10 px-4 flex flex-col items-center overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 bg-cyan-500 rounded-full opacity-10 animate-bounce-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="z-10 w-full max-w-md">
        {/* Welcome Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-cyan-400">
          Welcome to Alphatech Networks
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Introducing the fastest and most affordable data bundles in Kenya.
        </p>

        {/* Title */}
        <h1 className="text-xl font-semibold text-center mb-6">
          AlphaTech Net – Data Bundle Shop
        </h1>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-6">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(val) => {
              setFilter(val || "all");
              setShowAll(false); // reset view on filter change
            }}
            className="gap-4"
          >
            <ToggleGroupItem value="all" aria-label="All Packages">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="limited" aria-label="Limited Packages">
              Limited
            </ToggleGroupItem>
            <ToggleGroupItem value="unlimited" aria-label="Unlimited Packages">
              Unlimited
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Package Cards */}
        <div className="space-y-4">
          {visiblePackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`cursor-pointer hover:border-cyan-500 transition border ${
                selected === pkg.id
                  ? "border-cyan-500 bg-cyan-950"
                  : "border-gray-800"
              }`}
              onClick={() => setSelected(pkg.id)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{pkg.label}</p>
                  <Badge
                    variant={
                      pkg.type === "unlimited" ? "destructive" : "outline"
                    }
                    className="mt-1"
                  >
                    {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                  </Badge>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(pkg.id);
                    setOpenDialog(true);
                  }}
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {!showAll && filteredPackages.length > 3 && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              className="text-cyan-400 hover:underline"
              onClick={() => setShowAll(true)}
            >
              Load More Packages
            </Button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gray-900/90 backdrop-blur-lg border border-cyan-500/30 shadow-xl rounded-xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-cyan-300 text-xl">
              Confirm Purchase
            </DialogTitle>
          </DialogHeader>

          <div className="text-white mt-2">
            <p>You are about to purchase:</p>
            <div className="text-lg font-bold mt-2">
              {selectedPackage?.label} ({selectedPackage?.type})
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={() => {
                alert(`Purchased ${selectedPackage?.label} successfully!`);
                setOpenDialog(false);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
