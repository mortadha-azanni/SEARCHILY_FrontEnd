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
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-warm-ivory text-mistral-black p-6">
          <div className="bg-mistral-black max-w-lg w-full p-8 relative shadow-mistral rounded-none">
            <h1 className="text-[32px] font-normal leading-[1.15] mb-4 text-white uppercase tracking-tight">
              Fatal Application Error
            </h1>
            <div className="bg-mistral-black/80 p-4 border border-white/10 mb-8 font-mono text-xs overflow-x-auto text-warm-ivory leading-relaxed rounded-none">
              {this.state.error?.message || 'An unknown error occurred in the React tree.'}
            </div>
            <button
              className="bg-white text-mistral-black px-6 py-3 font-normal uppercase tracking-widest text-[14px] hover:bg-mistral-orange hover:text-white transition-all rounded-none"
              onClick={() => window.location.href = '/'}
            >
              Return Home
            </button>
            <div className="absolute top-0 right-0 w-8 h-8 bg-mistral-orange flex items-center justify-center text-white">
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
