import React from 'react';
import { 
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  HeartIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const CareersPage: React.FC = () => {
  const jobOpenings = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      experience: 'Senior',
      description: 'Join our frontend team to build the next generation of e-commerce experiences using React, TypeScript, and modern web technologies.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'E-commerce background preferred'],
      color: 'blue'
    },
    {
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      experience: 'Mid-level',
      description: 'Drive product marketing strategy and go-to-market initiatives for our growing e-commerce platform.',
      requirements: ['3+ years product marketing', 'B2B SaaS experience', 'Data-driven mindset'],
      color: 'green'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $110,000',
      experience: 'Mid-level',
      description: 'Create beautiful, intuitive user experiences that delight our millions of users worldwide.',
      requirements: ['Figma expertise', 'User research experience', 'E-commerce design portfolio'],
      color: 'purple'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      experience: 'Senior',
      description: 'Scale our infrastructure to support millions of transactions and ensure 99.9% uptime.',
      requirements: ['AWS/Azure experience', 'Kubernetes proficiency', 'CI/CD expertise'],
      color: 'orange'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$70,000 - $90,000',
      experience: 'Entry-level',
      description: 'Help our enterprise customers succeed and grow their business using our platform.',
      requirements: ['2+ years customer success', 'Strong communication skills', 'Problem-solving abilities'],
      color: 'teal'
    },
    {
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$130,000 - $170,000',
      experience: 'Senior',
      description: 'Use machine learning and analytics to drive insights and optimize our platform performance.',
      requirements: ['Python/R proficiency', 'ML/AI experience', 'Statistics background'],
      color: 'indigo'
    }
  ];

  const benefits = [
    {
      icon: HeartIcon,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness programs',
      color: 'red'
    },
    {
      icon: ClockIcon,
      title: 'Flexible Schedule',
      description: 'Work-life balance with flexible hours and unlimited PTO',
      color: 'blue'
    },
    {
      icon: AcademicCapIcon,
      title: 'Learning & Growth',
      description: '$2,000 annual learning budget and conference attendance',
      color: 'green'
    },
    {
      icon: GlobeAltIcon,
      title: 'Remote-First',
      description: 'Work from anywhere with quarterly team gatherings',
      color: 'purple'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Competitive Pay',
      description: 'Top-tier compensation with equity and performance bonuses',
      color: 'yellow'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Innovation Time',
      description: '20% time for personal projects and innovation initiatives',
      color: 'orange'
    }
  ];

  const values = [
    {
      title: 'Customer Obsession',
      description: 'We put our customers at the heart of everything we do, building products that truly solve their problems.',
      emoji: '🎯'
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions to stay ahead of the curve.',
      emoji: '💡'
    },
    {
      title: 'Collaboration',
      description: 'We believe the best work happens when diverse teams collaborate openly and respectfully.',
      emoji: '🤝'
    },
    {
      title: 'Excellence',
      description: 'We set high standards and continuously strive to exceed expectations in all we do.',
      emoji: '⭐'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Product Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      quote: 'The growth opportunities here are incredible. In just two years, I\'ve led three major product launches and grown my team from 2 to 8 people.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Full Stack Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      quote: 'The engineering culture is outstanding. We use cutting-edge tech, have great code review processes, and everyone is always willing to help.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      quote: 'I love how user-centered our design process is. We regularly talk to customers and iterate based on real feedback.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <BriefcaseIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Join Our <span className="text-yellow-300">Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Help us build the future of e-commerce. Join a team of passionate individuals 
              creating products that millions of people love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-lg">
                View Open Positions
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition duration-300">
                Learn About Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">150+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">12</div>
              <div className="text-gray-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-gray-600">Glassdoor Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-indigo-600">Values</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These core values guide everything we do and shape our culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">{value.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Work <span className="text-indigo-600">With Us</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We offer competitive benefits and a culture that supports your growth and well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const colorClasses = {
                red: 'from-red-500 to-red-600',
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
                yellow: 'from-yellow-500 to-yellow-600',
                orange: 'from-orange-500 to-orange-600'
              };
              
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100">
                    <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses[benefit.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Job Openings */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Open <span className="text-indigo-600">Positions</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find your next career opportunity and join our growing team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600',
                teal: 'from-teal-500 to-teal-600',
                indigo: 'from-indigo-500 to-indigo-600'
              };
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`bg-gradient-to-r ${colorClasses[job.color as keyof typeof colorClasses]} text-white px-3 py-1 rounded-full text-sm font-medium mr-3`}>
                            {job.department}
                          </span>
                          <span className="text-gray-500 text-sm">{job.experience}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center text-gray-600 text-sm space-x-4 mb-4">
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Requirements:</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center text-gray-600 text-sm">
                            <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className={`flex-1 bg-gradient-to-r ${colorClasses[job.color as keyof typeof colorClasses]} text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transform hover:scale-105 transition duration-300`}>
                        Apply Now
                      </button>
                      <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-indigo-500 hover:text-indigo-600 transition duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Employee Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Team <span className="text-indigo-600">Says</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Hear from our team members about what makes ShopHub a great place to work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-yellow-300">Apply?</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join us in building the future of e-commerce. We can't wait to meet you!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Apply Online</h3>
                <p className="text-gray-200">Submit your application and tell us why you're excited to join ShopHub.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Interview Process</h3>
                <p className="text-gray-200">Meet with our team through a series of interviews to discuss your experience and fit.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Join the Team</h3>
                <p className="text-gray-200">Get your offer and start your journey with us!</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-lg">
                Browse All Positions
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition duration-300">
                Contact HR Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CareersPage;
