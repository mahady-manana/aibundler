import { ErrorBoundary } from "react-error-boundary";

interface ChatSuspenseErrorProps {
  children: React.ReactNode;
}
export default function ChatErrorBounder({ children }: ChatSuspenseErrorProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4">
          <div className="border-2 border-red-500 text-red-500 bg-red-200 text-center rounded-xl p-4">
            <p className="text-red-500 text-center mb-4">
              Error processing chat response.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
