type AdPlaceholderProps = {
  id: string;
  className?: string;
  label?: string;
};

export function AdPlaceholder({ id, className = "", label = "Ad Space" }: AdPlaceholderProps) {
  return (
    <div className={`rounded-lg border border-dashed border-border/80 bg-muted/25 p-2 ${className}`}>
      {/* AdSense Placeholder - Replace with your ad unit code */}
      <div
        id={id}
        className="flex min-h-16 items-center justify-center rounded-md border border-border/70 bg-background/35 px-3 text-center text-xs font-medium text-muted-foreground"
      >
        {label}
      </div>
    </div>
  );
}
