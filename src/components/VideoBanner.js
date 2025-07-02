export default function VideoBanner() {
  return (
    <section className="video-banner">
      <video
        id="banner_video"
        preload="metadata"
        muted
        loop
        playsInline
        poster="/img/Banner Image.jpg"
        autoPlay
      >
        <source src="/videos/Banner-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
} 