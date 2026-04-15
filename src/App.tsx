/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  Vote, 
  Info
} from 'lucide-react';

interface DirectoryItem {
  name: string;
  url: string;
}

const CARD_STYLES = [
  {
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    hoverBorder: 'hover:border-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    accent: 'bg-orange-600'
  },
  {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    accent: 'bg-blue-600'
  },
  {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    accent: 'bg-emerald-600'
  }
];

export default function App() {
  const [items, setItems] = useState<DirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SHEET_ID = '1MQ0BlNnhUqWy1gIamDtH7UR55_2X-hyJ';
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const csvText = await response.text();
        const rows = csvText.split('\n').map(row => {
          const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          return matches ? matches.map(m => m.replace(/^"|"$/g, '')) : [];
        });

        const dataRows = rows.filter(row => row.length >= 2);
        const formattedItems = dataRows
          .map(row => ({
            name: row[0],
            url: row[1]
          }))
          .filter(item => item.name && item.url);

        setItems(formattedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-orange-100 relative overflow-hidden">
      {/* Creative Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-emerald-50/50"></div>
        
        {/* Animated Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-20 w-[550px] h-[550px] bg-emerald-200/20 rounded-full blur-[130px]"
        />

        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      {/* Top Tricolor Bar */}
      <div className="absolute top-0 left-0 w-full h-2 flex z-50">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Header Section */}
        <header className="flex flex-col items-center mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6"
          >
            <Vote className="w-8 h-8 text-[#000080]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
              Thoothukudi District <span className="text-[#000080]">Communication Directory</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-orange-400"></div>
              <p className="text-xl md:text-2xl font-bold text-[#138808] uppercase tracking-widest">
                TN Election-2026
              </p>
              <div className="h-px w-8 bg-emerald-400"></div>
            </div>
          </motion.div>
        </header>

        {/* Content Section */}
        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Fetching official records...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg">
              <AlertCircle className="w-14 h-14 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Connection Error</h3>
              <p className="text-red-700 max-w-md mb-6">
                We couldn't reach the directory database. This might be a temporary network issue.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => {
                const style = CARD_STYLES[index % CARD_STYLES.length];
                return (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.03, translateY: -5 }}
                    whileTap={{ scale: 0.97 }}
                    className={`group relative flex flex-col items-center justify-center p-10 ${style.bg} rounded-[2rem] shadow-sm border ${style.border} ${style.hoverBorder} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                  >
                    {/* Background Decorative Icon */}
                    <Vote className={`absolute -right-4 -bottom-4 w-24 h-24 ${style.iconColor} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500`} />
                    
                    <div className={`mb-4 p-4 ${style.iconBg} rounded-2xl group-hover:bg-white transition-colors duration-500`}>
                      <Vote className={`w-8 h-8 ${style.iconColor} transition-colors duration-500`} />
                    </div>

                    <div className="text-center relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                        {item.name}
                      </h3>
                      <div className={`mt-4 flex items-center justify-center ${style.iconColor} font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0`}>
                        <span>Access Portal</span>
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                    
                    {/* Accent Bottom Border */}
                    <div className={`absolute bottom-0 left-0 w-full h-1.5 ${style.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  </motion.a>
                );
              })}
            </div>
          )}
        </section>

        {/* Info Box */}
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-3xl flex items-start gap-4"
          >
            <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <p className="text-blue-800 text-sm leading-relaxed">
              This directory is for official use during the <strong>TN Election-2026</strong>. All links point to secure government portals and communication channels for Thoothukudi District.
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Official Communication Portal</p>
          <p className="text-slate-600 font-medium">© 2026 Thoothukudi District Administration</p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
        </footer>
      </main>
    </div>
  );
}


