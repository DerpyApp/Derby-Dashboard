export const PrivacyPolicy = () => {
  return (
    <div className="space-y-8 text-gray-300">
      <section>
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-[#C8F13A]">01</span>
          <span>Information Collection</span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-400 mb-3">
          When you use Derby Sports, we collect information that helps us provide a premium booking experience. The types of personal information we collect include:
        </p>
        <div className="space-y-2 text-sm text-gray-400 pl-4">
          <p><strong className="text-white">Contact Information:</strong> Your full name, email address, and phone number.</p>
          <p><strong className="text-white">Account Data:</strong> Credentials used to access the ecosystem.</p>
          <p><strong className="text-white">Transaction Data:</strong> Your booking history, preferred venues, and payment status (processed securely by third-party providers).</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-[#C8F13A]">02</span>
          <span>Use of Information</span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-400 mb-3">
          The data we collect is utilized strictly to elevate your athletic experience and ensure platform efficiency. We use your information to:
        </p>
        <div className="space-y-2 text-sm text-gray-400 pl-4">
          <p>Process and manage your venue reservations seamlessly.</p>
          <p>Communicate booking confirmations, cancellations, and real-time updates.</p>
          <p>Analyze usage patterns to improve platform design and service offerings.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-[#C8F13A]">03</span>
          <span>Data Protection</span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-400">
          We employ industry-standard security protocols to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All sensitive data exchanged between your device and our ecosystem is encrypted using Secure Socket Layer (SSL) technology and stored within secure, access-controlled environments.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-[#C8F13A]">04</span>
          <span>Third-Party Sharing</span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Derby Sports operates on a strict need-to-know basis. We do not sell your personal data. We only share necessary information with our trusted facility partners strictly for the purpose of booking fulfillment, venue access verification, and ensuring a smooth arrival experience at the pitch.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-[#C8F13A]">05</span>
          <span>User Rights</span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-400">
          You retain full control over your digital footprint within our ecosystem. You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, and request the permanent deletion of your account and associated data history, subject to legal retention requirements.
        </p>
      </section>
    </div>
  );
};
