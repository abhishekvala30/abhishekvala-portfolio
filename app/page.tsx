'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { name: 'Kubernetes', icon: '☸️', level: 95 },
    { name: 'AWS', icon: '☁️', level: 90 },
    { name: 'Docker', icon: '🐳', level: 95 },
    { name: 'Terraform', icon: '🏗️', level: 85 },
    { name: 'CI/CD', icon: '🔄', level: 90 },
    { name: 'Monitoring', icon: '📊', level: 88 },
  ];

  const certifications = [
    { name: 'AWS Solutions Architect', org: 'Amazon Web Services', year: '2023' },
    { name: 'Certified Kubernetes Administrator (CKA)', org: 'CNCF', year: '2023' },
    { name: 'AWS Certified', org: 'Amazon Web Services', year: '2022' },
  ];

  const articles = [
    {
      title: 'Building Production-Grade Kubernetes Cluster',
      description: 'Complete guide to implementing production-grade clusters with Cilium CNI',
      link: 'https://medium.com/@abhishekvala06/building-a-production-grade-kubernetes-cluster-with-cilium-cni-the-complete-guide-78e58ddeb6e7'
    },
    {
      title: 'ETCD Cluster for Kubernetes',
      description: 'Establishing a Kubernetes database with High Availability',
      link: 'https://medium.com/@abhishekvala06/creating-an-etcd-cluster-for-kubernetes-6fcdc91dec97'
    },
    {
      title: 'Elastic Disaster Recovery',
      description: 'Implementation using Pilot Light Strategy',
      link: 'https://medium.com/@abhishekvala06/elastic-disaster-recovery-implementation-using-pilot-light-strategy-d796f3bd4130'
    },
    {
      title: 'AWS Single Sign-On Setup',
      description: 'Managing multiple AWS accounts from a single place',
      link: 'https://medium.com/@abhishekvala06/how-to-set-up-single-sign-on-sso-for-external-aws-accounts-bbc3fe661bc5'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Abhishek R. Vala
              </h1>
              <p className="text-2xl md:text-4xl mb-8 text-gray-300">
                DevOps/SRE Engineer
              </p>
              <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto">
                Building <span className="text-blue-400 font-semibold">resilient systems</span> at scale. 
                2x AWS Certified | Kubernetes CKA | Cloud Native Enthusiast
              </p>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <motion.a
                  href="https://www.linkedin.com/in/abhishek-vala"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Connect on LinkedIn
                </motion.a>
                <motion.a
                  href="https://medium.com/@abhishekvala06"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-600 rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  Read My Articles
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Technical Expertise
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{skill.level}% Proficiency</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Certifications
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 text-center"
                >
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                  <p className="text-gray-400 text-sm mb-1">{cert.org}</p>
                  <p className="text-purple-400 font-semibold">{cert.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <motion.a
                  key={article.title}
                  href={article.link}
                  target="_blank"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-500/50 transition-all group"
                >
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{article.description}</p>
                  <span className="text-blue-400 font-semibold">Read More →</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Let's Build Something Amazing
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Open to DevOps/SRE opportunities and collaborations
              </p>
              <motion.a
                href="https://www.linkedin.com/in/abhishek-vala"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>© 2025 Abhishek R. Vala. All rights reserved.</p>
            <p className="mt-2">DevOps/SRE Engineer | Ahmedabad, Gujarat, India</p>
          </div>
        </footer>
      </div>
    </div>
  );
}