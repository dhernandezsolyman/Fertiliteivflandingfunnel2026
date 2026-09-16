import { ArrowRight, MapPin, Award, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useScrollToTop } from '../components/ScrollToTop';
import { Footer } from '../components/Footer';
import { fullLogoDark } from '../components/logos';

import p01 from '@/imports/p01.jpg';
import p02 from '@/imports/p02.jpg';
import p03 from '@/imports/p03.jpg';
import p04 from '@/imports/p04.jpg';
import p05 from '@/imports/p05.jpg';
import p06 from '@/imports/p06.jpg';
import p07 from '@/imports/p07.jpg';
import p08 from '@/imports/p08.jpg';
import p09 from '@/imports/p09.jpg';
import p10 from '@/imports/p10.jpg';
import p11 from '@/imports/p11.jpg';
import p12 from '@/imports/p12.jpg';
import p13 from '@/imports/p13.jpg';
import p14 from '@/imports/p14.jpg';
import p15 from '@/imports/p15.jpg';
import p16 from '@/imports/p16.jpg';
import p17 from '@/imports/p17.jpg';
import p19 from '@/imports/p19.jpg';
import p20 from '@/imports/p20.jpg';
import p21 from '@/imports/p21.jpg';
import p22 from '@/imports/p22.jpg';
import p23 from '@/imports/p23.jpg';
import p24 from '@/imports/p24.jpg';
import p25 from '@/imports/p25.jpg';
import p26 from '@/imports/p26.jpg';
import p27 from '@/imports/p27.jpg';
import p28 from '@/imports/p28.jpg';
import p29 from '@/imports/p29.jpg';
import p30 from '@/imports/p30.jpg';
import p31 from '@/imports/p31.jpg';
import p32 from '@/imports/p32.jpg';
import p33 from '@/imports/p33.jpg';
import p34 from '@/imports/p34.jpg';
import p35 from '@/imports/p35.jpg';
import p36 from '@/imports/p36.jpg';
import p37 from '@/imports/p37.jpg';
import p38 from '@/imports/p38.jpg';
import p39 from '@/imports/p39.jpg';
import p40 from '@/imports/p40.jpg';
import p41 from '@/imports/p41.jpg';
import p42 from '@/imports/p42.jpg';
import p43 from '@/imports/p43.jpg';
import p44 from '@/imports/p44.jpg';
import p45 from '@/imports/p45.jpg';
import p46 from '@/imports/p46.jpg';
import p47 from '@/imports/p47.jpg';
import p48 from '@/imports/p48.jpg';
import p49 from '@/imports/p49.jpg';
import pict1 from '@/imports/pict_1.jpg';

const allPhotos = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10,
  p11, p12, p13, p14, p15, p16, p17, p19, p20,
  p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p36, p37, p38, p39, p40,
  p41, p42, p43, p44, p45, p46, p47, p48, p49, pict1,
];

function chunkIntoColumns(photos: string[], cols: number): string[][] {
  const columns: string[][] = Array.from({ length: cols }, () => []);
  photos.forEach((p, i) => columns[i % cols].push(p));
  return columns;
}

const columns = chunkIntoColumns(allPhotos, 5);

export function Landing() {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero */}
      <div className="relative bg-teal-900 text-white overflow-hidden" style={{ minHeight: '520px' }}>

        {/* Scrolling photo collage */}
        <div className="absolute inset-0 flex gap-1.5 overflow-hidden">
          {columns.map((col, ci) => (
            <div
              key={ci}
              className="flex flex-col gap-1.5 flex-1 min-w-0"
            >
              {col.map((src, pi) => (
                <div key={pi} className="relative w-full flex-shrink-0" style={{ paddingBottom: '120%' }}>
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={pi < 10 ? 'eager' : 'lazy'}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-900/80 to-teal-900/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-teal-900/60 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 md:py-28">
          <div className="max-w-xl">
            <img src={fullLogoDark} alt="Fertilite" className="h-10 sm:h-14 w-auto max-w-full mb-4 sm:mb-8" />

            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-4 sm:mb-6">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Hospital Cyntar, Tijuana</span>
            </div>

            <h1 className="text-[1.625rem] leading-snug sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-5">
              Welcome to Fertilite Tijuana
            </h1>

            <p className="text-[0.9375rem] sm:text-lg md:text-xl text-teal-100 mb-5 sm:mb-8 leading-relaxed">
              Tijuana{"'"}s original cross-border IVF clinic. Want to learn more? Answer a brief set of questions and a patient coordinator will get in touch with you.
            </p>

            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-10">
              {[
                { icon: Heart, text: 'Single-cycle and multi-cycle options' },
                { icon: Award, text: 'Board-certified, US-trained specialists' },
                { icon: Shield, text: '40-60% savings vs. US clinics' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-900" />
                  </div>
                  <p className="text-sm sm:text-base text-teal-50">{text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/step-1')}
              className="group w-full sm:w-auto bg-white text-teal-900 px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center sm:justify-start gap-2"
            >
              Click Here to Get Started
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>

            <p className="text-xs sm:text-sm text-teal-200 mt-2.5 sm:mt-4 text-center sm:text-left">
              Takes 2 minutes • No account required
            </p>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-gray-50 border-y border-gray-100 py-5 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { value: '19+', label: 'Years Experience' },
              { value: '3,200+', label: 'Successful Cycles' },
              { value: '40-60%', label: 'Cost Savings' },
              { value: '5 min', label: 'From San Diego' },
            ].map(({ value, label }) => (
              <div key={label} className="py-1">
                <div className="text-xl sm:text-3xl font-semibold text-teal-900 mb-0.5">{value}</div>
                <div className="text-[0.6875rem] sm:text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-900 mb-2 sm:mb-4 leading-snug">
              IVF Shouldn{"'"}t Feel Like a High-Stakes Bet
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Many patients worry one cycle won{"'"}t be enough—but feel forced to commit without a backup plan. Fertilite offers a different approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2.5 sm:mb-3">Traditional Approach</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                {[
                  'No clear path if first cycle fails',
                  'High pressure on each attempt',
                  'Surprise costs for additional cycles',
                  'Starting over feels daunting',
                ].map((text) => (
                  <li key={text} className="flex gap-2 sm:gap-3">
                    <span className="text-gray-400 flex-shrink-0">→</span>
                    <span className="text-sm sm:text-base">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 rounded-2xl p-4 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-xl font-semibold text-teal-900 mb-2.5 sm:mb-3">Fertilite{"'"}s Structured Path</h3>
              <ul className="space-y-2 sm:space-y-3 text-teal-900">
                {[
                  'Clear treatment plan with options',
                  'Less pressure on single attempts',
                  'Transparent multi-cycle pricing',
                  'Peace of mind built in',
                ].map((text) => (
                  <li key={text} className="flex gap-2 sm:gap-3">
                    <span className="text-teal-600 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-12">
            <button
              onClick={() => navigate('/step-1')}
              className="group w-full sm:w-auto bg-teal-600 text-white px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-[0.9375rem] sm:text-lg shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
            >
              Discover Which Path Fits You
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
