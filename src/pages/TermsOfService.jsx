import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to={createPageUrl('Landing')}>
          <Button variant="ghost" className="mb-6 text-purple-700 hover:text-purple-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-purple-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-900">Terms of Service</h1>
          </div>
          
          <p className="text-gray-600 mb-8">Last updated: November 15, 2025</p>
          
          <div className="prose prose-purple max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Queen of the Clouds ("the Service"), you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Queen of the Clouds is a gamified content creation platform that helps users generate memes, 
                video scripts, and tweets using AI technology. The Service includes game mechanics, reward systems, 
                and social sharing features.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To use Queen of the Clouds, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree NOT to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Generate harmful, offensive, or illegal content</li>
                <li>Harass, bully, or harm others</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to hack or disrupt the Service</li>
                <li>Use automated systems to access the Service excessively</li>
                <li>Impersonate others or create fake accounts</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Content Ownership and License</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Your Content:</strong> You retain ownership of the content you create using Queen of the Clouds. 
                However, by using the Service, you grant us a license to store, process, and display your content 
                as necessary to provide the Service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>AI-Generated Content:</strong> Content generated using our AI tools is provided "as is." 
                While you can use and share this content, you are responsible for ensuring it complies with applicable 
                laws and platform policies where you share it.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Queen of the Clouds platform, including its design, features, graphics, and content (excluding 
                user-generated content), is owned by us and protected by copyright, trademark, and other intellectual 
                property laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Referral Program</h2>
              <p className="text-gray-700 leading-relaxed">
                Our referral program rewards you with faith points for inviting friends. You may not spam, use 
                misleading tactics, or create fake accounts to earn referral rewards. We reserve the right to 
                revoke points earned through abuse.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide reliable service but do not guarantee uninterrupted access. The Service may 
                be temporarily unavailable due to maintenance, updates, or technical issues. We are not liable 
                for any loss or inconvenience caused by service interruptions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                Queen of the Clouds is provided "as is" without warranties of any kind, either express or implied. 
                We do not guarantee that the Service will meet your requirements or that AI-generated content will 
                be error-free, accurate, or suitable for your purposes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time if you violate these Terms. 
                You may also terminate your account at any time by contacting us.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms from time to time. Continued use of the Service after changes constitutes 
                acceptance of the new Terms. We will notify you of significant changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard 
                to conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms, please contact us through the platform or at the email address 
                provided in your dashboard.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}