export const TermsOfService = () => {
  return (
    <div className="space-y-8 text-gray-300">
      <section>
        <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Welcome to Derby Sports. These terms govern your use of our website and services. By using our platform, you agree to these terms.
        </p>
        <p className="text-sm leading-relaxed text-gray-400 mt-3">
          If you do not agree, please discontinue use.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">2. User Obligations</h2>
        <div className="space-y-2 text-sm text-gray-400 pl-4">
          <p>You must provide accurate information during registration.</p>
          <p>You are responsible for the confidentiality of your account and password.</p>
          <p>Unauthorized or illegal use of the platform is strictly prohibited.</p>
          <p>You must respect the rules of each sports facility booked through us.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">3. Booking & Cancellation</h2>
        <p className="text-sm leading-relaxed text-gray-400 mb-3">
          All bookings are subject to facility availability. Cancellation policy:
        </p>
        <div className="space-y-2 text-sm text-gray-400 pl-4">
          <p>Full refund if cancelled 24 hours before the appointment.</p>
          <p>50% refund if cancelled between 12 and 24 hours.</p>
          <p>No refund if cancelled less than 12 hours before.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">4. Data Collection & Privacy</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          We take your privacy seriously. We collect basic contact info (name, email, phone), booking history, and payment info (processed through secure gateways, not stored directly).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">5. Security</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          We use latest encryption to protect your data. While no system is 100% secure, we strive for maximum protection.
        </p>
      </section>
    </div>
  );
};
