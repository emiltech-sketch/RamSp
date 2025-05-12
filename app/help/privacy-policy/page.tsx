"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Privacy Policy</h1>
        </div>
      </div>

      <div className="p-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">RamSphere Privacy Policy</h2>
          <p className="text-gray-600 mb-4">Last Updated: March 17, 2025</p>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
              <p className="text-gray-700">
                RamSphere ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our mobile application and
                website (collectively, the "Service").
              </p>
              <p className="text-gray-700 mt-2">
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you
                have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">2. Information We Collect</h3>
              <p className="text-gray-700">
                We may collect several types of information from and about users of our Service, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Personal information such as name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through our payment processors)</li>
                <li>Device information including IP address, browser type, and operating system</li>
                <li>Usage data about how you interact with our Service</li>
                <li>Location data when you enable location services</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">3. How We Use Your Information</h3>
              <p className="text-gray-700">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support</li>
                <li>Improve and personalize your shopping experience</li>
                <li>Send you transactional emails and order updates</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">4. Sharing Your Information</h3>
              <p className="text-gray-700">We may share your information with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Service providers who help us operate our business</li>
                <li>Payment processors to complete transactions</li>
                <li>Delivery partners to fulfill orders</li>
                <li>Marketing partners (with your consent)</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">5. Your Choices</h3>
              <p className="text-gray-700">You have several choices regarding the information you provide to us:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Update or correct your account information</li>
                <li>Opt-out of marketing communications</li>
                <li>Disable location services</li>
                <li>Request deletion of your personal data (subject to legal requirements)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">6. Security</h3>
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">7. Changes to This Privacy Policy</h3>
              <p className="text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">8. Contact Us</h3>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700 mt-2">
                Email: privacy@ramsphere.com
                <br />
                Phone: +1-800-RAMSPHERE
                <br />
                Address: 123 Commerce Street, Tech City, TC 12345
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
