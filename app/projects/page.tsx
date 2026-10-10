import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import ProjectsExplorer from "./ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of projects spanning AI, systems engineering, full-stack development, and developer tools.",
};

export default function ProjectsPage() {
  return (
    <div className="noise">
      <section className="section">
        <div className="container-wide">
          <SectionHeading
            label="Portfolio"
            title="Selected Projects"
            description="A curated collection of projects spanning AI, systems engineering, full-stack development, and developer tools."
          />
          {/* useSearchParams needs a Suspense boundary for static rendering */}
          <Suspense fallback={<ExplorerSkeleton />}>
            <ProjectsExplorer />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function ExplorerSkeleton() {
  return (
    <div aria-hidden>
      <div className="flex gap-2 mb-14">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-[420px] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
