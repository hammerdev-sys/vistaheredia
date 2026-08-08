import { CheckCircle2, AlertCircle } from "lucide-react"

export function SuccessMessage({ title, body }: { title: string; body: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-10 text-center"
    >
      <CheckCircle2 className="h-12 w-12 text-primary" />
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}

export function ErrorBanner({ title, body }: { title: string; body: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}
