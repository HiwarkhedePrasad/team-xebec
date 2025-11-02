"use client";
import React, { useState } from 'react';
import { Rocket, Brain, Users, Zap, Plus, X } from 'lucide-react';

export default function TeamXebec() {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [posts, setPosts] = useState([
  {
    id: 1,
    type: 'hackathon',
    title: "NASA Space Apps Challenge 2025",
    subtitle: "Decoding Earth’s Signals",
    date: "Oct 2025",
    content: "48 hours. One global challenge. Our team crafted an interactive dashboard translating satellite data into human insight — empowering anyone to visualize climate shifts in real time. Secured 3rd place and ranked among the global top 100.",
    status: "3rd Place • Regional Winner",
    tags: ["React", "Python", "NASA API"],
    color: "green"
  },
  {
    id: 2,
    type: 'research',
    title: "Edge Intelligence in Motion",
    subtitle: "Optimizing ML for Real-Time IoT Systems",
    date: "Sep 2025",
    content: "Our research focused on deploying efficient machine learning at the edge. Using quantization and pruning, we achieved a 78% model compression with minimal accuracy trade-off (−2%). Under IEEE review.",
    author: "Research Division",
    tags: ["Edge AI", "IoT", "Optimization"],
    color: "red"
  },
  {
    id: 3,
    type: 'team',
    name: "Aarav Patel",
    role: "Lead Developer",
    date: "Core Member",
    content: "Bridging design and logic. Aarav leads full-stack development, turning rough ideas into smooth systems. Veteran of five hackathons, now diving into WebGL-powered 3D interfaces. When off-duty, he sketches concepts that code themselves later.",
    specialty: "React • Node.js • System Architecture",
    color: "green"
  },
  {
    id: 4,
    type: 'upcoming',
    title: "Smart Library Management System",
    subtitle: "When IoT Meets Computer Vision",
    date: "Dec 2025",
    content: "Bringing intelligence to libraries — RFID-assisted tracking, automated recommendations, and vision-based checkouts. The goal: make book borrowing as seamless as a tap. Prototype nearing completion.",
    status: "In Development",
    progress: "60%",
    tags: ["IoT", "Computer Vision", "Embedded Systems"],
    color: "red"
  }
]);

  const [formData, setFormData] = useState({
    type: 'hackathon',
    title: '',
    subtitle: '',
    content: '',
    tags: ''
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.content) return;

    const newPost = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      color: ['red', 'green'][Math.floor(Math.random() * 2)]
    };

    setPosts([newPost, ...posts]);
    setFormData({ type: 'hackathon', title: '', subtitle: '', content: '', tags: '' });
    setShowAddModal(false);
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(p => p.type === activeTab);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'hackathon': return <Rocket className="w-5 h-5" />;
      case 'research': return <Brain className="w-5 h-5" />;
      case 'team': return <Users className="w-5 h-5" />;
      case 'upcoming': return <Zap className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-black">XEBEC</h1>
              <p className="text-xs text-stone-500 mt-0.5">Innovation Lab</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white hover:bg-stone-800 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white text-black text-xs font-semibold tracking-wide">EST. 2024</span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-stone-300">Active Projects: 12</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Where Ideas Meet<br/>Execution
            </h2>
            <p className="text-xl text-stone-300 leading-relaxed">
              A collective of college innovators pushing boundaries through hackathons, research, and real-world problem solving. We don't just build projects—we craft experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-8 overflow-x-auto py-4">
            {[
              { id: 'all', label: 'All Posts' },
              { id: 'hackathon', label: 'Hackathons' },
              { id: 'research', label: 'Research' },
              { id: 'team', label: 'Team' },
              { id: 'upcoming', label: 'Upcoming' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-black border-black'
                    : 'text-stone-400 border-transparent hover:text-stone-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="group bg-white border border-stone-200 hover:border-stone-300 transition-all"
            >
              {/* Header with color accent */}
              <div className={`h-1.5 ${post.color === 'red' ? 'bg-red-600' : 'bg-green-600'}`}></div>
              
              <div className="p-8">
                {/* Type badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-stone-500">
                    {getTypeIcon(post.type)}
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {post.type}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-stone-700 transition-colors">
                  {post.title}
                </h3>
                
                {post.subtitle && (
                  <p className="text-sm text-stone-500 mb-4 font-medium">{post.subtitle}</p>
                )}

                {/* Content */}
                <p className="text-stone-600 leading-relaxed mb-6">
                  {post.content}
                </p>

                {/* Footer metadata */}
                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                  <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 bg-stone-100 text-stone-700 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.specialty && (
                      <span className="text-xs text-stone-500">{post.specialty}</span>
                    )}
                  </div>
                  
                  {post.status && (
                    <span className={`px-3 py-1 text-xs font-semibold ${
                      post.color === 'green' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {post.status}
                    </span>
                  )}
                  
                  {post.progress && (
                    <span className="text-xs font-semibold text-stone-700">
                      {post.progress} Complete
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">Create New Post</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Post Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-black focus:ring-0 outline-none bg-white text-black"
                >
                  <option value="hackathon">Hackathon</option>
                  <option value="research">Research</option>
                  <option value="team">Team Member</option>
                  <option value="upcoming">Upcoming Project</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-black focus:ring-0 outline-none"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-black focus:ring-0 outline-none"
                  placeholder="Enter subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-black focus:ring-0 outline-none resize-none"
                  placeholder="Write your post content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-black focus:ring-0 outline-none"
                  placeholder="React, Python, AI"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-black text-white hover:bg-stone-800 transition-colors font-medium"
                >
                  Publish Post
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-4">XEBEC</h4>
              <p className="text-stone-400 text-sm leading-relaxed">
                A student-led innovation lab focused on solving real problems through technology and research.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="space-y-2 text-sm text-stone-400">
                <p>GitHub • LinkedIn • Twitter</p>
                <p>team@xebec.edu</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Stats</h5>
              <div className="space-y-2 text-sm">
                <p className="text-stone-400">15 Active Members</p>
                <p className="text-stone-400">8 Hackathon Wins</p>
                <p className="text-stone-400">12 Ongoing Projects</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
            © 2025 Team Xebec. Built with purpose.
          </div>
        </div>
      </footer>
    </div>
  );
}