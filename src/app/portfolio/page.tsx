'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CameraIcon, 
  MicrophoneIcon, 
  EyeIcon,
  XMarkIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

interface PortfolioItem {
  id: number;
  title: string;
  category: 'sound' | 'photography';
  description: string;
  imageUrl: string;
  clientName: string;
  date: string;
  tags: string[];
}

export default function PortfolioPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Sample portfolio data - in a real app, this would come from the API
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Wedding Ceremony at Sunset Gardens",
      category: "sound",
      description: "Complete sound engineering for a beautiful outdoor wedding ceremony with 200 guests. Provided wireless microphones, sound system setup, and live music amplification.",
      imageUrl: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&h=600&fit=crop",
      clientName: "Sarah & Mike Johnson",
      date: "2024-06-15",
      tags: ["Wedding", "Outdoor", "Live Music", "200+ Guests"]
    },
    {
      id: 2,
      title: "Corporate Product Launch Event",
      category: "photography",
      description: "Professional event photography for a major tech company's product launch. Captured keynote presentations, networking sessions, and product demonstrations.",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      clientName: "TechCorp Industries",
      date: "2024-05-22",
      tags: ["Corporate", "Product Launch", "Indoor", "Professional"]
    },
    {
      id: 3,
      title: "Live Concert Recording Session",
      category: "sound",
      description: "Multi-track recording and live sound engineering for an indie rock band's album release concert at the Historic Music Hall.",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      clientName: "The Electric Waves",
      date: "2024-04-18",
      tags: ["Concert", "Recording", "Live Music", "Historic Venue"]
    },
    {
      id: 4,
      title: "Fashion Show Behind the Scenes",
      category: "photography",
      description: "Exclusive behind-the-scenes photography for Fashion Week, capturing models, designers, and the creative process backstage.",
      imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
      clientName: "Milan Fashion Week",
      date: "2024-03-10",
      tags: ["Fashion", "Behind the Scenes", "Models", "Creative"]
    },
    {
      id: 5,
      title: "Anniversary Celebration",
      category: "sound",
      description: "Sound system setup and DJ services for a 50th wedding anniversary celebration with family and friends in an intimate setting.",
      imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      clientName: "Robert & Mary Chen",
      date: "2024-02-14",
      tags: ["Anniversary", "Family", "Intimate", "DJ Services"]
    },
    {
      id: 6,
      title: "Graduation Ceremony Coverage",
      category: "photography",
      description: "Complete photography coverage of university graduation ceremony, including individual portraits, family photos, and ceremony highlights.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      clientName: "State University",
      date: "2024-01-20",
      tags: ["Graduation", "University", "Portraits", "Ceremony"]
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Work', icon: EyeIcon },
    { id: 'sound', name: 'Sound Engineering', icon: MicrophoneIcon },
    { id: 'photography', name: 'Photography', icon: CameraIcon }
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
              <Link href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Services
              </Link>
              <a href="/portfolio" className="text-purple-600 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-purple-600">
                Portfolio
              </a>
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

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Showcasing our best work in sound engineering and photography across various events and projects
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center">
                        {item.category === 'sound' ? (
                          <MicrophoneIcon className="h-5 w-5 mr-2" />
                        ) : (
                          <CameraIcon className="h-5 w-5 mr-2" />
                        )}
                        <span className="text-sm font-medium">View Details</span>
                      </div>
                      <EyeIcon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      item.category === 'sound' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.category === 'sound' ? 'Sound Engineering' : 'Photography'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Client:</span> {item.clientName}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <EyeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio items</h3>
              <p className="mt-1 text-sm text-gray-500">No work found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              </button>
              
              <div className="relative h-96 overflow-hidden rounded-t-2xl">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-2">
                    {selectedItem.category === 'sound' ? (
                      <MicrophoneIcon className="h-6 w-6 mr-2" />
                    ) : (
                      <CameraIcon className="h-6 w-6 mr-2" />
                    )}
                    <span className="text-lg font-semibold">
                      {selectedItem.category === 'sound' ? 'Sound Engineering' : 'Photography'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold">{selectedItem.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedItem.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                      <p className="text-gray-700">{selectedItem.clientName}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Date</h4>
                      <p className="text-gray-700">
                        {new Date(selectedItem.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                      <p className="text-gray-700 capitalize">{selectedItem.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
