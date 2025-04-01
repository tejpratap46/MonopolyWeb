"use client";
import React, { useState, useEffect } from "react";

// Define types for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PwaInstallPrompt: React.FC = () => {
  // State to manage install-related functionality
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if the app is already installed
    const checkInstalledApps = async () => {
      if ("getInstalledRelatedApps" in window.navigator) {
        try {
          const relatedApps =
            await // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window.navigator as any).getInstalledRelatedApps();
          setIsInstalled(relatedApps.length > 0);
        } catch (error) {
          console.error("Error checking installed apps:", error);
        }
      }
    };

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      // Prevent the default browser install prompt
      event.preventDefault();

      // Store the event for later use
      setInstallPrompt(event);
    };

    // Add event listener
    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    // Check installed status
    checkInstalledApps();

    // Cleanup the event listener
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  // Handler to trigger PWA installation
  const handleInstallClick = async () => {
    if (!installPrompt) return;

    try {
      // Show the install prompt
      await installPrompt.prompt();

      // Wait for the user to respond to the prompt
      const choiceResult = await installPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("PWA installation accepted");
        setIsInstalled(true);
      } else {
        console.log("PWA installation dismissed");
      }

      // Reset the install prompt
      setInstallPrompt(null);
    } catch (error) {
      console.error("Installation failed", error);
    }
  };

  // If already installed or no install prompt available, don't show anything
  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
      <div className="flex flex-col gap-4 items-center">
        <p>Install the app for better performance</p>
        <button onClick={handleInstallClick}>Install App</button>
      </div>
  );
};

export default PwaInstallPrompt;
