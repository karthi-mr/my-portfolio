import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

type ErrorBoundaryProps = {
  children: ReactNode;
}

type ErrorBoundaryState = {
  hasError: boolean;
}

/** Shows a friendly "reload" screen instead of a blank page when a page fails to load or crashes. */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Page failed to render:", error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div role="alert" className="grow grid place-items-center py-24">
        <div className="glass max-w-md p-8 text-center flex flex-col items-center gap-4">
          <span className="grid place-items-center size-12 rounded-2xl bg-brand text-white shadow-lg shadow-indigo-500/30">
            <RefreshCw size={22} />
          </span>
          <h2 className="font-display text-xl font-bold">This page couldn&apos;t load</h2>
          <p className="text-sm text-muted">
            The site may have just been updated, or your connection dropped. Reloading usually fixes it.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
