'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for client-side only components
const Terminal = dynamic(() => import('./components/Terminal'), { ssr: false });
const ParticleBackground = dynamic(() => import('./components/ParticleBackground'), { ssr: false });
const Scene3D = dynamic(() => import('./components/Scene3D'), { ssr: false });

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Update time
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const skills = [
    { name: 'Kubernetes', icon: '☸️', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'AWS', icon: '☁️', level: 90, color: 'from-orange-500 to-yellow-500' },
    { name: 'Docker', icon: '🐳', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'Terraform', icon: '🏗️', level: 85, color: 'from-purple-500 to-pink-500' },
    { name: 'CI/CD', icon: '🔄', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'Monitoring', icon: '📊', level: 88, color: 'from-red-500 to-orange-500' },
  ];

  const certifications = [
    { name: 'AWS Solutions Architect', org: 'Amazon Web Services', year: '2023', icon: '🏆' },
    { name: 'Certified Kubernetes Administrator', org: 'CNCF', year: '2023', icon: '⚡' },
    { name: 'AWS Certified', org: 'Amazon Web Services', year: '2022', icon: '🎖️' },
  ];

  const articles = [
    {
      title: 'Building Production-Grade Kubernetes Cluster',
      description: 'Complete guide with Cilium CNI',
      link: 'https://medium.com/@abhishekvala06/building-a-production-grade-kubernetes-cluster-with-cilium-cni-the-complete-guide-78e58ddeb6e7',
      tags: ['Kubernetes', 'DevOps', 'Cloud']
    },
    {
      title: 'ETCD Cluster for Kubernetes',
      description: 'High Availability database setup',
      link: 'https://medium.com/@abhishekvala06/creating-an-etcd-cluster-for-kubernetes-6fcdc91dec97',
      tags: ['ETCD', 'HA', 'Database']
    },
    {
      title: 'Elastic Disaster Recovery',
      description: 'Pilot Light Strategy implementation',
      link: 'https://medium.com/@abhishekvala06/elastic-disaster-recovery-implementation-using-pilot-light-strategy-d796f3bd4130',
      tags: ['AWS', 'DR', 'Cloud']
    },
    {
      title: 'AWS Single Sign-On Setup',
      description: 'Multi-account management',
      link: 'https://medium.com/@abhishekvala06/how-to-set-up-single-sign-on-sso-for-external-aws-accounts-bbc3fe661bc5',
      tags: ['AWS', 'SSO', 'Security']
    }
  ];

  const techStack = [
    '$ kubectl get pods --all-namespaces',
    '$ terraform apply -auto-approve',
    '$ docker-compose up -d',
    '$ aws s3 sync ./build s3://bucket',
    '$ helm install app ./chart',
    '$ ansible-playbook deploy.yml'
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Matrix Rain Effect */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="matrix-rain" />
      </div>

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.3), transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      </div>

      {/* Floating Terminal Button */}
      <motion.button
        onClick={() => setTerminalOpen(!terminalOpen)}
        className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-mono text-sm font-bold shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {terminalOpen ? '✕ CLOSE' : '> TERMINAL'}
      </motion.button>

      {/* Terminal Overlay */}
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-24 right-8 z-50 w-[600px] max-w-[90vw]"
        >
          <Terminal />
        </motion.div>
      )}

      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-green-500/30 px-6 py-3 font-mono text-xs">
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <span className="text-green-400">● ONLINE</span>
            <span className="text-gray-400">abhishekvala@devops:~$</span>
          </div>
          <div className="flex gap-6">
            <span className="text-blue-400">{currentTime}</span>
            <span className="text-purple-400">IST</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Hero Section with 3D Scene */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          {/* 3D Background Scene */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full bg-black" />}>
              <Scene3D />
            </Suspense>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ opacity }}
            >
              {/* Glitch Effect Title */}
              <div className="relative mb-8">
                <h1 className="text-7xl md:text-9xl font-bold mb-6 glitch-text" data-text="ABHISHEK R. VALA">
                  ABHISHEK R. VALA
                </h1>
              </div>

              {/* Typing Effect Subtitle */}
              <div className="text-2xl md:text-4xl mb-8 text-green-400 font-mono">
                <span className="typing-text">DevOps/SRE Engineer_</span>
              </div>

              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
                Building <span className="text-cyan-400 font-bold animate-pulse">resilient systems</span> at scale
                <br />
                <span className="text-sm text-gray-500 font-mono">
                  2x AWS Certified | Kubernetes CKA | Cloud Native Enthusiast
                </span>
              </p>

              {/* Command Line Style Buttons */}
              <div className="flex gap-4 justify-center flex-wrap font-mono">
                <motion.a
                  href="https://www.linkedin.com/in/abhishek-vala"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold border border-blue-400 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  $ connect --linkedin
                </motion.a>
                <motion.a
                  href="https://medium.com/@abhishekvala06"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-green-500 rounded-lg font-semibold hover:bg-green-500/20 transition-all"
                >
                  $ read --articles
                </motion.a>
              </div>

              {/* Scrolling Tech Commands */}
              <div className="mt-16 max-w-2xl mx-auto">
                <div className="bg-black/60 backdrop-blur-md border border-green-500/30 rounded-lg p-4 font-mono text-sm text-left overflow-hidden">
                  <div className="scrolling-commands">
                    {techStack.map((cmd, i) => (
                      <div key={i} className="text-green-400 mb-2">
                        {cmd}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Cyberpunk Style */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-4 font-mono">
                <span className="text-cyan-400">&lt;</span>
                TECHNICAL EXPERTISE
                <span className="text-cyan-400">/&gt;</span>
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative p-6 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-500 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{skill.icon}</div>
                      <div className="text-2xl font-bold text-cyan-400">{skill.level}%</div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-mono">{skill.name}</h3>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications - Holographic Cards */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-4 font-mono">
                <span className="text-purple-400">{'{'}</span>
                CERTIFICATIONS
                <span className="text-purple-400">{'}'}</span>
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -20, rotateY: 10 }}
                  className="relative group perspective-1000"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative p-8 rounded-xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-lg border-2 border-purple-500/50 hover:border-purple-400 transition-all transform-gpu">
                    <div className="text-6xl mb-4 animate-bounce">{cert.icon}</div>
                    <h3 className="text-xl font-bold mb-2 font-mono">{cert.name}</h3>
                    <p className="text-gray-400 text-sm mb-1">{cert.org}</p>
                    <p className="text-purple-400 font-bold text-lg">{cert.year}</p>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles - Terminal Style */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-4 font-mono text-green-400">
                $ ls -la ~/articles/
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <motion.a
                  key={article.title}
                  href={article.link}
                  target="_blank"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative p-8 rounded-lg bg-black/80 backdrop-blur-md border border-green-500/30 hover:border-green-500 transition-all font-mono">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-green-400 text-sm">-rw-r--r--</span>
                      <span className="text-gray-500 text-xs">{article.tags.join(' | ')}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{article.description}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-green-400 font-bold">$ cat article.md →</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block mb-8">
                <h2 className="text-6xl md:text-7xl font-bold font-mono glitch-text-2" data-text="LET'S CONNECT">
                  LET'S CONNECT
                </h2>
              </div>
              <p className="text-xl text-gray-400 mb-12 font-mono">
                $ echo "Open to DevOps/SRE opportunities"
              </p>
              <motion.a
                href="https://www.linkedin.com/in/abhishek-vala"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-xl font-bold font-mono border-2 border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                $ init --connection
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer - Terminal Style */}
        <footer className="py-8 px-6 border-t border-green-500/30 bg-black/80 backdrop-blur-md font-mono">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div className="text-gray-400">
                <span className="text-green-400">$</span> © 2025 Abhishek R. Vala
              </div>
              <div className="text-gray-500">
                DevOps/SRE Engineer | Ahmedabad, Gujarat, India
              </div>
              <div className="flex gap-4">
                <span className="text-green-400">● System Online</span>
                <span className="text-blue-400">● All Services Running</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}