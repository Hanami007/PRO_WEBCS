"use client";

import { useBuildings } from "@/features/buildings/api/get-buildings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

const FacilitiesSections = () => {
  const { data: buildingsData, isLoading: isBuildingsLoading } = useBuildings({
    limit: 100,
  });

  if (isBuildingsLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const buildings = (buildingsData?.data || []).sort((a, b) => {
    const isAMaejo =
      a.name.toLowerCase().includes("maejo") || a.name.includes("60");
    const isBMaejo =
      b.name.toLowerCase().includes("maejo") || b.name.includes("60");

    if (isAMaejo && !isBMaejo) return -1;
    if (!isAMaejo && isBMaejo) return 1;
    return 0;
  });

  const getImageUrl = (item: { image?: { url: string } }) => {
    const imagePath = item.image?.url;
    return imagePath
      ? imagePath.startsWith("http")
        ? imagePath
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}${imagePath}`
      : null;
  };

  if (buildings.length === 0) {
    return (
      <div className="text-center py-10">
        No facilities information available.
      </div>
    );
  }

  return (
    <Tabs defaultValue={buildings[0]?.id} className="w-full">
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
        <TabsList>
          {buildings.map((building) => (
            <TabsTrigger
              key={building.id}
              value={building.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
            >
              {building.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {buildings.map((building) => {
        const buildingImage = getImageUrl(building);

        return (
          <TabsContent
            key={building.id}
            value={building.id}
            className="space-y-8 animate-fadeIn"
          >
            <div className="max-w-384 mx-auto">
              <div className="h-80 bg-cover bg-center rounded-lg overflow-hidden relative shadow-xl">
                {buildingImage && (
                  <Image
                    src={buildingImage}
                    alt={building.name}
                    fill
                    className="object-cover opacity-60"
                  />
                )}
                <div className="absolute inset-0 " />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4 z-10">
                    <h2 className="text-4xl font-bold mb-4 drop-shadow-md">
                      {building.name}
                    </h2>
                    <p className="text-lg opacity-90 drop-shadow-sm">
                      Modern learning facilities for Computer Science students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default FacilitiesSections;
