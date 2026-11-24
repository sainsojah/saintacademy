import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-gutter-md px-page-margin-mobile py-section md:px-page-margin">
      <span className="font-mono text-mono-sm uppercase text-primary">404</span>
      <h1 className="font-display text-display-md-mobile text-on-surface md:text-display-md">Page not found.</h1>
      <p className="font-body text-body-lg text-on-surface-variant">The page you were looking for does not exist or has moved.</p>
      <Button asChild size="lg"><Link to="/">Back to the home page</Link></Button>
    </section>
  );
}
