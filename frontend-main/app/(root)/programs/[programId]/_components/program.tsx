"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { useProgram } from "@/features/programs/api/get-program";
import ProgramView from "@/features/programs/components/public/program-view";

const Program = ({ programId }: { programId: string }) => {
  const program = useProgram({ programId });

  return (
    <ContentLayout
      title={program.data?.nameEn || "Loading..."}
      description={program.data?.nameTh}
      align="center"
    >
      <ProgramView programId={programId} />
    </ContentLayout>
  );
};

export default Program;
