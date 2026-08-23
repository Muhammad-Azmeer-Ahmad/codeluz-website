<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <div className="flex flex-col gap-2">
    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Full Name</label>
    <input
      name="name"
      type="text"
      className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300"
      placeholder="e.g. John Doe"
      required
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Work Email</label>
    <input
      name="email"
      type="email"
      className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300"
      placeholder="name@company.com"
      required
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Phone Number</label>
    <input
      name="phone"
      type="tel"
      className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300"
      placeholder="+1 234 567 8900"
      required
      pattern="^\+?[0-9\s\-\(\)]{7,20}$"
      title="Enter a valid phone number"
    />
  </div>
</div>