function Animation() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <video
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        src="/explora_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* dark overlay so text stays readable */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,9,26,0.62)" }} />
    </div>
  );
}
export default Animation;
