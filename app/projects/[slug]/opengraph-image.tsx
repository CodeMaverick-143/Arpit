import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/navigation";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Per-project OG card: title, category and stack on a branded background. */
export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "";
  const category = project?.category.join(" · ") ?? "";
  const tech = project?.tech.slice(0, 5) ?? [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#050505",
        color: "#fafafa",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -220,
          left: -120,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 65%)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: "#8a8a8a",
        }}
      >
        <span>{siteConfig.name} · Case Study</span>
        <span
          style={{ textTransform: "uppercase", letterSpacing: 4, fontSize: 18 }}
        >
          {category}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#a3a3a3",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          {tagline}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {tech.map((t) => (
          <span
            key={t}
            style={{
              padding: "10px 18px",
              borderRadius: 9999,
              border: "1px solid #262626",
              background: "#111111",
              fontSize: 20,
              color: "#d4d4d4",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>,
    size,
  );
}
