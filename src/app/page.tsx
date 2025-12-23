"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { categories, getPackagesByCategory, type Package } from "@/data/packages";

const bannerSlides = [
  {
    title: "Open-Source Quantum Many-Body Physics",
    subtitle: "High-quality software tools for researchers and students",
    gradient: "from-blue-600 to-purple-600"
  },
  {
    title: "Exact Diagonalization Solutions",
    subtitle: "Precise numerical methods for quantum systems",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    title: "Tensor Network Methods",
    subtitle: "Efficient representations of quantum states",
    gradient: "from-pink-600 to-red-600"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ManyBodyLab
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Open-source software for quantum many-body physics
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                href="/"
                className="text-sm sm:text-base text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/people"
                className="text-sm sm:text-base text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                People
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Rotating Banner */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center`}>
              <div className="text-center px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Banner Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-6 sm:w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* About Section */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About ManyBodyLab</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-base sm:text-lg mb-4">
                ManyBodyLab is a collaborative organization dedicated to developing
                high-quality, open-source software tools for quantum many-body physics research.
                Our mission is to provide researchers and students with accessible, reliable,
                and efficient computational tools for studying complex quantum systems.
              </p>
            </div>
          </div>
        </section>

        {/* Category-based Package Sections */}
        {categories.map((category) => {
          const categoryPackages = getPackagesByCategory(category.name);
          
          return (
            <section key={category.name} className="mb-12 sm:mb-16">
              {/* Category Header - Desktop: side by side, Mobile: stacked */}
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="lg:w-1/3 flex-shrink-0">
                  <div className="sticky top-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-6 sm:p-8">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{category.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{category.name}</h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Horizontal Scrollable Packages */}
                <div className="lg:w-2/3 flex-grow">
                  <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex gap-4 sm:gap-6" style={{ minWidth: "min-content" }}>
                      {categoryPackages.map((pkg) => (
                        <PackageCard key={pkg.name} package={pkg} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center md:text-left">
              © 2024 ManyBodyLab - Open-source quantum many-body physics software
            </p>
            <a
              href="https://github.com/ManyBodyLab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Visit us on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PackageCard({ package: pkg }: { package: Package }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all bg-white dark:bg-gray-900 hover:scale-105">
      <div className="mb-4">
        <h4 className="text-lg sm:text-xl font-semibold mb-2">{pkg.name}</h4>
        <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
          {pkg.language}
        </span>
      </div>
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
        {pkg.description}
      </p>
      <div className="flex flex-col gap-2 sm:gap-3">
        <a
          href={pkg.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href={pkg.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base"
        >
          Documentation
        </a>
      </div>
    </div>
  );
}
