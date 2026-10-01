import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/constants";

export const runtime = "edge";
export const alt = BRAND.name;
export const size = { width: 1200, height: 630 };

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #04060d 0%, #0f172a 50%, #042f2e 100%)",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.7, textTransform: "uppercase" }}>
          Premium research
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16 }}>{BRAND.name}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#0778d6" }}>
          Premium ecommerce · {BRAND.market}
        </div>
      </div>
    ),
    { ...size },
  );
}
