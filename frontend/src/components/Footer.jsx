function Footer() {
  return (
    <footer className="bg-[#f5f2ec] py-10 sm:py-12 lg:py-14 text-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-4">
        <div>
          <h3 className="mb-3 text-base font-semibold">Dhaneshwari</h3>

          <p className="text-gray-600">
            Premium boutique stays in Varanasi for guests who value comfort,
            warmth, and memorable experiences.
          </p>

          <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
            <a
              href="#"
              aria-label="Visit us on X"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-medium shadow-sm hover:border-gray-400"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M18.25 4H15.8l-3.03 4.14L9.59 4H5.75l4.84 6.93L5.5 20h2.45l3.21-4.39L14.8 20h3.84l-5.06-7.25L18.25 4Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Visit us on Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold shadow-sm hover:border-gray-400"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  className="fill-none stroke-current"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  className="fill-none stroke-current"
                />
                <circle cx="17" cy="7" r="1.2" className="fill-current" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Visit us on YouTube"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold shadow-sm hover:border-gray-400"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M20.5 7.2c-.2-.8-.8-1.5-1.6-1.7C17.3 5 12 5 12 5s-5.3 0-6.9.5c-.8.2-1.4.9-1.6 1.7C3 8.8 3 11.5 3 11.5s0 2.7.5 4.3c.2.8.8 1.5 1.6 1.7C6.7 18 12 18 12 18s5.3 0 6.9-.5c.8-.2 1.4-.9 1.6-1.7.5-1.6.5-4.3.5-4.3s0-2.7-.5-4.3Z" />
                <path d="M10 9.25v4.5L14.5 11 10 9.25Z" className="fill-white" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Visit us on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold shadow-sm hover:border-gray-400"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M5.5 4.5A2.25 2.25 0 1 0 5.5 9a2.25 2.25 0 0 0 0-4.5ZM4 10.25h3v9.25H4V10.25ZM10 10.25h2.9v1.26h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.63v4.92h-3v-4.37c0-1.04-.02-2.38-1.45-2.38-1.45 0-1.67 1.13-1.67 2.3v4.45h-3v-9.25Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-base font-semibold">Quick Links</h4>

          <ul className="space-y-2 text-gray-600">
            <li>About Us</li>
            <li>Gallery</li>
            <li>Explore Services</li>
            <li>Diagramming</li>
            <li>Our Team</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-base font-semibold">Services</h4>

          <ul className="space-y-2 text-gray-600">
            <li>Design</li>
            <li>Prototyping</li>
            <li>Development features</li>
            <li>Design systems</li>
            <li>Collaboration features</li>
            <li>Design process</li>
            <li>FigJam</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-base font-semibold">Resources</h4>

          <ul className="space-y-2 text-gray-600">
            <li>Blog</li>
            <li>Best practices</li>
            <li>Colors</li>
            <li>Support</li>
            <li>Developers</li>
            <li>Resource library</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
