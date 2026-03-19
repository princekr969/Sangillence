function Animation() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/explora_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay so the logo stays crisp */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <img
          src="/explora_logo.png"
          alt="Explora"
          className="explora-logo-expand w-[min(78vw,680px)] select-none"
          draggable={false}
        />
      </div>
    </section>
  );
}

export default Animation;

