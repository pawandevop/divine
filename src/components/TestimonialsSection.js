export default function TestimonialsSection() {
  return (
    <section className="testimonials_sec">
      <div className="container">
        <div className="common_heading">Reviews from <span> our Top clients</span></div>

        <div className="row pt-3 for_scroll g-3">
          <div className="col-lg-4 col-sm-12 col-sm-12 w_90">
            <div className="testimonials_card">
              <div className="rating">
                {[...Array(4)].map((_, i) => (
                  <span key={i}><img src="/img/Google-Stars.png" alt="Google Rating" loading="lazy" width={19} height={19} /></span>
                ))}
              </div>

              <p>I had an amazing experience at Divine Elite Wellness! The staff was friendly and highly knowledgeable, making me feel comfortable throughout my treatment. They listened to my concerns and provided excellent, personalized care. I am thrilled with the results and can&apos;t wait to return! Highly recommend!</p>

              <div className="auther_content">
                <div className="by_ico">
                  <img src="/img/Google-User.png" alt="Google" loading="lazy" width={35} height={35} />
                </div>

                <div className="by_name">Shivika Goel</div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 col-sm-12 w_90">
            <div className="testimonials_card">
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><img src="/img/Google-Stars.png" alt="Google Rating" loading="lazy" width={19} height={19} /></span>
                ))}
              </div>

              <p>It was a great experience having my beard shaping sessions from this clinic, they have a best machine for this totally loved it.</p>

              <div className="auther_content">
                <div className="by_ico">
                  <img src="/img/Google-User.png" alt="Google" loading="lazy" width={35} height={35} />
                </div>
                <div className="by_name">Jatin Tiwari</div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 col-sm-12 w_90">
            <div className="testimonials_card">
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><img src="/img/Google-Stars.png" alt="Google Rating" loading="lazy" width={19} height={19} /></span>
                ))}
              </div>
              <p>I have got a Hifu for loose sagging skin on face and neck but was very truely satisfied with the result &hellip;. But the hifu treatment and it worked like magic !!divineelitewellness is amazing.</p>

              <div className="auther_content">
                <div className="by_ico">
                  <img src="/img/Google-User.png" alt="Google" loading="lazy" width={35} height={35} />
                </div>
                <div className="by_name">Shubham Talpade</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
} 