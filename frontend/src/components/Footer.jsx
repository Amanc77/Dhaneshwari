import React from 'react';
import { Helmet } from 'react-helmet-async';

function Footer() {
  const currentYear = new Date().getFullYear();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Dhaneshwari Hotel",
    "description": "Premium boutique stays in Varanasi for guests who value comfort, warmth, and memorable experiences.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "url": "https://yourwebsite.com",
    "sameAs": [
      "https://twitter.com/dhaneshwari",
      "https://www.instagram.com/dhaneshwari",
      "https://www.youtube.com/@dhaneshwari",
      "https://www.linkedin.com/company/dhaneshwari"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yourwebsite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://yourwebsite.com/about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Services",
        "item": "https://yourwebsite.com/services"
      }
    ]
  };

  const handleSocialClick = (platform, url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log(`Social link clicked: ${platform}`);
  };

  const handleNavClick = (linkName) => {
    console.log(`Navigation clicked: ${linkName}`);
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://yourwebsite.com" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <footer className="bg-[#f5f2ec] py-10 sm:py-12 lg:py-14 text-sm" itemScope itemType="https://schema.org/Hotel">
        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-4">
          <div>
            <h3 className="mb-3 text-base font-semibold" itemProp="name">Dhaneshwari</h3>

            <p className="text-gray-600" itemProp="description">
              Premium boutique stays in Varanasi for guests who value comfort,
              warmth, and memorable experiences.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
              <button
                onClick={() => handleSocialClick('X', 'https://twitter.com/dhaneshwari')}
                aria-label="Follow us on X"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-medium shadow-sm hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M18.25 4H15.8l-3.03 4.14L9.59 4H5.75l4.84 6.93L5.5 20h2.45l3.21-4.39L14.8 20h3.84l-5.06-7.25L18.25 4Z" />
                </svg>
              </button>
              <button
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/dhaneshwari')}
                aria-label="Follow us on Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold shadow-sm hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
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
              </button>
              <button
                onClick={() => handleSocialClick('YouTube', 'https://www.youtube.com/@dhaneshwari')}
                aria-label="Subscribe to our YouTube channel"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold shadow-sm hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M20.5 7.2c-.2-.8-.8-1.5-1.6-1.7C17.3 5 12 5 12 5s-5.3 0-6.9.5c-.8.2-1.4.9-1.6 1.7C3 8.8 3 11.5 3 11.5s0 2.7.5 4.3c.2.8.8 1.5 1.6 1.7C6.7 18 12 18 12 18s5.3 0 6.9-.5c.8-.2 1.4-.9 1.6-1.7.5-1.6.5-4.3.5-4.3s0-2.7-.5-4.3Z" />
                  <path d="M10 9.25v4.5L14.5 11 10 9.25Z" className="fill-white" />
                </svg>
              </button>
              <button
                onClick={() => handleSocialClick('LinkedIn', 'https://www.linkedin.com/company/dhaneshwari')}
                aria-label="Connect with us on LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold shadow-sm hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M5.5 4.5A2.25 2.25 0 1 0 5.5 9a2.25 2.25 0 0 0 0-4.5ZM4 10.25h3v9.25H4V10.25ZM10 10.25h2.9v1.26h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.63v4.92h-3v-4.37c0-1.04-.02-2.38-1.45-2.38-1.45 0-1.67 1.13-1.67 2.3v4.45h-3v-9.25Z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-base font-semibold">Quick Links</h4>

            <ul className="space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => handleNavClick('About Us')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="About Us"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Gallery')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Gallery"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Explore Services')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Explore Services"
                >
                  Explore Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Our Team')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Our Team"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Careers')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Careers"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-base font-semibold">Services</h4>

            <ul className="space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => handleNavClick('Room Booking')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Room Booking"
                >
                  Room Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Spa & Wellness')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Spa & Wellness"
                >
                  Spa & Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Restaurant')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Restaurant"
                >
                  Restaurant
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Event Planning')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Event Planning"
                >
                  Event Planning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Airport Transfer')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Airport Transfer"
                >
                  Airport Transfer
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-base font-semibold">Resources</h4>

            <ul className="space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => handleNavClick('Blog')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Blog"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Travel Guide')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Travel Guide"
                >
                  Travel Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('FAQs')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="FAQs"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Privacy Policy')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('Terms & Conditions')}
                  className="hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                  aria-label="Terms & Conditions"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-gray-300 text-center text-gray-500 text-xs">
          <p>© {currentYear} Dhaneshwari Hotel. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;