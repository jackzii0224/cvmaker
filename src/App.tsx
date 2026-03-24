/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Globe, Linkedin, 
  Plus, Trash2, Download, Printer, Briefcase, GraduationCap, 
  Award, CheckCircle, Heart, Target, FileText, UserCheck,
  ChevronLeft, ChevronRight, Palette, Flag, PenTool, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2pdf from 'html2pdf.js';

// --- Types ---

interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  sidebarBg: string;
  textMain: string;
  textSidebar: string;
  layout?: 'default' | 'modern-green' | 'navy-sidebar' | 'clean-white' | 'timeline-centered' | 'modern-minimal' | 'blue-header';
}

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  year: string;
  description: string;
}

interface Reference {
  id: string;
  name: string;
  position: string;
  contact: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface Language {
  id: string;
  name: string;
  level: string;
}

interface CVData {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
    linkedin: string;
    location: string;
    photo?: string;
  };
  profile: string;
  goals: string;
  education: Education[];
  experience: Experience[];
  certificates: string[];
  skills: Skill[];
  languages: Language[];
  qualities: string[];
  hobbies: string[];
  references: Reference[];
  declaration: string;
}

// --- Initial Data ---

const initialData: CVData = {
  personal: {
    name: "KAIVA KWEB",
    email: "jackaiva0224@gmail.com",
    phone: "+67572651651",
    address: "Tabubil, Papua New Guinea",
    dob: "27/02/1995",
    gender: "Male",
    linkedin: "www.linkedin.com/in/kaivakweb",
    location: "Tabubil",
    photo: "https://picsum.photos/seed/kaiva/200/200",
  },
  profile: "I believe in honesty, trust, transparency, and strong, productive leadership. I value professionals who lead with confidence, share knowledge, and deliver results. I am committed to working with focus, meeting deadlines, and producing quality work.",
  goals: "To secure a challenging position in a reputable organization where I can utilize my technical skills and contribute to the growth of the company while enhancing my professional knowledge.",
  education: [
    { id: '1', school: "University of Papua New Guinea", degree: "Bachelor's Degree of Science (Computer Science)", year: "2013-03 – 2017-07" }
  ],
  experience: [
    { id: '1', company: "Wokman Teleoks Limited (OTML)", role: "ADAS Admin Officer", year: "2021-03 – present", description: "• Fleet monitoring using TrakPro ADAS system\n• Keeping records of TrakPro Alerts and Reporting of Breaches APD Security Base 1\n• Use of Access and Excel VBA to store records\n• OTML/MILUM convoy reports\n• MMR reports and updates on GLMS\n• Logistics Dashboard update in MS Teams\n• MILUM/OTML bus report reports" },
    { id: '2', company: "Ruswin Integrated Solutions", role: "Electronics Technician", year: "2019-12 – 2021-01", description: "• Installion of Gallagher access control systems which includes device installation and software configuration\n• CCTV installations and configuration\n• Alarm systems Installation and configuration" }
  ],
  certificates: [],
  skills: [
    { id: '1', name: "Leadership", level: 90 },
    { id: '2', name: "Computing", level: 95 },
    { id: '3', name: "Public Speaking", level: 85 },
    { id: '4', name: "Graphics and Design", level: 80 }
  ],
  languages: [
    { id: '1', name: "English", level: "Fluent" },
    { id: '2', name: "Tok Pisin", level: "Native" }
  ],
  qualities: ["Honesty", "Trust", "Transparency", "Productive leadership"],
  hobbies: ["Reading", "Technology", "Community Service"],
  references: [],
  declaration: "I hereby declare that all the information provided above is true to the best of my knowledge and belief."
};

const themes: Theme[] = [
  {
    id: 'kaiva-kweb',
    name: 'Blue Header',
    primary: '#3b719f',
    secondary: '#1e3a5f',
    accent: '#ffffff',
    sidebarBg: '#ffffff',
    textMain: '#000000',
    textSidebar: '#ffffff',
    layout: 'blue-header'
  },
  {
    id: 'betcy-rickz',
    name: 'Classic Sidebar',
    primary: '#5a5a40',
    secondary: '#8e8e8e',
    accent: '#f5f5f0',
    sidebarBg: '#ffffff',
    textMain: '#111827',
    textSidebar: '#5a5a40',
    layout: 'default'
  },
  {
    id: 'sam-hill',
    name: 'Modern Minimal',
    primary: '#000000',
    secondary: '#333333',
    accent: '#f3f4f6',
    sidebarBg: '#ffffff',
    textMain: '#000000',
    textSidebar: '#333333',
    layout: 'modern-minimal'
  },
  {
    id: 'peter-madison',
    name: 'Clean Teal',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#f0fdfa',
    sidebarBg: '#ffffff',
    textMain: '#111827',
    textSidebar: '#0d9488',
    layout: 'clean-white'
  },
  {
    id: 'joanna-brown',
    name: 'Sage Sidebar',
    primary: '#4d7c0f',
    secondary: '#3f6212',
    accent: '#f7fee7',
    sidebarBg: '#f7fee7',
    textMain: '#111827',
    textSidebar: '#4d7c0f',
    layout: 'modern-green'
  }
];

// --- Components ---

// --- Layout Components ---

function BlueHeaderLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Blue Header */}
      <header className="p-10 flex items-center gap-10 text-white" style={{ backgroundColor: currentTheme.primary }}>
        <div className="relative w-40 h-40 shrink-0">
          <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
          <div className="absolute inset-1 rounded-full overflow-hidden bg-stone-100">
            {data.personal.photo ? (
              <img src={data.personal.photo} alt={data.personal.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={64} className="text-stone-300" />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight uppercase">{data.personal.name}</h1>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm opacity-90">
            <div className="flex items-center gap-2"><Mail size={14} /> {data.personal.email}</div>
            <div className="flex items-center gap-2"><Phone size={14} /> {data.personal.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> {data.personal.address}</div>
            <div className="flex items-center gap-2"><Calendar size={14} /> {data.personal.dob}</div>
            <div className="flex items-center gap-2"><Flag size={14} /> Papua New Guinean</div>
            <div className="flex items-center gap-2"><User size={14} /> {data.personal.gender}</div>
            <div className="flex items-center gap-2 col-span-2"><Linkedin size={14} /> {data.personal.linkedin}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-10 space-y-10">
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 pb-1" style={{ borderColor: currentTheme.primary }}>
            <PenTool size={20} style={{ color: currentTheme.primary }} />
            <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color: currentTheme.primary }}>Career Objective</h3>
          </div>
          <p className="text-sm text-stone-800 leading-relaxed font-medium">{data.profile}</p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b-2 pb-1" style={{ borderColor: currentTheme.primary }}>
            <Briefcase size={20} style={{ color: currentTheme.primary }} />
            <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color: currentTheme.primary }}>Professional Experience</h3>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-sm font-medium text-stone-600">
                  <p>{exp.year}</p>
                  <p>{data.personal.location},</p>
                  <p>Papua New Guinea</p>
                </div>
                <div className="col-span-9 space-y-1">
                  <h4 className="font-bold text-lg">{exp.company}</h4>
                  <p className="font-bold text-stone-700">{exp.role}</p>
                  <div className="text-sm text-stone-600 leading-relaxed mt-2 space-y-1">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 pb-1" style={{ borderColor: currentTheme.primary }}>
            <GraduationCap size={20} style={{ color: currentTheme.primary }} />
            <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color: currentTheme.primary }}>Education</h3>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="space-y-1">
                <h4 className="font-bold text-lg">{edu.school}</h4>
                <p className="font-bold text-stone-700">{edu.degree}</p>
                <p className="text-sm text-stone-600">{edu.year} | Port Moresby, Papua New Guinea</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 pb-1" style={{ borderColor: currentTheme.primary }}>
            <Layout size={20} style={{ color: currentTheme.primary }} />
            <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color: currentTheme.primary }}>Skills</h3>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold border-b border-stone-200 pb-1">Leadership</h4>
              <ul className="text-xs space-y-1 list-disc pl-4 text-stone-600">
                <li>Leading team and working under minimal supervision</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold border-b border-stone-200 pb-1">Computing</h4>
              <ul className="text-xs space-y-1 list-disc pl-4 text-stone-600">
                <li>Advance MS Office products</li>
                <li>Excel, Access, Word, Publisher</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold border-b border-stone-200 pb-1">Public Speaking</h4>
              <ul className="text-xs space-y-1 list-disc pl-4 text-stone-600">
                <li>Confident level of speaking and doing presentations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold border-b border-stone-200 pb-1">Design & Video</h4>
              <ul className="text-xs space-y-1 list-disc pl-4 text-stone-600">
                <li>Experience in following designs softwares</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DefaultLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Top Header Bar */}
      <div className="bg-[#f5f5f0] py-2 text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase font-medium text-stone-500">R E S U M E ( C V )</span>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[35%] bg-[#f5f5f0] flex flex-col border-r border-stone-100">
          {/* Name Box */}
          <div className="p-8 pt-12 text-center" style={{ backgroundColor: currentTheme.primary }}>
            <h2 className="font-bold text-3xl tracking-wider text-white uppercase leading-tight">{data.personal.name}</h2>
            <div className="w-12 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="p-8 space-y-12">
            {/* Personal Details */}
            <section className="space-y-6">
              <h3 className="font-bold text-lg text-[#5a5a40] border-b border-stone-200 pb-2" style={{ color: currentTheme.primary }}>Personal details</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <User size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600 uppercase tracking-wide">{data.personal.name}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <Mail size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600">{data.personal.email}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <Phone size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600">{data.personal.phone}</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white shrink-0">
                    <MapPin size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600 leading-relaxed">{data.personal.address}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <Calendar size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600">{data.personal.dob}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <MapPin size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600">{data.personal.location}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <User size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600">{data.personal.gender}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white">
                    <Linkedin size={14} className="text-stone-400" />
                  </div>
                  <span className="text-xs font-medium text-stone-600">{data.personal.linkedin}</span>
                </li>
              </ul>
            </section>

            {/* Qualities */}
            <section className="space-y-6">
              <h3 className="font-bold text-lg text-[#5a5a40] border-b border-stone-200 pb-2" style={{ color: currentTheme.primary }}>Qualities</h3>
              <ul className="space-y-4">
                {data.qualities.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 shrink-0" style={{ backgroundColor: currentTheme.primary }}></div>
                    <span className="text-sm text-stone-700 leading-tight">{q}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12 space-y-12 bg-white">
          <section className="space-y-4">
            <h3 className="text-3xl font-bold text-[#5a5a40] border-b border-stone-200 pb-2" style={{ color: currentTheme.primary }}>Profile</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{data.profile}</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-3xl font-bold text-[#5a5a40] border-b border-stone-200 pb-2" style={{ color: currentTheme.primary }}>Career Goals</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{data.goals}</p>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-bold text-[#5a5a40] border-b border-stone-200 pb-2" style={{ color: currentTheme.primary }}>Education</h3>
            <div className="space-y-8">
              {data.education.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-lg text-stone-800">{edu.degree}</h4>
                    <span className="text-sm font-bold text-stone-800">{edu.year}</span>
                  </div>
                  <p className="text-sm italic text-stone-500 font-medium">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-bold text-[#5a5a40] border-b border-stone-200 pb-2" style={{ color: currentTheme.primary }}>Work Experience</h3>
            <div className="space-y-8">
              {data.experience.map((exp, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-lg text-stone-800">{exp.role}</h4>
                    <span className="text-sm font-bold text-stone-800">{exp.year}</span>
                  </div>
                  <p className="text-sm italic text-stone-500 font-medium">{exp.company}</p>
                  <p className="text-sm text-stone-600 leading-relaxed mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ModernMinimalLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex-1 bg-white p-16 space-y-12">
      <header className="space-y-6 border-b-4 border-stone-900 pb-8">
        <h1 className="text-6xl font-black tracking-tighter text-stone-900 uppercase leading-none">{data.personal.name}</h1>
        <p className="text-xl font-bold text-stone-600 tracking-wide">{data.profile.split('.')[0]}</p>
      </header>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-4 space-y-10">
          <section className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest bg-stone-900 text-white px-3 py-1 inline-block">Personal Details</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail size={14} /> {data.personal.email}</p>
              <p className="flex items-center gap-2"><Phone size={14} /> {data.personal.phone}</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> {data.personal.address}</p>
              <p className="flex items-center gap-2 font-bold text-indigo-600"><Linkedin size={14} /> {data.personal.linkedin}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest bg-stone-900 text-white px-3 py-1 inline-block">Skills</h3>
            <div className="grid grid-cols-1 gap-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-sm font-medium border-b border-stone-100 pb-1">{skill.name}</div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-8 space-y-12">
          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter border-b-2 border-stone-900 pb-2">Employment</h3>
            <div className="space-y-8">
              {data.experience.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-lg">{exp.role}</h4>
                    <span className="text-sm font-bold text-stone-400">{exp.year}</span>
                  </div>
                  <p className="text-sm font-bold text-stone-500">{exp.company}</p>
                  <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter border-b-2 border-stone-900 pb-2">Education</h3>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-sm text-stone-500">{edu.school}</p>
                  </div>
                  <span className="text-sm font-bold text-stone-400">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ModernGreenLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex flex-1">
      {/* Left Column */}
      <div className="w-[40%] flex flex-col" style={{ backgroundColor: currentTheme.sidebarBg }}>
        <div className="p-12 flex flex-col items-center">
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 rotate-45 border-4" style={{ borderColor: currentTheme.primary }}></div>
            <div className="absolute inset-2 rotate-45 overflow-hidden bg-stone-100">
              {data.personal.photo ? (
                <img src={data.personal.photo} alt={data.personal.name} className="w-full h-full object-cover -rotate-45 scale-150" />
              ) : (
                <div className="w-full h-full flex items-center justify-center -rotate-45">
                  <User size={64} className="text-stone-300" />
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-2 mb-12">
            <h2 className="font-bold text-3xl tracking-tighter uppercase" style={{ color: currentTheme.primary }}>{data.personal.name}</h2>
            <p className="text-sm font-medium tracking-widest uppercase opacity-60">Professional Profile</p>
          </div>

          <div className="w-full space-y-10 px-6">
            <div className="sidebar-section">
              <h3 className="font-bold text-sm uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ borderColor: currentTheme.primary }}>Profile</h3>
              <p className="text-xs leading-relaxed text-stone-600">{data.profile}</p>
            </div>

            <div className="sidebar-section">
              <h3 className="font-bold text-sm uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ borderColor: currentTheme.primary }}>Contact</h3>
              <ul className="space-y-4">
                <li className="space-y-1">
                  <span className="text-[10px] font-bold uppercase opacity-50">Phone:</span>
                  <p className="text-xs font-medium">{data.personal.phone}</p>
                </li>
                <li className="space-y-1">
                  <span className="text-[10px] font-bold uppercase opacity-50">Email:</span>
                  <p className="text-xs font-medium">{data.personal.email}</p>
                </li>
                <li className="space-y-1">
                  <span className="text-[10px] font-bold uppercase opacity-50">Address:</span>
                  <p className="text-xs font-medium">{data.personal.address}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 bg-white p-12 space-y-12">
        <section>
          <div className="relative -ml-16 mb-8 w-fit">
            <div className="text-white px-10 py-3 font-bold text-2xl uppercase tracking-wider relative z-10" style={{ backgroundColor: currentTheme.primary }}>
              Education
            </div>
            <div className="absolute -bottom-2 left-0 w-4 h-4 rotate-45 z-0" style={{ backgroundColor: currentTheme.secondary }}></div>
          </div>
          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <div key={i} className="space-y-1">
                <h4 className="font-bold text-stone-800">{edu.school}</h4>
                <p className="text-xs font-medium opacity-60">{edu.year}</p>
                <p className="text-sm text-stone-600">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="relative -ml-16 mb-8 w-fit">
            <div className="text-white px-10 py-3 font-bold text-2xl uppercase tracking-wider relative z-10" style={{ backgroundColor: currentTheme.primary }}>
              Work Experience
            </div>
            <div className="absolute -bottom-2 left-0 w-4 h-4 rotate-45 z-0" style={{ backgroundColor: currentTheme.secondary }}></div>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-bold text-stone-800">{exp.company} - {exp.role}</h4>
                <p className="text-xs font-medium opacity-60">{exp.year}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="relative -ml-16 mb-8 w-fit">
            <div className="text-white px-10 py-3 font-bold text-2xl uppercase tracking-wider relative z-10" style={{ backgroundColor: currentTheme.primary }}>
              Skills
            </div>
            <div className="absolute -bottom-2 left-0 w-4 h-4 rotate-45 z-0" style={{ backgroundColor: currentTheme.secondary }}></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={14} style={{ color: currentTheme.primary }} />
                <span className="text-sm font-medium text-stone-700">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function NavySidebarLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex flex-1">
      {/* Dark Sidebar */}
      <div className="w-[35%] flex flex-col text-white" style={{ backgroundColor: currentTheme.primary }}>
        <div className="p-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden mb-8">
            {data.personal.photo ? (
              <img src={data.personal.photo} alt={data.personal.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <User size={48} className="text-white/30" />
              </div>
            )}
          </div>

          <div className="w-full space-y-12">
            <div className="sidebar-section">
              <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-2 mb-6">Contact</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <Phone size={16} className="text-white/60" />
                  <span className="text-xs">{data.personal.phone}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={16} className="text-white/60" />
                  <span className="text-xs truncate">{data.personal.email}</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="text-white/60 mt-0.5" />
                  <span className="text-xs leading-relaxed">{data.personal.address}</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-2 mb-6">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-xs font-bold">{edu.year}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">{edu.school}</p>
                    <p className="text-xs opacity-60">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-2 mb-6">Skills</h3>
              <ul className="space-y-3">
                {data.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <span className="text-xs">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-16 bg-white space-y-16">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-stone-800 uppercase">
            {data.personal.name}
          </h1>
          <p className="text-xl tracking-[0.2em] text-stone-500 uppercase font-medium" style={{ color: currentTheme.primary }}>Professional Resume</p>
        </header>

        <section className="space-y-6">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b-2 border-stone-100 pb-2" style={{ color: currentTheme.primary }}>Profile</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{data.profile}</p>
        </section>

        <section className="space-y-8">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b-2 border-stone-100 pb-2" style={{ color: currentTheme.primary }}>Work Experience</h3>
          <div className="space-y-10 relative">
            <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-stone-100"></div>
            {data.experience.map((exp, i) => (
              <div key={i} className="pl-8 relative">
                <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: currentTheme.primary }}></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-stone-800">{exp.company}</h4>
                    <p className="text-sm text-stone-500 font-medium">{exp.role}</p>
                  </div>
                  <span className="text-xs font-bold text-stone-400 uppercase">{exp.year}</span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {data.references.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b-2 border-stone-100 pb-2" style={{ color: currentTheme.primary }}>Reference</h3>
            <div className="grid grid-cols-2 gap-10">
              {data.references.map((ref, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="font-bold text-stone-800">{ref.name}</h4>
                  <p className="text-xs text-stone-500">{ref.position}</p>
                  <p className="text-xs text-stone-400 italic">{ref.contact}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function CleanWhiteLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex flex-col flex-1 bg-white p-16 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-stone-900 uppercase">{data.personal.name}</h1>
        <p className="text-sm font-medium text-stone-500 tracking-widest uppercase">Masters-Qualified Pharmacist</p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest bg-teal-600 text-white px-4 py-2 inline-block" style={{ backgroundColor: currentTheme.primary }}>Personal details</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm border-2 p-6" style={{ borderColor: currentTheme.primary }}>
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-500">Email address</span>
              <span>{data.personal.email}</span>
            </div>
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-500">Phone number</span>
              <span>{data.personal.phone}</span>
            </div>
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-500">Address</span>
              <span>{data.personal.address}</span>
            </div>
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-500">LinkedIn</span>
              <span>{data.personal.linkedin}</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest bg-teal-600 text-white px-4 py-2 inline-block" style={{ backgroundColor: currentTheme.primary }}>Profile</h3>
          <p className="text-sm text-stone-600 leading-relaxed border-2 p-6" style={{ borderColor: currentTheme.primary }}>{data.profile}</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest bg-teal-600 text-white px-4 py-2 inline-block" style={{ backgroundColor: currentTheme.primary }}>Employment</h3>
          <div className="space-y-6 border-2 p-6" style={{ borderColor: currentTheme.primary }}>
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-lg">{exp.role}</h4>
                  <span className="text-xs font-bold text-stone-400">{exp.year}</span>
                </div>
                <p className="text-sm font-bold text-teal-600" style={{ color: currentTheme.primary }}>{exp.company}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function TimelineCenteredLayout({ data, currentTheme }: { data: CVData, currentTheme: Theme }) {
  return (
    <div className="flex flex-col flex-1 bg-white p-16 space-y-12">
      <header className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tighter text-stone-900">Curriculum vitae</h1>
        <div className="w-full h-0.5 bg-stone-200"></div>
      </header>

      <div className="max-w-4xl mx-auto w-full space-y-12">
        <section className="space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-widest text-stone-900">Personal details</h3>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex gap-12">
              <span className="w-32 font-bold text-stone-500">Name</span>
              <span>{data.personal.name}</span>
            </div>
            <div className="flex gap-12">
              <span className="w-32 font-bold text-stone-500">Email address</span>
              <span>{data.personal.email}</span>
            </div>
            <div className="flex gap-12">
              <span className="w-32 font-bold text-stone-500">Phone number</span>
              <span>{data.personal.phone}</span>
            </div>
            <div className="flex gap-12">
              <span className="w-32 font-bold text-stone-500">Address</span>
              <span>{data.personal.address}</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-widest text-stone-900">Profile</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{data.profile}</p>
        </section>

        <section className="space-y-8">
          <h3 className="text-lg font-bold uppercase tracking-widest text-stone-900">Employment</h3>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-12 gap-8">
                <div className="col-span-3 text-sm font-bold text-stone-400 uppercase tracking-widest">{exp.year}</div>
                <div className="col-span-9 space-y-2">
                  <h4 className="text-lg font-bold text-stone-800">{exp.role}</h4>
                  <p className="text-sm font-bold text-stone-500">{exp.company}</p>
                  <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h3 className="text-lg font-bold uppercase tracking-widest text-stone-900">Education</h3>
          <div className="space-y-8">
            {data.education.map((edu, i) => (
              <div key={i} className="grid grid-cols-12 gap-8">
                <div className="col-span-3 text-sm font-bold text-stone-400 uppercase tracking-widest">{edu.year}</div>
                <div className="col-span-9">
                  <h4 className="text-lg font-bold text-stone-800">{edu.degree}</h4>
                  <p className="text-sm font-bold text-stone-500">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<CVData>(initialData);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    const element = document.getElementById('cv-preview-content');
    if (!element) return;

    setIsGenerating(true);

    try {
      // If hidden (common on mobile editor tab), switch to preview first
      const isHidden = window.getComputedStyle(element).display === 'none';
      if (isHidden) {
        setActiveTab('preview');
        // Wait for DOM update
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const opt = {
        margin: 0,
        filename: `${(data.personal.name || 'CV').replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          windowWidth: document.documentElement.offsetWidth,
          onclone: (clonedDoc: Document) => {
            // Remove problematic decorative elements for PDF
            const blurs = clonedDoc.querySelectorAll('.blur-3xl');
            blurs.forEach(el => (el as HTMLElement).style.display = 'none');
            
            // Fix any remaining oklch issues by forcing standard colors on key elements
            const preview = clonedDoc.getElementById('cv-preview-content');
            if (preview) {
              preview.style.fontFamily = 'Arial, sans-serif';
            }
          }
        },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      const worker = html2pdf().set(opt).from(element);
      await worker.save();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('There was an error generating the PDF. Please try using the browser Print (Ctrl+P) and select "Save as PDF" instead.');
    } finally {
      setTimeout(() => setIsGenerating(false), 500);
    }
  };

  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addListItem = (list: 'education' | 'experience' | 'references' | 'certificates' | 'skills' | 'qualities' | 'hobbies' | 'languages', item?: any) => {
    setData(prev => {
      const newList = [...(prev[list] as any[])];
      if (typeof item === 'string' || !item) {
        newList.push(item || "");
      } else {
        newList.push({ ...item, id: Math.random().toString(36).substr(2, 9) });
      }
      return { ...prev, [list]: newList };
    });
  };

  const removeListItem = (list: 'education' | 'experience' | 'references' | 'certificates' | 'skills' | 'qualities' | 'hobbies' | 'languages', index: number) => {
    setData(prev => {
      const newList = [...(prev[list] as any[])];
      newList.splice(index, 1);
      return { ...prev, [list]: newList };
    });
  };

  const updateListItem = (list: 'education' | 'experience' | 'references' | 'certificates' | 'skills' | 'qualities' | 'hobbies' | 'languages', index: number, value: any) => {
    setData(prev => {
      const newList = [...(prev[list] as any[])];
      newList[index] = value;
      return { ...prev, [list]: newList };
    });
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-stone-200 py-6 px-8 flex items-center justify-center sticky top-0 z-50">
          <button 
            onClick={() => setShowLanding(false)}
            className="bg-indigo-700 text-white px-10 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-800 transition-all active:scale-95 flex items-center gap-3"
          >
            <Plus size={24} />
            Create CV
          </button>
        </div>

        {/* Template Gallery */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16">
          <div className="max-w-7xl w-full">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-black text-stone-900 mb-2">Choose a Template</h1>
                <p className="text-stone-500">Select a professional design to start building your CV</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                  className="p-3 bg-white border border-stone-200 rounded-full shadow-sm hover:bg-stone-50 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                  className="p-3 bg-white border border-stone-200 rounded-full shadow-sm hover:bg-stone-50 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {themes.map((theme) => (
                <motion.div 
                  key={theme.id}
                  whileHover={{ y: -10 }}
                  className="flex-shrink-0 w-[300px] md:w-[400px] snap-start"
                >
                  <div 
                    onClick={() => {
                      setCurrentTheme(theme);
                      setShowLanding(false);
                    }}
                    className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer border-4 transition-all ${currentTheme.id === theme.id ? 'border-indigo-500' : 'border-transparent hover:border-indigo-200'}`}
                  >
                    {/* Visual Preview Mockup */}
                    <div className="aspect-[1/1.414] bg-stone-100 p-4 relative overflow-hidden">
                      {/* Miniature CV Layout Representation */}
                      <div className="w-full h-full bg-white shadow-sm flex flex-col overflow-hidden">
                        {theme.id === 'kaiva-kweb' ? (
                          <div className="flex flex-col h-full">
                            <div className="h-16 w-full p-2 flex items-center gap-2" style={{ backgroundColor: theme.primary }}>
                              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30"></div>
                              <div className="space-y-1">
                                <div className="h-2 w-20 bg-white/40"></div>
                                <div className="h-1 w-32 bg-white/20"></div>
                              </div>
                            </div>
                            <div className="flex-1 p-3 space-y-4">
                              <div className="h-2 w-1/2 border-b-2" style={{ borderColor: theme.primary }}></div>
                              <div className="space-y-1">
                                <div className="h-1 w-full bg-stone-100"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                              </div>
                              <div className="h-2 w-1/2 border-b-2" style={{ borderColor: theme.primary }}></div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="h-10 bg-stone-50"></div>
                                <div className="h-10 bg-stone-50"></div>
                              </div>
                            </div>
                          </div>
                        ) : theme.id === 'betcy-rickz' ? (
                          <div className="flex flex-col h-full">
                            <div className="h-3 bg-stone-50 flex items-center justify-center border-b border-stone-100">
                              <div className="h-0.5 w-1/4 bg-stone-300"></div>
                            </div>
                            <div className="flex flex-1">
                              <div className="w-[35%] bg-stone-50 flex flex-col">
                                <div className="h-10 w-full" style={{ backgroundColor: theme.primary }}></div>
                                <div className="p-2 space-y-2">
                                  <div className="h-0.5 w-full bg-stone-200"></div>
                                  <div className="space-y-1">
                                    <div className="h-1 w-full bg-stone-100"></div>
                                    <div className="h-1 w-full bg-stone-100"></div>
                                    <div className="h-1 w-2/3 bg-stone-100"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 p-3 space-y-3">
                                <div className="h-2 w-1/3 bg-stone-200 border-b border-stone-100"></div>
                                <div className="space-y-1">
                                  <div className="h-1 w-full bg-stone-100"></div>
                                  <div className="h-1 w-full bg-stone-100"></div>
                                </div>
                                <div className="h-2 w-1/3 bg-stone-200 border-b border-stone-100"></div>
                                <div className="space-y-1">
                                  <div className="h-1 w-full bg-stone-100"></div>
                                  <div className="h-1 w-full bg-stone-100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : theme.id === 'sam-hill' ? (
                          <div className="p-4 space-y-4">
                            <div className="h-3 bg-stone-50 flex items-center justify-center -m-4 mb-4 border-b border-stone-100">
                              <div className="h-0.5 w-1/4 bg-stone-300"></div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-8 w-3/4 bg-stone-900"></div>
                              <div className="h-2 w-full bg-stone-200"></div>
                              <div className="h-0.5 w-full bg-stone-900"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="h-3 w-full bg-stone-800"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-3 w-full bg-stone-200"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                              </div>
                            </div>
                          </div>
                        ) : theme.id === 'peter-madison' ? (
                          <div className="p-4 space-y-4 flex flex-col items-center">
                            <div className="h-3 bg-stone-50 flex items-center justify-center -m-4 mb-4 w-[calc(100%+2rem)] border-b border-stone-100">
                              <div className="h-0.5 w-1/4 bg-stone-300"></div>
                            </div>
                            <div className="h-6 w-1/2 bg-stone-800"></div>
                            <div className="h-2 w-1/3 bg-stone-300"></div>
                            <div className="w-full space-y-3 mt-4">
                              <div className="h-4 w-1/3" style={{ backgroundColor: theme.primary }}></div>
                              <div className="h-10 w-full border border-stone-200"></div>
                              <div className="h-4 w-1/3" style={{ backgroundColor: theme.primary }}></div>
                              <div className="h-10 w-full border border-stone-200"></div>
                            </div>
                          </div>
                        ) : theme.id === 'joanna-brown' ? (
                          <div className="flex h-full">
                            <div className="w-1/3 h-full flex flex-col items-center p-2 space-y-4" style={{ backgroundColor: theme.accent }}>
                              <div className="w-12 h-12 rotate-45 border-2 border-stone-300 bg-white"></div>
                              <div className="h-2 w-full bg-stone-300"></div>
                              <div className="space-y-1 w-full">
                                <div className="h-1 w-full bg-stone-200"></div>
                                <div className="h-1 w-full bg-stone-200"></div>
                              </div>
                            </div>
                            <div className="flex-1 p-4 space-y-6">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-1/2" style={{ backgroundColor: theme.primary }}></div>
                                <div className="h-0.5 flex-1 bg-stone-200"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-stone-200"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-1/2" style={{ backgroundColor: theme.primary }}></div>
                                <div className="h-0.5 flex-1 bg-stone-200"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-stone-200"></div>
                                <div className="h-1 w-full bg-stone-100"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 space-y-4">
                            <div className="h-10 w-2/3 bg-stone-900"></div>
                            <div className="h-0.5 w-full bg-stone-900"></div>
                            <div className="h-4 w-1/2 bg-stone-200"></div>
                            <div className="h-2 w-full bg-stone-100"></div>
                          </div>
                        )}
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-indigo-700 px-6 py-2 rounded-full font-bold shadow-lg">Use Template</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-stone-800">{theme.name}</h3>
                      <p className="text-stone-500 text-sm">{theme.layout?.replace('-', ' ') || 'Classic'} Layout</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 text-center text-stone-400 text-sm">
          © 2026 Mekim CV • Professional Resume Builder
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header - Hidden on Print */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowLanding(true)}
            className="p-2 hover:bg-stone-100 rounded-xl transition-colors text-stone-500"
            title="Back to templates"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-700/20">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Mekim CV</h1>
              <p className="text-xs text-stone-500 font-medium">Professional Resume Builder</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 mr-4 bg-stone-100 p-1 rounded-lg">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setCurrentTheme(t)}
                className={`w-6 h-6 rounded-full transition-all ${currentTheme.id === t.id ? 'ring-2 ring-offset-2 ring-stone-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
                style={{ backgroundColor: t.primary }}
                title={t.name}
              />
            ))}
          </div>
          <div className="bg-stone-100 p-1 rounded-lg flex mr-4">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'editor' ? 'bg-white shadow-sm text-olive-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-olive-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Preview
            </button>
          </div>
          <button 
            onClick={handlePrint}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-95 ${
              isGenerating 
                ? 'bg-stone-400 cursor-not-allowed text-white' 
                : 'bg-olive-700 hover:bg-olive-800 text-white shadow-olive-700/20'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Printer size={18} />
                Print / PDF
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Editor Section */}
        <section className={`lg:col-span-5 space-y-8 print:hidden ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          
          {/* Theme Selector */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Palette className="text-stone-500" size={20} />
                <h2 className="font-bold text-lg">Select Theme</h2>
              </div>
              <button 
                onClick={() => setShowLanding(true)}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Change Template
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTheme(t)}
                  className={`w-full aspect-square rounded-xl transition-all border-2 ${currentTheme.id === t.id ? 'border-indigo-500 scale-110 shadow-md' : 'border-transparent hover:border-stone-200'}`}
                  style={{ backgroundColor: t.primary }}
                  title={t.name}
                />
              ))}
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-olive-700" size={20} />
              <h2 className="font-bold text-xl">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <InputField label="Full Name" value={data.personal.name} onChange={(v) => updatePersonal('name', v)} />
              <div className="space-y-2">
                <InputField label="Photo URL" value={data.personal.photo || ""} onChange={(v) => updatePersonal('photo', v)} />
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer transition-colors text-sm font-medium text-stone-700">
                    <Download size={16} className="rotate-180" />
                    Upload Photo
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updatePersonal('photo', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {data.personal.photo && (
                    <button 
                      onClick={() => updatePersonal('photo', '')}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
              <InputField label="Email" value={data.personal.email} onChange={(v) => updatePersonal('email', v)} />
              <InputField label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal('phone', v)} />
              <InputField label="Address" value={data.personal.address} onChange={(v) => updatePersonal('address', v)} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="DOB" value={data.personal.dob} onChange={(v) => updatePersonal('dob', v)} />
                <InputField label="Gender" value={data.personal.gender} onChange={(v) => updatePersonal('gender', v)} />
              </div>
              <InputField label="Location" value={data.personal.location} onChange={(v) => updatePersonal('location', v)} />
              <InputField label="LinkedIn" value={data.personal.linkedin} onChange={(v) => updatePersonal('linkedin', v)} />
            </div>
          </div>

          {/* Profile & Goals */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-olive-700" size={20} />
              <h2 className="font-bold text-xl">Profile & Goals</h2>
            </div>
            <div className="space-y-4">
              <TextAreaField label="Profile Summary" value={data.profile} onChange={(v) => setData(prev => ({ ...prev, profile: v }))} />
              <TextAreaField label="Career Goals" value={data.goals} onChange={(v) => setData(prev => ({ ...prev, goals: v }))} />
            </div>
          </div>

          {/* Education */}
          <ListSection 
            title="Education" 
            icon={<GraduationCap size={20} />} 
            items={data.education}
            onAdd={() => addListItem('education', { school: '', degree: '', year: '' })}
            onRemove={(i) => removeListItem('education', i)}
            renderItem={(item, i) => (
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <InputField label="Degree" value={item.degree} onChange={(v) => updateListItem('education', i, { ...item, degree: v })} />
                <InputField label="School/University" value={item.school} onChange={(v) => updateListItem('education', i, { ...item, school: v })} />
                <InputField label="Year" value={item.year} onChange={(v) => updateListItem('education', i, { ...item, year: v })} />
              </div>
            )}
          />

          {/* Work Experience */}
          <ListSection 
            title="Work Experience" 
            icon={<Briefcase size={20} />} 
            items={data.experience}
            onAdd={() => addListItem('experience', { company: '', role: '', year: '', description: '' })}
            onRemove={(i) => removeListItem('experience', i)}
            renderItem={(item, i) => (
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <InputField label="Role" value={item.role} onChange={(v) => updateListItem('experience', i, { ...item, role: v })} />
                <InputField label="Company" value={item.company} onChange={(v) => updateListItem('experience', i, { ...item, company: v })} />
                <InputField label="Year" value={item.year} onChange={(v) => updateListItem('experience', i, { ...item, year: v })} />
                <TextAreaField label="Description" value={item.description} onChange={(v) => updateListItem('experience', i, { ...item, description: v })} />
              </div>
            )}
          />

          {/* Skills, Qualities, Hobbies, Certificates, Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListSection 
              title="Skills" 
              icon={<Award size={20} />} 
              items={data.skills}
              onAdd={() => addListItem('skills', { name: '', level: 80 })}
              onRemove={(i) => removeListItem('skills', i)}
              renderItem={(item, i) => (
                <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <InputField label="Skill Name" value={item.name} onChange={(v) => updateListItem('skills', i, { ...item, name: v })} />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Level ({item.level}%)</label>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={item.level} 
                      onChange={(e) => updateListItem('skills', i, { ...item, level: parseInt(e.target.value) })}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-olive-700"
                    />
                  </div>
                </div>
              )}
            />
            <ListSection 
              title="Languages" 
              icon={<Globe size={20} />} 
              items={data.languages}
              onAdd={() => addListItem('languages', { name: '', level: 'Fluent' })}
              onRemove={(i) => removeListItem('languages', i)}
              renderItem={(item, i) => (
                <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <InputField label="Language" value={item.name} onChange={(v) => updateListItem('languages', i, { ...item, name: v })} />
                  <InputField label="Level (e.g. Fluent, Native)" value={item.level} onChange={(v) => updateListItem('languages', i, { ...item, level: v })} />
                </div>
              )}
            />
            <SimpleListSection title="Qualities" items={data.qualities} onAdd={() => addListItem('qualities')} onRemove={(i) => removeListItem('qualities', i)} onUpdate={(i, v) => updateListItem('qualities', i, v)} />
            <SimpleListSection title="Hobbies" items={data.hobbies} onAdd={() => addListItem('hobbies')} onRemove={(i) => removeListItem('hobbies', i)} onUpdate={(i, v) => updateListItem('hobbies', i, v)} />
            <SimpleListSection title="Certificates" items={data.certificates} onAdd={() => addListItem('certificates')} onRemove={(i) => removeListItem('certificates', i)} onUpdate={(i, v) => updateListItem('certificates', i, v)} />
          </div>

          {/* References */}
          <ListSection 
            title="References" 
            icon={<UserCheck size={20} />} 
            items={data.references}
            onAdd={() => addListItem('references', { name: '', position: '', contact: '' })}
            onRemove={(i) => removeListItem('references', i)}
            renderItem={(item, i) => (
              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <InputField label="Name" value={item.name} onChange={(v) => updateListItem('references', i, { ...item, name: v })} />
                <InputField label="Position" value={item.position} onChange={(v) => updateListItem('references', i, { ...item, position: v })} />
                <InputField label="Contact Info" value={item.contact} onChange={(v) => updateListItem('references', i, { ...item, contact: v })} />
              </div>
            )}
          />

          {/* Declaration */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-olive-700" size={20} />
              <h2 className="font-bold text-xl">Declaration</h2>
            </div>
            <TextAreaField label="Declaration Text" value={data.declaration} onChange={(v) => setData(prev => ({ ...prev, declaration: v }))} />
          </div>

        </section>

        {/* Preview Section */}
        <section className={`lg:col-span-7 flex justify-center ${activeTab === 'editor' ? 'hidden lg:flex' : ''}`}>
          <div className="sticky top-28 w-full max-w-[210mm] h-fit">
            <div 
              ref={previewRef}
              className="bg-white shadow-2xl w-full min-h-[297mm] flex flex-col print:shadow-none print:m-0"
              id="cv-preview"
            >
              <div id="cv-preview-content" className="flex flex-col flex-1 min-h-[297mm]">
                <style>{`
                  #cv-preview-content section {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                    margin-bottom: 2.5rem;
                    display: block;
                    width: 100%;
                  }
                  #cv-preview-content h3 {
                    break-after: avoid !important;
                    page-break-after: avoid !important;
                    margin-bottom: 1rem;
                  }
                  #cv-preview-content li, #cv-preview-content .flex {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                  }
                  /* Ensure sidebar sections also don't break */
                  #cv-preview-content .sidebar-section {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                    margin-bottom: 2rem;
                  }
                `}</style>
                {/* Header with Title */}
                <div className="py-2 text-center border-b border-stone-100" style={{ backgroundColor: currentTheme.sidebarBg }}>
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-50" style={{ color: currentTheme.primary }}>RESUME(CV)</span>
                </div>

                <div className="flex flex-1">
                  {currentTheme.layout === 'modern-green' ? (
                    <ModernGreenLayout data={data} currentTheme={currentTheme} />
                  ) : currentTheme.layout === 'clean-white' ? (
                    <CleanWhiteLayout data={data} currentTheme={currentTheme} />
                  ) : currentTheme.layout === 'timeline-centered' ? (
                    <TimelineCenteredLayout data={data} currentTheme={currentTheme} />
                  ) : currentTheme.layout === 'modern-minimal' ? (
                    <ModernMinimalLayout data={data} currentTheme={currentTheme} />
                  ) : currentTheme.layout === 'blue-header' ? (
                    <BlueHeaderLayout data={data} currentTheme={currentTheme} />
                  ) : (
                    <DefaultLayout data={data} currentTheme={currentTheme} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Print Specific Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white; }
          main { display: block; padding: 0; margin: 0; max-width: none; }
          .print\\:hidden { display: none !important; }
          #cv-preview { 
            width: 100%; 
            height: auto; 
            box-shadow: none; 
            margin: 0; 
            padding: 0;
            position: static !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        :root {
          --color-olive-50: #f7f7f2;
          --color-olive-100: #ecece0;
          --color-olive-200: #d9d9c1;
          --color-olive-300: #c1c199;
          --color-olive-400: #a8a873;
          --color-olive-500: #8f8f52;
          --color-olive-600: #757540;
          --color-olive-700: #5a5a32;
          --color-olive-800: #4a4a2a;
          --color-olive-900: #3a3a22;
        }
        .bg-olive-700 { background-color: var(--color-olive-700); }
        .bg-olive-800 { background-color: var(--color-olive-800); }
        .bg-olive-900 { background-color: var(--color-olive-900); }
        .text-olive-700 { color: var(--color-olive-700); }
        .text-olive-800 { color: var(--color-olive-800); }
        .border-olive-200 { border-color: var(--color-olive-200); }
        .selection\\:bg-olive-200::selection { background-color: var(--color-olive-200); }
      `}} />
    </div>
  );
}

// --- Sub-components ---

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-olive-700/20 focus:border-olive-700 outline-none transition-all"
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">{label}</label>
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-olive-700/20 focus:border-olive-700 outline-none transition-all resize-none"
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    </div>
  );
}

function SidebarItem({ icon, text, theme }: { icon: React.ReactNode, text: string, theme?: Theme }) {
  if (!text) return null;
  return (
    <li className="flex items-start gap-3 group">
      <div 
        className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
        style={{ color: theme?.primary || '#5a5a32' }}
      >
        {icon}
      </div>
      <span className="text-xs text-stone-600 leading-tight">{text}</span>
    </li>
  );
}

function ListSection({ title, icon, items, onAdd, onRemove, renderItem }: { 
  title: string, 
  icon: React.ReactNode, 
  items: any[], 
  onAdd: () => void, 
  onRemove: (i: number) => void,
  renderItem: (item: any, i: number) => React.ReactNode
}) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-olive-700">{icon}</div>
          <h2 className="font-bold text-xl">{title}</h2>
        </div>
        <button 
          onClick={onAdd}
          className="p-2 bg-olive-50 text-olive-700 rounded-xl hover:bg-olive-100 transition-colors active:scale-90"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.div 
              key={item.id || i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative group"
            >
              <button 
                onClick={() => onRemove(i)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-100"
              >
                <Trash2 size={14} />
              </button>
              {renderItem(item, i)}
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <p className="text-center py-6 text-stone-400 text-sm italic border-2 border-dashed border-stone-100 rounded-2xl">
            No items added yet. Click the plus button to add.
          </p>
        )}
      </div>
    </div>
  );
}

function SimpleListSection({ title, items, onAdd, onRemove, onUpdate }: { 
  title: string, 
  items: string[], 
  onAdd: () => void, 
  onRemove: (i: number) => void,
  onUpdate: (i: number, v: string) => void
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <button 
          onClick={onAdd}
          className="p-1.5 bg-olive-50 text-olive-700 rounded-lg hover:bg-olive-100 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 group">
            <input 
              type="text" 
              value={item} 
              onChange={(e) => onUpdate(i, e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-olive-700/20 focus:border-olive-700 outline-none transition-all"
              placeholder={`Add ${title.toLowerCase()}...`}
            />
            <button 
              onClick={() => onRemove(i)}
              className="p-1.5 text-stone-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
