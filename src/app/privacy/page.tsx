export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#050608] px-8 lg:px-12">
      <section className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-4xl font-extrabold text-white mb-8">
          Privacy Policy
        </h1>
        <div className="text-slate-400 leading-relaxed space-y-6 font-body">
          <p>Last updated: August 2026</p>

          <p>
            Codeluz ("we," "us," or "our") respects your privacy. This policy explains what information we collect through our website and how we use it.
          </p>

          <h2 className="text-white text-xl font-heading font-bold mt-8 mb-2">Information We Collect</h2>
          <p>
            When you submit a form on our website, we collect the information you provide — including your name, email address, phone number, and project details. We do not collect any information automatically beyond standard website analytics.
          </p>

          <h2 className="text-white text-xl font-heading font-bold mt-8 mb-2">How We Use Your Information</h2>
          <p>
            We use the information you submit solely to respond to your inquiry, discuss your project, and provide our services. We do not sell, rent, or share your information with third parties for marketing purposes.
          </p>

          <h2 className="text-white text-xl font-heading font-bold mt-8 mb-2">Data Storage</h2>
          <p>
            Form submissions are sent directly to our email and are not stored in any external database beyond standard email hosting.
          </p>

          <h2 className="text-white text-xl font-heading font-bold mt-8 mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at contact@codeluz.com.
          </p>
        </div>
      </section>
    </div>
  );
}