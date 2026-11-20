
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-brown from-sky-50 via-white to-blue-100 flex items-center justify-center p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-6xl w-full">

        {/* Left Content */}
        <div className="flex flex-col justify-center gap-6">

          <span className="w-fit px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
            Your Personal Notes Space
          </span>

          <h1 className="text-6xl md:text-7xl text-blue-500 font-extrabold tracking-tight">
            Miniso<span className="text-slate-800">.</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 leading-snug">
            Capture your ideas anytime, anywhere.
          </h2>

          <p className="text-slate-500 leading-8 text-justify max-w-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quibusdam ex nisi earum necessitatibus, at delectus fugit
            saepe libero, officiis, perspiciatis debitis architecto
            accusamus quam quas placeat nihil dolorem a fuga.
          </p>

          <Link
            href="/login"
            className="w-fit flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 font-semibold hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition duration-300"
          >
            Start Now
            <span className="text-xl">→</span>
          </Link>

          <p className="text-sm text-slate-400 mt-2">
            Organize your thoughts. Keep your ideas alive.
          </p>

        </div>

        {/* Right Image */}
        <div className="flex justify-center relative">

          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

          <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 rotate-5 hover:rotate-0 transition duration-500">

            <Image
              src="/landing_image.webp"
              alt="Miniso notes application"
              width={500}
              height={400}
              priority
              className="rounded-2xl object-cover"
            />

            <div className="absolute -bottom-5 -left-5 bg-white shadow-lg rounded-xl p-4">
              <p className="text-sm font-bold text-slate-700">
                Your ideas, organized.
              </p>
              <p className="text-xs text-blue-500 mt-1">
                ✨ Create something today
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
