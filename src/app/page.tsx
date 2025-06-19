'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRightIcon, 
  CameraIcon, 
  MicrophoneIcon, 
  CheckCircleIcon,
  PlayIcon,
  PhoneIcon,
  SpeakerWaveIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import BookingForm from './components/BookingForm';
import AuthModal from './components/AuthModal';
import { apiService, type Service } from './lib/api';
import { useAuth } from './contexts/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await apiService.getFeaturedServices();
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const stats = [
    { id: 1, name: 'Happy Clients', value: '500+', icon: HeartIcon },
    { id: 2, name: 'Events Covered', value: '1000+', icon: CameraIcon },
    { id: 3, name: 'Years Experience', value: '8+', icon: StarIcon },
    { id: 4, name: 'Professional Equipment', value: '100%', icon: SpeakerWaveIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl mr-3">
                  <MusicalNoteIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    SoundMind
                  </span>
                  <div className="text-sm text-gray-600 font-medium">Productions</div>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Services
              </Link>
              <a href="#about" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <Link href="/portfolio" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Portfolio
              </Link>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.first_name}!
                  </span>
                  <Link 
                    href="/admin"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => setShowBookingForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Book Now
                  </button>
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Award-Winning Production Services</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="block">Elevate Your</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Sound & Vision
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Transform your events into unforgettable experiences with our professional sound engineering 
              and photography services. We bring creativity, technical excellence, and passion to every project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#services" className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 inline-flex items-center">
                <PlayIcon className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Explore Services
                <ChevronRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 backdrop-blur-sm inline-flex items-center">
                <PhoneIcon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Free Consultation
              </a>
            </div>
            
            <div className="mt-16 flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">1000+</div>
                <div className="text-sm text-gray-300">Events</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">8+</div>
                <div className="text-sm text-gray-300">Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">Professional Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">SoundMind?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine technical expertise with creative vision to deliver exceptional results that exceed expectations for every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <div key={stat.id} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Premium Sound & Visual Solutions
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Grade Equipment</h4>
                    <p className="text-gray-600">State-of-the-art audio and photography equipment ensuring crystal-clear sound and stunning visuals.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Technical Team</h4>
                    <p className="text-gray-600">Experienced sound engineers and photographers who understand your vision and deliver flawlessly.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Solutions</h4>
                    <p className="text-gray-600">Tailored packages designed to meet your specific needs and budget requirements.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <MicrophoneIcon className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
                    <div className="font-bold text-xl mb-1">Sound</div>
                    <div className="text-sm opacity-90">Engineering</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <CameraIcon className="h-12 w-12 mx-auto mb-3 text-pink-300" />
                    <div className="font-bold text-xl mb-1">Photo</div>
                    <div className="text-sm opacity-90">graphy</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold mb-2">All-in-One Solution</div>
                  <div className="opacity-90">Complete production services under one roof</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-400/20 text-yellow-300 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-yellow-300">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive range of professional sound and photography services
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-3 mr-4">
                      {service.category_type === 'sound' ? (
                        <MicrophoneIcon className="h-8 w-8 text-gray-900" />
                      ) : (
                        <CameraIcon className="h-8 w-8 text-gray-900" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-yellow-300 font-medium">{service.category_name}</div>
                      <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-yellow-400">${service.price}</div>
                    <div className="text-sm text-gray-400">{service.duration_hours} hours</div>
                  </div>
                  
                  {service.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 2).map((feature) => (
                        <div key={feature.id} className="flex items-center text-sm text-gray-300">
                          <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature.name}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => {
                      setSelectedService(service);
                      setShowBookingForm(true);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold py-3 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform group-hover:scale-105"
                  >
                    Book This Service
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Create Something
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Amazing?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let&apos;s discuss your project and bring your vision to life with our professional services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all duration-200">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <PhoneIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all duration-200">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">hello@soundmind.com</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all duration-200">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Creative Street<br />Audio City, AC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl mr-3">
                  <MusicalNoteIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    SoundMind
                  </span>
                  <div className="text-sm text-gray-400 font-medium">Productions</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Professional sound engineering and photography services that bring your vision to life with exceptional quality and creativity.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sound Engineering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Photography</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Studio Recording</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Streaming</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+1 (555) 123-4567</li>
                <li>hello@soundmind.com</li>
                <li>123 Creative Street<br />Audio City, AC 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoundMind Productions. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          serviceId={selectedService?.id}
          serviceName={selectedService?.name}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedService(null);
          }}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}
