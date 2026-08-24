import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <section className="bg-[#111418] px-4 py-14 text-[#f2f4f7] sm:px-6 lg:py-16">
      <div className="mx-auto max-w-[1340px]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-normal text-[#f5f7fb] sm:text-6xl">
            Get in Touch
          </h1>
          <p className="text-base leading-7 text-[#c7c7b8] sm:text-lg">
            Whether you're an athlete looking to book a pitch or a venue owner
            wanting to join the ecosystem, our team is here to support you with
            elite efficiency.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-[#1a1e24] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
          >
            <h2 className="mb-7 text-2xl font-bold text-[#f2f4f7]">
              Send a Message
            </h2>
            {submitted && (
              <p className="-mt-4 mb-6 text-sm font-semibold text-[#b6ff00]">
                Message sent. Our team will get back to you soon.
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#d7d5bd]">
                  Full Name
                </span>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(event) =>
                    handleChange("fullName", event.target.value)
                  }
                  placeholder="Enter your name"
                  required
                  className="h-14 rounded-lg border border-[#4b5539] bg-[#101318] px-4 text-sm text-white outline-none transition placeholder:text-[#757d89] focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#d7d5bd]">
                  Email Address
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="Enter your email"
                  required
                  className="h-14 rounded-lg border border-[#4b5539] bg-[#101318] px-4 text-sm text-white outline-none transition placeholder:text-[#757d89] focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20"
                />
              </label>
            </div>

            <label className="mt-6 flex flex-col gap-2">
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#d7d5bd]">
                Subject
              </span>
              <input
                type="text"
                value={formData.subject}
                onChange={(event) =>
                  handleChange("subject", event.target.value)
                }
                placeholder="How can we help?"
                required
                className="h-14 rounded-lg border border-[#4b5539] bg-[#101318] px-4 text-sm text-white outline-none transition placeholder:text-[#757d89] focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20"
              />
            </label>

            <label className="mt-6 flex flex-col gap-2">
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#d7d5bd]">
                Message
              </span>
              <textarea
                value={formData.message}
                onChange={(event) =>
                  handleChange("message", event.target.value)
                }
                placeholder="Write your message here..."
                rows={7}
                required
                className="resize-none rounded-lg border border-[#4b5539] bg-[#101318] px-4 py-4 text-sm text-white outline-none transition placeholder:text-[#757d89] focus:border-[#b6ff00] focus:ring-2 focus:ring-[#b6ff00]/20"
              />
            </label>

            <button
              type="submit"
              className="mt-8 inline-flex h-16 items-center gap-2 rounded-full bg-[#b6ff00] px-9 text-sm font-extrabold text-black shadow-[0_0_26px_rgba(182,255,0,0.35)] transition hover:bg-[#c8ff38]"
            >
              Send Message <Send size={16} />
            </button>
          </form>

          <aside className="space-y-5">
            <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#1a1e24] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#101318] text-[#d7d5bd]">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#d7d5bd]">
                  Email Support
                </p>
                <a
                  href="mailto:support@derbysports.com"
                  className="mt-1 block text-base text-white transition hover:text-[#b6ff00]"
                >
                  support@derbysports.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#1a1e24] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#101318] text-[#d7d5bd]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#d7d5bd]">
                  HQ Office
                </p>
                <p className="mt-1 text-base text-white">Cairo, Egypt</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
