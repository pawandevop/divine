import CallButton from '@/components/CallButton';

export default function SocialButtons() {
  return (
    <div>
      {/* WhatsApp Button */}
      <button className="whatsapp" type="button" title="Whatsapp icon">
        <a href="https://api.whatsapp.com/send?phone=+919211586677&text=Hi I have a query" target="_blank" rel="noopener noreferrer">
          <img src="/icons/Whatsapp Icon.svg" alt="Whatsapp icon" width={45} height={45} />
        </a>
      </button>

      {/* Facebook Button */}
      <button className="facebook" type="button" title="Facebook icon" target="_blank" rel="noopener noreferrer">
        <a href="#" aria-label="facebook icon">
          <img src="/icons/facebook icon.png" alt="Facebook icon" width={45} height={45} />
        </a>
      </button>

      {/* Instagram Button */}
      <button className="instagram" type="button" title="instagram icon">
        <a href="https://www.instagram.com/divineelitewellnesclinic?igsh=MWhkOGdhaTRjaWYwZw==" aria-label="instagram icon" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram icon.png" alt="Instagram icon" width={45} height={45} />
        </a>
      </button>

      {/* Right Call Button */}
      <CallButton />
    </div>
  );
} 