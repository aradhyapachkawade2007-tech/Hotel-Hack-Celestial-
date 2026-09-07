'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Bed,
  Users,
  ClipboardList,
  Sparkles,
  Plus,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Building,
  CheckCircle,
  Clock,
  BarChart3,
  Calendar,
  Star,
  Award
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { useToast } from '@/context/ToastContext';
import StatCard from './ui/StatCard';
import Button from './ui/Button';
import ThemeToggle from './ui/ThemeToggle';
import BookingsTable from './owner/BookingsTable';
import InventoryManager from './owner/InventoryManager';
import HousekeepingKanban from './owner/HousekeepingKanban';
import ReviewSection from './reviews/ReviewSection';

export default function OwnerDashboard({ onSwitchRole }) {
  const { kpis, rooms, bookings, requests } = useHotel();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'inventory' | 'housekeeping' | 'reviews' | 'analytics'

  const handleRefresh = () => {
    addToast({
      title: 'Metrics Synchronized',
      message: 'Resort telemetry and occupancy rates updated in real time.',
      type: 'info'
    });
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#090d16] text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      {/* Top Staff Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                  Resort Management HQ
                </h1>
                <span className="text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Admin Active
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                L'Horizon Azure Operational Suite
              </span>
            </div>
          </div>

          {/* Quick Staff Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Sync Live Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <Button
              onClick={() => onSwitchRole('landing')}
              variant="outline"
              size="sm"
              className="!bg-slate-900 !text-slate-200 !border-slate-700 hover:!bg-slate-800 text-xs"
              icon={LogOut}
            >
              Switch Portal
            </Button>
          </div>
        </div>

        {/* Operational View Tab Bar */}
        <div className="bg-slate-900/90 border-t border-slate-800 px-4 sm:px-8 flex overflow-x-auto gap-2 py-2.5 text-xs font-semibold">
          {[
            { id: 'bookings', label: 'Bookings & Ledger', icon: Calendar, count: kpis.activeBookings },
            { id: 'inventory', label: 'Room Inventory (CRUD)', icon: Bed, count: kpis.totalRooms },
            { id: 'housekeeping', label: 'Housekeeping Kanban', icon: ClipboardList, count: kpis.pendingRequests },
            { id: 'reviews', label: 'Guest Reviews', icon: Star, count: kpis.totalReviews },
            { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === tab.id
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Operational Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Dynamic KPI Overview Ribbon */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
              Live Operational Performance Metrics
            </h2>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Telemetry Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value={`$${kpis.totalRevenue.toLocaleString()}`}
              subtitle="All active stays & bookings"
              trend="+14.2%"
              trendType="up"
              colorScheme="gold"
              icon={DollarSign}
            />

            <StatCard
              title="Occupancy Rate"
              value={`${kpis.occupancyRate}%`}
              subtitle={`${rooms.filter(r => r.status === 'Occupied').length} of ${rooms.length} suites occupied`}
              trend="+8.5%"
              trendType="up"
              colorScheme="emerald"
              icon={Bed}
            />

            <StatCard
              title="Active Bookings"
              value={kpis.activeBookings}
              subtitle="Confirmed / Checked-in guests"
              trend="+4 today"
              trendType="up"
              colorScheme="blue"
              icon={Users}
            />

            <StatCard
              title="Pending Housekeeping"
              value={kpis.pendingRequests}
              subtitle={`${kpis.inProgressRequests} in progress, ${kpis.completedRequests} done`}
              trend={kpis.pendingRequests > 0 ? "Attention" : "All Clear"}
              trendType={kpis.pendingRequests > 0 ? "down" : "up"}
              colorScheme={kpis.pendingRequests > 0 ? "gold" : "emerald"}
              icon={ClipboardList}
            />
          </div>
        </section>

        {/* Active Operational View */}
        <div className="space-y-6">
          {activeTab === 'bookings' && <BookingsTable />}

          {activeTab === 'inventory' && <InventoryManager />}

          {activeTab === 'housekeeping' && <HousekeepingKanban />}

          {activeTab === 'reviews' && <ReviewSection />}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Breakdown */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-stone-200/90 dark:border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Breakdown</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-stone-100 dark:border-slate-800">
                      <span className="text-stone-500 dark:text-slate-400">Suite Accommodations</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${Math.round(kpis.totalRevenue * 0.82).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-100 dark:border-slate-800">
                      <span className="text-stone-500 dark:text-slate-400">Resort Taxes & VAT (18%)</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${Math.round(kpis.totalRevenue * 0.15).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-100 dark:border-slate-800">
                      <span className="text-stone-500 dark:text-slate-400">Concierge & In-Room Dining</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${Math.round(kpis.totalRevenue * 0.03).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-sm">
                      <span className="font-bold text-slate-900 dark:text-white">Average Daily Rate (ADR)</span>
                      <span className="font-extrabold text-amber-600 dark:text-amber-400">
                        ${kpis.averageDailyRate} / night
                      </span>
                    </div>
                  </div>
                </div>

                {/* Occupancy Status Distribution */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-stone-200/90 dark:border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Room Status Distribution</h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: 'Occupied Suites',
                        count: rooms.filter((r) => r.status === 'Occupied').length,
                        color: 'bg-rose-500'
                      },
                      {
                        label: 'Available for Booking',
                        count: rooms.filter((r) => r.status === 'Available').length,
                        color: 'bg-emerald-500'
                      },
                      {
                        label: 'Dirty (Awaiting Cleaning)',
                        count: rooms.filter((r) => r.status === 'Dirty').length,
                        color: 'bg-amber-500'
                      },
                      {
                        label: 'Under Maintenance',
                        count: rooms.filter((r) => r.status === 'Maintenance').length,
                        color: 'bg-stone-500'
                      }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-stone-600 dark:text-slate-300 font-medium">{item.label}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{item.count} suites</span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{
                              width: `${(item.count / rooms.length) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Housekeeping Performance */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-stone-200/90 dark:border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Service Response SLA</h3>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-500/30 flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-300">Avg Fulfillment Time</h4>
                        <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">14.2 Minutes</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-500/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-500/30 flex items-center gap-3">
                      <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-amber-950 dark:text-amber-300">Active Turnaround Queue</h4>
                        <p className="text-lg font-extrabold text-amber-700 dark:text-amber-400">
                          {kpis.pendingRequests} Tickets Pending
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
