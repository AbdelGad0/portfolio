import { ImageResponse } from "next/og";

export const alt = "Abdelrahman Ahmed — ML & Data Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>Abdelrahman Ahmed</div>
        <div style={{ fontSize: 32, marginTop: 16, opacity: 0.9 }}>
          ML &amp; Data Analyst
        </div>
      </div>
    ),
    size
  );
}
