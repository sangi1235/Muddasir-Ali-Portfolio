import React from 'react';
import { Mail, Phone, MapPin, Github, Printer, ArrowLeft, GraduationCap, Briefcase, Award } from 'lucide-react';
import { RESUME_DATA } from '../constants';
import { Button } from '../components/Button';

interface ResumeViewProps {
  onClose: () => void;
}

const ResumeView: React.FC<ResumeViewProps> = ({ onClose }) => {
  return (
    <div className="resume-view min-h-screen bg-white text-slate-900 p-4 sm:p-8 md:p-12 font-serif max-w-4xl mx-auto">
      {/* Floating Controls (Hidden in Print) */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 flex gap-2 sm:gap-4 no-print z-50">
        <Button onClick={() => window.print()} variant="primary" icon={<Printer size={16} />}>
          <span className="hidden sm:inline">Print / Save PDF</span>
        </Button>
        <Button onClick={onClose} variant="secondary" icon={<ArrowLeft size={16} />}>
          <span className="hidden sm:inline">Back</span>
        </Button>
      </div>

      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-6 mb-8 text-center mt-12 sm:mt-0">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-2">{RESUME_DATA.name}</h1>
        <p className="text-lg sm:text-xl text-slate-600 font-medium mb-4">{RESUME_DATA.title}</p>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm text-slate-700">
          <span className="flex items-center gap-1"><Mail size={14} /> {RESUME_DATA.email}</span>
          <span className="flex items-center gap-1"><Phone size={14} /> {RESUME_DATA.phone}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {RESUME_DATA.location}</span>
          <span className="flex items-center gap-1"><Github size={14} /> {RESUME_DATA.github}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-800 tracking-wider">Profile Summary</h2>
        <p className="text-slate-700 leading-relaxed text-justify text-sm sm:text-base">
          {RESUME_DATA.profileSummary}
        </p>
      </section>

      {/* Skills */}
      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-800 tracking-wider">Technical Skills</h2>
        <div className="grid grid-cols-1 gap-4 text-sm sm:text-base">
          {RESUME_DATA.skills.map((category, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-1 sm:gap-2">
              <span className="font-bold text-slate-900 min-w-[120px]">{category.title}:</span>
              <span className="text-slate-700 flex-1">{category.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-800 tracking-wider flex items-center gap-2">
          Experience
        </h2>
        {RESUME_DATA.experience.map((exp, idx) => (
          <div key={idx} className="mb-4 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
              <h3 className="text-md font-bold text-slate-900">{exp.role}</h3>
              <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded mt-1 sm:mt-0 w-fit">{exp.duration}</span>
            </div>
            <ul className="list-disc list-outside ml-5 text-slate-700 space-y-1">
              {exp.details.map((detail, dIdx) => (
                <li key={dIdx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-800 tracking-wider">Featured Projects</h2>
        <div className="space-y-5 text-sm sm:text-base">
          {RESUME_DATA.projects.map((project, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-slate-900">{project.title}</h3>
                {project.liveLink && project.liveLink !== '#' && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline no-print">Live Link</a>
                )}
              </div>
              <p className="text-slate-700 text-sm mb-1">{project.description}</p>
              <p className="text-xs text-slate-500 italic">Tech: {project.tags.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 break-inside-avoid">
        {/* Education */}
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-800 tracking-wider">Education</h2>
          {RESUME_DATA.education.map((edu, idx) => (
            <div key={idx} className="mb-2 text-sm sm:text-base">
              <h3 className="font-bold text-slate-900">{edu.degree}</h3>
              <div className="flex justify-between text-sm text-slate-600">
                <span>{edu.location}</span>
                <span className="italic">{edu.status}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Certifications & Languages */}
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-800 tracking-wider">Certs & Languages</h2>
          <div className="mb-4">
            <h4 className="font-bold text-sm text-slate-900 mb-1">Certifications</h4>
            <ul className="list-disc list-inside text-sm text-slate-700">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">Languages</h4>
            <p className="text-sm text-slate-700">{RESUME_DATA.languages.join(', ')}</p>
          </div>
        </section>
      </div>

      <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
        Generated from {RESUME_DATA.name}'s Interactive Portfolio
      </footer>
    </div>
  );
};

export default ResumeView;