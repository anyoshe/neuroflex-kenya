"use client";

import { useState, useEffect } from "react";
import { Download, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

function getIsInstalled() {
  if (typeof window === "undefined") return false;

  return (
    localStorage.getItem("neuroflex-app-installed") === "true" ||
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as NavigatorWithStandalone).standalone)
  );
}

export default function FloatingBookingWidget() {
  const [isInstalled, setIsInstalled] = useState(getIsInstalled);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      localStorage.setItem("neuroflex-app-installed", "true");
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      toast("Use your browser menu to install the Neuroflex app.");
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      localStorage.setItem("neuroflex-app-installed", "true");
      setIsInstalled(true);
    }

    setInstallPrompt(null);
  };

  const whatsappUrl = `https://wa.me/254729213135?text=Hi%20Neuroflex%20Kenya,%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {!isInstalled && (
        <button
          type="button"
          onClick={handleInstallClick}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#001a4d] text-white shadow-lg ring-2 ring-white/80 transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label="Install Neuroflex web app"
          title="Install Neuroflex web app"
        >
          <Download size={22} />
        </button>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
