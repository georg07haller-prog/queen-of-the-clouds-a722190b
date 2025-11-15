import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
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
            <Shield className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-900">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600 mb-8">Last updated: November 15, 2025</p>
          
          <div className="prose prose-purple max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Queen of the Clouds ("we," "our," or "us"). We are committed to protecting your personal 
                information and your right to privacy. This Privacy Policy explains what information we collect, 
                how we use it, and what rights you have in relation to it.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We collect information that you provide directly to us when using Queen of the Clouds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Information:</strong> Email address, name, and password</li>
                <li><strong>Content Creation:</strong> Memes, video scripts, tweets you generate</li>
                <li><strong>Game Progress:</strong> Faith points, completed levels, unlocked rewards</li>
                <li><strong>Usage Data:</strong> How you interact with our platform features</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve Queen of the Clouds</li>
                <li>Process and save your generated content</li>
                <li>Track your game progress and unlock rewards</li>
                <li>Send you updates, tips, and important information</li>
                <li>Respond to your requests and provide customer support</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                <li><strong>Service Providers:</strong> AI services for content generation (OpenAI)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> When you choose to share content on social media</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Your Rights (GDPR Compliance)</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Under GDPR, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Request a copy of your data</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as necessary to provide our services and 
                fulfill the purposes outlined in this policy. You can request deletion of your data at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use essential cookies to maintain your session and preferences. We do not use tracking cookies 
                for advertising purposes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Queen of the Clouds is intended for users aged 18 and above. We do not knowingly collect 
                information from children under 18.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy or want to exercise your rights, please contact us 
                through the platform or at the email address provided in your dashboard.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}