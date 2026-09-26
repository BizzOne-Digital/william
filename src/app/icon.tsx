import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04060d",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 18,
            height: 22,
            background: "linear-gradient(180deg, #22d3ee, #8b5cf6)",
            borderRadius: "999px 999px 40% 40%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
