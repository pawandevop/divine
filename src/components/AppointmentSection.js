export default function AppointmentSection({ openModal }) {
  return (
    <section className="common_callback_btn">
      <div className="container">
        <div className="callback_btn_cta text-center">
          <a href="#" id="home-button" onClick={e => { e.preventDefault(); openModal && openModal(); }}>
            Make an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}