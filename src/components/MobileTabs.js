export default function MobileTabs({ openModal }) {
  return (
    <section className="mobile-tabs mobShow">
      <div className="container-fluid">
        <div className="tab-boxes">
          <a className="mobTab-link" href="https://api.whatsapp.com/send?phone=+919211586677&text=Hi I have a query" aria-label="Whatsapp icon">
            <img src="/icons/Whatsapp Icon.svg" alt="Whatsapp icon" loading="lazy" width={25} height={25} />
            <span>Whatsapp</span>
          </a>

          <a
            className="mobTab-link active bliker"
            href="#"
            aria-label="calender icon"
            onClick={e => { e.preventDefault(); openModal && openModal(); }}
          >
            <img src="/icons/date_icon.webp" alt="Make an appointment" loading="lazy" width={25} height={25} />
          </a>

          <a className="mobTab-link" href="tel:+919211586677" aria-label="phone icon">
            <img src="/icons/phone_ico.webp" alt="Phone icon" loading="lazy" width={25} height={25} />
            <span>Phone</span>
          </a>
        </div>
      </div>
    </section>
  );
}