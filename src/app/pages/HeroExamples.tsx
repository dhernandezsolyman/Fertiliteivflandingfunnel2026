import { ArrowRight, MapPin, Award, Shield, Heart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { fullLogoDark } from '../components/logos';

const IMAGES = {
  couple: "https://images.unsplash.com/photo-1768776182086-b351e32b63ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMGV4cGVjdGluZyUyMGJhYnl8ZW58MXx8fHwxNzc0NTY2NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  doctor: "https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9uJTIwcGF0aWVudHxlbnwxfHx8fDE3NzQ1NjY1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hospital: "https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGxvYmJ5JTIwY2xlYW58ZW58MXx8fHwxNzc0NTY2NTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  baby: "https://images.unsplash.com/photo-1704241185727-04eaf67c70be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMG1vdGhlciUyMGpveXxlbnwxfHx8fDE3NzQ1NjY1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  lab: "https://images.unsplash.com/photo-1601839215170-6ce5854968d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzQ1MjQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  reception: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGluaWMlMjByZWNlcHRpb24lMjBhcmVhfGVufDF8fHx8MTc3NDUzNjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hands: "https://images.unsplash.com/photo-1767708235686-13b44d84c422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBob3BlfGVufDF8fHx8MTc3NDU2NjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

function FertiliteLogo({ className }: { className?: string }) {
  return <img src={fullLogoDark} alt="Fertilite" className={className} />;
}

function CTAButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white text-teal-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-3"
    >
      Find Your Personalized IVF Path
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

function LocationPill() {
  return (
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
      <MapPin className="w-4 h-4" />
      <span className="text-sm">Hospital Cyntar, Tijuana &bull; Minutes from San Diego</span>
    </div>
  );
}

function BulletPoints() {
  return (
    <div className="space-y-3 mb-10">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
          <Heart className="w-3 h-3 text-teal-900" />
        </div>
        <p className="text-lg text-teal-50">Compare single-cycle and structured multi-cycle options</p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
          <Award className="w-3 h-3 text-teal-900" />
        </div>
        <p className="text-lg text-teal-50">Board-certified specialists with US training standards</p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
          <Shield className="w-3 h-3 text-teal-900" />
        </div>
        <p className="text-lg text-teal-50">Transparent pricing with significant savings over US clinics</p>
      </div>
    </div>
  );
}

/* ─────────────── OPTION A: SPLIT HERO ─────────────── */
function HeroSplitLayout() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-24">
          {/* Left: Content */}
          <div className="relative z-10">
            <FertiliteLogo className="h-14 sm:h-18 w-auto mb-8" />
            <LocationPill />
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold mb-6 leading-tight">
              A More Confident Path to IVF
            </h1>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Fertilite offers premium IVF care in Tijuana with flexible treatment paths designed to reduce pressure and increase peace of mind.
            </p>
            <BulletPoints />
            <CTAButton onClick={() => navigate('/step-1')} />
            <p className="text-sm text-teal-200 mt-4">Takes 2 minutes &bull; No account required</p>
          </div>

          {/* Right: Photo Collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback src={IMAGES.couple} alt="Happy couple" className="w-full h-64 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback src={IMAGES.lab} alt="Modern lab" className="w-full h-48 object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback src={IMAGES.doctor} alt="Doctor consultation" className="w-full h-48 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback src={IMAGES.hospital} alt="Hospital facility" className="w-full h-64 object-cover" />
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300/15 rounded-full blur-3xl" />
          </div>

          {/* Mobile: single image */}
          <div className="lg:hidden rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback src={IMAGES.couple} alt="Happy couple" className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── OPTION B: FULL-BLEED BACKGROUND ─────────────── */
function HeroFullBleed() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[90vh] flex items-center text-white overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <ImageWithFallback src={IMAGES.hands} alt="Couple holding hands" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-900/80 to-teal-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 via-transparent to-teal-900/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="max-w-2xl">
          <FertiliteLogo className="h-14 sm:h-18 w-auto mb-8" />
          <LocationPill />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            A More Confident Path to IVF
          </h1>
          <p className="text-xl sm:text-2xl text-teal-100 mb-8 leading-relaxed">
            Fertilite offers premium IVF care in Tijuana with flexible treatment paths designed to reduce pressure and increase peace of mind.
          </p>
          <BulletPoints />
          <CTAButton onClick={() => navigate('/step-1')} />
          <p className="text-sm text-teal-200 mt-4">Takes 2 minutes &bull; No account required</p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/* ─────────────── OPTION C: PHOTO GRID / MOSAIC ─────────────── */
function HeroPhotoGrid() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Top: Logo + Content centered */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex justify-center mb-8">
            <FertiliteLogo className="h-14 sm:h-18 w-auto" />
          </div>
          <div className="flex justify-center">
            <LocationPill />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            A More Confident Path to IVF
          </h1>
          <p className="text-xl text-teal-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Fertilite offers premium IVF care in Tijuana with flexible treatment paths designed to reduce pressure and increase peace of mind.
          </p>
          <div className="flex justify-center">
            <CTAButton onClick={() => navigate('/step-1')} />
          </div>
          <p className="text-sm text-teal-200 mt-4">Takes 2 minutes &bull; No account required</p>
        </div>

        {/* Photo Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback src={IMAGES.couple} alt="Happy couple" className="w-full h-full min-h-[280px] sm:min-h-[360px] object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback src={IMAGES.doctor} alt="Doctor consultation" className="w-full h-40 sm:h-44 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback src={IMAGES.hospital} alt="Modern facility" className="w-full h-40 sm:h-44 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback src={IMAGES.lab} alt="Lab equipment" className="w-full h-40 sm:h-44 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback src={IMAGES.baby} alt="Happy family" className="w-full h-40 sm:h-44 object-cover" />
          </div>
        </div>

        {/* Trust stats inline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white mb-1">20+</div>
            <div className="text-sm text-teal-200">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white mb-1">3,200+</div>
            <div className="text-sm text-teal-200">Successful Cycles</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white mb-1">40-60%</div>
            <div className="text-sm text-teal-200">Cost Savings</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold text-white mb-1">5 min</div>
            <div className="text-sm text-teal-200">From San Diego</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── EXAMPLES PAGE ─────────────── */
export function HeroExamples() {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Hero Layout Options</h1>
          <p className="text-sm text-gray-500 hidden sm:block">Scroll to compare all three options</p>
          <a href="/" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            &larr; Back to Landing
          </a>
        </div>
      </div>

      {/* Option A */}
      <div className="mb-2">
        <div className="bg-amber-50 border-b-2 border-amber-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">A</span>
            <div>
              <h2 className="font-semibold text-gray-900">Split Hero</h2>
              <p className="text-sm text-gray-600">Text on the left, photo collage on the right. Great for showcasing multiple clinic images.</p>
            </div>
          </div>
        </div>
        <HeroSplitLayout />
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
      </div>

      {/* Option B */}
      <div className="mb-2">
        <div className="bg-blue-50 border-b-2 border-blue-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">B</span>
            <div>
              <h2 className="font-semibold text-gray-900">Full-Bleed Background</h2>
              <p className="text-sm text-gray-600">One dramatic photo fills the entire background with a gradient overlay. Highly emotional and immersive.</p>
            </div>
          </div>
        </div>
        <HeroFullBleed />
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
      </div>

      {/* Option C */}
      <div className="mb-2">
        <div className="bg-emerald-50 border-b-2 border-emerald-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">C</span>
            <div>
              <h2 className="font-semibold text-gray-900">Photo Grid / Mosaic</h2>
              <p className="text-sm text-gray-600">Centered content above a beautiful mosaic grid of clinic photos. Showcases your facility comprehensively.</p>
            </div>
          </div>
        </div>
        <HeroPhotoGrid />
      </div>

      {/* Footer note */}
      <div className="bg-white border-t border-gray-200 py-12 text-center">
        <p className="text-gray-600 max-w-lg mx-auto">
          These examples use placeholder stock photos. Once you choose a layout, you can import your own clinic photos from Figma to replace them.
        </p>
      </div>
    </div>
  );
}