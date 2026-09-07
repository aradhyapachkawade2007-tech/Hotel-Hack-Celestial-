'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  Sparkles,
  CheckCircle,
  Filter,
  MessageSquare,
  Plus,
  Award,
  ShieldCheck
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import Button from '../ui/Button';
import AddReviewModal from './AddReviewModal';

export default function ReviewSection() {
  const { reviews, kpis } = useHotel();

  const [ratingFilter, setRatingFilter] = useState('All');
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  const filteredReviews = reviews.filter((rev) => {
    if (ratingFilter === '5') return Math.floor(rev.rating) === 5;
    if (ratingFilter === '4') return Math.floor(rev.rating) === 4;
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 dark:border-slate-800 space-y-8 transition-colors duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">
            <Award className="w-4 h-4" />
            <span>Verified Guest Experiences & Ratings</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif mt-1">
            Resort Reviews & Guest Testimonials
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
            Read verified reviews from guests who have stayed in our oceanfront suites and penthouses.
          </p>
        </div>

        <Button
          onClick={() => setIsAddReviewModalOpen(true)}
          variant="primary"
          size="md"
          icon={Plus}
          className="shrink-0 shadow-gold-glow"
        >
          Write a Review
        </Button>
      </div>

      {/* Overview Score Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-stone-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-700/70">
        {/* Score Box */}
        <div className="flex flex-col items-center justify-center text-center p-4 lg:border-r border-stone-200 dark:border-slate-700">
          <div className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {kpis.avgReviewRating}
          </div>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-stone-600 dark:text-slate-300">
            Based on {kpis.totalReviews} verified guest reviews
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Guests
          </span>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-2 space-y-2.5 justify-center flex flex-col px-2">
          {[
            { name: 'Cleanliness & Sanitation', score: 5.0, pct: '100%' },
            { name: 'Suite Comfort & Bedding', score: 4.9, pct: '98%' },
            { name: 'Beachfront Location & Views', score: 5.0, pct: '100%' },
            { name: 'Butler & Concierge Service', score: 4.9, pct: '98%' },
            { name: 'Value & Dining Experience', score: 4.8, pct: '96%' }
          ].map((cat) => (
            <div key={cat.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{cat.name}</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{cat.score} / 5.0</span>
              </div>
              <div className="w-full h-2 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: cat.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-400">Filter:</span>
          {['All', '5', '4'].map((f) => (
            <button
              key={f}
              onClick={() => setRatingFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
                ratingFilter === f
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 hover:bg-stone-200'
              }`}
            >
              {f === 'All' ? 'All Reviews' : `${f} Stars`}
            </button>
          ))}
        </div>
        <span className="text-xs text-stone-400">{filteredReviews.length} reviews</span>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-800/40 space-y-3"
          >
            {/* Review Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover shadow-sm border border-stone-200 dark:border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rev.author}</h4>
                    {rev.verifiedGuest && (
                      <span className="text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Stay
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.location} • Stayed in {rev.roomName}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-500/30 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rev.rating}</span>
              </div>
            </div>

            {/* Title & Comment */}
            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">{rev.title}</h5>
              <p className="text-xs text-stone-600 dark:text-slate-300 mt-1 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-stone-400">
              <span>Published {rev.date}</span>
              <button className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.likes})
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Modal */}
      <AddReviewModal
        isOpen={isAddReviewModalOpen}
        onClose={() => setIsAddReviewModalOpen(false)}
      />
    </div>
  );
}
