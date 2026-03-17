/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Globe, Linkedin, 
  Plus, Trash2, Download, Printer, Briefcase, GraduationCap, 
  Award, CheckCircle, Heart, Target, FileText, UserCheck,
  ChevronLeft, ChevronRight, Palette
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
  };
  profile: string;
  goals: string;
  education: Education[];
  experience: Experience[];
  certificates: string[];
  skills: string[];
  qualities: string[];
  hobbies: string[];
  references: Reference[];
  declaration: string;
}

// --- Initial Data ---

const initialData: CVData = {
  personal: {
    name: "BETCY RICKZ",
    email: "brickz@gmail.com",
    phone: "70183552",
    address: "C-/ Kaiva Kweb, MILUM Services, PO Box 292, Tabubil",
    dob: "June 17, 2002",
    gender: "Female",
    linkedin: "linkedin.com/in/betcy-rickz",
    location: "Oksapmin",
  },
  profile: "I am a motivated and responsible student currently working on improving academic results while preparing for further education. Seeking a part-time position where I can develop practical skills, contribute positively to a team, and gain work experience. I am known for being reliable, quick to learn, and having a strong work ethic. I can blend in any work environment.",
  goals: "To secure a challenging position in a reputable organization where I can utilize my technical skills and contribute to the growth of the company while enhancing my professional knowledge.",
  education: [
    { id: '1', school: "Telefomin Secondary School, Tabubil", degree: "Gr 12 Certificate", year: "2024 - 2025" },
    { id: '2', school: "Oksapmin Secondary Schooool, Tabubil", degree: "Gr 10 Certifcate", year: "2022 - 2023" }
  ],
  experience: [
    { id: '1', company: "Local Community Center", role: "Volunteer Assistant", year: "2023 - Present", description: "Assisted in organizing community events and managing administrative tasks." }
  ],
  certificates: ["GR 12 Certifcate", "Gr 10 Certificate"],
  skills: ["Basic Computing", "Interpersonal skills", "Strong communication", "Fast learner and adaptable"],
  qualities: ["Problem-solving ability", "Team collaboration skills", "Strong communication skills", "Time management proficiency", "Continuous learning mindset"],
  hobbies: ["Playing soccer", "Reading books", "Cooking"],
  references: [
    { id: '1', name: "John Doe", position: "Principal, Telefomin Secondary", contact: "john.doe@email.com / +675 1234567" }
  ],
  declaration: "I hereby declare that all the information provided above is true to the best of my knowledge and belief."
};

const themes: Theme[] = [
  {
    id: 'olive',
    name: 'Classic Olive',
    primary: '#5a5a32',
    secondary: '#4a4a2a',
    accent: '#d9d9c1',
    sidebarBg: '#f7f7f2',
    textMain: '#1c1917',
    textSidebar: '#4a4a2a'
  },
  {
    id: 'navy',
    name: 'Professional Navy',
    primary: '#1e293b',
    secondary: '#0f172a',
    accent: '#cbd5e1',
    sidebarBg: '#f8fafc',
    textMain: '#0f172a',
    textSidebar: '#1e293b'
  },
  {
    id: 'slate',
    name: 'Modern Slate',
    primary: '#334155',
    secondary: '#1e293b',
    accent: '#e2e8f0',
    sidebarBg: '#f1f5f9',
    textMain: '#1e293b',
    textSidebar: '#334155'
  },
  {
    id: 'rose',
    name: 'Elegant Rose',
    primary: '#881337',
    secondary: '#4c0519',
    accent: '#fce7f3',
    sidebarBg: '#fff1f2',
    textMain: '#4c0519',
    textSidebar: '#881337'
  },
  {
    id: 'charcoal',
    name: 'Charcoal Dark',
    primary: '#171717',
    secondary: '#0a0a0a',
    accent: '#404040',
    sidebarBg: '#f5f5f5',
    textMain: '#171717',
    textSidebar: '#262626'
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#064e3b',
    secondary: '#065f46',
    accent: '#d1fae5',
    sidebarBg: '#f0fdf4',
    textMain: '#064e3b',
    textSidebar: '#065f46'
  },
  {
    id: 'gold',
    name: 'Golden Amber',
    primary: '#78350f',
    secondary: '#92400e',
    accent: '#fef3c7',
    sidebarBg: '#fffbeb',
    textMain: '#78350f',
    textSidebar: '#92400e'
  },
  {
    id: 'sky',
    name: 'Sky Blue',
    primary: '#0c4a6e',
    secondary: '#075985',
    accent: '#e0f2fe',
    sidebarBg: '#f0f9ff',
    textMain: '#0c4a6e',
    textSidebar: '#075985'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Gray',
    primary: '#262626',
    secondary: '#404040',
    accent: '#e5e5e5',
    sidebarBg: '#fafafa',
    textMain: '#262626',
    textSidebar: '#404040'
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    primary: '#1e1b4b',
    secondary: '#312e81',
    accent: '#c7d2fe',
    sidebarBg: '#eef2ff',
    textMain: '#1e1b4b',
    textSidebar: '#312e81'
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    primary: '#7c2d12',
    secondary: '#9a3412',
    accent: '#ffedd5',
    sidebarBg: '#fff7ed',
    textMain: '#7c2d12',
    textSidebar: '#9a3412'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    primary: '#4c1d95',
    secondary: '#5b21b6',
    accent: '#ede9fe',
    sidebarBg: '#f5f3ff',
    textMain: '#4c1d95',
    textSidebar: '#5b21b6'
  },
  {
    id: 'maroon',
    name: 'Deep Maroon',
    primary: '#7f1d1d',
    secondary: '#991b1b',
    accent: '#fee2e2',
    sidebarBg: '#fef2f2',
    textMain: '#7f1d1d',
    textSidebar: '#991b1b'
  },
  {
    id: 'onyx',
    name: 'Onyx Black',
    primary: '#000000',
    secondary: '#1a1a1a',
    accent: '#ffffff',
    sidebarBg: '#ffffff',
    textMain: '#000000',
    textSidebar: '#1a1a1a'
  },
  {
    id: 'ocean',
    name: 'Ocean Deep',
    primary: '#003366',
    secondary: '#004080',
    accent: '#e6f2ff',
    sidebarBg: '#f0f8ff',
    textMain: '#003366',
    textSidebar: '#004080'
  },
  {
    id: 'coffee',
    name: 'Coffee Roast',
    primary: '#3e2723',
    secondary: '#4e342e',
    accent: '#efebe9',
    sidebarBg: '#fafafa',
    textMain: '#3e2723',
    textSidebar: '#4e342e'
  },
  {
    id: 'forest',
    name: 'Forest Green',
    primary: '#14532d',
    secondary: '#166534',
    accent: '#dcfce7',
    sidebarBg: '#f0fdf4',
    textMain: '#14532d',
    textSidebar: '#166534'
  },
  {
    id: 'plum',
    name: 'Royal Plum',
    primary: '#581c87',
    secondary: '#6b21a8',
    accent: '#f3e8ff',
    sidebarBg: '#faf5ff',
    textMain: '#581c87',
    textSidebar: '#6b21a8'
  }
];

// --- Components ---

export default function App() {
  const [data, setData] = useState<CVData>(initialData);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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

  const addListItem = (list: 'education' | 'experience' | 'references' | 'certificates' | 'skills' | 'qualities' | 'hobbies', item?: any) => {
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

  const removeListItem = (list: 'education' | 'experience' | 'references' | 'certificates' | 'skills' | 'qualities' | 'hobbies', index: number) => {
    setData(prev => {
      const newList = [...(prev[list] as any[])];
      newList.splice(index, 1);
      return { ...prev, [list]: newList };
    });
  };

  const updateListItem = (list: 'education' | 'experience' | 'references' | 'certificates' | 'skills' | 'qualities' | 'hobbies', index: number, value: any) => {
    setData(prev => {
      const newList = [...(prev[list] as any[])];
      newList[index] = value;
      return { ...prev, [list]: newList };
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-olive-200">
      {/* Header - Hidden on Print */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-olive-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-olive-700/20">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Modern CV Maker</h1>
            <p className="text-xs text-stone-500 font-medium">Create your professional resume in minutes</p>
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
          
          {/* Theme Selector Mobile */}
          <div className="lg:hidden bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-stone-500" size={20} />
              <h2 className="font-bold text-lg">Select Theme</h2>
            </div>
            <div className="flex gap-4">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTheme(t)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border-2 ${currentTheme.id === t.id ? 'border-stone-900 bg-stone-50' : 'border-transparent bg-stone-100 text-stone-500'}`}
                  style={{ color: currentTheme.id === t.id ? t.primary : undefined }}
                >
                  {t.name.split(' ')[1]}
                </button>
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

          {/* Skills, Qualities, Hobbies, Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SimpleListSection title="Skills" items={data.skills} onAdd={() => addListItem('skills')} onRemove={(i) => removeListItem('skills', i)} onUpdate={(i, v) => updateListItem('skills', i, v)} />
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
                {/* Header with Title */}
                <div className="py-2 text-center border-b border-stone-100" style={{ backgroundColor: currentTheme.sidebarBg }}>
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-50" style={{ color: currentTheme.primary }}>RESUME(CV)</span>
                </div>

                <div className="flex flex-1">
                  {/* Left Sidebar */}
                  <div className="w-[35%] border-r border-stone-100 flex flex-col" style={{ backgroundColor: currentTheme.sidebarBg }}>
                    {/* Name Banner */}
                    <div className="p-8 pt-12 text-center relative overflow-hidden" style={{ backgroundColor: currentTheme.primary, color: 'white' }}>
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                      </div>
                      <h2 className="font-bold text-2xl tracking-wider uppercase relative z-10">{data.personal.name || "YOUR NAME"}</h2>
                      <div className="w-12 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
                    </div>

                    <div className="p-6 space-y-10">
                      {/* Personal Details */}
                      <div className="sidebar-section">
                        <h3 className="font-bold text-lg mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Personal details</h3>
                        <ul className="space-y-5">
                          <SidebarItem icon={<User size={14} />} text={data.personal.name} theme={currentTheme} />
                          <SidebarItem icon={<Mail size={14} />} text={data.personal.email} theme={currentTheme} />
                          <SidebarItem icon={<Phone size={14} />} text={data.personal.phone} theme={currentTheme} />
                          <SidebarItem icon={<MapPin size={14} />} text={data.personal.address} theme={currentTheme} />
                          <SidebarItem icon={<Calendar size={14} />} text={data.personal.dob} theme={currentTheme} />
                          <SidebarItem icon={<MapPin size={14} />} text={data.personal.location} theme={currentTheme} />
                          <SidebarItem icon={<User size={14} />} text={data.personal.gender} theme={currentTheme} />
                          <SidebarItem icon={<Linkedin size={14} />} text={data.personal.linkedin} theme={currentTheme} />
                        </ul>
                      </div>

                      {/* Qualities */}
                      {data.qualities.length > 0 && (
                        <div className="sidebar-section">
                          <h3 className="font-bold text-lg mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Qualities</h3>
                          <ul className="space-y-3">
                            {data.qualities.map((q, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
                                <div className="w-2 h-2 mt-1.5 shrink-0" style={{ backgroundColor: currentTheme.primary }}></div>
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Hobbies */}
                      {data.hobbies.length > 0 && (
                        <div className="sidebar-section">
                          <h3 className="font-bold text-lg mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Hobbies</h3>
                          <ul className="space-y-3">
                            {data.hobbies.map((h, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
                                <div className="w-2 h-2 mt-1.5 shrink-0" style={{ backgroundColor: currentTheme.primary }}></div>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Bottom Decoration */}
                    <div className="mt-auto p-8" style={{ opacity: 0.2 }}>
                      <div className="w-full h-24 rounded-t-[100px]" style={{ backgroundColor: currentTheme.secondary }}></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-10 space-y-12" style={{ color: currentTheme.textMain }}>
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
                    {/* Profile */}
                    <section>
                      <h3 className="font-medium text-2xl mb-4 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Profile</h3>
                      <p className="text-sm leading-relaxed">{data.profile}</p>
                    </section>

                    {/* Career Goals */}
                    {data.goals && (
                      <section>
                        <h3 className="font-medium text-2xl mb-4 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Career Goals</h3>
                        <p className="text-sm leading-relaxed">{data.goals}</p>
                      </section>
                    )}

                    {/* Education */}
                    <section>
                      <h3 className="font-medium text-2xl mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Education</h3>
                      <div className="space-y-6">
                        {data.education.map((edu, i) => (
                          <div key={i} className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-stone-800 text-sm">{edu.degree}</h4>
                              <p className="text-stone-400 text-xs mt-1 italic">{edu.school}</p>
                            </div>
                            <span className="text-stone-800 font-bold text-xs">{edu.year}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Experience */}
                    {data.experience.length > 0 && (
                      <section>
                        <h3 className="font-medium text-2xl mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Work Experience</h3>
                        <div className="space-y-8">
                          {data.experience.map((exp, i) => (
                            <div key={i} className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-bold text-stone-800 text-sm">{exp.role}</h4>
                                <p className="text-stone-400 text-xs mt-1 italic">{exp.company}</p>
                                <p className="text-stone-600 text-xs mt-3 leading-relaxed">{exp.description}</p>
                              </div>
                              <span className="text-stone-800 font-bold text-xs ml-4 shrink-0">{exp.year}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Certificates */}
                    {data.certificates.length > 0 && (
                      <section>
                        <h3 className="font-medium text-2xl mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Certificates</h3>
                        <ul className="space-y-3">
                          {data.certificates.map((cert, i) => (
                            <li key={i} className="text-stone-800 font-bold text-sm">{cert}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Skills */}
                    {data.skills.length > 0 && (
                      <section>
                        <h3 className="font-medium text-2xl mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Skills</h3>
                        <ul className="space-y-4">
                          {data.skills.map((skill, i) => (
                            <li key={i} className="text-stone-800 font-bold text-sm">{skill}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* References */}
                    {data.references.length > 0 && (
                      <section>
                        <h3 className="font-medium text-2xl mb-6 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Reference</h3>
                        <div className="space-y-6">
                          {data.references.map((ref, i) => (
                            <div key={i}>
                              <h4 className="font-bold text-stone-800 text-sm">{ref.name}</h4>
                              <p className="text-stone-500 text-xs mt-1">{ref.position}</p>
                              <p className="text-stone-400 text-xs mt-1 italic">{ref.contact}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Declaration */}
                    {data.declaration && (
                      <section className="pt-4">
                        <h3 className="font-medium text-2xl mb-4 border-b pb-2" style={{ color: currentTheme.primary, borderColor: currentTheme.accent }}>Declaration</h3>
                        <p className="text-stone-600 text-xs italic leading-relaxed">{data.declaration}</p>
                        <div className="mt-10 flex justify-between items-end">
                          <div className="text-center">
                            <div className="w-32 border-b border-stone-300 mb-2"></div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-widest">Date</span>
                          </div>
                          <div className="text-center">
                            <div className="w-32 border-b border-stone-300 mb-2"></div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-widest">Signature</span>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
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
