import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-41f10ad7`;

export interface FunnelData {
  // Soft filter
  location?: string;
  age?: string;
  journey?: string;
  
  // Hard filter
  timeline?: string;
  travel?: string;
  concern?: string;
  currentClinic?: string;
  pathOpenness?: string;
  
  // Contact
  firstName?: string;
  email?: string;
  phone?: string;
  contactMethod?: string;
}

export interface LeadScore {
  total: number;
  urgency: string;
  qualificationLevel: string;
  pathInterest: string;
  suggestedNextAction: string;
  breakdown: Record<string, number>;
}

interface FunnelContextType {
  data: FunnelData;
  leadId: string | null;
  leadScore: LeadScore | null;
  isSubmitting: boolean;
  updateData: (newData: Partial<FunnelData>) => void;
  saveStepToServer: (step: number, responses: Record<string, any>) => Promise<void>;
  submitLead: (contact: { firstName: string; email: string; phone: string; contactMethod: string }) => Promise<LeadScore | null>;
  resetData: () => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getOrCreateLeadId(): string {
  const stored = sessionStorage.getItem('fertilite_lead_id');
  if (stored) return stored;
  const id = generateLeadId();
  sessionStorage.setItem('fertilite_lead_id', id);
  return id;
}

async function apiCall(path: string, method: string, body?: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`[API Error] ${method} ${path}:`, json);
    throw new Error(json.error || 'API call failed');
  }
  return json;
}

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FunnelData>(() => {
    try {
      const saved = sessionStorage.getItem('fertilite_funnel_data');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Capture UTM params on mount and store them
  const [utmParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      utmTerm: params.get('utm_term'),
      utmContent: params.get('utm_content'),
      referrer: document.referrer || null,
    };
  });

  // Initialize lead on mount
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    const id = getOrCreateLeadId();
    setLeadId(id);

    // Notify backend funnel started (doesn't create DB record yet)
    apiCall('/leads', 'POST', {
      leadId: id,
      ...utmParams,
      userAgent: navigator.userAgent,
      startedAt: new Date().toISOString(),
    }).catch(err => console.error('[FunnelContext] Failed to notify funnel start:', err));
  }, [initialized, utmParams]);

  const updateData = useCallback((newData: Partial<FunnelData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      try { sessionStorage.setItem('fertilite_funnel_data', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const saveStepToServer = useCallback(async (step: number, responses: Record<string, any>) => {
    if (!leadId) return;
    try {
      await apiCall(`/leads/${leadId}/responses`, 'POST', { step, responses });
    } catch (err) {
      console.error(`[FunnelContext] Failed to save step ${step}:`, err);
    }
  }, [leadId]);

  const submitLead = useCallback(async (contact: { firstName: string; email: string; phone: string; contactMethod: string }): Promise<LeadScore | null> => {
    if (!leadId) return null;
    setIsSubmitting(true);
    try {
      const allResponses = { ...data, ...contact };
      const result = await apiCall(`/leads/${leadId}/submit`, 'POST', {
        contact,
        allResponses,
        attribution: utmParams,
      });
      if (result.score) {
        setLeadScore(result.score);
      }
      return result.score || null;
    } catch (err) {
      console.error('[FunnelContext] Failed to submit lead:', err);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [leadId, data, utmParams]);

  const resetData = useCallback(() => {
    setData({});
    setLeadScore(null);
    sessionStorage.removeItem('fertilite_funnel_data');
    sessionStorage.removeItem('fertilite_lead_id');
  }, []);

  return (
    <FunnelContext.Provider value={{ data, leadId, leadScore, isSubmitting, updateData, saveStepToServer, submitLead, resetData }}>
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within FunnelProvider');
  }
  return context;
}
