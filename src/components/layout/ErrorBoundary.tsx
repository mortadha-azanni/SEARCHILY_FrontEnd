import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-warm-ivory text-mistral-black p-6">
          <div className="bg-white border-2 border-red-500 shadow-[8px_8px_0_rgba(239,68,68,1)] max-w-lg w-full p-8 relative">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-red-600">
              Fatal Application Error
            </h1>
            <div className="bg-red-50 p-4 border border-red-100 mb-8 font-mono text-xs overflow-x-auto text-red-800 leading-relaxed">
              {this.state.error?.message || 'An unknown error occurred in the React tree.'}
            </div>
            <button
              className="bg-mistral-black text-white px-6 py-3 font-normal uppercase tracking-widest text-sm hover:translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all"
              onClick={() => window.location.href = '/'}
            >
              Return to Safety
            </button>
            <div className="absolute top-0 right-0 w-8 h-8 bg-red-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
