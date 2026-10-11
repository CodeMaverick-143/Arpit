import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/navigation";
import { stats } from "@/data/stats";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide OG card — branded, generated at build time. */
export default function OpenGraphImage() {
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
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -150,
          width: 600,
          height: 600,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -250,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          color: "#8a8a8a",
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#fafafa",
          }}
        />
        ~/arpitsarang
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a3a3a3",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {siteConfig.title}
        </div>
      </div>

      <div style={{ display: "flex", gap: 40, fontSize: 22, color: "#8a8a8a" }}>
        <span>{stats.projects}+ projects</span>
        <span>·</span>
        <span>Rust · Go · React · AI</span>
        <span>·</span>
        <span>{siteConfig.url.replace("https://", "")}</span>
      </div>
    </div>,
    size,
  );
}
