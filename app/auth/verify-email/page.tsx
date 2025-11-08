import Image from "next/image"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#0f1419] relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image src="/flora-scans-logo.png" alt="Flora Scans" width={100} height={100} />
        </div>

        <div className="mb-8">
          <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto" fill="none">
            <circle cx="40" cy="40" r="35" stroke="#06B6D4" strokeWidth="3" />
            <path
              d="M25 40L35 50L55 30"
              stroke="#06B6D4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
        <p className="text-gray-400 mb-8">
          We've sent you a verification link. Please check your email and click the link to verify your account.
        </p>
        <a href="/" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          Back to Login
        </a>
      </div>
    </div>
  )
}
