import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[oklch(0.14_0.005_285)] group-[.toaster]:text-[oklch(0.93_0.02_60)] group-[.toaster]:border-[oklch(0.68_0.09_22/30%)] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[oklch(0.65_0.02_60)]",
          actionButton:
            "group-[.toast]:bg-[oklch(0.68_0.09_22)] group-[.toast]:text-[oklch(0.08_0.004_285)]",
          cancelButton:
            "group-[.toast]:bg-[oklch(0.18_0.006_285)] group-[.toast]:text-[oklch(0.65_0.02_60)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
